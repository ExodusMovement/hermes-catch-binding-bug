# Hermes Catch Binding Bug

`ReferenceError: Property 'error' doesn't exist` when accessing a catch binding inside `setTimeout` in React Native with Hermes.

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

`repro.js` is a complete React Native 0.79.7 Metro dev bundle generated from the catch binding pattern above. No hand-written simulation — this is the actual output of `npx react-native bundle --dev true`.

```bash
hermes repro.js
# → "BUG NOT REPRODUCED" (catch binding accessible)
```

Same bundle loaded inside a React Native 0.79.7 app on iOS:
→ `ReferenceError: Property 'error' doesn't exist`

![Bug reproduced on iOS simulator](screenshot.png)

## What Babel does

`@react-native/babel-preset` with `hermes-stable` profile does **not** transform catch bindings. The bundled code is identical to the source.

## Workaround

Hoist to `let` before the try/catch — Babel lowers `let` → `var`:

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
- iOS simulator, Xcode 26.4
