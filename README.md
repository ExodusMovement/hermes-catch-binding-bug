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

## Root Cause

Hermes has `enableBlockScoping: false` by default. When block scoping is disabled, [`prepareCatch`](https://github.com/facebook/hermes/blob/main/lib/IRGen/ESTreeIRGen-except.cpp) renames the catch binding to an internal `?anon_N_error` variable in the function scope and uses `NameTableScopeTy` to temporarily map the original name. When the catch block exits, the destructor removes the name mapping.

Babel's `@babel/plugin-transform-block-scoping` lowers `let`/`const` to `var` but does **not** transform catch bindings (block-scoped since ES3, expected to be engine-native). This creates a gap: nothing transforms catch bindings, and Hermes's internal workaround breaks for deferred closures.

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

## Standalone Hermes CLI Does NOT Reproduce

The `hermes-engine-cli` binary (v0.12.0) does **not** reproduce this bug, even when:

- Wrapping code in Metro's `__d` module factory (`repro-metro-wrapper.js`)
- Using async/await + Promise deferral (`repro-async-closure.js`, `repro-promise-defer.js`)
- Compiling to bytecode first via `hermesc -emit-binary`

The bug requires the full React Native runtime — specifically the event loop and `setTimeout` scheduling. The standalone Hermes CLI lacks an event loop, so closures are always invoked synchronously while the catch block's scope is still active. The ReferenceError only manifests when the closure executes on a **later tick** after the catch block has fully unwound.

This is why [facebook/hermes#864](https://github.com/facebook/hermes/issues/864) was closed as "need-repro" — the Hermes team tested with the CLI only.

## Repro: React Native 0.78 (Required)

```bash
npx @react-native-community/cli init HermesCatchRepro --version 0.78.3
cd HermesCatchRepro
```

Replace `App.js`:

```javascript
import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function App() {
  useEffect(function () {
    try {
      throw new Error('catch-binding-bug');
    } catch (error) {
      console.log('inside catch:', error.message); // works
      setTimeout(function () {
        console.log('deferred:', error.message); // ReferenceError
      }, 100);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Check Metro console for ReferenceError</Text>
    </View>
  );
}

var styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
```

Run:
```bash
npx react-native run-ios  # or run-android
```

Expected: Metro console shows `inside catch: catch-binding-bug`, then `ReferenceError: Property 'error' doesn't exist`.

## Babel Transform Verification

Confirmed that `@react-native/babel-preset` with `hermes-stable` profile does **not** transform catch bindings:

```
Input:  catch (error) { setTimeout(function() { console.log(error) }, 0) }
Output: catch (error) { setTimeout(function() { console.log(error) }, 0) }
```

Only `const`/`let` inside the catch block are lowered to `var`. The catch binding itself passes through untransformed.

## Environment

- React Native 0.78.3
- Hermes (default engine, `enableBlockScoping: false`)
- Metro bundler (dev mode, `index.bundle`)
- Tested on iOS and Android
- `@react-native/babel-preset` with `hermes-stable` profile
- `hermes-engine-cli` 0.12.0 (standalone CLI does NOT reproduce)

## Stack Trace (from production app)

```
ERROR  uncaught error [ReferenceError: Property 'error' doesn't exist]
DEBUG  exodus:errorTracking:error ReferenceError: Property 'error' doesn't exist
    at anonymous (index.bundle:1153678:13)
    at apply (native)
    at anonymous (index.bundle:20999:26)
```
