// Simulates Metro's __d module wrapper to match the scope chain in React Native.
// Run: hermes repro-metro-wrapper.js

var modules = {};

function __d(factory, moduleId) {
  modules[moduleId] = { factory: factory, isInitialized: false, exports: {} };
}

function __r(moduleId) {
  var mod = modules[moduleId];
  if (!mod) throw new Error('Module ' + moduleId + ' not found');
  if (!mod.isInitialized) {
    mod.isInitialized = true;
    mod.factory(
      globalThis,
      __r,
      function (id) {
        return __r(id);
      },
      function (id) {
        return __r(id);
      },
      { exports: mod.exports },
      mod.exports,
      []
    );
  }
  return mod.exports;
}

__d(function (global, require, importDefault, importAll, module, exports, dependencyMap) {
  var callbacks = [];
  try {
    throw new Error('catch-binding-bug');
  } catch (error) {
    print('inside catch: ' + error.message);
    callbacks.push(function () {
      print('deferred: ' + error.message);
    });
  }
  callbacks[0]();
}, 0);

__r(0);
