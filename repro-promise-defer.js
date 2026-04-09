// Uses Promise microtask to defer closure execution past catch block exit.
// This is the closest simulation to setTimeout without an event loop.
//
// Run: hermes repro-promise-defer.js

var modules = {};

function __d(factory, moduleId) {
  modules[moduleId] = { factory: factory, isInitialized: false, exports: {} };
}

function __r(moduleId) {
  var mod = modules[moduleId];
  if (!mod) throw new Error('Module ' + moduleId + ' not found');
  if (!mod.isInitialized) {
    mod.isInitialized = true;
    try {
      mod.factory(globalThis, __r, function (id) { return __r(id); }, function (id) { return __r(id); }, { exports: mod.exports }, mod.exports, []);
    } catch (e) {
      mod.isInitialized = false;
      throw e;
    }
  }
  return mod.exports;
}

__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {

  async function withdraw() {
    try {
      await Promise.reject(new Error('withdraw failed'));
    } catch (error) {
      print('inside catch: ' + error.message);

      // schedule deferred via microtask (closest to setTimeout in Hermes CLI)
      Promise.resolve().then(function () {
        print('microtask deferred: ' + error.message);
      });

      // also test with chained async
      await new Promise(function (resolve) {
        resolve();
      }).then(function () {
        print('chained deferred: ' + error.message);
      });
    }
    print('after catch block');
  }

  withdraw().then(function () {
    print('done');
  });

}, 0);

__r(0);
