/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["ngComponent"] = __webpack_require__(1);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


        var __comp_script__;
        var __comp_template__;
        var __comp_styles__;
    
            __comp_script__ = __webpack_require__(2)
        
                var invalidModule = Object.keys(__comp_script__).some(function(key) {
                    return key !== 'default' && key !== '__esModule';
                });
                if(invalidModule){
                    console.warn('[ng-component-loader] test\stubs\component.ng: named export in *.ng files are ignored')
                }
            
        module.exports = function(injections){
            var mod = __comp_script__ ? __comp_script__(injections) : {};
            if(mod.__esModule) mod = mod.default;
            if(__comp_template__) mod.template = __comp_template__;
            return mod;
        }
    

/***/ }),
/* 2 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ReferenceError: [BABEL] C:\\Users\\anter\\www\\github\\owen-it\\ng-component-loader\\test\\stubs\\component.ng: Unknown option: base.presents. Check out http://babeljs.io/docs/usage/options/ for more information about options.\n\nA common cause of this error is the presence of a configuration options object without the corresponding preset name. Example:\n\nInvalid:\n  `{ presets: [{option: value}] }`\nValid:\n  `{ presets: [['presetName', {option: value}]] }`\n\nFor more detailed information on preset configuration, please see http://babeljs.io/docs/plugins/#pluginpresets-options.\n    at Logger.error (C:\\Users\\anter\\www\\github\\owen-it\\ng-component-loader\\node_modules\\babel-core\\lib\\transformation\\file\\logger.js:41:11)\n    at OptionManager.mergeOptions (C:\\Users\\anter\\www\\github\\owen-it\\ng-component-loader\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:225:20)\n    at OptionManager.init (C:\\Users\\anter\\www\\github\\owen-it\\ng-component-loader\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:367:12)\n    at File.initOptions (C:\\Users\\anter\\www\\github\\owen-it\\ng-component-loader\\node_modules\\babel-core\\lib\\transformation\\file\\index.js:216:65)\n    at new File (C:\\Users\\anter\\www\\github\\owen-it\\ng-component-loader\\node_modules\\babel-core\\lib\\transformation\\file\\index.js:139:24)\n    at Pipeline.transform (C:\\Users\\anter\\www\\github\\owen-it\\ng-component-loader\\node_modules\\babel-core\\lib\\transformation\\pipeline.js:46:16)\n    at transpile (C:\\Users\\anter\\www\\github\\owen-it\\ng-component-loader\\node_modules\\babel-loader\\lib\\index.js:38:20)\n    at Object.module.exports (C:\\Users\\anter\\www\\github\\owen-it\\ng-component-loader\\node_modules\\babel-loader\\lib\\index.js:133:12)");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var component = __webpack_require__(0)

/***/ })
/******/ ]);