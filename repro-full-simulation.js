// Full simulation of how Metro + Hermes processes modules.
// This is the Babel-transformed output wrapped in Metro's __d factory,
// then compiled via hermesc to bytecode and executed by hermes runtime.
//
// Run:
//   hermesc -emit-binary -out /tmp/repro.hbc repro-full-simulation.js
//   hermes /tmp/repro.hbc
//
// Or directly:
//   hermes repro-full-simulation.js

var modules = {};

function __d(factory, moduleId, dependencyMap) {
  modules[moduleId] = { factory: factory, isInitialized: false, exports: {} };
}

function __r(moduleId) {
  var mod = modules[moduleId];
  if (!mod) throw new Error('Module ' + moduleId + ' not found');
  if (!mod.isInitialized) {
    mod.isInitialized = true;
    try {
      mod.factory(
        globalThis,
        __r,
        function importDefault(id) { return __r(id); },
        function importAll(id) { return __r(id); },
        { exports: mod.exports },
        mod.exports,
        mod.dependencyMap || []
      );
    } catch (e) {
      mod.isInitialized = false;
      throw e;
    }
  }
  return mod.exports;
}

// This is the exact Babel output with hermes-stable profile,
// wrapped in Metro's __d factory exactly as Metro would emit it.
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  // Babel output (hermes-stable profile, catch binding untransformed):
  async function withdraw() {
    try {
      await Promise.reject(new Error('withdraw failed'));
    } catch (error) {
      print('inside catch: ' + error.message); // works
      var rawMessage = error.message || '';

      var callbacks = [];
      callbacks.push(function () {
        print('deferred: ' + error.message); // ReferenceError?
      });

      // simulate setTimeout by calling deferred
      callbacks[0]();
    }
  }
  withdraw();
}, 0, []);

__r(0);
