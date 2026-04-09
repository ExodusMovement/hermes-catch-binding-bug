# Hermes Catch Binding Bug

`ReferenceError: Property 'error' doesn't exist` when accessing a catch binding inside a deferred closure (`setTimeout`) in React Native with Hermes.

Related: [facebook/hermes#864](https://github.com/facebook/hermes/issues/864)

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

This repo is a minimal React Native 0.79.7 project. The repro code is in `App.tsx`.

### Prerequisites

- Node.js 18+
- Xcode 16+ (tested on Xcode 26.4)
- CocoaPods
- Ruby 3.3.x (Ruby 3.4 has a CocoaPods `kconv` incompatibility)

### Steps

```bash
git clone https://github.com/ExodusMovement/hermes-catch-binding-bug.git
cd hermes-catch-binding-bug
npm install

# iOS
cd ios && bundle install && bundle exec pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

### Expected result

The app displays **"BUG REPRODUCED – ReferenceError: Property 'error' doesn't exist"**.

### Note: Xcode 26+ fmt build fix

If the build fails with `fmt` compilation errors on Xcode 26+, the Podfile already includes a patch that upgrades `fmt` from 11.0.2 to 12.1.0. See [facebook/react-native#56099](https://github.com/facebook/react-native/pull/56099).

## Screenshot

![Bug reproduced on iOS simulator](screenshot.png)

## Root Cause

Hermes has `enableBlockScoping: false` by default. When block scoping is disabled, [`prepareCatch`](https://github.com/facebook/hermes/blob/main/lib/IRGen/ESTreeIRGen-except.cpp) renames the catch binding to an internal `?anon_N_error` variable in the function scope and uses `NameTableScopeTy` to temporarily map the original name. When the catch block exits, the destructor removes the name mapping.

Babel's `@babel/plugin-transform-block-scoping` lowers `let`/`const` to `var` but does **not** transform catch bindings (block-scoped since ES3, expected to be engine-native). This creates a gap: nothing transforms catch bindings, and Hermes's internal workaround breaks for deferred closures.

## Why standalone Hermes CLI does NOT reproduce

The `hermes-engine-cli` binary does not reproduce this bug. It lacks an event loop, so closures are always invoked synchronously while the catch block's scope is still active. The ReferenceError only manifests when the closure executes on a **later event loop tick** — which requires the full React Native runtime. This is why [facebook/hermes#864](https://github.com/facebook/hermes/issues/864) was closed as "need-repro".

## Workaround

Hoist the catch binding to a `let` before the try/catch. Babel transforms `let` → `var`, which Hermes handles correctly:

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
- Hermes (default engine, `enableBlockScoping: false`)
- Metro bundler
- iOS and Android both affected
