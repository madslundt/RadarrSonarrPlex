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
/******/ 	return __webpack_require__(__webpack_require__.s = 238);
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

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Storage_1 = __webpack_require__(18);
var urlRegex = /.+_url/;
var httpRegex = /https?:\/\//;
Storage_1.default.load('options').then(function (options) {
    var inputs = {
        radarr_url: document.querySelector('#radarr_url'),
        radarr_key: document.querySelector('#radarr_key'),
        sonarr_url: document.querySelector('#sonarr_url'),
        sonarr_key: document.querySelector('#sonarr_key')
    };
    var submit = document.querySelector('#save');
    var status = document.querySelector('#status');
    var setInputs = function (options) {
        for (var name_1 in inputs) {
            if (options.api[name_1]) {
                inputs[name_1].value = options.api[name_1];
            }
        }
    };
    setInputs(options);
    var correctUrl = function (url) {
        var result = url;
        if (url.substr(-1) !== "/") {
            result += '/';
        }
        if (url.indexOf('/api/') === -1) {
            result += 'api/';
        }
        if (!httpRegex.test(url)) {
            result = 'http://' + result;
        }
        return result;
    };
    var plexUrlList = document.querySelector('#plex-url-list');
    var plexUrls = {
        list: options.plexUrls,
        add: function (url) {
            plexUrls.list.push(url);
            plexUrls.update();
        },
        remove: function (url) {
            var index = plexUrls.list.indexOf(url);
            if (index > -1) {
                plexUrls.list.splice(index, 1);
            }
            plexUrls.update();
        },
        update: function () {
            while (plexUrlList.hasChildNodes()) {
                plexUrlList.removeChild(plexUrlList.lastChild);
            }
            for (var u in plexUrls.list) {
                var item = document.createElement('li');
                item.textContent = options.plexUrls[u];
                var removeBtn = document.createElement('button');
                removeBtn.textContent = 'x';
                removeBtn.addEventListener('click', plexUrls.remove.bind(null, plexUrls.list[u]));
                item.appendChild(removeBtn);
                plexUrlList.appendChild(item);
            }
        }
    };
    plexUrls.update();
    var newPlexUrl = document.querySelector('#new-plex-url');
    var plexUrlBtn = document.querySelector('#add-plex-url');
    plexUrlBtn.addEventListener('click', function () {
        plexUrls.add(newPlexUrl.value);
        newPlexUrl.value = '';
    });
    if (!submit) {
        return;
    }
    submit.addEventListener('click', function (e) {
        for (var name_2 in inputs) {
            var value = inputs[name_2].value;
            if (urlRegex.test(name_2)) {
                value = correctUrl(value);
            }
            options.api[name_2] = value;
        }
        Storage_1.default.save('options', options).then(function () {
            status.textContent = 'Options saved.';
            setInputs(options);
            // window.setTimeout(() => {
            //     tick.remove();
            // }, 1000);
        });
    });
    document.body.appendChild(submit);
});


/***/ })

/******/ });
//# sourceMappingURL=options.js.map