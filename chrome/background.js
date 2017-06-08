/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 226);
/******/ })
/************************************************************************/
/******/ ({

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var options = {
    api: {
        radarr_url: 'http://localhost:7878',
        radarr_key: '',
        sonarr_url: 'http://localhost:8989',
        sonarr_key: ''
    },
    plexUrls: []
};
var Storage = {
    load: function (key) {
        return new Promise(function (resolve) {
            chrome.storage.sync.get(key, function (items) {
                var value;
                if (items && items[key]) {
                    value = items[key];
                }
                else {
                    value = items;
                }
                if (key === 'options') {
                    Object.assign(options, value);
                    resolve(options);
                }
                else {
                    resolve(value);
                }
            });
        });
    },
    save: function (key, value) {
        return new Promise(function (resolve) {
            chrome.storage.sync.set((_a = {}, _a[key] = value, _a), function () {
                resolve(value);
            });
            var _a;
        });
    },
    get: function () {
        return options;
    }
};
exports.default = Storage;


/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Storage_1 = __webpack_require__(18);
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    Storage_1.default.load('options').then(function (options) {
        var isInUserList = function (url) {
            if (!options || !options.plexUrls) {
                return false;
            }
            url = url.toLowerCase();
            for (var _i = 0, _a = options.plexUrls; _i < _a.length; _i++) {
                var plexUrl = _a[_i];
                if (url.indexOf(plexUrl.toLowerCase()) !== -1) {
                    return true;
                }
            }
            return false;
        };
        if (changeInfo.status == 'complete' && isInUserList(tab.url)) {
            chrome.tabs.executeScript(tabId, { file: 'index.js' });
        }
    });
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.options) {
        return chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
    }
    Storage_1.default.load('options').then(function (options) {
        var url = '';
        var key = '';
        if (!options || !Object.keys(options).length) {
            sendResponse({ error: 'Options has not been defined', options: options });
        }
        else if (!request || !request.media) {
            sendResponse({ error: 'Media has to be specified' });
        }
        else if (!request.endpoint) {
            sendResponse({ error: 'Endpoint has to be specified' });
        }
        else if (request.media.toLowerCase() === 'sonarr') {
            url = options.api.sonarr_url;
            key = options.api.sonarr_key;
        }
        else if (request.media.toLowerCase() === 'radarr') {
            url = options.api.radarr_url;
            key = options.api.radarr_key;
        }
        else {
            sendResponse({ error: 'Media unknown' });
        }
        if (url && key) {
            fetch(url + request.endpoint, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'X-Api-Key': key
                })
            }).then(function (response) { return response.json(); }).then(function (response) {
                sendResponse({ response: response, url: url, key: key });
            }).catch(function (error) {
                sendResponse({ error: error });
            });
        }
        else if (!url) {
            sendResponse({ error: "Empty url" });
        }
        else {
            sendResponse({ error: "Empty key" });
        }
    });
    return true;
});
// Open options page on first install
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == 'install') {
        chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
    }
});


/***/ })

/******/ });
//# sourceMappingURL=background.js.map