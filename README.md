# Hermes Catch Binding Bug

`ReferenceError: Property 'error' doesn't exist` when accessing a catch binding inside a deferred closure (`setTimeout`) in React Native with Hermes.

Related: [facebook/hermes#864](https://github.com/facebook/hermes/issues/864), [facebook/hermes#1969](https://github.com/facebook/hermes/issues/1969)

## The Bug

```javascript
try {
  throw new Error('test');
} catch (error) {
  console.log(error.message); // works
  setTimeout(function () {
    console.log(error.message); // ReferenceError: Property 'error' doesn't exist
  }, 0);
}
```

## Reproduction

`repro.js` contains code extracted from a React Native 0.79.7 Metro dev bundle. It replicates the exact execution path: Metro module system (`__d`/`__r`), React Native's JSTimers (which wraps all timer callbacks in `_allocateCallback` + `_callTimer` with its own `try/catch`), and the catch binding pattern.

```bash
hermes repro.js
```

**On standalone Hermes CLI:** prints `BUG NOT REPRODUCED` — the catch binding is accessible.

**Inside a React Native app (iOS/Android):** throws `ReferenceError: Property 'error' doesn't exist`.

The same code, the same execution path — different result. The difference is the Hermes runtime embedded in the React Native app vs the standalone CLI binary.

### Verified in React Native app

Tested with a fresh RN 0.79.7 project on iOS simulator (Xcode 26.4):

![Bug reproduced on iOS simulator](screenshot.png)

## What's in repro.js

Extracted from the Metro dev bundle, not hand-written:

1. **Metro require polyfill** — `__d`/`__r`/`loadModuleImplementation` with `$RefreshReg$`/`$RefreshSig$` Fast Refresh globals (lines 1–400 of the bundle)
2. **JSTimers** — React Native's `setTimeout` replacement that wraps callbacks via `_allocateCallback` → `_callTimer` with `try { callback() } catch (e) { errors.push(e) }` (lines 26261–26540)
3. **App module** — the catch binding pattern, output by `@react-native/babel-preset` with `hermes-stable` profile (catch binding is **not** transformed by Babel)

## Babel verification

`@react-native/babel-preset` with `hermes-stable` profile does **not** transform catch bindings:

```
Input:  catch (error) { setTimeout(function() { console.log(error) }, 0) }
Output: catch (error) { setTimeout(function() { console.log(error) }, 0) }
```

Only `const`/`let` are lowered to `var`. The catch binding passes through untransformed.

## Workaround

Hoist the catch binding to a `let` before the try/catch. Babel lowers `let` → `var`, which Hermes handles correctly:

```javascript
let capturedError;
try {
  throw new Error('test');
} catch (error) {
  capturedError = error;
  setTimeout(function () {
    console.log(capturedError.message); // works
  }, 0);
}
```

## Environment

- React Native 0.79.7 (also affects 0.78.x)
- Hermes (default engine)
- Metro bundler (dev mode)
- Tested on iOS simulator
