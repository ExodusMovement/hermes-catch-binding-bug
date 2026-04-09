// Minimal reproduction of the Hermes catch binding bug.
//
// This file contains code extracted from a React Native 0.79.7 Metro dev bundle.
// It replicates the exact execution path: Metro module system + JSTimers + the
// catch binding pattern.
//
// Run: hermes repro.js
//
// On standalone Hermes CLI this does NOT reproduce (prints "BUG NOT REPRODUCED").
// Inside a React Native app on iOS/Android it DOES reproduce with ReferenceError.
// The difference is the Hermes runtime binary embedded in the app vs the CLI binary.

// ============================================================================
// Metro require polyfill (extracted from RN 0.79.7 dev bundle, lines 1-400)
// ============================================================================
// Hermes CLI doesn't have console — shim it with print()
if (typeof console === 'undefined') {
  globalThis.console = { log: print, error: print, warn: print };
}
var __DEV__ = true;
var __METRO_GLOBAL_PREFIX__ = '';

(function (global) {
  "use strict";

  global.__r = metroRequire;
  global[__METRO_GLOBAL_PREFIX__ + "__d"] = define;
  global.__c = clear;
  var modules = clear();
  var EMPTY = {};
  var CYCLE_DETECTED = {};
  var _ref = {},
    hasOwnProperty = _ref.hasOwnProperty;
  if (__DEV__) {
    var _global$$RefreshReg$, _global$$RefreshSig$;
    global.$RefreshReg$ = (_global$$RefreshReg$ = global.$RefreshReg$) != null ? _global$$RefreshReg$ : function () {};
    global.$RefreshSig$ = (_global$$RefreshSig$ = global.$RefreshSig$) != null ? _global$$RefreshSig$ : function () {
      return function (type) {
        return type;
      };
    };
  }
  function clear() {
    modules = new Map();
    return modules;
  }
  if (__DEV__) {
    var verboseNamesToModuleIds = new Map();
    var initializingModuleIds = [];
  }
  function define(factory, moduleId, dependencyMap) {
    if (modules.has(moduleId)) return;
    var mod = {
      dependencyMap: dependencyMap,
      factory: factory,
      hasError: false,
      importedAll: EMPTY,
      importedDefault: EMPTY,
      isInitialized: false,
      publicModule: {
        exports: {}
      }
    };
    modules.set(moduleId, mod);
    if (__DEV__) {
      mod.hot = createHotReloadingObject();
      var verboseName = arguments[3];
      if (verboseName) {
        mod.verboseName = verboseName;
        verboseNamesToModuleIds.set(verboseName, moduleId);
      }
    }
  }
  function metroRequire(moduleId) {
    var moduleIdReallyIsNumber = moduleId;
    var module = modules.get(moduleIdReallyIsNumber);
    return module && module.isInitialized ? module.publicModule.exports : guardedLoadModule(moduleIdReallyIsNumber, module);
  }
  function metroImportDefault(moduleId) {
    var exports = metroRequire(moduleId);
    var importedDefault = exports && exports.__esModule ? exports.default : exports;
    return importedDefault;
  }
  function metroImportAll(moduleId) {
    var exports = metroRequire(moduleId);
    var importedAll;
    if (exports && exports.__esModule) {
      importedAll = exports;
    } else {
      importedAll = {};
      if (exports) {
        for (var key in exports) {
          if (hasOwnProperty.call(exports, key)) {
            importedAll[key] = exports[key];
          }
        }
      }
      importedAll.default = exports;
    }
    return importedAll;
  }
  var inGuard = false;
  function guardedLoadModule(moduleId, module) {
    if (!inGuard && global.ErrorUtils) {
      inGuard = true;
      var returnValue;
      try {
        returnValue = loadModuleImplementation(moduleId, module);
      } catch (e) {
        global.ErrorUtils.reportFatalError(e);
      }
      inGuard = false;
      return returnValue;
    } else {
      return loadModuleImplementation(moduleId, module);
    }
  }
  function loadModuleImplementation(moduleId, module) {
    if (!module) {
      throw Error('Requiring unknown module "' + moduleId + '".');
    }
    if (module.hasError) {
      throw module.error;
    }
    module.isInitialized = true;
    var _module = module,
      factory = _module.factory,
      dependencyMap = _module.dependencyMap;
    if (__DEV__) {
      initializingModuleIds.push(moduleId);
    }
    try {
      var moduleObject = module.publicModule;
      if (__DEV__) {
        moduleObject.hot = module.hot;
        var prevRefreshReg = global.$RefreshReg$;
        var prevRefreshSig = global.$RefreshSig$;
      }
      moduleObject.id = moduleId;
      factory(global, metroRequire, metroImportDefault, metroImportAll, moduleObject, moduleObject.exports, dependencyMap);
      if (!__DEV__) {
        module.factory = undefined;
        module.dependencyMap = undefined;
      }
      return moduleObject.exports;
    } catch (e) {
      module.hasError = true;
      module.error = e;
      module.isInitialized = false;
      module.publicModule.exports = undefined;
      throw e;
    } finally {
      if (__DEV__) {
        if (initializingModuleIds.pop() !== moduleId) {
          throw new Error("initializingModuleIds is corrupt; something is terribly wrong");
        }
        global.$RefreshReg$ = prevRefreshReg;
        global.$RefreshSig$ = prevRefreshSig;
      }
    }
  }
  if (__DEV__) {
    function createHotReloadingObject() {
      return { _acceptCallback: null, _disposeCallback: null, _didAccept: false, accept: function(){}, dispose: function(){} };
    }
  }
})(globalThis);

// ============================================================================
// JSTimers (extracted from RN 0.79.7 dev bundle, lines 26261-26540)
// This is how React Native implements setTimeout — it wraps callbacks in
// _allocateCallback + _callTimer with its own try/catch(e).
// ============================================================================
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _nativeSetTimeout = globalThis.setTimeout;
  var GUID = 1;
  var callbacks = [];
  var types = [];
  var timerIDs = [];
  var freeIdxs = [];
  var errors = [];

  function _getFreeIndex() {
    var freeIdx = freeIdxs.pop();
    if (freeIdx === undefined) return timerIDs.length;
    return freeIdx;
  }
  function _allocateCallback(func, type) {
    var id = GUID++;
    var freeIndex = _getFreeIndex();
    timerIDs[freeIndex] = id;
    callbacks[freeIndex] = func;
    types[freeIndex] = type;
    return id;
  }
  function _clearIndex(i) {
    timerIDs[i] = null;
    callbacks[i] = null;
    types[i] = null;
    freeIdxs.push(i);
  }
  function _callTimer(timerID, frameTime, didTimeout) {
    if (timerID > GUID) return;
    var timerIndex = timerIDs.indexOf(timerID);
    if (timerIndex === -1) return;
    var type = types[timerIndex];
    var callback = callbacks[timerIndex];
    if (!callback || !type) return;
    if (type !== 'setInterval') {
      _clearIndex(timerIndex);
    }
    try {
      if (type === 'setTimeout' || type === 'setInterval' || type === 'queueReactNativeMicrotask') {
        callback();
      }
    } catch (e) {
      errors.push(e);
    }
  }

  var JSTimers = {
    setTimeout: function setTimeout(func, duration) {
      var args = [];
      for (var i = 2; i < arguments.length; i++) args.push(arguments[i]);
      var id = _allocateCallback(function () {
        return func.apply(undefined, args);
      }, 'setTimeout');
      // In RN this calls NativeTiming.createTimer(). Here we use the built-in.
      _nativeSetTimeout(function () {
        errors.length = 0;
        _callTimer(id, 0);
        var errorCount = errors.length;
        if (errorCount > 0) {
          if (errorCount > 1) {
            for (var ii = 1; ii < errorCount; ii++) {
              JSTimers.setTimeout(function (error) { throw error; }.bind(null, errors[ii]), 0);
            }
          }
          throw errors[0];
        }
      }, duration || 0);
      return id;
    },
    clearTimeout: function clearTimeout(timerID) {}
  };

  exports.default = JSTimers;
}, 1, [], "JSTimers");

// ============================================================================
// Polyfill global.setTimeout with JSTimers.setTimeout (as RN does)
// ============================================================================
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var JSTimers = _$$_REQUIRE(_dependencyMap[0], "JSTimers").default;
  global.setTimeout = JSTimers.setTimeout.bind(JSTimers);
}, 2, [1], "TimerPolyfill");

// ============================================================================
// App module: the catch binding repro
// This is the exact Babel output from @react-native/babel-preset hermes-stable.
// The catch binding is NOT transformed — passed through as-is to Hermes.
// ============================================================================
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  _$$_REQUIRE(_dependencyMap[0], "TimerPolyfill");
  try {
    throw new Error('catch-binding-bug');
  } catch (error) {
    console.log('inside catch:', error.message);
    setTimeout(function () {
      try {
        console.log('deferred:', error.message);
        console.log('BUG NOT REPRODUCED');
      } catch (e) {
        console.log('BUG REPRODUCED:', e.message);
      }
    }, 100);
  }
}, 0, [2], "App.tsx");

// ============================================================================
// Entry point
// ============================================================================
__r(0);
console.log('module loaded, waiting for setTimeout...');
