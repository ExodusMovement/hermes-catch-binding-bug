# Hermes Catch Binding Bug

`ReferenceError: Property 'error' doesn't exist` when accessing a catch binding inside a deferred closure in a React Native app with Hermes.

Related: [facebook/hermes#864](https://github.com/facebook/hermes/issues/864), [facebook/hermes#1969](https://github.com/facebook/hermes/issues/1969)

## Root Cause

A Hermes scope table overflow: when a single `__d` factory function contains **≥74 `catch` bindings**, catch binding scope resolution for OTHER modules' deferred closures gets corrupted.

React Native's `JSTimers.js` (module 205) accumulates enough `catch` bindings across its `_callTimer`, `callTimers`, `callIdleCallbacks`, `callReactNativeMicrotasks`, and error re-throw functions to cross this threshold — causing catch bindings in user code to break.

The bug requires ALL of:
1. A `var` declaration referencing the catch binding (direct access works)
2. An inner `try/catch(e)` in the deferred callback
3. The callback executed via `setTimeout` (which goes through JSTimers._callTimer's `try/catch`)
4. ≥74 `catch` bindings total in any `__d` factory in the same bundle
5. The Hermes runtime embedded in the RN app (standalone Hermes CLI does NOT reproduce)

## Reproduction

`repro.js` is a 1379-line self-contained bundle:
- Minimal Metro `__d`/`__r` polyfill (35 lines)
- Stripped JSTimers with 74 padding `catch` bindings (the threshold)
- 35 timer dependency modules
- Module 0: the failing catch pattern (15 lines)

```bash
hermes repro.js
# → PASS (standalone CLI does not reproduce)

# In a React Native app:
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

Avoid `var` declarations referencing catch bindings inside inner `try/catch` blocks in deferred closures:

```javascript
// Option 1: access directly (no var)
catch (error) {
  setTimeout(function () {
    console.log(error.message);  // works
  }, 0);
}

// Option 2: hoist to let before try/catch
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
