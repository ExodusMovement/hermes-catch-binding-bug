# Hermes Catch Binding Bug

`ReferenceError: Property 'error' doesn't exist` when accessing a catch binding inside a deferred closure in a React Native app with Hermes.

Related: [facebook/hermes#864](https://github.com/facebook/hermes/issues/864), [facebook/hermes#1969](https://github.com/facebook/hermes/issues/1969)

## Root Cause

React Native's `JSTimers._callTimer` wraps every timer callback in `try { callback() } catch(e) { errors.push(e) }`. This `catch(e)` binding corrupts the outer `catch(error)` binding when the callback accesses it via a `var` declaration inside an inner `try/catch`.

```javascript
// JSTimers._callTimer (module 205, line ~1219):
try {
  callback();              // ← our setTimeout callback runs here
} catch (e) {              // ← this catch(e) corrupts the outer catch(error)
  errors.push(e);
}

// Our code (module 0):
try { throw new Error('test'); }
catch (error) {
  setTimeout(function () {
    try {
      var msg = error.message;  // ← ReferenceError: Property 'error' doesn't exist
    } catch (e) { }
  }, 0);
}
```

The bug requires ALL of:
1. `var msg = error.message;` as a separate `var` declaration (direct `error.message` access works)
2. An inner `try/catch(e)` in the setTimeout callback
3. The callback executed through JSTimers' `_callTimer` try/catch wrapper
4. The Hermes runtime embedded in the RN app (standalone Hermes CLI does NOT reproduce)

## Why it works on Hermes CLI but not in the RN app

Unknown. The `repro.js` bundle contains the exact code that runs in the RN app — same Metro polyfill, same JSTimers, same module 0. But `hermes repro.js` passes while the RN app fails. The Hermes runtime embedded in the RN app behaves differently from the CLI binary for this specific pattern.

## Reproduction

`repro.js` is a 1525-line bundle containing:
- Minimal Metro require polyfill (35 lines)
- Module 0: the catch binding test pattern (15 lines)
- JSTimers (module 205, 290 lines) — its `_callTimer` try/catch is the trigger
- 35 timer dependency modules needed for JSTimers to work

```bash
hermes repro.js
# → works fine (PASS) — standalone CLI does not reproduce

# In a React Native app on iOS/Android:
# → ReferenceError: Property 'error' doesn't exist
```

### Quick RN repro

```bash
npx @react-native-community/cli init HermesCatchRepro --version 0.79.7
```

Replace `index.js`:

```javascript
import {AppRegistry} from 'react-native';

try {
  throw new Error('catch-binding-bug');
} catch (error) {
  setTimeout(function () {
    try {
      var msg = error.message;
      console.log(msg);
    } catch (e) {
      console.error('BUG:', e.message);
    }
  }, 100);
}

AppRegistry.registerComponent('HermesCatchRepro', () => () => null);
```

## Workaround

Avoid `var` declarations referencing catch bindings inside inner `try/catch` blocks in deferred closures. Either:

```javascript
// Option 1: access directly (no var)
catch (error) {
  setTimeout(function () {
    console.log(error.message);  // works
  }, 0);
}

// Option 2: hoist to let before try/catch (Babel lowers let → var)
let capturedError;
try { ... } catch (error) {
  capturedError = error;
  setTimeout(function () {
    console.log(capturedError.message);  // works
  }, 0);
}
```

## Environment

- React Native 0.78.x, 0.79.7
- Hermes (default engine)
- iOS and Android
- Standalone Hermes CLI does NOT reproduce
