// Variant with async function + Promise to simulate deferred execution.
// Run: hermes repro-async-closure.js

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
  async function run() {
    try {
      await Promise.reject(new Error('catch-binding-bug'));
    } catch (error) {
      print('inside catch: ' + error.message);
      await Promise.resolve();
      print('after await in catch: ' + error.message);
      return new Promise(function (resolve) {
        var fn = function () {
          print('deferred via promise: ' + error.message);
          resolve();
        };
        fn();
      });
    }
  }
  run().then(function () {
    print('done');
  });
}, 0);

__r(0);
