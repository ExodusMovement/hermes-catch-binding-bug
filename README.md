# Hermes Catch Binding Bug

`ReferenceError: Property 'error' doesn't exist` when accessing a catch binding inside a deferred closure in a React Native app with Hermes.

Related: [facebook/hermes#864](https://github.com/facebook/hermes/issues/864), [facebook/hermes#1969](https://github.com/facebook/hermes/issues/1969)

## Root Cause

A Hermes compiler bug where parsing a `__d` factory function containing a `catch` binding corrupts catch binding scope resolution for a **different** `__d` factory's deferred closure.

Specifically, when the bundle contains this module definition (never executed, only parsed):

```javascript
__d(function (...) {
  var handleError = function handleError(e, isFatal) {
    try {
      ExceptionsManager.handleException(e, isFatal);
    } catch (ee) {                          // ← this catch(ee) corrupts scope
      console.log('Failed to print error: ', ee.message);
      throw e;
    }
  };
}, 256, [...], "setUpErrorHandling.js");
```

...it causes a catch binding in a separately defined module to become inaccessible in deferred closures:

```javascript
__d(function (...) {
  try {
    throw new Error('test');
  } catch (error) {
    setTimeout(function () {
      try {
        var msg = error.message;    // ← ReferenceError: Property 'error' doesn't exist
      } catch (e) { }
    }, 0);
  }
}, 0, [], "index.js");
```

The bug requires ALL of:
1. `var msg = error.message;` as a separate `var` declaration (direct `error.message` access works)
2. An inner `try/catch(e)` block in the setTimeout callback
3. Deferred execution (setTimeout, Promise.then, queueMicrotask)
4. Another `__d` factory in the bundle containing a `catch` binding (e.g. module 256)
5. The Hermes runtime embedded in the RN app (standalone Hermes CLI does NOT reproduce)

## Reproduction

`repro.js` is a 2811-line bundle containing:
- Metro require polyfill + ErrorUtils (lines 1-1284)
- Module 0: the catch binding test pattern (15 lines)
- Module 256: `setUpErrorHandling.js` from React Native — the trigger (20 lines, never executed)
- 37 timer modules needed for `setTimeout` to work

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
