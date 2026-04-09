var __BUNDLE_START_TIME__=globalThis.nativePerformanceNow?nativePerformanceNow():Date.now(),__DEV__=true,process=globalThis.process||{},__METRO_GLOBAL_PREFIX__='',__requireCycleIgnorePatterns=[/(^|\/|\\)node_modules($|\/|\\)/];process.env=process.env||{};process.env.NODE_ENV=process.env.NODE_ENV||"development";
(function (global) {
  "use strict";

  global.__r = metroRequire;
  global[`${__METRO_GLOBAL_PREFIX__}__d`] = define;
  global.__c = clear;
  global.__registerSegment = registerSegment;
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
    var getModuleIdForVerboseName = function getModuleIdForVerboseName(verboseName) {
      var moduleId = verboseNamesToModuleIds.get(verboseName);
      if (moduleId == null) {
        throw new Error(`Unknown named module: "${verboseName}"`);
      }
      return moduleId;
    };
    var initializingModuleIds = [];
  }
  function define(factory, moduleId, dependencyMap) {
    if (modules.has(moduleId)) {
      if (__DEV__) {
        var inverseDependencies = arguments[4];
        if (inverseDependencies) {
          global.__accept(moduleId, factory, dependencyMap, inverseDependencies);
        }
      }
      return;
    }
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
  function metroRequire(moduleId, maybeNameForDev) {
    if (moduleId === null) {
      if (__DEV__ && typeof maybeNameForDev === "string") {
        throw new Error("Cannot find module '" + maybeNameForDev + "'");
      }
      throw new Error("Cannot find module");
    }
    if (__DEV__ && typeof moduleId === "string") {
      var verboseName = moduleId;
      moduleId = getModuleIdForVerboseName(verboseName);
      console.warn(`Requiring module "${verboseName}" by name is only supported for ` + "debugging purposes and will BREAK IN PRODUCTION!");
    }
    var moduleIdReallyIsNumber = moduleId;
    if (__DEV__) {
      var initializingIndex = initializingModuleIds.indexOf(moduleIdReallyIsNumber);
      if (initializingIndex !== -1) {
        var cycle = initializingModuleIds.slice(initializingIndex).map(function (id) {
          var _modules$get$verboseN, _modules$get;
          return (_modules$get$verboseN = (_modules$get = modules.get(id)) == null ? void 0 : _modules$get.verboseName) != null ? _modules$get$verboseN : "[unknown]";
        });
        if (shouldPrintRequireCycle(cycle)) {
          cycle.push(cycle[0]);
          console.warn(`Require cycle: ${cycle.join(" -> ")}\n\n` + "Require cycles are allowed, but can result in uninitialized values. " + "Consider refactoring to remove the need for a cycle.");
        }
      }
    }
    var module = modules.get(moduleIdReallyIsNumber);
    return module && module.isInitialized ? module.publicModule.exports : guardedLoadModule(moduleIdReallyIsNumber, module);
  }
  function shouldPrintRequireCycle(modules) {
    var regExps = global[__METRO_GLOBAL_PREFIX__ + "__requireCycleIgnorePatterns"];
    if (!Array.isArray(regExps)) {
      return true;
    }
    var isIgnored = function isIgnored(module) {
      return module != null && regExps.some(function (regExp) {
        return regExp.test(module);
      });
    };
    return modules.every(function (module) {
      return !isIgnored(module);
    });
  }
  function metroImportDefault(moduleId) {
    if (__DEV__ && typeof moduleId === "string") {
      var verboseName = moduleId;
      moduleId = getModuleIdForVerboseName(verboseName);
    }
    var moduleIdReallyIsNumber = moduleId;
    var maybeInitializedModule = modules.get(moduleIdReallyIsNumber);
    if (maybeInitializedModule && maybeInitializedModule.importedDefault !== EMPTY) {
      return maybeInitializedModule.importedDefault;
    }
    var exports = metroRequire(moduleIdReallyIsNumber);
    var importedDefault = exports && exports.__esModule ? exports.default : exports;
    var initializedModule = modules.get(moduleIdReallyIsNumber);
    return initializedModule.importedDefault = importedDefault;
  }
  metroRequire.importDefault = metroImportDefault;
  function metroImportAll(moduleId) {
    if (__DEV__ && typeof moduleId === "string") {
      var verboseName = moduleId;
      moduleId = getModuleIdForVerboseName(verboseName);
    }
    var moduleIdReallyIsNumber = moduleId;
    var maybeInitializedModule = modules.get(moduleIdReallyIsNumber);
    if (maybeInitializedModule && maybeInitializedModule.importedAll !== EMPTY) {
      return maybeInitializedModule.importedAll;
    }
    var exports = metroRequire(moduleIdReallyIsNumber);
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
    var initializedModule = modules.get(moduleIdReallyIsNumber);
    return initializedModule.importedAll = importedAll;
  }
  metroRequire.importAll = metroImportAll;
  metroRequire.context = function fallbackRequireContext() {
    if (__DEV__) {
      throw new Error("The experimental Metro feature `require.context` is not enabled in your project.\nThis can be enabled by setting the `transformer.unstable_allowRequireContext` property to `true` in your Metro configuration.");
    }
    throw new Error("The experimental Metro feature `require.context` is not enabled in your project.");
  };
  metroRequire.resolveWeak = function fallbackRequireResolveWeak() {
    if (__DEV__) {
      throw new Error("require.resolveWeak cannot be called dynamically. Ensure you are using the same version of `metro` and `metro-runtime`.");
    }
    throw new Error("require.resolveWeak cannot be called dynamically.");
  };
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
  var ID_MASK_SHIFT = 16;
  var LOCAL_ID_MASK = ~0 >>> ID_MASK_SHIFT;
  function unpackModuleId(moduleId) {
    var segmentId = moduleId >>> ID_MASK_SHIFT;
    var localId = moduleId & LOCAL_ID_MASK;
    return {
      segmentId: segmentId,
      localId: localId
    };
  }
  metroRequire.unpackModuleId = unpackModuleId;
  function packModuleId(value) {
    return (value.segmentId << ID_MASK_SHIFT) + value.localId;
  }
  metroRequire.packModuleId = packModuleId;
  var moduleDefinersBySegmentID = [];
  var definingSegmentByModuleID = new Map();
  function registerSegment(segmentId, moduleDefiner, moduleIds) {
    moduleDefinersBySegmentID[segmentId] = moduleDefiner;
    if (__DEV__) {
      if (segmentId === 0 && moduleIds) {
        throw new Error("registerSegment: Expected moduleIds to be null for main segment");
      }
      if (segmentId !== 0 && !moduleIds) {
        throw new Error("registerSegment: Expected moduleIds to be passed for segment #" + segmentId);
      }
    }
    if (moduleIds) {
      moduleIds.forEach(function (moduleId) {
        if (!modules.has(moduleId) && !definingSegmentByModuleID.has(moduleId)) {
          definingSegmentByModuleID.set(moduleId, segmentId);
        }
      });
    }
  }
  function loadModuleImplementation(moduleId, module) {
    if (!module && moduleDefinersBySegmentID.length > 0) {
      var _definingSegmentByMod;
      var segmentId = (_definingSegmentByMod = definingSegmentByModuleID.get(moduleId)) != null ? _definingSegmentByMod : 0;
      var definer = moduleDefinersBySegmentID[segmentId];
      if (definer != null) {
        definer(moduleId);
        module = modules.get(moduleId);
        definingSegmentByModuleID.delete(moduleId);
      }
    }
    var nativeRequire = global.nativeRequire;
    if (!module && nativeRequire) {
      var _unpackModuleId = unpackModuleId(moduleId),
        _segmentId = _unpackModuleId.segmentId,
        localId = _unpackModuleId.localId;
      nativeRequire(localId, _segmentId);
      module = modules.get(moduleId);
    }
    if (!module) {
      throw unknownModuleError(moduleId);
    }
    if (module.hasError) {
      throw module.error;
    }
    if (__DEV__) {
      var Systrace = requireSystrace();
      var Refresh = requireRefresh();
    }
    module.isInitialized = true;
    var _module = module,
      factory = _module.factory,
      dependencyMap = _module.dependencyMap;
    if (__DEV__) {
      initializingModuleIds.push(moduleId);
    }
    try {
      if (__DEV__) {
        Systrace.beginEvent("JS_require_" + (module.verboseName || moduleId));
      }
      var moduleObject = module.publicModule;
      if (__DEV__) {
        moduleObject.hot = module.hot;
        var prevRefreshReg = global.$RefreshReg$;
        var prevRefreshSig = global.$RefreshSig$;
        if (Refresh != null) {
          var RefreshRuntime = Refresh;
          global.$RefreshReg$ = function (type, id) {
            var prefixedModuleId = __METRO_GLOBAL_PREFIX__ + " " + moduleId + " " + id;
            RefreshRuntime.register(type, prefixedModuleId);
          };
          global.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
        }
      }
      moduleObject.id = moduleId;
      factory(global, metroRequire, metroImportDefault, metroImportAll, moduleObject, moduleObject.exports, dependencyMap);
      if (!__DEV__) {
        module.factory = undefined;
        module.dependencyMap = undefined;
      }
      if (__DEV__) {
        Systrace.endEvent();
        if (Refresh != null) {
          var prefixedModuleId = __METRO_GLOBAL_PREFIX__ + " " + moduleId;
          registerExportsForReactRefresh(Refresh, moduleObject.exports, prefixedModuleId);
        }
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
  function unknownModuleError(id) {
    var message = 'Requiring unknown module "' + id + '".';
    if (__DEV__) {
      message += " If you are sure the module exists, try restarting Metro. " + "You may also want to run `yarn` or `npm install`.";
    }
    return Error(message);
  }
  if (__DEV__) {
    metroRequire.Systrace = {
      beginEvent: function beginEvent() {},
      endEvent: function endEvent() {}
    };
    metroRequire.getModules = function () {
      return modules;
    };
    var createHotReloadingObject = function createHotReloadingObject() {
      var hot = {
        _acceptCallback: null,
        _disposeCallback: null,
        _didAccept: false,
        accept: function accept(callback) {
          hot._didAccept = true;
          hot._acceptCallback = callback;
        },
        dispose: function dispose(callback) {
          hot._disposeCallback = callback;
        }
      };
      return hot;
    };
    var reactRefreshTimeout = null;
    var metroHotUpdateModule = function metroHotUpdateModule(id, factory, dependencyMap, inverseDependencies) {
      var mod = modules.get(id);
      if (!mod) {
        if (factory) {
          return;
        }
        throw unknownModuleError(id);
      }
      if (!mod.hasError && !mod.isInitialized) {
        mod.factory = factory;
        mod.dependencyMap = dependencyMap;
        return;
      }
      var Refresh = requireRefresh();
      var refreshBoundaryIDs = new Set();
      var didBailOut = false;
      var updatedModuleIDs;
      try {
        updatedModuleIDs = topologicalSort([id], function (pendingID) {
          var pendingModule = modules.get(pendingID);
          if (pendingModule == null) {
            return [];
          }
          var pendingHot = pendingModule.hot;
          if (pendingHot == null) {
            throw new Error("[Refresh] Expected module.hot to always exist in DEV.");
          }
          var canAccept = pendingHot._didAccept;
          if (!canAccept && Refresh != null) {
            var isBoundary = isReactRefreshBoundary(Refresh, pendingModule.publicModule.exports);
            if (isBoundary) {
              canAccept = true;
              refreshBoundaryIDs.add(pendingID);
            }
          }
          if (canAccept) {
            return [];
          }
          var parentIDs = inverseDependencies[pendingID];
          if (parentIDs.length === 0) {
            performFullRefresh("No root boundary", {
              source: mod,
              failed: pendingModule
            });
            didBailOut = true;
            return [];
          }
          return parentIDs;
        }, function () {
          return didBailOut;
        }).reverse();
      } catch (e) {
        if (e === CYCLE_DETECTED) {
          performFullRefresh("Dependency cycle", {
            source: mod
          });
          return;
        }
        throw e;
      }
      if (didBailOut) {
        return;
      }
      var seenModuleIDs = new Set();
      for (var i = 0; i < updatedModuleIDs.length; i++) {
        var updatedID = updatedModuleIDs[i];
        if (seenModuleIDs.has(updatedID)) {
          continue;
        }
        seenModuleIDs.add(updatedID);
        var updatedMod = modules.get(updatedID);
        if (updatedMod == null) {
          throw new Error("[Refresh] Expected to find the updated module.");
        }
        var prevExports = updatedMod.publicModule.exports;
        var didError = runUpdatedModule(updatedID, updatedID === id ? factory : undefined, updatedID === id ? dependencyMap : undefined);
        var nextExports = updatedMod.publicModule.exports;
        if (didError) {
          return;
        }
        if (refreshBoundaryIDs.has(updatedID)) {
          var isNoLongerABoundary = !isReactRefreshBoundary(Refresh, nextExports);
          var didInvalidate = shouldInvalidateReactRefreshBoundary(Refresh, prevExports, nextExports);
          if (isNoLongerABoundary || didInvalidate) {
            var parentIDs = inverseDependencies[updatedID];
            if (parentIDs.length === 0) {
              performFullRefresh(isNoLongerABoundary ? "No longer a boundary" : "Invalidated boundary", {
                source: mod,
                failed: updatedMod
              });
              return;
            }
            for (var j = 0; j < parentIDs.length; j++) {
              var parentID = parentIDs[j];
              var parentMod = modules.get(parentID);
              if (parentMod == null) {
                throw new Error("[Refresh] Expected to find parent module.");
              }
              var canAcceptParent = isReactRefreshBoundary(Refresh, parentMod.publicModule.exports);
              if (canAcceptParent) {
                refreshBoundaryIDs.add(parentID);
                updatedModuleIDs.push(parentID);
              } else {
                performFullRefresh("Invalidated boundary", {
                  source: mod,
                  failed: parentMod
                });
                return;
              }
            }
          }
        }
      }
      if (Refresh != null) {
        if (reactRefreshTimeout == null) {
          reactRefreshTimeout = setTimeout(function () {
            reactRefreshTimeout = null;
            Refresh.performReactRefresh();
          }, 30);
        }
      }
    };
    var topologicalSort = function topologicalSort(roots, getEdges, earlyStop) {
      var result = [];
      var visited = new Set();
      var stack = new Set();
      function traverseDependentNodes(node) {
        if (stack.has(node)) {
          throw CYCLE_DETECTED;
        }
        if (visited.has(node)) {
          return;
        }
        visited.add(node);
        stack.add(node);
        var dependentNodes = getEdges(node);
        if (earlyStop(node)) {
          stack.delete(node);
          return;
        }
        dependentNodes.forEach(function (dependent) {
          traverseDependentNodes(dependent);
        });
        stack.delete(node);
        result.push(node);
      }
      roots.forEach(function (root) {
        traverseDependentNodes(root);
      });
      return result;
    };
    var runUpdatedModule = function runUpdatedModule(id, factory, dependencyMap) {
      var mod = modules.get(id);
      if (mod == null) {
        throw new Error("[Refresh] Expected to find the module.");
      }
      var hot = mod.hot;
      if (!hot) {
        throw new Error("[Refresh] Expected module.hot to always exist in DEV.");
      }
      if (hot._disposeCallback) {
        try {
          hot._disposeCallback();
        } catch (error) {
          console.error(`Error while calling dispose handler for module ${id}: `, error);
        }
      }
      if (factory) {
        mod.factory = factory;
      }
      if (dependencyMap) {
        mod.dependencyMap = dependencyMap;
      }
      mod.hasError = false;
      mod.error = undefined;
      mod.importedAll = EMPTY;
      mod.importedDefault = EMPTY;
      mod.isInitialized = false;
      var prevExports = mod.publicModule.exports;
      mod.publicModule.exports = {};
      hot._didAccept = false;
      hot._acceptCallback = null;
      hot._disposeCallback = null;
      metroRequire(id);
      if (mod.hasError) {
        mod.hasError = false;
        mod.isInitialized = true;
        mod.error = null;
        mod.publicModule.exports = prevExports;
        return true;
      }
      if (hot._acceptCallback) {
        try {
          hot._acceptCallback();
        } catch (error) {
          console.error(`Error while calling accept handler for module ${id}: `, error);
        }
      }
      return false;
    };
    var performFullRefresh = function performFullRefresh(reason, modules) {
      if (typeof window !== "undefined" && window.location != null && typeof window.location.reload === "function") {
        window.location.reload();
      } else {
        var Refresh = requireRefresh();
        if (Refresh != null) {
          var _modules$source$verbo, _modules$source, _modules$failed$verbo, _modules$failed;
          var sourceName = (_modules$source$verbo = (_modules$source = modules.source) == null ? void 0 : _modules$source.verboseName) != null ? _modules$source$verbo : "unknown";
          var failedName = (_modules$failed$verbo = (_modules$failed = modules.failed) == null ? void 0 : _modules$failed.verboseName) != null ? _modules$failed$verbo : "unknown";
          Refresh.performFullRefresh(`Fast Refresh - ${reason} <${sourceName}> <${failedName}>`);
        } else {
          console.warn("Could not reload the application after an edit.");
        }
      }
    };
    var isReactRefreshBoundary = function isReactRefreshBoundary(Refresh, moduleExports) {
      if (Refresh.isLikelyComponentType(moduleExports)) {
        return true;
      }
      if (moduleExports == null || typeof moduleExports !== "object") {
        return false;
      }
      var hasExports = false;
      var areAllExportsComponents = true;
      for (var key in moduleExports) {
        hasExports = true;
        if (key === "__esModule") {
          continue;
        }
        var desc = Object.getOwnPropertyDescriptor(moduleExports, key);
        if (desc && desc.get) {
          return false;
        }
        var exportValue = moduleExports[key];
        if (!Refresh.isLikelyComponentType(exportValue)) {
          areAllExportsComponents = false;
        }
      }
      return hasExports && areAllExportsComponents;
    };
    var shouldInvalidateReactRefreshBoundary = function shouldInvalidateReactRefreshBoundary(Refresh, prevExports, nextExports) {
      var prevSignature = getRefreshBoundarySignature(Refresh, prevExports);
      var nextSignature = getRefreshBoundarySignature(Refresh, nextExports);
      if (prevSignature.length !== nextSignature.length) {
        return true;
      }
      for (var i = 0; i < nextSignature.length; i++) {
        if (prevSignature[i] !== nextSignature[i]) {
          return true;
        }
      }
      return false;
    };
    var getRefreshBoundarySignature = function getRefreshBoundarySignature(Refresh, moduleExports) {
      var signature = [];
      signature.push(Refresh.getFamilyByType(moduleExports));
      if (moduleExports == null || typeof moduleExports !== "object") {
        return signature;
      }
      for (var key in moduleExports) {
        if (key === "__esModule") {
          continue;
        }
        var desc = Object.getOwnPropertyDescriptor(moduleExports, key);
        if (desc && desc.get) {
          continue;
        }
        var exportValue = moduleExports[key];
        signature.push(key);
        signature.push(Refresh.getFamilyByType(exportValue));
      }
      return signature;
    };
    var registerExportsForReactRefresh = function registerExportsForReactRefresh(Refresh, moduleExports, moduleID) {
      Refresh.register(moduleExports, moduleID + " %exports%");
      if (moduleExports == null || typeof moduleExports !== "object") {
        return;
      }
      for (var key in moduleExports) {
        var desc = Object.getOwnPropertyDescriptor(moduleExports, key);
        if (desc && desc.get) {
          continue;
        }
        var exportValue = moduleExports[key];
        var typeID = moduleID + " %exports% " + key;
        Refresh.register(exportValue, typeID);
      }
    };
    global.__accept = metroHotUpdateModule;
  }
  if (__DEV__) {
    var requireSystrace = function requireSystrace() {
      return global[__METRO_GLOBAL_PREFIX__ + "__SYSTRACE"] || metroRequire.Systrace;
    };
    var requireRefresh = function requireRefresh() {
      return global[__METRO_GLOBAL_PREFIX__ + "__ReactRefresh"] || global[global.__METRO_GLOBAL_PREFIX__ + "__ReactRefresh"] || metroRequire.Refresh;
    };
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  /**
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * @polyfill
   * @nolint
   * @format
   */

  'use client';

  /* eslint-disable no-shadow, eqeqeq, curly, no-unused-vars, no-void, no-control-regex  */

  /**
   * This pipes all of our console logging functions to native logging so that
   * JavaScript errors in required modules show up in Xcode via NSLog.
   */
  var inspect = function () {
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    //
    // https://github.com/joyent/node/blob/master/lib/util.js

    function inspect(obj, opts) {
      var ctx = {
        seen: [],
        formatValueCalls: 0,
        stylize: stylizeNoColor
      };
      return formatValue(ctx, obj, opts.depth);
    }
    function stylizeNoColor(str, styleType) {
      return str;
    }
    function arrayToHash(array) {
      var hash = {};
      array.forEach(function (val, idx) {
        hash[val] = true;
      });
      return hash;
    }
    function formatValue(ctx, value, recurseTimes) {
      ctx.formatValueCalls++;
      if (ctx.formatValueCalls > 200) {
        return `[TOO BIG formatValueCalls ${ctx.formatValueCalls} exceeded limit of 200]`;
      }

      // Primitive types cannot have properties
      var primitive = formatPrimitive(ctx, value);
      if (primitive) {
        return primitive;
      }

      // Look up the keys of the object.
      var keys = Object.keys(value);
      var visibleKeys = arrayToHash(keys);

      // IE doesn't make error fields non-enumerable
      // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
      if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
        return formatError(value);
      }

      // Some type of object without properties can be shortcutted.
      if (keys.length === 0) {
        if (isFunction(value)) {
          var name = value.name ? ': ' + value.name : '';
          return ctx.stylize('[Function' + name + ']', 'special');
        }
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }
        if (isDate(value)) {
          return ctx.stylize(Date.prototype.toString.call(value), 'date');
        }
        if (isError(value)) {
          return formatError(value);
        }
      }
      var base = '',
        array = false,
        braces = ['{', '}'];

      // Make Array say that they are Array
      if (isArray(value)) {
        array = true;
        braces = ['[', ']'];
      }

      // Make functions say that they are functions
      if (isFunction(value)) {
        var n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
      }

      // Make RegExps say that they are RegExps
      if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
      }

      // Make dates with properties first say the date
      if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value);
      }

      // Make error with message first say the error
      if (isError(value)) {
        base = ' ' + formatError(value);
      }
      if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
      }
      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        } else {
          return ctx.stylize('[Object]', 'special');
        }
      }
      ctx.seen.push(value);
      var output;
      if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
      } else {
        output = keys.map(function (key) {
          return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
      }
      ctx.seen.pop();
      return reduceToSingleString(output, base, braces);
    }
    function formatPrimitive(ctx, value) {
      if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
      if (isString(value)) {
        var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return ctx.stylize(simple, 'string');
      }
      if (isNumber(value)) return ctx.stylize('' + value, 'number');
      if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
      // For some reason typeof null is "object", so special case here.
      if (isNull(value)) return ctx.stylize('null', 'null');
    }
    function formatError(value) {
      return '[' + Error.prototype.toString.call(value) + ']';
    }
    function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
      var output = [];
      for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
        } else {
          output.push('');
        }
      }
      keys.forEach(function (key) {
        if (!key.match(/^\d+$/)) {
          output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
        }
      });
      return output;
    }
    function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
      var name, str, desc;
      desc = Object.getOwnPropertyDescriptor(value, key) || {
        value: value[key]
      };
      if (desc.get) {
        if (desc.set) {
          str = ctx.stylize('[Getter/Setter]', 'special');
        } else {
          str = ctx.stylize('[Getter]', 'special');
        }
      } else {
        if (desc.set) {
          str = ctx.stylize('[Setter]', 'special');
        }
      }
      if (!hasOwnProperty(visibleKeys, key)) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
          if (isNull(recurseTimes)) {
            str = formatValue(ctx, desc.value, null);
          } else {
            str = formatValue(ctx, desc.value, recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (array) {
              str = str.split('\n').map(function (line) {
                return '  ' + line;
              }).join('\n').slice(2);
            } else {
              str = '\n' + str.split('\n').map(function (line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = ctx.stylize('[Circular]', 'special');
        }
      }
      if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.slice(1, name.length - 1);
          name = ctx.stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
          name = ctx.stylize(name, 'string');
        }
      }
      return name + ': ' + str;
    }
    function reduceToSingleString(output, base, braces) {
      var numLinesEst = 0;
      var length = output.reduce(function (prev, cur) {
        numLinesEst++;
        if (cur.indexOf('\n') >= 0) numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
      }, 0);
      if (length > 60) {
        return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
      }
      return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }

    // NOTE: These type checking functions intentionally don't use `instanceof`
    // because it is fragile and can be easily faked with `Object.create()`.
    function isArray(ar) {
      return Array.isArray(ar);
    }
    function isBoolean(arg) {
      return typeof arg === 'boolean';
    }
    function isNull(arg) {
      return arg === null;
    }
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    function isNumber(arg) {
      return typeof arg === 'number';
    }
    function isString(arg) {
      return typeof arg === 'string';
    }
    function isSymbol(arg) {
      return typeof arg === 'symbol';
    }
    function isUndefined(arg) {
      return arg === void 0;
    }
    function isRegExp(re) {
      return isObject(re) && objectToString(re) === '[object RegExp]';
    }
    function isObject(arg) {
      return typeof arg === 'object' && arg !== null;
    }
    function isDate(d) {
      return isObject(d) && objectToString(d) === '[object Date]';
    }
    function isError(e) {
      return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
    }
    function isFunction(arg) {
      return typeof arg === 'function';
    }
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    return inspect;
  }();
  var INDEX_COLUMN_NAME = '(index)';
  var LOG_LEVELS = {
    trace: 0,
    info: 1,
    warn: 2,
    error: 3
  };
  function getNativeLogFunction(level) {
    return function () {
      var str;
      if (arguments.length === 1 && typeof arguments[0] === 'string') {
        str = arguments[0];
      } else {
        str = Array.prototype.map.call(arguments, function (arg) {
          return inspect(arg, {
            depth: 10
          });
        }).join(', ');
      }

      // TRICKY
      // If more than one argument is provided, the code above collapses them all
      // into a single formatted string. This transform wraps string arguments in
      // single quotes (e.g. "foo" -> "'foo'") which then breaks the "Warning:"
      // check below. So it's important that we look at the first argument, rather
      // than the formatted argument string.
      var firstArg = arguments[0];
      var logLevel = level;
      if (typeof firstArg === 'string' && firstArg.slice(0, 9) === 'Warning: ' && logLevel >= LOG_LEVELS.error) {
        // React warnings use console.error so that a stack trace is shown,
        // but we don't (currently) want these to show a redbox
        // (Note: Logic duplicated in ExceptionsManager.js.)
        logLevel = LOG_LEVELS.warn;
      }
      if (groupStack.length) {
        str = groupFormat('', str);
      }
      global.nativeLoggingHook(str, logLevel);
    };
  }
  function repeat(element, n) {
    return Array.apply(null, Array(n)).map(function () {
      return element;
    });
  }
  function formatCellValue(cell, key) {
    if (key === INDEX_COLUMN_NAME) {
      return cell[key];
    }
    if (cell.hasOwnProperty(key)) {
      var cellValue = cell[key];
      switch (typeof cellValue) {
        case 'function':
          return 'ƒ';
        case 'string':
          return "'" + cellValue + "'";
        case 'object':
          return cellValue == null ? 'null' : '{…}';
      }
      return String(cellValue);
    }
    return '';
  }
  function consoleTablePolyfill(data, columns) {
    var rows;

    // convert object -> array
    if (Array.isArray(data)) {
      rows = data.map(function (row, index) {
        var processedRow = {};
        processedRow[INDEX_COLUMN_NAME] = String(index);
        Object.assign(processedRow, row);
        return processedRow;
      });
    } else {
      rows = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          var processedRow = {};
          processedRow[INDEX_COLUMN_NAME] = key;
          Object.assign(processedRow, data[key]);
          rows.push(processedRow);
        }
      }
    }
    if (rows.length === 0) {
      global.nativeLoggingHook('', LOG_LEVELS.info);
      return;
    }
    if (Array.isArray(columns)) {
      columns = [INDEX_COLUMN_NAME].concat(columns);
    } else {
      columns = Array.from(rows.reduce(function (columnSet, row) {
        Object.keys(row).forEach(function (key) {
          return columnSet.add(key);
        });
        return columnSet;
      }, new Set()));
    }
    var stringRows = [];
    var columnWidths = [];

    // Convert each cell to a string. Also
    // figure out max cell width for each column
    columns.forEach(function (k, i) {
      columnWidths[i] = k.length;
      for (var j = 0; j < rows.length; j++) {
        var cellStr = formatCellValue(rows[j], k);
        stringRows[j] = stringRows[j] || [];
        stringRows[j][i] = cellStr;
        columnWidths[i] = Math.max(columnWidths[i], cellStr.length);
      }
    });

    // Join all elements in the row into a single string with | separators
    // (appends extra spaces to each cell to make separators  | aligned)
    function joinRow(row, space) {
      var cells = row.map(function (cell, i) {
        var extraSpaces = repeat(' ', columnWidths[i] - cell.length).join('');
        return cell + extraSpaces;
      });
      space = space || ' ';
      return '| ' + cells.join(space + '|' + space) + ' |';
    }
    var separators = columnWidths.map(function (columnWidth) {
      return repeat('-', columnWidth).join('');
    });
    var separatorRow = joinRow(separators);
    var header = joinRow(columns);
    var table = [header, separatorRow];
    for (var i = 0; i < rows.length; i++) {
      table.push(joinRow(stringRows[i]));
    }

    // Notice extra empty line at the beginning.
    // Native logging hook adds "RCTLog >" at the front of every
    // logged string, which would shift the header and screw up
    // the table
    global.nativeLoggingHook('\n' + table.join('\n'), LOG_LEVELS.info);
  }
  var GROUP_PAD = "\u2502"; // Box light vertical
  var GROUP_OPEN = "\u2510"; // Box light down+left
  var GROUP_CLOSE = "\u2518"; // Box light up+left

  var groupStack = [];
  function groupFormat(prefix, msg) {
    // Insert group formatting before the console message
    return groupStack.join('') + prefix + ' ' + (msg || '');
  }
  function consoleGroupPolyfill(label) {
    global.nativeLoggingHook(groupFormat(GROUP_OPEN, label), LOG_LEVELS.info);
    groupStack.push(GROUP_PAD);
  }
  function consoleGroupCollapsedPolyfill(label) {
    global.nativeLoggingHook(groupFormat(GROUP_CLOSE, label), LOG_LEVELS.info);
    groupStack.push(GROUP_PAD);
  }
  function consoleGroupEndPolyfill() {
    groupStack.pop();
    global.nativeLoggingHook(groupFormat(GROUP_CLOSE), LOG_LEVELS.info);
  }
  function consoleAssertPolyfill(expression, label) {
    if (!expression) {
      global.nativeLoggingHook('Assertion failed: ' + label, LOG_LEVELS.error);
    }
  }
  if (global.nativeLoggingHook) {
    var originalConsole = global.console;
    // Preserve the original `console` as `originalConsole`
    if (__DEV__ && originalConsole) {
      var descriptor = Object.getOwnPropertyDescriptor(global, 'console');
      if (descriptor) {
        Object.defineProperty(global, 'originalConsole', descriptor);
      }
    }
    global.console = Object.assign({}, originalConsole != null ? originalConsole : {}, {
      error: getNativeLogFunction(LOG_LEVELS.error),
      info: getNativeLogFunction(LOG_LEVELS.info),
      log: getNativeLogFunction(LOG_LEVELS.info),
      warn: getNativeLogFunction(LOG_LEVELS.warn),
      trace: getNativeLogFunction(LOG_LEVELS.trace),
      debug: getNativeLogFunction(LOG_LEVELS.trace),
      table: consoleTablePolyfill,
      group: consoleGroupPolyfill,
      groupEnd: consoleGroupEndPolyfill,
      groupCollapsed: consoleGroupCollapsedPolyfill,
      assert: consoleAssertPolyfill
    });

    // TODO(T206796580): This was copy-pasted from ExceptionsManager.js
    // Delete the copy there after the c++ pipeline is rolled out everywhere.
    if (global.RN$useAlwaysAvailableJSErrorHandling === true) {
      var stringifySafe = function stringifySafe(arg) {
        return inspect(arg, {
          depth: 10
        }).replace(/\n\s*/g, ' ');
      };
      var originalConsoleError = console.error;
      console.reportErrorsAsExceptions = true;
      console.error = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        originalConsoleError.apply(this, args);
        if (!console.reportErrorsAsExceptions) {
          return;
        }
        if (global.RN$inExceptionHandler != null && global.RN$inExceptionHandler()) {
          return;
        }
        var error;
        var firstArg = args[0];
        if (firstArg != null && firstArg.stack) {
          // RN$handleException will console.error this with high enough fidelity.
          error = firstArg;
        } else {
          if (typeof firstArg === 'string' && firstArg.startsWith('Warning: ')) {
            // React warnings use console.error so that a stack trace is shown, but
            // we don't (currently) want these to show a redbox
            return;
          }
          var message = args.map(function (arg) {
            return typeof arg === 'string' ? arg : stringifySafe(arg);
          }).join(' ');
          error = new Error(message);
          error.name = 'console.error';
        }
        var isFatal = false;
        var reportToConsole = false;
        global.RN$handleException(error, isFatal, reportToConsole);
      };
    }
    Object.defineProperty(console, '_isPolyfilled', {
      value: true,
      enumerable: false
    });

    // If available, also call the original `console` method since that is
    // sometimes useful. Ex: on OS X, this will let you see rich output in
    // the Safari Web Inspector console.
    if (__DEV__ && originalConsole) {
      Object.keys(console).forEach(function (methodName) {
        var reactNativeMethod = console[methodName];
        if (originalConsole[methodName] && reactNativeMethod !== originalConsole[methodName]) {
          console[methodName] = function () {
            originalConsole[methodName].apply(originalConsole, arguments);
            reactNativeMethod.apply(console, arguments);
          };
        }
      });

      // The following methods are not supported by this polyfill but
      // we still should pass them to original console if they are
      // supported by it.
      ['clear', 'dir', 'dirxml', 'profile', 'profileEnd'].forEach(function (methodName) {
        if (typeof originalConsole[methodName] === 'function') {
          console[methodName] = function () {
            originalConsole[methodName].apply(originalConsole, arguments);
          };
        }
      });
    }
  } else if (!global.console) {
    var stub = function stub() {};
    var log = global.print || stub;
    global.console = {
      debug: log,
      error: log,
      info: log,
      log: log,
      trace: log,
      warn: log,
      assert: function assert(expression, label) {
        if (!expression) {
          log('Assertion failed: ' + label);
        }
      },
      clear: stub,
      dir: stub,
      dirxml: stub,
      group: stub,
      groupCollapsed: stub,
      groupEnd: stub,
      profile: stub,
      profileEnd: stub,
      table: stub
    };
    Object.defineProperty(console, '_isPolyfilled', {
      value: true,
      enumerable: false
    });
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
(function (global) {
  var _inGuard = 0;
  var _globalHandler = global.RN$useAlwaysAvailableJSErrorHandling === true ? global.RN$handleException : function (e, isFatal) {
    throw e;
  };
  var ErrorUtils = {
    setGlobalHandler: function setGlobalHandler(fun) {
      _globalHandler = fun;
    },
    getGlobalHandler: function getGlobalHandler() {
      return _globalHandler;
    },
    reportError: function reportError(error) {
      _globalHandler && _globalHandler(error, false);
    },
    reportFatalError: function reportFatalError(error) {
      _globalHandler && _globalHandler(error, true);
    },
    applyWithGuard: function applyWithGuard(fun, context, args, unused_onError, unused_name) {
      try {
        _inGuard++;
        return fun.apply(context, args);
      } catch (e) {
        ErrorUtils.reportError(e);
      } finally {
        _inGuard--;
      }
      return null;
    },
    applyWithGuardIfNeeded: function applyWithGuardIfNeeded(fun, context, args) {
      if (ErrorUtils.inGuard()) {
        return fun.apply(context, args);
      } else {
        ErrorUtils.applyWithGuard(fun, context, args);
      }
      return null;
    },
    inGuard: function inGuard() {
      return !!_inGuard;
    },
    guard: function guard(fun, name, context) {
      var _ref;
      if (typeof fun !== 'function') {
        console.warn('A function must be passed to ErrorUtils.guard, got ', fun);
        return null;
      }
      var guardName = (_ref = name != null ? name : fun.name) != null ? _ref : '<generated guard>';
      function guarded() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return ErrorUtils.applyWithGuard(fun, context != null ? context : this, args, null, guardName);
      }
      return guarded;
    }
  };
  global.ErrorUtils = ErrorUtils;
})(typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this);
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var log = globalThis.nativeLoggingHook || function () {};
  try {
    throw new Error('test');
  } catch (error) {
    setTimeout(function () {
      try {
        var msg = error.message;
        log('BISECT PASS: ' + msg, 3);
      } catch (e) {
        log('BISECT FAIL: ' + e.message, 3);
      }
    }, 0);
  }
},0,[],"index.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  if (global.RN$useAlwaysAvailableJSErrorHandling !== true) {
    var ExceptionsManager = _$$_REQUIRE(_dependencyMap[0], "./ExceptionsManager").default;
    ExceptionsManager.installConsoleErrorReporter();
    if (!global.__fbDisableExceptionsManager) {
      var handleError = function handleError(e, isFatal) {
        try {
          ExceptionsManager.handleException(e, isFatal);
        } catch (ee) {
          console.log('Failed to print error: ', ee.message);
          throw e;
        }
      };
      var ErrorUtils = _$$_REQUIRE(_dependencyMap[1], "../vendor/core/ErrorUtils").default;
      ErrorUtils.setGlobalHandler(handleError);
    }
  }
},256,[172,22],"node_modules/react-native/Libraries/Core/setUpErrorHandling.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var BatchedBridge = new (_$$_REQUIRE(_dependencyMap[0], "./MessageQueue").default)();
  Object.defineProperty(global, '__fbBatchedBridge', {
    configurable: true,
    value: BatchedBridge
  });
  var _default = exports.default = BatchedBridge;
},3,[4],"node_modules/react-native/Libraries/BatchedBridge/BatchedBridge.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/toConsumableArray"));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2], "@babel/runtime/helpers/classCallCheck"));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3], "@babel/runtime/helpers/createClass"));
  var TO_JS = 0;
  var TO_NATIVE = 1;
  var MODULE_IDS = 0;
  var METHOD_IDS = 1;
  var PARAMS = 2;
  var MIN_TIME_BETWEEN_FLUSHES_MS = 5;
  var TRACE_TAG_REACT_APPS = 1 << 17;
  var DEBUG_INFO_LIMIT = 32;
  var MessageQueue = /*#__PURE__*/function () {
    function MessageQueue() {
      (0, _classCallCheck2.default)(this, MessageQueue);
      this._lazyCallableModules = {};
      this._queue = [[], [], [], 0];
      this._successCallbacks = new Map();
      this._failureCallbacks = new Map();
      this._callID = 0;
      this._lastFlush = 0;
      this._eventLoopStartTime = Date.now();
      this._reactNativeMicrotasksCallback = null;
      if (__DEV__) {
        this._debugInfo = {};
        this._remoteModuleTable = {};
        this._remoteMethodTable = {};
      }
      this.callFunctionReturnFlushedQueue = this.callFunctionReturnFlushedQueue.bind(this);
      this.flushedQueue = this.flushedQueue.bind(this);
      this.invokeCallbackAndReturnFlushedQueue = this.invokeCallbackAndReturnFlushedQueue.bind(this);
    }
    return (0, _createClass2.default)(MessageQueue, [{
      key: "callFunctionReturnFlushedQueue",
      value: function callFunctionReturnFlushedQueue(module, method, args) {
        var _this = this;
        this.__guard(function () {
          _this.__callFunction(module, method, args);
        });
        return this.flushedQueue();
      }
    }, {
      key: "invokeCallbackAndReturnFlushedQueue",
      value: function invokeCallbackAndReturnFlushedQueue(cbID, args) {
        var _this2 = this;
        this.__guard(function () {
          _this2.__invokeCallback(cbID, args);
        });
        return this.flushedQueue();
      }
    }, {
      key: "flushedQueue",
      value: function flushedQueue() {
        var _this3 = this;
        this.__guard(function () {
          _this3.__callReactNativeMicrotasks();
        });
        var queue = this._queue;
        this._queue = [[], [], [], this._callID];
        return queue[0].length ? queue : null;
      }
    }, {
      key: "getEventLoopRunningTime",
      value: function getEventLoopRunningTime() {
        return Date.now() - this._eventLoopStartTime;
      }
    }, {
      key: "registerCallableModule",
      value: function registerCallableModule(name, module) {
        this._lazyCallableModules[name] = function () {
          return module;
        };
      }
    }, {
      key: "registerLazyCallableModule",
      value: function registerLazyCallableModule(name, factory) {
        var module;
        var getValue = factory;
        this._lazyCallableModules[name] = function () {
          if (getValue) {
            module = getValue();
            getValue = null;
          }
          return module;
        };
      }
    }, {
      key: "getCallableModule",
      value: function getCallableModule(name) {
        var getValue = this._lazyCallableModules[name];
        return getValue ? getValue() : null;
      }
    }, {
      key: "callNativeSyncHook",
      value: function callNativeSyncHook(moduleID, methodID, params, onFail, onSucc) {
        if (__DEV__) {
          _$$_REQUIRE(_dependencyMap[4], "invariant")(global.nativeCallSyncHook, 'Calling synchronous methods on native ' + 'modules is not supported in Chrome.\n\n Consider providing alternative ' + 'methods to expose this method in debug mode, e.g. by exposing constants ' + 'ahead-of-time.');
        }
        this.processCallbacks(moduleID, methodID, params, onFail, onSucc);
        return global.nativeCallSyncHook(moduleID, methodID, params);
      }
    }, {
      key: "processCallbacks",
      value: function processCallbacks(moduleID, methodID, params, onFail, onSucc) {
        var _this4 = this;
        if (onFail || onSucc) {
          if (__DEV__) {
            this._debugInfo[this._callID] = [moduleID, methodID];
            if (this._callID > DEBUG_INFO_LIMIT) {
              delete this._debugInfo[this._callID - DEBUG_INFO_LIMIT];
            }
            if (this._successCallbacks.size > 500) {
              var info = {};
              this._successCallbacks.forEach(function (_, callID) {
                var debug = _this4._debugInfo[callID];
                var module = debug && _this4._remoteModuleTable[debug[0]];
                var method = debug && _this4._remoteMethodTable[debug[0]][debug[1]];
                info[callID] = {
                  module: module,
                  method: method
                };
              });
              _$$_REQUIRE(_dependencyMap[5], "../Utilities/warnOnce").default('excessive-number-of-pending-callbacks', `Excessive number of pending callbacks: ${this._successCallbacks.size}. Some pending callbacks that might have leaked by never being called from native code: ${_$$_REQUIRE(_dependencyMap[6], "../Utilities/stringifySafe").default(info)}`);
            }
          }
          onFail && params.push(this._callID << 1);
          onSucc && params.push(this._callID << 1 | 1);
          this._successCallbacks.set(this._callID, onSucc);
          this._failureCallbacks.set(this._callID, onFail);
        }
        if (__DEV__) {
          global.nativeTraceBeginAsyncFlow && global.nativeTraceBeginAsyncFlow(TRACE_TAG_REACT_APPS, 'native', this._callID);
        }
        this._callID++;
      }
    }, {
      key: "enqueueNativeCall",
      value: function enqueueNativeCall(moduleID, methodID, params, onFail, onSucc) {
        this.processCallbacks(moduleID, methodID, params, onFail, onSucc);
        this._queue[MODULE_IDS].push(moduleID);
        this._queue[METHOD_IDS].push(methodID);
        if (__DEV__) {
          var _isValidArgument = function isValidArgument(val) {
            switch (typeof val) {
              case 'undefined':
              case 'boolean':
              case 'string':
                return true;
              case 'number':
                return isFinite(val);
              case 'object':
                if (val == null) {
                  return true;
                }
                if (Array.isArray(val)) {
                  return val.every(_isValidArgument);
                }
                for (var k in val) {
                  if (typeof val[k] !== 'function' && !_isValidArgument(val[k])) {
                    return false;
                  }
                }
                return true;
              case 'function':
                return false;
              default:
                return false;
            }
          };
          var replacer = function replacer(key, val) {
            var t = typeof val;
            if (t === 'function') {
              return '<<Function ' + val.name + '>>';
            } else if (t === 'number' && !isFinite(val)) {
              return '<<' + val.toString() + '>>';
            } else {
              return val;
            }
          };
          _$$_REQUIRE(_dependencyMap[4], "invariant")(_isValidArgument(params), '%s is not usable as a native method argument', JSON.stringify(params, replacer));
          _$$_REQUIRE(_dependencyMap[7], "../Utilities/deepFreezeAndThrowOnMutationInDev").default(params);
        }
        this._queue[PARAMS].push(params);
        var now = Date.now();
        if (global.nativeFlushQueueImmediate && now - this._lastFlush >= MIN_TIME_BETWEEN_FLUSHES_MS) {
          var queue = this._queue;
          this._queue = [[], [], [], this._callID];
          this._lastFlush = now;
          global.nativeFlushQueueImmediate(queue);
        }
        _$$_REQUIRE(_dependencyMap[8], "../Performance/Systrace").counterEvent('pending_js_to_native_queue', this._queue[0].length);
        if (__DEV__ && this.__spy && isFinite(moduleID)) {
          this.__spy({
            type: TO_NATIVE,
            module: this._remoteModuleTable[moduleID],
            method: this._remoteMethodTable[moduleID][methodID],
            args: params
          });
        } else if (this.__spy) {
          this.__spy({
            type: TO_NATIVE,
            module: moduleID + '',
            method: methodID,
            args: params
          });
        }
      }
    }, {
      key: "createDebugLookup",
      value: function createDebugLookup(moduleID, name, methods) {
        if (__DEV__) {
          this._remoteModuleTable[moduleID] = name;
          this._remoteMethodTable[moduleID] = methods || [];
        }
      }
    }, {
      key: "setReactNativeMicrotasksCallback",
      value: function setReactNativeMicrotasksCallback(fn) {
        this._reactNativeMicrotasksCallback = fn;
      }
    }, {
      key: "__guard",
      value: function __guard(fn) {
        if (this.__shouldPauseOnThrow()) {
          fn();
        } else {
          try {
            fn();
          } catch (error) {
            _$$_REQUIRE(_dependencyMap[9], "../vendor/core/ErrorUtils").default.reportFatalError(error);
          }
        }
      }
    }, {
      key: "__shouldPauseOnThrow",
      value: function __shouldPauseOnThrow() {
        return typeof DebuggerInternal !== 'undefined' && DebuggerInternal.shouldPauseOnThrow === true;
      }
    }, {
      key: "__callReactNativeMicrotasks",
      value: function __callReactNativeMicrotasks() {
        _$$_REQUIRE(_dependencyMap[8], "../Performance/Systrace").beginEvent('JSTimers.callReactNativeMicrotasks()');
        try {
          if (this._reactNativeMicrotasksCallback != null) {
            this._reactNativeMicrotasksCallback();
          }
        } finally {
          _$$_REQUIRE(_dependencyMap[8], "../Performance/Systrace").endEvent();
        }
      }
    }, {
      key: "__callFunction",
      value: function __callFunction(module, method, args) {
        this._lastFlush = Date.now();
        this._eventLoopStartTime = this._lastFlush;
        if (__DEV__ || this.__spy) {
          _$$_REQUIRE(_dependencyMap[8], "../Performance/Systrace").beginEvent(`${module}.${method}(${_$$_REQUIRE(_dependencyMap[6], "../Utilities/stringifySafe").default(args)})`);
        } else {
          _$$_REQUIRE(_dependencyMap[8], "../Performance/Systrace").beginEvent(`${module}.${method}(...)`);
        }
        try {
          if (this.__spy) {
            this.__spy({
              type: TO_JS,
              module: module,
              method: method,
              args: args
            });
          }
          var moduleMethods = this.getCallableModule(module);
          if (!moduleMethods) {
            var callableModuleNames = Object.keys(this._lazyCallableModules);
            var n = callableModuleNames.length;
            var callableModuleNameList = callableModuleNames.join(', ');
            var isBridgelessMode = global.RN$Bridgeless === true ? 'true' : 'false';
            _$$_REQUIRE(_dependencyMap[4], "invariant")(false, `Failed to call into JavaScript module method ${module}.${method}(). Module has not been registered as callable. Bridgeless Mode: ${isBridgelessMode}. Registered callable JavaScript modules (n = ${n}): ${callableModuleNameList}.
          A frequent cause of the error is that the application entry file path is incorrect. This can also happen when the JS bundle is corrupt or there is an early initialization error when loading React Native.`);
          }
          if (!moduleMethods[method]) {
            _$$_REQUIRE(_dependencyMap[4], "invariant")(false, `Failed to call into JavaScript module method ${module}.${method}(). Module exists, but the method is undefined.`);
          }
          moduleMethods[method].apply(moduleMethods, args);
        } finally {
          _$$_REQUIRE(_dependencyMap[8], "../Performance/Systrace").endEvent();
        }
      }
    }, {
      key: "__invokeCallback",
      value: function __invokeCallback(cbID, args) {
        this._lastFlush = Date.now();
        this._eventLoopStartTime = this._lastFlush;
        var callID = cbID >>> 1;
        var isSuccess = cbID & 1;
        var callback = isSuccess ? this._successCallbacks.get(callID) : this._failureCallbacks.get(callID);
        if (__DEV__) {
          var debug = this._debugInfo[callID];
          var module = debug && this._remoteModuleTable[debug[0]];
          var method = debug && this._remoteMethodTable[debug[0]][debug[1]];
          _$$_REQUIRE(_dependencyMap[4], "invariant")(callback, `No callback found with cbID ${cbID} and callID ${callID} for ` + (method ? ` ${module}.${method} - most likely the callback was already invoked` : `module ${module || '<unknown>'}`) + `. Args: '${_$$_REQUIRE(_dependencyMap[6], "../Utilities/stringifySafe").default(args)}'`);
          var profileName = debug ? '<callback for ' + module + '.' + method + '>' : cbID;
          if (callback && this.__spy) {
            this.__spy({
              type: TO_JS,
              module: null,
              method: profileName,
              args: args
            });
          }
          _$$_REQUIRE(_dependencyMap[8], "../Performance/Systrace").beginEvent(`MessageQueue.invokeCallback(${profileName}, ${_$$_REQUIRE(_dependencyMap[6], "../Utilities/stringifySafe").default(args)})`);
        }
        try {
          if (!callback) {
            return;
          }
          this._successCallbacks.delete(callID);
          this._failureCallbacks.delete(callID);
          callback.apply(void 0, (0, _toConsumableArray2.default)(args));
        } finally {
          if (__DEV__) {
            _$$_REQUIRE(_dependencyMap[8], "../Performance/Systrace").endEvent();
          }
        }
      }
    }], [{
      key: "spy",
      value: function spy(spyOrToggle) {
        if (spyOrToggle === true) {
          MessageQueue.prototype.__spy = function (info) {
            console.log(`${info.type === TO_JS ? 'N->JS' : 'JS->N'} : ` + `${info.module != null ? info.module + '.' : ''}${info.method}` + `(${JSON.stringify(info.args)})`);
          };
        } else if (spyOrToggle === false) {
          MessageQueue.prototype.__spy = null;
        } else {
          MessageQueue.prototype.__spy = spyOrToggle;
        }
      }
    }]);
  }();
  var _default = exports.default = MessageQueue;
},4,[5,6,12,13,17,18,19,20,21,22],"node_modules/react-native/Libraries/BatchedBridge/MessageQueue.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
      "default": e
    };
  }
  module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
},5,[],"node_modules/@babel/runtime/helpers/interopRequireDefault.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _toConsumableArray(r) {
    return _$$_REQUIRE(_dependencyMap[0], "./arrayWithoutHoles.js")(r) || _$$_REQUIRE(_dependencyMap[1], "./iterableToArray.js")(r) || _$$_REQUIRE(_dependencyMap[2], "./unsupportedIterableToArray.js")(r) || _$$_REQUIRE(_dependencyMap[3], "./nonIterableSpread.js")();
  }
  module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},6,[7,9,10,11],"node_modules/@babel/runtime/helpers/toConsumableArray.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _$$_REQUIRE(_dependencyMap[0], "./arrayLikeToArray.js")(r);
  }
  module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
},7,[8],"node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},8,[],"node_modules/@babel/runtime/helpers/arrayLikeToArray.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},9,[],"node_modules/@babel/runtime/helpers/iterableToArray.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _$$_REQUIRE(_dependencyMap[0], "./arrayLikeToArray.js")(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _$$_REQUIRE(_dependencyMap[0], "./arrayLikeToArray.js")(r, a) : void 0;
    }
  }
  module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},10,[8],"node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
},11,[],"node_modules/@babel/runtime/helpers/nonIterableSpread.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
},12,[],"node_modules/@babel/runtime/helpers/classCallCheck.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _$$_REQUIRE(_dependencyMap[0], "./toPropertyKey.js")(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
},13,[14],"node_modules/@babel/runtime/helpers/createClass.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function toPropertyKey(t) {
    var i = _$$_REQUIRE(_dependencyMap[0], "./toPrimitive.js")(t, "string");
    return "symbol" == _$$_REQUIRE(_dependencyMap[1], "./typeof.js")["default"](i) ? i : i + "";
  }
  module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
},14,[15,16],"node_modules/@babel/runtime/helpers/toPropertyKey.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function toPrimitive(t, r) {
    if ("object" != _$$_REQUIRE(_dependencyMap[0], "./typeof.js")["default"](t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _$$_REQUIRE(_dependencyMap[0], "./typeof.js")["default"](i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
},15,[16],"node_modules/@babel/runtime/helpers/toPrimitive.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _typeof(o) {
    "@babel/helpers - typeof";

    return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
  }
  module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
},16,[],"node_modules/@babel/runtime/helpers/typeof.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  'use strict';

  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */
  var invariant = function invariant(condition, format, a, b, c, d, e, f) {
    if (process.env.NODE_ENV !== 'production') {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }
    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function () {
          return args[argIndex++];
        }));
        error.name = 'Invariant Violation';
      }
      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };
  module.exports = invariant;
},17,[],"node_modules/invariant/browser.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var warnedKeys = {};
  function warnOnce(key, message) {
    if (warnedKeys[key]) {
      return;
    }
    console.warn(message);
    warnedKeys[key] = true;
  }
  var _default = exports.default = warnOnce;
},18,[],"node_modules/react-native/Libraries/Utilities/warnOnce.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createStringifySafeWithLimits = createStringifySafeWithLimits;
  exports.default = void 0;
  var _invariant = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "invariant"));
  function createStringifySafeWithLimits(limits) {
    var _limits$maxDepth = limits.maxDepth,
      maxDepth = _limits$maxDepth === void 0 ? Number.POSITIVE_INFINITY : _limits$maxDepth,
      _limits$maxStringLimi = limits.maxStringLimit,
      maxStringLimit = _limits$maxStringLimi === void 0 ? Number.POSITIVE_INFINITY : _limits$maxStringLimi,
      _limits$maxArrayLimit = limits.maxArrayLimit,
      maxArrayLimit = _limits$maxArrayLimit === void 0 ? Number.POSITIVE_INFINITY : _limits$maxArrayLimit,
      _limits$maxObjectKeys = limits.maxObjectKeysLimit,
      maxObjectKeysLimit = _limits$maxObjectKeys === void 0 ? Number.POSITIVE_INFINITY : _limits$maxObjectKeys;
    var stack = [];
    function replacer(key, value) {
      while (stack.length && this !== stack[0]) {
        stack.shift();
      }
      if (typeof value === 'string') {
        var truncatedString = '...(truncated)...';
        if (value.length > maxStringLimit + truncatedString.length) {
          return value.substring(0, maxStringLimit) + truncatedString;
        }
        return value;
      }
      if (typeof value !== 'object' || value === null) {
        return value;
      }
      var retval = value;
      if (Array.isArray(value)) {
        if (stack.length >= maxDepth) {
          retval = `[ ... array with ${value.length} values ... ]`;
        } else if (value.length > maxArrayLimit) {
          retval = value.slice(0, maxArrayLimit).concat([`... extra ${value.length - maxArrayLimit} values truncated ...`]);
        }
      } else {
        (0, _invariant.default)(typeof value === 'object', 'This was already found earlier');
        var keys = Object.keys(value);
        if (stack.length >= maxDepth) {
          retval = `{ ... object with ${keys.length} keys ... }`;
        } else if (keys.length > maxObjectKeysLimit) {
          retval = {};
          for (var k of keys.slice(0, maxObjectKeysLimit)) {
            retval[k] = value[k];
          }
          var truncatedKey = '...(truncated keys)...';
          retval[truncatedKey] = keys.length - maxObjectKeysLimit;
        }
      }
      stack.unshift(retval);
      return retval;
    }
    return function stringifySafe(arg) {
      if (arg === undefined) {
        return 'undefined';
      } else if (arg === null) {
        return 'null';
      } else if (typeof arg === 'function') {
        try {
          return arg.toString();
        } catch (e) {
          return '[function unknown]';
        }
      } else if (arg instanceof Error) {
        return arg.name + ': ' + arg.message;
      } else {
        try {
          var ret = JSON.stringify(arg, replacer);
          if (ret === undefined) {
            return '["' + typeof arg + '" failed to stringify]';
          }
          return ret;
        } catch (e) {
          if (typeof arg.toString === 'function') {
            try {
              return arg.toString();
            } catch (E) {}
          }
        }
      }
      return '["' + typeof arg + '" failed to stringify]';
    };
  }
  var stringifySafe = createStringifySafeWithLimits({
    maxDepth: 10,
    maxStringLimit: 100,
    maxArrayLimit: 50,
    maxObjectKeysLimit: 50
  });
  var _default = exports.default = stringifySafe;
},19,[5,17],"node_modules/react-native/Libraries/Utilities/stringifySafe.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  function deepFreezeAndThrowOnMutationInDev(object) {
    if (__DEV__) {
      if (typeof object !== 'object' || object === null || Object.isFrozen(object) || Object.isSealed(object)) {
        return object;
      }
      var keys = Object.keys(object);
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (hasOwnProperty.call(object, key)) {
          Object.defineProperty(object, key, {
            get: identity.bind(null, object[key])
          });
          Object.defineProperty(object, key, {
            set: throwOnImmutableMutation.bind(null, key)
          });
        }
      }
      Object.freeze(object);
      Object.seal(object);
      for (var _i = 0; _i < keys.length; _i++) {
        var _key = keys[_i];
        if (hasOwnProperty.call(object, _key)) {
          deepFreezeAndThrowOnMutationInDev(object[_key]);
        }
      }
    }
    return object;
  }
  function throwOnImmutableMutation(key, value) {
    throw Error('You attempted to set the key `' + key + '` with the value `' + JSON.stringify(value) + '` on an object that is meant to be immutable ' + 'and has been frozen.');
  }
  function identity(value) {
    return value;
  }
  var _default = exports.default = deepFreezeAndThrowOnMutationInDev;
},20,[],"node_modules/react-native/Libraries/Utilities/deepFreezeAndThrowOnMutationInDev.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.beginAsyncEvent = beginAsyncEvent;
  exports.beginEvent = beginEvent;
  exports.counterEvent = counterEvent;
  exports.endAsyncEvent = endAsyncEvent;
  exports.endEvent = endEvent;
  exports.isEnabled = isEnabled;
  exports.setEnabled = setEnabled;
  var TRACE_TAG_REACT_APPS = 1 << 17;
  var _asyncCookie = 0;
  function isEnabled() {
    return global.nativeTraceIsTracing ? global.nativeTraceIsTracing(TRACE_TAG_REACT_APPS) : Boolean(global.__RCTProfileIsProfiling);
  }
  function setEnabled(_doEnable) {}
  function beginEvent(eventName, args) {
    if (isEnabled()) {
      var eventNameString = typeof eventName === 'function' ? eventName() : eventName;
      global.nativeTraceBeginSection(TRACE_TAG_REACT_APPS, eventNameString, args);
    }
  }
  function endEvent(args) {
    if (isEnabled()) {
      global.nativeTraceEndSection(TRACE_TAG_REACT_APPS, args);
    }
  }
  function beginAsyncEvent(eventName, args) {
    var cookie = _asyncCookie;
    if (isEnabled()) {
      _asyncCookie++;
      var eventNameString = typeof eventName === 'function' ? eventName() : eventName;
      global.nativeTraceBeginAsyncSection(TRACE_TAG_REACT_APPS, eventNameString, cookie, args);
    }
    return cookie;
  }
  function endAsyncEvent(eventName, cookie, args) {
    if (isEnabled()) {
      var eventNameString = typeof eventName === 'function' ? eventName() : eventName;
      global.nativeTraceEndAsyncSection(TRACE_TAG_REACT_APPS, eventNameString, cookie, args);
    }
  }
  function counterEvent(eventName, value) {
    if (isEnabled()) {
      var eventNameString = typeof eventName === 'function' ? eventName() : eventName;
      global.nativeTraceCounter && global.nativeTraceCounter(TRACE_TAG_REACT_APPS, eventNameString, value);
    }
  }
  if (__DEV__) {
    var Systrace = {
      isEnabled: isEnabled,
      setEnabled: setEnabled,
      beginEvent: beginEvent,
      endEvent: endEvent,
      beginAsyncEvent: beginAsyncEvent,
      endAsyncEvent: endAsyncEvent,
      counterEvent: counterEvent
    };
    global[(global.__METRO_GLOBAL_PREFIX__ || '') + '__SYSTRACE'] = Systrace;
  }
},21,[],"node_modules/react-native/Libraries/Performance/Systrace.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _default = exports.default = global.ErrorUtils;
},22,[],"node_modules/react-native/Libraries/vendor/core/ErrorUtils.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.get = get;
  exports.getEnforcing = getEnforcing;
  var _invariant = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "invariant"));
  var turboModuleProxy = global.__turboModuleProxy;
  function requireModule(name) {
    if (turboModuleProxy != null) {
      var module = turboModuleProxy(name);
      if (module != null) {
        return module;
      }
    }
    if (global.RN$Bridgeless !== true || global.RN$TurboInterop === true || global.RN$UnifiedNativeModuleProxy === true) {
      var legacyModule = _$$_REQUIRE(_dependencyMap[2], "../BatchedBridge/NativeModules").default[name];
      if (legacyModule != null) {
        return legacyModule;
      }
    }
    return null;
  }
  function get(name) {
    return requireModule(name);
  }
  function getEnforcing(name) {
    var module = requireModule(name);
    (0, _invariant.default)(module != null, `TurboModuleRegistry.getEnforcing(...): '${name}' could not be found. ` + 'Verify that a module by this name is registered in the native binary.');
    return module;
  }
},38,[5,17,39],"node_modules/react-native/Libraries/TurboModule/TurboModuleRegistry.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "@babel/runtime/helpers/slicedToArray"));
  function genModule(config, moduleID) {
    if (!config) {
      return null;
    }
    var _config = (0, _slicedToArray2.default)(config, 5),
      moduleName = _config[0],
      constants = _config[1],
      methods = _config[2],
      promiseMethods = _config[3],
      syncMethods = _config[4];
    _$$_REQUIRE(_dependencyMap[2], "invariant")(!moduleName.startsWith('RCT') && !moduleName.startsWith('RK'), "Module name prefixes should've been stripped by the native side " + "but wasn't for " + moduleName);
    if (!constants && !methods) {
      return {
        name: moduleName
      };
    }
    var module = {};
    methods && methods.forEach(function (methodName, methodID) {
      var isPromise = promiseMethods && arrayContains(promiseMethods, methodID) || false;
      var isSync = syncMethods && arrayContains(syncMethods, methodID) || false;
      _$$_REQUIRE(_dependencyMap[2], "invariant")(!isPromise || !isSync, 'Cannot have a method that is both async and a sync hook');
      var methodType = isPromise ? 'promise' : isSync ? 'sync' : 'async';
      module[methodName] = genMethod(moduleID, methodID, methodType);
    });
    Object.assign(module, constants);
    if (module.getConstants == null) {
      module.getConstants = function () {
        return constants || Object.freeze({});
      };
    } else {
      console.warn(`Unable to define method 'getConstants()' on NativeModule '${moduleName}'. NativeModule '${moduleName}' already has a constant or method called 'getConstants'. Please remove it.`);
    }
    if (__DEV__) {
      _$$_REQUIRE(_dependencyMap[3], "./BatchedBridge").default.createDebugLookup(moduleID, moduleName, methods);
    }
    return {
      name: moduleName,
      module: module
    };
  }
  global.__fbGenNativeModule = genModule;
  function loadModule(name, moduleID) {
    _$$_REQUIRE(_dependencyMap[2], "invariant")(global.nativeRequireModuleConfig, "Can't lazily create module without nativeRequireModuleConfig");
    var config = global.nativeRequireModuleConfig(name);
    var info = genModule(config, moduleID);
    return info && info.module;
  }
  function genMethod(moduleID, methodID, type) {
    var fn = null;
    if (type === 'promise') {
      fn = function promiseMethodWrapper() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        var enqueueingFrameError = new Error();
        return new Promise(function (resolve, reject) {
          _$$_REQUIRE(_dependencyMap[3], "./BatchedBridge").default.enqueueNativeCall(moduleID, methodID, args, function (data) {
            return resolve(data);
          }, function (errorData) {
            return reject(updateErrorWithErrorData(errorData, enqueueingFrameError));
          });
        });
      };
    } else {
      fn = function nonPromiseMethodWrapper() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        var lastArg = args.length > 0 ? args[args.length - 1] : null;
        var secondLastArg = args.length > 1 ? args[args.length - 2] : null;
        var hasSuccessCallback = typeof lastArg === 'function';
        var hasErrorCallback = typeof secondLastArg === 'function';
        hasErrorCallback && _$$_REQUIRE(_dependencyMap[2], "invariant")(hasSuccessCallback, 'Cannot have a non-function arg after a function arg.');
        var onSuccess = hasSuccessCallback ? lastArg : null;
        var onFail = hasErrorCallback ? secondLastArg : null;
        var callbackCount = hasSuccessCallback + hasErrorCallback;
        var newArgs = args.slice(0, args.length - callbackCount);
        if (type === 'sync') {
          return _$$_REQUIRE(_dependencyMap[3], "./BatchedBridge").default.callNativeSyncHook(moduleID, methodID, newArgs, onFail, onSuccess);
        } else {
          _$$_REQUIRE(_dependencyMap[3], "./BatchedBridge").default.enqueueNativeCall(moduleID, methodID, newArgs, onFail, onSuccess);
        }
      };
    }
    fn.type = type;
    return fn;
  }
  function arrayContains(array, value) {
    return array.indexOf(value) !== -1;
  }
  function updateErrorWithErrorData(errorData, error) {
    return Object.assign(error, errorData || {});
  }
  var NativeModules = {};
  if (global.nativeModuleProxy) {
    NativeModules = global.nativeModuleProxy;
  } else {
    var bridgeConfig = global.__fbBatchedBridgeConfig;
    _$$_REQUIRE(_dependencyMap[2], "invariant")(bridgeConfig, '__fbBatchedBridgeConfig is not set, cannot invoke native modules');
    var defineLazyObjectProperty = _$$_REQUIRE(_dependencyMap[4], "../Utilities/defineLazyObjectProperty").default;
    (bridgeConfig.remoteModuleConfig || []).forEach(function (config, moduleID) {
      var info = genModule(config, moduleID);
      if (!info) {
        return;
      }
      if (info.module) {
        NativeModules[info.name] = info.module;
      } else {
        defineLazyObjectProperty(NativeModules, info.name, {
          get: function get() {
            return loadModule(info.name, moduleID);
          }
        });
      }
    });
  }
  var _default = exports.default = NativeModules;
},39,[5,40,17,3,44],"node_modules/react-native/Libraries/BatchedBridge/NativeModules.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _slicedToArray(r, e) {
    return _$$_REQUIRE(_dependencyMap[0], "./arrayWithHoles.js")(r) || _$$_REQUIRE(_dependencyMap[1], "./iterableToArrayLimit.js")(r, e) || _$$_REQUIRE(_dependencyMap[2], "./unsupportedIterableToArray.js")(r, e) || _$$_REQUIRE(_dependencyMap[3], "./nonIterableRest.js")();
  }
  module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},40,[41,42,10,43],"node_modules/@babel/runtime/helpers/slicedToArray.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
},41,[],"node_modules/@babel/runtime/helpers/arrayWithHoles.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
},42,[],"node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
},43,[],"node_modules/@babel/runtime/helpers/nonIterableRest.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  function defineLazyObjectProperty(object, name, descriptor) {
    var get = descriptor.get;
    var enumerable = descriptor.enumerable !== false;
    var writable = descriptor.writable !== false;
    var value;
    var valueSet = false;
    function getValue() {
      if (!valueSet) {
        valueSet = true;
        setValue(get());
      }
      return value;
    }
    function setValue(newValue) {
      value = newValue;
      valueSet = true;
      Object.defineProperty(object, name, {
        value: newValue,
        configurable: true,
        enumerable: enumerable,
        writable: writable
      });
    }
    Object.defineProperty(object, name, {
      get: getValue,
      set: setValue,
      configurable: true,
      enumerable: enumerable
    });
  }
  var _default = exports.default = defineLazyObjectProperty;
},44,[],"node_modules/react-native/Libraries/Utilities/defineLazyObjectProperty.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use client';
  'use strict';

  if (global.window === undefined) {
    global.window = global;
  }
  if (global.self === undefined) {
    global.self = global;
  }
  global.process = global.process || {};
  global.process.env = global.process.env || {};
  if (!global.process.env.NODE_ENV) {
    global.process.env.NODE_ENV = __DEV__ ? 'development' : 'production';
  }
},56,[],"node_modules/react-native/Libraries/Core/setUpGlobals.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.polyfillGlobal = polyfillGlobal;
  exports.polyfillObjectProperty = polyfillObjectProperty;
  function polyfillObjectProperty(object, name, getValue) {
    var descriptor = Object.getOwnPropertyDescriptor(object, name);
    if (__DEV__ && descriptor) {
      var backupName = `original${name[0].toUpperCase()}${name.slice(1)}`;
      Object.defineProperty(object, backupName, descriptor);
    }
    var _ref = descriptor || {},
      enumerable = _ref.enumerable,
      writable = _ref.writable,
      _ref$configurable = _ref.configurable,
      configurable = _ref$configurable === void 0 ? false : _ref$configurable;
    if (descriptor && !configurable) {
      console.error('Failed to set polyfill. ' + name + ' is not configurable.');
      return;
    }
    _$$_REQUIRE(_dependencyMap[0], "./defineLazyObjectProperty").default(object, name, {
      get: getValue,
      enumerable: enumerable !== false,
      writable: writable !== false
    });
  }
  function polyfillGlobal(name, getValue) {
    polyfillObjectProperty(global, name, getValue);
  }
},58,[44],"node_modules/react-native/Libraries/Utilities/PolyfillFunctions.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  if (__DEV__) {
    if (typeof global.Promise !== 'function') {
      console.error('Promise should exist before setting up timers.');
    }
  }
  if (global.RN$Bridgeless === true) {
    global.RN$enableMicrotasksInReact = true;
    _$$_REQUIRE(_dependencyMap[0], "../Utilities/PolyfillFunctions").polyfillGlobal('queueMicrotask', function () {
      return _$$_REQUIRE(_dependencyMap[1], "../../src/private/webapis/microtasks/specs/NativeMicrotasks").default.queueMicrotask;
    });
    _$$_REQUIRE(_dependencyMap[0], "../Utilities/PolyfillFunctions").polyfillGlobal('setImmediate', function () {
      return _$$_REQUIRE(_dependencyMap[2], "./Timers/immediateShim").setImmediate;
    });
    _$$_REQUIRE(_dependencyMap[0], "../Utilities/PolyfillFunctions").polyfillGlobal('clearImmediate', function () {
      return _$$_REQUIRE(_dependencyMap[2], "./Timers/immediateShim").clearImmediate;
    });
    _$$_REQUIRE(_dependencyMap[0], "../Utilities/PolyfillFunctions").polyfillGlobal('requestIdleCallback', function () {
      return _$$_REQUIRE(_dependencyMap[3], "../../src/private/webapis/idlecallbacks/specs/NativeIdleCallbacks").default.requestIdleCallback;
    });
    _$$_REQUIRE(_dependencyMap[0], "../Utilities/PolyfillFunctions").polyfillGlobal('cancelIdleCallback', function () {
      return _$$_REQUIRE(_dependencyMap[3], "../../src/private/webapis/idlecallbacks/specs/NativeIdleCallbacks").default.cancelIdleCallback;
    });
  } else {
    var defineLazyTimer = function defineLazyTimer(name) {
      _$$_REQUIRE(_dependencyMap[0], "../Utilities/PolyfillFunctions").polyfillGlobal(name, function () {
        return _$$_REQUIRE(_dependencyMap[4], "./Timers/JSTimers").default[name];
      });
    };
    defineLazyTimer('setTimeout');
    defineLazyTimer('clearTimeout');
    defineLazyTimer('setInterval');
    defineLazyTimer('clearInterval');
    defineLazyTimer('requestAnimationFrame');
    defineLazyTimer('cancelAnimationFrame');
    defineLazyTimer('requestIdleCallback');
    defineLazyTimer('cancelIdleCallback');
    _$$_REQUIRE(_dependencyMap[0], "../Utilities/PolyfillFunctions").polyfillGlobal('queueMicrotask', function () {
      return _$$_REQUIRE(_dependencyMap[5], "./Timers/queueMicrotask.js").default;
    });
    _$$_REQUIRE(_dependencyMap[0], "../Utilities/PolyfillFunctions").polyfillGlobal('setImmediate', function () {
      return _$$_REQUIRE(_dependencyMap[4], "./Timers/JSTimers").default.queueReactNativeMicrotask;
    });
    _$$_REQUIRE(_dependencyMap[0], "../Utilities/PolyfillFunctions").polyfillGlobal('clearImmediate', function () {
      return _$$_REQUIRE(_dependencyMap[4], "./Timers/JSTimers").default.clearReactNativeMicrotask;
    });
  }
},201,[58,202,203,204,205,208],"node_modules/react-native/Libraries/Core/setUpTimers.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "../../../../../Libraries/TurboModule/TurboModuleRegistry"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var _default = exports.default = TurboModuleRegistry.getEnforcing('NativeMicrotasksCxx');
},202,[38],"node_modules/react-native/src/private/webapis/microtasks/specs/NativeMicrotasks.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.clearImmediate = clearImmediate;
  exports.setImmediate = setImmediate;
  var GUIID = 1;
  var clearedImmediates = new Set();
  function setImmediate(callback) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (arguments.length < 1) {
      throw new TypeError('setImmediate must be called with at least one argument (a function to call)');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('The first argument to setImmediate must be a function.');
    }
    var id = GUIID++;
    if (clearedImmediates.has(id)) {
      clearedImmediates.delete(id);
    }
    global.queueMicrotask(function () {
      if (!clearedImmediates.has(id)) {
        callback.apply(undefined, args);
      } else {
        clearedImmediates.delete(id);
      }
    });
    return id;
  }
  function clearImmediate(immediateID) {
    clearedImmediates.add(immediateID);
  }
},203,[],"node_modules/react-native/Libraries/Core/Timers/immediateShim.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "../../../../../Libraries/TurboModule/TurboModuleRegistry"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var _default = exports.default = TurboModuleRegistry.getEnforcing('NativeIdleCallbacksCxx');
},204,[38],"node_modules/react-native/src/private/webapis/idlecallbacks/specs/NativeIdleCallbacks.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0], "@babel/runtime/helpers/interopRequireDefault");
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _NativeTiming = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1], "./NativeTiming"));
  var FRAME_DURATION = 1000 / 60;
  var IDLE_CALLBACK_FRAME_DEADLINE = 1;
  var callbacks = [];
  var types = [];
  var timerIDs = [];
  var freeIdxs = [];
  var reactNativeMicrotasks = [];
  var requestIdleCallbacks = [];
  var requestIdleCallbackTimeouts = {};
  var GUID = 1;
  var errors = [];
  var hasEmittedTimeDriftWarning = false;
  function _getFreeIndex() {
    var freeIdx = freeIdxs.pop();
    if (freeIdx === undefined) {
      return timerIDs.length;
    }
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
  function _callTimer(timerID, frameTime, didTimeout) {
    if (timerID > GUID) {
      console.warn('Tried to call timer with ID %s but no such timer exists.', timerID);
    }
    var timerIndex = timerIDs.indexOf(timerID);
    if (timerIndex === -1) {
      return;
    }
    var type = types[timerIndex];
    var callback = callbacks[timerIndex];
    if (!callback || !type) {
      console.error('No callback found for timerID ' + timerID);
      return;
    }
    if (__DEV__) {
      _$$_REQUIRE(_dependencyMap[2], "../../Performance/Systrace").beginEvent(type + ' [invoke]');
    }
    if (type !== 'setInterval') {
      _clearIndex(timerIndex);
    }
    try {
      if (type === 'setTimeout' || type === 'setInterval' || type === 'queueReactNativeMicrotask') {
        callback();
      } else if (type === 'requestAnimationFrame') {
        callback(global.performance.now());
      } else if (type === 'requestIdleCallback') {
        callback({
          timeRemaining: function timeRemaining() {
            return Math.max(0, FRAME_DURATION - (global.performance.now() - frameTime));
          },
          didTimeout: !!didTimeout
        });
      } else {
        console.error('Tried to call a callback with invalid type: ' + type);
      }
    } catch (e) {
      errors.push(e);
    }
    if (__DEV__) {
      _$$_REQUIRE(_dependencyMap[2], "../../Performance/Systrace").endEvent();
    }
  }
  function _callReactNativeMicrotasksPass() {
    if (reactNativeMicrotasks.length === 0) {
      return false;
    }
    if (__DEV__) {
      _$$_REQUIRE(_dependencyMap[2], "../../Performance/Systrace").beginEvent('callReactNativeMicrotasksPass()');
    }
    var passReactNativeMicrotasks = reactNativeMicrotasks;
    reactNativeMicrotasks = [];
    for (var i = 0; i < passReactNativeMicrotasks.length; ++i) {
      _callTimer(passReactNativeMicrotasks[i], 0);
    }
    if (__DEV__) {
      _$$_REQUIRE(_dependencyMap[2], "../../Performance/Systrace").endEvent();
    }
    return reactNativeMicrotasks.length > 0;
  }
  function _clearIndex(i) {
    timerIDs[i] = null;
    callbacks[i] = null;
    types[i] = null;
    freeIdxs.push(i);
  }
  function _freeCallback(timerID) {
    if (timerID == null) {
      return;
    }
    var index = timerIDs.indexOf(timerID);
    if (index !== -1) {
      var type = types[index];
      _clearIndex(index);
      if (type !== 'queueReactNativeMicrotask' && type !== 'requestIdleCallback') {
        deleteTimer(timerID);
      }
    }
  }
  var JSTimers = {
    setTimeout: function setTimeout(func, duration) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }
      var id = _allocateCallback(function () {
        return func.apply(undefined, args);
      }, 'setTimeout');
      createTimer(id, duration || 0, Date.now(), false);
      return id;
    },
    setInterval: function setInterval(func, duration) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }
      var id = _allocateCallback(function () {
        return func.apply(undefined, args);
      }, 'setInterval');
      createTimer(id, duration || 0, Date.now(), true);
      return id;
    },
    queueReactNativeMicrotask: function queueReactNativeMicrotask(func) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      var id = _allocateCallback(function () {
        return func.apply(undefined, args);
      }, 'queueReactNativeMicrotask');
      reactNativeMicrotasks.push(id);
      return id;
    },
    requestAnimationFrame: function requestAnimationFrame(func) {
      var id = _allocateCallback(func, 'requestAnimationFrame');
      createTimer(id, 1, Date.now(), false);
      return id;
    },
    requestIdleCallback: function requestIdleCallback(func, options) {
      if (requestIdleCallbacks.length === 0) {
        setSendIdleEvents(true);
      }
      var timeout = options && options.timeout;
      var id = _allocateCallback(timeout != null ? function (deadline) {
        var timeoutId = requestIdleCallbackTimeouts[id];
        if (timeoutId) {
          JSTimers.clearTimeout(timeoutId);
          delete requestIdleCallbackTimeouts[id];
        }
        return func(deadline);
      } : func, 'requestIdleCallback');
      requestIdleCallbacks.push(id);
      if (timeout != null) {
        var timeoutId = JSTimers.setTimeout(function () {
          var index = requestIdleCallbacks.indexOf(id);
          if (index > -1) {
            requestIdleCallbacks.splice(index, 1);
            _callTimer(id, global.performance.now(), true);
          }
          delete requestIdleCallbackTimeouts[id];
          if (requestIdleCallbacks.length === 0) {
            setSendIdleEvents(false);
          }
        }, timeout);
        requestIdleCallbackTimeouts[id] = timeoutId;
      }
      return id;
    },
    cancelIdleCallback: function cancelIdleCallback(timerID) {
      _freeCallback(timerID);
      var index = requestIdleCallbacks.indexOf(timerID);
      if (index !== -1) {
        requestIdleCallbacks.splice(index, 1);
      }
      var timeoutId = requestIdleCallbackTimeouts[timerID];
      if (timeoutId) {
        JSTimers.clearTimeout(timeoutId);
        delete requestIdleCallbackTimeouts[timerID];
      }
      if (requestIdleCallbacks.length === 0) {
        setSendIdleEvents(false);
      }
    },
    clearTimeout: function clearTimeout(timerID) {
      _freeCallback(timerID);
    },
    clearInterval: function clearInterval(timerID) {
      _freeCallback(timerID);
    },
    clearReactNativeMicrotask: function clearReactNativeMicrotask(timerID) {
      _freeCallback(timerID);
      var index = reactNativeMicrotasks.indexOf(timerID);
      if (index !== -1) {
        reactNativeMicrotasks.splice(index, 1);
      }
    },
    cancelAnimationFrame: function cancelAnimationFrame(timerID) {
      _freeCallback(timerID);
    },
    callTimers: function callTimers(timersToCall) {
      _$$_REQUIRE(_dependencyMap[3], "invariant")(timersToCall.length !== 0, 'Cannot call `callTimers` with an empty list of IDs.');
      errors.length = 0;
      for (var i = 0; i < timersToCall.length; i++) {
        _callTimer(timersToCall[i], 0);
      }
      var errorCount = errors.length;
      if (errorCount > 0) {
        if (errorCount > 1) {
          for (var ii = 1; ii < errorCount; ii++) {
            JSTimers.setTimeout(function (error) {
              throw error;
            }.bind(null, errors[ii]), 0);
          }
        }
        throw errors[0];
      }
    },
    callIdleCallbacks: function callIdleCallbacks(frameTime) {
      if (FRAME_DURATION - (Date.now() - frameTime) < IDLE_CALLBACK_FRAME_DEADLINE) {
        return;
      }
      errors.length = 0;
      if (requestIdleCallbacks.length > 0) {
        var passIdleCallbacks = requestIdleCallbacks;
        requestIdleCallbacks = [];
        for (var i = 0; i < passIdleCallbacks.length; ++i) {
          _callTimer(passIdleCallbacks[i], frameTime);
        }
      }
      if (requestIdleCallbacks.length === 0) {
        setSendIdleEvents(false);
      }
      errors.forEach(function (error) {
        return JSTimers.setTimeout(function () {
          throw error;
        }, 0);
      });
    },
    callReactNativeMicrotasks: function callReactNativeMicrotasks() {
      errors.length = 0;
      while (_callReactNativeMicrotasksPass()) {}
      errors.forEach(function (error) {
        return JSTimers.setTimeout(function () {
          throw error;
        }, 0);
      });
    },
    emitTimeDriftWarning: function emitTimeDriftWarning(warningMessage) {
      if (hasEmittedTimeDriftWarning) {
        return;
      }
      hasEmittedTimeDriftWarning = true;
      console.warn(warningMessage);
    }
  };
  function createTimer(callbackID, duration, jsSchedulingTime, repeats) {
    _$$_REQUIRE(_dependencyMap[3], "invariant")(_NativeTiming.default, 'NativeTiming is available');
    _NativeTiming.default.createTimer(callbackID, duration, jsSchedulingTime, repeats);
  }
  function deleteTimer(timerID) {
    _$$_REQUIRE(_dependencyMap[3], "invariant")(_NativeTiming.default, 'NativeTiming is available');
    _NativeTiming.default.deleteTimer(timerID);
  }
  function setSendIdleEvents(sendIdleEvents) {
    _$$_REQUIRE(_dependencyMap[3], "invariant")(_NativeTiming.default, 'NativeTiming is available');
    _NativeTiming.default.setSendIdleEvents(sendIdleEvents);
  }
  var ExportedJSTimers;
  if (!_NativeTiming.default) {
    console.warn("Timing native module is not available, can't set timers.");
    ExportedJSTimers = {
      callReactNativeMicrotasks: JSTimers.callReactNativeMicrotasks,
      queueReactNativeMicrotask: JSTimers.queueReactNativeMicrotask
    };
  } else {
    ExportedJSTimers = JSTimers;
  }
  _$$_REQUIRE(_dependencyMap[4], "../../BatchedBridge/BatchedBridge").default.setReactNativeMicrotasksCallback(JSTimers.callReactNativeMicrotasks);
  var _default = exports.default = ExportedJSTimers;
},205,[5,206,21,17,3],"node_modules/react-native/Libraries/Core/Timers/JSTimers.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {};
  exports.default = void 0;
  var _NativeTiming = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "../../../src/private/specs_DEPRECATED/modules/NativeTiming"));
  Object.keys(_NativeTiming).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in exports && exports[key] === _NativeTiming[key]) return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function get() {
        return _NativeTiming[key];
      }
    });
  });
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var _default = exports.default = _NativeTiming.default;
},206,[207],"node_modules/react-native/Libraries/Core/Timers/NativeTiming.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var TurboModuleRegistry = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0], "../../../../Libraries/TurboModule/TurboModuleRegistry"));
  function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
  var _default = exports.default = TurboModuleRegistry.get('Timing');
},207,[38],"node_modules/react-native/src/private/specs_DEPRECATED/modules/NativeTiming.js");
__d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = queueMicrotask;
  var resolvedPromise;
  function queueMicrotask(callback) {
    if (arguments.length < 1) {
      throw new TypeError('queueMicrotask must be called with at least one argument (a function to call)');
    }
    if (typeof callback !== 'function') {
      throw new TypeError('The argument to queueMicrotask must be a function.');
    }
    (resolvedPromise || (resolvedPromise = Promise.resolve())).then(callback).catch(function (error) {
      return setTimeout(function () {
        throw error;
      }, 0);
    });
  }
},208,[],"node_modules/react-native/Libraries/Core/Timers/queueMicrotask.js");
__d(function(g,r,i,a,m,e,d){
  r(d[0]);
  r(d[4]);
},55,[56,57,137,149,201,209,256,257,260,282,289,290,304,307,310,151,316,264],"InitializeCore.js");
__d(function(g,r,i,a,m,e,d){
  var log = globalThis.nativeLoggingHook || function(){};
  try { throw new Error("catch-binding-bug"); }
  catch (error) {
    log("BISECT inside catch: " + error.message, 3);
    setTimeout(function () {
      try { var msg = error.message; log("BISECT PASS: " + msg, 3); }
      catch (e) { log("BISECT FAIL: " + e.message, 3); }
    }, 100);
  }
},0,[],"index.js");
__r(55);
__r(0);
