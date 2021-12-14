(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);

  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }

  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;

  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];

    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);

      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }

      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }

  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}

function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];

      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];

  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }

  var interceptor = scopedInterceptors[method];

  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }

  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];

  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }

  return interceptor;
}

function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }

  var interceptor = getApiInterceptorHooks(method);

  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }

  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }

    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  }
};
var SYNC_API_RE = /^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;
var CONTEXT_API_RE = /^create|Manager$/; // Context例外情况

var CONTEXT_API_RE_EXC = ['createBLEConnection']; // 同步例外情况

var ASYNC_API = ['createBLEConnection'];
var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}

function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}

function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }

  return true;
}
/* eslint-disable no-extend-native */


if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }

  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }

    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }

    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
      platform = _wx$getSystemInfoSync.platform,
      pixelRatio = _wx$getSystemInfoSync.pixelRatio,
      windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni


  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);

  if (number === 0) {
    return 0;
  }

  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);

  if (result < 0) {
    result = -result;
  }

  result = Math.floor(result + EPS);

  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }

  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});

var EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {
    var _this = this;

    _classCallCheck(this, EventChannel);

    this.id = id;
    this.listener = {};
    this.emitCache = {};

    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }

  _createClass(EventChannel, [{
    key: "emit",
    value: function emit(eventName) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var fns = this.listener[eventName];

      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }

      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {
        return opt.type !== 'once';
      });
    }
  }, {
    key: "on",
    value: function on(eventName, fn) {
      this._addListener(eventName, 'on', fn);

      this._clearCache(eventName);
    }
  }, {
    key: "once",
    value: function once(eventName, fn) {
      this._addListener(eventName, 'once', fn);

      this._clearCache(eventName);
    }
  }, {
    key: "off",
    value: function off(eventName, fn) {
      var fns = this.listener[eventName];

      if (!fns) {
        return;
      }

      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }

          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    }
  }, {
    key: "_clearCache",
    value: function _clearCache(eventName) {
      var cacheArgs = this.emitCache[eventName];

      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    }
  }, {
    key: "_addListener",
    value: function _addListener(eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type
      });
    }
  }]);

  return EventChannel;
}();

var eventChannels = {};
var eventChannelStack = [];
var id = 0;

function initEventChannel(events) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);

  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }

  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }

  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;

    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  }
};

function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;

  while (len--) {
    var page = pages[len];

    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }

  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }

    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);

      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;

        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);

    if (isNaN(currentIndex)) {
      return;
    }

    var urls = fromArgs.urls;

    if (!Array.isArray(urls)) {
      return;
    }

    var len = urls.length;

    if (!len) {
      return;
    }

    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }

    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }

    return {
      indicator: false,
      loop: false
    };
  }
};

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom
    };
  }
}

var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets
  },
  getSystemInfoSync: {
    returnValue: addSafeAreaInsets
  }
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值

    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }

    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];

        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }

        if (!keyOption) {
          // 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }

    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }

  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }

  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];

    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }

    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;

      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];

      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }

      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }

      var returnValue = wx[methodName].apply(wx, args);

      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }

      return returnValue;
    };
  }

  return method;
}

var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];

function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
        complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};

function getProvider(_ref2) {
  var service = _ref2.service,
      success = _ref2.success,
      fail = _ref2.fail,
      complete = _ref2.complete;
  var res = false;

  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在'
    };
    isFn(fail) && fail(res);
  }

  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});

var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }

    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}

function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}

function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}

function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});
var api = /*#__PURE__*/Object.freeze({
  __proto__: null
});
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;

  mpInstance.triggerEvent = function (event) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];

  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);

      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];

function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }

    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }

    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }

  var mixins = vueOptions.mixins;

  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;

  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }

  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"文器库商城","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];

  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));

      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }

  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }

  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }

  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }

  return type;
}

function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};

  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    }; // 用于字节跳动小程序模拟抽象节点

    properties.generic = {
      type: Object,
      value: null
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }

  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];

      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;

        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }

  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = _typeof(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];

    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;

      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};

  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }

  return obj;
}

function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';

    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }

      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}

function getContextVm(vm) {
  var $parent = vm.$parent; // 父组件是 scoped slots 或者其他自定义组件时继续查找

  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }

  return $parent && $parent.$parent;
}

function handleEvent(event) {
  var _this2 = this;

  event = wrapper$1(event); // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]

  var dataset = (event.currentTarget || event.target).dataset;

  if (!dataset) {
    return console.warn('事件信息不存在');
  }

  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰

  if (!eventOpts) {
    return console.warn('事件信息不存在');
  } // [['handle',[1,2,a]],['handle1',[1,2,a]]]


  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];

        if (methodName) {
          var handlerCtx = _this2.$vm;

          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }

          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }

          var handler = handlerCtx[methodName];

          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }

          if (isOnce) {
            if (handler.once) {
              return;
            }

            handler.once = true;
          }

          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName); // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays

          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}

var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];

function parseBaseApp(vm, _ref3) {
  var mocks = _ref3.mocks,
      initRefs = _ref3.initRefs;

  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;
      this.$mp = _defineProperty({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });

  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }

      {
        if (!wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this; // vm 上也挂载 globalData

      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;

      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    }
  }; // 兼容旧版本 globalData

  appOptions.globalData = vm.$options.globalData || {}; // 将 methods 中的方法挂在 getApp() 中

  var methods = vm.$options.methods;

  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);
  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children; // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)

  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];

    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  } // 反向递归查找


  var parentVm;

  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);

    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;

        if (!$refs[ref]) {
          $refs[ref] = [];
        }

        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    }
  });
}

function handleLink(event) {
  var _ref4 = event.detail || event.value,
      vuePid = _ref4.vuePid,
      vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)


  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }

    return this.__eventChannel__;
  };

  var callHook = _vue.default.prototype.__call_hook;

  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }

    return callHook.call(this, hook, args);
  };

  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;

var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};

var commaRE = /%2C/g; // fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas

var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }

        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      isPage = _ref5.isPage,
      initRelation = _ref5.initRelation;

  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
      _initVueComponent2 = _slicedToArray(_initVueComponent, 2),
      VueComponent = _initVueComponent2[0],
      vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, vueOptions.options || {});

  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this); // 处理父子关系

        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        }); // 初始化 vue 实例

        this.$vm = new VueComponent(options); // 处理$slots,$scopedSlots（暂不支持动态变化$slots）

        initSlots(this.$vm, properties.vueSlots); // 触发首次 setData

        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;

          this.$vm.__call_hook('mounted');

          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  }; // externalClasses

  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }

  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  });
}

var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6) {
  var isPage = _ref6.isPage,
      initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);
  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue

    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation
  });
}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;

  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }

      if (baseApi[name]) {
        return baseApi[name];
      }

      if (api[name]) {
        return promisify(name, api[name]);
      }

      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }

        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }

      if (eventApi[name]) {
        return eventApi[name];
      }

      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }

      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;

/***/ }),

/***/ 10:
/*!******************************!*\
  !*** ./src/utils/request.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uniRequest = _interopRequireDefault(__webpack_require__(/*! uni-request */ 11));

var _index = _interopRequireDefault(__webpack_require__(/*! @/config/index.js */ 18));

var _AES = _interopRequireDefault(__webpack_require__(/*! @/utils/AES.js */ 19));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_uniRequest.default.defaults.baseURL = _index.default.addImageUrl;

_uniRequest.default.interceptors.request.use(function (config) {
  config.headers = {
    sessionId: uni.getStorageSync("sessionId"),
    client: "pc",
    "device-id": uni.getStorageSync('fmagent') || ''
  };

  if (config.url.indexOf("base/file/mgmt/addOneImage") == "-1") {
    config.data = _AES.default.encrypt(config.data);
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
  }

  return config;
}, function (error) {});

_uniRequest.default.interceptors.response.use(function (response) {
  response.data = JSON.parse(_AES.default.decrypt(response.data));

  if (response.data.code == "4000001") {
    uni.showToast({
      title: '请重新登录',
      icon: "none"
    });
    uni.removeStorageSync("sessionId");
  }

  return response;
}, function (err) {
  return err;
});

var _default = _uniRequest.default;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 102:
/*!********************************!*\
  !*** ./src/api/trade/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 103));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  queryMyOrders: function queryMyOrders(params, orderState) {
    //获取订单列表
    return _request.default.post(_url.default.queryMyOrders, {
      pagePO: params,
      orderState: orderState
    });
  },
  addCart: function addCart(params) {
    //加入购物车
    return _request.default.post(_url.default.addCart, params);
  },
  getCarts: function getCarts() {
    //获取购物车列表
    return _request.default.post(_url.default.getCarts, {});
  },
  editCart: function editCart(params) {
    //修改购物车信息
    return _request.default.post(_url.default.editCart, params);
  },
  moveToFavorite: function moveToFavorite(id) {
    //单个移入收藏夹
    return _request.default.post(_url.default.moveToFavorite + id, {});
  },
  moveToFavorites: function moveToFavorites(params) {
    //批量移入收藏夹
    return _request.default.post(_url.default.moveToFavorites, params);
  },
  removeCarts: function removeCarts(params) {
    //清空失效商品
    return _request.default.post(_url.default.removeCarts, params);
  },
  evaluateGoods: function evaluateGoods(id) {
    //获取评价商品
    return _request.default.post(_url.default.evaluateGoods + id, {});
  },
  appendEvaluate: function appendEvaluate(id) {
    //追加评价详情
    return _request.default.post(_url.default.appendEvaluate + id, {});
  },
  pageInit: function pageInit(cartIds) {
    //初始化结算
    return _request.default.post(_url.default.pageInit, cartIds);
  },
  storePromotions: function storePromotions(params) {
    //获取店铺促销信息
    return _request.default.post(_url.default.storePromotions, params);
  },
  storeCoupons: function storeCoupons(params) {
    //获取店铺优惠券信息
    return _request.default.post(_url.default.storeCoupons, params);
  },
  freightPromotions: function freightPromotions(params) {
    //获取店铺包邮活动信息
    return _request.default.post(_url.default.freightPromotions, params);
  },
  storeOrderAmount: function storeOrderAmount(params) {
    //获取店铺订单金额
    return _request.default.post(_url.default.storeOrderAmount, params);
  },
  platformPromotions: function platformPromotions(params) {
    //获取平台优惠券信息
    return _request.default.post(_url.default.platformPromotions, params);
  },
  orderGold: function orderGold(params) {
    //获取权益金
    return _request.default.post(_url.default.orderGold, params);
  },
  orderScore: function orderScore(params) {
    //获取积分信息
    return _request.default.post(_url.default.orderScore, params);
  },
  orderSummary: function orderSummary(params) {
    //获取总订单金额
    return _request.default.post(_url.default.orderSummary, params);
  },
  submitOrder: function submitOrder(params) {
    //提交订单
    return _request.default.post(_url.default.submitOrder, params);
  },
  deleteOrder: function deleteOrder(id) {
    //删除订单
    return _request.default.post(_url.default.deleteOrder + id, {});
  },
  getCustomerRefundOrderPage: function getCustomerRefundOrderPage(params) {
    //获取售后列表
    return _request.default.post(_url.default.getCustomerRefundOrderPage, params);
  },
  refundDetail: function refundDetail(returnOrderId) {
    //售后详情
    return _request.default.post(_url.default.refundDetail + returnOrderId, {});
  },
  queryOrderDetail: function queryOrderDetail(orderId) {
    //查询订单详情
    return _request.default.post(_url.default.queryOrderDetail + orderId, {});
  },
  cancelOrder: function cancelOrder(orderId) {
    //取消订单
    return _request.default.post(_url.default.cancelOrder + orderId, {});
  },
  applyFofRefund: function applyFofRefund(params) {
    //申请售后详情
    return _request.default.post(_url.default.applyFofRefund, params);
  },
  refundReason: function refundReason(type) {
    //售后原因
    return _request.default.post(_url.default.refundReason + type, {});
  },
  submitApplyFofRefund: function submitApplyFofRefund(params) {
    //提交售后
    return _request.default.post(_url.default.submitApplyFofRefund, params);
  },
  extendShip: function extendShip(orderId) {
    //延长收货
    return _request.default.post(_url.default.extendShip + orderId, {});
  },
  confirmReceipt: function confirmReceipt(orderId) {
    //确认收货
    return _request.default.post(_url.default.confirmReceipt + orderId, {});
  },
  queryMyUnCommentOrders: function queryMyUnCommentOrders(params) {
    //评价成功后调用
    return _request.default.post(_url.default.queryMyUnCommentOrders, params);
  },
  cancelTrade: function cancelTrade(orderId) {
    //取消申请售后
    return _request.default.post(_url.default.cancelTrade + orderId, {});
  },
  platformInvolve: function platformInvolve(orderId) {
    //申诉
    return _request.default.post(_url.default.platformInvolve + orderId, {});
  },
  summary: function summary(payId) {
    //收银台详情
    return _request.default.post(_url.default.summary + payId, {});
  },
  submitPay: function submitPay(params) {
    //提交支付
    return _request.default.post(_url.default.submitPay, params);
  },
  defaultCards: function defaultCards(params) {
    //根据用户更改支付类型判断礼卡可用余额
    return _request.default.post(_url.default.defaultCards, params);
  },
  selectCards: function selectCards(params) {
    //收银台礼卡更改时触发
    return _request.default.post(_url.default.selectCards, params);
  },
  sendOrderSms: function sendOrderSms() {
    //发送验证码
    return _request.default.post(_url.default.sendOrderSms, {});
  },
  sendSMS: function sendSMS(id) {
    //收银台发送验证码
    return _request.default.post(_url.default.sendSMS + id, {});
  },
  submitLogisticsInfo: function submitLogisticsInfo(params) {
    //寄回商品
    return _request.default.post(_url.default.submitLogisticsInfo, params);
  },
  tradeFirstOrder: function tradeFirstOrder(payId) {
    //判断是否为新用户首单
    return _request.default.post(_url.default.tradeFirstOrder + payId, {});
  },
  validSubmitCarts: function validSubmitCarts(cartIds) {
    //购物车-结算校验
    return _request.default.post(_url.default.validSubmitCarts, {
      cartIds: cartIds
    });
  },
  cusPageInit: function cusPageInit(params) {
    //定制品下单初始化
    return _request.default.post(_url.default.cusPageInit, params);
  },
  submitCusOrder: function submitCusOrder(params) {
    //定制品提交订单
    return _request.default.post(_url.default.submitCusOrder, params);
  },
  buildPayOrder: function buildPayOrder(params) {
    //构建支付订单
    return _request.default.post(_url.default.buildPayOrder, params);
  },
  submitPayOrder: function submitPayOrder(params) {
    //提交线下支付订单
    return _request.default.post(_url.default.submitPayOrder, params);
  },
  getCompanyPaymentInfo: function getCompanyPaymentInfo() {
    //获取公司对公账号信息
    return _request.default.post(_url.default.getCompanyPaymentInfo, {});
  },
  listPayLog: function listPayLog(orderId) {
    //获取订单的支付记录
    return _request.default.post(_url.default.listPayLog + orderId, {});
  },
  listOrderPage: function listOrderPage(params) {
    //查询定制订单列表
    return _request.default.post(_url.default.listOrderPage, params);
  },
  getOrderInfo: function getOrderInfo(orderId) {
    //获取定制订单详情
    return _request.default.post(_url.default.getOrderInfo + orderId, {});
  },
  cancelCusOrder: function cancelCusOrder(orderId) {
    //	取消定制订单
    return _request.default.post(_url.default.cancelCusOrder + orderId, {});
  },
  giftBagPageInit: function giftBagPageInit(params) {
    //转增商品下单初始化
    return _request.default.post(_url.default.giftBagPageInit, params);
  },
  giftBagGoldOrder: function giftBagGoldOrder(params) {
    //购物金可使用情况
    return _request.default.post(_url.default.giftBagGoldOrder, params);
  },
  giftBagScoreOrder: function giftBagScoreOrder(params) {
    //积分可使用情况
    return _request.default.post(_url.default.giftBagScoreOrder, params);
  },
  giftBagSummaryOrder: function giftBagSummaryOrder(params) {
    return _request.default.post(_url.default.giftBagSummaryOrder, params);
  },
  giftBagSubmitOrder: function giftBagSubmitOrder(params) {
    //提交订单
    return _request.default.post(_url.default.giftBagSubmitOrder, params);
  },
  giftBagPageOrders: function giftBagPageOrders(params) {
    //我的礼包
    return _request.default.post(_url.default.giftBagPageOrders, params);
  },
  giftBagPageGetLogs: function giftBagPageGetLogs(params) {
    //转赠单领取记录
    return _request.default.post(_url.default.giftBagPageGetLogs, params);
  },
  giftBagCancelOrder: function giftBagCancelOrder(params) {
    //取消订单
    return _request.default.post(_url.default.giftBagCancelOrder, params);
  },
  giftBagGeneratePoster: function giftBagGeneratePoster(params) {
    //生成转赠海报
    return _request.default.post(_url.default.giftBagGeneratePoster + params, {});
  },
  giftBagInfo: function giftBagInfo(params) {
    return _request.default.post(_url.default.giftBagInfo + params, {});
  }
};
exports.default = _default;

/***/ }),

/***/ 1026:
/*!*******************************************************!*\
  !*** ./src/components/uni-swipe-action-item/mpwxs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  data: function data() {
    return {
      position: [],
      button: {},
      btn: "[]"
    };
  },
  // computed: {
  // 	pos() {
  // 		return JSON.stringify(this.position)
  // 	},
  // 	btn() {
  // 		return JSON.stringify(this.button)
  // 	}
  // },
  watch: {
    button: {
      handler: function handler(newVal) {
        this.btn = JSON.stringify(newVal);
      },
      deep: true
    },
    show: function show(newVal) {
      if (this.autoClose) return;

      if (!this.button) {
        this.init();
        return;
      }

      this.button.show = newVal;
    },
    leftOptions: function leftOptions() {
      this.init();
    },
    rightOptions: function rightOptions() {
      this.init();
    }
  },
  created: function created() {
    if (this.swipeaction.children !== undefined) {
      this.swipeaction.children.push(this);
    }
  },
  mounted: function mounted() {
    this.init();
  },
  beforeDestroy: function beforeDestroy() {
    var _this = this;

    this.swipeaction.children.forEach(function (item, index) {
      if (item === _this) {
        _this.swipeaction.children.splice(index, 1);
      }
    });
  },
  methods: {
    init: function init() {
      var _this2 = this;

      clearTimeout(this.swipetimer);
      this.swipetimer = setTimeout(function () {
        _this2.getButtonSize();
      }, 50);
    },
    closeSwipe: function closeSwipe(e) {
      if (!this.autoClose) return;
      this.swipeaction.closeOther(this);
    },
    change: function change(e) {
      this.$emit('change', e.open);
      var show = this.button.show;

      if (show !== e.open) {
        this.button.show = e.open;
      }
    },
    appTouchStart: function appTouchStart(e) {
      var clientX = e.changedTouches[0].clientX;
      this.clientX = clientX;
      this.timestamp = new Date().getTime();
    },
    appTouchEnd: function appTouchEnd(e, index, item, position) {
      var clientX = e.changedTouches[0].clientX; // fixed by xxxx 模拟点击事件，解决 ios 13 点击区域错位的问题

      var diff = Math.abs(this.clientX - clientX);
      var time = new Date().getTime() - this.timestamp;

      if (diff < 40 && time < 300) {
        this.$emit('click', {
          content: item,
          index: index,
          position: position
        });
      }
    },
    getButtonSize: function getButtonSize() {
      var _this3 = this;

      var views = uni.createSelectorQuery().in(this);
      views.selectAll('.uni-swipe_button-group').boundingClientRect(function (data) {
        var show = 'none';

        if (_this3.autoClose) {
          show = 'none';
        } else {
          show = _this3.show;
        }

        _this3.button = {
          data: data,
          show: show
        };
      }).exec();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 103:
/*!******************************!*\
  !*** ./src/api/trade/url.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var homeApi = {
  queryMyOrders: "/trade/customer/queryMyOrders",
  //獲取訂單列表
  addCart: "/trade/cart/addCart",
  //添加购物车
  getCarts: "/trade/cart/getCarts",
  //获取购物车列表
  editCart: "/trade/cart/editCart",
  //修改购物车信息
  moveToFavorite: "/trade/cart/moveToFavorite/",
  //移入收藏夹
  removeCarts: "/trade/cart/removeCarts",
  //清空失效商品
  moveToFavorites: "/trade/cart/moveToFavorites",
  //批量
  evaluateGoods: "/trade/customer/evaluateGoods/",
  //获取评价商品
  appendEvaluate: "/trade/customer/evaluateGoods/append/",
  //追评详情
  pageInit: "/trade/order/pageInit",
  //初始化结算
  storePromotions: "/trade/order/storePromotions",
  //获取店铺促销信息
  storeCoupons: "/trade/order/storeCoupons",
  //获取店铺优惠券信息
  freightPromotions: "/trade/order/freightPromotions",
  //获取店铺包邮活动信息
  storeOrderAmount: "/trade/order/storeOrderAmount",
  //获取店铺订单金额
  platformPromotions: "/trade/order/platformPromotions",
  //获取平台优惠券信息
  orderGold: "/trade/order/orderGold",
  //获取权益金
  orderScore: "trade/order/orderScore",
  //获取积分信息
  orderSummary: "/trade/order/orderSummary",
  //获取总订单价格
  submitOrder: "/trade/order/submitOrder",
  //提交订单
  deleteOrder: "/trade/customer/deleteOrder/",
  //删除订单
  getCustomerRefundOrderPage: "trade/refund/customer/getCustomerRefundOrderPage",
  //获取售后列表
  refundDetail: "/trade/refund/customer/refundDetail/",
  //售后详情
  queryOrderDetail: "/trade/customer/queryOrderDetail/",
  //查询订单详情
  cancelOrder: "/trade/customer/cancel/",
  //取消订单
  applyFofRefund: "/trade/refund/customer/applyFofRefund",
  //售后详情
  refundReason: "/trade/refund/customer/refundReason/",
  //售后原因
  submitApplyFofRefund: "/trade/refund/customer/submitApplyFofRefund",
  //提交售后
  extendShip: "/trade/customer/extendShip/",
  //延长收货
  confirmReceipt: "/trade/customer/confirmReceipt/",
  //确认售后
  queryMyUnCommentOrders: "/trade/customer/queryMyUnCommentOrders",
  //评价成功页面调用
  cancelTrade: "/trade/refund/customer/cancel/",
  //取消申请售后
  platformInvolve: "/trade/refund/customer/platformInvolve/",
  //申诉
  summary: "/trade/pay/summary/",
  //收银台详情
  submitPay: "/trade/pay/submit",
  //提交支付
  defaultCards: "/trade/pay/defaultCards",
  //根据用户更改支付类型判断礼卡可用余额
  selectCards: "/trade/pay/selectCards",
  //收银台礼卡更改时触发
  sendOrderSms: "/trade/order/sendOrderSms",
  //发送验证码
  sendSMS: "/trade/pay/sendSMS/",
  //收银台发送验证码
  submitLogisticsInfo: "/trade/refund/customer/submitLogisticsInfo",
  //寄回商品
  tradeFirstOrder: "/trade/customer/firstOrder/",
  //判断是否为新用户首单
  validSubmitCarts: "/trade/cart/validSubmitCarts",
  //购物车结算校验
  cusPageInit: "/trade/customize/order/pageInit",
  //定制品下单初始化
  submitCusOrder: "/trade/customize/order/submitOrder",
  //定制品提交订单
  buildPayOrder: "/trade/customize/order/buildPayOrder",
  //构建支付订单
  submitPayOrder: "/trade/customize/order/submitPayOrder",
  //提交线下支付订单
  getCompanyPaymentInfo: "/trade/customize/order/getCompanyPaymentInfo",
  //获取公司对公账号信息
  listPayLog: "/trade/customize/order/listPayLog/",
  //获取订单的支付记录
  listOrderPage: "/trade/customize/order/listOrderPage",
  //查询定制订单列表
  getOrderInfo: "/trade/customize/order/getOrderInfo/",
  //获取定制订单详情
  cancelCusOrder: "/trade/customize/order/cancelOrder/",
  //取消定制订单
  giftBagPageInit: "/trade/giftBagTransfer/order/pageInit",
  //转增商品下单初始化
  giftBagGoldOrder: "/trade/giftBagTransfer/order/goldOrder",
  //购物金可使用情况
  giftBagScoreOrder: "/trade/giftBagTransfer/order/scoreOrder",
  //积分可使用情况
  giftBagSummaryOrder: "/trade/giftBagTransfer/order/summaryOrder",
  //计算订单需要支付情况
  giftBagSubmitOrder: "/trade/giftBagTransfer/order/submitOrder",
  //提交订单
  giftBagPageOrders: "/trade/giftBagTransfer/order/pageOrders",
  //我的礼包列表
  giftBagPageGetLogs: "/trade/giftBagTransfer/order/pageGetLogs",
  //转赠单领取记录
  giftBagCancelOrder: "/trade/giftBagTransfer/order/cancelOrder",
  //取消订单
  giftBagGeneratePoster: "/trade/giftBagTransfer/order/generatePoster/",
  //生成转赠海报
  giftBagInfo: "/trade/giftBagTransfer/order/giftBagInfo/" //转增单详情

};
var _default = homeApi;
exports.default = _default;

/***/ }),

/***/ 1036:
/*!*******************************************!*\
  !*** ./src/components/uni-popup/popup.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _message = _interopRequireDefault(__webpack_require__(/*! ./message.js */ 1037));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 定义 type 类型:弹出类型：top/bottom/center
var config = {
  // 顶部弹出
  top: 'top',
  // 底部弹出
  bottom: 'bottom',
  // 居中弹出
  center: 'center',
  // 消息提示
  message: 'top',
  // 对话框
  dialog: 'center',
  // 分享
  share: 'bottom'
};
var _default = {
  data: function data() {
    return {
      config: config
    };
  },
  mixins: [_message.default]
};
exports.default = _default;

/***/ }),

/***/ 1037:
/*!*********************************************!*\
  !*** ./src/components/uni-popup/message.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  created: function created() {
    if (this.type === 'message') {
      // 不显示遮罩
      this.maskShow = false; // 获取子组件对象

      this.childrenMsg = null;
    }
  },
  methods: {
    customOpen: function customOpen() {
      if (this.childrenMsg) {
        this.childrenMsg.open();
      }
    },
    customClose: function customClose() {
      if (this.childrenMsg) {
        this.childrenMsg.close();
      }
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 11:
/*!*******************************************!*\
  !*** ./node_modules/uni-request/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/request */ 12);




/* harmony default export */ __webpack_exports__["default"] = (_src_request__WEBPACK_IMPORTED_MODULE_0__["default"]);




/***/ }),

/***/ 1115:
/*!**************************************************!*\
  !*** ./src/renovation/mixins_goodsJump/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  data: function data() {
    return {
      imgBaseUrls: this.$config.imgBaseUrl
    };
  },
  methods: {
    goToGoodsDetails: function goToGoodsDetails(item) {
      if (item.customizeFlag) {
        this.$Router.push({
          path: '/pages/goodsCustomized/index',
          query: {
            goodsId: item.id ? item.id : item.itemId
          }
        });
      } else {
        this.$Router.push({
          path: '/pages/goodsDetails/index',
          query: {
            goodsId: item.id ? item.id : item.itemId
          }
        });
      }
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 114:
/*!************************************!*\
  !*** ./src/api/starstore/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 115));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  canUseCount: function canUseCount() {
    //待使用星店优惠券数量
    return _request.default.post(_url.default.canUseCount);
  }
};
exports.default = _default;

/***/ }),

/***/ 115:
/*!**********************************!*\
  !*** ./src/api/starstore/url.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var starstoreApi = {
  canUseCount: "/starstore/coupon/user/canUse/count" //待使用星店优惠券数量

};
var _default = starstoreApi;
exports.default = _default;

/***/ }),

/***/ 116:
/*!************************************!*\
  !*** ./src/common/js/vipConfig.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 42));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var vipConfig = {
  getUserVip: function getUserVip(type) {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var a;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.getUserInfo().then(function (res) {
                var userInfoType = uni.getStorageSync("userInfo") ? JSON.parse(uni.getStorageSync("userInfo")).plusFlag : 0;

                if (userInfoType || type) {
                  var vipInfo = res.filter(function (item) {
                    return item.type == (type ? type : userInfoType);
                  });
                  return vipInfo[0];
                } else {
                  return res[0];
                }
              });

            case 2:
              a = _context.sent;
              return _context.abrupt("return", a ? a : {});

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  getPartner: function getPartner() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var a;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this2.partner().then(function (res) {
                return res.distributorTypeList;
              });

            case 2:
              a = _context2.sent;
              return _context2.abrupt("return", a);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  getVipInfo: function getVipInfo() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
      var a;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _this3.getUserInfo().then(function (res) {
                res = res.splice(1);
                return res;
              });

            case 2:
              a = _context3.sent;
              return _context3.abrupt("return", a);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  getUserInfo: function getUserInfo() {
    return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise(function (resolve, reject) {
                var inter = setInterval(function () {
                  if (uni.getStorageSync("memberConfig") && uni.getStorageSync("userInfo") && uni.getStorageSync("sessionId")) {
                    clearInterval(inter);
                    resolve(JSON.parse(uni.getStorageSync("memberConfig")));
                  } else if (uni.getStorageSync("memberConfig") && !uni.getStorageSync("sessionId")) {
                    clearInterval(inter);
                    resolve(JSON.parse(uni.getStorageSync("memberConfig")));
                  }
                }, 200);
              }));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  partner: function partner() {
    return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", new Promise(function (resolve, reject) {
                var inter = setInterval(function () {
                  if (uni.getStorageSync("partnerConfig")) {
                    clearInterval(inter);
                    resolve(JSON.parse(uni.getStorageSync("partnerConfig")));
                  }
                }, 200);
              }));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  }
};
var _default = vipConfig;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 117:
/*!**********************************!*\
  !*** ./src/common/js/setCopy.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  methods: {
    copy: function copy(str) {
      uni.setClipboardData({
        data: str,
        success: function success() {
          uni.showToast({
            title: "复制成功",
            icon: "none"
          });
        },
        fail: function fail(err) {}
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 12:
/*!*************************************************!*\
  !*** ./node_modules/uni-request/src/request.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class */ 13);
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/util */ 14);
/* harmony import */ var _defaults__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaults */ 17);












function createInstance(config) {
    let context = new _class__WEBPACK_IMPORTED_MODULE_0__["default"](config);
    let instance = _helpers_util__WEBPACK_IMPORTED_MODULE_1__["bind"]( _class__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.request , context );
    _helpers_util__WEBPACK_IMPORTED_MODULE_1__["extend"]( instance , _class__WEBPACK_IMPORTED_MODULE_0__["default"].prototype , context );
    _helpers_util__WEBPACK_IMPORTED_MODULE_1__["extend"]( instance , context );
    return instance;
}

let request = createInstance(_defaults__WEBPACK_IMPORTED_MODULE_2__["default"]);


// 用于创建多个实例
request.create = function (config) {
    return createInstance(utils.merge(_defaults__WEBPACK_IMPORTED_MODULE_2__["default"], config));
};

// 并发请求数据处理
request.spread = function (callback){
    return function (...arg) {
        return callback.apply(null , [...arg] );
    }
}


/* harmony default export */ __webpack_exports__["default"] = (request); 




/***/ }),

/***/ 1258:
/*!*********************************!*\
  !*** ./src/api/system/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 1259));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  provices: function provices() {
    //获取一级地址
    return _request.default.post(_url.default.provices, {});
  },
  cities: function cities(id) {
    //获取二级地址
    return _request.default.post(_url.default.cities + id, {});
  },
  counties: function counties(id) {
    //获取三级地址
    return _request.default.post(_url.default.counties + id, {});
  },
  towns: function towns(id) {
    //获取四级地址
    return _request.default.post(_url.default.towns + id, {});
  }
};
exports.default = _default;

/***/ }),

/***/ 1259:
/*!*******************************!*\
  !*** ./src/api/system/url.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var appApi = {
  provices: "/system/district/provices",
  //获取一级地址
  cities: "/system/district/cities/",
  //获取二级地址
  counties: "/system/district/counties/",
  //获取三级地址
  towns: "/system/district/towns/" //获取四级地址

};
var _default = appApi;
exports.default = _default;

/***/ }),

/***/ 13:
/*!***********************************************!*\
  !*** ./node_modules/uni-request/src/class.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/util */ 14);
/* harmony import */ var _InterceptorManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InterceptorManager */ 15);
/* harmony import */ var _core_dispatchRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/dispatchRequest */ 16);





class Request {
    constructor( config ){
        this.defaults = config;
        this.interceptors = {
            request: new _InterceptorManager__WEBPACK_IMPORTED_MODULE_1__["default"](),
            response: new _InterceptorManager__WEBPACK_IMPORTED_MODULE_1__["default"]()
        };
    }
    request( config ){
        if( typeof config === 'string'){
            config = _helpers_util__WEBPACK_IMPORTED_MODULE_0__["merge"]({url: arguments[0]}, arguments[1]);
        }

        config = _helpers_util__WEBPACK_IMPORTED_MODULE_0__["deepMerge"](this.defaults , config );
        config.method = config.method ? config.method.toLowerCase() : 'get' ;

        let chain = [_core_dispatchRequest__WEBPACK_IMPORTED_MODULE_2__["dispatchRequest"], undefined];
        let promise = Promise.resolve( config );

        this.interceptors.request.forEach(function(interceptor) {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
    
        this.interceptors.response.forEach(function(interceptor) {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        });

        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }
    
        return promise;
    }
    all (promises){
        return Promise.all(promises);
    }
}



['delete', 'get', 'head', 'options', 'trace'].forEach(method => {
    Request.prototype[method] = function ( url,config ) {
        return this.request( _helpers_util__WEBPACK_IMPORTED_MODULE_0__["merge"](config || {} ,{
            method,
            url
        }) );
    }
});




['post', 'put', 'patch' ].forEach(method => {
    Request.prototype[method] = function ( url, data, config ) {
        return this.request( _helpers_util__WEBPACK_IMPORTED_MODULE_0__["merge"](config || {} ,{
            method,
            url,
            data
        }) );
    }
});



/* harmony default export */ __webpack_exports__["default"] = (Request);

/***/ }),

/***/ 134:
/*!**********************************!*\
  !*** ./src/common/js/fmagent.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fm158EsMin = _interopRequireDefault(__webpack_require__(/*! @/static/fmsdk-1.5.8/fm-1.5.8-es.min.js */ 135));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  data: function data() {
    return {
      hideFMCanvas: true
    };
  },
  methods: {
    setData: function setData(obj) {
      var that = this;
      var keys = [];
      var val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          if (index + 1 == keys.length) {
            that.$set(data, key2, val);
          } else {
            if (!data[key2]) {
              that.$set(data, key2, {});
            }
          }

          data = data[key2];
        });
      });
    },
    fmagentInit: function fmagentInit() {
      var _this = this;

      var _fmOpt = {
        partnerCode: "beifa",
        // 请填入您的partner code
        appName: "beifa_xcx" // 请填入您的app name

      };

      if (this.$config.addImageUrl == "https://api.beifamall.com") {
        _fmOpt.env = "PRODUCTION";
      }

      var fmagent = new _fm158EsMin.default(_fmOpt);
      fmagent.getInfo({
        page: _this,
        // 请传入FMAgent所在的Page或Component对象
        openid: '',
        // 请传入加密的用户openid
        // 如果您开通了unionid功能，请传入加密的用户unionid，
        // 否则留空即可
        unionid: '',
        success: function success(res) {
          uni.setStorageSync('fmagent', res); // 成功回调，res为blackbox字符串
        },
        fail: function fail(res) {// 失败回调，res为各种exception对象
        },
        complete: function complete(res) {}
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 135:
/*!***************************************************!*\
  !*** ./src/static/fmsdk-1.5.8/fm-1.5.8-es.min.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var rj = 'length',
    wE = 'charCodeAt',
    MV = 'fromCharCode',
    nr = true,
    IL = false,
    vw = '~/=',
    qy = '\0\0\0\0\0\0\0\0',
    pg = '\n',
    aO = '{yvrx',
    qq = 6,
    Pg = '&',
    Uc = 85,
    RD = 'fb]_c',
    TR = 80,
    Bk = '"',
    zG = 81,
    tN = ',!5',
    nO = 28,
    zk = 'KQL@',
    qk = 56,
    zy = 'n',
    HV = 60,
    aq = 'u{zn',
    qm = 3,
    Nu = '`',
    gL = 46,
    nE = 'CEGECMOMCK',
    RW = 16,
    Bm = '',
    FZ = 'QWNNd2H',
    lL = 69,
    MM = 'E{t',
    Da = 9,
    YF = '"vw\x7Fk\x7Fg$)zv~/{',
    uU = 12,
    TS = 'ynowcw_}pb~fvc',
    gX = 4,
    SC = 'ppppppppppppppp/1317131?13+)/)+)79;9?9;97IKIOIKIWY[YKuwu{}\x7F}{uDAl',
    Na = 45,
    US = 82,
    QO = '-B@7a(5;9488',
    Qc = 43,
    Ft = 'w%\x7F1o(-',
    Ww = 22,
    Uk = 'TXP`6`',
    Vl = 78,
    WG = '(5,A\x7F8=',
    rm = 38,
    UW = 'u{q&W"',
    CZ = 'jwr&Z%{',
    Uv = '<@8H}H',
    zp = 54,
    fH = 'hldtB|',
    Kw = 87,
    Uw = 'vhvsabo',
    uM = 2,
    gq = 51,
    Tp = '8E<Q(HM',
    IQ = 'KQDD^4N',
    zT = 63,
    hQ = ' $\x7F,Y4',
    RG = 26,
    Zv = 'n{v*f!$',
    GW = 13,
    Hv = 'hlagsKc',
    Dj = 92,
    tB = '9?5KrO',
    Gu = '#.+>r=0',
    nt = 33,
    uR = 'OUHHZ0J',
    qz = 67,
    Gm = 'ptl#J\'',
    Bq = 11,
    Sl = 'dqh}\\|q',
    DF = 'GMGU!]',
    yM = 65,
    rq = '`wwd=ecalyom',
    Gq = 94,
    Yl = 'aU]XTWR',
    jf = 76,
    CP = 73,
    HT = 24,
    zu = 'mdqpebc',
    vI = 93,
    dk = 'k_ha',
    nn = 90,
    jn = '~E=I;2D}F01MF2KK',
    Ye = 'C:KJ38=',
    ke = 'Kmyon~J\'be}p|{{',
    NW = 5,
    yW = 'b',
    XG = 'y',
    cP = 74,
    qj = 'x',
    jm = '(',
    vk = 88,
    zZ = 't',
    gB = '0',
    Py = 1,
    jr = '#',
    CE = 83,
    MW = 'A',
    ju = 18,
    RL = '5',
    TB = 'J',
    fb = 27,
    IM = 64,
    ZQ = 0,
    aY = 8,
    Ua = 15,
    aT = 30,
    Ja = 48,
    pH = '7@r3',
    Eb = 'Xc0SY`Ve',
    jl = '\\k[l',
    hl = '`spkbh',
    PB = 'x3MNu,*',
    Rv = 23,
    EE = 'v1OH`("+)!.:',
    gH = 21,
    Vb = '":ZU~73',
    Ej = 32,
    SV = 'Qk*%;bXaSkT`',
    Fu = 79,
    AD = '-Gab"8F',
    gI = 'F^~y0YU\\X^Yk',
    Hw = 68,
    WO = 'C]{t2V^W',
    pu = ';Usl-TNWMEB^',
    Rf = 57,
    Up = 'Jb#}G_[',
    Rk = 72,
    lK = 'F^~y=S]T',
    bW = 'Oi$\'5QR',
    Ae = 77,
    Ap = 'Uo.)3_\\',
    Tc = 'Ys2-Cj`ikclx',
    eR = '":ZUk=)0$:%7',
    MN = 'C]{t5\\V_E]ZV',
    ev = 'i"B=f|z',
    vB = 'Ys2-Hlha',
    Wm = 'Zr3,8ZY',
    mm = ':Rrm\x7F:9',
    Xa = '6Nni IELHNI[',
    yq = 52,
    pm = '|7QRq(6',
    JM = 'H`|\x7F1KIZ4XXDQ',
    eS = 70,
    al = '?Ywp<JT',
    Pk = 61,
    aP = 'Wq,/@XXkCikU`',
    qr = 'r-KDo& ',
    Kc = 17,
    jt = '0Hdgx31B,00<I',
    PX = 'w0LOt--',
    LL = '@Xtw)CAR<@@LY',
    lG = 62,
    lb = '>Vvq3KW',
    fg = '(@\\_p+):s88$1',
    fe = '{4PSp))',
    nT = '.Ffa~13D*>2>O',
    MX = 44,
    jC = 'h#=>e}}',
    Jr = 7,
    tH = ' 8TWv53*',
    Vv = 'A[uv+RHQC[DP',
    DO = 'Zr3,Wok',
    Ok = 'Ke #@^X',
    aC = '5Oij&>:M!757F',
    Iq = '.Ffa#;G',
    up = '1Kefy2>A-313J',
    IJ = 47,
    Ek = '*Bb]\'?;',
    qT = 40,
    Kf = 'A[uv*BNQ=CACZ',
    RZ = 'l\'ABay&',
    TM = 'c}8;Tll\x7F_egat',
    tV = '0Hdg-EE',
    XI = '-Gab}62E)?=?N',
    Nl = '|7QRn6,5/\' <',
    Qv = 'k$@CZ~\'\x7F',
    FG = 10,
    gC = '_y47Ipjsayfr',
    kt = 'v1OHk",',
    Kn = ' 8TW|55',
    af = '=Wqr2HV',
    Fj = 59,
    cf = '_y47Eab',
    Sv = '.Ffak65',
    Jl = "+Ec\\u<3C",
    VX = 41,
    Zr = '(@\\_j34F',
    Oc = '\\t12:dg',
    Md = 'H`|\x7F.HK',
    mJ = 'A@CBEDGF',
    pI = '%!a&\'|xp',
    pF = 14,
    km = 'OIG<E',
    qO = 'a`cbedgf',
    VL = 'eaFfg_Y_',
    vL = ')#|{~',
    DS = 19,
    Tv = 'ONMLKJIH',
    vQ = 29,
    Lq = 'IE*JC;E;',
    Ob = 50,
    YG = '>66-4',
    FF = '()*+,-./',
    dq = '#|c %rzr',
    uS = ':22)(',
    Fl = 36,
    eb = '@?I%6UD',
    yC = 58,
    LZ = 'hgwDnh`Sr}\x7FmbCl`ryt`',
    EX = '# 2b!-\'i=&:*%er%l23=',
    YA = 25,
    Rb = '~posVp~v',
    aM = ':BI',
    kr = '[XI[aOA]Ol\\LVC',
    lS = '&jY^c-#lgb',
    lf = 84,
    AV = '77*M]',
    FQ = 31,
    lA = ' rrz',
    Og = 'hZUY8Zd\\',
    dp = 'o}~Tyt',
    Gk = '!XX',
    Rj = 39,
    MA = '[Yi[',
    Pu = 'uOM',
    Hb = '\'',
    Xy = '?<N(HBL>74',
    DN = 53,
    ZP = '.4>q4F6',
    XP = '_RRZ',
    Hm = 'zv)t',
    SL = 20,
    YD = 'mGE',
    Rr = '?=M?',
    FD = '43Cl8>=58H8:(;=9',
    tt = 42,
    hb = 'f[Uc',
    Mk = 'wt\'P${xr{,\x7F\x7Fktxv',
    FX = 'V4',
    eG = 'NNOGMGBF\\',
    tI = 'bUSW',
    Ff = 'N&)',
    Uh = '[;',
    TV = 'BB2BG#>20',
    fd = '@539',
    Cz = ']_I_ZDUW[',
    df = 71,
    qB = 'ZfeAlY',
    ct = 'nk]q`hvl',
    tc = 91,
    lD = 'nuz',
    CG = 't!"',
    Yj = 'mjx^kiiUgpp',
    ec = '\\4;',
    bm = 'pN',
    LU = '0/?u*8F?3=vI5#',
    zt = 'uhdl',
    TY = 'ts Xv\'#{(qk,q\x7F',
    nf = '?MN$ID',
    WN = 55,
    Yv = '|[',
    MU = 35,
    Xc = 'IAMQNH@(\\BJ',
    yf = '#x+/ "&o&,s',
    Xm = 'uffd',
    It = '=0,4',
    EF = '~!xxfqws',
    tA = '65E5?',
    Cm = 'vNQ',
    Dv = 'nM',
    MJ = 'TScCTZTUS&U]XXoTBqr',
    Vz = '`USY',
    jI = '_mnDid',
    wF = '-l',
    Of = '=)1?(',
    rG = '\'^a',
    BZ = '+j',
    kJ = 49,
    tb = 'NM[7D[V',
    mR = 'dcsFDGVvVxh',
    TU = '.-9mmn\x7F< 2&',
    yw = 'vu&TVQd#x-~',
    XX = 'CQR(U@',
    OX = '-gg',
    br = '_a\\V^VSUm',
    hV = '3ABs975',
    uI = '~VY',
    QU = 37,
    FA = 'F!|',
    Wb = '9?9:E{O.COLNDG\'JZ*Ze__(,\\S%"+W!ZD',
    UX = 'A408',
    Zf = 'RVVQ^=dElVUUmnLQsEs#pvACEzBIL~FA]',
    QF = 'ESP.WB',
    rk = '@x{',
    uL = 'uwvhtlmos',
    rB = '%& !%! Y)||',
    EC = '"[\\',
    fT = 'iBA',
    CB = '-*8k6*0/=.2!e*4(',
    IF = 'PECI',
    Fm = '21=n31=*2%7$b!1#',
    St = 'guvLql',
    Qf = '^ZlX',
    Hk = 'lh~j',
    yB = '*)| ',
    Iy = '\'ac',
    hm = '~v(}CMH',
    bz = 'i',
    nX = 'K%*',
    jH = '+eg',
    Zh = '_\\n9`h[konfk0P`nKLy',
    nG = 'i\\X`',
    kW = '"!-_#5&("#%(R-?+m1<',
    RM = '2>=zD1',
    GR = '^A',
    Re = 'IKJ<@89;G',
    Vw = 'mo"qhkz',
    RB = 'H@<;>',
    FL = '.gh',
    IO = '\'i',
    IV = 'SNFTMWSW',
    qH = 'GB:H9COC',
    Np = '51n3<#5d*=,',
    DT = 'AOFQKLB',
    kN = ';@G',
    Ne = '?A7=u9C2L65O4}:>PU\'Q',
    Rm = '$vv~',
    yu = 'RRJR!J^O_[X\\G)IKCFZF',
    jN = '.:9v85',
    UY = 'RZ\\aP4]c\\jTUoZ>\\@NqGu',
    gR = 'BAM"@BF#AH@',
    ka = '*|x\'',
    Hl = 'vu&V|~r_u|t',
    PA = '+9:q=(',
    pw = 'a:?',
    Pp = 'dhefwq',
    Yg = 'L$+',
    zO = 'yRW',
    Bp = 'QN^gKdDZJZQU8ZT\\.^pE',
    NG = 75,
    SY = '%tyz',
    QR = '"tpx',
    eZ = 'lku#ny[\x7FUg|rC\x7F{aI{ob',
    Jt = '6BA~@=',
    aU = 'bRY]0R\\T6Fh]',
    LA = '2kl',
    mu = '>v{',
    pB = '&w~y',
    KK = 'aR`1KgI',
    VW = 'VdZWc]0Si`^m:oohHzu',
    kI = '#sslx i%',
    zM = 'G9<?',
    Xr = '2@63G1|?5=:JyL><(%/P',
    jU = '>@C#HLJH8XFF',
    JJ = '?33',
    KQ = 'eijDwuuq_qy\x7F',
    UN = 'N>BH8',
    Kb = '3$6f-)*u<0&.',
    az = 'DFHI4FGU',
    Tg = 'UFT*JTBDF*DYFN',
    MK = 'C4Fv=9:$L@6>',
    DR = '6AK:',
    cC = 'BDJK*D9W',
    wD = 'xk{Hjtw_qw{a',
    vj = '-y"#\'.',
    ef = '!%%$h%{(',
    Nc = '.!-b#/z|/R- /v',
    pX = 'r}sp\x7F',
    SQ = '\\O_,\\R[;ZjD',
    EI = 'xz|}br- ',
    DP = 's!"xA?<vs0{v`,aw`1og0,xn',
    an = 'ZOIW',
    wv = 'WFDGU\\BQ',
    Eu = '/""*',
    Ak = 'hhhhhhhhxxxxxxxwghhhhhh79;RRVVRRNNSSVVRR^^RRVVRRNNrr#-/-#%\'%#]',
    KI = '2?:O"BC',
    Ld = '"&"2[6',
    gE = 'Wb_rOil',
    uB = '*.*:c>',
    MI = '0=4I @E',
    Oz = 'bfbrDv',
    Pn = '/5/=hE',
    Ue = 'MAID8;F',
    nl = 'z&#6j5(',
    KA = 'fjcaqIe',
    hf = '^b^n8j',
    ZC = '@MDY0PU',
    Cc = 'u{rr!^t',
    UH = 'kqkyMy',
    WS = 'S^[nCm`',
    pR = '393AtA',
    Rn = '$1(=s<1',
    Dd = 34,
    Yk = 'gm``rHb',
    DZ = 'gmguA}',
    Ir = '}qythkv',
    cD = ':;89>?<=',
    je = '({$!r}|',
    Kr = 'ps]suj`ll',
    KR = 'mga^[',
    Vp = 66,
    YJ = 'suwus}\x7F}',
    Pq = '/9/:**',
    Sq = 'KD[',
    Qe = '>6K=bbk',
    Qj = 'ZRgY\'!,',
    fY = 'a^lMgbY',
    Ew = 'M',
    Hp = 'H6F9AF',
    mB = ')93%3)46',
    BN = 'co]o_kok',
    Lt = 'INA;AG',
    jb = '&4, 0,))',
    Wd = '9DFJNMM>BLB',
    LN = 'qrrvtp|vn',
    Ur = 'RYNBJN',
    bd = 'pppv~tZysu{u-+',
    ZR = 'm}wi\x7Fupr',
    vn = '.&~~z\'!zt',
    JT = 'TLAGAMKCK',
    Xb = '9-6,);',
    Tq = 'zu+ ',
    vt = 'oyyMniw',
    fD = '_goUawungg',
    ha = 'XGyzSdhF0MPu(0o[Dq*\\{{\\]',
    hA = '?HzFGCD<B2',
    Oq = '$*7z34',
    HQ = '&30-5RJK,\'8(=?E+ o!1?6$\'?/Q:0Q58,&o3) 6y#E$;!))%3Z:"99',
    pP = '<G)KF',
    uW = '%-4y<7',
    uf = 'U^Fb_',
    RS = 'T\\g',
    bj = 'hke_i^jfoo',
    YW = 'LR_A[\\',
    Va = 'bolii1/.hc"k`VaQwN|\x7Fwg>Jp0}xt~Tsi`nXc,lkaiimS%jbyy',
    tq = 'S]f',
    BI = ';=-',
    Mm = 'y )l)"',
    Pb = '1<?:8gQP\'066<[37\'!?-#C!9%N,)+/f$819)2R?<0&8>"[=3(&',
    Bw = '| ( z)5)k#t.',
    ZK = '[^_kl[[XoFzV||a',
    Qw = 89,
    SO = 'fVji`^n>mSQ',
    aB = 'hvuVlqj',
    rr = '2"654"2',
    kO = 'B2FED2BsI?=',
    uD = '[khK_bY',
    re = 'aqrMehc',
    JY = 'V\\Stq{#M8ptr)={,311',
    BH = 'EIB',
    Zm = '"(~@EOVrSL@N\\VA^/.SRTTV~',
    ty = '253553=5/',
    hY = '52@u81;',
    tr = '3<n:3?0(6&',
    aN = '/y(%',
    BX = '9A6Y\\da*z^hymoi}FEMLfALCDxhNDD|zXs]Wbbt_i^',
    cQ = 'hZkXn9dPU`',
    LG = 'k]`c',
    qe = '.\x7F\' ',
    mw = 'a_s]',
    uV = '=/61',
    Mq = ',(>*',
    Th = 'OW)VNIRLPh',
    uT = 'LW$QTVIO_A',
    Mp = 'IJ;:?LO',
    cp = 'abSRWdg',
    FW = '{mps',
    In = 'b^p\\',
    jz = '\\b:aS\\g_mg',
    Nn = '@MHNMGWE',
    uk = '9DAEF>L<',
    LT = '][oY',
    Wr = 86,
    Xk = '<BuA3<G?MG',
    cU = 'WILO',
    tK = 'ig{e',
    SS = '!)^$\x7Fx {":',
    GM = 'IFT6RTRDAN?P\\H',
    Nk = '\'/7j0,-4">J',
    da = '"\x7Fxt\'',
    ne = ':;',
    Af = '0/?\x7F63(',
    pt = 'EN|HMINFXH',
    bN = 'LO>?:IJ',
    Hd = 'lo^_Zij',
    Hq = '_jkoldvf',
    ZO = '{)$*!x+z',
    pE = '~nwp',
    AM = 'u!Mx}y~v)x',
    XU = 'XCQL',
    bM = 'EMBe`hu>vfjmhsf}n||`jzgymqy\x7F\x7F0',
    JA = 'X^Qzs$!K:*yr{?u)"004&6351bllj]',
    pQ = '0*15',
    Eq = '#|$*',
    cX = '?JKOLDVF',
    vH = ')4156.<,',
    Dc = '||pxrt',
    Wn = 'MGCDBD:',
    Tr = '4|-(',
    KW = '$*|FGITpUDDH@JLR/]PNGYQZT^XFPPLBNQOWCGEE',
    RN = 'xlsjw|~',
    Kp = ':E|1z',
    QN = 'znqhq~|',
    EH = '8Cs=8:=3K=',
    YM = 'VASN',
    ay = 'V\\Stq{#M8,svy-(* 5j32ib\'jl*jb-ga%tuv\'',
    TQ = 'v|s;2:CmXL05:MHJ@U+SR(#G+/J)#M$ E7:5G[',
    vK = 'ienl',
    JC = 'jdos',
    ul = '$1,2)#3!',
    OE = '*7647)=+',
    WQ = 'vNS',
    CD = '}z)i$!}',
    Wh = '30B}A:F61}097sK5?',
    XD = '"-Y+",#z%t',
    Ql = '2>=?;',
    lI = 'KSDonv\x7F8-e`r)upwi{`]g~b2s\x7Ftjvt-:',
    fc = ':4?C',
    qI = 'eajh',
    eF = 'EPMQJBP@',
    SI = '0=8>=7G5',
    kD = 'K=AMYomfoo',
    LH = '*{ .8LLGNL',
    Ie = 'FBI@A',
    Aa = 'R].[R\\SIUG',
    YS = '37,',
    yJ = '19.QT\\Y"b\']_\\TQe.>$RDHHCB@pLF\x7FNBj^QO]o}\x7F)qpsf',
    gG = '-5*MHP]&n3!9jPBVJADFrF@IT@|@SUKywu~wr',
    gr = '@:AE',
    aa = 'sotz',
    uw = '/:;?<4F6',
    pA = 'OZ[_\\TfV',
    tU = 'Wef<a\\',
    nV = 'Y7',
    de = '\\\\YQSUTHj',
    Ut = 'ooEfpRoaaEcxx',
    gd = 'M>><&:OM',
    Gf = 'QBB@"FKI',
    gz = ')37d #-',
    Xg = '>1,C95',
    Jp = 'ACB48013O',
    OK = '9**(i.31',
    hX = '(%%*',
    ET = 'B#',
    YT = 'IK5KNs?>3K1CIN5E+Y',
    Dw = 'qqAfabh`|xelzjzJzrbzs',
    Ze = 'lduP\x7FwRq{}c}tp',
    Kk = 'V\\WII_',
    HY = '.(] 6{{',
    wB = 'yRT',
    Rl = 'JNOA',
    yK = 'J"%',
    cr = '\'aa',
    wL = 'oq_mt:mndTed',
    Or = '[[-X]YKXW&^FV^_',
    du = 'XPa<c[FeWi_ihd',
    Ke = '-5." 4',
    Kv = 'F@u8N20',
    JH = '*be',
    KP = 'lpmg',
    wj = 'Cz"',
    Jf = '.fi',
    tR = '*47',
    CJ = 'mvEpuqvnp`',
    bB = 'OU^VUN/@Z[BLE\\',
    ug = 'w`pm',
    mz = '&,#DAKR~WMO_INZPVP[_QQ{',
    vM = 'rxo76>GaD88J>=OC#?$*&$L',
    Pd = '2,7;',
    Tf = 'IENL',
    mO = 'jwvtwi}k',
    CY = '~*+/,$6&',
    TI = '9Bp<9E:2L<',
    kl = 'OX+VWSTLRB',
    DY = '~%.&%\x7F^q*+}}t,',
    LO = ']STM\\[[',
    Am = 'cd`dfbjdP',
    FN = '9*6)q=3+\';!',
    yS = 'C7@E2AC',
    Ip = '[cnRjm',
    bX = '/aSa`[Se%',
    eu = 'm_mrogi',
    RH = 'jhom',
    Cy = '_olicdYuodf&z&{ze:v~d~=dhsyw}p||b',
    zm = ',,{.*)]/tt',
    IG = '73',
    cO = '84J6',
    GQ = 'MPMY^UIVQHhDnno',
    ZV = 'ea',
    fZ = '#!y{ ',
    SP = '~',
    Iv = 'qbpRvhvXmj',
    dl = 'PV\\6V`T',
    WT = '\\[eAJiX',
    lm = '!\x7F,\\\'#xk;$$u+kt\'j0l?',
    Uy = ';8Jz9E? ENB2M,;M%*+U',
    Bl = 'SOGSE\'COI',
    ye = '#-6',
    cJ = 'urgq$agsi)zjxe',
    rc = 'R9*)0QW?41',
    Al = 'oob$6',
    nc = 'WYCST',
    cI = 'BHR:LPPKZX',
    Dp = '"s&%$s"',
    rP = '_i_jZZ',
    VN = 'rrskicnbp',
    gv = '1#*%',
    OW = 'J:C<',
    gN = 'NJ\\H',
    nm = ':*3,',
    ep = ';,>h-9/',
    bk = 'ts br\x7Ft',
    Zp = 'ZMY9_S_OFE',
    YX = 'iquOrnkrdp)',
    bP = '+*',
    ld = 'Ze6cZd[Qm_',
    vN = '}!onkx{',
    kY = 'TWFGBQR',
    jD = 'CNOSH@RB',
    HI = 'p}x~}w$u',
    Dt = '-0-9>5)61(H$NNO',
    cM = 'FQ"ONHOEYK',
    Xh = 'v R\x7F~x\x7Fu*{',
    Sm = 'CTWDKAH@,GINAI_U',
    GB = 'BE010GD',
    pp = 'DG672AB',
    nQ = '8E@FE?O=',
    bL = ' -(.-\'7%',
    OB = '"\'&,+ "!&|=/;58',
    Ra = '6Am?>8?5I;',
    CO = '{/,#,y!\'T.qv*q$<',
    HW = '12#"\'47',
    Gj = '(+ut}-.',
    cR = 'nsrx\x7Ftvurk.{((-',
    GL = 'ktGrkwh`~n',
    Mc = 'P[(UPRUKSE',
    UG = 'ctwdkah`Lginai\x7Fu',
    GZ = 'uvgfcps',
    YY = 'z}hih\x7F|',
    HC = 'v"#\'$}.\x7F',
    mQ = '[\\X\\^Zb\\X',
    Je = 'NRYWTO.AYXMMD]',
    Vf = 'RW][Pdnd1V^Q',
    Lh = '$)3)"6<2b8,\'',
    Ym = '!X^',
    mr = '-*8z+6-',
    JE = 'C58;',
    dQ = 'G8Jt1M3',
    Oe = 'jjdd<_\\[kUcmhQeSy',
    CF = '..((Y/.,s\'$',
    Ng = 'iliurimj}Tt`r-s',
    Ea = 'ORS_XWWTSJnZhhm',
    bH = '6IJ9F2G=~H<3L:JB',
    pz = 'hkZ[^mn',
    Gw = 'UVGFCPS',
    yX = 'cnosh`rb',
    qW = '1<9=>6D4',
    ea = '>CBHODFEB;YK_Y\\',
    zb = '5&2%u17/#\'-',
    at = '&)\')!/)!r',
    QB = 'BUVEJFKA+DHO@N^V',
    YV = '\'&',
    un = '00$,. ',
    WH = '+-#)!%',
    Dr = 'hhe]gY',
    OY = 'PPDLN@',
    mn = 'LD9?9EC;3',
    Pa = '.',
    DI = '9;-;7+',
    pr = 'smenhbd',
    AL = '=73424*',
    Ce = '%\'&y$}',
    jT = '~vp{swk',
    DE = 'PH=CEAOG7',
    aj = 'ZRLWWKO',
    KC = 'RRSKICNBP',
    FH = 'V11',
    XY = '@8436',
    WA = '{TZ',
    jA = '132$( !#?',
    te = 'xST',
    Uf = '~Y^',
    qg = 'K=OLMEK',
    Bv = 'uguzwoq',
    GI = 'Zhk[c_`Y',
    fh = 'UefAQd_',
    fj = '?',
    qf = '#Z_',
    Nm = 'c==',
    gT = 'oqlfnfce}',
    We = 'a;<',
    zU = '& ',
    YN = '3;C)=CA:KK',
    FJ = ')',
    hE = 'xPP',
    jc = '^',
    ry = 'kI',
    gV = 'C ',
    bK = '3mi',
    dE = 'R-.',
    uu = 'T4',
    LK = '1s',
    PR = 'vQS',
    EK = '_89',
    JO = '<',
    rw = '8',
    He = 'Q1',
    DQ = ',',
    bh = 'lM',
    mF = 'S',
    wJ = 'W',
    JV = 'u',
    ZD = 'O',
    HX = ':',
    Ch = 'E7EJG?A',
    Gc = 'JX[KSOPI',
    ad = ';E;F>>',
    XA = '350**"/!1',
    HU = 'ppXjm',
    KB = 'qy"ks  |*(',
    lW = 'RBVUTBR',
    Zw = ':?>DC8:9N\'E7C]@',
    GK = '340462:4 ',
    HK = ']Q\\S[4QKZW',
    qY = '*/53(<F<x>&9',
    CV = 'LQLZ]JHWPIkEmon',
    jR = 'gpCnokldzj';

function nk(BV, GN) {
  var Ed = BV[ey(aO, qq)](ey(Pg, Uc));
  var nu = GN[ey(RD, TR)](ey(Bk, zG));
  var Cg = Math[ey(tN, nO)](Ed[rj], nu[rj]);

  while (Ed[rj] < Cg) {
    Ed[ey(zk, qk)](ey(zy, HV));
  }

  while (nu[rj] < Cg) {
    nu[ey(aq, qm)](ey(Nu, gL));
  }

  for (var ez = ZQ; ez < Cg; ez++) {
    var LM = parseInt(Ed[ez], FG);
    var ZJ = parseInt(nu[ez], FG);

    if (LM > ZJ) {
      return Py;
    }

    if (LM < ZJ) {
      return -Py;
    }
  }

  return ZQ;
}

function eh(BV) {
  var GN = ey(nE, RW);
  var Ed = 255;
  var nu = ZQ;

  for (var Cg = ZQ; Cg < BV[rj]; Cg++) {
    Ed ^= BV[wE](Cg);
    nu += BV[wE](Cg);
  }

  return ey(Bm, zG) + BV + GN[wE]((Ed + 256) % FG) + GN[wE](nu % FG);
}

function jX(BV, GN) {
  return GN[ey(FZ, lL)](BV + ey(MM, Da)) > -Py;
}

function mM(BV, GN) {
  return GN[ey(YF, uU)] - BV[ey(TS, gX)];
}

var At = {
  _keyStr: ey(SC, Na),
  encode: function tk(BV) {
    var GN = ey(Bm, US);
    var Ed, nu, Cg, ez, LM, ZJ, wc;
    var hU = ZQ;
    BV = At[ey(QO, Qc)](BV);

    while (hU < BV[rj]) {
      Ed = BV[wE](hU++);
      nu = BV[wE](hU++);
      Cg = BV[wE](hU++);
      ez = Ed >> uM;
      LM = (Ed & qm) << gX | nu >> gX;
      ZJ = (nu & Ua) << uM | Cg >> qq;
      wc = Cg & zT;

      if (isNaN(nu)) {
        ZJ = wc = IM;
      } else if (isNaN(Cg)) {
        wc = IM;
      }

      GN = GN + this[ey(Ft, Ww)][ey(Uk, Vl)](ez) + this[ey(WG, rm)][ey(UW, RW)](LM) + this[ey(CZ, Da)][ey(Uv, zp)](ZJ) + this[ey(CZ, Da)][ey(fH, qm)](wc);
    }

    return GN;
  },
  decode: function PZ(BV) {
    var GN = ey(Bm, Kw);
    var Ed, nu, Cg;
    var ez, LM, ZJ, wc;
    var hU = ZQ;
    BV = BV[ey(Uw, uM)](/[^A-Za-z0-9\+\/\=]/g, ey(Bm, gq));

    while (hU < BV[rj]) {
      ez = this[ey(Tp, zp)][ey(IQ, zT)](BV[ey(hQ, RG)](hU++));
      LM = this[ey(Zv, GW)][ey(Hv, Dj)](BV[ey(tB, gq)](hU++));
      ZJ = this[ey(Gu, nt)][ey(uR, qz)](BV[ey(Gm, Bq)](hU++));
      wc = this[ey(Sl, qm)][ey(Hv, Dj)](BV[ey(DF, yM)](hU++));
      Ed = ez << uM | LM >> gX;
      nu = (LM & Ua) << gX | ZJ >> uM;
      Cg = (ZJ & qm) << qq | wc;
      GN = GN + String[MV](Ed);

      if (ZJ != IM) {
        GN = GN + String[MV](nu);
      }

      if (wc != IM) {
        GN = GN + String[MV](Cg);
      }
    }

    GN = At[ey(rq, Gq)](GN);
    return GN;
  },
  _utf8_encode: function qn(BV) {
    BV = BV[ey(Yl, jf)](/\r\n/g, pg);
    var GN = ey(Bm, CP);

    for (var Ed = ZQ; Ed < BV[rj]; Ed++) {
      var nu = BV[wE](Ed);

      if (nu < 128) {
        GN += String[MV](nu);
      } else if (nu > 127 && nu < 2048) {
        GN += String[MV](nu >> qq | 192);
        GN += String[MV](nu & zT | 128);
      } else {
        GN += String[MV](nu >> uU | 224);
        GN += String[MV](nu >> qq & zT | 128);
        GN += String[MV](nu & zT | 128);
      }
    }

    return GN;
  },
  _utf8_decode: function rd(BV) {
    var GN = ey(Bm, HT);
    var Ed = ZQ;
    var nu = c1 = c2 = ZQ;

    while (Ed < BV[rj]) {
      nu = BV[wE](Ed);

      if (nu < 128) {
        GN += String[MV](nu);
        Ed++;
      } else if (nu > 191 && nu < 224) {
        c2 = BV[wE](Ed + Py);
        GN += String[MV]((nu & FQ) << qq | c2 & zT);
        Ed += uM;
      } else {
        c2 = BV[wE](Ed + Py);
        c3 = BV[wE](Ed + uM);
        GN += String[MV]((nu & Ua) << uU | (c2 & zT) << qq | c3 & zT);
        Ed += qm;
      }
    }

    return GN;
  }
};

function hI(BV) {
  this[ey(zu, vI)] = BV;
  this[ey(dk, nn)] = ey(jn, gq);
}

function ZS(BV) {
  this[ey(Ye, gq)] = BV;
  this[ey(dk, nn)] = ey(ke, NW);
}

var Mv = {
  W02: ey(yW, gq),
  W03: ey(XG, cP),
  W04: {},
  W5: ey(qj, CP),
  W6: ey(jm, vk),
  W7: ey(zZ, lL),
  W8: ey(gB, Py),
  W9: ey(jr, CE),
  W10: IL,
  W11: ey(MW, ju),
  W12: ey(RL, qq),
  W13: ey(TB, fb),
  W14: [],
  W15: []
};
var uH = {
  partner: ey(Bm, IM),
  app_name: ey(Bm, TR),
  t: ey(Bm, ZQ),
  id: ey(Bm, aY),
  v: ey(Bm, Ua),
  a: ey(Bm, nn),
  b: ey(Bm, aT),
  c: ey(Bm, gX),
  d: ey(Bm, qz),
  e: ey(Bm, aT),
  f: ey(Bm, Ja),
  idf: ey(Bm, yM),
  g: ey(Bm, Vl),
  h: ey(Bm, Qc)
};

var mL = function mL(Lu) {
  return function () {
    var UF = arguments[rj] > ZQ && arguments[ZQ] !== undefined ? arguments[ZQ] : {};
    return new Promise(function (gO) {
      if (UF[ey(pH, Qc)]) {
        Lu(function (BV) {
          gO(BV);
        });
      } else if (UF[ey(Eb, jf)]) {
        Lu[ey(jl, Uc)](IL, function () {
          setTimeout(function () {
            gO();
          }, aT);
        });
      } else {
        Lu(Object[ey(hl, Dj)]({}, UF, {
          success: gO,
          fail: gO
        }));
      }
    });
  };
};

var Jk = {
  _x64Add: function FY(BV, GN) {
    BV = [BV[ZQ] >>> RW, BV[ZQ] & 65535, BV[Py] >>> RW, BV[Py] & 65535];
    GN = [GN[ZQ] >>> RW, GN[ZQ] & 65535, GN[Py] >>> RW, GN[Py] & 65535];
    var Ed = [ZQ, ZQ, ZQ, ZQ];
    Ed[qm] += BV[qm] + GN[qm];
    Ed[uM] += Ed[qm] >>> RW;
    Ed[qm] &= 65535;
    Ed[uM] += BV[uM] + GN[uM];
    Ed[Py] += Ed[uM] >>> RW;
    Ed[uM] &= 65535;
    Ed[Py] += BV[Py] + GN[Py];
    Ed[ZQ] += Ed[Py] >>> RW;
    Ed[Py] &= 65535;
    Ed[ZQ] += BV[ZQ] + GN[ZQ];
    Ed[ZQ] &= 65535;
    return [Ed[ZQ] << RW | Ed[Py], Ed[uM] << RW | Ed[qm]];
  },
  _x64Multiply: function md(BV, GN) {
    BV = [BV[ZQ] >>> RW, BV[ZQ] & 65535, BV[Py] >>> RW, BV[Py] & 65535];
    GN = [GN[ZQ] >>> RW, GN[ZQ] & 65535, GN[Py] >>> RW, GN[Py] & 65535];
    var Ed = [ZQ, ZQ, ZQ, ZQ];
    Ed[qm] += BV[qm] * GN[qm];
    Ed[uM] += Ed[qm] >>> RW;
    Ed[qm] &= 65535;
    Ed[uM] += BV[uM] * GN[qm];
    Ed[Py] += Ed[uM] >>> RW;
    Ed[uM] &= 65535;
    Ed[uM] += BV[qm] * GN[uM];
    Ed[Py] += Ed[uM] >>> RW;
    Ed[uM] &= 65535;
    Ed[Py] += BV[Py] * GN[qm];
    Ed[ZQ] += Ed[Py] >>> RW;
    Ed[Py] &= 65535;
    Ed[Py] += BV[uM] * GN[uM];
    Ed[ZQ] += Ed[Py] >>> RW;
    Ed[Py] &= 65535;
    Ed[Py] += BV[qm] * GN[Py];
    Ed[ZQ] += Ed[Py] >>> RW;
    Ed[Py] &= 65535;
    Ed[ZQ] += BV[ZQ] * GN[qm] + BV[Py] * GN[uM] + BV[uM] * GN[Py] + BV[qm] * GN[ZQ];
    Ed[ZQ] &= 65535;
    return [Ed[ZQ] << RW | Ed[Py], Ed[uM] << RW | Ed[qm]];
  },
  _x64Rotl: function Ug(BV, GN) {
    GN %= IM;

    if (GN === Ej) {
      return [BV[Py], BV[ZQ]];
    } else if (GN < Ej) {
      return [BV[ZQ] << GN | BV[Py] >>> Ej - GN, BV[Py] << GN | BV[ZQ] >>> Ej - GN];
    } else {
      GN -= Ej;
      return [BV[Py] << GN | BV[ZQ] >>> Ej - GN, BV[ZQ] << GN | BV[Py] >>> Ej - GN];
    }
  },
  _x64LeftShift: function DB(BV, GN) {
    GN %= IM;

    if (GN === ZQ) {
      return BV;
    } else if (GN < Ej) {
      return [BV[ZQ] << GN | BV[Py] >>> Ej - GN, BV[Py] << GN];
    } else {
      return [BV[Py] << GN - Ej, ZQ];
    }
  },
  _x64Xor: function tD(BV, GN) {
    return [BV[ZQ] ^ GN[ZQ], BV[Py] ^ GN[Py]];
  },
  _x64Fmix: function lt(BV) {
    BV = this[ey(PB, Rv)](BV, [ZQ, BV[ZQ] >>> Py]);
    BV = this[ey(EE, gH)](BV, [4283543511, 3981806797]);
    BV = this[ey(Vb, Ej)](BV, [ZQ, BV[ZQ] >>> Py]);
    BV = this[ey(SV, Fu)](BV, [3301882366, 444984403]);
    BV = this[ey(AD, Qc)](BV, [ZQ, BV[ZQ] >>> Py]);
    return BV;
  },
  hash128: function TT(BV, GN) {
    BV = BV || ey(Bm, nn);
    GN = GN || ZQ;
    var Ed = BV[rj] % RW;
    var nu = BV[rj] - Ed;
    var Cg = [ZQ, GN];
    var ez = [ZQ, GN];
    var LM = [ZQ, ZQ];
    var ZJ = [ZQ, ZQ];
    var wc = [2277735313, 289559509];
    var hU = [1291169091, 658871167];

    for (var OL = ZQ; OL < nu; OL = OL + RW) {
      LM = [BV[wE](OL + gX) & 255 | (BV[wE](OL + NW) & 255) << aY | (BV[wE](OL + qq) & 255) << RW | (BV[wE](OL + Jr) & 255) << HT, BV[wE](OL) & 255 | (BV[wE](OL + Py) & 255) << aY | (BV[wE](OL + uM) & 255) << RW | (BV[wE](OL + qm) & 255) << HT];
      ZJ = [BV[wE](OL + uU) & 255 | (BV[wE](OL + GW) & 255) << aY | (BV[wE](OL + pF) & 255) << RW | (BV[wE](OL + Ua) & 255) << HT, BV[wE](OL + aY) & 255 | (BV[wE](OL + Da) & 255) << aY | (BV[wE](OL + FG) & 255) << RW | (BV[wE](OL + Bq) & 255) << HT];
      LM = this[ey(gI, Hw)](LM, wc);
      LM = this[ey(WO, yM)](LM, FQ);
      LM = this[ey(pu, Rf)](LM, hU);
      Cg = this[ey(Up, Rk)](Cg, LM);
      Cg = this[ey(lK, Hw)](Cg, fb);
      Cg = this[ey(bW, Ae)](Cg, ez);
      Cg = this[ey(Ap, CE)](this[ey(Tc, Kw)](Cg, [ZQ, NW]), [ZQ, 1390208809]);
      ZJ = this[ey(eR, Ej)](ZJ, hU);
      ZJ = this[ey(lK, Hw)](ZJ, nt);
      ZJ = this[ey(MN, yM)](ZJ, wc);
      ez = this[ey(ev, aY)](ez, ZJ);
      ez = this[ey(vB, Kw)](ez, FQ);
      ez = this[ey(Wm, vk)](ez, Cg);
      ez = this[ey(mm, qk)](this[ey(Xa, yq)](ez, [ZQ, NW]), [ZQ, 944331445]);
    }

    LM = [ZQ, ZQ];
    ZJ = [ZQ, ZQ];

    switch (Ed) {
      case Ua:
        ZJ = this[ey(pm, fb)](ZJ, this[ey(JM, eS)]([ZQ, BV[wE](OL + pF)], Ja));

      case pF:
        ZJ = this[ey(al, Pk)](ZJ, this[ey(aP, Uc)]([ZQ, BV[wE](OL + GW)], qT));

      case GW:
        ZJ = this[ey(qr, Kc)](ZJ, this[ey(jt, gL)]([ZQ, BV[wE](OL + uU)], Ej));

      case uU:
        ZJ = this[ey(PX, Ww)](ZJ, this[ey(LL, lG)]([ZQ, BV[wE](OL + Bq)], HT));

      case Bq:
        ZJ = this[ey(lb, HV)](ZJ, this[ey(fg, rm)]([ZQ, BV[wE](OL + FG)], RW));

      case FG:
        ZJ = this[ey(fe, RG)](ZJ, this[ey(nT, MX)]([ZQ, BV[wE](OL + Da)], aY));

      case Da:
        ZJ = this[ey(jC, Jr)](ZJ, [ZQ, BV[wE](OL + aY)]);
        ZJ = this[ey(gI, Hw)](ZJ, hU);
        ZJ = this[ey(tH, aT)](ZJ, nt);
        ZJ = this[ey(Vv, zT)](ZJ, wc);
        ez = this[ey(DO, vk)](ez, ZJ);

      case aY:
        LM = this[ey(Ok, CP)](LM, this[ey(nT, MX)]([ZQ, BV[wE](OL + Jr)], qk));

      case Jr:
        LM = this[ey(lb, HV)](LM, this[ey(aC, gq)]([ZQ, BV[wE](OL + qq)], Ja));

      case qq:
        LM = this[ey(Iq, MX)](LM, this[ey(up, IJ)]([ZQ, BV[wE](OL + NW)], qT));

      case NW:
        LM = this[ey(Ek, qT)](LM, this[ey(Kf, zT)]([ZQ, BV[wE](OL + gX)], Ej));

      case gX:
        LM = this[ey(fe, RG)](LM, this[ey(nT, MX)]([ZQ, BV[wE](OL + qm)], HT));

      case qm:
        LM = this[ey(RZ, Bq)](LM, this[ey(TM, uM)]([ZQ, BV[wE](OL + uM)], RW));

      case uM:
        LM = this[ey(tV, gL)](LM, this[ey(XI, Qc)]([ZQ, BV[wE](OL + Py)], aY));

      case Py:
        LM = this[ey(AD, Qc)](LM, [ZQ, BV[wE](OL)]);
        LM = this[ey(Nl, fb)](LM, wc);
        LM = this[ey(Qv, FG)](LM, FQ);
        LM = this[ey(gC, vI)](LM, hU);
        Cg = this[ey(kt, gH)](Cg, LM);
    }

    Cg = this[ey(Kn, aT)](Cg, [ZQ, BV[rj]]);
    ez = this[ey(af, Fj)](ez, [ZQ, BV[rj]]);
    Cg = this[ey(cf, vI)](Cg, ez);
    ez = this[ey(Sv, MX)](ez, Cg);
    Cg = this[ey(Jl, VX)](Cg);
    ez = this[ey(Zr, rm)](ez);
    Cg = this[ey(Oc, nn)](Cg, ez);
    ez = this[ey(Md, eS)](ez, Cg);
    return (ey(mJ, Ua) + (Cg[ZQ] >>> ZQ)[ey(pI, pF)](RW))[ey(km, Rf)](-aY) + (ey(qO, IJ) + (Cg[Py] >>> ZQ)[ey(VL, Vl)](RW))[ey(vL, DS)](-aY) + (ey(Tv, vQ) + (ez[ZQ] >>> ZQ)[ey(Lq, Ob)](RW))[ey(YG, qT)](-aY) + (ey(FF, Uc) + (ez[Py] >>> ZQ)[ey(dq, uU)](RW))[ey(uS, Fl)](-aY);
  }
};

function BF() {
  if (wx[ey(eb, yC)](ey(LZ, Gq))) {
    var BV = wx[ey(EX, YA)]();
    return mL(BV[ey(Rb, FG)])({
      filePath: wx[ey(aM, Ob)][ey(kr, gX)] + ey(lS, lf),
      encoding: ey(AV, FQ)
    })[ey(lA, Da)](function (BV) {
      if (jX(ey(Og, CE), BV[ey(dp, aY)])) {
        Mv[ey(Gk, Rj)] = BV[ey(MA, lf)];
      } else {
        Mv[ey(Pu, nO)] = ey(Hb, Kw);
      }
    });
  }

  return IL;
}

function be() {
  return mL(wx[ey(Xy, DN)])({
    key: ey(ZP, MX)
  })[ey(XP, Rk)](function (BV) {
    if (BV[ey(Hm, SL)]) {
      Mv[ey(YD, SL)] = BV[ey(Rr, qk)];
    } else {
      return BF();
    }

    return IL;
  });
}

function Dg() {
  return mL(wx[ey(FD, tt)])()[ey(hb, Fu)](function (BV) {
    if (jX(ey(Mk, pF), BV[ey(dp, aY)])) {
      Mv[ey(FX, Dj)] = JSON[ey(eG, qk)](BV[ey(tI, Rk)]);
    } else {
      Mv[ey(Ff, lf)][ey(Uh, uM)] = BV;
    }
  });
}

function Dh(CM) {
  return mL(wx[ey(TV, MX)])()[ey(fd, VX)](function (BV) {
    if (jX(ey(Cz, df), BV[ey(qB, US)])) {
      if (CM[ey(ct, tc)] !== ey(lD, qm)) {
        return Promise[ey(CG, Kc)]([mL(wx[ey(Yj, gX)])(), Dg()]);
      }

      return Dg();
    }

    Mv[ey(ec, qm)][ey(bm, Rv)] = BV;
    return IL;
  });
}

function Qp(CM) {
  return mL(wx[ey(LU, rm)])()[ey(zt, Gq)](function (BV) {
    if (jX(ey(TY, Bq), BV[ey(nf, WN)])) {
      Mv[ey(Yv, MU)] = BV[ey(Xc, qk)];

      if (BV[ey(yf, ju)] === ey(Xm, tc)) {
        return Dh(CM)[ey(It, rm)](function () {
          return wx[ey(EF, Da)]();
        })[ey(tA, Ja)](function () {
          return null;
        });
      }

      return IL;
    }

    Mv[ey(Cm, vQ)][ey(Dv, gH)] = BV;
    return IL;
  });
}

function wl() {
  return mL(wx[ey(MJ, cP)])()[ey(Vz, CP)](function (BV) {
    if (jX(ey(MJ, cP), BV[ey(jI, Kw)])) {
      Mv[ey(wF, gq)] = BV[ey(Of, Fl)];
    } else {
      Mv[ey(rG, Na)][ey(BZ, kJ)] = BV;
    }
  });
}

function hL() {
  if (wx[ey(tb, Rk)](ey(mR, nn))) {
    return mL(wx[ey(TU, Fl)])()[ey(hb, Fu)](function (BV) {
      if (jX(ey(yw, GW), BV[ey(XX, Fj)])) {
        Mv[ey(OX, gq)] = JSON[ey(br, CP)](BV[ey(hV, Qc)] === ZQ);
      } else {
        Mv[ey(uI, QU)][ey(FA, jf)] = BV;
      }
    });
  }

  return IL;
}

function Ly() {
  return mL(wx[ey(Wb, gq)])()[ey(UX, tt)](function (BV) {
    if (jX(ey(Zf, jf), BV[ey(QF, Pk)])) {
      Mv[ey(rk, eS)] = JSON[ey(uL, ZQ)](BV[ey(rB, Ua)]);
    } else {
      Mv[ey(EC, qT)][ey(fT, RW)] = BV;
    }
  });
}

function Jd() {
  return mL(wx[ey(CB, MU)])()[ey(IF, Rf)](function (BV) {
    if (jX(ey(Fm, qT), BV[ey(St, ZQ)])) {
      var GN = BV[ey(Qf, Kw)] && BV[ey(Hk, qq)][ey(yB, DS)]();
      Mv[ey(Iy, Na)] = GN ? Jk[ey(hm, SL)](GN) : ey(bz, yC);
    } else {
      Mv[ey(nX, zG)][ey(jH, kJ)] = BV;
    }
  });
}

function bw() {
  return mL(wx[ey(Zh, Uc)])()[ey(nG, US)](function (BV) {
    if (jX(ey(kW, HT), BV[ey(RM, tt)])) {
      Mv[ey(GR, NW)] = JSON[ey(Re, gq)](BV[ey(Vw, Jr)][ey(RB, Ob)](ZQ, NW));
    } else {
      Mv[ey(FL, yq)][ey(IO, Na)] = BV;
    }
  });
}

function AO(BV) {
  var GN = BV && BV[ey(IV, IM)] && BV[ey(qH, yq)][ey(Np, aT)]();

  if (GN === ey(DT, Pk) || GN === ey(kN, IJ)) {
    return mL(wx[ey(Ne, Na)])()[ey(Rm, GW)](function (BV) {
      if (jX(ey(yu, IM), BV[ey(jN, rm)])) {
        return bw()[ey(nG, US)](function () {
          return wx[ey(UY, jf)]();
        });
      }

      return IL;
    });
  }

  return IL;
}

function qZ(BV) {
  return mL(wx[ey(gR, qk)])({
    filePath: BV
  })[ey(ka, DS)](function (BV) {
    if (jX(ey(Hl, GW), BV[ey(PA, MU)])) {
      Mv[ey(pw, aY)] = BV[ey(Pp, vI)];
    } else {
      Mv[ey(Yg, US)][ey(zO, Ej)] = BV;
    }
  });
}

function XL(FI, UF) {
  return new Promise(function (BV) {
    wx[ey(Bp, NG)]({
      canvasId: FI,
      success: BV,
      fail: BV
    }, UF[ey(SY, ju)]);
  })[ey(QR, Bq)](function (BV) {
    if (jX(ey(eZ, Jr), BV[ey(Jt, gL)])) {
      return qZ(BV[ey(aU, NG)]);
    }

    Mv[ey(LA, qk)][ey(mu, Hw)] = BV;
    return IL;
  });
}

function eN(UF) {
  UF[ey(pB, DS)][ey(KK, NG)]({
    hideFMCanvas: IL
  });
  var Eg = wx[ey(VW, TR)](ey(kI, uU), UF[ey(zM, yq)]);
  var Ed = Eg[ey(Xr, MX)](ZQ, ZQ, 200, ZQ);
  Ed[ey(jU, yC)](ZQ, ey(JJ, tt));
  Ed[ey(KQ, uM)](Py, ey(UN, yq));
  Eg[ey(Kb, vQ)](Ed);
  Eg[ey(az, Fj)](FG, FG, eS, qT);
  Eg[ey(Tg, zT)](0.2);
  Eg[ey(MK, Na)](ey(DR, kJ));
  Eg[ey(cC, Rf)](SL, SL, eS, qT);
  Eg[ey(wD, qm)](ey(vj, Kc));
  Eg[ey(ef, HT)](aT, aT, eS, qT);
  Eg[ey(Nc, HT)](Py);
  Eg[ey(wD, qm)](ey(pX, pF));
  Eg[ey(SQ, eS)](FG);
  Eg[ey(EI, RW)](ey(DP, Da), Ua, MU);
  return new Promise(function (gO) {
    mL(Eg)({
      isCanvas: nr
    })[ey(an, qz)](function () {
      return XL(ey(wv, IM), UF);
    })[ey(Eu, HT)](function () {
      gO();
    });
    setTimeout(function () {
      gO();
    }, 1000);
  });
}

var SF = {
  _keyStr: ey(Ak, NW) + vw,
  encode: function tk(BV) {
    var GN = ey(Bm, vk);
    var Ed, nu, Cg, ez, LM, ZJ, wc;
    var hU = ZQ;

    while (hU < BV[rj]) {
      Ed = BV[wE](hU++);
      nu = BV[wE](hU++);
      Cg = BV[wE](hU++);
      ez = Ed >> uM;
      LM = (Ed & qm) << gX | nu >> gX;
      ZJ = (nu & Ua) << uM | Cg >> qq;
      wc = Cg & zT;

      if (isNaN(nu)) {
        ZJ = wc = IM;
      } else if (isNaN(Cg)) {
        wc = IM;
      }

      GN = GN + this[ey(KI, Ja)][ey(Ld, nO)](ez) + this[ey(gE, Uc)][ey(uB, Fl)](LM) + this[ey(MI, gL)][ey(Oz, Dj)](ZJ) + this[ey(Zv, GW)][ey(Pn, VX)](wc);
    }

    return GN;
  },
  decode: function PZ(BV) {
    var GN = ey(Bm, Ob);
    var Ed, nu, Cg;
    var ez, LM, ZJ, wc;
    var hU = ZQ;
    BV = BV[ey(Ue, qk)](/[^A-Za-z0-9\~\/\=]/g, ey(Bm, Ja));

    while (hU < BV[rj]) {
      ez = this[ey(nl, YA)][ey(KA, nn)](BV[ey(hf, vk)](hU++));
      LM = this[ey(ZC, lG)][ey(Cc, FG)](BV[ey(UH, qq)](hU++));
      ZJ = this[ey(WS, zG)][ey(Cc, FG)](BV[ey(pR, Na)](hU++));
      wc = this[ey(Rn, Dd)][ey(Yk, tc)](BV[ey(DZ, uM)](hU++));
      Ed = ez << uM | LM >> gX;
      nu = (LM & Ua) << gX | ZJ >> uM;
      Cg = (ZJ & qm) << qq | wc;
      GN = GN + String[MV](Ed);

      if (ZJ != IM) {
        GN = GN + String[MV](nu);
      }

      if (wc != IM) {
        GN = GN + String[MV](Cg);
      }
    }

    return GN;
  },
  _utf8_encode: function qn(BV) {
    BV = BV[ey(Ir, Da)](/\r\n/g, pg);
    var GN = ey(Bm, cP);

    for (var Ed = ZQ; Ed < BV[rj]; Ed++) {
      var nu = BV[wE](Ed);

      if (nu < 128) {
        GN += String[MV](nu);
      } else if (nu > 127 && nu < 2048) {
        GN += String[MV](nu >> qq | 192);
        GN += String[MV](nu & zT | 128);
      } else {
        GN += String[MV](nu >> uU | 224);
        GN += String[MV](nu >> qq & zT | 128);
        GN += String[MV](nu & zT | 128);
      }
    }

    return GN;
  },
  _utf8_decode: function rd(BV) {
    var GN = ey(Bm, qq);
    var Ed = ZQ;
    var nu = c1 = c2 = ZQ;

    while (Ed < BV[rj]) {
      nu = BV[wE](Ed);

      if (nu < 128) {
        GN += String[MV](nu);
        Ed++;
      } else if (nu > 191 && nu < 224) {
        c2 = BV[wE](Ed + Py);
        GN += String[MV]((nu & FQ) << qq | c2 & zT);
        Ed += uM;
      } else {
        c2 = BV[wE](Ed + Py);
        c3 = BV[wE](Ed + uM);
        GN += String[MV]((nu & Ua) << uU | (c2 & zT) << qq | c3 & zT);
        Ed += qm;
      }
    }

    return GN;
  }
};

function Yp(BV, GN) {
  function mZ(BV, GN, Ed, nu, Cg, ez) {
    if (Ed) {
      GN = unescape(encodeURIComponent(GN));
    }

    var LM = new Array(16843776, ZQ, 65536, 16843780, 16842756, 66564, gX, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, gX, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, ZQ, 1028, 66564, 16777216, 65536, 16843780, gX, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, gX, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, ZQ, 65540, 66560, ZQ, 16842756);
    var ZJ = new Array(-2146402272, -2147450880, 32768, 1081376, 1048576, Ej, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, Ej, -2146435040, 1081344, 1048608, -2147450848, ZQ, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, ZQ, 1081344, 32800, -2146402304, -2146435072, 32800, ZQ, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, Ej, -2146402272, 1081376, Ej, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, ZQ, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344);
    var wc = new Array(520, 134349312, ZQ, 134348808, 134218240, ZQ, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, aY, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, aY, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, ZQ, 512, 131080, 134349320, 134218240, 134217736, 512, ZQ, 134348808, 134218248, 131072, 134217728, 134349320, aY, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, aY, 134348808, 131584);
    var hU = new Array(8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, ZQ, 8396800, 8396800, 8396929, 129, ZQ, 8388736, 8388609, Py, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, Py, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, ZQ, ZQ, 8396800, 8320, 8388736, 8388737, Py, 8396801, 8321, 8321, 128, 8396929, 129, Py, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928);
    var OL = new Array(256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, ZQ, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, ZQ, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, ZQ, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, ZQ, 1074266112, 34078976, 1073742080);
    var yY = new Array(536870928, 541065216, 16384, 541081616, 541065216, RW, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, ZQ, 4194320, 536887312, 16384, 4210688, 536887312, RW, 541065232, 541065232, ZQ, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, RW, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, ZQ, 541065232, RW, 16384, 541065216, 4210704, 16384, 4194320, 536887312, ZQ, 541081600, 536870912, 4194320, 536887312);
    var kb = new Array(2097152, 69206018, 67110914, ZQ, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, ZQ, 67108866, uM, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, uM, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, uM, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, ZQ, uM, 69208066, ZQ, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154);
    var kc = new Array(268439616, 4096, 262144, 268701760, 268435456, 268439616, IM, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, IM, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, ZQ, ZQ, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, IM, 268697664, 4096, 266304, 268439552, IM, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, ZQ, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, ZQ, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696);
    var hz = EO(BV);
    var ny = ZQ;
    var QJ;
    var aD;
    var bl;
    var ur;
    var hh;
    var Zk;
    var MG;
    var NA;
    var fB;
    var tu;
    var kz;
    var VY;
    var nZ = void ZQ;
    var jS;
    var AX = GN[rj];
    var Yf = ZQ;
    var vy = hz[rj] == Ej ? qm : Da;

    if (vy == qm) {
      NA = Ed ? new Array(ZQ, Ej, uM) : new Array(aT, -uM, -uM);
    } else {
      NA = Ed ? new Array(ZQ, Ej, uM, lG, aT, -uM, IM, 96, uM) : new Array(Gq, lG, -uM, Ej, IM, uM, aT, -uM, -uM);
    }

    if (ez == uM) GN += ey(cD, HT);else if (ez == Py) {
      if (Ed) {
        bl = aY - AX % aY;
        GN += String[MV](bl, bl, bl, bl, bl, bl, bl, bl);
        if (bl === aY) AX += aY;
      }
    } else if (!ez) GN += qy;
    var lv = ey(Bm, IM);
    var lN = ey(Bm, nt);

    if (nu == Py) {
      fB = Cg[wE](ny++) << HT | Cg[wE](ny++) << RW | Cg[wE](ny++) << aY | Cg[wE](ny++);
      kz = Cg[wE](ny++) << HT | Cg[wE](ny++) << RW | Cg[wE](ny++) << aY | Cg[wE](ny++);
      ny = ZQ;
    }

    while (ny < AX) {
      Zk = GN[wE](ny++) << HT | GN[wE](ny++) << RW | GN[wE](ny++) << aY | GN[wE](ny++);
      MG = GN[wE](ny++) << HT | GN[wE](ny++) << RW | GN[wE](ny++) << aY | GN[wE](ny++);

      if (nu == Py) {
        if (Ed) {
          Zk ^= fB;
          MG ^= kz;
        } else {
          tu = fB;
          VY = kz;
          fB = Zk;
          kz = MG;
        }
      }

      bl = (Zk >>> gX ^ MG) & 252645135;
      MG ^= bl;
      Zk ^= bl << gX;
      bl = (Zk >>> RW ^ MG) & 65535;
      MG ^= bl;
      Zk ^= bl << RW;
      bl = (MG >>> uM ^ Zk) & 858993459;
      Zk ^= bl;
      MG ^= bl << uM;
      bl = (MG >>> aY ^ Zk) & 16711935;
      Zk ^= bl;
      MG ^= bl << aY;
      bl = (Zk >>> Py ^ MG) & 1431655765;
      MG ^= bl;
      Zk ^= bl << Py;
      Zk = Zk << Py | Zk >>> FQ;
      MG = MG << Py | MG >>> FQ;

      for (aD = ZQ; aD < vy; aD += qm) {
        nZ = NA[aD + Py];
        jS = NA[aD + uM];

        for (QJ = NA[aD]; QJ != nZ; QJ += jS) {
          ur = MG ^ hz[QJ];
          hh = (MG >>> gX | MG << nO) ^ hz[QJ + Py];
          bl = Zk;
          Zk = MG;
          MG = bl ^ (ZJ[ur >>> HT & zT] | hU[ur >>> RW & zT] | yY[ur >>> aY & zT] | kc[ur & zT] | LM[hh >>> HT & zT] | wc[hh >>> RW & zT] | OL[hh >>> aY & zT] | kb[hh & zT]);
        }

        bl = Zk;
        Zk = MG;
        MG = bl;
      }

      Zk = Zk >>> Py | Zk << FQ;
      MG = MG >>> Py | MG << FQ;
      bl = (Zk >>> Py ^ MG) & 1431655765;
      MG ^= bl;
      Zk ^= bl << Py;
      bl = (MG >>> aY ^ Zk) & 16711935;
      Zk ^= bl;
      MG ^= bl << aY;
      bl = (MG >>> uM ^ Zk) & 858993459;
      Zk ^= bl;
      MG ^= bl << uM;
      bl = (Zk >>> RW ^ MG) & 65535;
      MG ^= bl;
      Zk ^= bl << RW;
      bl = (Zk >>> gX ^ MG) & 252645135;
      MG ^= bl;
      Zk ^= bl << gX;

      if (nu == Py) {
        if (Ed) {
          fB = Zk;
          kz = MG;
        } else {
          Zk ^= tu;
          MG ^= VY;
        }
      }

      lN += String[MV](Zk >>> HT, Zk >>> RW & 255, Zk >>> aY & 255, Zk & 255, MG >>> HT, MG >>> RW & 255, MG >>> aY & 255, MG & 255);
      Yf += aY;

      if (Yf == 512) {
        lv += lN;
        lN = ey(Bm, eS);
        Yf = ZQ;
      }
    }

    lv += lN;
    lv = lv[ey(je, DS)](/\0*$/g, ey(Bm, Pk));

    if (!Ed) {
      if (ez === Py) {
        var AX = lv[rj];
        var yT = ZQ;
        AX && (yT = lv[wE](AX - Py));
        yT <= aY && (lv = lv[ey(Kr, nn)](ZQ, AX - yT));
      }

      lv = decodeURIComponent(escape(lv));
    }

    return lv;
  }

  function EO(BV) {
    var GN = new Array(ZQ, gX, 536870912, 536870912, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964);
    var Ed = new Array(ZQ, Py, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697);
    var nu = new Array(ZQ, aY, 2048, 2056, 16777216, 16777224, 16779264, 16779272, ZQ, aY, 2048, 2056, 16777216, 16777224, 16779264, 16779272);
    var Cg = new Array(ZQ, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144);
    var ez = new Array(ZQ, 262144, RW, 262160, ZQ, 262144, RW, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256);
    var LM = new Array(ZQ, 1024, Ej, 1056, ZQ, 1024, Ej, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488);
    var ZJ = new Array(ZQ, 268435456, 524288, 268959744, uM, 268435458, 524290, 268959746, ZQ, 268435456, 524288, 268959744, uM, 268435458, 524290, 268959746);
    var wc = new Array(ZQ, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568);
    var hU = new Array(ZQ, 262144, ZQ, 262144, uM, 262146, uM, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578);
    var OL = new Array(ZQ, 268435456, aY, 268435464, ZQ, 268435456, aY, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488);
    var yY = new Array(ZQ, Ej, ZQ, Ej, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800);
    var kb = new Array(ZQ, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744);
    var kc = new Array(ZQ, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, RW, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128);
    var hz = new Array(ZQ, gX, 256, 260, ZQ, gX, 256, 260, Py, NW, 257, 261, Py, NW, 257, 261);
    var ny = BV[rj] > aY ? qm : Py;
    var QJ = new Array(Ej * ny);
    var aD = new Array(ZQ, ZQ, Py, Py, Py, Py, Py, Py, ZQ, Py, Py, Py, Py, Py, Py, ZQ);
    var bl;
    var ur;
    var hh = ZQ;
    var Zk = ZQ;
    var MG;

    for (var NA = ZQ; NA < ny; NA++) {
      var fB = BV[wE](hh++) << HT | BV[wE](hh++) << RW | BV[wE](hh++) << aY | BV[wE](hh++);
      var tu = BV[wE](hh++) << HT | BV[wE](hh++) << RW | BV[wE](hh++) << aY | BV[wE](hh++);
      MG = (fB >>> gX ^ tu) & 252645135;
      tu ^= MG;
      fB ^= MG << gX;
      MG = (tu >>> -RW ^ fB) & 65535;
      fB ^= MG;
      tu ^= MG << -RW;
      MG = (fB >>> uM ^ tu) & 858993459;
      tu ^= MG;
      fB ^= MG << uM;
      MG = (tu >>> -RW ^ fB) & 65535;
      fB ^= MG;
      tu ^= MG << -RW;
      MG = (fB >>> Py ^ tu) & 1431655765;
      tu ^= MG;
      fB ^= MG << Py;
      MG = (tu >>> aY ^ fB) & 16711935;
      fB ^= MG;
      tu ^= MG << aY;
      MG = (fB >>> Py ^ tu) & 1431655765;
      tu ^= MG;
      fB ^= MG << Py;
      MG = fB << aY | tu >>> SL & 240;
      fB = tu << HT | tu << aY & 16711680 | tu >>> aY & 65280 | tu >>> HT & 240;
      tu = MG;

      for (var kz = ZQ; kz < aD[rj]; kz++) {
        if (aD[kz]) {
          fB = fB << uM | fB >>> RG;
          tu = tu << uM | tu >>> RG;
        } else {
          fB = fB << Py | fB >>> fb;
          tu = tu << Py | tu >>> fb;
        }

        fB &= -Ua;
        tu &= -Ua;
        bl = GN[fB >>> nO] | Ed[fB >>> HT & Ua] | nu[fB >>> SL & Ua] | Cg[fB >>> RW & Ua] | ez[fB >>> uU & Ua] | LM[fB >>> aY & Ua] | ZJ[fB >>> gX & Ua];
        ur = wc[tu >>> nO] | hU[tu >>> HT & Ua] | OL[tu >>> SL & Ua] | yY[tu >>> RW & Ua] | kb[tu >>> uU & Ua] | kc[tu >>> aY & Ua] | hz[tu >>> gX & Ua];
        MG = (ur >>> RW ^ bl) & 65535;
        QJ[Zk++] = bl ^ MG;
        QJ[Zk++] = ur ^ MG << RW;
      }
    }

    return QJ;
  }

  function yZ(BV, GN, Ed) {
    return {
      key: OV(BV[ey(KR, Kw)](GN, Ed)),
      vector: Py
    };
  }

  function OV(BV) {
    for (var GN = BV[rj]; GN < HT; GN++) {
      BV += ey(zZ, Vp);
    }

    return BV;
  }

  var vX = ey(YJ, IM);

  function NN(BV, GN) {
    var Ed = yZ(GN, ZQ, HT);
    return SF[ey(Pq, Rj)](mZ(Ed[ey(Sq, Pk)], BV, Py, Py, vX, ZQ));
  }

  return NN(BV, GN);
}

var tY = void ZQ;

function Vg(BV, GN) {
  return Yp(BV, GN);
}

var Sd = {
  t: function JK(BV) {
    return Vg(BV, tY);
  },
  id: function FO(BV) {
    return Vg(BV, tY);
  },
  b: function JD(BV) {
    return Vg(BV, tY);
  },
  c: function bc(BV) {
    return Vg(BV, tY);
  },
  d: function NR(BV) {
    return Vg(BV, tY);
  },
  e: function pC(BV) {
    return Vg(BV, tY);
  },
  f: function MQ(BV) {
    return Vg(BV, tY);
  },
  g: function tp(BV) {
    return Jk[ey(Qe, gq)](BV);
  },
  h: function EN(BV) {
    return Jk[ey(Qj, Fu)](tY + BV);
  },
  idf: function JP() {
    return tY;
  }
};

function TF() {
  tY = new Date()[ey(fY, Kw)]() + ey(Ew, aT) + parseInt((Math[ey(Hp, gq)]() + Py) * 1000000, FG);
  tY = eh(tY);
}

var VF = (typeof Symbol === "undefined" ? "undefined" : _typeof(Symbol)) === ey(mB, Ej) && _typeof(Symbol[ey(BN, Kw)]) === ey(Lt, gq) ? function (BV) {
  return _typeof(BV);
} : function (BV) {
  return BV && (typeof Symbol === "undefined" ? "undefined" : _typeof(Symbol)) === ey(jb, vQ) && BV[ey(Wd, gq)] === Symbol && BV !== Symbol[ey(LN, Gq)] ? ey(Ur, HV) : _typeof(BV);
};

function Ic(BV, GN, Rg, vJ) {
  Object[ey(bd, FG)](BV, GN, {
    enumerable: nr,
    configurable: IL,
    get: function cu() {
      return _typeof(vJ) === ey(ZR, NW) ? vJ(Rg) : vJ;
    },
    set: function VV(BV) {
      if (Rg === BV) return;
      Rg = BV;
    }
  });
}

function KF(Vr, QQ) {
  if (!Vr || (_typeof(Vr) === ey(vn, Ww) ? ey(JT, HV) : VF(Vr)) !== ey(Xb, Rj)) {
    return;
  }

  Object[ey(Tq, GW)](Vr)[ey(vt, Jr)](function (BV) {
    if (QQ[BV]) {
      Ic(Vr, BV, Vr[BV], QQ[BV]);
    }
  });
}

function jq(BV) {
  this[ey(fD, vI)] = ey(ha, Bq);
  this[ey(hA, gq)] = nr;
  this[ey(Oq, Dd)] = ey(HQ, fb);

  if (BV) {
    if (BV[ey(pP, gq)]) {
      this[ey(uW, MU)] = BV[ey(uf, jf)];
    } else if (BV[ey(RS, jf)] === ey(bj, Ww)) {
      this[ey(YW, cP)] = ey(Va, Kw);
    } else if (BV && BV[ey(tq, NG)] === ey(BI, lL)) {
      this[ey(Mm, HT)] = ey(Pb, rm);
    }
  }

  this[ey(Bw, fb)] = IL;
  this[ey(ZK, Qw)] = ZQ;

  if (BV && BV[ey(SO, CE)] && BV[ey(aB, NW)]) {
    this[ey(rr, FQ)] = BV[ey(kO, IJ)];
    this[ey(uD, Kw)] = BV[ey(re, vI)];
  } else {
    throw new hI(ey(JY, pF));
  }

  console[ey(BH, zp)](ey(Zm, Rf));
}

jq[ey(ty, FQ)][ey(hY, Qc)] = function pj(UF) {
  var wy = this;

  if (!wy[ey(tr, Rj)]) {
    console[ey(aN, gH)](ey(BX, TR));
    return undefined;
  }

  wy[ey(cQ, CE)]();

  if (UF[ey(LG, vk)] && UF[ey(qe, fb)][ey(mw, nn)] && UF[ey(uV, tt)][ey(Mq, QU)][ey(Th, eS)]) {
    wy[ey(uT, IM)] = nr;
    UF[ey(Mp, gq)] && UF[ey(cp, NG)](UF[ey(FW, Da)][ey(In, tc)][ey(jz, CE)]);
    UF[ey(Nn, yC)] && UF[ey(uk, gq)](UF[ey(qe, fb)][ey(LT, Wr)][ey(Xk, gq)]);
    return UF[ey(cU, Hw)][ey(tK, qm)][ey(SS, HT)];
  }

  var Ed = wx[ey(GM, zT)](ey(Nk, QU));

  if (Ed) {
    var nu = Ed[ey(da, uU)](ey(ne, Rf));

    if (nu[rj] === uM) {
      var Cg = nu[ZQ];
      var ez = new Date()[ey(Af, rm)]();

      if (Cg && Cg[rj] === GW && ez - Cg < HT * HV * HV * 1000) {
        wy[ey(pt, Rf)] = nr;
        UF[ey(bN, zp)] && UF[ey(Hd, Wr)](nu[Py]);
        UF[ey(Hq, Qw)] && UF[ey(ZO, Ww)](nu[Py]);
        return Ed;
      }
    }
  }

  if (!UF[ey(pE, uU)]) {
    wy[ey(AM, FG)] = nr;
    console[ey(XU, lG)](ey(bM, Dj));
    var LM = new hI(ey(JA, RW));
    UF[ey(pQ, Rj)] && UF[ey(Eq, RG)](LM);
    UF[ey(cX, Rf)] && UF[ey(vH, MU)](LM);
    return ey(Bm, Wr);
  }

  if (!(UF[ey(Dc, Bq)] || UF[ey(Wn, DN)])) {
    console[ey(Tr, RG)](ey(KW, Fj));
  }

  if (UF[ey(RN, uM)] && Number[ey(Kp, gL)](UF[ey(QN, gX)])) {
    wy[ey(EH, MX)] = nr;
    console[ey(YM, HV)](ey(ay, pF));
    var ZJ = new hI(ey(TQ, gL));
    UF[ey(vK, Py)] && UF[ey(JC, uM)](ZJ);
    UF[ey(ul, aT)] && UF[ey(OE, Fl)](ZJ);
    return IL;
  }

  Mv[ey(WQ, vQ)] = new Date()[ey(CD, SL)]();
  var wc = void ZQ;

  try {
    wc = wx[ey(Wh, VX)]();
  } catch (LM) {
    wy[ey(XD, Ww)] = nr;
    console[ey(Ql, tt)](ey(lI, qm) + LM);
    UF[ey(fc, kJ)] && UF[ey(qI, Dj)](LM);
    UF[ey(eF, zT)] && UF[ey(SI, tt)](LM);
    return IL;
  }

  if (wc[ey(kD, Uc)] && nk(wc[ey(LH, yq)], ey(Ie, DS)) < ZQ) {
    wy[ey(Aa, eS)] = nr;
    console[ey(YS, Fl)](ey(yJ, Rk));
    var hU = new hI(ey(gG, Hw));
    UF[ey(gr, WN)] && UF[ey(aa, Bq)](hU);
    UF[ey(uw, VX)] && UF[ey(pA, CP)](hU);
    return IL;
  }

  delete wc[ey(tU, Fu)];
  Mv[ey(nV, ZQ)] = JSON[ey(de, eS)](wc);
  wx[ey(Ut, vI)](function (BV) {
    if (BV[ey(gd, gq)][rj]) {
      BV[ey(Gf, WN)][ey(gz, Ej)](function (BV) {
        delete BV[ey(Xg, qT)];
      });
      var GN = JSON[ey(Jp, Qc)](BV[ey(OK, FQ)][ey(hX, ju)](mM)[ey(RB, Ob)](ZQ, NW));
      Mv[ey(ET, Rk)] = GN;
    }
  });
  wx[ey(YT, gq)]({
    success: function fP() {
      wx[ey(Dw, ZQ)](function (BV) {
        for (var GN in BV) {
          if (BV[ey(Ze, uM)](GN) && _typeof(BV[GN]) === ey(Kk, lL)) {
            BV[GN] = Number(BV[GN][ey(HY, Rv)](uM));
          }
        }

        Mv[ey(wB, Ej)][ey(Rl, WN)](BV);
      });
    },
    fail: function hZ(BV) {
      Mv[ey(yK, TR)][ey(cr, Na)] = BV;
    }
  });
  wx[ey(wL, Qw)]({
    success: function fP() {
      wx[ey(Or, CP)](function (BV) {
        for (var GN in BV) {
          if (BV[ey(du, Ae)](GN) && _typeof(BV[GN]) === ey(Ke, nO)) {
            BV[GN] = Number(BV[GN][ey(Kv, IJ)](uM));
          }
        }

        Mv[ey(JH, Ja)][ey(KP, Qw)](BV);
      });
    },
    fail: function hZ(BV) {
      Mv[ey(wj, CP)][ey(Jf, yq)] = BV;
    }
  });
  Promise[ey(tR, rm)]([be(), Qp(wc), wl(), hL(), Ly(), Jd(), AO(wc), eN(UF)])[ey(IF, Rf)](function () {
    if (wy[ey(CJ, uM)]) {
      return;
    }

    wy[ey(bB, qz)](UF, IL);
  }, function () {
    console[ey(ug, vI)](ey(mz, Pk));
    var BV = new ZS(ey(vM, tt));
    UF[ey(Pd, VX)] && UF[ey(Tf, IM)](BV);
    UF[ey(mO, NW)] && UF[ey(CY, YA)](BV);
  });
  setTimeout(function () {
    if (wy[ey(TI, Na)]) {
      return;
    }

    wy[ey(kl, qz)] = nr;
    wy[ey(DY, DS)](UF, nr);
  }, UF[ey(LO, eS)] || 1500);
  return undefined;
};

KF(uH, Sd);

jq[ey(Am, TR)][ey(FN, MU)] = function kP(BV, UF) {
  var wy = this;
  wx[ey(yS, gL)]({
    url: wy[ey(Ip, Qw)] + ey(bX, Ae) + wy[ey(eu, nn)],
    method: ey(RH, HT),
    data: BV,
    header: {
      'content-type': ey(Cy, tc)
    },
    success: function fP(BV) {
      if (BV[ey(zm, Ww)] === 200) {
        if (ey(IG, Qc) in BV[ey(cO, kJ)]) {
          wy[ey(GQ, NG)] = 255;
          var GN = BV[ey(Mq, QU)][ey(ZV, Qw)][ey(fZ, GW)](ey(SP, ZQ));
          var Ed = GN[ZQ];
          var nu = GN[Py];
          wx[ey(Iv, tc)]({
            key: ey(dl, Vl),
            data: Ed
          });

          if (wx[ey(WT, Wr)](ey(lm, Rv))) {
            var Cg = wx[ey(Uy, kJ)]();
            Cg[ey(Bl, Rf)]({
              filePath: wx[ey(ye, fb)][ey(cJ, aT)] + ey(rc, nt),
              encoding: ey(Al, Kw),
              data: Ed
            });
          }

          var ez = {
            os: ey(nc, Pk),
            t: nu,
            v: wy[ey(cI, IM)],
            partner: wy[ey(Dp, Ua)]
          };
          var LM = At[ey(rP, Kw)](JSON[ey(VN, Dj)](ez));

          if (UF[ey(gv, aT)] && UF[ey(OW, WN)][ey(gN, df)]) {
            UF[ey(nm, Rj)][ey(ep, QU)]({
              fmBlackbox: LM
            });
          }

          var ZJ = new Date()[ey(bk, Bq)]();
          wx[ey(Zp, Hw)]({
            key: ey(YX, aY),
            data: ZJ + ey(bP, tt) + LM
          });

          if (wy[ey(ld, Vl)]) {
            return;
          }

          wy[ey(XD, Ww)] = nr;
          UF[ey(vN, aY)] && UF[ey(kY, lG)](LM);
          UF[ey(jD, Pk)] && UF[ey(HI, Bq)](LM);
        } else {
          wy[ey(Dt, Qc)] = 301;

          if (wy[ey(cM, yC)]) {
            return;
          }

          wy[ey(Xh, Bq)] = nr;
          var wc = wy[ey(Sm, zT)](UF, nr);
          UF[ey(GB, MX)] && UF[ey(pp, gL)](wc);
          UF[ey(nQ, Ob)] && UF[ey(bL, RG)](wc);
        }
      } else {
        wy[ey(OB, Ej)] = 302;

        if (wy[ey(Ra, tt)]) {
          return;
        }

        wy[ey(TI, Na)] = nr;
        var hU = wy[ey(CO, HT)](UF, nr);
        UF[ey(HW, fb)] && UF[ey(Gj, ju)](hU);
        UF[ey(OE, Fl)] && UF[ey(uk, gq)](hU);
      }
    },
    fail: function hZ() {
      wy[ey(cR, GW)] = 303;

      if (wy[ey(GL, ZQ)]) {
        return;
      }

      wy[ey(Mc, Hw)] = nr;
      var BV = wy[ey(UG, ZQ)](UF, nr);
      UF[ey(GZ, ZQ)] && UF[ey(YY, NW)](BV);
      UF[ey(HC, Kc)] && UF[ey(ul, aT)](BV);
    },
    complete: function PC() {}
  });
};

function ey(gK, gF) {
  var hR = Bm;

  for (var IR = ZQ; IR < gK[rj]; IR++) {
    hR += String[MV](((gK[wE](IR) - Ej ^ FQ & IR) + 95 - gF) % 95 + aT);
  }

  return hR;
}

jq[ey(mQ, Rk)][ey(Je, Vp)] = function hw(BV, GN) {
  var Ed = this;

  if (!Ed[ey(Vf, TR)]) {
    Ed[ey(Lh, Dd)] = nr;
    Mv[ey(Ym, Rj)] = new Date()[ey(mr, MU)]();
    BV[ey(JE, Ja)][ey(dQ, kJ)]({
      hideFMCanvas: nr
    });
    wx[ey(Oe, lf)]();
    wx[ey(CF, HT)]();
  }

  if (GN) {
    Ed[ey(Ng, aY)] = 300;
  } else {
    Ed[ey(Ea, Ae)] = 200;
  }

  var nu = Ed[ey(bH, Ob)](BV, GN);

  if (GN) {
    BV[ey(pz, US)] && BV[ey(Gw, zT)](nu);
    BV[ey(yX, vI)] && BV[ey(qW, Qc)](nu);
  }

  if (!GN) {
    Ed[ey(ea, HV)] = 201;
    Ed[ey(zb, FQ)](uH, BV);
  }
};

jq[ey(at, DS)][ey(QB, lG)] = function CH(BV, GN) {
  var Ed = this;
  var nu = ey(YV, rm);
  var Cg = ey(Nu, kJ);
  var ez = ey(jm, vk);

  if (BV[ey(un, aT)] && _typeof(BV[ey(WH, YA)]) === ey(Dr, US)) {
    Cg = BV[ey(OY, lG)] === ey(mn, yq) ? ey(Pa, Gq) : BV[ey(DI, Rj)];
  }

  if (BV[ey(pr, tc)] && _typeof(BV[ey(AL, QU)]) === ey(Ce, Ua)) {
    ez = BV[ey(jT, Jr)] === ey(DE, qk) ? ey(Ew, aT) : BV[ey(aj, Vp)];
  }

  TF();
  var LM = JSON[ey(KC, HV)](Mv[ey(FH, Dj)][ey(XY, tt)](-NW, Mv[ey(WA, Dd)][rj]));
  var ZJ = JSON[ey(jA, fb)](Mv[ey(te, FQ)][ey(YG, qT)](-NW, Mv[ey(Uf, QU)][rj]));
  uH[ey(qg, qk)] = Ed[ey(Bv, qm)];
  uH[ey(GI, Wr)] = Ed[ey(fh, zG)];
  uH[ey(fj, qT)] = Mv[ey(qf, VX)] + nu + Mv[ey(Nm, FG)] + nu + JSON[ey(gT, Qw)](Mv[ey(We, aY)]);
  uH[ey(zU, RG)] = Cg + nu + ez;
  uH[ey(Ew, yq)] = Ed[ey(YN, kJ)];
  uH[ey(FJ, QU)] = Mv[ey(hE, FQ)];
  uH[ey(jc, Qw)] = Mv[ey(ry, ju)] + nu + Mv[ey(gV, CP)] + nu + Mv[ey(bK, Rf)] + nu + Mv[ey(dE, vk)] + nu + Mv[ey(uu, nn)];
  uH[ey(MW, Fj)] = Mv[ey(LK, WN)] + nu + Mv[ey(PR, vQ)] + nu + Mv[ey(EK, qq)];
  uH[ey(JO, DN)] = LM + nu + ZJ;
  uH[ey(rw, Ja)] = Mv[ey(He, Kw)];
  uH[ey(DQ, MU)] = Mv[ey(bh, DS)];
  uH[ey(mF, CP)] = uH[ey(Pa, VX)] + nu + uH[ey(wJ, zG)] + nu + uH[ey(bz, qm)] + nu + uH[ey(JV, pF)] + nu + uH[ey(ZD, eS)];
  uH[ey(HX, IJ)] = nu + uH[ey(MW, qT)] + nu + uH[ey(Ch, Ob)] + nu + uH[ey(Gc, eS)];

  if (GN) {
    var wc = At[ey(ad, gq)](JSON[ey(XA, vQ)]({
      os: ey(HU, Wr),
      b: uH,
      v: Ed[ey(KB, RW)],
      partner: Ed[ey(lW, zT)],
      status: Ed[ey(Zw, qk)]
    }));
    return wc;
  }

  return uH;
};

jq[ey(GK, Ej)][ey(HK, Rk)] = function UB() {
  this[ey(qY, qT)] = IL;
  this[ey(CV, cP)] = ZQ;
  this[ey(jR, tc)] = IL;
};

var _default = jq;
exports.default = _default;

/***/ }),

/***/ 14:
/*!******************************************************!*\
  !*** ./node_modules/uni-request/src/helpers/util.js ***!
  \******************************************************/
/*! exports provided: bind, extend, copyobj, merge, deepMerge, isEmptyObject, combineURLs, buildURL, isAbsoluteURL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bind", function() { return bind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyobj", function() { return copyobj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepMerge", function() { return deepMerge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyObject", function() { return isEmptyObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineURLs", function() { return combineURLs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildURL", function() { return buildURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAbsoluteURL", function() { return isAbsoluteURL; });
const bind = function(fn,thisArg){
    return function warp(){
       return fn.apply(thisArg , Array.from(arguments) )
    }
}

const extend = function (a,b, thisArg) {
    let o = Object.getOwnPropertyNames( b );
    o.forEach(attr => {
        if(thisArg && typeof b[attr] === "function" ){
            a[attr] = bind( b[attr] , thisArg )
        }else{
            a[attr] = b[attr];
        }
    });
    return a;
}

const copyobj = function( a, b ){
    return Object.assign( {} , a ,b );
}


const merge = function(){
    var result = {};
    Array.from(arguments).forEach( e =>{
        for(let key in e){
            if( typeof e[key] === 'object' && !isEmptyObject(e[key]) && key!="data"){
                merge( result[key] , e[key] )
            }
            result[key] = e[key]
        }
    });
    return result;
}



const deepMerge = function () {
    let result = {};
    Array.from(arguments).forEach(e =>{
        if( e && typeof e === 'object' && !isEmptyObject(e) ) {
            Object.keys(e).forEach( key => {
                if( typeof e[key] === 'object' && key!='data'){
                    return result[key] = deepMerge( result[key] , e[key] )
                }
                result[key] = e[key]
            });
        }
    })
    return result ;
}


const isEmptyObject = function(obj){
    return Object.getOwnPropertyNames(obj).length === 0
}



const combineURLs = function (baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
};



function encode(val) {
    return encodeURIComponent(val).
        replace(/%40/gi, '@').
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, '+').
        replace(/%5B/gi, '[').
        replace(/%5D/gi, ']');
}
const buildURL = function ( url , paramsObject ){
	console.log(paramsObject)
    if( !paramsObject || isEmptyObject(paramsObject) ) return url;
    let parts = [];
    Object.keys( paramsObject ).forEach(key =>{
        parts.push( encode(key) + '=' + encode( paramsObject[key] ) );
    });
    return url += ( url.indexOf('?') === -1 ? '?' : '&' ) + parts.join('&');
}


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

const isAbsoluteURL =  function (url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),

/***/ 1421:
/*!*********************************************!*\
  !*** ./src/components/uni-calendar/util.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _calendar = _interopRequireDefault(__webpack_require__(/*! ./calendar.js */ 1422));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calendar = /*#__PURE__*/function () {
  function Calendar() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        date = _ref.date,
        selected = _ref.selected,
        startDate = _ref.startDate,
        endDate = _ref.endDate,
        range = _ref.range;

    _classCallCheck(this, Calendar);

    // 当前日期
    this.date = this.getDate(new Date()); // 当前初入日期
    // 打点信息

    this.selected = selected || []; // 范围开始

    this.startDate = startDate; // 范围结束

    this.endDate = endDate;
    this.range = range; // 多选状态

    this.cleanMultipleStatus(); // 每周日期

    this.weeks = {}; // this._getWeek(this.date.fullDate)
  }
  /**
   * 设置日期
   * @param {Object} date
   */


  _createClass(Calendar, [{
    key: "setDate",
    value: function setDate(date) {
      this.selectDate = this.getDate(date);

      this._getWeek(this.selectDate.fullDate);
    }
    /**
     * 清理多选状态
     */

  }, {
    key: "cleanMultipleStatus",
    value: function cleanMultipleStatus() {
      this.multipleStatus = {
        before: '',
        after: '',
        data: []
      };
    }
    /**
     * 重置开始日期
     */

  }, {
    key: "resetSatrtDate",
    value: function resetSatrtDate(startDate) {
      // 范围开始
      this.startDate = startDate;
    }
    /**
     * 重置结束日期
     */

  }, {
    key: "resetEndDate",
    value: function resetEndDate(endDate) {
      // 范围结束
      this.endDate = endDate;
    }
    /**
     * 获取任意时间
     */

  }, {
    key: "getDate",
    value: function getDate(date) {
      var AddDayCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var str = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';

      if (!date) {
        date = new Date();
      }

      if (_typeof(date) !== 'object') {
        date = date.replace(/-/g, '/');
      }

      var dd = new Date(date);

      switch (str) {
        case 'day':
          dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

          break;

        case 'month':
          if (dd.getDate() === 31) {
            dd.setDate(dd.getDate() + AddDayCount);
          } else {
            dd.setMonth(dd.getMonth() + AddDayCount); // 获取AddDayCount天后的日期
          }

          break;

        case 'year':
          dd.setFullYear(dd.getFullYear() + AddDayCount); // 获取AddDayCount天后的日期

          break;
      }

      var y = dd.getFullYear();
      var m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0

      var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0

      return {
        fullDate: y + '-' + m + '-' + d,
        year: y,
        month: m,
        date: d,
        day: dd.getDay()
      };
    }
    /**
     * 获取上月剩余天数
     */

  }, {
    key: "_getLastMonthDays",
    value: function _getLastMonthDays(firstDay, full) {
      var dateArr = [];

      for (var i = firstDay; i > 0; i--) {
        var beforeDate = new Date(full.year, full.month - 1, -i + 1).getDate();
        dateArr.push({
          date: beforeDate,
          month: full.month - 1,
          lunar: this.getlunar(full.year, full.month - 1, beforeDate),
          disable: true
        });
      }

      return dateArr;
    }
    /**
     * 获取本月天数
     */

  }, {
    key: "_currentMonthDys",
    value: function _currentMonthDys(dateData, full) {
      var _this = this;

      var dateArr = [];
      var fullDate = this.date.fullDate;

      var _loop = function _loop(i) {
        var isinfo = false;
        var nowDate = full.year + '-' + (full.month < 10 ? full.month : full.month) + '-' + (i < 10 ? '0' + i : i); // 是否今天

        var isDay = fullDate === nowDate; // 获取打点信息

        var info = _this.selected && _this.selected.find(function (item) {
          if (_this.dateEqual(nowDate, item.date)) {
            return item;
          }
        }); // 日期禁用


        var disableBefore = true;
        var disableAfter = true;

        if (_this.startDate) {
          var dateCompBefore = _this.dateCompare(_this.startDate, fullDate);

          disableBefore = _this.dateCompare(dateCompBefore ? _this.startDate : fullDate, nowDate);
        }

        if (_this.endDate) {
          var dateCompAfter = _this.dateCompare(fullDate, _this.endDate);

          disableAfter = _this.dateCompare(nowDate, dateCompAfter ? _this.endDate : fullDate);
        }

        var multiples = _this.multipleStatus.data;
        var checked = false;
        var multiplesStatus = -1;

        if (_this.range) {
          if (multiples) {
            multiplesStatus = multiples.findIndex(function (item) {
              return _this.dateEqual(item, nowDate);
            });
          }

          if (multiplesStatus !== -1) {
            checked = true;
          }
        }

        var data = {
          fullDate: nowDate,
          year: full.year,
          date: i,
          multiple: _this.range ? checked : false,
          beforeMultiple: _this.dateEqual(_this.multipleStatus.before, nowDate),
          afterMultiple: _this.dateEqual(_this.multipleStatus.after, nowDate),
          month: full.month,
          lunar: _this.getlunar(full.year, full.month, i),
          disable: !disableBefore || !disableAfter,
          isDay: isDay
        };

        if (info) {
          data.extraInfo = info;
        }

        dateArr.push(data);
      };

      for (var i = 1; i <= dateData; i++) {
        _loop(i);
      }

      return dateArr;
    }
    /**
     * 获取下月天数
     */

  }, {
    key: "_getNextMonthDays",
    value: function _getNextMonthDays(surplus, full) {
      var dateArr = [];

      for (var i = 1; i < surplus + 1; i++) {
        dateArr.push({
          date: i,
          month: Number(full.month) + 1,
          lunar: this.getlunar(full.year, Number(full.month) + 1, i),
          disable: true
        });
      }

      return dateArr;
    }
    /**
     * 获取当前日期详情
     * @param {Object} date
     */

  }, {
    key: "getInfo",
    value: function getInfo(date) {
      var _this2 = this;

      if (!date) {
        date = new Date();
      }

      var dateInfo = this.canlender.find(function (item) {
        return item.fullDate === _this2.getDate(date).fullDate;
      });
      return dateInfo;
    }
    /**
     * 比较时间大小
     */

  }, {
    key: "dateCompare",
    value: function dateCompare(startDate, endDate) {
      // 计算截止时间
      startDate = new Date(startDate.replace('-', '/').replace('-', '/')); // 计算详细项的截止时间

      endDate = new Date(endDate.replace('-', '/').replace('-', '/'));

      if (startDate <= endDate) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * 比较时间是否相等
     */

  }, {
    key: "dateEqual",
    value: function dateEqual(before, after) {
      // 计算截止时间
      before = new Date(before.replace('-', '/').replace('-', '/')); // 计算详细项的截止时间

      after = new Date(after.replace('-', '/').replace('-', '/'));

      if (before.getTime() - after.getTime() === 0) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * 获取日期范围内所有日期
     * @param {Object} begin
     * @param {Object} end
     */

  }, {
    key: "geDateAll",
    value: function geDateAll(begin, end) {
      var arr = [];
      var ab = begin.split('-');
      var ae = end.split('-');
      var db = new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1000;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1000;

      for (var k = unixDb; k <= unixDe;) {
        k = k + 24 * 60 * 60 * 1000;
        arr.push(this.getDate(new Date(parseInt(k))).fullDate);
      }

      return arr;
    }
    /**
     * 计算阴历日期显示
     */

  }, {
    key: "getlunar",
    value: function getlunar(year, month, date) {
      return _calendar.default.solar2lunar(year, month, date);
    }
    /**
     * 设置打点
     */

  }, {
    key: "setSelectInfo",
    value: function setSelectInfo(data, value) {
      this.selected = value;

      this._getWeek(data);
    }
    /**
     *  获取多选状态
     */

  }, {
    key: "setMultiple",
    value: function setMultiple(fullDate) {
      var _this$multipleStatus = this.multipleStatus,
          before = _this$multipleStatus.before,
          after = _this$multipleStatus.after;
      if (!this.range) return;

      if (before && after) {
        this.multipleStatus.before = '';
        this.multipleStatus.after = '';
        this.multipleStatus.data = [];
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
        } else {
          this.multipleStatus.after = fullDate;

          if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
          }
        }
      }

      this._getWeek(fullDate);
    }
    /**
     * 获取每周数据
     * @param {Object} dateData
     */

  }, {
    key: "_getWeek",
    value: function _getWeek(dateData) {
      var _this$getDate = this.getDate(dateData),
          fullDate = _this$getDate.fullDate,
          year = _this$getDate.year,
          month = _this$getDate.month,
          date = _this$getDate.date,
          day = _this$getDate.day;

      var firstDay = new Date(year, month - 1, 1).getDay();
      var currentDay = new Date(year, month, 0).getDate();
      var dates = {
        lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)),
        // 上个月末尾几天
        currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)),
        // 本月天数
        nextMonthDays: [],
        // 下个月开始几天
        weeks: []
      };
      var canlender = [];
      var surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
      dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData));
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays);
      var weeks = {}; // 拼接数组  上个月开始几天 + 本月天数+ 下个月开始几天

      for (var i = 0; i < canlender.length; i++) {
        if (i % 7 === 0) {
          weeks[parseInt(i / 7)] = new Array(7);
        }

        weeks[parseInt(i / 7)][i % 7] = canlender[i];
      }

      this.canlender = canlender;
      this.weeks = weeks;
    } //静态方法
    // static init(date) {
    // 	if (!this.instance) {
    // 		this.instance = new Calendar(date);
    // 	}
    // 	return this.instance;
    // }

  }]);

  return Calendar;
}();

var _default = Calendar;
exports.default = _default;

/***/ }),

/***/ 1422:
/*!*************************************************!*\
  !*** ./src/components/uni-calendar/calendar.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
* @1900-2100区间内的公历、农历互转
* @charset UTF-8
* @github  https://github.com/jjonline/calendar.js
* @Author  Jea杨(JJonline@JJonline.Cn)
* @Time    2014-7-21
* @Time    2016-8-13 Fixed 2033hex、Attribution Annals
* @Time    2016-9-25 Fixed lunar LeapMonth Param Bug
* @Time    2017-7-24 Fixed use getTerm Func Param Error.use solar year,NOT lunar year
* @Version 1.0.3
* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]
* @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]
*/

/* eslint-disable */
var calendar = {
  /**
      * 农历1900-2100的润大小信息表
      * @Array Of Property
      * @return Hex
      */
  lunarInfo: [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049

  /** Add By JJonline@JJonline.Cn**/
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099
  0x0d520],
  // 2100

  /**
      * 公历每个月份的天数普通表
      * @Array Of Property
      * @return Number
      */
  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**
      * 天干地支之天干速查表
      * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
      * @return Cn string
      */
  Gan: ["\u7532", "\u4E59", "\u4E19", "\u4E01", "\u620A", "\u5DF1", "\u5E9A", "\u8F9B", "\u58EC", "\u7678"],

  /**
      * 天干地支之地支速查表
      * @Array Of Property
      * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
      * @return Cn string
      */
  Zhi: ["\u5B50", "\u4E11", "\u5BC5", "\u536F", "\u8FB0", "\u5DF3", "\u5348", "\u672A", "\u7533", "\u9149", "\u620C", "\u4EA5"],

  /**
      * 天干地支之地支速查表<=>生肖
      * @Array Of Property
      * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
      * @return Cn string
      */
  Animals: ["\u9F20", "\u725B", "\u864E", "\u5154", "\u9F99", "\u86C7", "\u9A6C", "\u7F8A", "\u7334", "\u9E21", "\u72D7", "\u732A"],

  /**
      * 24节气速查表
      * @Array Of Property
      * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
      * @return Cn string
      */
  solarTerm: ["\u5C0F\u5BD2", "\u5927\u5BD2", "\u7ACB\u6625", "\u96E8\u6C34", "\u60CA\u86F0", "\u6625\u5206", "\u6E05\u660E", "\u8C37\u96E8", "\u7ACB\u590F", "\u5C0F\u6EE1", "\u8292\u79CD", "\u590F\u81F3", "\u5C0F\u6691", "\u5927\u6691", "\u7ACB\u79CB", "\u5904\u6691", "\u767D\u9732", "\u79CB\u5206", "\u5BD2\u9732", "\u971C\u964D", "\u7ACB\u51AC", "\u5C0F\u96EA", "\u5927\u96EA", "\u51AC\u81F3"],

  /**
      * 1900-2100各年的24节气日期速查表
      * @Array Of Property
      * @return 0x string For splice
      */
  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

  /**
      * 数字转中文速查表
      * @Array Of Property
      * @trans ['日','一','二','三','四','五','六','七','八','九','十']
      * @return Cn string
      */
  nStr1: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341"],

  /**
      * 日期转农历称呼速查表
      * @Array Of Property
      * @trans ['初','十','廿','卅']
      * @return Cn string
      */
  nStr2: ["\u521D", "\u5341", "\u5EFF", "\u5345"],

  /**
      * 月份转农历称呼速查表
      * @Array Of Property
      * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
      * @return Cn string
      */
  nStr3: ["\u6B63", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D", "\u5341", "\u51AC", "\u814A"],

  /**
      * 返回农历y年一整年的总天数
      * @param lunar Year
      * @return Number
      * @eg:var count = calendar.lYearDays(1987) ;//count=387
      */
  lYearDays: function lYearDays(y) {
    var i;
    var sum = 348;

    for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += this.lunarInfo[y - 1900] & i ? 1 : 0;
    }

    return sum + this.leapDays(y);
  },

  /**
      * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
      * @param lunar Year
      * @return Number (0-12)
      * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
      */
  leapMonth: function leapMonth(y) {
    // 闰字编码 \u95f0
    return this.lunarInfo[y - 1900] & 0xf;
  },

  /**
      * 返回农历y年闰月的天数 若该年没有闰月则返回0
      * @param lunar Year
      * @return Number (0、29、30)
      * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
      */
  leapDays: function leapDays(y) {
    if (this.leapMonth(y)) {
      return this.lunarInfo[y - 1900] & 0x10000 ? 30 : 29;
    }

    return 0;
  },

  /**
      * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
      * @param lunar Year
      * @return Number (-1、29、30)
      * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
      */
  monthDays: function monthDays(y, m) {
    if (m > 12 || m < 1) {
      return -1;
    } // 月份参数从1至12，参数错误返回-1


    return this.lunarInfo[y - 1900] & 0x10000 >> m ? 30 : 29;
  },

  /**
      * 返回公历(!)y年m月的天数
      * @param solar Year
      * @return Number (-1、28、29、30、31)
      * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
      */
  solarDays: function solarDays(y, m) {
    if (m > 12 || m < 1) {
      return -1;
    } // 若参数错误 返回-1


    var ms = m - 1;

    if (ms == 1) {
      // 2月份的闰平规律测算后确认返回28或29
      return y % 4 == 0 && y % 100 != 0 || y % 400 == 0 ? 29 : 28;
    } else {
      return this.solarMonth[ms];
    }
  },

  /**
     * 农历年份转换为干支纪年
     * @param  lYear 农历年的年份数
     * @return Cn string
     */
  toGanZhiYear: function toGanZhiYear(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey == 0) ganKey = 10; // 如果余数为0则为最后一个天干

    if (zhiKey == 0) zhiKey = 12; // 如果余数为0则为最后一个地支

    return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
  },

  /**
     * 公历月、日判断所属星座
     * @param  cMonth [description]
     * @param  cDay [description]
     * @return Cn string
     */
  toAstro: function toAstro(cMonth, cDay) {
    var s = "\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF";
    var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "\u5EA7"; // 座
  },

  /**
      * 传入offset偏移量返回干支
      * @param offset 相对甲子的偏移量
      * @return Cn string
      */
  toGanZhi: function toGanZhi(offset) {
    return this.Gan[offset % 10] + this.Zhi[offset % 12];
  },

  /**
      * 传入公历(!)y年获得该年第n个节气的公历日期
      * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
      * @return day Number
      * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
      */
  getTerm: function getTerm(y, n) {
    if (y < 1900 || y > 2100) {
      return -1;
    }

    if (n < 1 || n > 24) {
      return -1;
    }

    var _table = this.sTermInfo[y - 1900];
    var _info = [parseInt('0x' + _table.substr(0, 5)).toString(), parseInt('0x' + _table.substr(5, 5)).toString(), parseInt('0x' + _table.substr(10, 5)).toString(), parseInt('0x' + _table.substr(15, 5)).toString(), parseInt('0x' + _table.substr(20, 5)).toString(), parseInt('0x' + _table.substr(25, 5)).toString()];
    var _calday = [_info[0].substr(0, 1), _info[0].substr(1, 2), _info[0].substr(3, 1), _info[0].substr(4, 2), _info[1].substr(0, 1), _info[1].substr(1, 2), _info[1].substr(3, 1), _info[1].substr(4, 2), _info[2].substr(0, 1), _info[2].substr(1, 2), _info[2].substr(3, 1), _info[2].substr(4, 2), _info[3].substr(0, 1), _info[3].substr(1, 2), _info[3].substr(3, 1), _info[3].substr(4, 2), _info[4].substr(0, 1), _info[4].substr(1, 2), _info[4].substr(3, 1), _info[4].substr(4, 2), _info[5].substr(0, 1), _info[5].substr(1, 2), _info[5].substr(3, 1), _info[5].substr(4, 2)];
    return parseInt(_calday[n - 1]);
  },

  /**
      * 传入农历数字月份返回汉语通俗表示法
      * @param lunar month
      * @return Cn string
      * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
      */
  toChinaMonth: function toChinaMonth(m) {
    // 月 => \u6708
    if (m > 12 || m < 1) {
      return -1;
    } // 若参数错误 返回-1


    var s = this.nStr3[m - 1];
    s += "\u6708"; // 加上月字

    return s;
  },

  /**
      * 传入农历日期数字返回汉字表示法
      * @param lunar day
      * @return Cn string
      * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
      */
  toChinaDay: function toChinaDay(d) {
    // 日 => \u65e5
    var s;

    switch (d) {
      case 10:
        s = "\u521D\u5341";
        break;

      case 20:
        s = "\u4E8C\u5341";
        break;
        break;

      case 30:
        s = "\u4E09\u5341";
        break;
        break;

      default:
        s = this.nStr2[Math.floor(d / 10)];
        s += this.nStr1[d % 10];
    }

    return s;
  },

  /**
      * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
      * @param y year
      * @return Cn string
      * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
      */
  getAnimal: function getAnimal(y) {
    return this.Animals[(y - 4) % 12];
  },

  /**
      * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
      * @param y  solar year
      * @param m  solar month
      * @param d  solar day
      * @return JSON object
      * @eg:console.log(calendar.solar2lunar(1987,11,01));
      */
  solar2lunar: function solar2lunar(y, m, d) {
    // 参数区间1900.1.31~2100.12.31
    // 年份限定、上限
    if (y < 1900 || y > 2100) {
      return -1; // undefined转换为数字变为NaN
    } // 公历传参最下限


    if (y == 1900 && m == 1 && d < 31) {
      return -1;
    } // 未传参  获得当天


    if (!y) {
      var objDate = new Date();
    } else {
      var objDate = new Date(y, parseInt(m) - 1, d);
    }

    var i;
    var leap = 0;
    var temp = 0; // 修正ymd参数

    var y = objDate.getFullYear();
    var m = objDate.getMonth() + 1;
    var d = objDate.getDate();
    var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;

    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = this.lYearDays(i);
      offset -= temp;
    }

    if (offset < 0) {
      offset += temp;
      i--;
    } // 是否今天


    var isTodayObj = new Date();
    var isToday = false;

    if (isTodayObj.getFullYear() == y && isTodayObj.getMonth() + 1 == m && isTodayObj.getDate() == d) {
      isToday = true;
    } // 星期几


    var nWeek = objDate.getDay();
    var cWeek = this.nStr1[nWeek]; // 数字表示周几顺应天朝周一开始的惯例

    if (nWeek == 0) {
      nWeek = 7;
    } // 农历年


    var year = i;
    var leap = this.leapMonth(i); // 闰哪个月

    var isLeap = false; // 效验闰月

    for (i = 1; i < 13 && offset > 0; i++) {
      // 闰月
      if (leap > 0 && i == leap + 1 && isLeap == false) {
        --i;
        isLeap = true;
        temp = this.leapDays(year); // 计算农历闰月天数
      } else {
        temp = this.monthDays(year, i); // 计算农历普通月天数
      } // 解除闰月


      if (isLeap == true && i == leap + 1) {
        isLeap = false;
      }

      offset -= temp;
    } // 闰月导致数组下标重叠取反


    if (offset == 0 && leap > 0 && i == leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
      }
    }

    if (offset < 0) {
      offset += temp;
      --i;
    } // 农历月


    var month = i; // 农历日

    var day = offset + 1; // 天干地支处理

    var sm = m - 1;
    var gzY = this.toGanZhiYear(year); // 当月的两个节气
    // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`

    var firstNode = this.getTerm(y, m * 2 - 1); // 返回当月「节」为几日开始

    var secondNode = this.getTerm(y, m * 2); // 返回当月「节」为几日开始
    // 依据12节气修正干支月

    var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);

    if (d >= firstNode) {
      gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
    } // 传入的日期的节气与否


    var isTerm = false;
    var Term = null;

    if (firstNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 2];
    }

    if (secondNode == d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 1];
    } // 日柱 当月一日与 1900/1/1 相差天数


    var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
    var gzD = this.toGanZhi(dayCyclical + d - 1); // 该日期所属的星座

    var astro = this.toAstro(m, d);
    return {
      'lYear': year,
      'lMonth': month,
      'lDay': day,
      'Animal': this.getAnimal(year),
      'IMonthCn': (isLeap ? "\u95F0" : '') + this.toChinaMonth(month),
      'IDayCn': this.toChinaDay(day),
      'cYear': y,
      'cMonth': m,
      'cDay': d,
      'gzYear': gzY,
      'gzMonth': gzM,
      'gzDay': gzD,
      'isToday': isToday,
      'isLeap': isLeap,
      'nWeek': nWeek,
      'ncWeek': "\u661F\u671F" + cWeek,
      'isTerm': isTerm,
      'Term': Term,
      'astro': astro
    };
  },

  /**
      * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
      * @param y  lunar year
      * @param m  lunar month
      * @param d  lunar day
      * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
      * @return JSON object
      * @eg:console.log(calendar.lunar2solar(1987,9,10));
      */
  lunar2solar: function lunar2solar(y, m, d, isLeapMonth) {
    // 参数区间1900.1.31~2100.12.1
    var isLeapMonth = !!isLeapMonth;
    var leapOffset = 0;
    var leapMonth = this.leapMonth(y);
    var leapDay = this.leapDays(y);

    if (isLeapMonth && leapMonth != m) {
      return -1;
    } // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同


    if (y == 2100 && m == 12 && d > 1 || y == 1900 && m == 1 && d < 31) {
      return -1;
    } // 超出了最大极限值


    var day = this.monthDays(y, m);
    var _day = day; // bugFix 2016-9-25
    // if month is leap, _day use leapDays method

    if (isLeapMonth) {
      _day = this.leapDays(y, m);
    }

    if (y < 1900 || y > 2100 || d > _day) {
      return -1;
    } // 参数合法性效验
    // 计算农历的时间差


    var offset = 0;

    for (var i = 1900; i < y; i++) {
      offset += this.lYearDays(i);
    }

    var leap = 0;
    var isAdd = false;

    for (var i = 1; i < m; i++) {
      leap = this.leapMonth(y);

      if (!isAdd) {
        // 处理闰月
        if (leap <= i && leap > 0) {
          offset += this.leapDays(y);
          isAdd = true;
        }
      }

      offset += this.monthDays(y, i);
    } // 转换闰月农历 需补充该年闰月的前一个月的时差


    if (isLeapMonth) {
      offset += day;
    } // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)


    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
    var calObj = new Date((offset + d - 31) * 86400000 + stmap);
    var cY = calObj.getUTCFullYear();
    var cM = calObj.getUTCMonth() + 1;
    var cD = calObj.getUTCDate();
    return this.solar2lunar(cY, cM, cD);
  }
};
var _default = calendar;
exports.default = _default;

/***/ }),

/***/ 144:
/*!*******************************!*\
  !*** ./src/utils/password.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  checkPassword: function checkPassword(pwd) {
    //密码规则
    if (this.isDiffStr(pwd) && /^(?=.*[0-9].*)(?=.*[a-z].*)(?=.*[A-Z].*).{8,20}$/.test(pwd)) {
      return true;
    } else {
      return false;
    }
  },
  isDiffStr: function isDiffStr(str) {
    //密码正则
    return /^([a-zA-Z0-9]|[@#!_~\-\$\*]){0,20}$/.test(str) ? true : false;
  },
  checkPwdIntensity: function checkPwdIntensity(pwd) {
    //密码强度校验
    if (this.checkPassword(pwd)) {
      if (pwd.length >= 8 && pwd.length <= 10) {
        if (/[@#!$*_~-]/im.test(pwd)) {
          return '2'; //中
        } else {
          return '1'; //弱
        }
      }

      if (pwd.length >= 11 && pwd.length <= 13) {
        if (/[@#!$*_~-]/im.test(pwd)) {
          return '3'; //强
        } else {
          return '2';
        }
      }

      if (pwd.length >= 14 && pwd.length <= 20) {
        return '3';
      }
    } else {
      return '0'; //不符合密码要求
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 15:
/*!************************************************************!*\
  !*** ./node_modules/uni-request/src/InterceptorManager.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InterceptorManager; });
class InterceptorManager{
    constructor(){
        this.handlers = [];
    }

    use(fulfilled, rejected){
        this.handlers.push({
            fulfilled,
            rejected
        });
        return this.handlers.length - 1;
    }

    eject(id){
        if( this.handlers[id] ){
            this.handlers[id] = null;
        }
    }

    forEach(fn){
        this.handlers.forEach(e =>{
            if(e !== null ){
                fn(e)
            }
        })
    }
}



/***/ }),

/***/ 1568:
/*!***********************************************!*\
  !*** ./src/renovation/jsCouponMixin/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(__webpack_require__(/*! @/api/promotion/index.js */ 25));

var _subscribe = _interopRequireDefault(__webpack_require__(/*! @/common/js/subscribe.js */ 1569));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  // newUserType   只有首页在使用   用于隐藏优惠券背景颜色
  props: ["oneColumnCoupon", "newUserType"],
  data: function data() {
    return {
      couponList: [],
      //优惠券列表
      chooseItem: "" //点击的优惠券数据

    };
  },
  methods: {
    desTriggerChange: function desTriggerChange() {
      this.$set(this.chooseItem, "flag", this.chooseItem.flag ? false : true);
    },
    claimCoupon: function claimCoupon(item) {
      var _this = this;

      //领取优惠券 点击触发
      this.chooseItem = item;

      if (uni.getStorageSync("sessionId")) {
        if (item.receiveType == 2) {
          this.$refs.caimCouponPopup.open();
        } else {
          this.receiveCoupon(item);
        }
      } else {
        uni.showToast({
          title: "请登录",
          icon: "none"
        });
        setTimeout(function () {
          _this.$Router.push({
            path: "/pages/login/index"
          });
        });
      }
    },
    couponBgStyle: function couponBgStyle(item) {
      //处理优惠券背景图片
      var backgorundImg = "";

      switch (Number(item.received)) {
        case 0:
          //未领取
          backgorundImg = this.getCouponImage("notReceiveImage", item.id);
          break;

        case 1:
          //已领取
          backgorundImg = this.getCouponImage("receivedImage", item.id);
          break;

        case 2:
          //已领完
          if (item.totalBindAmount > 0) {
            backgorundImg = this.getCouponImage("receivedImage", item.id);
          } else {
            backgorundImg = this.getCouponImage("broughtOutImage", item.id);
          }

          break;

        case 3:
          //已失效
          if (item.totalBindAmount > 0) {
            backgorundImg = this.getCouponImage("receivedImage", item.id);
          } else {
            backgorundImg = this.getCouponImage("broughtOutImage", item.id);
          }

          break;

        case 4:
          backgorundImg = this.getCouponImage("broughtOutImage", item.id);
          break;
      }

      return this.$config.imgBaseUrl + backgorundImg;
    },
    getCouponImage: function getCouponImage(type, id) {
      if (this.oneColumnCoupon.imageVOS && this.oneColumnCoupon.imageVOS.length) {
        for (var i = 0; i < this.oneColumnCoupon.imageVOS.length; i++) {
          if (this.oneColumnCoupon.imageVOS[i].id == id) {
            return this.oneColumnCoupon.imageVOS[i][type];
          }
        }
      } else {
        return this.oneColumnCoupon[type];
      }
    },
    getDecorateCoupons: function getDecorateCoupons(params) {
      var _this2 = this;

      //根据id获取优惠券信息
      _index.default.getDecorateCoupons(params).then(function (res) {
        if (res.data.code == 200) {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].backgorundImg = _this2.couponBgStyle(res.data.data[i]);
          }

          _this2.couponList = res.data.data;
        } else {
          uni.showToast({
            title: res.data.message,
            icon: "none"
          });
        }
      });
    },
    exchangeCouponUsePoint: function exchangeCouponUsePoint() {
      var _this3 = this;

      //积分兑换优惠券
      _index.default.exchangeCouponUsePoint({
        templateId: this.chooseItem.id
      }).then(function (res) {
        if (res.data.code == 200) {
          _this3.$refs.caimCouponPopup.close();

          uni.showToast({
            title: "领取成功",
            icon: "none"
          });

          if (_this3.newUserType) {
            _this3.zhuge.track("首页-新人专享券领取");
          }

          _this3.requestSubscribeMessage(_subscribe.default.couponSubscribe);

          _this3.getCouponId();
        } else {
          uni.showToast({
            title: res.data.message,
            icon: "none"
          });
        }
      });
    },
    receiveCoupon: function receiveCoupon(item) {
      var _this4 = this;

      //领取优惠券
      _index.default.receiveCoupon(item.id).then(function (res) {
        if (res.data.code == 200) {
          uni.showToast({
            title: "领取成功",
            icon: "none"
          });

          _this4.requestSubscribeMessage(_subscribe.default.couponSubscribe);

          _this4.getCouponId();
        } else {
          uni.showToast({
            title: res.data.message,
            icon: "none"
          });
        }
      });
    },
    getCouponId: function getCouponId() {
      //获取优惠券id
      var coupon = [];

      for (var i = 0; i < this.oneColumnCoupon.itemVOS.length; i++) {
        coupon.push(this.oneColumnCoupon.itemVOS[i].id);
      }

      this.getDecorateCoupons(coupon);
    }
  },
  mounted: function mounted() {
    this.getCouponId(); //拿到优惠券id  然后去获取优惠券的领取情况
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 1569:
/*!************************************!*\
  !*** ./src/common/js/subscribe.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  couponSubscribe: 3,
  savingCardSubscribe: 4
};
exports.default = _default;

/***/ }),

/***/ 1570:
/*!**************************************************!*\
  !*** ./src/common/js/requestSubscribeMessage.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(__webpack_require__(/*! @/api/wechat/index.js */ 21));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  methods: {
    requestSubscribeMessage: function requestSubscribeMessage(type) {
      //微信订阅消息   接受订阅id
      _index.default.wechatTemplates(type).then(function (res) {
        if (res.data.code == 200 && res.data.data && res.data.data.length) {
          uni.requestSubscribeMessage({
            tmplIds: res.data.data,
            success: function success(res) {},
            fail: function fail() {//订阅失败回调
            }
          });
        } else {
          uni.showToast({
            title: res.data.message,
            icon: "none"
          });
        }
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!**************************************************************!*\
  !*** ./node_modules/uni-request/src/core/dispatchRequest.js ***!
  \**************************************************************/
/*! exports provided: dispatchRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(uni) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatchRequest", function() { return dispatchRequest; });
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/util */ 14);



const dispatchRequest = function (config) {
    if (config.baseURL && !_helpers_util__WEBPACK_IMPORTED_MODULE_0__["isAbsoluteURL"](config.url)) {
        config.url = _helpers_util__WEBPACK_IMPORTED_MODULE_0__["combineURLs"](config.baseURL, config.url);
    }
    
    config.url = _helpers_util__WEBPACK_IMPORTED_MODULE_0__["buildURL"]( config.url , config.params );
    config.data = config.data
    // config.data = util.merge(
    //     config.data , 
    //     config.transformRequest(config.data),
    // );

    config.headers = _helpers_util__WEBPACK_IMPORTED_MODULE_0__["merge"](
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers || {},
    );

    let methods = ['delete', 'get', 'head', 'post', 'put', 'patch', 'common']
    methods.forEach(method => {
        delete config.headers[method];
    });

    let promise = Promise.resolve( config );
    promise = promise.then( config => {
       return new Promise(function(resolve, reject) {
            let requestTask =  uni.request({
                url : config.url ,
                data : config.data || {},
                header : config.headers,
                method : config.method,
                dataType : config.dataType,
                success : function (res) {									
                    resolve({
                        data : res.data ,
                        headers : res.header,
                        status : res.statusCode,
                        statusText : 'ok'
                    })
                },
                fail : function (err) {
                    reject(err)
                },
                complete :  function () {
                    config.complete && config.complete()
                }
            })

            if( config.timeout && typeof config.timeout === 'number' && config.timeout > 1000 ){
                setTimeout(() =>{
                    requestTask.abort();
                    resolve({
                        status : 'canceled'
                    });
                },config.timeout)
            }
        });
    })

    return promise;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 161:
/*!************************************!*\
  !*** ./src/api/transport/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 162));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  getExpressageInfo: function getExpressageInfo(orderId) {
    //获取物流信息
    return _request.default.post(_url.default.getExpressageInfo, {
      orderId: orderId
    });
  },
  getLogistics: function getLogistics() {
    //获取快递公司
    return _request.default.post(_url.default.getLogistics, {});
  },
  getReturnExpressageInfo: function getReturnExpressageInfo(params) {
    //退款
    return _request.default.post(_url.default.getReturnExpressageInfo, params);
  }
};
exports.default = _default;

/***/ }),

/***/ 162:
/*!**********************************!*\
  !*** ./src/api/transport/url.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var transportApi = {
  getExpressageInfo: "/transport/expressage/getExpressageInfo",
  //获取物流信息
  getLogistics: "/transport/expressage/getLogistics",
  //获取快递公司
  getReturnExpressageInfo: "transport/expressage/getReturnExpressageInfo"
};
var _default = transportApi;
exports.default = _default;

/***/ }),

/***/ 1662:
/*!************************************!*\
  !*** ./src/common/js/homeMixin.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  methods: {
    renovationGoTo: function renovationGoTo(params) {
      var type = Number(params.linkType);

      switch (type) {
        case 1:
          //url跳转
          if (params.linkValue) {
            if (params.linkValue.indexOf(this.$config.localhostUrl) != "-1") {
              //站内页面
              var hrefLink = params.linkValue.split("/");

              if (hrefLink[hrefLink.length - 2] == "act") {
                //装修页面
                this.$Router.push({
                  path: "/pages/renovation/index",
                  query: {
                    url: hrefLink[hrefLink.length - 1]
                  }
                });
              }
            } else {
              uni.navigateTo({
                url: "/pages/webView/index?url=" + params.linkValue
              });
            }
          }

          break;

        case 2:
          //站内页面
          if (params.linkValue == "/pages/category/index" || params.linkValue == "/pages/index/index" || params.linkValue == "/pages/my/index" || params.linkValue == "/pages/cart/index") {
            uni.switchTab({
              url: params.linkValue
            });
          } else {
            var pageQuery = params.linkValue.split("?")[1];
            var queryObjectArray = pageQuery ? pageQuery.split("&") : [];
            var object = {};

            for (var i = 0; i < queryObjectArray.length; i++) {
              object[queryObjectArray[i].split("=")[0]] = queryObjectArray[i].split("=")[1];
            }

            this.$Router.push({
              path: params.linkValue.split("?")[0],
              query: object
            });
          }

          break;

        case 3:
          //店铺
          this.$Router.push({
            path: "/pages/shop/index",
            query: {
              storeId: params.linkValue
            }
          });
          break;

        case 4:
          //商品
          this.$Router.push({
            path: "/pages/goodsDetails/index",
            query: {
              goodsId: params.linkValue
            }
          });
          break;

        case 5:
          //类目
          this.$Router.push({
            path: "/pages/goodsList/index",
            query: {
              frontCategoryId: params.linkValue
            }
          });
          break;

        case 6:
          //品牌
          this.$Router.push({
            path: "/pages/goodsList/index",
            query: {
              brandId: params.linkValue
            }
          });
          break;
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 17:
/*!**************************************************!*\
  !*** ./node_modules/uni-request/src/defaults.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/util */ 14);


let DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

var defaults = {
    method: 'get', // default
    // baseURL: '',
    dataType : 'json',
    responseType : 'text',
    // timeout: 0,
    headers: {},

    // params : {},

    transformRequest (data) {
        return data;
    },

    // transformResponse (data) {
    //     return data;
    // },

    // validateStatus ( status ) {
    //     return status >= 200 && status < 300
    // }

};

defaults.headers = {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
};

['delete','get', 'head','post', 'put', 'patch'].map(e => {
    defaults.headers[e] = _helpers_util__WEBPACK_IMPORTED_MODULE_0__["merge"](defaults.headers , DEFAULT_CONTENT_TYPE);
});


/* harmony default export */ __webpack_exports__["default"] = (defaults);

/***/ }),

/***/ 171:
/*!***********************************!*\
  !*** ./src/api/merchant/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 172));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  getStore: function getStore(storeid) {
    //获取店铺信息
    return _request.default.post(_url.default.getStore + storeid);
  },
  selectMerchantFollowDetailsList: function selectMerchantFollowDetailsList(storeId) {
    //店铺基本信息
    return _request.default.post(_url.default.selectMerchantFollowDetailsList + storeId);
  },
  cancelFollowByMemberIdAndStoreId: function cancelFollowByMemberIdAndStoreId(storeId) {
    //取消关注
    return _request.default.post(_url.default.cancelFollowByMemberIdAndStoreId, {
      storeId: storeId
    });
  },
  addMerchantFollow: function addMerchantFollow(storeId) {
    //关注店铺
    return _request.default.post(_url.default.addMerchantFollow, {
      storeId: storeId
    });
  },
  selectMerchantFollowList: function selectMerchantFollowList(params) {
    //关注店铺列表
    return _request.default.post(_url.default.selectMerchantFollowList, params);
  },
  merchantBasicInfo: function merchantBasicInfo(storeId) {
    //店铺印象信息
    return _request.default.post(_url.default.merchantBasicInfo + storeId, {});
  },
  merchGetVerifyCode: function merchGetVerifyCode() {
    //获取营业执照验证码
    return _request.default.post(_url.default.merchGetVerifyCode, {});
  },
  checkVerifyCode: function checkVerifyCode(params) {
    //校验营业执照验证码
    return _request.default.post(_url.default.checkVerifyCode, params);
  }
};
exports.default = _default;

/***/ }),

/***/ 172:
/*!*********************************!*\
  !*** ./src/api/merchant/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var merchantApi = {
  getStore: "/merchant/storeInfo/getStore/",
  selectMerchantFollowDetailsList: "/merchant/merchantfollow/selectMerchantFollowDetailsList/",
  //店铺基本信息
  cancelFollowByMemberIdAndStoreId: "/merchant/merchantfollow/cancelFollowByMemberIdAndStoreId",
  //取消关注
  addMerchantFollow: "merchant/merchantfollow/addMerchantFollow",
  //关注店铺
  selectMerchantFollowList: "/merchant/merchantfollow/selectMerchantFollowList",
  //关注店铺列表
  merchantBasicInfo: "/merchant/storeInfo/basicInfo/",
  //店铺印象信息
  checkVerifyCode: "/merchant/storeInfo/checkVerifyCode",
  //校验营业执照验证码
  merchGetVerifyCode: "/merchant/storeInfo/getVerifyCode" //获取营业执照验证码

};
var _default = merchantApi;
exports.default = _default;

/***/ }),

/***/ 18:
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  imgBaseUrl: "https://oss.beifamall.com/",
  addImageUrl: "https://test-api.beifamall.com",
  localhostUrl: "mobile.beifamall.com",
  // xiaoyaomengUrl:"https://www.xiaoyaomeng.vip/",	//车总管测试环境
  xiaoyaomengUrl: "https://www.czg365.com/",
  //车总管正式环境
  imgBaseUrlFiles: 'https://oss.beifamall.com/appletsImages/' //常用地址
  // addImageUrl:"https://test1.mamago.com",
  // imgBaseUrl:"https://shopnc-oss.oss-cn-hangzhou.aliyuncs.com/",
  // localhostUrl:"https://m.motherbuy.com/index.html#",

};
exports.default = _default;

/***/ }),

/***/ 181:
/*!*********************************!*\
  !*** ./src/api/search/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 182));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  searchCustom: function searchCustom(searchParams, pageInfo) {
    //查询商品列表
    return _request.default.post(_url.default.searchCustom, _objectSpread(_objectSpread({}, searchParams), pageInfo));
  },
  historySearch: function historySearch() {
    //搜索历史记录
    return _request.default.get(_url.default.historySearch, {});
  },
  hotWords: function hotWords() {
    //热门搜索
    return _request.default.get(_url.default.hotWords, {});
  },
  linkWords: function linkWords(params) {
    //关键字搜索
    return _request.default.post(_url.default.linkWords, params);
  },
  delHistorySearch: function delHistorySearch() {
    //删除搜索历史记录
    return _request.default.delete(_url.default.historySearch, {});
  },
  searchStore: function searchStore(params) {
    //搜索店铺
    return _request.default.post(_url.default.searchStore, params);
  },
  defaultWords: function defaultWords() {
    //获取首页输入框中的默认值
    return _request.default.get(_url.default.defaultWords, {});
  }
};
exports.default = _default;

/***/ }),

/***/ 182:
/*!*******************************!*\
  !*** ./src/api/search/url.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var searchApi = {
  searchCustom: "/search/custom/item",
  //查询商品列表
  historySearch: "/search/custom/historySearch",
  //搜索历史记录
  hotWords: "/search/custom/hotWords",
  //热门搜索
  linkWords: "/search/custom/linkWords",
  //关键字搜索
  searchStore: "/search/custom/store",
  //搜索店铺
  defaultWords: "/search/custom/defaultWords" //获取首页输入框中的默认值

};
var _default = searchApi;
exports.default = _default;

/***/ }),

/***/ 19:
/*!**************************!*\
  !*** ./src/utils/AES.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _cryptoJsMin = _interopRequireDefault(__webpack_require__(/*! @/static/crypto-js.min.js */ 20));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  /** * AES加密
   * @param {Object} word 待加密的数据
   * @param {Object} "abcdefghijesgjss"    密钥
   */
  encrypt: function encrypt(word) {
    var key = _cryptoJsMin.default.enc.Utf8.parse("abcdefghijesgjss");

    var srcs = _cryptoJsMin.default.enc.Utf8.parse(JSON.stringify(word));

    var encrypted = _cryptoJsMin.default.AES.encrypt(srcs, key, {
      mode: _cryptoJsMin.default.mode.ECB,
      padding: _cryptoJsMin.default.pad.Pkcs7
    });

    return encrypted.toString();
    return word;
  },

  /** * AES解密
   * @param {Object} word 待解密的数据
   * @param {Object} "abcdefghijesgjss"    密钥
   */
  decrypt: function decrypt(word) {
    var key = _cryptoJsMin.default.enc.Utf8.parse("abcdefghijesgjss");

    var encryptedHexStr = _cryptoJsMin.default.enc.Utf8.parse(word);

    var srcs = _cryptoJsMin.default.enc.Base64.stringify(encryptedHexStr);

    var decrypt = _cryptoJsMin.default.AES.decrypt(word, key, {
      mode: _cryptoJsMin.default.mode.ECB,
      padding: _cryptoJsMin.default.pad.Pkcs7
    });

    var testDecryptStr = _cryptoJsMin.default.enc.Utf8.stringify(decrypt).toString();

    return testDecryptStr;
    return word;
  }
};
exports.default = _default;

/***/ }),

/***/ 191:
/*!************************************!*\
  !*** ./src/api/marketing/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 192));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

var _marketingSessionItem;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_marketingSessionItem = {
  marketingSessionItemFlag: function marketingSessionItemFlag(id) {
    //商品入口展示接口
    return _request.default.post(_url.default.marketingSessionItemFlag + id, {});
  },
  nonDesignatedMarketing: function nonDesignatedMarketing() {
    //首页秒杀活动
    return _request.default.post(_url.default.nonDesignatedMarketing, {});
  },
  listSessionItems: function listSessionItems(marketingSessionId, page) {
    //获取秒杀某场次下商品
    return _request.default.post(_url.default.listSessionItems, {
      marketingSessionId: marketingSessionId,
      page: page
    });
  }
}, _defineProperty(_marketingSessionItem, "marketingSessionItemFlag", function marketingSessionItemFlag(id) {
  //判断商品是否是秒杀
  return _request.default.post(_url.default.marketingSessionItemFlag + id, {});
}), _defineProperty(_marketingSessionItem, "addMarketingItemNotification", function addMarketingItemNotification(params) {
  //秒杀加入提醒
  return _request.default.post(_url.default.addMarketingItemNotification, params);
}), _defineProperty(_marketingSessionItem, "removeMarketingItemNotification", function removeMarketingItemNotification(params) {
  //取消提醒
  return _request.default.post(_url.default.removeMarketingItemNotification, params);
}), _defineProperty(_marketingSessionItem, "listMarketings", function listMarketings() {
  //获取秒杀活动列表
  return _request.default.post(_url.default.listMarketings, {});
}), _defineProperty(_marketingSessionItem, "listMarketingSessionsByMarketingId", function listMarketingSessionsByMarketingId(id) {
  //秒杀活动列表拿秒杀活动
  return _request.default.post(_url.default.listMarketingSessionsByMarketingId + id, {});
}), _marketingSessionItem);

exports.default = _default;

/***/ }),

/***/ 192:
/*!**********************************!*\
  !*** ./src/api/marketing/url.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _marketApi;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var marketApi = (_marketApi = {
  marketingSessionItemFlag: "/marketing/consumer/skse/marketingSessionItemFlag/",
  //商品详情页打标
  nonDesignatedMarketing: "/marketing/consumer/skse/listMarketingSessions/nonDesignatedMarketing",
  //首页秒杀活动
  listSessionItems: "/marketing/consumer/skse/listSessionItems"
}, _defineProperty(_marketApi, "marketingSessionItemFlag", "/marketing/consumer/skse/marketingSessionItemFlag/"), _defineProperty(_marketApi, "addMarketingItemNotification", "/marketing/consumer/skse/addMarketingItemNotification"), _defineProperty(_marketApi, "removeMarketingItemNotification", "/marketing/consumer/skse/removeMarketingItemNotification"), _defineProperty(_marketApi, "listMarketings", "/marketing/consumer/skse/listMarketings"), _defineProperty(_marketApi, "listMarketingSessionsByMarketingId", "/marketing/consumer/skse/listMarketingSessionsByMarketingId/"), _marketApi);
var _default = marketApi;
exports.default = _default;

/***/ }),

/***/ 193:
/*!**************************************!*\
  !*** ./src/api/achievement/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 194));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  superVList: function superVList(params) {
    //获取超v会员商品列表
    return _request.default.post(_url.default.superVList, params);
  },
  isNovaItem: function isNovaItem(itemId) {
    //判断商品是不是超v礼包
    return _request.default.post(_url.default.isNovaItem + "?itemId=" + itemId, {});
  },
  memberAchievement: function memberAchievement() {
    //收入中心
    return _request.default.post(_url.default.memberAchievement, {});
  }
};
exports.default = _default;

/***/ }),

/***/ 194:
/*!************************************!*\
  !*** ./src/api/achievement/url.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var achievementApi = {
  superVList: "/achievement/item/superV/list",
  //获取超v会员商品列表
  isNovaItem: "/achievement/item/isNovaItem",
  //判断商品是不是PLus礼包
  memberAchievement: "/achievement/memberAchievement/detail" //收入中心

};
var _default = achievementApi;
exports.default = _default;

/***/ }),

/***/ 195:
/*!**********************************!*\
  !*** ./src/api/lottery/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 196));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  lotteryStatus: function lotteryStatus() {
    //会员权益是否使用
    return _request.default.post(_url.default.lotteryStatus, {});
  }
};
exports.default = _default;

/***/ }),

/***/ 196:
/*!********************************!*\
  !*** ./src/api/lottery/url.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var lotteryApi = {
  lotteryStatus: "/lottery/app/winning/status" //会员权益是否使用过

};
var _default = lotteryApi;
exports.default = _default;

/***/ }),

/***/ 197:
/*!***************************************!*\
  !*** ./src/common/js/memberConfig.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var memberConfig = {
  mokaStatus: 1,
  //vip会员
  enterpriseMember: 2
};
var _default = memberConfig;
exports.default = _default;

/***/ }),

/***/ 198:
/*!*****************************************!*\
  !*** ./src/pages/goodsDetails/mixin.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(__webpack_require__(/*! @/api/goods/index.js */ 92));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  data: function data() {
    return {
      goodsInfo: {},
      //商品信息
      isGetInfo: false,
      //商品详情是否拿到数据
      isCollectionFlag: false,
      //该商品是否收藏
      goodsInfoId: "" //商品id

    };
  },
  methods: {
    saveGoodsFavorite: function saveGoodsFavorite() {
      var _this = this;

      //收藏该商品
      if (!uni.getStorageSync("sessionId")) {
        this.$Router.push({
          path: "/pages/login/index"
        });
        return;
      }

      _index.default.saveGoodsFavorite(this.goodsInfoId).then(function (res) {
        if (res.data.code == 200) {
          _this.isCollectionFlag = true;
        } else {
          uni.showToast({
            title: res.data.message,
            icon: "none"
          });
        }
      });
    },
    cancelGoodsFavorite: function cancelGoodsFavorite() {
      var _this2 = this;

      //取消收藏该商品
      _index.default.cancelGoodsFavorite(this.goodsInfoId).then(function (res) {
        if (res.data.code == 200) {
          _this2.isCollectionFlag = false;
        } else {
          uni.showToast({
            title: res.data.message,
            icon: "none"
          });
        }
      });
    },
    findGoodsFavorite: function findGoodsFavorite() {
      var _this3 = this;

      //查看该商品是否收藏
      _index.default.findGoodsFavorite(this.goodsInfoId).then(function (res) {
        if (res.data.code == 200) {
          _this3.isCollectionFlag = res.data.data;
        } else {
          _this3.isCollectionFlag = false;
        }
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"文器库商城","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"文器库商城","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"文器库商城","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"文器库商城","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*************************************!*\
  !*** ./src/static/crypto-js.min.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, r) {
  "object" == ( false ? undefined : _typeof(exports)) ? module.exports = exports = r() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (r),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this, function () {
  var t = t || function (t, r) {
    var e = Object.create || function () {
      function t() {}

      return function (r) {
        var e;
        return t.prototype = r, e = new t(), t.prototype = null, e;
      };
    }(),
        i = {},
        n = i.lib = {},
        o = n.Base = function () {
      return {
        extend: function extend(t) {
          var r = e(this);
          return t && r.mixIn(t), r.hasOwnProperty("init") && this.init !== r.init || (r.init = function () {
            r.$super.init.apply(this, arguments);
          }), r.init.prototype = r, r.$super = this, r;
        },
        create: function create() {
          var t = this.extend();
          return t.init.apply(t, arguments), t;
        },
        init: function init() {},
        mixIn: function mixIn(t) {
          for (var r in t) {
            t.hasOwnProperty(r) && (this[r] = t[r]);
          }

          t.hasOwnProperty("toString") && (this.toString = t.toString);
        },
        clone: function clone() {
          return this.init.prototype.extend(this);
        }
      };
    }(),
        s = n.WordArray = o.extend({
      init: function init(t, e) {
        t = this.words = t || [], e != r ? this.sigBytes = e : this.sigBytes = 4 * t.length;
      },
      toString: function toString(t) {
        return (t || c).stringify(this);
      },
      concat: function concat(t) {
        var r = this.words,
            e = t.words,
            i = this.sigBytes,
            n = t.sigBytes;
        if (this.clamp(), i % 4) for (var o = 0; o < n; o++) {
          var s = e[o >>> 2] >>> 24 - o % 4 * 8 & 255;
          r[i + o >>> 2] |= s << 24 - (i + o) % 4 * 8;
        } else for (var o = 0; o < n; o += 4) {
          r[i + o >>> 2] = e[o >>> 2];
        }
        return this.sigBytes += n, this;
      },
      clamp: function clamp() {
        var r = this.words,
            e = this.sigBytes;
        r[e >>> 2] &= 4294967295 << 32 - e % 4 * 8, r.length = t.ceil(e / 4);
      },
      clone: function clone() {
        var t = o.clone.call(this);
        return t.words = this.words.slice(0), t;
      },
      random: function random(r) {
        for (var e, i = [], n = function n(r) {
          var r = r,
              e = 987654321,
              i = 4294967295;
          return function () {
            e = 36969 * (65535 & e) + (e >> 16) & i, r = 18e3 * (65535 & r) + (r >> 16) & i;
            var n = (e << 16) + r & i;
            return n /= 4294967296, n += .5, n * (t.random() > .5 ? 1 : -1);
          };
        }, o = 0; o < r; o += 4) {
          var a = n(4294967296 * (e || t.random()));
          e = 987654071 * a(), i.push(4294967296 * a() | 0);
        }

        return new s.init(i, r);
      }
    }),
        a = i.enc = {},
        c = a.Hex = {
      stringify: function stringify(t) {
        for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n++) {
          var o = r[n >>> 2] >>> 24 - n % 4 * 8 & 255;
          i.push((o >>> 4).toString(16)), i.push((15 & o).toString(16));
        }

        return i.join("");
      },
      parse: function parse(t) {
        for (var r = t.length, e = [], i = 0; i < r; i += 2) {
          e[i >>> 3] |= parseInt(t.substr(i, 2), 16) << 24 - i % 8 * 4;
        }

        return new s.init(e, r / 2);
      }
    },
        h = a.Latin1 = {
      stringify: function stringify(t) {
        for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n++) {
          var o = r[n >>> 2] >>> 24 - n % 4 * 8 & 255;
          i.push(String.fromCharCode(o));
        }

        return i.join("");
      },
      parse: function parse(t) {
        for (var r = t.length, e = [], i = 0; i < r; i++) {
          e[i >>> 2] |= (255 & t.charCodeAt(i)) << 24 - i % 4 * 8;
        }

        return new s.init(e, r);
      }
    },
        l = a.Utf8 = {
      stringify: function stringify(t) {
        try {
          return decodeURIComponent(escape(h.stringify(t)));
        } catch (t) {
          throw new Error("Malformed UTF-8 data");
        }
      },
      parse: function parse(t) {
        return h.parse(unescape(encodeURIComponent(t)));
      }
    },
        f = n.BufferedBlockAlgorithm = o.extend({
      reset: function reset() {
        this._data = new s.init(), this._nDataBytes = 0;
      },
      _append: function _append(t) {
        "string" == typeof t && (t = l.parse(t)), this._data.concat(t), this._nDataBytes += t.sigBytes;
      },
      _process: function _process(r) {
        var e = this._data,
            i = e.words,
            n = e.sigBytes,
            o = this.blockSize,
            a = 4 * o,
            c = n / a;
        c = r ? t.ceil(c) : t.max((0 | c) - this._minBufferSize, 0);
        var h = c * o,
            l = t.min(4 * h, n);

        if (h) {
          for (var f = 0; f < h; f += o) {
            this._doProcessBlock(i, f);
          }

          var u = i.splice(0, h);
          e.sigBytes -= l;
        }

        return new s.init(u, l);
      },
      clone: function clone() {
        var t = o.clone.call(this);
        return t._data = this._data.clone(), t;
      },
      _minBufferSize: 0
    }),
        u = (n.Hasher = f.extend({
      cfg: o.extend(),
      init: function init(t) {
        this.cfg = this.cfg.extend(t), this.reset();
      },
      reset: function reset() {
        f.reset.call(this), this._doReset();
      },
      update: function update(t) {
        return this._append(t), this._process(), this;
      },
      finalize: function finalize(t) {
        t && this._append(t);

        var r = this._doFinalize();

        return r;
      },
      blockSize: 16,
      _createHelper: function _createHelper(t) {
        return function (r, e) {
          return new t.init(e).finalize(r);
        };
      },
      _createHmacHelper: function _createHmacHelper(t) {
        return function (r, e) {
          return new u.HMAC.init(t, e).finalize(r);
        };
      }
    }), i.algo = {});

    return i;
  }(Math);

  return function () {
    function r(t, r, e) {
      for (var i = [], o = 0, s = 0; s < r; s++) {
        if (s % 4) {
          var a = e[t.charCodeAt(s - 1)] << s % 4 * 2,
              c = e[t.charCodeAt(s)] >>> 6 - s % 4 * 2;
          i[o >>> 2] |= (a | c) << 24 - o % 4 * 8, o++;
        }
      }

      return n.create(i, o);
    }

    var e = t,
        i = e.lib,
        n = i.WordArray,
        o = e.enc;
    o.Base64 = {
      stringify: function stringify(t) {
        var r = t.words,
            e = t.sigBytes,
            i = this._map;
        t.clamp();

        for (var n = [], o = 0; o < e; o += 3) {
          for (var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255, a = r[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255, c = r[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, h = s << 16 | a << 8 | c, l = 0; l < 4 && o + .75 * l < e; l++) {
            n.push(i.charAt(h >>> 6 * (3 - l) & 63));
          }
        }

        var f = i.charAt(64);
        if (f) for (; n.length % 4;) {
          n.push(f);
        }
        return n.join("");
      },
      parse: function parse(t) {
        var e = t.length,
            i = this._map,
            n = this._reverseMap;

        if (!n) {
          n = this._reverseMap = [];

          for (var o = 0; o < i.length; o++) {
            n[i.charCodeAt(o)] = o;
          }
        }

        var s = i.charAt(64);

        if (s) {
          var a = t.indexOf(s);
          a !== -1 && (e = a);
        }

        return r(t, e, n);
      },
      _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    };
  }(), function (r) {
    function e(t, r, e, i, n, o, s) {
      var a = t + (r & e | ~r & i) + n + s;
      return (a << o | a >>> 32 - o) + r;
    }

    function i(t, r, e, i, n, o, s) {
      var a = t + (r & i | e & ~i) + n + s;
      return (a << o | a >>> 32 - o) + r;
    }

    function n(t, r, e, i, n, o, s) {
      var a = t + (r ^ e ^ i) + n + s;
      return (a << o | a >>> 32 - o) + r;
    }

    function o(t, r, e, i, n, o, s) {
      var a = t + (e ^ (r | ~i)) + n + s;
      return (a << o | a >>> 32 - o) + r;
    }

    var s = t,
        a = s.lib,
        c = a.WordArray,
        h = a.Hasher,
        l = s.algo,
        f = [];
    !function () {
      for (var t = 0; t < 64; t++) {
        f[t] = 4294967296 * r.abs(r.sin(t + 1)) | 0;
      }
    }();
    var u = l.MD5 = h.extend({
      _doReset: function _doReset() {
        this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878]);
      },
      _doProcessBlock: function _doProcessBlock(t, r) {
        for (var s = 0; s < 16; s++) {
          var a = r + s,
              c = t[a];
          t[a] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8);
        }

        var h = this._hash.words,
            l = t[r + 0],
            u = t[r + 1],
            d = t[r + 2],
            v = t[r + 3],
            p = t[r + 4],
            _ = t[r + 5],
            y = t[r + 6],
            g = t[r + 7],
            B = t[r + 8],
            w = t[r + 9],
            k = t[r + 10],
            S = t[r + 11],
            m = t[r + 12],
            x = t[r + 13],
            b = t[r + 14],
            H = t[r + 15],
            z = h[0],
            A = h[1],
            C = h[2],
            D = h[3];
        z = e(z, A, C, D, l, 7, f[0]), D = e(D, z, A, C, u, 12, f[1]), C = e(C, D, z, A, d, 17, f[2]), A = e(A, C, D, z, v, 22, f[3]), z = e(z, A, C, D, p, 7, f[4]), D = e(D, z, A, C, _, 12, f[5]), C = e(C, D, z, A, y, 17, f[6]), A = e(A, C, D, z, g, 22, f[7]), z = e(z, A, C, D, B, 7, f[8]), D = e(D, z, A, C, w, 12, f[9]), C = e(C, D, z, A, k, 17, f[10]), A = e(A, C, D, z, S, 22, f[11]), z = e(z, A, C, D, m, 7, f[12]), D = e(D, z, A, C, x, 12, f[13]), C = e(C, D, z, A, b, 17, f[14]), A = e(A, C, D, z, H, 22, f[15]), z = i(z, A, C, D, u, 5, f[16]), D = i(D, z, A, C, y, 9, f[17]), C = i(C, D, z, A, S, 14, f[18]), A = i(A, C, D, z, l, 20, f[19]), z = i(z, A, C, D, _, 5, f[20]), D = i(D, z, A, C, k, 9, f[21]), C = i(C, D, z, A, H, 14, f[22]), A = i(A, C, D, z, p, 20, f[23]), z = i(z, A, C, D, w, 5, f[24]), D = i(D, z, A, C, b, 9, f[25]), C = i(C, D, z, A, v, 14, f[26]), A = i(A, C, D, z, B, 20, f[27]), z = i(z, A, C, D, x, 5, f[28]), D = i(D, z, A, C, d, 9, f[29]), C = i(C, D, z, A, g, 14, f[30]), A = i(A, C, D, z, m, 20, f[31]), z = n(z, A, C, D, _, 4, f[32]), D = n(D, z, A, C, B, 11, f[33]), C = n(C, D, z, A, S, 16, f[34]), A = n(A, C, D, z, b, 23, f[35]), z = n(z, A, C, D, u, 4, f[36]), D = n(D, z, A, C, p, 11, f[37]), C = n(C, D, z, A, g, 16, f[38]), A = n(A, C, D, z, k, 23, f[39]), z = n(z, A, C, D, x, 4, f[40]), D = n(D, z, A, C, l, 11, f[41]), C = n(C, D, z, A, v, 16, f[42]), A = n(A, C, D, z, y, 23, f[43]), z = n(z, A, C, D, w, 4, f[44]), D = n(D, z, A, C, m, 11, f[45]), C = n(C, D, z, A, H, 16, f[46]), A = n(A, C, D, z, d, 23, f[47]), z = o(z, A, C, D, l, 6, f[48]), D = o(D, z, A, C, g, 10, f[49]), C = o(C, D, z, A, b, 15, f[50]), A = o(A, C, D, z, _, 21, f[51]), z = o(z, A, C, D, m, 6, f[52]), D = o(D, z, A, C, v, 10, f[53]), C = o(C, D, z, A, k, 15, f[54]), A = o(A, C, D, z, u, 21, f[55]), z = o(z, A, C, D, B, 6, f[56]), D = o(D, z, A, C, H, 10, f[57]), C = o(C, D, z, A, y, 15, f[58]), A = o(A, C, D, z, x, 21, f[59]), z = o(z, A, C, D, p, 6, f[60]), D = o(D, z, A, C, S, 10, f[61]), C = o(C, D, z, A, d, 15, f[62]), A = o(A, C, D, z, w, 21, f[63]), h[0] = h[0] + z | 0, h[1] = h[1] + A | 0, h[2] = h[2] + C | 0, h[3] = h[3] + D | 0;
      },
      _doFinalize: function _doFinalize() {
        var t = this._data,
            e = t.words,
            i = 8 * this._nDataBytes,
            n = 8 * t.sigBytes;
        e[n >>> 5] |= 128 << 24 - n % 32;
        var o = r.floor(i / 4294967296),
            s = i;
        e[(n + 64 >>> 9 << 4) + 15] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), e[(n + 64 >>> 9 << 4) + 14] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), t.sigBytes = 4 * (e.length + 1), this._process();

        for (var a = this._hash, c = a.words, h = 0; h < 4; h++) {
          var l = c[h];
          c[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8);
        }

        return a;
      },
      clone: function clone() {
        var t = h.clone.call(this);
        return t._hash = this._hash.clone(), t;
      }
    });
    s.MD5 = h._createHelper(u), s.HmacMD5 = h._createHmacHelper(u);
  }(Math), function () {
    var r = t,
        e = r.lib,
        i = e.WordArray,
        n = e.Hasher,
        o = r.algo,
        s = [],
        a = o.SHA1 = n.extend({
      _doReset: function _doReset() {
        this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
      },
      _doProcessBlock: function _doProcessBlock(t, r) {
        for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], a = e[3], c = e[4], h = 0; h < 80; h++) {
          if (h < 16) s[h] = 0 | t[r + h];else {
            var l = s[h - 3] ^ s[h - 8] ^ s[h - 14] ^ s[h - 16];
            s[h] = l << 1 | l >>> 31;
          }
          var f = (i << 5 | i >>> 27) + c + s[h];
          f += h < 20 ? (n & o | ~n & a) + 1518500249 : h < 40 ? (n ^ o ^ a) + 1859775393 : h < 60 ? (n & o | n & a | o & a) - 1894007588 : (n ^ o ^ a) - 899497514, c = a, a = o, o = n << 30 | n >>> 2, n = i, i = f;
        }

        e[0] = e[0] + i | 0, e[1] = e[1] + n | 0, e[2] = e[2] + o | 0, e[3] = e[3] + a | 0, e[4] = e[4] + c | 0;
      },
      _doFinalize: function _doFinalize() {
        var t = this._data,
            r = t.words,
            e = 8 * this._nDataBytes,
            i = 8 * t.sigBytes;
        return r[i >>> 5] |= 128 << 24 - i % 32, r[(i + 64 >>> 9 << 4) + 14] = Math.floor(e / 4294967296), r[(i + 64 >>> 9 << 4) + 15] = e, t.sigBytes = 4 * r.length, this._process(), this._hash;
      },
      clone: function clone() {
        var t = n.clone.call(this);
        return t._hash = this._hash.clone(), t;
      }
    });
    r.SHA1 = n._createHelper(a), r.HmacSHA1 = n._createHmacHelper(a);
  }(), function (r) {
    var e = t,
        i = e.lib,
        n = i.WordArray,
        o = i.Hasher,
        s = e.algo,
        a = [],
        c = [];
    !function () {
      function t(t) {
        for (var e = r.sqrt(t), i = 2; i <= e; i++) {
          if (!(t % i)) return !1;
        }

        return !0;
      }

      function e(t) {
        return 4294967296 * (t - (0 | t)) | 0;
      }

      for (var i = 2, n = 0; n < 64;) {
        t(i) && (n < 8 && (a[n] = e(r.pow(i, .5))), c[n] = e(r.pow(i, 1 / 3)), n++), i++;
      }
    }();
    var h = [],
        l = s.SHA256 = o.extend({
      _doReset: function _doReset() {
        this._hash = new n.init(a.slice(0));
      },
      _doProcessBlock: function _doProcessBlock(t, r) {
        for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], s = e[3], a = e[4], l = e[5], f = e[6], u = e[7], d = 0; d < 64; d++) {
          if (d < 16) h[d] = 0 | t[r + d];else {
            var v = h[d - 15],
                p = (v << 25 | v >>> 7) ^ (v << 14 | v >>> 18) ^ v >>> 3,
                _ = h[d - 2],
                y = (_ << 15 | _ >>> 17) ^ (_ << 13 | _ >>> 19) ^ _ >>> 10;
            h[d] = p + h[d - 7] + y + h[d - 16];
          }
          var g = a & l ^ ~a & f,
              B = i & n ^ i & o ^ n & o,
              w = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22),
              k = (a << 26 | a >>> 6) ^ (a << 21 | a >>> 11) ^ (a << 7 | a >>> 25),
              S = u + k + g + c[d] + h[d],
              m = w + B;
          u = f, f = l, l = a, a = s + S | 0, s = o, o = n, n = i, i = S + m | 0;
        }

        e[0] = e[0] + i | 0, e[1] = e[1] + n | 0, e[2] = e[2] + o | 0, e[3] = e[3] + s | 0, e[4] = e[4] + a | 0, e[5] = e[5] + l | 0, e[6] = e[6] + f | 0, e[7] = e[7] + u | 0;
      },
      _doFinalize: function _doFinalize() {
        var t = this._data,
            e = t.words,
            i = 8 * this._nDataBytes,
            n = 8 * t.sigBytes;
        return e[n >>> 5] |= 128 << 24 - n % 32, e[(n + 64 >>> 9 << 4) + 14] = r.floor(i / 4294967296), e[(n + 64 >>> 9 << 4) + 15] = i, t.sigBytes = 4 * e.length, this._process(), this._hash;
      },
      clone: function clone() {
        var t = o.clone.call(this);
        return t._hash = this._hash.clone(), t;
      }
    });
    e.SHA256 = o._createHelper(l), e.HmacSHA256 = o._createHmacHelper(l);
  }(Math), function () {
    function r(t) {
      return t << 8 & 4278255360 | t >>> 8 & 16711935;
    }

    var e = t,
        i = e.lib,
        n = i.WordArray,
        o = e.enc;
    o.Utf16 = o.Utf16BE = {
      stringify: function stringify(t) {
        for (var r = t.words, e = t.sigBytes, i = [], n = 0; n < e; n += 2) {
          var o = r[n >>> 2] >>> 16 - n % 4 * 8 & 65535;
          i.push(String.fromCharCode(o));
        }

        return i.join("");
      },
      parse: function parse(t) {
        for (var r = t.length, e = [], i = 0; i < r; i++) {
          e[i >>> 1] |= t.charCodeAt(i) << 16 - i % 2 * 16;
        }

        return n.create(e, 2 * r);
      }
    };
    o.Utf16LE = {
      stringify: function stringify(t) {
        for (var e = t.words, i = t.sigBytes, n = [], o = 0; o < i; o += 2) {
          var s = r(e[o >>> 2] >>> 16 - o % 4 * 8 & 65535);
          n.push(String.fromCharCode(s));
        }

        return n.join("");
      },
      parse: function parse(t) {
        for (var e = t.length, i = [], o = 0; o < e; o++) {
          i[o >>> 1] |= r(t.charCodeAt(o) << 16 - o % 2 * 16);
        }

        return n.create(i, 2 * e);
      }
    };
  }(), function () {
    if ("function" == typeof ArrayBuffer) {
      var r = t,
          e = r.lib,
          i = e.WordArray,
          n = i.init,
          o = i.init = function (t) {
        if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), t instanceof Uint8Array) {
          for (var r = t.byteLength, e = [], i = 0; i < r; i++) {
            e[i >>> 2] |= t[i] << 24 - i % 4 * 8;
          }

          n.call(this, e, r);
        } else n.apply(this, arguments);
      };

      o.prototype = i;
    }
  }(), function (r) {
    function e(t, r, e) {
      return t ^ r ^ e;
    }

    function i(t, r, e) {
      return t & r | ~t & e;
    }

    function n(t, r, e) {
      return (t | ~r) ^ e;
    }

    function o(t, r, e) {
      return t & e | r & ~e;
    }

    function s(t, r, e) {
      return t ^ (r | ~e);
    }

    function a(t, r) {
      return t << r | t >>> 32 - r;
    }

    var c = t,
        h = c.lib,
        l = h.WordArray,
        f = h.Hasher,
        u = c.algo,
        d = l.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
        v = l.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
        p = l.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
        _ = l.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
        y = l.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
        g = l.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
        B = u.RIPEMD160 = f.extend({
      _doReset: function _doReset() {
        this._hash = l.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
      },
      _doProcessBlock: function _doProcessBlock(t, r) {
        for (var c = 0; c < 16; c++) {
          var h = r + c,
              l = t[h];
          t[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8);
        }

        var f,
            u,
            B,
            w,
            k,
            S,
            m,
            x,
            b,
            H,
            z = this._hash.words,
            A = y.words,
            C = g.words,
            D = d.words,
            R = v.words,
            E = p.words,
            M = _.words;
        S = f = z[0], m = u = z[1], x = B = z[2], b = w = z[3], H = k = z[4];

        for (var F, c = 0; c < 80; c += 1) {
          F = f + t[r + D[c]] | 0, F += c < 16 ? e(u, B, w) + A[0] : c < 32 ? i(u, B, w) + A[1] : c < 48 ? n(u, B, w) + A[2] : c < 64 ? o(u, B, w) + A[3] : s(u, B, w) + A[4], F |= 0, F = a(F, E[c]), F = F + k | 0, f = k, k = w, w = a(B, 10), B = u, u = F, F = S + t[r + R[c]] | 0, F += c < 16 ? s(m, x, b) + C[0] : c < 32 ? o(m, x, b) + C[1] : c < 48 ? n(m, x, b) + C[2] : c < 64 ? i(m, x, b) + C[3] : e(m, x, b) + C[4], F |= 0, F = a(F, M[c]), F = F + H | 0, S = H, H = b, b = a(x, 10), x = m, m = F;
        }

        F = z[1] + B + b | 0, z[1] = z[2] + w + H | 0, z[2] = z[3] + k + S | 0, z[3] = z[4] + f + m | 0, z[4] = z[0] + u + x | 0, z[0] = F;
      },
      _doFinalize: function _doFinalize() {
        var t = this._data,
            r = t.words,
            e = 8 * this._nDataBytes,
            i = 8 * t.sigBytes;
        r[i >>> 5] |= 128 << 24 - i % 32, r[(i + 64 >>> 9 << 4) + 14] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8), t.sigBytes = 4 * (r.length + 1), this._process();

        for (var n = this._hash, o = n.words, s = 0; s < 5; s++) {
          var a = o[s];
          o[s] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8);
        }

        return n;
      },
      clone: function clone() {
        var t = f.clone.call(this);
        return t._hash = this._hash.clone(), t;
      }
    });

    c.RIPEMD160 = f._createHelper(B), c.HmacRIPEMD160 = f._createHmacHelper(B);
  }(Math), function () {
    var r = t,
        e = r.lib,
        i = e.Base,
        n = r.enc,
        o = n.Utf8,
        s = r.algo;
    s.HMAC = i.extend({
      init: function init(t, r) {
        t = this._hasher = new t.init(), "string" == typeof r && (r = o.parse(r));
        var e = t.blockSize,
            i = 4 * e;
        r.sigBytes > i && (r = t.finalize(r)), r.clamp();

        for (var n = this._oKey = r.clone(), s = this._iKey = r.clone(), a = n.words, c = s.words, h = 0; h < e; h++) {
          a[h] ^= 1549556828, c[h] ^= 909522486;
        }

        n.sigBytes = s.sigBytes = i, this.reset();
      },
      reset: function reset() {
        var t = this._hasher;
        t.reset(), t.update(this._iKey);
      },
      update: function update(t) {
        return this._hasher.update(t), this;
      },
      finalize: function finalize(t) {
        var r = this._hasher,
            e = r.finalize(t);
        r.reset();
        var i = r.finalize(this._oKey.clone().concat(e));
        return i;
      }
    });
  }(), function () {
    var r = t,
        e = r.lib,
        i = e.Base,
        n = e.WordArray,
        o = r.algo,
        s = o.SHA1,
        a = o.HMAC,
        c = o.PBKDF2 = i.extend({
      cfg: i.extend({
        keySize: 4,
        hasher: s,
        iterations: 1
      }),
      init: function init(t) {
        this.cfg = this.cfg.extend(t);
      },
      compute: function compute(t, r) {
        for (var e = this.cfg, i = a.create(e.hasher, t), o = n.create(), s = n.create([1]), c = o.words, h = s.words, l = e.keySize, f = e.iterations; c.length < l;) {
          var u = i.update(r).finalize(s);
          i.reset();

          for (var d = u.words, v = d.length, p = u, _ = 1; _ < f; _++) {
            p = i.finalize(p), i.reset();

            for (var y = p.words, g = 0; g < v; g++) {
              d[g] ^= y[g];
            }
          }

          o.concat(u), h[0]++;
        }

        return o.sigBytes = 4 * l, o;
      }
    });

    r.PBKDF2 = function (t, r, e) {
      return c.create(e).compute(t, r);
    };
  }(), function () {
    var r = t,
        e = r.lib,
        i = e.Base,
        n = e.WordArray,
        o = r.algo,
        s = o.MD5,
        a = o.EvpKDF = i.extend({
      cfg: i.extend({
        keySize: 4,
        hasher: s,
        iterations: 1
      }),
      init: function init(t) {
        this.cfg = this.cfg.extend(t);
      },
      compute: function compute(t, r) {
        for (var e = this.cfg, i = e.hasher.create(), o = n.create(), s = o.words, a = e.keySize, c = e.iterations; s.length < a;) {
          h && i.update(h);
          var h = i.update(t).finalize(r);
          i.reset();

          for (var l = 1; l < c; l++) {
            h = i.finalize(h), i.reset();
          }

          o.concat(h);
        }

        return o.sigBytes = 4 * a, o;
      }
    });

    r.EvpKDF = function (t, r, e) {
      return a.create(e).compute(t, r);
    };
  }(), function () {
    var r = t,
        e = r.lib,
        i = e.WordArray,
        n = r.algo,
        o = n.SHA256,
        s = n.SHA224 = o.extend({
      _doReset: function _doReset() {
        this._hash = new i.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
      },
      _doFinalize: function _doFinalize() {
        var t = o._doFinalize.call(this);

        return t.sigBytes -= 4, t;
      }
    });
    r.SHA224 = o._createHelper(s), r.HmacSHA224 = o._createHmacHelper(s);
  }(), function (r) {
    var e = t,
        i = e.lib,
        n = i.Base,
        o = i.WordArray,
        s = e.x64 = {};
    s.Word = n.extend({
      init: function init(t, r) {
        this.high = t, this.low = r;
      }
    }), s.WordArray = n.extend({
      init: function init(t, e) {
        t = this.words = t || [], e != r ? this.sigBytes = e : this.sigBytes = 8 * t.length;
      },
      toX32: function toX32() {
        for (var t = this.words, r = t.length, e = [], i = 0; i < r; i++) {
          var n = t[i];
          e.push(n.high), e.push(n.low);
        }

        return o.create(e, this.sigBytes);
      },
      clone: function clone() {
        for (var t = n.clone.call(this), r = t.words = this.words.slice(0), e = r.length, i = 0; i < e; i++) {
          r[i] = r[i].clone();
        }

        return t;
      }
    });
  }(), function (r) {
    var e = t,
        i = e.lib,
        n = i.WordArray,
        o = i.Hasher,
        s = e.x64,
        a = s.Word,
        c = e.algo,
        h = [],
        l = [],
        f = [];
    !function () {
      for (var t = 1, r = 0, e = 0; e < 24; e++) {
        h[t + 5 * r] = (e + 1) * (e + 2) / 2 % 64;
        var i = r % 5,
            n = (2 * t + 3 * r) % 5;
        t = i, r = n;
      }

      for (var t = 0; t < 5; t++) {
        for (var r = 0; r < 5; r++) {
          l[t + 5 * r] = r + (2 * t + 3 * r) % 5 * 5;
        }
      }

      for (var o = 1, s = 0; s < 24; s++) {
        for (var c = 0, u = 0, d = 0; d < 7; d++) {
          if (1 & o) {
            var v = (1 << d) - 1;
            v < 32 ? u ^= 1 << v : c ^= 1 << v - 32;
          }

          128 & o ? o = o << 1 ^ 113 : o <<= 1;
        }

        f[s] = a.create(c, u);
      }
    }();
    var u = [];
    !function () {
      for (var t = 0; t < 25; t++) {
        u[t] = a.create();
      }
    }();
    var d = c.SHA3 = o.extend({
      cfg: o.cfg.extend({
        outputLength: 512
      }),
      _doReset: function _doReset() {
        for (var t = this._state = [], r = 0; r < 25; r++) {
          t[r] = new a.init();
        }

        this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
      },
      _doProcessBlock: function _doProcessBlock(t, r) {
        for (var e = this._state, i = this.blockSize / 2, n = 0; n < i; n++) {
          var o = t[r + 2 * n],
              s = t[r + 2 * n + 1];
          o = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8);
          var a = e[n];
          a.high ^= s, a.low ^= o;
        }

        for (var c = 0; c < 24; c++) {
          for (var d = 0; d < 5; d++) {
            for (var v = 0, p = 0, _ = 0; _ < 5; _++) {
              var a = e[d + 5 * _];
              v ^= a.high, p ^= a.low;
            }

            var y = u[d];
            y.high = v, y.low = p;
          }

          for (var d = 0; d < 5; d++) {
            for (var g = u[(d + 4) % 5], B = u[(d + 1) % 5], w = B.high, k = B.low, v = g.high ^ (w << 1 | k >>> 31), p = g.low ^ (k << 1 | w >>> 31), _ = 0; _ < 5; _++) {
              var a = e[d + 5 * _];
              a.high ^= v, a.low ^= p;
            }
          }

          for (var S = 1; S < 25; S++) {
            var a = e[S],
                m = a.high,
                x = a.low,
                b = h[S];
            if (b < 32) var v = m << b | x >>> 32 - b,
                p = x << b | m >>> 32 - b;else var v = x << b - 32 | m >>> 64 - b,
                p = m << b - 32 | x >>> 64 - b;
            var H = u[l[S]];
            H.high = v, H.low = p;
          }

          var z = u[0],
              A = e[0];
          z.high = A.high, z.low = A.low;

          for (var d = 0; d < 5; d++) {
            for (var _ = 0; _ < 5; _++) {
              var S = d + 5 * _,
                  a = e[S],
                  C = u[S],
                  D = u[(d + 1) % 5 + 5 * _],
                  R = u[(d + 2) % 5 + 5 * _];
              a.high = C.high ^ ~D.high & R.high, a.low = C.low ^ ~D.low & R.low;
            }
          }

          var a = e[0],
              E = f[c];
          a.high ^= E.high, a.low ^= E.low;
        }
      },
      _doFinalize: function _doFinalize() {
        var t = this._data,
            e = t.words,
            i = (8 * this._nDataBytes, 8 * t.sigBytes),
            o = 32 * this.blockSize;
        e[i >>> 5] |= 1 << 24 - i % 32, e[(r.ceil((i + 1) / o) * o >>> 5) - 1] |= 128, t.sigBytes = 4 * e.length, this._process();

        for (var s = this._state, a = this.cfg.outputLength / 8, c = a / 8, h = [], l = 0; l < c; l++) {
          var f = s[l],
              u = f.high,
              d = f.low;
          u = 16711935 & (u << 8 | u >>> 24) | 4278255360 & (u << 24 | u >>> 8), d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), h.push(d), h.push(u);
        }

        return new n.init(h, a);
      },
      clone: function clone() {
        for (var t = o.clone.call(this), r = t._state = this._state.slice(0), e = 0; e < 25; e++) {
          r[e] = r[e].clone();
        }

        return t;
      }
    });
    e.SHA3 = o._createHelper(d), e.HmacSHA3 = o._createHmacHelper(d);
  }(Math), function () {
    function r() {
      return s.create.apply(s, arguments);
    }

    var e = t,
        i = e.lib,
        n = i.Hasher,
        o = e.x64,
        s = o.Word,
        a = o.WordArray,
        c = e.algo,
        h = [r(1116352408, 3609767458), r(1899447441, 602891725), r(3049323471, 3964484399), r(3921009573, 2173295548), r(961987163, 4081628472), r(1508970993, 3053834265), r(2453635748, 2937671579), r(2870763221, 3664609560), r(3624381080, 2734883394), r(310598401, 1164996542), r(607225278, 1323610764), r(1426881987, 3590304994), r(1925078388, 4068182383), r(2162078206, 991336113), r(2614888103, 633803317), r(3248222580, 3479774868), r(3835390401, 2666613458), r(4022224774, 944711139), r(264347078, 2341262773), r(604807628, 2007800933), r(770255983, 1495990901), r(1249150122, 1856431235), r(1555081692, 3175218132), r(1996064986, 2198950837), r(2554220882, 3999719339), r(2821834349, 766784016), r(2952996808, 2566594879), r(3210313671, 3203337956), r(3336571891, 1034457026), r(3584528711, 2466948901), r(113926993, 3758326383), r(338241895, 168717936), r(666307205, 1188179964), r(773529912, 1546045734), r(1294757372, 1522805485), r(1396182291, 2643833823), r(1695183700, 2343527390), r(1986661051, 1014477480), r(2177026350, 1206759142), r(2456956037, 344077627), r(2730485921, 1290863460), r(2820302411, 3158454273), r(3259730800, 3505952657), r(3345764771, 106217008), r(3516065817, 3606008344), r(3600352804, 1432725776), r(4094571909, 1467031594), r(275423344, 851169720), r(430227734, 3100823752), r(506948616, 1363258195), r(659060556, 3750685593), r(883997877, 3785050280), r(958139571, 3318307427), r(1322822218, 3812723403), r(1537002063, 2003034995), r(1747873779, 3602036899), r(1955562222, 1575990012), r(2024104815, 1125592928), r(2227730452, 2716904306), r(2361852424, 442776044), r(2428436474, 593698344), r(2756734187, 3733110249), r(3204031479, 2999351573), r(3329325298, 3815920427), r(3391569614, 3928383900), r(3515267271, 566280711), r(3940187606, 3454069534), r(4118630271, 4000239992), r(116418474, 1914138554), r(174292421, 2731055270), r(289380356, 3203993006), r(460393269, 320620315), r(685471733, 587496836), r(852142971, 1086792851), r(1017036298, 365543100), r(1126000580, 2618297676), r(1288033470, 3409855158), r(1501505948, 4234509866), r(1607167915, 987167468), r(1816402316, 1246189591)],
        l = [];
    !function () {
      for (var t = 0; t < 80; t++) {
        l[t] = r();
      }
    }();
    var f = c.SHA512 = n.extend({
      _doReset: function _doReset() {
        this._hash = new a.init([new s.init(1779033703, 4089235720), new s.init(3144134277, 2227873595), new s.init(1013904242, 4271175723), new s.init(2773480762, 1595750129), new s.init(1359893119, 2917565137), new s.init(2600822924, 725511199), new s.init(528734635, 4215389547), new s.init(1541459225, 327033209)]);
      },
      _doProcessBlock: function _doProcessBlock(t, r) {
        for (var e = this._hash.words, i = e[0], n = e[1], o = e[2], s = e[3], a = e[4], c = e[5], f = e[6], u = e[7], d = i.high, v = i.low, p = n.high, _ = n.low, y = o.high, g = o.low, B = s.high, w = s.low, k = a.high, S = a.low, m = c.high, x = c.low, b = f.high, H = f.low, z = u.high, A = u.low, C = d, D = v, R = p, E = _, M = y, F = g, P = B, W = w, O = k, U = S, I = m, K = x, X = b, L = H, j = z, N = A, T = 0; T < 80; T++) {
          var Z = l[T];
          if (T < 16) var q = Z.high = 0 | t[r + 2 * T],
              G = Z.low = 0 | t[r + 2 * T + 1];else {
            var J = l[T - 15],
                $ = J.high,
                Q = J.low,
                V = ($ >>> 1 | Q << 31) ^ ($ >>> 8 | Q << 24) ^ $ >>> 7,
                Y = (Q >>> 1 | $ << 31) ^ (Q >>> 8 | $ << 24) ^ (Q >>> 7 | $ << 25),
                tt = l[T - 2],
                rt = tt.high,
                et = tt.low,
                it = (rt >>> 19 | et << 13) ^ (rt << 3 | et >>> 29) ^ rt >>> 6,
                nt = (et >>> 19 | rt << 13) ^ (et << 3 | rt >>> 29) ^ (et >>> 6 | rt << 26),
                ot = l[T - 7],
                st = ot.high,
                at = ot.low,
                ct = l[T - 16],
                ht = ct.high,
                lt = ct.low,
                G = Y + at,
                q = V + st + (G >>> 0 < Y >>> 0 ? 1 : 0),
                G = G + nt,
                q = q + it + (G >>> 0 < nt >>> 0 ? 1 : 0),
                G = G + lt,
                q = q + ht + (G >>> 0 < lt >>> 0 ? 1 : 0);
            Z.high = q, Z.low = G;
          }

          var ft = O & I ^ ~O & X,
              ut = U & K ^ ~U & L,
              dt = C & R ^ C & M ^ R & M,
              vt = D & E ^ D & F ^ E & F,
              pt = (C >>> 28 | D << 4) ^ (C << 30 | D >>> 2) ^ (C << 25 | D >>> 7),
              _t = (D >>> 28 | C << 4) ^ (D << 30 | C >>> 2) ^ (D << 25 | C >>> 7),
              yt = (O >>> 14 | U << 18) ^ (O >>> 18 | U << 14) ^ (O << 23 | U >>> 9),
              gt = (U >>> 14 | O << 18) ^ (U >>> 18 | O << 14) ^ (U << 23 | O >>> 9),
              Bt = h[T],
              wt = Bt.high,
              kt = Bt.low,
              St = N + gt,
              mt = j + yt + (St >>> 0 < N >>> 0 ? 1 : 0),
              St = St + ut,
              mt = mt + ft + (St >>> 0 < ut >>> 0 ? 1 : 0),
              St = St + kt,
              mt = mt + wt + (St >>> 0 < kt >>> 0 ? 1 : 0),
              St = St + G,
              mt = mt + q + (St >>> 0 < G >>> 0 ? 1 : 0),
              xt = _t + vt,
              bt = pt + dt + (xt >>> 0 < _t >>> 0 ? 1 : 0);

          j = X, N = L, X = I, L = K, I = O, K = U, U = W + St | 0, O = P + mt + (U >>> 0 < W >>> 0 ? 1 : 0) | 0, P = M, W = F, M = R, F = E, R = C, E = D, D = St + xt | 0, C = mt + bt + (D >>> 0 < St >>> 0 ? 1 : 0) | 0;
        }

        v = i.low = v + D, i.high = d + C + (v >>> 0 < D >>> 0 ? 1 : 0), _ = n.low = _ + E, n.high = p + R + (_ >>> 0 < E >>> 0 ? 1 : 0), g = o.low = g + F, o.high = y + M + (g >>> 0 < F >>> 0 ? 1 : 0), w = s.low = w + W, s.high = B + P + (w >>> 0 < W >>> 0 ? 1 : 0), S = a.low = S + U, a.high = k + O + (S >>> 0 < U >>> 0 ? 1 : 0), x = c.low = x + K, c.high = m + I + (x >>> 0 < K >>> 0 ? 1 : 0), H = f.low = H + L, f.high = b + X + (H >>> 0 < L >>> 0 ? 1 : 0), A = u.low = A + N, u.high = z + j + (A >>> 0 < N >>> 0 ? 1 : 0);
      },
      _doFinalize: function _doFinalize() {
        var t = this._data,
            r = t.words,
            e = 8 * this._nDataBytes,
            i = 8 * t.sigBytes;
        r[i >>> 5] |= 128 << 24 - i % 32, r[(i + 128 >>> 10 << 5) + 30] = Math.floor(e / 4294967296), r[(i + 128 >>> 10 << 5) + 31] = e, t.sigBytes = 4 * r.length, this._process();

        var n = this._hash.toX32();

        return n;
      },
      clone: function clone() {
        var t = n.clone.call(this);
        return t._hash = this._hash.clone(), t;
      },
      blockSize: 32
    });
    e.SHA512 = n._createHelper(f), e.HmacSHA512 = n._createHmacHelper(f);
  }(), function () {
    var r = t,
        e = r.x64,
        i = e.Word,
        n = e.WordArray,
        o = r.algo,
        s = o.SHA512,
        a = o.SHA384 = s.extend({
      _doReset: function _doReset() {
        this._hash = new n.init([new i.init(3418070365, 3238371032), new i.init(1654270250, 914150663), new i.init(2438529370, 812702999), new i.init(355462360, 4144912697), new i.init(1731405415, 4290775857), new i.init(2394180231, 1750603025), new i.init(3675008525, 1694076839), new i.init(1203062813, 3204075428)]);
      },
      _doFinalize: function _doFinalize() {
        var t = s._doFinalize.call(this);

        return t.sigBytes -= 16, t;
      }
    });
    r.SHA384 = s._createHelper(a), r.HmacSHA384 = s._createHmacHelper(a);
  }(), t.lib.Cipher || function (r) {
    var e = t,
        i = e.lib,
        n = i.Base,
        o = i.WordArray,
        s = i.BufferedBlockAlgorithm,
        a = e.enc,
        c = (a.Utf8, a.Base64),
        h = e.algo,
        l = h.EvpKDF,
        f = i.Cipher = s.extend({
      cfg: n.extend(),
      createEncryptor: function createEncryptor(t, r) {
        return this.create(this._ENC_XFORM_MODE, t, r);
      },
      createDecryptor: function createDecryptor(t, r) {
        return this.create(this._DEC_XFORM_MODE, t, r);
      },
      init: function init(t, r, e) {
        this.cfg = this.cfg.extend(e), this._xformMode = t, this._key = r, this.reset();
      },
      reset: function reset() {
        s.reset.call(this), this._doReset();
      },
      process: function process(t) {
        return this._append(t), this._process();
      },
      finalize: function finalize(t) {
        t && this._append(t);

        var r = this._doFinalize();

        return r;
      },
      keySize: 4,
      ivSize: 4,
      _ENC_XFORM_MODE: 1,
      _DEC_XFORM_MODE: 2,
      _createHelper: function () {
        function t(t) {
          return "string" == typeof t ? m : w;
        }

        return function (r) {
          return {
            encrypt: function encrypt(e, i, n) {
              return t(i).encrypt(r, e, i, n);
            },
            decrypt: function decrypt(e, i, n) {
              return t(i).decrypt(r, e, i, n);
            }
          };
        };
      }()
    }),
        u = (i.StreamCipher = f.extend({
      _doFinalize: function _doFinalize() {
        var t = this._process(!0);

        return t;
      },
      blockSize: 1
    }), e.mode = {}),
        d = i.BlockCipherMode = n.extend({
      createEncryptor: function createEncryptor(t, r) {
        return this.Encryptor.create(t, r);
      },
      createDecryptor: function createDecryptor(t, r) {
        return this.Decryptor.create(t, r);
      },
      init: function init(t, r) {
        this._cipher = t, this._iv = r;
      }
    }),
        v = u.CBC = function () {
      function t(t, e, i) {
        var n = this._iv;

        if (n) {
          var o = n;
          this._iv = r;
        } else var o = this._prevBlock;

        for (var s = 0; s < i; s++) {
          t[e + s] ^= o[s];
        }
      }

      var e = d.extend();
      return e.Encryptor = e.extend({
        processBlock: function processBlock(r, e) {
          var i = this._cipher,
              n = i.blockSize;
          t.call(this, r, e, n), i.encryptBlock(r, e), this._prevBlock = r.slice(e, e + n);
        }
      }), e.Decryptor = e.extend({
        processBlock: function processBlock(r, e) {
          var i = this._cipher,
              n = i.blockSize,
              o = r.slice(e, e + n);
          i.decryptBlock(r, e), t.call(this, r, e, n), this._prevBlock = o;
        }
      }), e;
    }(),
        p = e.pad = {},
        _ = p.Pkcs7 = {
      pad: function pad(t, r) {
        for (var e = 4 * r, i = e - t.sigBytes % e, n = i << 24 | i << 16 | i << 8 | i, s = [], a = 0; a < i; a += 4) {
          s.push(n);
        }

        var c = o.create(s, i);
        t.concat(c);
      },
      unpad: function unpad(t) {
        var r = 255 & t.words[t.sigBytes - 1 >>> 2];
        t.sigBytes -= r;
      }
    },
        y = (i.BlockCipher = f.extend({
      cfg: f.cfg.extend({
        mode: v,
        padding: _
      }),
      reset: function reset() {
        f.reset.call(this);
        var t = this.cfg,
            r = t.iv,
            e = t.mode;
        if (this._xformMode == this._ENC_XFORM_MODE) var i = e.createEncryptor;else {
          var i = e.createDecryptor;
          this._minBufferSize = 1;
        }
        this._mode && this._mode.__creator == i ? this._mode.init(this, r && r.words) : (this._mode = i.call(e, this, r && r.words), this._mode.__creator = i);
      },
      _doProcessBlock: function _doProcessBlock(t, r) {
        this._mode.processBlock(t, r);
      },
      _doFinalize: function _doFinalize() {
        var t = this.cfg.padding;

        if (this._xformMode == this._ENC_XFORM_MODE) {
          t.pad(this._data, this.blockSize);

          var r = this._process(!0);
        } else {
          var r = this._process(!0);

          t.unpad(r);
        }

        return r;
      },
      blockSize: 4
    }), i.CipherParams = n.extend({
      init: function init(t) {
        this.mixIn(t);
      },
      toString: function toString(t) {
        return (t || this.formatter).stringify(this);
      }
    })),
        g = e.format = {},
        B = g.OpenSSL = {
      stringify: function stringify(t) {
        var r = t.ciphertext,
            e = t.salt;
        if (e) var i = o.create([1398893684, 1701076831]).concat(e).concat(r);else var i = r;
        return i.toString(c);
      },
      parse: function parse(t) {
        var r = c.parse(t),
            e = r.words;

        if (1398893684 == e[0] && 1701076831 == e[1]) {
          var i = o.create(e.slice(2, 4));
          e.splice(0, 4), r.sigBytes -= 16;
        }

        return y.create({
          ciphertext: r,
          salt: i
        });
      }
    },
        w = i.SerializableCipher = n.extend({
      cfg: n.extend({
        format: B
      }),
      encrypt: function encrypt(t, r, e, i) {
        i = this.cfg.extend(i);
        var n = t.createEncryptor(e, i),
            o = n.finalize(r),
            s = n.cfg;
        return y.create({
          ciphertext: o,
          key: e,
          iv: s.iv,
          algorithm: t,
          mode: s.mode,
          padding: s.padding,
          blockSize: t.blockSize,
          formatter: i.format
        });
      },
      decrypt: function decrypt(t, r, e, i) {
        i = this.cfg.extend(i), r = this._parse(r, i.format);
        var n = t.createDecryptor(e, i).finalize(r.ciphertext);
        return n;
      },
      _parse: function _parse(t, r) {
        return "string" == typeof t ? r.parse(t, this) : t;
      }
    }),
        k = e.kdf = {},
        S = k.OpenSSL = {
      execute: function execute(t, r, e, i) {
        i || (i = o.random(8));
        var n = l.create({
          keySize: r + e
        }).compute(t, i),
            s = o.create(n.words.slice(r), 4 * e);
        return n.sigBytes = 4 * r, y.create({
          key: n,
          iv: s,
          salt: i
        });
      }
    },
        m = i.PasswordBasedCipher = w.extend({
      cfg: w.cfg.extend({
        kdf: S
      }),
      encrypt: function encrypt(t, r, e, i) {
        i = this.cfg.extend(i);
        var n = i.kdf.execute(e, t.keySize, t.ivSize);
        i.iv = n.iv;
        var o = w.encrypt.call(this, t, r, n.key, i);
        return o.mixIn(n), o;
      },
      decrypt: function decrypt(t, r, e, i) {
        i = this.cfg.extend(i), r = this._parse(r, i.format);
        var n = i.kdf.execute(e, t.keySize, t.ivSize, r.salt);
        i.iv = n.iv;
        var o = w.decrypt.call(this, t, r, n.key, i);
        return o;
      }
    });
  }(), t.mode.CFB = function () {
    function r(t, r, e, i) {
      var n = this._iv;

      if (n) {
        var o = n.slice(0);
        this._iv = void 0;
      } else var o = this._prevBlock;

      i.encryptBlock(o, 0);

      for (var s = 0; s < e; s++) {
        t[r + s] ^= o[s];
      }
    }

    var e = t.lib.BlockCipherMode.extend();
    return e.Encryptor = e.extend({
      processBlock: function processBlock(t, e) {
        var i = this._cipher,
            n = i.blockSize;
        r.call(this, t, e, n, i), this._prevBlock = t.slice(e, e + n);
      }
    }), e.Decryptor = e.extend({
      processBlock: function processBlock(t, e) {
        var i = this._cipher,
            n = i.blockSize,
            o = t.slice(e, e + n);
        r.call(this, t, e, n, i), this._prevBlock = o;
      }
    }), e;
  }(), t.mode.ECB = function () {
    var r = t.lib.BlockCipherMode.extend();
    return r.Encryptor = r.extend({
      processBlock: function processBlock(t, r) {
        this._cipher.encryptBlock(t, r);
      }
    }), r.Decryptor = r.extend({
      processBlock: function processBlock(t, r) {
        this._cipher.decryptBlock(t, r);
      }
    }), r;
  }(), t.pad.AnsiX923 = {
    pad: function pad(t, r) {
      var e = t.sigBytes,
          i = 4 * r,
          n = i - e % i,
          o = e + n - 1;
      t.clamp(), t.words[o >>> 2] |= n << 24 - o % 4 * 8, t.sigBytes += n;
    },
    unpad: function unpad(t) {
      var r = 255 & t.words[t.sigBytes - 1 >>> 2];
      t.sigBytes -= r;
    }
  }, t.pad.Iso10126 = {
    pad: function pad(r, e) {
      var i = 4 * e,
          n = i - r.sigBytes % i;
      r.concat(t.lib.WordArray.random(n - 1)).concat(t.lib.WordArray.create([n << 24], 1));
    },
    unpad: function unpad(t) {
      var r = 255 & t.words[t.sigBytes - 1 >>> 2];
      t.sigBytes -= r;
    }
  }, t.pad.Iso97971 = {
    pad: function pad(r, e) {
      r.concat(t.lib.WordArray.create([2147483648], 1)), t.pad.ZeroPadding.pad(r, e);
    },
    unpad: function unpad(r) {
      t.pad.ZeroPadding.unpad(r), r.sigBytes--;
    }
  }, t.mode.OFB = function () {
    var r = t.lib.BlockCipherMode.extend(),
        e = r.Encryptor = r.extend({
      processBlock: function processBlock(t, r) {
        var e = this._cipher,
            i = e.blockSize,
            n = this._iv,
            o = this._keystream;
        n && (o = this._keystream = n.slice(0), this._iv = void 0), e.encryptBlock(o, 0);

        for (var s = 0; s < i; s++) {
          t[r + s] ^= o[s];
        }
      }
    });
    return r.Decryptor = e, r;
  }(), t.pad.NoPadding = {
    pad: function pad() {},
    unpad: function unpad() {}
  }, function (r) {
    var e = t,
        i = e.lib,
        n = i.CipherParams,
        o = e.enc,
        s = o.Hex,
        a = e.format;
    a.Hex = {
      stringify: function stringify(t) {
        return t.ciphertext.toString(s);
      },
      parse: function parse(t) {
        var r = s.parse(t);
        return n.create({
          ciphertext: r
        });
      }
    };
  }(), function () {
    var r = t,
        e = r.lib,
        i = e.BlockCipher,
        n = r.algo,
        o = [],
        s = [],
        a = [],
        c = [],
        h = [],
        l = [],
        f = [],
        u = [],
        d = [],
        v = [];
    !function () {
      for (var t = [], r = 0; r < 256; r++) {
        r < 128 ? t[r] = r << 1 : t[r] = r << 1 ^ 283;
      }

      for (var e = 0, i = 0, r = 0; r < 256; r++) {
        var n = i ^ i << 1 ^ i << 2 ^ i << 3 ^ i << 4;
        n = n >>> 8 ^ 255 & n ^ 99, o[e] = n, s[n] = e;
        var p = t[e],
            _ = t[p],
            y = t[_],
            g = 257 * t[n] ^ 16843008 * n;
        a[e] = g << 24 | g >>> 8, c[e] = g << 16 | g >>> 16, h[e] = g << 8 | g >>> 24, l[e] = g;
        var g = 16843009 * y ^ 65537 * _ ^ 257 * p ^ 16843008 * e;
        f[n] = g << 24 | g >>> 8, u[n] = g << 16 | g >>> 16, d[n] = g << 8 | g >>> 24, v[n] = g, e ? (e = p ^ t[t[t[y ^ p]]], i ^= t[t[i]]) : e = i = 1;
      }
    }();

    var p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
        _ = n.AES = i.extend({
      _doReset: function _doReset() {
        if (!this._nRounds || this._keyPriorReset !== this._key) {
          for (var t = this._keyPriorReset = this._key, r = t.words, e = t.sigBytes / 4, i = this._nRounds = e + 6, n = 4 * (i + 1), s = this._keySchedule = [], a = 0; a < n; a++) {
            if (a < e) s[a] = r[a];else {
              var c = s[a - 1];
              a % e ? e > 6 && a % e == 4 && (c = o[c >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & c]) : (c = c << 8 | c >>> 24, c = o[c >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[255 & c], c ^= p[a / e | 0] << 24), s[a] = s[a - e] ^ c;
            }
          }

          for (var h = this._invKeySchedule = [], l = 0; l < n; l++) {
            var a = n - l;
            if (l % 4) var c = s[a];else var c = s[a - 4];
            l < 4 || a <= 4 ? h[l] = c : h[l] = f[o[c >>> 24]] ^ u[o[c >>> 16 & 255]] ^ d[o[c >>> 8 & 255]] ^ v[o[255 & c]];
          }
        }
      },
      encryptBlock: function encryptBlock(t, r) {
        this._doCryptBlock(t, r, this._keySchedule, a, c, h, l, o);
      },
      decryptBlock: function decryptBlock(t, r) {
        var e = t[r + 1];
        t[r + 1] = t[r + 3], t[r + 3] = e, this._doCryptBlock(t, r, this._invKeySchedule, f, u, d, v, s);
        var e = t[r + 1];
        t[r + 1] = t[r + 3], t[r + 3] = e;
      },
      _doCryptBlock: function _doCryptBlock(t, r, e, i, n, o, s, a) {
        for (var c = this._nRounds, h = t[r] ^ e[0], l = t[r + 1] ^ e[1], f = t[r + 2] ^ e[2], u = t[r + 3] ^ e[3], d = 4, v = 1; v < c; v++) {
          var p = i[h >>> 24] ^ n[l >>> 16 & 255] ^ o[f >>> 8 & 255] ^ s[255 & u] ^ e[d++],
              _ = i[l >>> 24] ^ n[f >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & h] ^ e[d++],
              y = i[f >>> 24] ^ n[u >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & l] ^ e[d++],
              g = i[u >>> 24] ^ n[h >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & f] ^ e[d++];

          h = p, l = _, f = y, u = g;
        }

        var p = (a[h >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[f >>> 8 & 255] << 8 | a[255 & u]) ^ e[d++],
            _ = (a[l >>> 24] << 24 | a[f >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & h]) ^ e[d++],
            y = (a[f >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & l]) ^ e[d++],
            g = (a[u >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & f]) ^ e[d++];

        t[r] = p, t[r + 1] = _, t[r + 2] = y, t[r + 3] = g;
      },
      keySize: 8
    });

    r.AES = i._createHelper(_);
  }(), function () {
    function r(t, r) {
      var e = (this._lBlock >>> t ^ this._rBlock) & r;
      this._rBlock ^= e, this._lBlock ^= e << t;
    }

    function e(t, r) {
      var e = (this._rBlock >>> t ^ this._lBlock) & r;
      this._lBlock ^= e, this._rBlock ^= e << t;
    }

    var i = t,
        n = i.lib,
        o = n.WordArray,
        s = n.BlockCipher,
        a = i.algo,
        c = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
        h = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
        l = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
        f = [{
      0: 8421888,
      268435456: 32768,
      536870912: 8421378,
      805306368: 2,
      1073741824: 512,
      1342177280: 8421890,
      1610612736: 8389122,
      1879048192: 8388608,
      2147483648: 514,
      2415919104: 8389120,
      2684354560: 33280,
      2952790016: 8421376,
      3221225472: 32770,
      3489660928: 8388610,
      3758096384: 0,
      4026531840: 33282,
      134217728: 0,
      402653184: 8421890,
      671088640: 33282,
      939524096: 32768,
      1207959552: 8421888,
      1476395008: 512,
      1744830464: 8421378,
      2013265920: 2,
      2281701376: 8389120,
      2550136832: 33280,
      2818572288: 8421376,
      3087007744: 8389122,
      3355443200: 8388610,
      3623878656: 32770,
      3892314112: 514,
      4160749568: 8388608,
      1: 32768,
      268435457: 2,
      536870913: 8421888,
      805306369: 8388608,
      1073741825: 8421378,
      1342177281: 33280,
      1610612737: 512,
      1879048193: 8389122,
      2147483649: 8421890,
      2415919105: 8421376,
      2684354561: 8388610,
      2952790017: 33282,
      3221225473: 514,
      3489660929: 8389120,
      3758096385: 32770,
      4026531841: 0,
      134217729: 8421890,
      402653185: 8421376,
      671088641: 8388608,
      939524097: 512,
      1207959553: 32768,
      1476395009: 8388610,
      1744830465: 2,
      2013265921: 33282,
      2281701377: 32770,
      2550136833: 8389122,
      2818572289: 514,
      3087007745: 8421888,
      3355443201: 8389120,
      3623878657: 0,
      3892314113: 33280,
      4160749569: 8421378
    }, {
      0: 1074282512,
      16777216: 16384,
      33554432: 524288,
      50331648: 1074266128,
      67108864: 1073741840,
      83886080: 1074282496,
      100663296: 1073758208,
      117440512: 16,
      134217728: 540672,
      150994944: 1073758224,
      167772160: 1073741824,
      184549376: 540688,
      201326592: 524304,
      218103808: 0,
      234881024: 16400,
      251658240: 1074266112,
      8388608: 1073758208,
      25165824: 540688,
      41943040: 16,
      58720256: 1073758224,
      75497472: 1074282512,
      92274688: 1073741824,
      109051904: 524288,
      125829120: 1074266128,
      142606336: 524304,
      159383552: 0,
      176160768: 16384,
      192937984: 1074266112,
      209715200: 1073741840,
      226492416: 540672,
      243269632: 1074282496,
      260046848: 16400,
      268435456: 0,
      285212672: 1074266128,
      301989888: 1073758224,
      318767104: 1074282496,
      335544320: 1074266112,
      352321536: 16,
      369098752: 540688,
      385875968: 16384,
      402653184: 16400,
      419430400: 524288,
      436207616: 524304,
      452984832: 1073741840,
      469762048: 540672,
      486539264: 1073758208,
      503316480: 1073741824,
      520093696: 1074282512,
      276824064: 540688,
      293601280: 524288,
      310378496: 1074266112,
      327155712: 16384,
      343932928: 1073758208,
      360710144: 1074282512,
      377487360: 16,
      394264576: 1073741824,
      411041792: 1074282496,
      427819008: 1073741840,
      444596224: 1073758224,
      461373440: 524304,
      478150656: 0,
      494927872: 16400,
      511705088: 1074266128,
      528482304: 540672
    }, {
      0: 260,
      1048576: 0,
      2097152: 67109120,
      3145728: 65796,
      4194304: 65540,
      5242880: 67108868,
      6291456: 67174660,
      7340032: 67174400,
      8388608: 67108864,
      9437184: 67174656,
      10485760: 65792,
      11534336: 67174404,
      12582912: 67109124,
      13631488: 65536,
      14680064: 4,
      15728640: 256,
      524288: 67174656,
      1572864: 67174404,
      2621440: 0,
      3670016: 67109120,
      4718592: 67108868,
      5767168: 65536,
      6815744: 65540,
      7864320: 260,
      8912896: 4,
      9961472: 256,
      11010048: 67174400,
      12058624: 65796,
      13107200: 65792,
      14155776: 67109124,
      15204352: 67174660,
      16252928: 67108864,
      16777216: 67174656,
      17825792: 65540,
      18874368: 65536,
      19922944: 67109120,
      20971520: 256,
      22020096: 67174660,
      23068672: 67108868,
      24117248: 0,
      25165824: 67109124,
      26214400: 67108864,
      27262976: 4,
      28311552: 65792,
      29360128: 67174400,
      30408704: 260,
      31457280: 65796,
      32505856: 67174404,
      17301504: 67108864,
      18350080: 260,
      19398656: 67174656,
      20447232: 0,
      21495808: 65540,
      22544384: 67109120,
      23592960: 256,
      24641536: 67174404,
      25690112: 65536,
      26738688: 67174660,
      27787264: 65796,
      28835840: 67108868,
      29884416: 67109124,
      30932992: 67174400,
      31981568: 4,
      33030144: 65792
    }, {
      0: 2151682048,
      65536: 2147487808,
      131072: 4198464,
      196608: 2151677952,
      262144: 0,
      327680: 4198400,
      393216: 2147483712,
      458752: 4194368,
      524288: 2147483648,
      589824: 4194304,
      655360: 64,
      720896: 2147487744,
      786432: 2151678016,
      851968: 4160,
      917504: 4096,
      983040: 2151682112,
      32768: 2147487808,
      98304: 64,
      163840: 2151678016,
      229376: 2147487744,
      294912: 4198400,
      360448: 2151682112,
      425984: 0,
      491520: 2151677952,
      557056: 4096,
      622592: 2151682048,
      688128: 4194304,
      753664: 4160,
      819200: 2147483648,
      884736: 4194368,
      950272: 4198464,
      1015808: 2147483712,
      1048576: 4194368,
      1114112: 4198400,
      1179648: 2147483712,
      1245184: 0,
      1310720: 4160,
      1376256: 2151678016,
      1441792: 2151682048,
      1507328: 2147487808,
      1572864: 2151682112,
      1638400: 2147483648,
      1703936: 2151677952,
      1769472: 4198464,
      1835008: 2147487744,
      1900544: 4194304,
      1966080: 64,
      2031616: 4096,
      1081344: 2151677952,
      1146880: 2151682112,
      1212416: 0,
      1277952: 4198400,
      1343488: 4194368,
      1409024: 2147483648,
      1474560: 2147487808,
      1540096: 64,
      1605632: 2147483712,
      1671168: 4096,
      1736704: 2147487744,
      1802240: 2151678016,
      1867776: 4160,
      1933312: 2151682048,
      1998848: 4194304,
      2064384: 4198464
    }, {
      0: 128,
      4096: 17039360,
      8192: 262144,
      12288: 536870912,
      16384: 537133184,
      20480: 16777344,
      24576: 553648256,
      28672: 262272,
      32768: 16777216,
      36864: 537133056,
      40960: 536871040,
      45056: 553910400,
      49152: 553910272,
      53248: 0,
      57344: 17039488,
      61440: 553648128,
      2048: 17039488,
      6144: 553648256,
      10240: 128,
      14336: 17039360,
      18432: 262144,
      22528: 537133184,
      26624: 553910272,
      30720: 536870912,
      34816: 537133056,
      38912: 0,
      43008: 553910400,
      47104: 16777344,
      51200: 536871040,
      55296: 553648128,
      59392: 16777216,
      63488: 262272,
      65536: 262144,
      69632: 128,
      73728: 536870912,
      77824: 553648256,
      81920: 16777344,
      86016: 553910272,
      90112: 537133184,
      94208: 16777216,
      98304: 553910400,
      102400: 553648128,
      106496: 17039360,
      110592: 537133056,
      114688: 262272,
      118784: 536871040,
      122880: 0,
      126976: 17039488,
      67584: 553648256,
      71680: 16777216,
      75776: 17039360,
      79872: 537133184,
      83968: 536870912,
      88064: 17039488,
      92160: 128,
      96256: 553910272,
      100352: 262272,
      104448: 553910400,
      108544: 0,
      112640: 553648128,
      116736: 16777344,
      120832: 262144,
      124928: 537133056,
      129024: 536871040
    }, {
      0: 268435464,
      256: 8192,
      512: 270532608,
      768: 270540808,
      1024: 268443648,
      1280: 2097152,
      1536: 2097160,
      1792: 268435456,
      2048: 0,
      2304: 268443656,
      2560: 2105344,
      2816: 8,
      3072: 270532616,
      3328: 2105352,
      3584: 8200,
      3840: 270540800,
      128: 270532608,
      384: 270540808,
      640: 8,
      896: 2097152,
      1152: 2105352,
      1408: 268435464,
      1664: 268443648,
      1920: 8200,
      2176: 2097160,
      2432: 8192,
      2688: 268443656,
      2944: 270532616,
      3200: 0,
      3456: 270540800,
      3712: 2105344,
      3968: 268435456,
      4096: 268443648,
      4352: 270532616,
      4608: 270540808,
      4864: 8200,
      5120: 2097152,
      5376: 268435456,
      5632: 268435464,
      5888: 2105344,
      6144: 2105352,
      6400: 0,
      6656: 8,
      6912: 270532608,
      7168: 8192,
      7424: 268443656,
      7680: 270540800,
      7936: 2097160,
      4224: 8,
      4480: 2105344,
      4736: 2097152,
      4992: 268435464,
      5248: 268443648,
      5504: 8200,
      5760: 270540808,
      6016: 270532608,
      6272: 270540800,
      6528: 270532616,
      6784: 8192,
      7040: 2105352,
      7296: 2097160,
      7552: 0,
      7808: 268435456,
      8064: 268443656
    }, {
      0: 1048576,
      16: 33555457,
      32: 1024,
      48: 1049601,
      64: 34604033,
      80: 0,
      96: 1,
      112: 34603009,
      128: 33555456,
      144: 1048577,
      160: 33554433,
      176: 34604032,
      192: 34603008,
      208: 1025,
      224: 1049600,
      240: 33554432,
      8: 34603009,
      24: 0,
      40: 33555457,
      56: 34604032,
      72: 1048576,
      88: 33554433,
      104: 33554432,
      120: 1025,
      136: 1049601,
      152: 33555456,
      168: 34603008,
      184: 1048577,
      200: 1024,
      216: 34604033,
      232: 1,
      248: 1049600,
      256: 33554432,
      272: 1048576,
      288: 33555457,
      304: 34603009,
      320: 1048577,
      336: 33555456,
      352: 34604032,
      368: 1049601,
      384: 1025,
      400: 34604033,
      416: 1049600,
      432: 1,
      448: 0,
      464: 34603008,
      480: 33554433,
      496: 1024,
      264: 1049600,
      280: 33555457,
      296: 34603009,
      312: 1,
      328: 33554432,
      344: 1048576,
      360: 1025,
      376: 34604032,
      392: 33554433,
      408: 34603008,
      424: 0,
      440: 34604033,
      456: 1049601,
      472: 1024,
      488: 33555456,
      504: 1048577
    }, {
      0: 134219808,
      1: 131072,
      2: 134217728,
      3: 32,
      4: 131104,
      5: 134350880,
      6: 134350848,
      7: 2048,
      8: 134348800,
      9: 134219776,
      10: 133120,
      11: 134348832,
      12: 2080,
      13: 0,
      14: 134217760,
      15: 133152,
      2147483648: 2048,
      2147483649: 134350880,
      2147483650: 134219808,
      2147483651: 134217728,
      2147483652: 134348800,
      2147483653: 133120,
      2147483654: 133152,
      2147483655: 32,
      2147483656: 134217760,
      2147483657: 2080,
      2147483658: 131104,
      2147483659: 134350848,
      2147483660: 0,
      2147483661: 134348832,
      2147483662: 134219776,
      2147483663: 131072,
      16: 133152,
      17: 134350848,
      18: 32,
      19: 2048,
      20: 134219776,
      21: 134217760,
      22: 134348832,
      23: 131072,
      24: 0,
      25: 131104,
      26: 134348800,
      27: 134219808,
      28: 134350880,
      29: 133120,
      30: 2080,
      31: 134217728,
      2147483664: 131072,
      2147483665: 2048,
      2147483666: 134348832,
      2147483667: 133152,
      2147483668: 32,
      2147483669: 134348800,
      2147483670: 134217728,
      2147483671: 134219808,
      2147483672: 134350880,
      2147483673: 134217760,
      2147483674: 134219776,
      2147483675: 0,
      2147483676: 133120,
      2147483677: 2080,
      2147483678: 131104,
      2147483679: 134350848
    }],
        u = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
        d = a.DES = s.extend({
      _doReset: function _doReset() {
        for (var t = this._key, r = t.words, e = [], i = 0; i < 56; i++) {
          var n = c[i] - 1;
          e[i] = r[n >>> 5] >>> 31 - n % 32 & 1;
        }

        for (var o = this._subKeys = [], s = 0; s < 16; s++) {
          for (var a = o[s] = [], f = l[s], i = 0; i < 24; i++) {
            a[i / 6 | 0] |= e[(h[i] - 1 + f) % 28] << 31 - i % 6, a[4 + (i / 6 | 0)] |= e[28 + (h[i + 24] - 1 + f) % 28] << 31 - i % 6;
          }

          a[0] = a[0] << 1 | a[0] >>> 31;

          for (var i = 1; i < 7; i++) {
            a[i] = a[i] >>> 4 * (i - 1) + 3;
          }

          a[7] = a[7] << 5 | a[7] >>> 27;
        }

        for (var u = this._invSubKeys = [], i = 0; i < 16; i++) {
          u[i] = o[15 - i];
        }
      },
      encryptBlock: function encryptBlock(t, r) {
        this._doCryptBlock(t, r, this._subKeys);
      },
      decryptBlock: function decryptBlock(t, r) {
        this._doCryptBlock(t, r, this._invSubKeys);
      },
      _doCryptBlock: function _doCryptBlock(t, i, n) {
        this._lBlock = t[i], this._rBlock = t[i + 1], r.call(this, 4, 252645135), r.call(this, 16, 65535), e.call(this, 2, 858993459), e.call(this, 8, 16711935), r.call(this, 1, 1431655765);

        for (var o = 0; o < 16; o++) {
          for (var s = n[o], a = this._lBlock, c = this._rBlock, h = 0, l = 0; l < 8; l++) {
            h |= f[l][((c ^ s[l]) & u[l]) >>> 0];
          }

          this._lBlock = c, this._rBlock = a ^ h;
        }

        var d = this._lBlock;
        this._lBlock = this._rBlock, this._rBlock = d, r.call(this, 1, 1431655765), e.call(this, 8, 16711935), e.call(this, 2, 858993459), r.call(this, 16, 65535), r.call(this, 4, 252645135), t[i] = this._lBlock, t[i + 1] = this._rBlock;
      },
      keySize: 2,
      ivSize: 2,
      blockSize: 2
    });
    i.DES = s._createHelper(d);
    var v = a.TripleDES = s.extend({
      _doReset: function _doReset() {
        var t = this._key,
            r = t.words;
        this._des1 = d.createEncryptor(o.create(r.slice(0, 2))), this._des2 = d.createEncryptor(o.create(r.slice(2, 4))), this._des3 = d.createEncryptor(o.create(r.slice(4, 6)));
      },
      encryptBlock: function encryptBlock(t, r) {
        this._des1.encryptBlock(t, r), this._des2.decryptBlock(t, r), this._des3.encryptBlock(t, r);
      },
      decryptBlock: function decryptBlock(t, r) {
        this._des3.decryptBlock(t, r), this._des2.encryptBlock(t, r), this._des1.decryptBlock(t, r);
      },
      keySize: 6,
      ivSize: 2,
      blockSize: 2
    });
    i.TripleDES = s._createHelper(v);
  }(), function () {
    function r() {
      for (var t = this._S, r = this._i, e = this._j, i = 0, n = 0; n < 4; n++) {
        r = (r + 1) % 256, e = (e + t[r]) % 256;
        var o = t[r];
        t[r] = t[e], t[e] = o, i |= t[(t[r] + t[e]) % 256] << 24 - 8 * n;
      }

      return this._i = r, this._j = e, i;
    }

    var e = t,
        i = e.lib,
        n = i.StreamCipher,
        o = e.algo,
        s = o.RC4 = n.extend({
      _doReset: function _doReset() {
        for (var t = this._key, r = t.words, e = t.sigBytes, i = this._S = [], n = 0; n < 256; n++) {
          i[n] = n;
        }

        for (var n = 0, o = 0; n < 256; n++) {
          var s = n % e,
              a = r[s >>> 2] >>> 24 - s % 4 * 8 & 255;
          o = (o + i[n] + a) % 256;
          var c = i[n];
          i[n] = i[o], i[o] = c;
        }

        this._i = this._j = 0;
      },
      _doProcessBlock: function _doProcessBlock(t, e) {
        t[e] ^= r.call(this);
      },
      keySize: 8,
      ivSize: 0
    });
    e.RC4 = n._createHelper(s);
    var a = o.RC4Drop = s.extend({
      cfg: s.cfg.extend({
        drop: 192
      }),
      _doReset: function _doReset() {
        s._doReset.call(this);

        for (var t = this.cfg.drop; t > 0; t--) {
          r.call(this);
        }
      }
    });
    e.RC4Drop = n._createHelper(a);
  }(), t.mode.CTRGladman = function () {
    function r(t) {
      if (255 === (t >> 24 & 255)) {
        var r = t >> 16 & 255,
            e = t >> 8 & 255,
            i = 255 & t;
        255 === r ? (r = 0, 255 === e ? (e = 0, 255 === i ? i = 0 : ++i) : ++e) : ++r, t = 0, t += r << 16, t += e << 8, t += i;
      } else t += 1 << 24;

      return t;
    }

    function e(t) {
      return 0 === (t[0] = r(t[0])) && (t[1] = r(t[1])), t;
    }

    var i = t.lib.BlockCipherMode.extend(),
        n = i.Encryptor = i.extend({
      processBlock: function processBlock(t, r) {
        var i = this._cipher,
            n = i.blockSize,
            o = this._iv,
            s = this._counter;
        o && (s = this._counter = o.slice(0), this._iv = void 0), e(s);
        var a = s.slice(0);
        i.encryptBlock(a, 0);

        for (var c = 0; c < n; c++) {
          t[r + c] ^= a[c];
        }
      }
    });
    return i.Decryptor = n, i;
  }(), function () {
    function r() {
      for (var t = this._X, r = this._C, e = 0; e < 8; e++) {
        a[e] = r[e];
      }

      r[0] = r[0] + 1295307597 + this._b | 0, r[1] = r[1] + 3545052371 + (r[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0, r[2] = r[2] + 886263092 + (r[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0, r[3] = r[3] + 1295307597 + (r[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0, r[4] = r[4] + 3545052371 + (r[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0, r[5] = r[5] + 886263092 + (r[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0, r[6] = r[6] + 1295307597 + (r[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0, r[7] = r[7] + 3545052371 + (r[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0, this._b = r[7] >>> 0 < a[7] >>> 0 ? 1 : 0;

      for (var e = 0; e < 8; e++) {
        var i = t[e] + r[e],
            n = 65535 & i,
            o = i >>> 16,
            s = ((n * n >>> 17) + n * o >>> 15) + o * o,
            h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);
        c[e] = s ^ h;
      }

      t[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0, t[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0, t[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0, t[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0, t[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0, t[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0, t[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0, t[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0;
    }

    var e = t,
        i = e.lib,
        n = i.StreamCipher,
        o = e.algo,
        s = [],
        a = [],
        c = [],
        h = o.Rabbit = n.extend({
      _doReset: function _doReset() {
        for (var t = this._key.words, e = this.cfg.iv, i = 0; i < 4; i++) {
          t[i] = 16711935 & (t[i] << 8 | t[i] >>> 24) | 4278255360 & (t[i] << 24 | t[i] >>> 8);
        }

        var n = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16],
            o = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]];
        this._b = 0;

        for (var i = 0; i < 4; i++) {
          r.call(this);
        }

        for (var i = 0; i < 8; i++) {
          o[i] ^= n[i + 4 & 7];
        }

        if (e) {
          var s = e.words,
              a = s[0],
              c = s[1],
              h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
              l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8),
              f = h >>> 16 | 4294901760 & l,
              u = l << 16 | 65535 & h;
          o[0] ^= h, o[1] ^= f, o[2] ^= l, o[3] ^= u, o[4] ^= h, o[5] ^= f, o[6] ^= l, o[7] ^= u;

          for (var i = 0; i < 4; i++) {
            r.call(this);
          }
        }
      },
      _doProcessBlock: function _doProcessBlock(t, e) {
        var i = this._X;
        r.call(this), s[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, s[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, s[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, s[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;

        for (var n = 0; n < 4; n++) {
          s[n] = 16711935 & (s[n] << 8 | s[n] >>> 24) | 4278255360 & (s[n] << 24 | s[n] >>> 8), t[e + n] ^= s[n];
        }
      },
      blockSize: 4,
      ivSize: 2
    });
    e.Rabbit = n._createHelper(h);
  }(), t.mode.CTR = function () {
    var r = t.lib.BlockCipherMode.extend(),
        e = r.Encryptor = r.extend({
      processBlock: function processBlock(t, r) {
        var e = this._cipher,
            i = e.blockSize,
            n = this._iv,
            o = this._counter;
        n && (o = this._counter = n.slice(0), this._iv = void 0);
        var s = o.slice(0);
        e.encryptBlock(s, 0), o[i - 1] = o[i - 1] + 1 | 0;

        for (var a = 0; a < i; a++) {
          t[r + a] ^= s[a];
        }
      }
    });
    return r.Decryptor = e, r;
  }(), function () {
    function r() {
      for (var t = this._X, r = this._C, e = 0; e < 8; e++) {
        a[e] = r[e];
      }

      r[0] = r[0] + 1295307597 + this._b | 0, r[1] = r[1] + 3545052371 + (r[0] >>> 0 < a[0] >>> 0 ? 1 : 0) | 0, r[2] = r[2] + 886263092 + (r[1] >>> 0 < a[1] >>> 0 ? 1 : 0) | 0, r[3] = r[3] + 1295307597 + (r[2] >>> 0 < a[2] >>> 0 ? 1 : 0) | 0, r[4] = r[4] + 3545052371 + (r[3] >>> 0 < a[3] >>> 0 ? 1 : 0) | 0, r[5] = r[5] + 886263092 + (r[4] >>> 0 < a[4] >>> 0 ? 1 : 0) | 0, r[6] = r[6] + 1295307597 + (r[5] >>> 0 < a[5] >>> 0 ? 1 : 0) | 0, r[7] = r[7] + 3545052371 + (r[6] >>> 0 < a[6] >>> 0 ? 1 : 0) | 0, this._b = r[7] >>> 0 < a[7] >>> 0 ? 1 : 0;

      for (var e = 0; e < 8; e++) {
        var i = t[e] + r[e],
            n = 65535 & i,
            o = i >>> 16,
            s = ((n * n >>> 17) + n * o >>> 15) + o * o,
            h = ((4294901760 & i) * i | 0) + ((65535 & i) * i | 0);
        c[e] = s ^ h;
      }

      t[0] = c[0] + (c[7] << 16 | c[7] >>> 16) + (c[6] << 16 | c[6] >>> 16) | 0, t[1] = c[1] + (c[0] << 8 | c[0] >>> 24) + c[7] | 0, t[2] = c[2] + (c[1] << 16 | c[1] >>> 16) + (c[0] << 16 | c[0] >>> 16) | 0, t[3] = c[3] + (c[2] << 8 | c[2] >>> 24) + c[1] | 0, t[4] = c[4] + (c[3] << 16 | c[3] >>> 16) + (c[2] << 16 | c[2] >>> 16) | 0, t[5] = c[5] + (c[4] << 8 | c[4] >>> 24) + c[3] | 0, t[6] = c[6] + (c[5] << 16 | c[5] >>> 16) + (c[4] << 16 | c[4] >>> 16) | 0, t[7] = c[7] + (c[6] << 8 | c[6] >>> 24) + c[5] | 0;
    }

    var e = t,
        i = e.lib,
        n = i.StreamCipher,
        o = e.algo,
        s = [],
        a = [],
        c = [],
        h = o.RabbitLegacy = n.extend({
      _doReset: function _doReset() {
        var t = this._key.words,
            e = this.cfg.iv,
            i = this._X = [t[0], t[3] << 16 | t[2] >>> 16, t[1], t[0] << 16 | t[3] >>> 16, t[2], t[1] << 16 | t[0] >>> 16, t[3], t[2] << 16 | t[1] >>> 16],
            n = this._C = [t[2] << 16 | t[2] >>> 16, 4294901760 & t[0] | 65535 & t[1], t[3] << 16 | t[3] >>> 16, 4294901760 & t[1] | 65535 & t[2], t[0] << 16 | t[0] >>> 16, 4294901760 & t[2] | 65535 & t[3], t[1] << 16 | t[1] >>> 16, 4294901760 & t[3] | 65535 & t[0]];
        this._b = 0;

        for (var o = 0; o < 4; o++) {
          r.call(this);
        }

        for (var o = 0; o < 8; o++) {
          n[o] ^= i[o + 4 & 7];
        }

        if (e) {
          var s = e.words,
              a = s[0],
              c = s[1],
              h = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
              l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8),
              f = h >>> 16 | 4294901760 & l,
              u = l << 16 | 65535 & h;
          n[0] ^= h, n[1] ^= f, n[2] ^= l, n[3] ^= u, n[4] ^= h, n[5] ^= f, n[6] ^= l, n[7] ^= u;

          for (var o = 0; o < 4; o++) {
            r.call(this);
          }
        }
      },
      _doProcessBlock: function _doProcessBlock(t, e) {
        var i = this._X;
        r.call(this), s[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, s[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, s[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, s[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;

        for (var n = 0; n < 4; n++) {
          s[n] = 16711935 & (s[n] << 8 | s[n] >>> 24) | 4278255360 & (s[n] << 24 | s[n] >>> 8), t[e + n] ^= s[n];
        }
      },
      blockSize: 4,
      ivSize: 2
    });
    e.RabbitLegacy = n._createHelper(h);
  }(), t.pad.ZeroPadding = {
    pad: function pad(t, r) {
      var e = 4 * r;
      t.clamp(), t.sigBytes += e - (t.sigBytes % e || e);
    },
    unpad: function unpad(t) {
      for (var r = t.words, e = t.sigBytes - 1; !(r[e >>> 2] >>> 24 - e % 4 * 8 & 255);) {
        e--;
      }

      t.sigBytes = e + 1;
    }
  }, t;
});

/***/ }),

/***/ 207:
/*!************************************!*\
  !*** ./src/plugInUnit/qiyuPlug.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  methods: {
    // initWeiXinQiyu(){	//初始化小程序客服信息
    // 	let myPluginInterface = requirePlugin('qiyu-plugins');
    // 	let appId = 'NcJyGZOCmMB';
    // 	myPluginInterface.__configAppId(appId);  // 不是微信的appId，是七鱼后台生成的appId
    // 	myPluginInterface._$configAppKey('10aed8b44d059dd84aee0d207c90f313'); // 申请企业的appKey
    // },
    openKefu: function openKefu(qiyuKefuGroupId) {
      uni.navigateTo({
        url: "/pages/webView/index?url=https://mobile.beifamall.com/qiyu.html"
      });
      uni.setStorageSync("webViewQuery", "?sessionId=" + uni.getStorageSync("sessionId") + "&qiyuKefuGroupId=" + qiyuKefuGroupId); // this.$Router.push({
      // 	path:"",
      // 	query:{
      // 		url:"https://mobile.beifamall.com/qiyu.html"
      // 	}
      // })
      // uni.navigateTo({url:"plugin://qiyu-plugins/chat"})
    }
  },
  mounted: function mounted() {// this.initWeiXinQiyu()
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 21:
/*!*********************************!*\
  !*** ./src/api/wechat/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 22));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  wxPubAppId: function wxPubAppId() {
    //获取公众号appid
    return _request.default.post(_url.default.wxPubAppId, {});
  },
  jsSdkAuth: function jsSdkAuth(url) {
    //微信h5分享参数
    return _request.default.get(_url.default.jsSdkAuth, {
      params: {
        url: url
      }
    });
  },
  wechatTemplates: function wechatTemplates(eventCode) {
    //小程序推送消息
    return _request.default.post(_url.default.wechatTemplates, {
      eventCode: eventCode
    });
  }
};
exports.default = _default;

/***/ }),

/***/ 22:
/*!*******************************!*\
  !*** ./src/api/wechat/url.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var wechatApi = {
  wxPubAppId: "/wechat/wxPubAppId",
  //获取微信appid
  jsSdkAuth: "/wechat/jsSdkAuth",
  //微信h5分享参数
  wechatTemplates: "/wechat/get/event/templates" //小程序推送消息

};
var _default = wechatApi;
exports.default = _default;

/***/ }),

/***/ 23:
/*!*********************************!*\
  !*** ./src/api/member/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 24));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  accountLogin: function accountLogin(params) {
    //用户名密码登录 
    return _request.default.post(_url.default.accountLogin, params);
  },
  quickLogin: function quickLogin(params) {
    //快捷登录
    return _request.default.post(_url.default.quickLogin, params);
  },
  captcha: function captcha(params) {
    //获取验证码
    return _request.default.post(_url.default.captcha, params);
  },
  loginInfo: function loginInfo() {
    //获取登录信息
    return _request.default.post(_url.default.loginInfo, {});
  },
  addressList: function addressList() {
    //获取地址列表
    return _request.default.post(_url.default.addressList, {});
  },
  addressDefault: function addressDefault(id) {
    //设为默认地址
    return _request.default.post(_url.default.addressDefault + id);
  },
  addressDetails: function addressDetails(id) {
    //获取地址详情
    return _request.default.post(_url.default.addressDetails + id);
  },
  addressUpdate: function addressUpdate(params) {
    //修改地址
    return _request.default.post(_url.default.addressUpdate, params);
  },
  addressCreate: function addressCreate(params) {
    //创建地址
    return _request.default.post(_url.default.addressCreate, params);
  },
  getDefaultRealnameInfo: function getDefaultRealnameInfo() {
    //实名认证获取窗口
    return _request.default.post(_url.default.getDefaultRealnameInfo, {});
  },
  memberInfo: function memberInfo() {
    //获取个人信息
    return _request.default.post(_url.default.memberInfo, {});
  },
  memberUpdate: function memberUpdate(params) {
    //更新个人信息头像
    return _request.default.post(_url.default.memberUpdate, params);
  },
  account: function account() {
    //账号绑定情况
    return _request.default.post(_url.default.account, {});
  },
  verifyCaptcha: function verifyCaptcha(params) {
    //验证验证码
    return _request.default.post(_url.default.verifyCaptcha, params);
  },
  valMemberPwd: function valMemberPwd(params) {
    //验证登录密码
    return _request.default.post(_url.default.valMemberPwd, params);
  },
  resetMemberPwd: function resetMemberPwd(params) {
    //重置密码
    return _request.default.post(_url.default.resetMemberPwd, params);
  },
  logout: function logout() {
    //退出登录
    return _request.default.post(_url.default.logout, {});
  },
  valPayPwd: function valPayPwd(params) {
    /////验证支付密码（修改支付密码使用）
    return _request.default.post(_url.default.valPayPwd, params);
  },
  resetPayPwd: function resetPayPwd(params) {
    //重置支付密码
    return _request.default.post(_url.default.resetPayPwd, params);
  },
  removeAddress: function removeAddress(id) {
    //删除地址
    return _request.default.post(_url.default.removeAddress + id, {});
  },
  validateCheckin: function validateCheckin() {
    //积分签到判断
    return _request.default.post(_url.default.validateCheckin, {});
  },
  checkinLog: function checkinLog(lastLogId) {
    //签到记录
    return _request.default.post(_url.default.checkinLog + lastLogId, {});
  },
  checkin: function checkin() {
    //签到
    return _request.default.post(_url.default.checkin, {});
  },
  memberPoint: function memberPoint() {
    //获取积分总额
    return _request.default.post(_url.default.memberPoint, {});
  },
  pointCrm: function pointCrm() {
    //用户积分总额
    return _request.default.post(_url.default.pointCrm, {});
  },
  pointConvert: function pointConvert(params) {
    //积分转换
    return _request.default.post(_url.default.pointConvert + params, {});
  },
  pointHistory: function pointHistory(lastLogId) {
    //积分明细
    return _request.default.post(_url.default.pointHistory, {
      lastLogId: lastLogId
    });
  },
  convertLog: function convertLog(params) {
    //转换记录
    return _request.default.post(_url.default.convertLog + params, {});
  },
  setMemberPwd: function setMemberPwd(params) {
    //设置密码
    return _request.default.post(_url.default.setMemberPwd, params);
  },
  bindTelephone: function bindTelephone(params) {
    //绑定手机号
    return _request.default.post(_url.default.bindTelephone, params);
  },
  skipSetMemberPwd: function skipSetMemberPwd(params) {
    //登录时跳过此步骤
    return _request.default.post(_url.default.skipSetMemberPwd, params);
  },
  setPayPwd: function setPayPwd(params) {
    //设置支付密码
    return _request.default.post(_url.default.setPayPwd, params);
  },
  wechatH5Login: function wechatH5Login(code) {
    //微信登录
    return _request.default.get(_url.default.wechatH5Login + code, {});
  },
  wechatMiniLogin: function wechatMiniLogin(code) {
    //小程序登录
    return _request.default.get(_url.default.wechatMiniLogin + code, {});
  },
  wechatMiniAuth: function wechatMiniAuth(params) {
    //小程序登录授权登录
    return _request.default.post(_url.default.wechatMiniAuth, params);
  },
  getPlusUnitInfo: function getPlusUnitInfo(params) {
    //获取超v会员详情
    return _request.default.post(_url.default.getPlusUnitInfo, params);
  },
  getShareInfo: function getShareInfo(params) {
    //会员邀请人权益信息
    return _request.default.post(_url.default.getShareInfo, params);
  },
  plusCreateOrder: function plusCreateOrder(params) {
    //成为会员创建订单
    return _request.default.post(_url.default.plusCreateOrder, params);
  },
  getMemberPlusInfo: function getMemberPlusInfo() {
    //获取会员相关信息
    return _request.default.post(_url.default.getMemberPlusInfo, {});
  },
  verifyShareNumber: function verifyShareNumber(shareCode) {
    //校验邀请码是否正确
    return _request.default.post(_url.default.verifyShareNumber + shareCode, {});
  },
  plusInfo: function plusInfo() {
    //是否是plus  商品详情页使用
    return _request.default.post(_url.default.plusInfo, {});
  },
  getQrCode: function getQrCode() {
    //获取会员邀请码
    return _request.default.post(_url.default.getQrCode, {});
  },
  getBalanceHistory: function getBalanceHistory(params) {
    //账户流水
    return _request.default.post(_url.default.getBalanceHistory, params);
  },
  wechatMiniAuthTelephone: function wechatMiniAuthTelephone(params) {
    //解密手机号
    return _request.default.post(_url.default.wechatMiniAuthTelephone, params);
  },
  wechatMiniBind: function wechatMiniBind(params) {
    //绑定微信
    return _request.default.post(_url.default.wechatMiniBind, params);
  },
  wechatMiniUnBind: function wechatMiniUnBind() {
    //解绑微信
    return _request.default.post(_url.default.wechatMiniUnBind, {});
  },
  wechatH5Bind: function wechatH5Bind(code) {
    //绑定微信 h5
    return _request.default.get(_url.default.wechatH5Bind + code, {});
  },
  wechatH5Unbind: function wechatH5Unbind(code) {
    //h5解绑微信
    return _request.default.get(_url.default.wechatH5Unbind + code, {});
  },
  enterpriseInfo: function enterpriseInfo() {
    //获取企业会员信息
    return _request.default.post(_url.default.enterpriseInfo, {});
  },
  enterpriseInviteInfo: function enterpriseInviteInfo(inviteCode) {
    //获取企业会员邀请人信息
    return _request.default.post(_url.default.enterpriseInviteInfo, {
      inviteCode: inviteCode
    });
  },
  createEnterprise: function createEnterprise(params) {
    //创建或修改企业会员基本信息
    return _request.default.post(_url.default.createEnterprise, params);
  },
  createEnterpriseCode: function createEnterpriseCode(inviteeType) {
    //获取企业会员二维码
    return _request.default.post(_url.default.createEnterpriseCode, {
      inviteeType: inviteeType
    });
  },
  getEnterprise: function getEnterprise(mokaId) {
    //获取企业会员权益信息
    return _request.default.post(_url.default.getEnterprise, {
      mokaId: mokaId
    });
  },
  getEnterpriseResidue: function getEnterpriseResidue(promotionType) {
    //获取企业会员剩余次数
    return _request.default.post(_url.default.getEnterpriseResidue, {
      promotionType: promotionType
    });
  },
  getEnterpriseTotalIncome: function getEnterpriseTotalIncome() {
    //获取企业会员收入
    return _request.default.post(_url.default.getEnterpriseTotalIncome, {});
  },
  getInviterBaseInfoByCode: function getInviterBaseInfoByCode(shareCode) {
    //获取邀请码信息
    return _request.default.post(_url.default.getInviterBaseInfoByCode, {
      shareCode: shareCode
    });
  },
  estimateDetail: function estimateDetail(params) {
    //企业会员预估明细
    return _request.default.post(_url.default.estimateDetail, params);
  },
  createInvoice: function createInvoice(params) {
    //创建发票
    return _request.default.post(_url.default.createInvoice, params);
  },
  updateInvoice: function updateInvoice(params) {
    //修改发票
    return _request.default.post(_url.default.updateInvoice, params);
  },
  getInvoiceDetail: function getInvoiceDetail(invoiceType) {
    //获取发票详情
    return _request.default.post(_url.default.getInvoiceDetail + invoiceType);
  },
  getTypeMemberConfig: function getTypeMemberConfig() {
    //获取会员类型配置集合
    return _request.default.post(_url.default.getTypeMemberConfig);
  },
  getPrivilege: function getPrivilege(type) {
    //获取会员类型对应的权益信息
    return _request.default.post(_url.default.getPrivilege, {
      type: type
    });
  },
  teamInfo: function teamInfo() {
    //用户团队和奖励数据
    return _request.default.post(_url.default.teamInfo, {});
  },
  partnerSummary: function partnerSummary() {
    //邀请的伙伴-伙伴数量统计
    return _request.default.post(_url.default.partnerSummary, {});
  },
  pageMembers: function pageMembers(inviteType, params) {
    //邀请的伙伴-用户列表
    return _request.default.post(_url.default.pageMembers, _objectSpread({
      inviteType: inviteType
    }, params));
  },
  distributorSummary: function distributorSummary() {
    //发展团队-团队数量统计
    return _request.default.post(_url.default.distributorSummary, {});
  },
  pageDistributors: function pageDistributors(inviteType, params) {
    //发展团队-用户列表
    return _request.default.post(_url.default.pageDistributors, _objectSpread({
      inviteType: inviteType
    }, params));
  }
};
exports.default = _default;

/***/ }),

/***/ 24:
/*!*******************************!*\
  !*** ./src/api/member/url.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var memberApi = {
  accountLogin: "/member/accountLogin",
  //用户名密码登录
  quickLogin: "/member/quickLogin",
  //快捷登录
  captcha: "/member/captcha",
  //获取验证码
  loginInfo: "/member/center",
  //获取登录信息
  addressList: "/member/address/lists",
  //获取地址列表
  addressDefault: "/member/address/default/",
  //设为默认地址
  addressDetails: "/member/address/detail/",
  //地址详情
  addressUpdate: "/member/address/update",
  //修改地址
  addressCreate: "/member/address/create",
  //创建地址
  getDefaultRealnameInfo: "/member/identity/getDefaultRealnameInfo",
  //实名认证信息获取窗口
  memberInfo: "member/info",
  //个人信息
  memberUpdate: "member/update",
  //更改个人信息
  account: "/member/account",
  //账号绑定情况
  verifyCaptcha: "/member/verifyCaptcha",
  //验证验证码
  valMemberPwd: "/member/valMemberPwd",
  //验证登录密码
  resetMemberPwd: "/member/resetMemberPwd",
  //重置密码
  setMemberPwd: "/member/setMemberPwd",
  //设置密码
  logout: "/member/logout",
  //退出登录
  valPayPwd: "/member/valPayPwd",
  //验证支付密码（修改支付密码使用）
  resetPayPwd: "/member/resetPayPwd",
  //重置支付密码
  removeAddress: "/member/address/remove/",
  //删除地址
  validateCheckin: "/member/validateCheckin",
  //积分签到判断
  checkinLog: "/member/checkinLog/",
  //签到记录
  checkin: "/member/checkin",
  //签到
  memberPoint: "/member/point/mmg",
  //获取积分总额
  pointCrm: "/member/point/crm",
  //用户积分总额
  pointConvert: "/member/point/convert/",
  //积分转换
  pointHistory: "/member/point/history",
  //积分明细
  convertLog: "/member/point/convertLog/",
  //积分转换记录
  bindTelephone: "/member/bindTelephone",
  //绑定手机号
  skipSetMemberPwd: "/member/skipSetMemberPwd",
  //登录时跳过此步骤
  setPayPwd: "/member/setPayPwd",
  //何止支付密码
  wechatH5Login: "/member/wechatH5Login/",
  //微信登录  h5
  wechatMiniLogin: "/member/wechatMiniLogin/",
  //微信登录
  wechatMiniAuth: "/member/wechatMiniAuth",
  //微信登录授权登录
  getPlusUnitInfo: "/memeber/plus/getPlusUnitInfo",
  //获取vip会员信息
  getShareInfo: "/memeber/plus/getShareInfo",
  //邀请人会员权益信息
  plusCreateOrder: "/memeber/plus/createOrder",
  //会员创建订单
  getMemberPlusInfo: "/memeber/plus/getMemberPlusInfo",
  //获取会员相关信息
  verifyShareNumber: "/memeber/plus/verifyShareNumber/",
  //校验邀请码是否正确
  plusInfo: "/member/plusInfo",
  //判断是否是plus  商品详情页使用
  getQrCode: "/memeber/plus/getQrCode",
  //获取会员邀请码
  getBalanceHistory: "/member/point/getBalanceHistory",
  //账户流水
  wechatMiniAuthTelephone: "/member/wechatMiniAuthTelephone",
  //解密手机号
  wechatMiniBind: "/member/wechatMiniBind",
  //绑定微信
  wechatMiniUnBind: "/member/wechatMiniUnbind",
  //解绑微信
  wechatH5Bind: "/member/wechatH5Bind/",
  //h5绑定微信
  wechatH5Unbind: "/member/wechatH5Unbind/",
  //h5解绑微信
  enterpriseInfo: "/member/enterprise/get/info",
  //获取企业会员信息
  enterpriseInviteInfo: "/member/enterprise/inviterInfo",
  //获取企业会员邀请人信息
  createEnterprise: "/member/enterprise/create/memberInfo",
  //创建或修改企业会员基本信息
  createEnterpriseCode: "/member/enterprise/create/QR",
  //获取企业会员二维码
  getEnterprise: "/member/enterprise/get/privilege",
  //获取会员权益信息
  getEnterpriseResidue: "/member/enterprise/get/privilege/residue",
  //获取企业会员剩余次数
  getEnterpriseTotalIncome: "/member/enterprise/asset/totalIncome",
  //获取企业会员收入
  getInviterBaseInfoByCode: "/inviter/getInviterBaseInfoByCode",
  //获取邀请码信息
  estimateDetail: "/member/enterprise/asset/estimate/detail",
  //企业会员预估明细
  createInvoice: "/member/invoice/create",
  //创建发票
  updateInvoice: "/member/invoice/update",
  //修改发票
  getInvoiceDetail: "/member/invoice/detail/",
  //获取发票详情
  getTypeMemberConfig: "/member/get/type/config",
  //获取会员类型配置集合
  getPrivilege: '/member/get/privilege',
  //获取会员类型对应的权益信息
  teamInfo: "/member/teamInfo",
  //用户团队和奖励数据
  partnerSummary: '/member/invite/partnerSummary',
  //邀请的伙伴-伙伴数量统计
  pageMembers: '/member/invite/pageMembers',
  //邀请的伙伴-用户列表
  distributorSummary: '/member/invite/distributorSummary',
  //发展团队-团队数量统计
  pageDistributors: '/member/invite/pageDistributors' //发展团队-用户列表

};
var _default = memberApi;
exports.default = _default;

/***/ }),

/***/ 25:
/*!************************************!*\
  !*** ./src/api/promotion/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 26));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  getCouponNums: function getCouponNums() {
    //获取已使用 未使用 已过期优惠券的数量
    return _request.default.post(_url.default.getCouponNums);
  },
  getMemberCoupons: function getMemberCoupons(params) {
    //我的优惠券列表
    return _request.default.post(_url.default.getMemberCoupons, params);
  },
  getCouponGoodsList: function getCouponGoodsList(params) {
    //优惠券商品
    return _request.default.post(_url.default.getCouponGoodsList, params);
  },
  getItemCoupons: function getItemCoupons(itemId) {
    //商品详情页 根据item获取优惠券
    return _request.default.post(_url.default.getItemCoupons + itemId, {});
  },
  receiveCoupon: function receiveCoupon(id) {
    //领取优惠券
    return _request.default.post(_url.default.receiveCoupon + id, {});
  },
  getCartStoreCoupons: function getCartStoreCoupons(id) {
    //根据店铺id获取优惠券
    return _request.default.post(_url.default.getCartStoreCoupons + id, {});
  },
  getDecorateCoupons: function getDecorateCoupons(params) {
    //装修页面根据id获取优惠券信息
    return _request.default.post(_url.default.getDecorateCoupons, params);
  },
  exchangeCouponUsePoint: function exchangeCouponUsePoint(params) {
    //积分兑换优惠券
    return _request.default.post(_url.default.exchangeCouponUsePoint, params);
  },
  promotionGoodsList: function promotionGoodsList(params, typeId) {
    //超v会员礼包商品列表 
    return _request.default.post(_url.default.promotionGoodsList, _objectSpread(_objectSpread({}, params), {}, {
      typeId: typeId
    }));
  },
  generatePoster: function generatePoster(params) {
    //分享图
    return _request.default.post(_url.default.generatePoster, params);
  },
  firstOrderRewardConfigInfo: function firstOrderRewardConfigInfo() {
    //邀新注册的奖励配置信息
    return _request.default.post(_url.default.firstOrderRewardConfigInfo, {});
  },
  generateInvitePoster: function generateInvitePoster() {
    //邀新注册生成海报图片
    return _request.default.post(_url.default.generateInvitePoster, {});
  },
  getInviteMemberRewardInfo: function getInviteMemberRewardInfo() {
    //获取用户的邀新奖励信息
    return _request.default.post(_url.default.getInviteMemberRewardInfo, {});
  },
  getLastExpireCoupons: function getLastExpireCoupons() {
    //获取最近一天之内过期的首单优惠券
    return _request.default.post(_url.default.getLastExpireCoupons, {});
  },
  couponCardData: function couponCardData() {
    //获取用户邀新弹窗信息
    return _request.default.post(_url.default.couponCardData, {});
  }
};
exports.default = _default;

/***/ }),

/***/ 256:
/*!************************************!*\
  !*** ./src/pages/refund/status.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  refundStatus: function refundStatus(status) {
    switch (status) {
      case 1:
        return "申请退款";

      case 2:
        return "申请退货";

      case 3:
        return "待寄回商品";

      case 4:
        return "待签收商品";

      case 5:
        return "退款中";

      case 6:
        return "已退款";

      case 7:
        return "退款已拒绝";

      case 8:
        return "退货已拒绝";

      case 9:
        return "已关闭";

      case 10:
        return "平台已拒绝";
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 26:
/*!**********************************!*\
  !*** ./src/api/promotion/url.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var promotionApi = {
  getCouponNums: "/promotion/customer/getCouponNums",
  //获取已使用 未使用 已过期优惠券的数量
  getMemberCoupons: "/promotion/customer/getMemberCoupons",
  //我的优惠券列表
  getCouponGoodsList: "/promotion/customer/getCouponGoodsList",
  //优惠券商品
  getItemCoupons: "/promotion/customer/getItemCoupons/",
  //商品详情页 根据item获取优惠券
  receiveCoupon: "/promotion/customer/receiveCoupon/",
  //领取优惠券
  getCartStoreCoupons: "/promotion/customer/getCartStoreCoupons/",
  //根据店铺id获取优惠券 
  getDecorateCoupons: "/promotion/customer/getDecorateCoupons",
  //装修页根据id获取优惠券信息
  exchangeCouponUsePoint: "/promotion/customer/exchangeCouponUsePoint",
  //积分兑换优惠券
  // promotionGoodsList:"/promotion/app/gift/goods/list",	//超v会员礼包商品列表
  generatePoster: "/promotion/goodsPoster/generate",
  //分享图
  firstOrderRewardConfigInfo: "/promotion/inviteMember/firstOrderRewardConfigInfo",
  //邀新注册的奖励配置信息
  generateInvitePoster: "/promotion/inviteMember/generateInvitePoster",
  //邀新注册生成海报图片
  getInviteMemberRewardInfo: "/promotion/inviteMember/getInviteMemberRewardInfo",
  //获取用户的邀新奖励信息
  getLastExpireCoupons: "/promotion/customer/getLastExpireCoupons",
  //获取最近一天之内过期的首单优惠券
  couponCardData: "/promotion/customer/coupon/card/get/popup/data",
  //获取用户邀新弹窗信息
  promotionGoodsList: "promotion/app/gift/goods/list/new" //员礼包商品列表

};
var _default = promotionApi;
exports.default = _default;

/***/ }),

/***/ 27:
/*!******************************!*\
  !*** ./src/api/app/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 28));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  entranceShow: function entranceShow(id) {
    //商品入口展示接口
    return _request.default.post(_url.default.entranceShow + id, {});
  },
  calcGoodsFreight: function calcGoodsFreight(params) {
    //计算运费
    return _request.default.post(_url.default.calcGoodsFreight, params);
  },
  bugNow: function bugNow(skuId, skuNum, transferOrderId) {
    //判断商品是否可以购买
    return _request.default.post(_url.default.bugNow + skuId + "/" + skuNum + "/" + transferOrderId, {});
  },
  getPromotionItems: function getPromotionItems(params) {
    //获取店铺促销商品
    return _request.default.post(_url.default.getPromotionItems, params);
  },
  getPromotionType: function getPromotionType(storeId) {
    //获取促销tab
    return _request.default.post(_url.default.getPromotionType + storeId, {});
  },
  totalBalance: function totalBalance() {
    //礼卡余额
    return _request.default.post(_url.default.totalBalance, {});
  },
  cardList: function cardList(params) {
    //礼卡列表
    return _request.default.post(_url.default.cardList, params);
  },
  cardOrderList: function cardOrderList(params) {
    //礼卡订单列表
    return _request.default.post(_url.default.cardOrderList, params);
  },
  cardOrderDel: function cardOrderDel(id) {
    //删除订单
    return _request.default.post(_url.default.cardOrderDel + id, {});
  },
  cardOrderCancel: function cardOrderCancel(id) {
    //取消订单
    return _request.default.post(_url.default.cardOrderCancel + id, {});
  },
  consumeLog: function consumeLog(params) {
    //礼卡消费记录
    return _request.default.post(_url.default.consumeLog, params);
  },
  bindCard: function bindCard(params) {
    //绑定礼卡
    return _request.default.post(_url.default.bindCard, params);
  },
  homePopup: function homePopup() {
    //首页弹窗
    return _request.default.post(_url.default.homePopup, {});
  },
  labelList: function labelList() {
    //美礼卡优选列表
    return _request.default.post(_url.default.labelList, {});
  },
  recommendList: function recommendList(params) {
    //美礼卡精心推荐列表
    return _request.default.post(_url.default.recommendList, params);
  },
  carousel: function carousel() {
    //美礼卡推荐列表
    return _request.default.post(_url.default.carousel, {});
  },
  giftCardDetail: function giftCardDetail(params) {
    //购买礼卡详情
    return _request.default.post(_url.default.giftCardDetail, params);
  },
  getStoreItemsList: function getStoreItemsList(cardId) {
    //获取礼卡可用店铺
    return _request.default.post(_url.default.getStoreItemsList + cardId, {});
  },
  orderPlace: function orderPlace(params) {
    //获取卡片详情
    return _request.default.post(_url.default.orderPlace, params);
  },
  orderGoPay: function orderGoPay(params) {
    //礼品卡去付款
    return _request.default.post(_url.default.orderGoPay, params);
  },
  giftcardAmount: function giftcardAmount(cardId) {
    //支付方式详情
    return _request.default.post(_url.default.giftcardAmount + cardId, {});
  },
  getCardItemList: function getCardItemList(cardId, params) {
    //获取礼卡可用商品
    return _request.default.post(_url.default.getCardItemList + cardId, params);
  },
  newPersonInfo: function newPersonInfo() {
    //新人专享活动信息
    return _request.default.post(_url.default.newPersonInfo, {});
  },
  newPersonOrderTips: function newPersonOrderTips() {
    //新人专享下单提示信息
    return _request.default.post(_url.default.newPersonOrderTips, {});
  },
  smsSubject: function smsSubject(typeList) {
    //订阅新人专享过期提醒短信
    return _request.default.post(_url.default.smsSubject, {
      typeList: typeList
    });
  },
  smsSubjectState: function smsSubjectState(typeList) {
    //C端-查询新人专享优惠券订阅状态
    return _request.default.post(_url.default.smsSubjectState, {
      typeList: typeList
    });
  },
  submitDistributor: function submitDistributor(params) {
    //提交成为分销商申请
    return _request.default.post(_url.default.submitDistributor, params);
  },
  getPrivileges: function getPrivileges() {
    //分销商权益信息
    return _request.default.post(_url.default.getPrivileges, {});
  },
  sendCaptcha: function sendCaptcha(telephone) {
    //发送分销商申请验证码短信
    return _request.default.post(_url.default.sendCaptcha, {
      telephone: telephone
    });
  },
  privilegesSummary: function privilegesSummary() {
    //分销商权益的概述信息
    return _request.default.post(_url.default.privilegesSummary, {});
  },
  teamSummary: function teamSummary() {
    //我的团队业绩情况
    return _request.default.post(_url.default.teamSummary, {});
  },
  teamDistributors: function teamDistributors(params) {
    //反展合伙人列表
    return _request.default.post(_url.default.teamDistributors, params);
  },
  teamMembers: function teamMembers(params) {
    //发展会员列表
    return _request.default.post(_url.default.teamMembers, params);
  },
  achievementOrders: function achievementOrders(params) {
    //业绩单查询
    return _request.default.post(_url.default.achievementOrders, params);
  },
  distributorSummary: function distributorSummary() {
    //合伙人信息
    return _request.default.post(_url.default.distributorSummary, {});
  },
  generateInvitePoster: function generateInvitePoster() {
    //合伙人邀请海报
    return _request.default.post(_url.default.generateInvitePoster, {});
  },
  distributorAgreement: function distributorAgreement(id) {
    //合伙人协议
    return _request.default.post(_url.default.distributorAgreement + id, {});
  },
  teamNumbers: function teamNumbers() {
    //团队人数展示
    return _request.default.post(_url.default.teamNumbers, {});
  },
  privilegeItem: function privilegeItem(id) {
    //获取合伙人权益信息
    return _request.default.post(_url.default.privilegeItem + id, {});
  },
  generateInviteMemberPoster: function generateInviteMemberPoster() {
    //获取会员邀请海报
    return _request.default.post(_url.default.generateInviteMemberPoster, {});
  },
  teamFans: function teamFans() {
    //查看会员粉丝列表
    return _request.default.post(_url.default.teamFans, {});
  },
  getAchievementInfo: function getAchievementInfo() {
    return _request.default.post(_url.default.getAchievementInfo, {});
  },
  distributorTypeConfig: function distributorTypeConfig() {
    //获取合伙人配置
    return _request.default.post(_url.default.distributorTypeConfig, {});
  },
  appProvices: function appProvices() {
    //获取一级地址
    return _request.default.post(_url.default.appProvices, {});
  },
  appCities: function appCities(id) {
    //获取二级地址
    return _request.default.post(_url.default.appCities + id, {});
  },
  appCounties: function appCounties(id) {
    //获取三级地址
    return _request.default.post(_url.default.appCounties + id, {});
  },
  distributorStatus: function distributorStatus() {
    //获取合伙人状态
    return _request.default.post(_url.default.distributorStatus, {});
  },
  rewardSummary: function rewardSummary() {
    //我的奖励-奖励统计信息
    return _request.default.post(_url.default.rewardSummary, {});
  },
  pagePerformanceOrder: function pagePerformanceOrder(params) {
    //我的奖励-奖励订单
    return _request.default.post(_url.default.pagePerformanceOrder, params);
  }
};
exports.default = _default;

/***/ }),

/***/ 28:
/*!****************************!*\
  !*** ./src/api/app/url.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var appApi = {
  entranceShow: "/app/goods/entrance/show/",
  //商品入口展示接口
  calcGoodsFreight: "/app/goods/calcGoodsFreight",
  //计算运费
  bugNow: "/app/goods/bugNow/",
  //判断此商品是否能购买
  getPromotionItems: "/app/goods/getPromotionItems",
  //获取店铺促销商品
  getPromotionType: "/app/goods/getPromotionType/",
  //获取促销tab
  totalBalance: "/app/giftcard/mine/totalBalance",
  //美礼卡余额
  cardList: "app/giftcard/mine/cardList",
  //礼卡列表
  cardOrderList: "app/giftcard/order/list",
  //礼卡订单列表
  cardOrderDel: "app/giftcard/order/del/",
  //删除订单
  cardOrderCancel: "/app/giftcard/order/cancel/",
  //确定取消订单
  consumeLog: "app/giftcard/mine/consumeLog",
  //礼卡消费记录
  bindCard: "/app/giftcard/mine/bindCard",
  //绑定礼卡
  homePopup: "/app/home/popup/show",
  //首页弹窗
  labelList: "/app/giftcard/show/labelList",
  //美礼卡优选列表
  recommendList: "/app/giftcard/show/recommendList",
  //美礼卡精心推荐列表
  carousel: "/app/giftcard/show/carousel",
  //美礼卡推荐列表
  giftCardDetail: "/app/giftcard/show/detail",
  //购买礼卡详情
  getStoreItemsList: "/app/giftcard/show/getStoreItemsList/",
  //礼卡可用店铺
  orderPlace: "app/giftcard/order/place",
  //礼卡 下单购买
  orderGoPay: "app/giftcard/order/goPay",
  //去下单
  giftcardAmount: "/app/giftcard/order/amount/",
  //支付方式详情
  getCardItemList: "/app/giftcard/show/getCardItemList/",
  //获取礼卡可用商品
  newPersonInfo: "/app/promotion/newPerson/info",
  //新人专享活动信息
  newPersonOrderTips: "/app/promotion/newPerson/orderTips",
  //新人专享下单提示信息
  smsSubject: "/app/sms/message/subject",
  //订阅新人专享过期提醒短信
  smsSubjectState: "/app/sms/message/subjectState",
  //C端-查询新人专享优惠券订阅状态
  submitDistributor: "/app/distributor/submit",
  //提交成为分销商申请
  getPrivileges: "/app/distributor/privileges",
  //分销商权益信息
  sendCaptcha: "/app/distributor/sendCaptcha",
  //发送分销商申请验证码短信
  privilegesSummary: "/app/distributor/privilegesSummary",
  //分销商权益的概述信息
  teamSummary: "/app/distributor/teamSummary",
  //我的团队
  teamDistributors: "/app/distributor/teamDistributors",
  //发展合伙人列表
  teamMembers: "/app/distributor/teamMembers",
  //发展会员列表
  achievementOrders: '/app/distributor/achievementOrders',
  //业绩单查询
  distributorSummary: "/app/distributor/summary",
  //合伙人信息
  generateInvitePoster: "/app/distributor/generateInvitePoster",
  //合伙人邀请海报
  distributorAgreement: "/app/distributor/agreement/",
  //合伙人协议
  teamNumbers: '/app/distributor/teamNumbers',
  //团队人数展示
  privilegeItem: "/app/distributor/privilegeItem/",
  //获取合伙人权益信息
  generateInviteMemberPoster: "/app/distributor/generateInviteMemberPoster",
  //获取会员邀请海报
  teamFans: "/app/distributor/teamFans",
  //查看会员粉丝列表
  getAchievementInfo: "/app/distributor/getAchievementInfo",
  //获取会员的奖励信息以及业绩政策
  distributorTypeConfig: "/app/distributor/distributorTypeConfig",
  //获取合伙人配置
  appProvices: "/app/distributor/provices",
  //获取省份
  appCities: "/app/distributor/cities/",
  //获取城市
  appCounties: "/app/distributor/counties/",
  //获取区域
  distributorStatus: "/app/distributor/status",
  //获取合伙人状态
  rewardSummary: '/app/distributor/performance/rewardSummary',
  //我的奖励-奖励统计信息
  pagePerformanceOrder: '/app/distributor/performance/pagePerformanceOrder' //我的奖励-奖励订单

};
var _default = appApi;
exports.default = _default;

/***/ }),

/***/ 297:
/*!******************************!*\
  !*** ./src/api/msg/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 298));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  allMsg: function allMsg() {
    //获取所有消息个数
    return _request.default.post(_url.default.allMsg, {});
  },
  readAllMsg: function readAllMsg() {
    //清空所有通知消息
    return _request.default.post(_url.default.readAllMsg, {});
  },
  moduleMessages: function moduleMessages(params) {
    //获取消息信息列表
    return _request.default.post(_url.default.moduleMessages, params);
  },
  unreadCount: function unreadCount() {
    //消息数量
    return _request.default.post(_url.default.unreadCount, {});
  },
  setRead: function setRead(params) {
    //设置已读
    return _request.default.post(_url.default.setRead, params);
  },
  removeModule: function removeModule(moduleType) {
    //消息中心删除
    return _request.default.post(_url.default.removeModule + moduleType, {});
  },
  removeMsg: function removeMsg(params) {
    //删除消息
    return _request.default.post(_url.default.removeMsg, params);
  }
};
exports.default = _default;

/***/ }),

/***/ 298:
/*!****************************!*\
  !*** ./src/api/msg/url.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var msgApi = {
  allMsg: "/msg/all",
  //获取所有消息
  readAllMsg: "/msg/readAll",
  //清空所有通知消息
  moduleMessages: "/msg/moduleMessages",
  //获取消息信息列表
  unreadCount: "/msg/unreadCount",
  //消息数量
  setRead: "/msg/setRead",
  //设置已读
  removeModule: "/msg/removeModule/",
  //消息中心删除
  removeMsg: "/msg/removeMsg" //删除消息

};
var _default = msgApi;
exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 315:
/*!********************************!*\
  !*** ./src/common/js/order.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var orderState = {
  getOrderState: function getOrderState(state) {
    /**获取订单状态*/
    switch (state) {
      case 10:
        return "待支付";

      case 15:
        return "拼团中";

      case 20:
        return "待发货";

      case 30:
        return "待收货";

      case 40:
        return "已收货";

      case 50:
        return "已完成";

      case 60:
        return "已关闭";

      case 0:
        return "已取消";
    }
  },
  getRefundState: function getRefundState(refundState) {
    switch (refundState) {
      case 1:
        return "退款申请中";

      case 2:
        return "退货申请中";

      case 3:
        return "待用户寄回";

      case 4:
        return "待商家签收";

      case 6:
        return "退款成功";

      case 7:
        return "退款已拒绝";

      case 8:
        return "退货已拒绝";

      case 9:
        return "退款关闭";

      case 10:
        return "平台已拒绝";
    }
  },
  getSellerState: function getSellerState(sellerState) {
    switch (sellerState) {
      case 0:
        return "交易关闭";

      case 10:
        return "等待买家付款";

      case 15:
        return "等待卖家发货";

      case 20:
        return "等待卖家发货";

      case 30:
        return "卖家已发货";

      case 40:
        return "已收货";

      case 50:
        return "交易完成";

      case 60:
        return "交易关闭";

      case 70:
        return "交易完成";
    }
  },
  getCustomizationOrderState: function getCustomizationOrderState(state) {
    /**获取订单状态*/
    switch (state) {
      case 10:
        return "待确认";

      case 20:
        return "待付款";

      case 30:
        return "生产中";

      case 40:
        return "待收货";

      case 50:
        return "已收货";

      case 60:
        return "已完成";

      case 70:
        return "已关闭";

      case 80:
        return "待评价";

      case 0:
        return "已取消";
    }
  }
};
var _default = orderState;
exports.default = _default;

/***/ }),

/***/ 33:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 34:
/*!*****************************!*\
  !*** ./src/router/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _uniSimpleRouter = _interopRequireDefault(__webpack_require__(/*! uni-simple-router */ 35));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_uniSimpleRouter.default); //初始化


var router = new _uniSimpleRouter.default({
  encodeURI: false,
  detectBeforeLock: function detectBeforeLock() {
    router.$lockStatus = false;
  },
  // 配置解锁[重要]
  routes: [{"path":"/pages/index/index"},{"path":"/pages/category/index"},{"path":"/pages/cart/index","meta":{"requireAuth":true}},{"path":"/pages/my/index"},{"path":"/pages/order/index","meta":{"requireAuth":true}},{"path":"/pages/login/index"},{"path":"/pages/registerSetPassword/index"},{"path":"/pages/setting/index","meta":{"requireAuth":true}},{"path":"/pages/refundLogistics/index","meta":{"requireAuth":true}},{"path":"/pages/storeImpression/index"},{"path":"/pages/goodsList/index"},{"path":"/pages/goodsDetails/index"},{"path":"/pages/goodsCustomized/index"},{"path":"/pages/address/index","meta":{"requireAuth":true}},{"path":"/pages/createAddress/index","meta":{"requireAuth":true}},{"path":"/pages/logisticsDetails/index","meta":{"requireAuth":true}},{"path":"/pages/settlement/index","meta":{"requireAuth":true}},{"path":"/pages/shop/index"},{"path":"/pages/refund/index","meta":{"requireAuth":true}},{"path":"/pages/refundDetails/index","meta":{"requireAuth":true}},{"path":"/pages/search/index"},{"path":"/pages/shopSearchList/index"},{"path":"/pages/shopList/index"},{"path":"/pages/news/index","meta":{"requireAuth":true}},{"path":"/pages/messageLogistics/index","meta":{"requireAuth":true}},{"path":"/pages/orderDetails/index","meta":{"requireAuth":true}},{"path":"/pages/shopSearch/index"},{"path":"/pages/commentSuccess/index","meta":{"requireAuth":true}},{"path":"/pages/payment/index","meta":{"requireAuth":true}},{"path":"/pages/pay/index","meta":{"requireAuth":true}},{"path":"/pages/renovation/index"},{"path":"/pages/phoneCheck/index"},{"path":"/pages/modifyPwdForLogin/index"},{"path":"/pages/modifyPwdLogin/index"},{"path":"/pages/authorization/index"},{"path":"/pages/webView/index"},{"path":"/pages/cryptoguard/index"},{"path":"/pages/editLoginPassword/index"},{"path":"/pages/editPayPassword/index"},{"path":"/pages/setPwdForPay/index"},{"path":"/pages/forgetPassword/index"},{"path":"/pages/resetPassword/index"},{"path":"/pages/editPayPsw/index"},{"path":"/pages/bindAccount/index"},{"path":"/pages/integralDetailed/index"},{"path":"/pages/integralRule/index"},{"path":"/pages/shopMoneyRule/index"},{"path":"/pages/shopMoneyDetails/index","meta":{"requireAuth":true}},{"path":"/pages/giftCardRecord/index","meta":{"requireAuth":true}},{"path":"/pages/aboutMe/index"},{"path":"/pages/myGiftCardOrderList/index","meta":{"requireAuth":true}},{"path":"/pages/giftCardGoods/index","meta":{"requireAuth":true}},{"path":"/pages/searchCardGoods/index","meta":{"requireAuth":true}},{"path":"/pages/myGiftList/index","meta":{"requireAuth":true}},{"path":"/pages/couponGoods/index","meta":{"requireAuth":true}},{"path":"/pages/collection/index","meta":{"requireAuth":true}},{"path":"/pages/follow/index","meta":{"requireAuth":true}},{"path":"/pages/footprint/index","meta":{"requireAuth":true}},{"path":"/pages/seckillZone/index"},{"path":"/pages/systemNotice/index"},{"path":"/pages/editNickName/index","meta":{"requireAuth":true}},{"path":"/pages/integral/index","meta":{"requireAuth":true}},{"path":"/pages/coupon/index","meta":{"requireAuth":true}},{"path":"/pages/shopMoney/index","meta":{"requireAuth":true}},{"path":"/pages/giftCard/index","meta":{"requireAuth":true}},{"path":"/pages/giftCardList/index"},{"path":"/pages/giftCardDetails/index"},{"path":"/pages/cardStoreList/index"},{"path":"/pages/signIn/index","meta":{"requireAuth":true}},{"path":"/pages/memberGiftBag/index"},{"path":"/pages/changeCellPhone/index"},{"path":"/pages/incomeMoney/index","meta":{"requireAuth":true}},{"path":"/pages/incomeList/index","meta":{"requireAuth":true}},{"path":"/pages/messagePromotion/index","meta":{"requireAuth":true}},{"path":"/pages/shopCode/index"},{"path":"/pages/storeLicence/index"},{"path":"/pages/confidentiality/index"},{"path":"/pages/applyAfterSale/index","meta":{"requireAuth":true}},{"path":"/pages/publishEvaluate/index","meta":{"requireAuth":true}},{"path":"/pages/userInfo/index","meta":{"requireAuth":true}},{"path":"/pages/giftFillInOrder/index","meta":{"requireAuth":true}},{"path":"/pages/giftCardPay/index","meta":{"requireAuth":true}},{"path":"/pages/promotionDetails/index","meta":{"requireAuth":true}},{"path":"/pages/modal/index"},{"path":"/pages/increase/index","meta":{"requireAuth":true}},{"path":"/pages/equityCard/index","meta":{"requireAuth":true}},{"path":"/pages/giftBagReceive/index"},{"path":"/pages/settlement/increase","meta":{"requireAuth":true}},{"path":"/pages/moneySavingCard/pay","meta":{"requireAuth":true}},{"path":"/pages/invoice/index","meta":{"requireAuth":true}},{"path":"/pages/customizationOrder/index","meta":{"requireAuth":true}},{"path":"/pages/customizationOrder/cashier","meta":{"requireAuth":true}},{"path":"/pages/customizationOrder/paySuccess","meta":{"requireAuth":true}},{"path":"/pages/customizationOrder/makeSure","meta":{"requireAuth":true}},{"path":"/pages/customizationOrder/detail","meta":{"requireAuth":true}},{"path":"/pages/withdraw/index","meta":{"requireAuth":true}},{"path":"/pages/withdraw/records","meta":{"requireAuth":true}},{"path":"/pages/myInviterCode/index"},{"path":"/copartner/recordsRevenue/index","meta":{"requireAuth":true}},{"path":"/copartner/order/index","meta":{"requireAuth":true}},{"path":"/copartner/joinPartner/index"},{"path":"/copartner/policy/index"},{"path":"/copartner/inviteCode/index","meta":{"requireAuth":true}},{"path":"/copartner/inviters/index","meta":{"requireAuth":true}},{"path":"/copartner/teams/index","meta":{"requireAuth":true}}] //路由表

}); //全局路由前置守卫

router.beforeEach(function (to, from, next) {
  if (to.meta && to.meta.requireAuth) {
    if (uni.getStorageSync("sessionId")) {
      next();
    } else {
      next("/pages/login/index");
    }
  } else {
    next();
  }
}); // 全局路由后置守卫

router.afterEach(function (to, from) {});
var _default = router;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 340:
/*!***********************************!*\
  !*** ./src/api/customer/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 341));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  cardPurchase: function cardPurchase(params) {
    //购买省钱卡
    return _request.default.post(_url.default.cardPurchase, params);
  },
  getConfig: function getConfig() {
    //获取省钱卡配置
    return _request.default.post(_url.default.getConfig, {});
  },
  getUserCard: function getUserCard() {
    //获取用户省钱卡信息
    return _request.default.post(_url.default.getUserCard, {});
  },
  payGuide: function payGuide() {
    //订单支付后引导用户开省钱卡
    return _request.default.post(_url.default.payGuide, {});
  },
  getUsedCoupon: function getUsedCoupon(params) {
    //获取省钱卡优惠券关联的订单
    return _request.default.post(_url.default.getUsedCoupon, params);
  },
  orderDuring: function orderDuring(params) {
    //获取用户省钱卡期间的订单数据
    return _request.default.post(_url.default.orderDuring, params);
  },
  receiveCoupon: function receiveCoupon(couponTemplateId) {
    //领取优惠券
    return _request.default.post(_url.default.receiveCoupon, {
      couponTemplateId: couponTemplateId
    });
  },
  pushSwtich: function pushSwtich() {
    //开启或取消向用户短信提醒
    return _request.default.post(_url.default.pushSwtich, {});
  },
  rollDisplay: function rollDisplay() {
    //获取滚动展示数据信息
    return _request.default.post(_url.default.rollDisplay, {});
  },
  authSms: function authSms() {
    // 用户授权开启短信提醒
    return _request.default.post(_url.default.authSms, {});
  },
  createQR: function createQR() {
    // 生成省钱卡分享小程序二维码
    return _request.default.post(_url.default.createQR, {});
  }
};
exports.default = _default;

/***/ }),

/***/ 341:
/*!*********************************!*\
  !*** ./src/api/customer/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var customerApi = {
  cardPurchase: "/promotion/customer/coupon/card/purchase",
  //购买省钱卡
  getConfig: "/promotion/customer/coupon/card/get/config",
  //获取省钱卡配置
  getUserCard: '/promotion/customer/coupon/card/get/user/card',
  //获取用户省钱卡信息
  payGuide: '/promotion/customer/coupon/card/after/pay/guide',
  //订单支付后引导用户开省钱卡
  getUsedCoupon: '/promotion/customer/coupon/card/used/coupon',
  //获取省钱卡优惠券关联的订单
  orderDuring: '/promotion/customer/coupon/card/order/during',
  //获取用户省钱卡期间的订单数据
  receiveCoupon: '/promotion/customer/coupon/card/receive/coupon',
  //领取优惠券
  pushSwtich: '/promotion/customer/coupon/card/sms/push/swtich',
  //开启或取消向用户短信提醒
  rollDisplay: '/promotion/customer/coupon/card/get/roll/display',
  //获取滚动展示数据信息
  authSms: '/promotion/customer/coupon/card/auth/sms',
  //用户授权开启短信提醒
  createQR: '/promotion/customer/coupon/card/create/QR' //生成省钱卡分享小程序二维码

};
var _default = customerApi;
exports.default = _default;

/***/ }),

/***/ 35:
/*!*************************************************!*\
  !*** ./node_modules/uni-simple-router/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouterMount = exports.default = void 0;

var _util = __webpack_require__(/*! ./helpers/util */ 36);

var _navJump = _interopRequireDefault(__webpack_require__(/*! ./helpers/navJump */ 40));

var _util2 = __webpack_require__(/*! ./vueRouter/util */ 52);

var _util3 = __webpack_require__(/*! ./appRouter/util */ 45);

var _util4 = __webpack_require__(/*! ./appletsRouter/util */ 48);

var _config = __webpack_require__(/*! ./helpers/config */ 37);

var _warn = __webpack_require__(/*! ./helpers/warn */ 39);

var _hooks = __webpack_require__(/*! ./lifeCycle/hooks */ 56);

var _base = __webpack_require__(/*! ./vueRouter/base */ 38);

var _appletsPatch = _interopRequireDefault(__webpack_require__(/*! ./patch/applets-patch */ 57));

var _appPatch = _interopRequireDefault(__webpack_require__(/*! ./patch/app-patch */ 58));

var _mixins = _interopRequireDefault(__webpack_require__(/*! ./helpers/mixins */ 59));

var _urlQuery = _interopRequireDefault(__webpack_require__(/*! ./helpers/urlQuery */ 63));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var H5PATCH = null;
var parseQuery = new _urlQuery.default();
_config.Global.H5RouterReady = new Promise(function (resolve) {
  return _config.Global.RouterReadyPromise = resolve;
});

var Router = /*#__PURE__*/function () {
  function Router(arg) {
    _classCallCheck(this, Router);

    Router.$root = this;
    _config.Global.Router = this; // 全局缓存一个对象，不必使用时都传递

    _config.Global.$parseQuery = parseQuery;
    this.CONFIG = (0, _util.formatConfig)(arg);
    this.lifeCycle = _config.lifeCycle;

    _hooks.registerRouterHooks.call(this); // 注册全局Router生命钩子


    if ((0, _util.appPlatform)() === 'H5') {
      H5PATCH.setLoadingStatus(this.CONFIG.h5);
    }
  }

  _createClass(Router, [{
    key: "push",

    /** 动态的导航到一个新 URL 保留浏览历史
    * navigateTo
    * @param {Object} rule
    */
    value: function push(rule) {
      _navJump.default.call(this, rule, 'push');
    }
    /** 动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
    * redirectTo
    * @param {Object} rule
    */

  }, {
    key: "replace",
    value: function replace(rule) {
      _navJump.default.call(this, rule, 'replace');
    }
    /** 动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
    * 	reLaunch
    * @param {Object} rule
    */

  }, {
    key: "replaceAll",
    value: function replaceAll(rule) {
      _navJump.default.call(this, rule, 'replaceAll');
    }
    /** 动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
    * @param {Object} rule
    */

  }, {
    key: "pushTab",
    value: function pushTab(rule) {
      _navJump.default.call(this, rule, 'pushTab');
    }
    /**
    * 返回到指定层级页面上
     * @param {Number} backLayer 需要返回的页面层级 默认 1
     * @param {Object} delta 暂时无用
     * @param {enforce} 是否强制越过跳转加锁检查 默认 false
    */

  }, {
    key: "back",
    value: function back() {
      var backLayer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var delta = arguments.length > 1 ? arguments[1] : undefined;
      var enforce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (backLayer.constructor != Number) {
        return (0, _warn.err)("\u8FD4\u56DE\u5C42\u7EA7\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2ANumber\u7C7B\u578B\u4E14\u5FC5\u987B\u5927\u4E8E1\uFF1A".concat(backLayer));
      }

      _navJump.default.call(this, {
        backLayer: backLayer,
        delta: delta,
        H5PATCH: H5PATCH
      }, 'back', true, enforce);
    }
    /**
    * 获取当前页面下的 Route 信息
    *
    * @param {Object} Vim 当前开发者可以传递一个 vue 组件对象 来获取当前下的 Route 信息
    */

  }, {
    key: "getPageRoute",
    value: function getPageRoute(Vim) {
      var pages = getCurrentPages();

      switch ((0, _util.appPlatform)(true)) {
        case 'H5':
          return _util2.H5GetPageRoute.call(this, pages, Vim);

        case 'APP':
          return (0, _util3.APPGetPageRoute)(pages, Vim);

        case 'APPLETS':
          return (0, _util4.AppletsPageRoute)(pages, Vim);

        default:
          break;
      }
    }
  }, {
    key: "beforeEach",
    value: function beforeEach(fn) {
      return (0, _hooks.registerHook)(this.lifeCycle.beforeHooks, fn);
    }
  }, {
    key: "afterEach",
    value: function afterEach(fn) {
      return (0, _hooks.registerHook)(this.lifeCycle.afterHooks, fn);
    }
  }, {
    key: "$Route",
    get: function get() {
      return this.getPageRoute();
    }
    /**
     * 获取 url 参数帮助类实例
     */

  }, {
    key: "$parseQuery",
    get: function get() {
      return _config.Global.$parseQuery;
    }
    /**
     * 获取当前是否处于正在跳转的状态
     * H5 状态下始终为false
     */

  }, {
    key: "$lockStatus",
    get: function get() {
      return _config.Global.LockStatus;
    }
    /**
     * 动态设置拦截状态
     */
    ,
    set: function set(status) {
      (0, _warn.warn)('你确定要这么做？你知道后果？', true);
      _config.Global.LockStatus = status;
    }
  }]);

  return Router;
}();

Router.install = function (Vue) {
  (0, _mixins.default)(Vue, Router);
  Object.defineProperty(Vue.prototype, '$Router', {
    get: function get() {
      return Router.$root;
    }
  });
  Object.defineProperty(Vue.prototype, '$Route', {
    get: function get() {
      return Router.$root.getPageRoute(this);
    }
  });
};

var _default = Router;
/**
 *
 * @param {VueComponent } Vim vue实例对象
 * @param {dom} el	dom节点选择器
 */

exports.default = _default;

var RouterMount = function RouterMount(Vim, el) {
  switch ((0, _util.appPlatform)(true)) {
    case 'APP':
      (0, _appPatch.default)(Vim, el);
      break;

    case 'APPLETS':
      (0, _appletsPatch.default)(Vim, el);
      break;

    case 'H5':
      _base.vueMount.push({
        Vim: Vim,
        el: el
      });

      break;

    default:
      (0, _warn.warn)('糟糕！！！还有其他的执行环境？？？没听说过啊。一脸懵逼？？？加QQ群问问：769241495');
      break;
  }
};

exports.RouterMount = RouterMount;

/***/ }),

/***/ 350:
/*!**********************************!*\
  !*** ./src/api/payment/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 351));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  buildMiniPrepPaySign: function buildMiniPrepPaySign(params) {
    //获取微信小程序支付信息
    return _request.default.post(_url.default.buildMiniPrepPaySign, params);
  },
  buildPrepPaySign: function buildPrepPaySign(params) {
    //微信公众号支付
    return _request.default.post(_url.default.buildPrepPaySign, params);
  }
};
exports.default = _default;

/***/ }),

/***/ 351:
/*!********************************!*\
  !*** ./src/api/payment/url.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var payMentApi = {
  buildMiniPrepPaySign: "/payment/wechat/buildMiniPrepPaySign",
  //获取微信小程序支付信息
  buildPrepPaySign: "/payment/wechat/buildPrepPaySign" //微信公众号支付

};
var _default = payMentApi;
exports.default = _default;

/***/ }),

/***/ 36:
/*!********************************************************!*\
  !*** ./node_modules/uni-simple-router/helpers/util.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyObject = exports.formatURLQuery = exports.resolveRule = exports.exactRule = exports.parseQuery = exports.parseQueryD = exports.parseQueryN = exports.filter = exports.formatConfig = exports.noop = exports.appPlatform = exports.isObject = exports.isH5 = void 0;

var _config = __webpack_require__(/*! ./config */ 37);

var _base = __webpack_require__(/*! ../vueRouter/base */ 38);

var _warn = __webpack_require__(/*! ./warn */ 39);

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 当前是不是H5运行环境
 */
var isH5 = function isH5() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
};
/**
 * 判断当前变量是否为Object
 * @param {Object} strObj
 */


exports.isH5 = isH5;

var isObject = function isObject(strObj) {
  return strObj.toString() === '[object Object]' && strObj.constructor === Object;
};
/**
 * 获取当前运行平台
 * @param {Boolean} applets 默认false  true时所有小程序平台统一返回 APPLETS
 */


exports.isObject = isObject;

var appPlatform = function appPlatform() {
  var applets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var platform = '';
  platform = 'WEIXIN';

  if (applets) {
    platform = 'APPLETS';
  }

  return platform;
};
/**
 * 定义一个空方法 如果最后一个参数为true则打印所有参数
 * @param  {...any} args
 */


exports.appPlatform = appPlatform;

var noop = function noop() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args[args.length - 1] === true) {
    (0, _warn.log)(args);
  }
};
/**
 * 格式化基础配置信息 通过new Router传递过来的参数
 */


exports.noop = noop;

var formatConfig = function formatConfig(userConfig) {
  if (!userConfig.routes || userConfig.routes.constructor !== Array) {
    return (0, _warn.err)("\u8DEF\u7531\u53C2\u6570 'routes' \u5FC5\u987B\u4F20\u9012 \r\n\r\n".concat(JSON.stringify(userConfig)));
  }

  if (userConfig.h5 != null && userConfig.h5.constructor !== Object) {
    return (0, _warn.err)("h5\u53C2\u6570\u4F20\u9012\u9519\u8BEF\uFF0C\u5E94\u8BE5\u662F\u4E00\u4E2A 'Object' \u7C7B\u578B \u793A\u4F8B\uFF1A\r\n\r\n".concat(JSON.stringify(_config.baseConfig.h5)));
  }

  var config = Object.create(null);
  var baseConfigKeys = Object.keys(_config.baseConfig);

  for (var i = 0; i < baseConfigKeys.length; i += 1) {
    var key = baseConfigKeys[i];

    if (userConfig[key] != null) {
      if (userConfig[key].constructor === Object) {
        config[key] = _objectSpread(_objectSpread({}, _config.baseConfig[key]), userConfig[key]);
      } else if (key == 'routes') {
        // 需要加入已知的白名单
        config[key] = [].concat(_toConsumableArray(_config.baseConfig[key]), _toConsumableArray(userConfig[key]), _toConsumableArray(_base.builtIn));
      } else {
        config[key] = userConfig[key];
      }
    } else {
      config[key] = _config.baseConfig[key];
    }
  }

  return config;
};

exports.formatConfig = formatConfig;

var filter = function filter(str) {
  str += '';
  str = str.replace(/%/g, '%25');
  str = str.replace(/\+/g, '%2B');
  str = str.replace(/ /g, '%20');
  str = str.replace(/\//g, '%2F');
  str = str.replace(/\?/g, '%3F');
  str = str.replace(/&/g, '%26');
  str = str.replace(/=/g, '%3D');
  str = str.replace(/#/g, '%23');
  return str;
};
/**
 * 使用encodeURI:true的情况	需要进行编码后再传递，解码等等 可以传递深度对象并会在路径后面加入一个query=
 *
 * @param {String} routerName //路径名称
 * @param {JSON} query 	//需要格式化参数
 * @param {Boolean} Encode 	//是获取还是编码后传递
 */


exports.filter = filter;

var parseQueryN = function parseQueryN(routerName, query, Encode) {
  if (Encode) {
    return {
      url: routerName,
      query: JSON.parse(decodeURIComponent(query.replace(/^query=/, '')))
    };
  }

  return {
    url: routerName,
    query: "query=".concat(encodeURIComponent(JSON.stringify(query)))
  };
};
/**
 * 使用encodeURI:false的情况 直接格式化为普通的queryURl参数形式传递即可 扁平深度对象
 *
 * @param {String} routerName //路径名称
 * @param {JSON} query 	//需要格式化参数
 * @param {Boolean} Encode 	//是获取还是编码后传递
 */


exports.parseQueryN = parseQueryN;

var parseQueryD = function parseQueryD(routerName, query, Encode) {
  if (Encode) {
    var obj = {};
    var reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;

    while (reg.exec(query)) {
      obj[RegExp.$1] = RegExp.$2;
    }

    return {
      url: routerName,
      query: obj
    };
  }

  var encodeArr = [];
  var queryKeys = Object.keys(query);

  for (var i = 0; i < queryKeys.length; i += 1) {
    var attr = queryKeys[i];
    var encodeStr = '';

    if (query[attr].constructor == Object) {
      encodeStr = parseQueryD(routerName, query[attr], Encode).query;
      encodeArr.push(encodeStr);
    } else {
      encodeStr = filter(query[attr]);
      encodeArr.push("".concat(attr, "=").concat(encodeStr));
    }
  }

  return {
    url: routerName,
    query: encodeArr.join('&')
  };
};
/**
 * @param {String} routerName //路径名称
 * @param {JSON} query 	//需要格式化参数
 * @param {Boolean} Encode 	//是获取还是编码后传递
 */


exports.parseQueryD = parseQueryD;

var parseQuery = function parseQuery(routerName, query) {
  var Encode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (_config.Global.Router.CONFIG.encodeURI) {
    return parseQueryN(routerName, query, Encode);
  }

  return parseQueryD(routerName, query, Encode);
};

exports.parseQuery = parseQuery;

var exactRule = function exactRule(cloneRule, routes, ruleKey) {
  var getRule = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var params = {};
  var i = 0; // eslint-disable-next-line

  while (true) {
    var item = routes[i];

    if (item == null) {
      if (!getRule) {
        (0, _warn.err)("\u8DEF\u7531\u8868\u4E2D\u672A\u67E5\u627E\u5230 '".concat(ruleKey, "' \u4E3A '").concat(cloneRule[ruleKey], "'"));
      }

      return {
        path: '',
        name: ''
      };
    }

    if (item[ruleKey] != null && item[ruleKey] === cloneRule[ruleKey]) {
      if (!getRule) {
        params.url = item.path;
        params.rule = item;

        if (isH5()) {
          // 如果是h5 则使用优先使用自定义路径名称
          params.url = item.aliasPath || item.path;
        }

        return params;
      }

      return item;
    }

    i += 1;
  }
};

exports.exactRule = exactRule;

var resolveRule = function resolveRule(router, rule) {
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var ruleKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'path';
  var ruleInfo = (0, _config.route)(exactRule(_objectSpread({}, rule), router.CONFIG.routes, ruleKey, router));
  return _objectSpread(_objectSpread({}, ruleInfo), {}, {
    query: query
  });
};
/**
 * 把一些不必要的参数进行格式化掉，完成url的美观
 * @param {String} URLQuery URL中传递的参数
 */


exports.resolveRule = resolveRule;

var formatURLQuery = function formatURLQuery(URLQuery) {
  switch (URLQuery.trim()) {
    case 'query=%7B%7D':
    case '%7B%7D':
    case '?query=%7B%7D':
    case '?':
    case '?[object Object]':
    case '?query={}':
      URLQuery = '';
      break;

    default:
      (0, _warn.warn)('url已经很完美啦，不需要格式化！');
      break;
  }

  return URLQuery;
};
/**
 * 拷贝对象
 * @param {Object} object
 */


exports.formatURLQuery = formatURLQuery;

var copyObject = function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
};

exports.copyObject = copyObject;

/***/ }),

/***/ 37:
/*!**********************************************************!*\
  !*** ./node_modules/uni-simple-router/helpers/config.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.route = exports.appletsConfig = exports.uniAppHook = exports.Global = exports.lifeCycle = exports.H5FnTypeToggle = exports.methods = exports.baseConfig = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var baseConfig = {
  h5: {
    rewriteFun: true,
    // 是否对uni-app reLaunch/navigateBack 两个方法重写 处理uni刷新直接返回到首页和触发路由守卫
    paramsToQuery: false,
    // h5端上通过params传参时规则是vue-router 刷新会丢失 开启此开关将变成?连接的方式
    loading: true,
    // 是否显示加载动画
    hinderTab: false,
    // 是否拦截uni-app自带底部菜单   TODO
    vueRouterDev: false,
    // 完全使用采用vue-router的开发模式
    useUniConfig: true,
    // 是否采用在pages.json下的所有页面配置信息,false时需开发者自行设置页面
    keepUniIntercept: false,
    // 保留uni-app使用vue-router的拦截器
    vueNext: false,
    // 在next管道函数中是否获取vueRouter next的原本参数
    replaceStyle: false,
    // 是否对resetStyle函数中返回的style节点进行全部替换，否则为追加
    resetStyle: function resetStyle() {
      return JSON.parse('{}');
    },
    // 自定义加载样式函数 可返回一个包涵 html、style、script 的对象来重置Router内置的加载动画
    mode: 'hash',
    base: '/',
    linkActiveClass: 'router-link-active',
    linkExactActiveClass: 'router-link-exact-active',
    scrollBehavior: function scrollBehavior(to, from, savedPostion) {
      return savedPostion;
    },
    fallback: true
  },
  APP: {
    holdTabbar: true,
    // 是否开启底部菜单拦截
    loddingPageStyle: function loddingPageStyle() {
      return JSON.parse('{"backgroundColor":"#FFF"}');
    },
    // 当前等待页面的样式 必须返回一个json
    loddingPageHook: function loddingPageHook(view) {
      plus.navigator.closeSplashscreen();
      view.show();
    },
    // 刚刚打开页面处于等待状态,会触发此事件
    animation: {
      animationType: 'pop-in',
      animationDuration: 300
    },
    // 页面切换动画
    switchPageOutTime: 1000 // 最高能忍耐的页面切换时间 达到此时间 不管切换有没有完成都会显示页面出来 这对启动页帮助很大

  },
  debugger: false,
  // 是否处于开发阶段 设置为true则打印日志
  encodeURI: true,
  // 是否对url传递的参数进行编码
  routerBeforeEach: function routerBeforeEach() {},
  // router 前置路由函数 每次触发跳转前先会触发此函数
  routerAfterEach: function routerAfterEach() {},
  // router 后置路由函数 每次触发跳转后会触发此函数
  routes: []
};
exports.baseConfig = baseConfig;
var methods = {
  push: 'navigateTo',
  replace: 'redirectTo',
  replaceAll: 'reLaunch',
  pushTab: 'switchTab',
  back: 'navigateBack'
};
exports.methods = methods;
var H5FnTypeToggle = {
  push: 'push',
  replace: 'replace',
  replaceAll: 'replace',
  pushTab: 'replace'
};
exports.H5FnTypeToggle = H5FnTypeToggle;
var lifeCycle = {
  beforeHooks: [],
  afterHooks: [],
  routerHooks: [],
  routerbeforeHooks: [],
  // 内部跳转前生命周期
  routerAfterHooks: [] // 内部跳转后生命周期

};
exports.lifeCycle = lifeCycle;
var Global = {
  // 缓存一些必要的对象，作为全局可以访问的参数
  $parseQuery: null,
  // url query 帮助类实例
  Router: {},
  vueRouter: {},
  addedRoutes: [],
  // 用于缓存用户动态添加的路由
  RouterReadyPromise: function RouterReadyPromise() {},
  H5RouterReady: null,
  // 当前router是否就绪
  backLayerC: 1,
  // 返回api调用时开发者传递的 delta
  LockStatus: false // 当前是否正在进行跳转 正在跳转调用api是不给跳转的

};
exports.Global = Global;
var uniAppHook = {
  indexVue: {},
  // 首页 组件对象
  toutiaoIndexThis: {},
  // 头条小程序Index this对象
  appVue: {},
  // 同getApp()获取到的对象一毛一样的  其实就是app.vue组件
  onLaunch: {
    fun: [],
    args: {},
    isHijack: false
  },
  // 这两个是app.vue
  onShow: {
    fun: [],
    args: {},
    isHijack: false
  },
  variationFuns: ['onReady', 'onUnload'],
  // 一些uni-app的变异方法 需要处理下
  waitHooks: {},
  // 首页等待中的生命钩子 一些需要等待的Hooks,就是在页面没有进来之前一些提前触发的生命钩子 主要是用户已经声明好的
  indexCallHooks: ['onLoad', 'onReady', 'created', 'onShow'],
  // 在首页首次启动时需要触发的生命周期
  needHooks: ['onLoad', 'onReady', 'onShow', 'created', 'onHide', 'onUnload', 'onResize'],
  // 首页需要拦截的生命钩子
  pageReady: false,
  onLaunched: false // 否触发onLaunch事件

};
exports.uniAppHook = uniAppHook;
var appletsConfig = {
  // 小程序端的一些路由所需配置
  onLaunchEd: false // 当前小程序端是否触发onLaunch事件

};
exports.appletsConfig = appletsConfig;

var route = function route() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _objectSpread(_objectSpread({}, object), {}, {
    params: {},
    query: {}
  });
};

exports.route = route;

/***/ }),

/***/ 38:
/*!**********************************************************!*\
  !*** ./node_modules/uni-simple-router/vueRouter/base.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vueMount = exports.vuelifeHooks = exports.builtIn = void 0;
var builtIn = [{
  path: '/preview-image',
  name: 'previewImage',
  component: {
    render: function render() {}
  }
}, {
  path: '/choose-location',
  name: 'chooseLocation',
  component: {
    render: function render() {}
  }
}, {
  path: '/open-location',
  name: 'openLocation',
  component: {
    render: function render() {}
  }
}]; // uni-app内置路由

exports.builtIn = builtIn;
var vuelifeHooks = {
  // vueRouter的原始生命周期
  beforeHooks: [],
  afterHooks: []
};
exports.vuelifeHooks = vuelifeHooks;
var vueMount = []; // 使用内部对象保留实例化下的appVue,并使用Router进行挂载触发第一次路由钩子

exports.vueMount = vueMount;

/***/ }),

/***/ 39:
/*!********************************************************!*\
  !*** ./node_modules/uni-simple-router/helpers/warn.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warnLock = exports.log = exports.warn = exports.err = void 0;

var _config = __webpack_require__(/*! ./config */ 37);

var isLog = function isLog(type, errText, enforce) {
  if (!enforce) {
    var dev = _config.Global.Router.CONFIG.debugger;
    var isObject = dev.toString() === '[object Object]';

    if (dev === false) {
      return false;
    }

    if (dev === false) {
      return false;
    }

    if (isObject) {
      if (dev[type] === false) {
        return false;
      }
    }
  }
  /* eslint no-console:"off" */


  console[type](errText);
};

var err = function err(errInfo) {
  var enforce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isLog('error', errInfo, enforce);
};

exports.err = err;

var warn = function warn(errInfo) {
  var enforce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isLog('warn', errInfo, enforce);
};

exports.warn = warn;

var log = function log(errInfo) {
  var enforce = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  isLog('log', errInfo, enforce);
};

exports.log = log;

var warnLock = function warnLock(errInfo) {
  console.warn(errInfo);
};

exports.warnLock = warnLock;

/***/ }),

/***/ 4:
/*!************************!*\
  !*** ./src/pages.json ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!***********************************************************!*\
  !*** ./node_modules/uni-simple-router/helpers/navJump.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = __webpack_require__(/*! ./util */ 36);

var _config = __webpack_require__(/*! ./config */ 37);

var _hooks = __webpack_require__(/*! ../appRouter/hooks */ 41);

var _hooks2 = __webpack_require__(/*! ../appletsRouter/hooks */ 47);

var _uniNav = _interopRequireDefault(__webpack_require__(/*! ../appRouter/uniNav */ 46));

var _appletsNav = _interopRequireDefault(__webpack_require__(/*! ../appletsRouter/appletsNav */ 50));

var _warn = __webpack_require__(/*! ./warn */ 39);

var _routerNav = _interopRequireDefault(__webpack_require__(/*! ../vueRouter/routerNav */ 51));

var compile = _interopRequireWildcard(__webpack_require__(/*! ./compile */ 49));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 返回api 触发的公共函数
 * @param {Object/String} rule  当前跳转规则
 * @param {String} fnType    跳转页面的类型方法
 *
 * this 为当前 Router 实例
 */
var isBcakNav = function isBcakNav(_ref) {
  var _this = this;

  var backLayer = _ref.backLayer,
      delta = _ref.delta,
      H5PATCH = _ref.H5PATCH;
  compile.H5(function () {
    H5PATCH.on('historyBack', {
      backLayer: backLayer,
      delta: delta
    });
  });
  compile.APP(function () {
    _config.Global.backLayerC = backLayer; // 告诉路由需要返回几层

    uni.navigateBack({
      delta: backLayer,
      complete: function complete() {
        _config.Global.LockStatus = false; // 跳转完成解锁状态
      }
    });
  });
  compile.mp(function () {
    _hooks2.backCallHook.call(_this, backLayer, function () {
      uni.navigateBack({
        delta: backLayer
      });
    });
  });
};
/**
 * 非 返回api 触发的公共函数
 * @param {Object/String} rule  当前跳转规则
 * @param {String} fnType    跳转页面的类型方法
 *
 * this 为当前 Router 实例
 */


var notBackNav = function notBackNav(rule, fnType) {
  if (rule == null) {
    return (0, _warn.err)('跳转规则为空，不允许这样操作');
  }

  if (rule.constructor === String) {
    // 单独 path 的情况   允许？拼接参数
    var ruleArray = rule.split('?');

    if (ruleArray.length > 1) {
      rule = {
        path: ruleArray[0],
        query: _config.Global.$parseQuery.parse(ruleArray[1])
      };
    }
  }

  switch ((0, _util.appPlatform)(true)) {
    case 'H5':
      return _routerNav.default.call(this, _config.H5FnTypeToggle[fnType], rule, _config.methods[fnType]);

    case 'APP':
      _config.Global.LockStatus = true; // 设置为锁住状态

      return _hooks.transitionTo.call(this, rule, fnType, _uniNav.default);

    case 'APPLETS':
      _config.Global.LockStatus = true; // 设置为锁住状态

      return _hooks2.appletsTransitionTo.call(this, rule, fnType, _appletsNav.default);

    default:
      (0, _warn.err)('糟糕！！！还有其他的执行环境？？？没听说过啊。一脸懵逼？？？加QQ群问问：769241495');
      break;
  }
};
/**
 * 处理正在跳转的公共api
 * @param {Object/String} rule  当前跳转规则
 * @param {String} fnType    跳转页面的类型方法
 * @param {Boolean} isBack  是否通过 back() api 调用的 默认为false
 * @param {Boolean} enforce 是否强制越过跳转加锁检查 默认false  目前只有back() api 传递了
 *
 * this 为当前 Router 实例
 */


var navjump = function navjump(rule, fnType) {
  var isBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var enforce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (_config.Global.LockStatus && !enforce) {
    // 正在跳转的状态下 给出提示正在跳转
    return (0, _warn.warn)('当前页面正在处于跳转状态，请稍后再进行跳转....');
  }

  if (isBack) {
    // 是返回api触发的
    return isBcakNav.call(this, rule, fnType);
  }

  return notBackNav.call(this, rule, fnType);
};

var _default = navjump;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 41:
/*!***********************************************************!*\
  !*** ./node_modules/uni-simple-router/appRouter/hooks.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beforeTabHooks = exports.triggerLifeCycle = exports.transitionTo = exports.backApiCallHook = exports.beforeBackHooks = exports.proxyIndexHook = exports.proxyLaunchHook = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 42));

var _config = __webpack_require__(/*! ../helpers/config */ 37);

var _util = __webpack_require__(/*! ./util */ 45);

var _util2 = __webpack_require__(/*! ../helpers/util */ 36);

var _warn = __webpack_require__(/*! ../helpers/warn */ 39);

var _uniNav = _interopRequireDefault(__webpack_require__(/*! ./uniNav */ 46));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var startBack = false; // 主要是兼容低端手机返回卡 然后多次返回直接提示退出的问题

/**
 * 还原并执行所有 拦截下来的生命周期 app.vue 及 index 下的生命周期
 * @param {Boolean} callHome // 是否触发首页的生命周期
 *
 * this 为当前 page 对象
 */

var callwaitHooks = function callwaitHooks(callHome) {
  var _this = this;

  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {
      var variation, appVue, indexVue, onLaunch, onShow, waitHooks, variationFuns, indexCallHooks, app, key, _loop, _key;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              variation = []; // 存储一下在uni-app上的变异生命钩子  奇葩的要死

              appVue = _config.uniAppHook.appVue, indexVue = _config.uniAppHook.indexVue, onLaunch = _config.uniAppHook.onLaunch, onShow = _config.uniAppHook.onShow, waitHooks = _config.uniAppHook.waitHooks, variationFuns = _config.uniAppHook.variationFuns, indexCallHooks = _config.uniAppHook.indexCallHooks;
              app = appVue.$options;
              _context.next = 5;
              return onLaunch.fun[onLaunch.fun.length - 1].call(appVue, onLaunch.args);

            case 5:
              // 确保只执行最后一个 并且强化异步操作
              onShow.fun[onShow.fun.length - 1].call(appVue, onShow.args); // onshow 不保证异步 直接确保执行最后一个

              if (callHome) {
                // 触发首页生命周期
                // eslint-disable-next-line
                for (key in waitHooks) {
                  if (indexCallHooks.includes(key)) {
                    // 只有在被包含的情况下才执行
                    _util.callAppHook.call(_this, waitHooks[key].fun);
                  }
                }
              }

              if (onLaunch.isHijack) {
                // 还原 onLaunch生命钩子
                app.onLaunch.splice(app.onLaunch.length - 1, 1, onLaunch.fun[0]);
              }

              if (onShow.isHijack) {
                // 继续还原 onShow
                app.onShow.splice(app.onShow.length - 1, 1, onShow.fun[0]);
              } // eslint-disable-next-line


              _loop = function _loop(_key) {
                // 还原 首页下的生命钩子
                var item = waitHooks[_key];

                if (item.isHijack) {
                  if (variationFuns.includes(_key)) {
                    // 变异方法
                    variation.push({
                      key: _key,
                      fun: item.fun[0]
                    });
                  } else {
                    var indeHooks = indexVue[_key]; // 修复 https://github.com/SilurianYang/uni-simple-router/issues/76

                    setTimeout(function () {
                      // 异步延迟还原 不然 uni-app 给给触发了
                      indeHooks.splice(indeHooks.length - 1, 1, item.fun[0]);
                    }, 50);
                  }
                }
              };

              for (_key in waitHooks) {
                _loop(_key);
              }

              resolve(variation);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};
/**
 * 还原剩下的奇葩生命钩子
 * @param {Object} variation 当前uni-app中的一些变异方法  奇葩生命钩子
 */


var callVariationHooks = function callVariationHooks(variation) {
  for (var i = 0; i < variation.length; i += 1) {
    var _variation$i = variation[i],
        key = _variation$i.key,
        fun = _variation$i.fun;
    var indeHooks = _config.uniAppHook.indexVue[key];
    indeHooks.splice(indeHooks.length - 1, 1, fun);
  }
};
/**
 * 主要是对app.vue下onLaunch和onShow生命周期进行劫持
 *
 * this 为当前 page 对象
 */


var proxyLaunchHook = function proxyLaunchHook() {
  var _this2 = this;

  var _this$$options = this.$options,
      onLaunch = _this$$options.onLaunch,
      onShow = _this$$options.onShow;
  _config.uniAppHook.appVue = this; // 缓存 当前app.vue组件对象

  if (onLaunch.length > 1) {
    // 确保有写 onLaunch 可能有其他混入 那也办法
    _config.uniAppHook.onLaunch.isHijack = true;
    _config.uniAppHook.onLaunch.fun = onLaunch.splice(onLaunch.length - 1, 1, function (arg) {
      _config.uniAppHook.onLaunch.args = arg;
    }); // 替换uni-app自带的生命周期
  }

  if (onShow.length > 0) {
    _config.uniAppHook.onShow.isHijack = true;
    _config.uniAppHook.onShow.fun = onShow.splice(onShow.length - 1, 1, function (arg) {
      _config.uniAppHook.onShow.args = arg;

      if (_config.uniAppHook.pageReady) {
        // 因为还有app切前台后台的操作
        _util.callAppHook.call(_this2, _config.uniAppHook.onShow.fun, arg);
      }
    }); // 替换替换 都替换
  }
};
/**
 * 把指定页面的生命钩子函数保存并替换
 * this 为当前 page 对象
 */


exports.proxyLaunchHook = proxyLaunchHook;

var proxyIndexHook = function proxyIndexHook(Router) {
  var needHooks = _config.uniAppHook.needHooks,
      waitHooks = _config.uniAppHook.waitHooks;
  var options = this.$options;
  _config.uniAppHook.indexVue = options;

  for (var i = 0; i < needHooks.length; i += 1) {
    var key = needHooks[i];

    if (options[key] != null) {
      // 只劫持开发者声明的生命周期
      var length = options[key].length; // eslint-disable-next-line

      var whObject = waitHooks[key] = {};
      whObject.fun = options[key].splice(length - 1, 1, _util2.noop); // 把实际的页面生命钩子函数缓存起来,替换原有的生命钩子

      whObject.isHijack = true;
    }
  } // eslint-disable-next-line


  triggerLifeCycle.call(this, Router); // 接着 主动我们触发导航守卫
};
/**
 * 触发全局beforeHooks 生命钩子
 * @param {Object} _from // from  参数
 * @param {Object} _to  // to 参数
 *
 * this 为当前 Router 对象
 */


exports.proxyIndexHook = proxyIndexHook;

var beforeHooks = function beforeHooks(_from, _to) {
  var _this3 = this;

  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {
      var beforeHooksFun;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              beforeHooksFun = _this3.lifeCycle.beforeHooks[0];

              if (!(beforeHooksFun == null)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", resolve());

            case 3:
              _context2.next = 5;
              return beforeHooksFun.call(_this3, _to, _from, resolve);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};
/**
 * 触发全局afterEachHooks 生命钩子
 * @param {Object} _from // from  参数
 * @param {Object} _to  // to 参数
 *
 * this 为当前 Router 对象
 */


var afterEachHooks = function afterEachHooks(_from, _to) {
  var afterHooks = this.lifeCycle.afterHooks[0];

  if (afterHooks != null && afterHooks.constructor === Function) {
    afterHooks.call(this, _to, _from);
  }
};
/**
 * 触发全局 beforeEnter 生命钩子
 * @param {Object} finalRoute 	// 当前格式化后的路由参数
 * @param {Object} _from // from  参数
 * @param {Object} _to  // to 参数
 *
 * this 为当前 Router 对象
 */


var beforeEnterHooks = function beforeEnterHooks(finalRoute, _from, _to) {
  var _this4 = this;

  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve) {
      var beforeEnter;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              beforeEnter = finalRoute.route.beforeEnter;

              if (!(beforeEnter == null || beforeEnter.constructor !== Function)) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", resolve());

            case 3:
              _context3.next = 5;
              return beforeEnter.call(_this4, _to, _from, resolve);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
};
/**
 * 触发返回事件公共方法
 * @param {Object} page	用getPages获取到的页面栈对象
 * @param {Object} options 	当前vue页面对象
 * @param {Object} backLayerC	需要返回页面的层级
   *
 * this 为当前 Router 对象
 */


var backCallHook = function backCallHook(page, options) {
  var _this5 = this;

  var backLayerC = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var route = (0, _util.APPGetPageRoute)([page]);
  var NAVTYPE = 'RouterBack'; // eslint-disable-next-line

  transitionTo.call(this, {
    path: route.path,
    query: route.query
  }, NAVTYPE, function (finalRoute, fnType) {
    if (fnType != NAVTYPE) {
      // 返回时的api如果有next到其他页面 那么必须带上NAVTYPE  不相同则表示需要跳转到其他页面
      return (0, _uniNav.default)(finalRoute, fnType);
    }

    if (startBack) {
      // 如果当前处于正在返回的状态
      return (0, _warn.warn)('当前处于正在返回的状态，请稍后再试！');
    }

    startBack = true; // 标记开始返回

    options.onBackPress = [_util2.noop]; // 改回uni-app可执行的状态

    setTimeout(function () {
      _this5.back(backLayerC, undefined, true); // 越过加锁验证


      startBack = false; // 返回结束
    });
  });
};
/**
 * 处理返回按钮的生命钩子
 * @param {Object} options 当前 vue 组件对象下的$options对象
 * @param {Array} args  当前页面是点击头部返回还是底部返回
 *
 * this 为当前 Router 对象
 */


var beforeBackHooks = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(options, args) {
    var isNext, page;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _util.getPageOnBeforeBack)(args);

          case 2:
            isNext = _context4.sent;

            if (!(isNext === false)) {
              _context4.next = 6;
              break;
            }

            // onBeforeBack  返回了true 阻止了跳转
            _config.Global.LockStatus = false; // 也需要解锁

            return _context4.abrupt("return", false);

          case 6:
            page = (0, _util.getPages)(-3); // 上一个页面对象

            backCallHook.call(this, page, options);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function beforeBackHooks(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * 处理back api的生命钩子
 * @param {Object} options 当前 vue 组件对象下的$options对象
 * @param {Array} args  当前页面是点击头部返回还是底部返回
 *
 * this 为当前 Router 对象
 */


exports.beforeBackHooks = beforeBackHooks;

var backApiCallHook = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(options, args) {
    var backLayerC, pages, page;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _util.getPageOnBeforeBack)(args);

          case 2:
            backLayerC = _config.Global.backLayerC;
            pages = (0, _util.getPages)();
            page = null;

            if (backLayerC > pages.length - 1 || backLayerC == pages.length - 1) {
              // 返回的首页 我们需要显示tabbar拦截
              // eslint-disable-next-line
              page = pages[0];
            } else {
              page = pages[pages.length - 2];
            }

            backCallHook.call(this, page, options, backLayerC);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function backApiCallHook(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 *  v1.5.4+
 * beforeRouteLeave 生命周期
 * @param {Object} to       将要去的那个页面 to对象
 * @param {Object} from     从那个页面触发的 from对象
 *  @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
 * this 为当前 Router 对象
 */


exports.backApiCallHook = backApiCallHook;

var beforeRouteLeaveHooks = function beforeRouteLeaveHooks(from, to, leaveHook) {
  return new Promise(function (resolve) {
    if (leaveHook) {
      // 我们知道这个是来自页面beforeRouteLeave next到其他地方，所有不必再执行啦
      (0, _warn.warn)('beforeRouteLeave next到其他地方，无须再执行！');
      return resolve();
    }

    if (from.path == to.path) {
      // 进入首页的时候不触发
      return resolve();
    }

    var currentPage = (0, _util.getPages)(-2); // 获取到全部的页面对象

    var callThis = (0, _util.getPageVmOrMp)(currentPage); // 获取到页面的 $vm 对象 及 page页面的this对象

    var beforeRouteLeave = callThis.$options.beforeRouteLeave; // 查看当前是否有开发者声明

    if (beforeRouteLeave == null) {
      (0, _warn.warn)('当前页面下无 beforeRouteLeave 钩子声明，无须执行！');
      return resolve();
    }

    if (beforeRouteLeave != null && beforeRouteLeave.constructor !== Function) {
      (0, _warn.warn)('beforeRouteLeave 生命钩子声明错误，必须是一个函数！');
      return resolve();
    }

    beforeRouteLeave.call(callThis, to, from, resolve); // 执行生命钩子
  });
};
/**
 * 验证当前 next() 管道函数是否支持下一步
 *
 * @param {Object} Intercept 拦截到的新路由规则
 * @param {Object} fnType 跳转页面的类型方法 原始的
 * @param {Object} navCB 回调函数 原始的
 * @param {Boolean} leaveHookCall:? 是否为 beforeRouteLeave 触发的next 做拦截判断
 * this 为当前 Router 对象
 *
 */


var isNext = function isNext(Intercept, fnType, navCB) {
  var _this6 = this;

  var leaveHookCall = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return new Promise(function (resolve, reject) {
    if (Intercept == null) {
      // 什么也不做 直接执行下一个钩子
      return resolve();
    }

    if (Intercept === false) {
      // 路由中断
      _config.Global.LockStatus = false; // 解锁跳转状态

      return reject('路由终止');
    }

    if (Intercept.constructor === String) {
      // 说明 开发者直接传的path 并且没有指定 NAVTYPE 那么采用原来的navType
      reject('next到其他页面'); // eslint-disable-next-line

      return transitionTo.call(_this6, Intercept, fnType, navCB, leaveHookCall);
    }

    if (Intercept.constructor === Object) {
      // 有一系列的配置 包括页面切换动画什么的
      reject('next到其他页面'); // eslint-disable-next-line

      return transitionTo.call(_this6, Intercept, Intercept.NAVTYPE || fnType, navCB, leaveHookCall);
    }
  });
};
/**
 * 核心方法 处理一系列的跳转配置
 * @param {Object} rule 当前跳转规则
 * @param {Object} fnType 跳转页面的类型方法
 * @param {Object} navCB:? 回调函数
 * @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
 *
 * this 为当前 Router 对象
 */


var transitionTo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(rule, fnType, navCB) {
    var leaveHook,
        finalRoute,
        _from,
        _to,
        leaveResult,
        beforeResult,
        enterResult,
        _args6 = arguments;

    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            leaveHook = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : false;
            _context6.next = 3;
            return this.lifeCycle.routerbeforeHooks[0].call(this);

          case 3:
            // 触发内部跳转前的生命周期
            finalRoute = (0, _util.ruleToUniNavInfo)(rule, this.CONFIG.routes); // 获得到最终的 route 对象

            _from = (0, _util.formatFrom)(this.CONFIG.routes); // 先根据跳转类型获取 from 数据

            _to = (0, _util.formatTo)(finalRoute); // 再根据跳转类型获取 to 数据

            _context6.prev = 6;
            _context6.next = 9;
            return beforeRouteLeaveHooks.call(this, _from, _to, leaveHook);

          case 9:
            leaveResult = _context6.sent;
            _context6.next = 12;
            return isNext.call(this, leaveResult, fnType, navCB, true);

          case 12:
            _context6.next = 14;
            return beforeHooks.call(this, _from, _to);

          case 14:
            beforeResult = _context6.sent;
            _context6.next = 17;
            return isNext.call(this, beforeResult, fnType, navCB);

          case 17:
            _context6.next = 19;
            return beforeEnterHooks.call(this, finalRoute, _from, _to);

          case 19:
            enterResult = _context6.sent;
            _context6.next = 22;
            return isNext.call(this, enterResult, fnType, navCB);

          case 22:
            _context6.next = 28;
            break;

          case 24:
            _context6.prev = 24;
            _context6.t0 = _context6["catch"](6);
            (0, _warn.warn)(_context6.t0); // 打印开发者操作的日志

            return _context6.abrupt("return", false);

          case 28:
            if (navCB) {
              navCB.call(this, finalRoute, fnType); // 执行当前回调生命周期
            }

            afterEachHooks.call(this, _from, _to);
            _context6.next = 32;
            return this.lifeCycle.routerAfterHooks[0].call(this);

          case 32:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this, [[6, 24]]);
  }));

  return function transitionTo(_x8, _x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
/**
 * 主动触发导航守卫
 * @param {Object} Router 当前路由对象
 *
 * this  当前vue页面组件对象
 */


exports.transitionTo = transitionTo;

var triggerLifeCycle = function triggerLifeCycle(Router) {
  var _this7 = this;

  var topPage = getCurrentPages()[0];

  if (topPage == null) {
    return (0, _warn.warn)('打扰了,当前一个页面也没有 这不是官方的bug是什么??');
  }

  var _getPageVmOrMp = (0, _util.getPageVmOrMp)(topPage, false),
      query = _getPageVmOrMp.query,
      page = _getPageVmOrMp.page;

  transitionTo.call(Router, {
    path: page.route,
    query: query
  }, 'push', /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(finalRoute, fnType) {
      var variation;
      return _regenerator.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              variation = [];

              if (!("/".concat(page.route) == finalRoute.route.path)) {
                _context7.next = 7;
                break;
              }

              // 在首页不动的情况下
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞

              _context7.next = 5;
              return callwaitHooks.call(_this7, true);

            case 5:
              _context7.next = 12;
              break;

            case 7:
              _context7.next = 9;
              return callwaitHooks.call(_this7, false);

            case 9:
              variation = _context7.sent;
              _context7.next = 12;
              return (0, _uniNav.default)(finalRoute, fnType);

            case 12:
              plus.nativeObj.View.getViewById('router-loadding').close();
              callVariationHooks(variation);
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x11, _x12) {
      return _ref7.apply(this, arguments);
    };
  }());
};
/**
 * 处理tabbar点击拦截事件
 * @param {Object} path 当前需要跳转的tab页面路径
 *
 * this 为当前 Router 对象
 */


exports.triggerLifeCycle = triggerLifeCycle;

var beforeTabHooks = function beforeTabHooks(path) {
  transitionTo.call(this, {
    path: "/".concat(path),
    query: {}
  }, 'pushTab', function (finalRoute, fnType) {
    (0, _uniNav.default)(finalRoute, fnType);
  });
};

exports.beforeTabHooks = beforeTabHooks;

/***/ }),

/***/ 42:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 43);

/***/ }),

/***/ 43:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 44);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 44:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 45:
/*!**********************************************************!*\
  !*** ./node_modules/uni-simple-router/appRouter/util.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertCanBack = exports.getPageOnBeforeBack = exports.APPGetPageRoute = exports.ruleToUniNavInfo = exports.formatFrom = exports.getFormatQuery = exports.pathOrNameToRoute = exports.formatTo = exports.getPageVmOrMp = exports.isNvuePage = exports.getPages = exports.callAppHook = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 42));

var _warn = __webpack_require__(/*! ../helpers/warn */ 39);

var _util = __webpack_require__(/*! ../helpers/util */ 36);

var _config = __webpack_require__(/*! ../helpers/config */ 37);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 触发指定生命钩子
 * @param {Array} funList	//需要执行的方法列表
 * @param {Object} args //触发生命钩子传递的参数
 */
var callAppHook = function callAppHook() {
  var funList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var args = arguments.length > 1 ? arguments[1] : undefined;

  for (var i = 0; i < funList.length; i += 1) {
    funList[i].call(this, args);
  }
};
/**
 * @param {Number} index //需要获取的页面下标 -2:表示获取最后一个即当前页面 -1:表示全部 -3:当前页面的前一个页面
 * @param {Boolean} all //是否获取全部的页面
 */


exports.callAppHook = callAppHook;

var getPages = function getPages() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
  var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);

  if (index === -1) {
    return pages;
  }

  if (index === -2) {
    return pages[pages.length - 1];
  }

  if (index === -3) {
    return pages[pages.length - 2];
  }

  return pages[index];
};
/**
 * 验证当前页面是否为nvue页面
 * @param {Object} page 当前页面对象
 */


exports.getPages = getPages;

var isNvuePage = function isNvuePage(page) {
  var cstr = page.constructor.name;
  var pageType = {
    s: true,
    z: false
  };
  return pageType[cstr];
};
/**
 * @param {Object} page //当前顶级页面对象
 * @param {Object} vim:? //是否获取 $vm 对象还是 $mp 对象
 */


exports.isNvuePage = isNvuePage;

var getPageVmOrMp = function getPageVmOrMp(page) {
  var vim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (vim) {
    return page.$vm;
  }

  if (page.$vm.$mp) {
    return page.$vm.$mp;
  }

  if (isNvuePage(page)) {
    // nvue 页面
    return {
      page: page,
      query: page.__displayReporter.query
    };
  }
};
/**
 * 获取 to 的配置参数
 * @param {Object} rule 当前跳转的规则
 */


exports.getPageVmOrMp = getPageVmOrMp;

var formatTo = function formatTo(finalRoute) {
  var route = (0, _util.copyObject)(finalRoute.route);
  var rule = finalRoute.rule;
  route.query = rule.query || rule.params || {};
  return route;
};
/**
 * 通过一个未知的路径或者名称 在路由表中查找指定路由表 并返回
 * @param {string} type   //path 或者 name
 * @param {Object} routes //当前对象的所有路由表
 */


exports.formatTo = formatTo;

var pathOrNameToRoute = function pathOrNameToRoute(type) {
  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.Global.Router.CONFIG.routes;
  var routesKeys = Object.keys(routes);

  for (var i = 0; i < routesKeys.length; i += 1) {
    var key = routesKeys[i];
    var item = routes[key];

    if (item.path === "/".concat(type)) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }

    if (item.path === type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }

    if (item.name == type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
  }

  (0, _warn.err)("\u5F53\u524D '".concat(type, "' \u5728\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684 name \u6216\u8005 path"));
};
/**
 * 统一格式话 路由传递的参数 看看是编码还是非编码 做相应的对策
 *
 * @param {Object} query 当前的路由参数
 * @param {Boolean} getter 是从页面获取 route 对象下的参数 还是编码后传输
 */


exports.pathOrNameToRoute = pathOrNameToRoute;

var getFormatQuery = function getFormatQuery() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (_config.Global.Router.CONFIG.encodeURI) {
    try {
      query = JSON.parse(decodeURIComponent(query.query || encodeURIComponent('{}')));
    } catch (e) {
      query = JSON.parse(query.query);
    }
  }

  return query;
};
/**
 * 获取 from 的配置参数 from 页面永远都是站在当前页面忘其它地方走 所以都是最后一个页面
 *
 * @param {Object} routes //当前对象的所有路由表
 */


exports.getFormatQuery = getFormatQuery;

var formatFrom = function formatFrom(routes) {
  var topPage = getPages(-2);

  var _getPageVmOrMp = getPageVmOrMp(topPage, false),
      page = _getPageVmOrMp.page,
      query = _getPageVmOrMp.query;

  var route = pathOrNameToRoute(page.route, routes); // 获取到当前路由表下的 route

  route.query = getFormatQuery(query); // 不管是编码传输还是非编码 最后都得在 to/from 中换成json对象

  return route;
};
/**
 *
 * 把用户的跳转路由规则格式化成uni-app可用的路由跳转规则
 *
 * @param {Object} rule  //当前用户跳转的路由规则
 * @param {Object} routes //当前simple-router 下的路由表
 */


exports.formatFrom = formatFrom;

var ruleToUniNavInfo = function ruleToUniNavInfo(rule, routes) {
  if (rule == null) {
    return (0, _warn.err)('当前跳转规则为空,请检查跳转代码');
  } // eslint-disable-next-line


  var navType = 'path',
      route = null,
      query = {},
      animation = {};

  if (rule.constructor === String) {
    // 是字符串类型 那当前就是路径啦
    route = pathOrNameToRoute(rule, routes); // 直接把 rule 当 path 传递 完事
  } else if (rule.constructor === Object) {
    // 对象类型 可以是 path 或者 name
    route = pathOrNameToRoute(rule.path || (navType = 'name', rule.name), routes); // 两则必有其一 报错自己处理

    query = rule.query || rule.params || {};
    animation = rule.animation || {};
  } else {
    return (0, _warn.err)('传的什么乱七八糟的类型?路由跳转规则只认字符串 \'path\' , 对象 \'path\' , 对象 \'name\' ');
  }

  animation = _objectSpread(_objectSpread(_objectSpread({}, _config.Global.Router.CONFIG.APP.animation), route.animation || {}), animation); // 合并多种方式声明的动画效果

  route.animation = animation; // 这才是最终的页面切换效果
  // 路径处理完后   开始格式化参数

  var uniRoute = (0, _util.parseQuery)(route.path, query); // uni-app 需要的跳转规则

  return {
    rule: rule,
    route: route,
    uniRoute: uniRoute
  };
};
/**
 * 获取当前页面下的 Route 信息
 *
 * @param {Object} pages 获取页面对象集合
 * @param {Object} Vim 用户传递的当前页面对象
 */


exports.ruleToUniNavInfo = ruleToUniNavInfo;

var APPGetPageRoute = function APPGetPageRoute(pages, Vim) {
  var query = {},
      path = '';
  var page = pages[pages.length - 1]; // 获取到当前页面

  if (pages.length > 0) {
    query = getFormatQuery(page.options, true);
    path = page.route;
  } else if (Vim != null) {
    query = getFormatQuery(Vim.$mp.page.options, true);
    path = page.route;
  }

  var route = pathOrNameToRoute(path);
  route.query = query;
  return route;
};
/**
 * 获取当前页面下的 onBeforeBack 生命周期并执行
 *
 * @param {Object} args 当前返回页面时uni-app传递的参数
 */


exports.APPGetPageRoute = APPGetPageRoute;

var getPageOnBeforeBack = function getPageOnBeforeBack(args) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {
      var currPage, onBeforeBack, isNext;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              currPage = getPages(-2); // 获取到当前页面

              onBeforeBack = currPage.$vm.$options.onBeforeBack;

              if (!(onBeforeBack != null && onBeforeBack.constructor === Function)) {
                _context.next = 8;
                break;
              }

              _context.next = 5;
              return onBeforeBack.call(currPage.$vm, args);

            case 5:
              isNext = _context.sent;

              if (!(isNext === true)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", resolve(false));

            case 8:
              return _context.abrupt("return", resolve(true));

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};
/**
 * 断言当前页面是否可返回上一级
 * @param {Object} page 当前页面webview对象
 */


exports.getPageOnBeforeBack = getPageOnBeforeBack;

var assertCanBack = function assertCanBack(page) {
  var pageStyle = page.$getAppWebview().getStyle();

  if (pageStyle.titleNView != null && pageStyle.titleNView.autoBackButton) {
    // 只有处理有带返回按钮的页面
    return true;
  } // 两种情况 1.真的是顶级页面时  2.自定义头部


  var $page = page.$page;

  if ($page && $page.meta.isQuit === false) {
    // 自定义头部 不是顶级页面
    return true;
  }

  return false; // 不可返回 真的是顶级页面时 返回就直接退出app了
};

exports.assertCanBack = assertCanBack;

/***/ }),

/***/ 46:
/*!************************************************************!*\
  !*** ./node_modules/uni-simple-router/appRouter/uniNav.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = __webpack_require__(/*! ../helpers/config */ 37);

var _util = __webpack_require__(/*! ../helpers/util */ 36);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var stop = null;
/**
 * @param {Object} finalRoute 格式化后的路由跳转规则
 * @param {Object} NAVTYPE 需要调用的跳转方法
 */

var uniPushTo = function uniPushTo(finalRoute, NAVTYPE) {
  return new Promise(function (resolve) {
    var query = (0, _util.formatURLQuery)("?".concat(finalRoute.uniRoute.query));
    var APP = _config.baseConfig.APP;
    var url = finalRoute.uniRoute.url;
    stop = setTimeout(function () {
      resolve(url);
      resolve = _util.noop; // 执行完了就没了 确保不会被下一次执行

      _config.Global.LockStatus = false; // 跳转完成解锁状态
    }, APP.switchPageOutTime);

    uni[_config.methods[NAVTYPE]](_objectSpread(_objectSpread({
      url: url + query
    }, finalRoute.route.animation), {}, {
      complete: function complete() {
        clearTimeout(stop);
        resolve(url);
        resolve = _util.noop; // 执行完了就没了 确保不会被下一次执行

        _config.Global.LockStatus = false; // 跳转完成解锁状态
      }
    }), true); // 这里传递true 主要是兼容重写 uni.switchTab

  });
};

var _default = uniPushTo;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 47:
/*!***************************************************************!*\
  !*** ./node_modules/uni-simple-router/appletsRouter/hooks.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appletsProxyIndexHook = exports.triggerLifeCycle = exports.backCallHook = exports.appletsTransitionTo = exports.proxyLaunchHook = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 42));

var _config = __webpack_require__(/*! ../helpers/config */ 37);

var _util = __webpack_require__(/*! ./util */ 48);

var _appletsNav = _interopRequireDefault(__webpack_require__(/*! ./appletsNav */ 50));

var _util2 = __webpack_require__(/*! ../helpers/util */ 36);

var _warn = __webpack_require__(/*! ../helpers/warn */ 39);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 *
 * @param {String} key
 * @param {Function} hook 需要执行及还原的生命周期函数
 */
var toutiaoIndexHookCall = function toutiaoIndexHookCall(key, hook) {
  var indexVue = _config.uniAppHook.indexVue;
  var indeHooks = indexVue[key];
  indeHooks.splice(indeHooks.length - 1, 1, hook);
};
/**
 * 还原并执行所有 拦截下来的生命周期 app.vue 及 index 下的生命周期
 * @param {Boolean} callHome // 是否触发首页的生命周期
 *
 * this 为当前 page 对象
 */


var callwaitHooks = function callwaitHooks(callHome) {
  var _this = this;

  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {
      var variation, appVue, onLaunch, onShow, waitHooks, variationFuns, indexCallHooks, app, key, _key, item;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              variation = []; // 存储一下在uni-app上的变异生命钩子  奇葩的要死

              appVue = _config.uniAppHook.appVue, onLaunch = _config.uniAppHook.onLaunch, onShow = _config.uniAppHook.onShow, waitHooks = _config.uniAppHook.waitHooks, variationFuns = _config.uniAppHook.variationFuns, indexCallHooks = _config.uniAppHook.indexCallHooks;
              app = appVue.$options;
              _context.next = 5;
              return onLaunch.fun[onLaunch.fun.length - 1].call(appVue, onLaunch.args);

            case 5:
              // 确保只执行最后一个 并且强化异步操作
              onShow.fun[onShow.fun.length - 1].call(appVue, onShow.args); // onshow 不保证异步 直接确保执行最后一个

              if (callHome) {
                // 触发首页生命周期
                // eslint-disable-next-line
                for (key in waitHooks) {
                  if (indexCallHooks.includes(key)) {
                    // 只有在被包含的情况下才执行
                    _util.callAppHook.call(_this, waitHooks[key].fun);
                  }
                }
              }

              if (onLaunch.isHijack) {
                // 还原 onLaunch生命钩子
                app.onLaunch.splice(app.onLaunch.length - 1, 1, onLaunch.fun[0]);
              }

              if (onShow.isHijack) {
                // 继续还原 onShow
                app.onShow.splice(app.onShow.length - 1, 1, onShow.fun[0]);
              } // eslint-disable-next-line


              for (_key in waitHooks) {
                // 还原 首页下的生命钩子
                item = waitHooks[_key];

                if (item.isHijack) {
                  if (variationFuns.includes(_key)) {
                    // 变异方法
                    variation.push({
                      key: _key,
                      fun: item.fun[0]
                    });
                  } else {
                    toutiaoIndexHookCall(_key, item.fun[0]);
                  }
                }
              }

              resolve(variation);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};
/**
 * 还原剩下的奇葩生命钩子
 * @param {Object} variation 当前uni-app中的一些变异方法  奇葩生命钩子
 */


var callVariationHooks = function callVariationHooks(variation) {
  for (var i = 0; i < variation.length; i += 1) {
    var _variation$i = variation[i],
        key = _variation$i.key,
        fun = _variation$i.fun;
    toutiaoIndexHookCall(key, fun);
  }
};
/**
 * 主要是对app.vue下onLaunch和onShow生命周期进行劫持
 *
 * this 为当前 page 对象
 */


var proxyLaunchHook = function proxyLaunchHook() {
  var _this2 = this;

  var _this$$options = this.$options,
      onLaunch = _this$$options.onLaunch,
      onShow = _this$$options.onShow;
  _config.uniAppHook.appVue = this; // 缓存 当前app.vue组件对象

  if (onLaunch.length > 1) {
    // 确保有写 onLaunch 可能有其他混入 那也办法
    _config.uniAppHook.onLaunch.isHijack = true;
    _config.uniAppHook.onLaunch.fun = onLaunch.splice(onLaunch.length - 1, 1, function (arg) {
      _config.uniAppHook.onLaunch.args = arg;
    }); // 替换uni-app自带的生命周期
  }

  if (onShow.length > 0) {
    _config.uniAppHook.onShow.isHijack = true;
    _config.uniAppHook.onShow.fun = onShow.splice(onShow.length - 1, 1, function (arg) {
      _config.uniAppHook.onShow.args = arg;

      if (_config.uniAppHook.pageReady) {
        // 因为还有app切前台后台的操作
        _util.callAppHook.call(_this2, _config.uniAppHook.onShow.fun, arg);
      }
    }); // 替换替换 都替换
  }
};
/**
 * 触发全局beforeHooks 生命钩子
 * @param {Object} _from // from  参数
 * @param {Object} _to  // to 参数
 *
 * this 为当前 Router 对象
 */


exports.proxyLaunchHook = proxyLaunchHook;

var beforeHooks = function beforeHooks(_from, _to) {
  var _this3 = this;

  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {
      var beforeHooksFun;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              beforeHooksFun = _this3.lifeCycle.beforeHooks[0];

              if (!(beforeHooksFun == null)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", resolve());

            case 3:
              _context2.next = 5;
              return beforeHooksFun.call(_this3, _to, _from, resolve);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};
/**
 * 触发全局afterEachHooks 生命钩子
 * @param {Object} _from // from  参数
 * @param {Object} _to  // to 参数
 *
 * this 为当前 Router 对象
 */


var afterEachHooks = function afterEachHooks(_from, _to) {
  var afterHooks = this.lifeCycle.afterHooks[0];

  if (afterHooks != null && afterHooks.constructor === Function) {
    afterHooks.call(this, _to, _from);
  }
};
/**
 * 触发全局 beforeEnter 生命钩子
 * @param {Object} finalRoute 	// 当前格式化后的路由参数
 * @param {Object} _from // from  参数
 * @param {Object} _to  // to 参数
 *
 * this 为当前 Router 对象
 */


var beforeEnterHooks = function beforeEnterHooks(finalRoute, _from, _to) {
  var _this4 = this;

  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(resolve) {
      var beforeEnter;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              beforeEnter = finalRoute.route.beforeEnter;

              if (!(beforeEnter == null || beforeEnter.constructor !== Function)) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", resolve());

            case 3:
              _context3.next = 5;
              return beforeEnter.call(_this4, _to, _from, resolve);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
};
/**
 *  v1.5.4+
 * beforeRouteLeave 生命周期
 * @param {Object} to       将要去的那个页面 to对象
 * @param {Object} from     从那个页面触发的 from对象
 *  @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
 * this 为当前 Router 对象
 */


var beforeRouteLeaveHooks = function beforeRouteLeaveHooks(from, to, leaveHook) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve) {
      var currentPage, callThis, beforeRouteLeave;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!leaveHook) {
                _context4.next = 3;
                break;
              }

              // 我们知道这个是来自页面beforeRouteLeave next到其他地方，所有不必再执行啦
              (0, _warn.warn)('beforeRouteLeave next到其他地方，无须再执行！');
              return _context4.abrupt("return", resolve());

            case 3:
              if (!(from.path == to.path)) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", resolve());

            case 5:
              currentPage = (0, _util.getPages)(-2); // 获取到全部的页面对象

              callThis = (0, _util.getPageVmOrMp)(currentPage); // 获取到页面的 $vm 对象 及 page页面的this对象

              beforeRouteLeave = callThis.$options.beforeRouteLeave; // 查看当前是否有开发者声明

              if (!(beforeRouteLeave == null)) {
                _context4.next = 11;
                break;
              }

              (0, _warn.warn)('当前页面下无 beforeRouteLeave 钩子声明，无须执行！');
              return _context4.abrupt("return", resolve());

            case 11:
              if (!(beforeRouteLeave != null && beforeRouteLeave.constructor !== Function)) {
                _context4.next = 14;
                break;
              }

              (0, _warn.warn)('beforeRouteLeave 生命钩子声明错误，必须是一个函数！');
              return _context4.abrupt("return", resolve());

            case 14:
              _context4.next = 16;
              return beforeRouteLeave.call(callThis, to, from, resolve);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());
};
/**
 * 核心方法 处理一系列的跳转配置
 * @param {Object} rule 当前跳转规则
 * @param {Object} fnType 跳转页面的类型方法
 * @param {Object} navCB:? 回调函数
 * @param {Boolean} leaveHook:? 是否为 beforeRouteLeave 触发的next 到别处 如果是则不再触发 beforeRouteLeave 生命钩子
 * this 为当前 Router 对象
 *
 */


var appletsTransitionTo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(rule, fnType, navCB) {
    var leaveHook,
        finalRoute,
        _from,
        _to,
        leaveResult,
        beforeResult,
        enterResult,
        _args5 = arguments;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            leaveHook = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : false;
            _context5.next = 3;
            return this.lifeCycle.routerbeforeHooks[0].call(this);

          case 3:
            // 触发内部跳转前的生命周期
            finalRoute = (0, _util.ruleToUniNavInfo)(rule, this.CONFIG.routes); // 获得到最终的 route 对象

            _from = (0, _util.formatFrom)(this.CONFIG.routes); // 先根据跳转类型获取 from 数据

            _to = (0, _util.formatTo)(finalRoute); // 再根据跳转类型获取 to 数据

            _context5.prev = 6;
            _context5.next = 9;
            return beforeRouteLeaveHooks.call(this, _from, _to, leaveHook);

          case 9:
            leaveResult = _context5.sent;
            _context5.next = 12;
            return isNext.call(this, leaveResult, fnType, navCB, true);

          case 12:
            _context5.next = 14;
            return beforeHooks.call(this, _from, _to);

          case 14:
            beforeResult = _context5.sent;
            _context5.next = 17;
            return isNext.call(this, beforeResult, fnType, navCB);

          case 17:
            _context5.next = 19;
            return beforeEnterHooks.call(this, finalRoute, _from, _to);

          case 19:
            enterResult = _context5.sent;
            _context5.next = 22;
            return isNext.call(this, enterResult, fnType, navCB);

          case 22:
            _context5.next = 28;
            break;

          case 24:
            _context5.prev = 24;
            _context5.t0 = _context5["catch"](6);
            (0, _warn.warn)(_context5.t0); // 打印开发者操作的日志

            return _context5.abrupt("return", false);

          case 28:
            if (navCB) {
              navCB.call(this, finalRoute, fnType); // 执行当前回调生命周期
            }

            afterEachHooks.call(this, _from, _to);
            _context5.next = 32;
            return this.lifeCycle.routerAfterHooks[0].call(this);

          case 32:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[6, 24]]);
  }));

  return function appletsTransitionTo(_x5, _x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * 触发全局 返回事件
 * @param {Number} backLayer 需要返回的页面层级
 * @param {Function} next 正真的回调函数
 *
 * this 为当前 Router 对象
 */


exports.appletsTransitionTo = appletsTransitionTo;

var backCallHook = function backCallHook(backLayer, next) {
  var pages = (0, _util.getPages)(); // 获取到全部的页面对象

  var toPage = pages.reverse()[backLayer];

  if (toPage == null) {
    // 没有匹配到的时候
    return (0, _warn.warn)('亲爱的开发者，你确定页面栈中有这么多历史记录给你返回？');
  }

  var _getPageVmOrMp = (0, _util.getPageVmOrMp)(toPage, false),
      query = _getPageVmOrMp.query,
      page = _getPageVmOrMp.page;

  var beforeFntype = 'RouterBack';
  appletsTransitionTo.call(this, {
    path: page.route,
    query: query
  }, beforeFntype, function (finalRoute, fnType) {
    var toPath = finalRoute.uniRoute.url;

    if ("/".concat(page.route) == toPath || page.route == toPath) {
      // 直接调用返回api
      next();
    } else {
      // 有拦截到其他页面时
      if (fnType == beforeFntype) {
        return (0, _warn.warn)('调用返回api被拦截到其他页面需要指定合理的 ‘NAVTYPE’ ');
      }

      (0, _appletsNav.default)(finalRoute, fnType);
    }
  });
};
/**
 * 主动触发导航守卫
 * @param {Object} Router 当前路由对象
 *
 */


exports.backCallHook = backCallHook;

var triggerLifeCycle = function triggerLifeCycle(Router) {
  var _this5 = this;

  var topPage = getCurrentPages()[0];

  if (topPage == null) {
    return (0, _warn.warn)('打扰了,当前一个页面也没有 这不是官方的bug是什么??');
  }

  var _getPageVmOrMp2 = (0, _util.getPageVmOrMp)(topPage, false),
      query = _getPageVmOrMp2.query,
      page = _getPageVmOrMp2.page;

  appletsTransitionTo.call(Router, {
    path: page.route,
    query: query
  }, 'push', /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(finalRoute, fnType) {
      var variation;
      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              variation = [];

              if (!("/".concat(page.route) == finalRoute.route.path || page.route == finalRoute.route.path)) {
                _context6.next = 7;
                break;
              }

              // 在首页不动的情况下
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞

              _context6.next = 5;
              return callwaitHooks.call(_this5, true);

            case 5:
              _context6.next = 12;
              break;

            case 7:
              _context6.next = 9;
              return callwaitHooks.call(_this5, false);

            case 9:
              variation = _context6.sent;
              _context6.next = 12;
              return (0, _appletsNav.default)(finalRoute, fnType);

            case 12:
              _config.uniAppHook.pageReady = true; // 标致着路由已经就绪 可能准备起飞

              callVariationHooks(variation);

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x8, _x9) {
      return _ref6.apply(this, arguments);
    };
  }());
};
/**
 * 把指定页面的生命钩子函数保存并替换
 * this 为当前 page 对象
 */


exports.triggerLifeCycle = triggerLifeCycle;

var appletsProxyIndexHook = function appletsProxyIndexHook(Router) {
  if (false) {}

  var needHooks = _config.uniAppHook.needHooks,
      waitHooks = _config.uniAppHook.waitHooks;
  var options = this.$options;
  _config.uniAppHook.indexVue = options;

  for (var i = 0; i < needHooks.length; i += 1) {
    var key = needHooks[i];

    if (options[key] != null) {
      // 只劫持开发者声明的生命周期
      var length = options[key].length; // eslint-disable-next-line

      var whObject = waitHooks[key] = {};
      whObject.fun = options[key].splice(length - 1, 1, _util2.noop); // 把实际的页面生命钩子函数缓存起来,替换原有的生命钩子

      whObject.isHijack = true;
    }
  }

  triggerLifeCycle.call(this, Router); // 接着 主动我们触发导航守卫
};
/**
 * 验证当前 next() 管道函数是否支持下一步
 *
 * @param {Object} Intercept 拦截到的新路由规则
 * @param {Object} fnType 跳转页面的类型方法 原始的
 * @param {Object} navCB 回调函数 原始的
 * @param {Boolean} leaveHookCall:? 是否为 beforeRouteLeave 触发的next 做拦截判断
 * this 为当前 Router 对象
 *
 */


exports.appletsProxyIndexHook = appletsProxyIndexHook;

var isNext = function isNext(Intercept, fnType, navCB) {
  var _this6 = this;

  var leaveHookCall = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return new Promise(function (resolve, reject) {
    if (Intercept == null) {
      // 什么也不做 直接执行下一个钩子
      return resolve();
    }

    if (Intercept === false) {
      // 路由中断 我们需要把防抖设置为false
      _config.Global.LockStatus = false; // 解锁跳转状态

      return reject('路由终止');
    }

    if (Intercept.constructor === String) {
      // 说明 开发者直接传的path 并且没有指定 NAVTYPE 那么采用原来的navType
      reject('next到其他页面');
      return appletsTransitionTo.call(_this6, Intercept, fnType, navCB, leaveHookCall);
    }

    if (Intercept.constructor === Object) {
      // 有一系列的配置 包括页面切换动画什么的
      reject('next到其他页面');
      return appletsTransitionTo.call(_this6, Intercept, Intercept.NAVTYPE || fnType, navCB, leaveHookCall);
    }
  });
};

/***/ }),

/***/ 48:
/*!**************************************************************!*\
  !*** ./node_modules/uni-simple-router/appletsRouter/util.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppletsPageRoute = exports.ruleToUniNavInfo = exports.formatFrom = exports.formatTo = exports.pathOrNameToRoute = exports.getPages = exports.getFormatQuery = exports.getPageVmOrMp = exports.callAppHook = void 0;

var _config = __webpack_require__(/*! ../helpers/config */ 37);

var _util = __webpack_require__(/*! ../helpers/util */ 36);

var _warn = __webpack_require__(/*! ../helpers/warn */ 39);

var _compile = __webpack_require__(/*! ../helpers/compile */ 49);

/**
 * 触发指定生命钩子
 * @param {Array} funList	//需要执行的方法列表
 * @param {Object} args //触发生命钩子传递的参数
 */
var callAppHook = function callAppHook(funList, args) {
  for (var i = 0; i < funList.length; i += 1) {
    funList[i].call(this, args);
  }
};
/**
 * @param {Object} page //当前顶级页面对象
 * @param {Object} vim:? //是否获取 $vm 对象还是 $mp 对象
 */


exports.callAppHook = callAppHook;

var getPageVmOrMp = function getPageVmOrMp(page) {
  var vim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (vim) {
    return page.$vm;
  }

  var $mp = page.$vm.$mp;
  (0, _compile.baiduApple)(function () {
    // 百度小程序新增一个route属性
    $mp.page.route = $mp.page.is;
  });
  (0, _compile.touTiao)(function () {
    // 头条小程序新增一个route属性
    $mp.page.route = $mp.page.is;
  });
  return $mp;
};
/**
 * 统一格式话 路由传递的参数 看看是编码还是非编码 做相应的对策
 *
 * @param {Object} query 当前的路由参数
 * @param {Boolean} getter 是从页面获取 route 对象下的参数 还是编码后传输
 */


exports.getPageVmOrMp = getPageVmOrMp;

var getFormatQuery = function getFormatQuery() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var getter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (_config.Global.Router.CONFIG.encodeURI) {
    if (getter) {
      try {
        // 除去微信小程序都不需要 decodeURIComponent
        query = JSON.parse(decodeURIComponent(query.query) || '{}');
      } catch (e) {
        // 其他小程序
        query = JSON.parse(query.query || '{}');
      }
    } else {
      try {
        query = JSON.parse(decodeURIComponent(query.query || encodeURIComponent('{}')));
      } catch (e) {
        query = JSON.parse(query.query);
      }
    }
  }

  return query;
};
/**
 * @param {Number} index //需要获取的页面下标 -2:表示获取最后一个即当前页面 -1:表示全部 -3:当前页面的前一个页面
 * @param {Boolean} all //是否获取全部的页面
 */


exports.getFormatQuery = getFormatQuery;

var getPages = function getPages() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
  var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);

  if (index === -1) {
    return pages;
  }

  if (index === -2) {
    return pages[pages.length - 1];
  }

  if (index === -3) {
    return pages[pages.length - 2];
  }

  return pages[index];
};
/**
 * 通过一个未知的路径或者名称 在路由表中查找指定路由表 并返回
 * @param {string} type   //path 或者 name
 * @param {Object} routes //当前对象的所有路由表
 */


exports.getPages = getPages;

var pathOrNameToRoute = function pathOrNameToRoute(type) {
  var routes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _config.Global.Router.CONFIG.routes;
  var routesKeys = Object.keys(routes);

  for (var i = 0; i < routesKeys.length; i += 1) {
    var key = routesKeys[i];
    var item = routes[key];

    if (item.path === "/".concat(type)) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }

    if (item.path === type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }

    if (item.name == type) {
      return (0, _config.route)(item); // 合并一下对象,主要是合并 query:{} 及 params:{}
    }
  }

  (0, _warn.err)("\u5F53\u524D '".concat(type, "' \u5728\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684 name \u6216\u8005 path"));
};
/**
 * 获取 to 的配置参数
 * @param {Object} rule 当前跳转的规则
 */


exports.pathOrNameToRoute = pathOrNameToRoute;

var formatTo = function formatTo(finalRoute) {
  var route = (0, _util.copyObject)(finalRoute.route);
  var rule = finalRoute.rule;
  route.query = rule.query || rule.params || {};
  return route;
};
/**
 * 获取 from 的配置参数 from 页面永远都是站在当前页面忘其它地方走 所以都是最后一个页面
 *
 * @param {Object} routes //当前对象的所有路由表
 */


exports.formatTo = formatTo;

var formatFrom = function formatFrom(routes) {
  var topPage = getPages(-2);

  var _getPageVmOrMp = getPageVmOrMp(topPage, false),
      page = _getPageVmOrMp.page,
      query = _getPageVmOrMp.query;

  var route = pathOrNameToRoute(page.route, routes); // 获取到当前路由表下的 route

  route.query = getFormatQuery(query); // 不管是编码传输还是非编码 最后都得在 to/from 中换成json对象

  return route;
};
/**
 *
 * 把用户的跳转路由规则格式化成uni-app可用的路由跳转规则
 *
 * @param {Object} rule  //当前用户跳转的路由规则
 * @param {Object} routes //当前simple-router 下的路由表
 */


exports.formatFrom = formatFrom;

var ruleToUniNavInfo = function ruleToUniNavInfo(rule, routes) {
  if (rule == null) {
    return (0, _warn.err)('当前跳转规则为空,请检查跳转代码');
  } // eslint-disable-next-line


  var navType = 'path',
      route = null,
      query = {};

  if (rule.constructor === String) {
    // 是字符串类型 那当前就是路径啦
    route = pathOrNameToRoute(rule, routes); // 直接把 rule 当 path 传递 完事
  } else if (rule.constructor === Object) {
    // 对象类型 可以是 path 或者 name
    route = pathOrNameToRoute(rule.path || (navType = 'name', rule.name), routes); // 两则必有其一 报错自己处理

    query = rule.query || rule.params || {};
  } else {
    return (0, _warn.err)('传的什么乱七八糟的类型?路由跳转规则只认字符串 \'path\' , 对象 \'path\' , 对象 \'name\' ');
  } // 路径处理完后   开始格式化参数


  var uniRoute = (0, _util.parseQuery)(route.path, query); // uni-app 需要的跳转规则

  return {
    rule: rule,
    route: route,
    uniRoute: uniRoute
  };
};
/**
 * 获取当前页面下的 Route 信息
 *
 * @param {Object} pages 获取页面对象集合
 * @param {Object} Vim 用户传递的当前页面对象
 */


exports.ruleToUniNavInfo = ruleToUniNavInfo;

var AppletsPageRoute = function AppletsPageRoute(pages, Vim) {
  var query = {},
      path = '';
  var page = pages[pages.length - 1]; // 获取到当前页面

  if (pages.length > 0) {
    var uniQuery = getPageVmOrMp(page, false).query;
    query = getFormatQuery(uniQuery, true);
    path = page.route;
  } else if (Vim != null) {
    query = getFormatQuery(Vim.$mp.page.options, true);
    path = page.route;
  }

  var route = pathOrNameToRoute(path);
  route.query = query;
  return route;
};

exports.AppletsPageRoute = AppletsPageRoute;

/***/ }),

/***/ 487:
/*!*******************************!*\
  !*** ./src/api/gold/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 488));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  getTotalAndBeExpireGoldInfo: function getTotalAndBeExpireGoldInfo() {
    //获取库豆
    return _request.default.post(_url.default.getTotalAndBeExpireGoldInfo);
  },
  getGoldDetailInfo: function getGoldDetailInfo(params) {
    //库豆明细
    return _request.default.post(_url.default.getGoldDetailInfo, params);
  }
};
exports.default = _default;

/***/ }),

/***/ 488:
/*!*****************************!*\
  !*** ./src/api/gold/url.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var goldApi = {
  getTotalAndBeExpireGoldInfo: "/gold/app/getTotalAndBeExpireGoldInfo",
  //获取库豆
  getGoldDetailInfo: "/gold/app/getGoldDetailInfo" //库豆明细

};
var _default = goldApi;
exports.default = _default;

/***/ }),

/***/ 49:
/*!***********************************************************!*\
  !*** ./node_modules/uni-simple-router/helpers/compile.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mp = exports.touTiao = exports.baiduApple = exports.notH5 = exports.applets = exports.APP = exports.H5 = void 0;

var H5 = function H5(fn) {};

exports.H5 = H5;

var APP = function APP(fn) {};

exports.APP = APP;

var applets = function applets(fn) {
  fn();
};

exports.applets = applets;

var notH5 = function notH5(fn) {
  fn();
};

exports.notH5 = notH5;

var baiduApple = function baiduApple(fn) {};

exports.baiduApple = baiduApple;

var touTiao = function touTiao(fn) {};

exports.touTiao = touTiao;

var mp = function mp(fn) {
  fn();
};

exports.mp = mp;

/***/ }),

/***/ 50:
/*!********************************************************************!*\
  !*** ./node_modules/uni-simple-router/appletsRouter/appletsNav.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = __webpack_require__(/*! ../helpers/config */ 37);

var _util = __webpack_require__(/*! ../helpers/util */ 36);

/**
 * @param {Object} finalRoute 格式化后的路由跳转规则
 * @param {Object} NAVTYPE 需要调用的跳转方法
 */
var appletsUniPushTo = function appletsUniPushTo(finalRoute, NAVTYPE) {
  return new Promise(function (resolve) {
    var query = (0, _util.formatURLQuery)("?".concat(finalRoute.uniRoute.query));
    var url = finalRoute.uniRoute.url;

    uni[_config.methods[NAVTYPE]]({
      url: url + query,
      complete: function complete() {
        resolve(url);
        _config.Global.LockStatus = false; // 跳转完成解锁状态
      }
    });
  });
};

var _default = appletsUniPushTo;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 51:
/*!***************************************************************!*\
  !*** ./node_modules/uni-simple-router/vueRouter/routerNav.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _warn = __webpack_require__(/*! ../helpers/warn */ 39);

var _util = __webpack_require__(/*! ./util */ 52);

/**
 * @param {Object} replace vue-router的跳转方式
 * @param {Object} rule 需要跳转到的路由匹配规则
 * @param {Object} type 对应的官方跳转模式
 *
 * this 为当前 Router 实例
 */
var H5PushTo = function H5PushTo(replace, rule, type) {
  if (this.$route == null) {
    return (0, _warn.err)('h5端路由为就绪，请检查调用代码');
  }

  rule = (0, _util.formatUserRule)(rule, this.selfRoutes, this.CONFIG);
  var objPath = (0, _util.strPathToObjPath)(rule);
  objPath.type = type;
  this.$route[replace](objPath);
};

var _default = H5PushTo;
exports.default = _default;

/***/ }),

/***/ 52:
/*!**********************************************************!*\
  !*** ./node_modules/uni-simple-router/vueRouter/util.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diffRouter = exports.H5GetPageRoute = exports.getPages = exports.strPathToObjPath = exports.encodeURLQuery = exports.vueDevRouteProxy = exports.getRouterNextInfo = exports.formatUserRule = exports.nameToRute = exports.pathToRute = exports.getFuntionConfig = exports.fromatRoutes = exports.resloveChildrenPath = exports.resolveRender = void 0;

var _warn = __webpack_require__(/*! ../helpers/warn */ 39);

var _util = __webpack_require__(/*! ../helpers/util */ 36);

var _proxy = __webpack_require__(/*! ./proxy/proxy */ 53);

var _config = __webpack_require__(/*! ../helpers/config */ 37);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pagesConfigReg = /props:\s*\(.*\)\s*(\([\s\S]*\))\s*},/;
var pagesConfigRegCli = /props:\s*Object\.assign\s*(\([\s\S]*\))\s*},/; // 脚手架项目

var defRoutersReg = /props:\s*{([\s\S]+)}\s*},/;
/**
 * 解析验证当前的 component 选项是否配置正确 只有vueRouterDev:false 才会调用此方法
 * @param {Function|Object} component
 * @param {Object} item
 * @param {Boolean} useUniConfig
 */

var resolveRender = function resolveRender(_ref, item, useUniConfig) {
  var component = _ref.component,
      components = _ref.components;

  if (components != null) {
    (0, _warn.warn)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018components\u2019 \u65E0\u6548\uFF0C\r\n\r\n ".concat(JSON.stringify(item)));
  }

  if (useUniConfig == true) {
    // 采用uni-pages.json中的配置时component可以为空
    return false;
  }

  if (item.path == '*') {
    // 唯独这个情况在vue-router中可以不用component
    return true;
  }

  if (component == null) {
    return (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u4E2D \u2018component\u2019 \u9009\u9879\u4E0D\u80FD\u4E3A\u7A7A\uFF1A\r\n\r\n ".concat(JSON.stringify(item)));
  }

  if (component.constructor === Function) {
    item.component = {
      render: component
    };
  } else if (component.constructor === Object) {
    if (component.render == null || component.render.constructor !== Function) {
      (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018render\u2019 \u51FD\u6570\u7F3A\u5931\u6216\u7C7B\u578B\u4E0D\u6B63\u786E\uFF1A\r\n\r\n ".concat(JSON.stringify(item)));
    }
  } else {
    (0, _warn.err)("vueRouterDev:false\u65F6 \u8DEF\u7531\u8868\u914D\u7F6E\u4E2D \u2018component\u2019 \u9009\u9879\u4EC5\u652F\u6301 Function\u3001Object \u7C7B\u578B\u3002\u5E76\u786E\u4FDD Object \u7C7B\u578B\u65F6\u4F20\u9012\u4E86 \u2018render\u2019 \u51FD\u6570  \uFF1A\r\n\r\n ".concat(JSON.stringify(item)));
  }
};
/**
 * 递归解析 H5配置中有存在嵌套对象的情况,优先以path为key存储。没有则找aliasPath作为key
 * @param {Object} objRoutes
 * @param {Array} children
 * @param {Boolean} useUniConfig 是否使用pages.json下的页面配置
 */


exports.resolveRender = resolveRender;

var resloveChildrenPath = function resloveChildrenPath(objRoutes, children, useUniConfig) {
  for (var i = 0; i < children.length; i += 1) {
    var item = children[i];
    resolveRender(item, item, useUniConfig);

    if (item.path != null) {
      objRoutes[item.path] = _objectSpread(_objectSpread({}, item), {
        _ROUTERPATH: true // 使用page.json中的path为路径

      });
    } else {
      objRoutes[item.aliasPath] = _objectSpread(_objectSpread({}, item), {
        _ROUTERPATH: false
      });
    }

    if (item.children && item.children.constructor === Array) {
      resloveChildrenPath(objRoutes, item.children, useUniConfig);
    }
  }
};
/**
 * 格式化原始路由表
 * @param {Object} routes  路由表
 * @param {Boolean} userRoute  是否为用户自己配置的路由表
 * @param {Boolean} H5CONFIG
 */


exports.resloveChildrenPath = resloveChildrenPath;

var fromatRoutes = function fromatRoutes(routes, userRoute, _ref2) {
  var vueRouterDev = _ref2.vueRouterDev,
      useUniConfig = _ref2.useUniConfig;

  if (userRoute && vueRouterDev) {
    // 如果是用户的路由表并且 完全采用vueRouter开发 则不作处理直接返回
    return routes;
  }

  var objRoutes = {};

  for (var i = 0; i < routes.length; i += 1) {
    var item = routes[i];
    var path = item.path === '/' ? item.alias : item.path;

    if (userRoute) {
      if (item.children && item.children.constructor === Array) {
        resloveChildrenPath(objRoutes, item.children, useUniConfig);
      }

      resolveRender(item, item, useUniConfig); // 是否使用pages.json下的页面配置
    }

    objRoutes[path] = _objectSpread(_objectSpread({}, item), {
      _PAGEPATH: path.substring(1)
    });
  }

  return objRoutes;
};
/**
 * 解析vueRouter中 component 下 render函数中的配置信息
 * @param {String} FunStr
 */


exports.fromatRoutes = fromatRoutes;

var getFuntionConfig = function getFuntionConfig(FunStr) {
  var matchText = FunStr.match(pagesConfigReg);
  var prefix = '';

  if (matchText == null) {
    // 是uni-app自带的默认路由及配置 也可能是脚手架项目
    matchText = FunStr.match(pagesConfigRegCli);

    if (matchText == null) {
      // 确认不是脚手架项目
      try {
        // eslint-disable-next-line
        matchText = FunStr.match(defRoutersReg)[1]; // eslint-disable-next-line

        matchText = eval("Object.assign({".concat(matchText, "})"));
        prefix = 'system-';
      } catch (error) {
        (0, _warn.err)("\u8BFB\u53D6uni-app\u9875\u9762\u6784\u5EFA\u65B9\u6CD5\u914D\u7F6E\u9519\u8BEF \r\n\r\n ".concat(error));
      }
    } else {
      // eslint-disable-next-line
      matchText = eval("Object.assign".concat(matchText[1]));
    }
  } else {
    // eslint-disable-next-line
    matchText = eval("Object.assign".concat(matchText[1]));
  }

  return {
    config: matchText,
    prefix: prefix,
    FunStr: FunStr
  };
};
/**
 * 通过一个未知的路径名称 在路由表中查找指定路由表 并返回
 * @param {String} path //不管是aliasPath名的路径还是path名的路径
 * @param {Object} routes//当前对象的所有路由表
 */


exports.getFuntionConfig = getFuntionConfig;

var pathToRute = function pathToRute(path, routes) {
  var PATHKEY = '';
  var rute = {};
  var routeKeys = Object.keys(routes);

  for (var i = 0; i < routeKeys.length; i += 1) {
    var key = routeKeys[i];
    var item = routes[key];
    rute = item;

    if (item.aliasPath == path) {
      // path参数是优先采用aliasPath为值得 所以可以先判断是否与aliasPath相同
      PATHKEY = 'aliasPath';
      break;
    } // eslint-disable-next-line


    if ("/".concat(item._PAGEPATH) == path) {
      // 路径相同
      PATHKEY = 'path';
      break;
    }
  }

  return {
    PATHKEY: _defineProperty({}, PATHKEY, path),
    rute: rute
  };
};
/**
 * 通过一个路径name 在路由表中查找指定路由表 并返回
 * @param {String} name//实例化路由时传递的路径表中所匹配的对应路由name
 * @param {Object} routes//当前对象的所有路由表
 */


exports.pathToRute = pathToRute;

var nameToRute = function nameToRute(name, routes) {
  var routesKeys = Object.keys(routes);

  for (var i = 0; i < routesKeys.length; i += 1) {
    var key = routesKeys[i];
    var item = routes[key];

    if (item.name == name) {
      return item;
    }
  }

  (0, _warn.err)("\u8DEF\u7531\u8868\u4E2D\u6CA1\u6709\u627E\u5230 name\u4E3A:'".concat(name, "' \u7684\u8DEF\u7531"));
};
/**
 * 根据用户传入的路由规则 格式化成正确的路由规则
 * @param {Object} rule 用户需要跳转的路由规则
 * @param {Object} selfRoutes simple-router下的所有routes对象
 * @param {Object} CONFIG 当前路由下的所有配置信息
 */


exports.nameToRute = nameToRute;

var formatUserRule = function formatUserRule(rule, selfRoutes, CONFIG) {
  var type = '';
  var ruleQuery = (type = 'query', rule.query || (type = 'params', rule.params)) || (type = '', {});
  var rute = {}; // 默认在router中的配置

  if (type == '' && rule.name != null) {
    // 那就是可能没有穿任何值咯
    type = 'params';
  }

  if (type != 'params') {
    var route = pathToRute(rule.path || rule, selfRoutes);

    if (Object.keys(route.PATHKEY)[0] == '') {
      (0, _warn.err)("'".concat(route.PATHKEY[''], "' \u8DEF\u5F84\u5728\u8DEF\u7531\u8868\u4E2D\u672A\u627E\u5230"));
      return null;
    }

    rute = route.rute;

    if (rule.path) {
      rule.path = rute.path;
    }
  }

  if (type != '') {
    // 当然是对象啦 这个主要是首页H5PushTo调用时的
    if (type == 'params' && CONFIG.h5.paramsToQuery) {
      // 如果是name规则并且设置了转query,那么就转path跳转了
      var _nameToRute = nameToRute(rule.name, selfRoutes),
          aliasPath = _nameToRute.aliasPath,
          path = _nameToRute.path;

      delete rule.name;
      delete rule.params;
      rule.path = aliasPath || path;
      type = 'query';
    }

    var query = _config.Global.$parseQuery.transfer(ruleQuery);

    if (CONFIG.encodeURI) {
      if (query != '') {
        rule[type] = {
          query: query.replace(/^query=/, '')
        };
      }
    } else {
      rule[type] = ruleQuery;
    }
  } else {
    // 纯字符串,那就只有是path啦
    rule = rute.path;
  }

  return rule;
};
/**
 * 根据是否获取非vue-Router next管道参数，来进行格式化
 *
 * @param {Object} to
 * @param {Object} from
 * @param {Router} Router  //router当前实例对象
 */


exports.formatUserRule = formatUserRule;

var getRouterNextInfo = function getRouterNextInfo(to, from, Router) {
  var toRoute = to,
      fromRoute = from;
  var H5 = Router.CONFIG.h5;

  if (H5.vueNext === false && H5.vueRouterDev === false) {
    // 不采用vue-router中的to和from,需要格式化成Router中$Route获取的一样一样的
    var toPath = {},
        fromPath = {};
    toPath[to.meta.PATHKEY] = to.meta.PATHKEY === 'path' ? "/".concat(to.meta.pagePath) : "".concat(to.path);
    fromPath[from.meta.PATHKEY] = from.meta.PATHKEY === 'path' ? "/".concat(from.meta.pagePath) : "".concat(from.path);

    if (to.meta.PATHKEY == null) {
      // 未使用uni-pages.json中的配置、通过addRoutes时 meta.PATHKEY 可能未undefined
      toPath = pathToRute(to.path, Router.selfRoutes).PATHKEY;
    }

    if (from.meta.PATHKEY == null) {
      fromPath = pathToRute(from.path, Router.selfRoutes).PATHKEY;
    }

    var isEmptyTo = Object.keys(to.query).length != 0 ? (0, _util.copyObject)(to.query) : (0, _util.copyObject)(to.params);
    var isEmptyFrom = Object.keys(from.query).length != 0 ? (0, _util.copyObject)(from.query) : (0, _util.copyObject)(from.params);
    /* eslint-disable */

    delete isEmptyTo.__id__; // 删除uni-app下的内置属性

    delete isEmptyFrom.__id__;
    /* eslint-enable */

    var toQuery = _config.Global.$parseQuery.queryGet(isEmptyTo).decode;

    var fromQuery = _config.Global.$parseQuery.queryGet(isEmptyFrom).decode;

    toRoute = (0, _util.resolveRule)(Router, toPath, toQuery, Object.keys(toPath)[0]);
    fromRoute = (0, _util.resolveRule)(Router, fromPath, fromQuery, Object.keys(fromPath)[0]);
  } else {
    if (fromRoute.name == null && toRoute.name != null) {
      // 这种情况是因为uni-app在使用vue-router时搞了骚操作。
      fromRoute = _objectSpread(_objectSpread({}, fromRoute), {
        name: toRoute.name
      }); // 这个情况一般出现在首次加载页面
    }
  }

  return {
    toRoute: toRoute,
    fromRoute: fromRoute
  };
};

exports.getRouterNextInfo = getRouterNextInfo;

var vueDevRouteProxy = function vueDevRouteProxy(routes, Router) {
  var proxyRoutes = [];

  for (var i = 0; i < routes.length; i += 1) {
    var item = routes[i];
    var childrenRoutes = Reflect.get(item, 'children');

    if (childrenRoutes != null) {
      var childrenProxy = vueDevRouteProxy(childrenRoutes, Router);
      item.children = childrenProxy;
    }

    var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, item);
    proxyRoutes.push(ProxyRoute);
  }

  return proxyRoutes;
};
/**
 * 组装成编码后的路由query传递信息
 * @param {Object} CONFIG simple-router 对象配置
 * @param {Object} query 传递的参数
 * @param {Object} mode 路由模式
 */


exports.vueDevRouteProxy = vueDevRouteProxy;

var encodeURLQuery = function encodeURLQuery(CONFIG, query, mode) {
  if (Object.keys(query).length == 0) {
    // 没有传值的时候 我们啥都不管
    return '';
  }

  if (CONFIG.h5.vueRouterDev === false) {
    // 没有采取完全模式开发时 才转换
    var _Global$$parseQuery$q = _config.Global.$parseQuery.queryGet(query),
        strQuery = _Global$$parseQuery$q.strQuery,
        historyObj = _Global$$parseQuery$q.historyObj;

    if (mode === 'history') {
      return historyObj;
    }

    return strQuery;
  } // 完全彩种 vue-router 开发的时候 我们不用管


  if (mode === 'history') {
    // 此模式下 需要的就是对象
    return query;
  }

  return _config.Global.$parseQuery.stringify(query); // hash转成字符串拼接
};
/**
 * 把一个未知的路由跳转规则进行格式化为 hash、history 可用的,主要表现在 history模式下直接传入path会报错__id__错误的问题
 * @param {*} path 需要判断修改的路径规则
 */


exports.encodeURLQuery = encodeURLQuery;

var strPathToObjPath = function strPathToObjPath(path) {
  if (path == null) {
    // 我们也不用管啦,这个情况是路由守卫中传递的
    return path;
  }

  if ((0, _util.isObject)(path)) {
    // 是对象我们不用管
    return path;
  }

  return {
    // 这种情况就是只有path时,直接返回path对象了
    path: path
  };
};
/**
 * 通过 getCurrentPages() api 获取指定页面的 page 对象 默认是获取当前页面page对象
 * @param {Number} index //需要获取的页面索引
 * @param {Boolean} all //是否获取全部的页面
 */


exports.strPathToObjPath = strPathToObjPath;

var getPages = function getPages() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var all = arguments.length > 1 ? arguments[1] : undefined;
  var pages = getCurrentPages(all);
  return pages.reverse()[index];
};
/**
 * 获取当前页面下的 Route 信息
 *
 * @param {Object} pages 获取页面对象集合
 * @param {Object} Vim 用户传递的当前页面对象
 */


exports.getPages = getPages;

var H5GetPageRoute = function H5GetPageRoute(pages, Vim) {
  if (pages.length > 0) {
    // 直接取当前页面的对象
    var currentRoute = pages[pages.length - 1].$route;
    return getRouterNextInfo(currentRoute, currentRoute, this).toRoute;
  }

  if (Vim && Vim.$route) {
    return getRouterNextInfo(Vim.$route, Vim.$route, this).toRoute;
  }

  return {};
};
/**
 * 在useUniConfig:true 的情况下重新拼装路由表 useUniConfig:false 不需要读取page.json中的数据 直接使用component作为页面组件
 * @param {Router} Router//unis-simple-router 路由对象
 * @param {vueRouter} vueRouter//vue-router对象
 * @param {Boolean} useUniConfig//是否采用uni-page.json中的配置选项
 * @param {Array} routes//需要循环的routes表
 */


exports.H5GetPageRoute = H5GetPageRoute;

var diffRouter = function diffRouter(Router, vueRouter, useUniConfig, routes) {
  var newRouterMap = [];

  if (useUniConfig) {
    // 使用pages.json的样式配置 只是单纯的把url路径改成用户自定义的 保留uni的所以的配置及生命周期、缓存
    var Routes = routes || vueRouter.options.routes;
    var cloneSelfRoutes = (0, _util.copyObject)(Router.selfRoutes); // copy一个对象随便搞xxoo

    Routes.forEach(function (item) {
      var path = item.path === '/' ? item.alias : item.path;
      var vueRoute = Router.vueRoutes[path] || Router.vueRoutes[item.path] || Router.selfRoutes[path];
      var CselfRoute = Router.selfRoutes[path];
      delete cloneSelfRoutes[path]; // 移除已经添加到容器中的路由，用于最后做对比 是否page.json中没有，而实例化时传递了

      if (CselfRoute == null) {
        return (0, _warn.err)("\u8BFB\u53D6 \u2018pages.json\u2019 \u4E2D\u9875\u9762\u914D\u7F6E\u9519\u8BEF\u3002\u5B9E\u4F8B\u5316\u65F6\u4F20\u9012\u7684\u8DEF\u7531\u8868\u4E2D\u672A\u627E\u5230\u8DEF\u5F84\u4E3A\uFF1A".concat(path, " \r\n\r\n \u53EF\u4EE5\u5C1D\u8BD5\u628A \u2018useUniConfig\u2019 \u8BBE\u7F6E\u4E3A \u2018false\u2019\u3002\u6216\u8005\u914D\u7F6E\u6B63\u786E\u7684\u8DEF\u5F84\u3002\u5982\u679C\u4F60\u662F\u52A8\u6001\u6DFB\u52A0\u7684\u5219\u4E0D\u7528\u7406\u4F1A"));
      }

      var pageConfigJson = {
        config: {}
      };

      if (vueRoute.component) {
        pageConfigJson = getFuntionConfig(vueRoute.component.render.toString());
        CselfRoute.component = {
          render: function render(h) {
            return vueRoute.component.render(h);
          }
        };
      }

      delete CselfRoute.components; // useUniConfig:true 时不允许携带components

      delete CselfRoute.children; // useUniConfig:true 时不允许携带children

      CselfRoute.meta = _objectSpread(_objectSpread(_objectSpread({}, pageConfigJson.config), item.meta || {}), {}, {
        PATHKEY: CselfRoute.aliasPath ? 'aliasPath' : 'path',
        pagePath: CselfRoute.path.substring(1)
      });
      CselfRoute.path = CselfRoute.aliasPath || (item.path === '/' ? item.path : CselfRoute.path);
      item.alias = item.path === '/' ? item.alias : CselfRoute.path; // 重新给vueRouter赋值一个新的路径，欺骗uni-app源码判断

      var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, CselfRoute);
      newRouterMap.push(ProxyRoute);
    });

    if (Object.keys(cloneSelfRoutes).length > 0) {
      // 确实page.json中没有，而实例化时传递了
      var testG = cloneSelfRoutes['*']; // 全局通配符,他是个例外'通配符'可以被添加

      if (testG && routes == null) {
        var ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, Router.selfRoutes['*']);
        newRouterMap.push(ProxyRoute);
      }

      if (routes == null) {
        // 非动态添加时才打印警告
        var cloneSelfRoutesKeys = Object.keys(cloneSelfRoutes);

        for (var i = 0; i < cloneSelfRoutesKeys.length; i += 1) {
          var key = cloneSelfRoutesKeys[i];

          if (key !== '*') {
            // 通配符不警告
            (0, _warn.warn)("\u5B9E\u4F8B\u5316\u65F6\u4F20\u9012\u7684routes\u53C2\u6570\uFF1A\r\n\r\n ".concat(JSON.stringify(cloneSelfRoutes[key]), " \r\n\r\n \u5728pages.json\u4E2D\u672A\u627E\u5230\u3002\u81EA\u5B9A\u6392\u9664\u6389\uFF0C\u4E0D\u4F1A\u6DFB\u52A0\u5230\u8DEF\u7531\u4E2D"));
          }
        }
      }
    }
  } else {
    // 不使用任何的uni配置完全使用 完全使用component作为页面使用
    var _Routes = routes || Router.selfRoutes;

    var RoutesKeys = Object.keys(_Routes);

    for (var _i = 0; _i < RoutesKeys.length; _i += 1) {
      var _key = RoutesKeys[_i];
      var item = _Routes[_key]; // eslint-disable-next-line

      if (item._ROUTERPATH != null) {
        // 不寻找children下的路径，只取第一层
        continue;
      }

      delete item.components;
      delete item.children;
      item.path = item.aliasPath || item.path; // 优先获取别名为路径

      if (item.path !== '*') {
        item.component = item.component.render || item.component; // render可能是用户使用addRoutes api进行动态添加的
      }

      item.meta = _objectSpread(_objectSpread({}, item.meta || {}), {}, {
        PATHKEY: item.aliasPath ? 'aliasPath' : 'path',
        pagePath: item.path.substring(1)
      });

      var _ProxyRoute = (0, _proxy.proxyBeforeEnter)(Router, item);

      newRouterMap.push(_ProxyRoute);
    }
  }

  return newRouterMap;
};

exports.diffRouter = diffRouter;

/***/ }),

/***/ 53:
/*!*****************************************************************!*\
  !*** ./node_modules/uni-simple-router/vueRouter/proxy/proxy.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proxyEachHooks = exports.proxyBeforeEnter = void 0;

var _concat = __webpack_require__(/*! ../concat */ 54);

var _base = __webpack_require__(/*! ../base */ 38);

var _myArray = _interopRequireDefault(__webpack_require__(/*! ../extends/myArray */ 55));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 通过 Object.defineProperty 代理一个对象主要是拦截beforeEnter 生命钩子
 * @param {Router} Router  路由实例对象
 * @param {Object} BeProxy 需要代理的路由表
 */
var proxyBeforeEnter = function proxyBeforeEnter(Router, BeProxy) {
  var proxyDc = Object.create(null); // 创建没有继承的属性

  var BeProxyKeys = Object.keys(BeProxy);

  var _loop = function _loop(i) {
    var key = BeProxyKeys[i];
    Object.defineProperty(proxyDc, key, {
      enumerable: true,
      configurable: true,
      get: function get() {
        var value = BeProxy[key];

        if (key == 'beforeEnter' && value !== undefined) {
          return function (to, from, next) {
            (0, _concat.beforeEnterHooks)(to, from, next, value, Router);
          };
        }

        return value;
      },
      set: function set(v) {
        BeProxy[key] = v;
      }
    });
  };

  for (var i = 0; i < BeProxyKeys.length; i += 1) {
    _loop(i);
  }

  return proxyDc;
};
/**
 * 在uni-app没有注入生命周期时先直接代理相关生命周期数组
 * @param {Object} Router
 * @param {Object} key
 * @param {Funtion} hookFun
 */


exports.proxyBeforeEnter = proxyBeforeEnter;

var proxyEachHooks = function proxyEachHooks(Router, key, hookFun) {
  var vueOldHooks = _base.vuelifeHooks[key];
  return new _myArray.default(Router, vueOldHooks, hookFun);
};

exports.proxyEachHooks = proxyEachHooks;

/***/ }),

/***/ 54:
/*!************************************************************!*\
  !*** ./node_modules/uni-simple-router/vueRouter/concat.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRouter = exports.triggerLifeCycle = exports.beforeHooks = exports.afterHooks = exports.beforeEnterHooks = exports.forMatNext = exports.appMount = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 42));

var _warn = __webpack_require__(/*! ../helpers/warn */ 39);

var _util = __webpack_require__(/*! ./util */ 52);

var _util2 = __webpack_require__(/*! ../helpers/util */ 36);

var _base = __webpack_require__(/*! ./base */ 38);

var _config = __webpack_require__(/*! ../helpers/config */ 37);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var beforeEachCount = 0;
var afterEachCount = 0;
var resolveLaunch = null;
var beforeEnterDep = []; // 记录当前是否有重复的页面进入 避免重复触发

var beforeEachLaunch = new Promise(function (resolve) {
  return resolveLaunch = resolve;
});
/**
 * 把vue实例进行挂载到dom下
 * @param {Router} Router uni-simple-router实例对象
 */

var appMount = function appMount() {
  if (_base.vueMount.length == 0) {
    return (0, _warn.err)('检测到您未进行dom模型挂载操作，请调用api\r\n\r\n RouterMount(Vim: any, el: any): void');
  }

  var _vueMount$ = _base.vueMount[0],
      Vim = _vueMount$.Vim,
      el = _vueMount$.el;
  var formatEl = el;

  if (el == null) {
    formatEl = '#app'; // 这是uni-app在h5中的官方节点
  }

  try {
    Vim.$mount(formatEl);
  } catch (error) {
    (0, _warn.warn)("\u6302\u8F7Dvue\u8282\u70B9\u65F6\u9519\u8BEF\u5566".concat(error));
  }
};
/**
 * 格式化 next传递过来的参数 作为vue-router可用的
 * @param {Object} to//即将跳转到的路由页面
 * @param {*} Intercept
 * @param {Funtion} next//路由连接管道
 * @param {Router} Router//路由对象
 */


exports.appMount = appMount;

var forMatNext = function forMatNext(to, Intercept, next, Router) {
  var CONFIG = Router.CONFIG,
      selfRoutes = Router.selfRoutes;

  if (CONFIG.h5.vueRouterDev) {
    // 完全使用vue-router开发的时候 vueRouterDev:true 不用做啥直接略过
    next(Intercept);
    return Intercept;
  }

  if (_typeof(Intercept) === 'object') {
    // 只有是对象类型的时候 我们才进行格式化
    var navType = Reflect.get(Intercept, 'NAVTYPE');
    delete Intercept.NAVTYPE;

    if (navType == 'push') {
      Intercept.replace = false;
      Intercept.type = 'navigateTo';
    } else {
      Intercept.replace = true; // uni-app导航api所谓的NAVTYPE取值在h5都是replace:true

      Intercept.type = 'reLaunch';
    }

    var name = Reflect.get(Intercept, 'name'); // 统一格式化path

    Intercept.query = Intercept.params || Intercept.query;
    delete Intercept.name;
    delete Intercept.params;

    if (Intercept.query == null) {
      Intercept.query = {};
    }

    if (name != null) {
      var _nameToRute = (0, _util.nameToRute)(name, selfRoutes),
          aliasPath = _nameToRute.aliasPath,
          path = _nameToRute.path;

      Intercept.path = aliasPath || path;
    } else {
      // 当设置别名时可以是别名跳转也可以path跳转
      Intercept.path = Reflect.get(Intercept, 'path');
      var rute = (0, _util.formatUserRule)(Intercept.path, selfRoutes, CONFIG);

      if (rute == null) {
        return false;
      }

      Intercept.path = rute;
    }

    if (CONFIG.encodeURI) {
      // 如果设置的编码传递则进行编码后传递
      var query = encodeURIComponent(JSON.stringify(Intercept.query));
      var formatQuery = (0, _util2.formatURLQuery)(query);
      Intercept.query = {};

      if (formatQuery != '') {
        Intercept.query.query = formatQuery;
      }
    }
  } else if (Intercept != null && Intercept.constructor === String) {
    Intercept = (0, _util.formatUserRule)(Intercept, selfRoutes, CONFIG);
  }

  var objPath = Intercept;

  if (Intercept != null && Intercept.constructor !== Boolean) {
    objPath = (0, _util.strPathToObjPath)(Intercept);

    if (objPath != null) {
      var type = Reflect.get(objPath, 'type');

      if (type == null) {
        // 当next()是一个路径时
        objPath.type = 'navigateTo';
      }
    }
  } else if (Intercept === false) {
    Router.lifeCycle.routerAfterHooks[0].call(Router, {
      H5Intercept: true
    });
  }

  next(objPath); // 统一格式化为对象的方式传递

  return Intercept;
};
/**
 *  v1.5.4+
 * beforeRouteLeave 生命周期
 * @param {Object} to       将要去的那个页面 vue-router to对象
 * @param {Object} from     从那个页面触发的 vue-router from对象
 * @param {Object} next      vue-router beforeEach next管道函数
 * @param {Object} Router   Router路由对象
 */


exports.forMatNext = forMatNext;

var beforeRouteLeaveHooks = function beforeRouteLeaveHooks(to, from, next, Router) {
  return new Promise(function (resolve) {
    var currentRoute = Router.$route.currentRoute;

    if (currentRoute.path == to.path) {
      // 如果是同一个页面直接返回  不执行页面中的Leave事件
      return resolve();
    }

    var page = (0, _util.getPages)(); // 获取到当前的页面对象

    if (page == null || page._HHYANGbeforeRouteLeaveCalled) {
      (0, _warn.warn)('当前环境下无须执行 beforeRouteLeave。 原因：1.page等于null  2.真的的无须执行');
      return resolve();
    }

    var beforeRouteLeaveArray = page.$options.beforeRouteLeave; // 获取到页面下的 beforeRouteLeave 路由守卫

    if (beforeRouteLeaveArray == null) {
      // 当前页面没有预设 beforeRouteLeave 啥都不做
      return resolve();
    }

    var _getRouterNextInfo = (0, _util.getRouterNextInfo)(to, from, Router),
        toRoute = _getRouterNextInfo.toRoute,
        fromRoute = _getRouterNextInfo.fromRoute;

    var beforeRouteLeave = beforeRouteLeaveArray[0]; // 不管怎么样 只执行第一个钩子  其他都不管

    beforeRouteLeave.call(page, toRoute, fromRoute, function (Intercept) {
      // 开始执行生命周期
      if (Intercept == null) {
        // 放行状态  直接返回
        return resolve();
      }

      page._HHYANGbeforeRouteLeaveCalled = true; // 标记一下当前已经做过 beforeRouteLeave 啦

      forMatNext(to, Intercept, next, Router); // 直接交给vue-router 处理
    });
  });
};
/**
 * 修复首页beforeEnter执行两次的问题 https://github.com/SilurianYang/uni-simple-router/issues/67
 *
 * beforeEnter 生命周期
 * @param {Object} to
 * @param {Object} from
 * @param {Object} next
 * @param {Object} userHooks
 * @param {Object} Router
 */


var beforeEnterHooks = function beforeEnterHooks(to, from, next, userHooks, Router) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(resolve) {
      var res;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!beforeEnterDep.includes(to.path)) {
                _context2.next = 3;
                break;
              }

              next();
              return _context2.abrupt("return", resolve());

            case 3:
              beforeEnterDep = [to.path];

              if (!Reflect.get(Router, 'H5RouterReady')) {
                _context2.next = 11;
                break;
              }

              _context2.next = 7;
              return new Promise( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolveNext) {
                  var _getRouterNextInfo2, toRoute, fromRoute;

                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _getRouterNextInfo2 = (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo2.toRoute, fromRoute = _getRouterNextInfo2.fromRoute;
                          _context.next = 3;
                          return userHooks(toRoute, fromRoute, resolveNext);

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 7:
              res = _context2.sent;
              forMatNext(to, res, next, Router);
              _context2.next = 12;
              break;

            case 11:
              next();

            case 12:
              resolve();

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
};
/**
 * vueAfter 生命周期
 * @param {Object} to
 * @param {Object} from
 * @param {Object} next
 * @param {Object} Router
 */


exports.beforeEnterHooks = beforeEnterHooks;

var afterHooks = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(to, from, next, Router) {
    var _getRouterNextInfo3, toRoute, fromRoute;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _base.vuelifeHooks.afterHooks[0](to, from);

            if (!_config.lifeCycle.afterHooks[0]) {
              _context3.next = 10;
              break;
            }

            if (!(afterEachCount === 0)) {
              _context3.next = 6;
              break;
            }

            _context3.next = 5;
            return beforeEachLaunch;

          case 5:
            appMount(Router);

          case 6:
            _getRouterNextInfo3 = (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo3.toRoute, fromRoute = _getRouterNextInfo3.fromRoute;

            _config.lifeCycle.afterHooks[0](toRoute, fromRoute);

            _context3.next = 11;
            break;

          case 10:
            if (afterEachCount === 0) {
              appMount(Router);
            }

          case 11:
            afterEachCount += 1;
            Router.lifeCycle.routerAfterHooks[0].call(Router);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function afterHooks(_x3, _x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * vueBefore 生命周期
 * @param {Object} to       将要去的那个页面 vue-router to对象
 * @param {Object} from     从那个页面触发的 vue-router from对象
 * @param {Object} next      vue-router beforeEach next管道函数
 * @param {Object} H5Config
 */


exports.afterHooks = afterHooks;

var beforeHooks = function beforeHooks(to, from, next, Router) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(resolve) {
      var H5;
      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return Router.lifeCycle.routerbeforeHooks[0].call(Router);

            case 2:
              _context6.next = 4;
              return beforeRouteLeaveHooks(to, from, next, Router);

            case 4:
              // 执行1.5.4+ beforeRouteLeave生命钩子
              H5 = Router.CONFIG.h5;

              _base.vuelifeHooks.beforeHooks[0](to, from, /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(Intercept) {
                  var res, beforeIntercept, selfRoutes, beforeEnter;
                  return _regenerator.default.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          if (!(Intercept != null && H5.keepUniIntercept === true && H5.vueRouterDev === false)) {
                            _context5.next = 5;
                            break;
                          }

                          next(Intercept);
                          (0, _warn.warn)('uni-app 内部强制触发跳转拦截');
                          beforeEachCount += 1;
                          return _context5.abrupt("return", resolve());

                        case 5:
                          if (_config.lifeCycle.beforeHooks[0]) {
                            _context5.next = 10;
                            break;
                          }

                          next();
                          beforeEachCount += 1;
                          resolveLaunch();
                          return _context5.abrupt("return", resolve());

                        case 10:
                          _context5.next = 12;
                          return new Promise( /*#__PURE__*/function () {
                            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolveNext) {
                              var _getRouterNextInfo4, toRoute, fromRoute;

                              return _regenerator.default.wrap(function _callee4$(_context4) {
                                while (1) {
                                  switch (_context4.prev = _context4.next) {
                                    case 0:
                                      _getRouterNextInfo4 = (0, _util.getRouterNextInfo)(to, from, Router), toRoute = _getRouterNextInfo4.toRoute, fromRoute = _getRouterNextInfo4.fromRoute;
                                      _context4.next = 3;
                                      return _config.lifeCycle.beforeHooks[0](toRoute, fromRoute, resolveNext);

                                    case 3:
                                    case "end":
                                      return _context4.stop();
                                  }
                                }
                              }, _callee4);
                            }));

                            return function (_x9) {
                              return _ref6.apply(this, arguments);
                            };
                          }());

                        case 12:
                          res = _context5.sent;
                          beforeIntercept = forMatNext(to, res, next, Router);

                          if (!(beforeEachCount == 0 && beforeIntercept == null && to.meta.isTabBar)) {
                            _context5.next = 20;
                            break;
                          }

                          // 首次触发beforeEach，并且首页没有进行跳转的情况下才触发beforeEnter 主要是keep-alive
                          selfRoutes = Router.selfRoutes;
                          beforeEnter = Reflect.get(selfRoutes["/".concat(to.meta.pagePath)], 'beforeEnter');

                          if (!beforeEnter) {
                            _context5.next = 20;
                            break;
                          }

                          _context5.next = 20;
                          return beforeEnterHooks(to, from, next, beforeEnter, Router);

                        case 20:
                          beforeEachCount += 1;
                          resolveLaunch();
                          resolve();

                        case 23:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x8) {
                  return _ref5.apply(this, arguments);
                };
              }());

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x7) {
      return _ref4.apply(this, arguments);
    };
  }());
};
/**
 * 通过自动调用router api来完成触发生命周期
 * 修复 history 模式下报错的问题  https://github.com/SilurianYang/uni-simple-router/issues/38
 * 修复 history 模式下刷新页面参数丢失的问题 https://github.com/SilurianYang/uni-simple-router/issues/45
 * 修复 history 模式下首次打开页面url错误时不走 path:* 的匹配项  https://github.com/SilurianYang/uni-simple-router/issues/58
 *
 * @param {Object} Router //当前simple-router 对象
 * @param {Object} vueRouter vue-router对象
 */


exports.beforeHooks = beforeHooks;

var triggerLifeCycle = function triggerLifeCycle(Router, vueRouter) {
  var CONFIG = Router.CONFIG;
  var currRoute = vueRouter.currentRoute;

  if (vueRouter.mode === 'hash') {
    var query = currRoute.query,
        path = currRoute.path;
    var URLQuery = (0, _util.encodeURLQuery)(CONFIG, query, 'hash');
    vueRouter.replace("".concat(path).concat(URLQuery));
  } else {
    var _getRouterNextInfo5 = (0, _util.getRouterNextInfo)(currRoute, currRoute, Router),
        toRoute = _getRouterNextInfo5.toRoute;

    var _URLQuery = (0, _util.encodeURLQuery)(CONFIG, currRoute.query, 'history');

    vueRouter.replace({
      path: toRoute.aliasPath || toRoute.path || currRoute.path,
      query: _URLQuery,
      type: 'redirectTo'
    });
  }
};
/** 注册自定义的路由到vue-router中 前提是必须使用vueRouter开发模式
 * @param {Object} Router
 * @param {Object} vueRouter
 * @param {Boolean} vueRouterDev
 */


exports.triggerLifeCycle = triggerLifeCycle;

var registerRouter = function registerRouter(Router, vueRouter, vueRouterDev) {
  var routeMap = [];

  if (!vueRouterDev) {
    // 则进行对比两个路由表  主要工作是做路径的优化
    routeMap = (0, _util.diffRouter)(Router, vueRouter, Router.CONFIG.h5.useUniConfig);
  } else {
    // 完全使用vue-router开发时直接采用开发者的路由表
    routeMap = (0, _util.vueDevRouteProxy)(Router.CONFIG.routes, Router);
  }

  var createRouter = function createRouter() {
    return new vueRouter.constructor({
      base: vueRouter.options.base,
      mode: vueRouter.options.mode,
      routes: routeMap
    });
  };

  var router = createRouter();
  vueRouter.matcher = router.matcher;
  _config.Global.vueRouter = vueRouter; // 把当前vueRouter缓存到全局对象中

  _config.Global.RouterReadyPromise(); // router已经准备就绪 调用promise.resolve();


  Router.H5RouterReady = true; // 并挂载到Router对象下
  // 注册完成所有的钩子及相关参数，手动触发Router的生命周期

  setTimeout(function () {
    triggerLifeCycle(Router, vueRouter);
  });
};

exports.registerRouter = registerRouter;

/***/ }),

/***/ 55:
/*!*********************************************************************!*\
  !*** ./node_modules/uni-simple-router/vueRouter/extends/myArray.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * 实现一个继承的 数组类  代理掉 vue-router 生命钩子的数据
 */
var MyArray = /*#__PURE__*/function (_Array) {
  _inherits(MyArray, _Array);

  var _super = _createSuper(MyArray);

  function MyArray(Router, vueOldHooks, hookFun) {
    var _this;

    _classCallCheck(this, MyArray);

    _this = _super.call(this);
    _this.Router = Router;
    _this.vueOldHooks = vueOldHooks;
    _this.hookFun = hookFun;
    return _this;
  }

  _createClass(MyArray, [{
    key: "push",
    value: function push(v) {
      var _this2 = this;

      this.vueOldHooks.splice(0, 1, v); // 把vue-router路由生命钩子保存起来

      this[this.length] = function (to, from, next) {
        _this2.hookFun(to, from, next, _this2.Router);
      };
    }
  }]);

  return MyArray;
}( /*#__PURE__*/_wrapNativeSuper(Array));

var _default = MyArray;
exports.default = _default;

/***/ }),

/***/ 56:
/*!***********************************************************!*\
  !*** ./node_modules/uni-simple-router/lifeCycle/hooks.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRouterHooks = exports.registerHook = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 42));

var _util = __webpack_require__(/*! ../helpers/util */ 36);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var registerHook = function registerHook(list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) list.splice(i, 1);
  };
};
/**
 * 注册全局Router生命钩子
 */


exports.registerHook = registerHook;

var registerRouterHooks = function registerRouterHooks() {
  registerHook(this.lifeCycle.routerbeforeHooks, function () {
    var _this = this;

    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.CONFIG.routerBeforeEach(); // 触发暴露给开发者的生命钩子


                if ((0, _util.appPlatform)(true) === 'H5') {
                  H5PATCH.on('toogle', 'startLodding');
                }

                return _context.abrupt("return", resolve(true));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });
  registerHook(this.lifeCycle.routerAfterHooks, function () {
    var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (res.H5Intercept !== true) {
      this.CONFIG.routerAfterEach(); // 触发暴露给开发者的生命钩子
    }

    if ((0, _util.appPlatform)(true) === 'H5') {
      H5PATCH.on('toogle', 'stopLodding');
    }

    return true;
  });
};

exports.registerRouterHooks = registerRouterHooks;

/***/ }),

/***/ 57:
/*!***************************************************************!*\
  !*** ./node_modules/uni-simple-router/patch/applets-patch.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 截止 1.3.5 版本 不做任何操作
 * @param {element} el dom节点
 */
var appletsMount = function appletsMount(Vim) {
  Vim.$mount();
};

var _default = appletsMount;
exports.default = _default;

/***/ }),

/***/ 58:
/*!***********************************************************!*\
  !*** ./node_modules/uni-simple-router/patch/app-patch.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 截止 1.3.5 版本 不做任何操作
 * @param {element} el dom节点
 */
var appMount = function appMount(Vim) {
  Vim.$mount();
};

var _default = appMount;
exports.default = _default;

/***/ }),

/***/ 585:
/*!********************************!*\
  !*** ./src/common/js/mixin.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  methods: {
    renovationGoTo: function renovationGoTo(params) {
      switch (params.linkType) {
        case 0:
          //站内跳转
          if (params.linkValue == "/pages/category/index" || params.linkValue == "/pages/index/index" || params.linkValue == "/pages/my/index" || params.linkValue == "/pages/cart/index") {
            uni.switchTab({
              url: params.linkValue
            });
          } else {
            var pageQuery = params.linkValue.split("?")[1];
            var queryObjectArray = pageQuery ? pageQuery.split("&") : [];
            var object = {};

            for (var i = 0; i < queryObjectArray.length; i++) {
              object[queryObjectArray[i].split("=")[0]] = queryObjectArray[i].split("=")[1];
            }

            this.$Router.push({
              path: params.linkValue.split("?")[0],
              query: object
            });
          }

          break;

        case 1:
          //url跳转
          if (params.linkValue) {
            if (params.linkValue.indexOf(this.$config.localhostUrl) != "-1") {
              //站内页面
              var hrefLink = params.linkValue.split("/");

              if (hrefLink[hrefLink.length - 2] == "act") {
                //装修页面
                this.$Router.push({
                  path: "/pages/renovation/index",
                  query: {
                    url: hrefLink[hrefLink.length - 1]
                  }
                });
              }
            } else {
              this.$Router.push({
                path: "/pages/webView/index",
                query: {
                  url: params.linkValue
                }
              });
            }
          }

          break;

        case 2:
          //商品
          this.$Router.push({
            path: "/pages/goodsDetails/index",
            query: {
              goodsId: params.linkValue
            }
          });
          break;

        case 3:
          //类目
          this.$Router.push({
            path: "/pages/goodsList/index",
            query: {
              frontCategoryId: params.linkValue
            }
          });
          break;

        case 4:
          //店铺
          this.$Router.push({
            path: "/pages/shop/index",
            query: {
              storeId: params.linkValue
            }
          });
          break;

        case 5:
          //品牌
          this.$Router.push({
            path: "/pages/goodsList/index",
            query: {
              brandId: params.linkValue
            }
          });
          break;
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 59:
/*!**********************************************************!*\
  !*** ./node_modules/uni-simple-router/helpers/mixins.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = __webpack_require__(/*! ./config */ 37);

var _init = _interopRequireDefault(__webpack_require__(/*! ../vueRouter/init */ 60));

var _init2 = __webpack_require__(/*! ../appRouter/init */ 61);

var _init3 = _interopRequireDefault(__webpack_require__(/*! ../appletsRouter/init */ 62));

var _util = __webpack_require__(/*! ./util */ 36);

var _hooks = __webpack_require__(/*! ../appRouter/hooks */ 41);

var _hooks2 = __webpack_require__(/*! ../appletsRouter/hooks */ 47);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 获取一些需要在各个平台混入的事件
 * @param {Object} Router 当前原始路由对象
 */
var getMixins = function getMixins(Router) {
  return {
    H5: {
      beforeCreate: function beforeCreate() {
        if (this.$options.router) {
          (0, _init.default)(Router.$root, this.$options.router, this);
        }
      }
    },
    APP: {
      onLaunch: function onLaunch() {
        _config.uniAppHook.onLaunched = true; // 标志已经触发了 onLaunch 事件

        _init2.appInit.call(this, Router.$root);
      },
      onLoad: function onLoad() {
        // 第一个页面 拦截所有生命周期
        if (_config.uniAppHook.onLaunched && !_config.uniAppHook.pageReady) {
          _config.uniAppHook.onLaunched = false;

          _hooks.proxyIndexHook.call(this, Router.$root);
        }

        (0, _init2.removeBackPressEvent)(this.$mp.page, this.$options); // 移除页面的onBackPress事件
      },
      onBackPress: function onBackPress() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _init2.pageIsHeadBack.call(Router.$root, this.$mp.page, this.$options, args);
      }
    },
    APPLETS: {
      onLaunch: function onLaunch() {
        _config.uniAppHook.onLaunched = true; // 标志已经触发了 onLaunch 事件

        _init3.default.call(this, Router.$root);
      },
      onLoad: function onLoad() {
        if (_config.uniAppHook.onLaunched && !_config.uniAppHook.pageReady) {
          // 必须是第一个页面
          _config.uniAppHook.onLaunched = false;

          _hooks2.appletsProxyIndexHook.call(this, Router.$root);
        }
      }
    }
  };
};

var initMixins = function initMixins(Vue, Router) {
  Vue.mixin(_objectSpread({}, getMixins(Router)[(0, _util.appPlatform)(true)]));
};

var _default = initMixins;
exports.default = _default;

/***/ }),

/***/ 60:
/*!**********************************************************!*\
  !*** ./node_modules/uni-simple-router/vueRouter/init.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _concat = __webpack_require__(/*! ./concat */ 54);

var _util = __webpack_require__(/*! ./util */ 52);

var _warn = __webpack_require__(/*! ../helpers/warn */ 39);

var _proxy = __webpack_require__(/*! ./proxy/proxy */ 53);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 重写掉H5端 uni-app原始存在的bug
 *
 * @param {Object} Router
 */
var rewriteUniFun = function rewriteUniFun(Router) {
  if (Router.CONFIG.h5.rewriteFun === false) {
    // 不需要重写
    return false;
  }

  uni.reLaunch = function (_ref) {
    var url = _ref.url;

    if (url === '/') {
      (0, _warn.warn)('H5端 uni.reLaunch(\'/\')时 默认被重写了! 你可以使用 this.$Router.replaceAll() 或者 uni.reLaunch(\'/\'?xxx)'); // eslint-disable-next-line

      if (history.length > 1) {
        // 只有在有历史记录的时候才返回  不然直接返回首页
        return Router.back();
      }

      return Router.replaceAll('/');
    }

    var path = url.match(/^[^?]+|(\/)/)[0];

    try {
      var query = {};
      url.replace(/([^?&]+)=([^?&]+)/g, function (s, v, k) {
        query[v] = decodeURIComponent(k);
        return "".concat(k, "=").concat(v);
      });
      Router.replaceAll({
        path: path,
        query: query
      });
    } catch (e) {
      (0, _warn.err)("".concat(url, "\u89E3\u6790\u5931\u8D25\u4E86....  \u8BD5\u8BD5 this.$Router.replaceAll() \u5427"));
    }
  };

  uni.navigateBack = function (delta) {
    var backLayer = delta;

    if (delta.constructor === Object) {
      // 这种可能就只是uni-app自带的返回按钮,还有种可能就是开发者另类传递的
      backLayer = 1;
    }

    Router.back(backLayer, delta);
  };
};
/**
 * 拦截并注册vueRouter中的生命钩子，路由表解析
 * @param {Object} Router
 * @param {vueRouter} vueRouter
 */


var init = function init(Router, vueRouter) {
  var CONFIG = Router.CONFIG.h5;
  vueRouter.afterHooks = (0, _proxy.proxyEachHooks)(Router, 'afterHooks', _concat.afterHooks);
  vueRouter.beforeHooks = (0, _proxy.proxyEachHooks)(Router, 'beforeHooks', _concat.beforeHooks);
  var objVueRoutes = (0, _util.fromatRoutes)(vueRouter.options.routes, false, {}); // 返回一个格式化好的routes 键值对的形式

  var objSelfRoutes = (0, _util.fromatRoutes)(Router.CONFIG.routes, true, CONFIG);
  Router.vueRoutes = objVueRoutes; // 挂载vue-routes到当前的路由下

  Router.selfRoutes = _objectSpread(_objectSpread({}, Router.selfRoutes || {}), objSelfRoutes); // 挂载self-routes到当前路由下

  Router.$route = vueRouter; // 挂载vue-router到$route

  rewriteUniFun(Router); // 重新掉uniapp上的一些有异常的方法

  (0, _concat.registerRouter)(Router, vueRouter, CONFIG.vueRouterDev);
};

var _default = init;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 61:
/*!**********************************************************!*\
  !*** ./node_modules/uni-simple-router/appRouter/init.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appInit = exports.pageIsHeadBack = exports.removeBackPressEvent = exports.registerLoddingPage = exports.rewriteUniFun = void 0;

var _hooks = __webpack_require__(/*! ./hooks */ 41);

var _config = __webpack_require__(/*! ../helpers/config */ 37);

var _util = __webpack_require__(/*! ./util */ 45);

var _warn = __webpack_require__(/*! ../helpers/warn */ 39);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * 重写掉uni-app的 uni.getLocation 和 uni.chooseLocation APi
 * @param {Object} Router  当前路由对象
 */
var rewriteUniFun = function rewriteUniFun(Router) {
  var oldSwitchTab = uni.switchTab; // 缓存 跳转到 tabBar 页面

  uni.switchTab = function (_ref) {
    var url = _ref.url,
        args = _objectWithoutProperties(_ref, ["url"]);

    var normal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (normal === true || _config.uniAppHook.pageReady === false) {
      // 调用原始的uni-app  api
      oldSwitchTab(_objectSpread({
        url: url
      }, args));
    } else {
      if (_config.uniAppHook.pageReady) {
        // 只有在路由守卫等  处理完所有操作后才能触发
        var path = Router.$Route.path; // 获取当前路径

        if (path == url) {
          // 路径相同不执行
          return (0, _warn.warn)("\u5F53\u524D\u8DF3\u8F6C\u8DEF\u5F84\uFF1A".concat(url, "  \u5DF2\u5728\u672C\u9875\u9762\u65E0\u987B\u8DF3\u8F6C"));
        }

        _hooks.beforeTabHooks.call(Router, url.substring(1)); // 不要 /

      } else {
        (0, _warn.warn)('路由守卫正在忙碌中 不允许执行 ‘uni.switchTab’');
      }
    }
  };
};
/**
 * 对当前app做一个动画页面 用来过渡首次next 等待时间过长的尴尬
 * @param {Object} Router 当前路由对象
 */


exports.rewriteUniFun = rewriteUniFun;

var registerLoddingPage = function registerLoddingPage(Router) {
  var _Router$CONFIG$APP = Router.CONFIG.APP,
      loddingPageHook = _Router$CONFIG$APP.loddingPageHook,
      loddingPageStyle = _Router$CONFIG$APP.loddingPageStyle; // 获取app所有配置

  var view = new plus.nativeObj.View('router-loadding', _objectSpread({
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%'
  }, loddingPageStyle.call(Router)));
  loddingPageHook.call(Router, view); // 触发等待页面生命周期
};
/**
 * 移除当前 页面上 非router 声明的 onBackPress 事件
 * @param {Object} page 当前 vue 组件对象
 * @param {Object} options	当前page对象的 $options
 * 修复 https://github.com/SilurianYang/uni-simple-router/issues/106
 */


exports.registerLoddingPage = registerLoddingPage;

var removeBackPressEvent = function removeBackPressEvent(page, options) {
  var isBack = (0, _util.assertCanBack)(page);

  if (isBack) {
    // 可返回
    options.onBackPress = [options.onBackPress[0]]; // 路由混入的都干掉
  }
};
/**
 * 判断当前页面是否需要拦截返回
 *
 * @param {Object} page 当前 vue 组件对象
 * @param {Object} options 当前 vue 组件对象下的$options对象
 * @param {Array} args  当前页面是点击头部返回还是底部返回
 * 修复 https://github.com/SilurianYang/uni-simple-router/issues/66
 *
 * this 为当前 Router 对象
 */


exports.removeBackPressEvent = removeBackPressEvent;

var pageIsHeadBack = function pageIsHeadBack(page, options, args) {
  if (args[0].from == 'navigateBack') {
    // 调用api返回
    if (_config.Global.LockStatus) {
      // 正在跳转的时候 返回按键按的太快啦
      (0, _warn.warn)('当前页面正在处于跳转状态，请稍后再进行跳转....');
      return true;
    }

    _config.Global.LockStatus = true; // 设置为锁住状态

    _hooks.backApiCallHook.call(this, options, args);

    return true;
  }

  var isBack = (0, _util.assertCanBack)(page);

  if (isBack) {
    // 可返回
    if (_config.Global.LockStatus) {
      // 正在跳转的时候 返回按键按的太快啦
      (0, _warn.warn)('当前页面正在处于跳转状态，请稍后再进行跳转....');
      return true;
    }

    _config.Global.LockStatus = true; // 设置为锁住状态

    _hooks.beforeBackHooks.call(this, options, args);

    return true;
  }

  return false;
};
/**
 * 开始初始化app端路由配置
 *
 * @param {Object} Router
 *
 * this 为当前 page 对象
 */


exports.pageIsHeadBack = pageIsHeadBack;

var appInit = function appInit(Router) {
  _hooks.proxyLaunchHook.call(this);

  var holdTabbar = Router.CONFIG.APP.holdTabbar;

  if (holdTabbar) {
    // 开启tab拦截时
    rewriteUniFun(Router);
  }

  registerLoddingPage(Router);
};

exports.appInit = appInit;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 62:
/*!**************************************************************!*\
  !*** ./node_modules/uni-simple-router/appletsRouter/init.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _hooks = __webpack_require__(/*! ./hooks */ 47);

/**
 * 开始初始化app端路由配置
 *
 * @param {Object} Router 	当前Router对象
 *
 * this 为当前 page 对象
 */
var appletsInit = function appletsInit() {
  _hooks.proxyLaunchHook.call(this);
};

var _default = appletsInit;
exports.default = _default;

/***/ }),

/***/ 63:
/*!************************************************************!*\
  !*** ./node_modules/uni-simple-router/helpers/urlQuery.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = __webpack_require__(/*! ./config */ 37);

var _warn = __webpack_require__(/*! ./warn */ 39);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var nodeURL = __webpack_require__(/*! query-string */ 64);

var ParseQuery = /*#__PURE__*/function () {
  function ParseQuery() {
    _classCallCheck(this, ParseQuery);
  }

  _createClass(ParseQuery, [{
    key: "isDepthObject",

    /**
     * 判断当前这个对象是否为深度对象
     * @param {Object} obj
     */
    value: function isDepthObject(obj) {
      var str = JSON.stringify(obj);
      return str.match(/}/g).length > 1;
    }
    /**
     * 从URL中提取查询字符串
     * @param {String} url
     */

  }, {
    key: "extract",
    value: function extract(url) {
      return nodeURL.extract(url);
    }
    /**
     * 把一个 key=value&key1=value 的字符串转成对象
     * @param {string} strQuery key=value&key1=value 类型的字符串
     */

  }, {
    key: "parse",
    value: function parse(strQuery) {
      return nodeURL.parse(strQuery);
    }
    /**
     * 把一个对象转成 key=value&key1=value 类型的字符串
     * @param {Object} ObjQuery 符合js标注的对象
     * @param {Boolean} intact 是否在转成的字符串前添加？号
     */

  }, {
    key: "stringify",
    value: function stringify(ObjQuery) {
      var intact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var strQuery = nodeURL.stringify(ObjQuery);

      if (intact) {
        return "?".concat(strQuery);
      }

      return strQuery;
    }
    /**
     * 把一个对象或者 key=value&key1=value 类型的数据加密成 query=encodeURIComponent(value)
     * @param {Object|String} query 符合js标注的对象 或者 key=value&key1=value 字符串
     * @param {Boolean} intact 是否在转成的字符串前添加？号
     */

  }, {
    key: "encode",
    value: function encode(query) {
      var intact = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var strQuery = '',
          formatQuery = '';

      if (query == null) {
        (0, _warn.warn)('加密参数没有传递，你知道？', true);
        return '';
      }

      if (query.constructor === String) {
        // 字符串 尝试 转成 对象
        strQuery = JSON.stringify(this.parse(query));
      } else if (query.constructor === Object) {
        // 直接转成字符串对象即可
        if (Object.keys(query).length === 0) {
          (0, _warn.warn)('当前参数不满足加密规范！');
          return '';
        }

        strQuery = JSON.stringify(query);
      }

      if (intact) {
        formatQuery = '?';
      }

      formatQuery += "query=".concat(encodeURIComponent(strQuery));
      return formatQuery;
    }
    /**
     * 把一个已经加密好的字符串 query=encodeURIComponent(value) 解密成 对象
     * @param {string} strQuery  已经加密好的字符串 query=encodeURIComponent(value)
     */

  }, {
    key: "decode",
    value: function decode(strQuery) {
      if (strQuery == null) {
        (0, _warn.warn)('解密参数没有传递，你知道？', true);
        return {};
      }

      var jsonQuery = strQuery;

      if (strQuery.constructor === Object) {
        // 如果是对象 看能不能满足要求
        jsonQuery = strQuery.query;

        if (jsonQuery == null) {
          (0, _warn.warn)('当前解密参数不满足编码规则');
          return {};
        }

        jsonQuery = "query=".concat(jsonQuery);
      }

      var decode = {}; // query 长这个样  query=encodeURIComponent(value)

      var decodeStr = decodeURIComponent(jsonQuery);

      var _this$parse = this.parse(decodeStr),
          query = _this$parse.query; // 转成 json 获取到正真的json字符串


      if (query == null) {
        (0, _warn.warn)('当前解密参数不满足编码规则');
      } else {
        try {
          decode = JSON.parse(query);
        } catch (error) {
          (0, _warn.warn)('当前解密参数不满足编码规则');
        }
      }

      return decode;
    }
  }, {
    key: "queryGet",
    value: function queryGet(query) {
      var encodeURI = _config.Global.Router.CONFIG.encodeURI; // 获取到路由配置

      var decode = query,
          historyObj = query,
          strQuery = '';

      switch (encodeURI) {
        case true:
          {
            // 加密模式
            decode = this.decode(query);
            strQuery = this.encode(decode);
            historyObj = {
              query: encodeURIComponent(JSON.stringify(decode))
            };
            break;
          }

        case false:
          {
            // 不加密模式
            strQuery = this.stringify(query);
            break;
          }

        default:
          {
            (0, _warn.err)('未知参数模式，请检查 \'encodeURI\'', true);
          }
      }

      return {
        strQuery: strQuery,
        historyObj: historyObj,
        decode: decode
      };
    }
    /**
     * 对需要传递的参数进行加密解密
     * @param {Object|String} query get为false 必须为 Object 类型
     * @param {String} get 是取值 还是通过api传值
     */

  }, {
    key: "transfer",
    value: function transfer() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var encodeURI = _config.Global.Router.CONFIG.encodeURI; // 获取到路由配置

      switch (encodeURI) {
        case true:
          {
            // 加密模式
            return this.encode(query, false);
          }

        case false:
          {
            // 不加密模式
            return this.stringify(query);
          }

        default:
          {
            (0, _warn.err)('未知参数模式，请检查 \'encodeURI\' ', true);
          }
      }
    }
  }, {
    key: "queryName",
    get: function get() {
      return nodeURL;
    }
  }]);

  return ParseQuery;
}();

var _default = ParseQuery;
exports.default = _default;

/***/ }),

/***/ 64:
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ 65);
var objectAssign = __webpack_require__(/*! object-assign */ 66);

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

exports.extract = function (str) {
	return str.split('?')[1] || '';
};

exports.parse = function (str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^(\?|#|&)/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		formatter(decodeURIComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
};

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort().map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};


/***/ }),

/***/ 65:
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ }),

/***/ 66:
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 67:
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = {
  transformNnix: function transformNnix(time) {
    //转为unix时间戳
    return new Date(time).getTime();
  },
  transformDate: function transformDate(time) {
    //unix转为标准时间
    var unixtime = time;
    var unixTimestamp = new Date(unixtime);
    var Y = unixTimestamp.getFullYear(),
        M = unixTimestamp.getMonth() + 1 >= 10 ? unixTimestamp.getMonth() + 1 : '0' + (unixTimestamp.getMonth() + 1),
        D = unixTimestamp.getDate() >= 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate(),
        h = unixTimestamp.getHours() < 10 ? "0" + unixTimestamp.getHours() : unixTimestamp.getHours(),
        min = unixTimestamp.getMinutes() < 10 ? "0" + unixTimestamp.getMinutes() : unixTimestamp.getMinutes(),
        s = unixTimestamp.getSeconds() < 10 ? "0" + unixTimestamp.getSeconds() : unixTimestamp.getSeconds();
    var toDay = Y + '-' + M + '-' + D + " " + h + ":" + min + ":" + s;
    return toDay;
  },
  formatDate: function formatDate(date, fmt) {
    //yyyy-MM-dd hh:mm
    date = _typeof(date) == "object" ? date : new Date(date);
    var o = {
      'M+': date.getMonth() + 1,
      // 月份
      'd+': date.getDate(),
      // 日
      'h+': date.getHours(),
      // 小时
      'm+': date.getMinutes(),
      // 分
      's+': date.getSeconds(),
      // 秒
      'S': date.getMilliseconds() // 毫秒

    };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }

    return fmt;
  },

  /**
       * 身份证格式验证
       * @param code string 身份证号码
       */
  IdentityCodeValid: function IdentityCodeValid(code) {
    var _this = this;

    var city = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江 ",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北 ",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏 ",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外 "
    };
    var tip = "";
    var pass = true;

    if (!code || !/^\d{17}(\d|x)$/i.test(code)) {
      tip = "身份证号格式错误";
      pass = false;
    } else if (!city[code.substr(0, 2)]) {
      tip = "地址编码错误";
      pass = false;
    } else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split(''); //∑(ai×Wi)(mod 11)
        //加权因子

        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //校验位

        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;

        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }

        var last = parity[sum % 11];

        if (parity[sum % 11] != code[17]) {
          tip = "校验位错误";
          pass = false;
        }
      }
    } // if(!pass){_this.notice(tip);}


    return pass;
  },
  hintMsg: function hintMsg(msg) {
    uni.showToast({
      title: msg,
      icon: "none"
    });
  },
  getDHours: function getDHours(time) {
    if (!time) {
      return '';
    }

    var last = new Date(new Date(new Date(time).toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
    var now = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
    return parseInt((last - now) / 1000 / 60 / 60 / 24, 10);
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 68:
/*!*********************************!*\
  !*** ./src/common/js/goBack.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  methods: {
    goBack: function goBack(delta) {
      //针对底部tabBar返回的处理
      var getCurrentPage = getCurrentPages();
      var goBackPage = getCurrentPage.length - delta - 1;

      if (goBackPage >= 0) {
        if (getCurrentPage[goBackPage].route.indexOf("/my/index") != "-1" || getCurrentPage[goBackPage].route.indexOf("/cart/index") != "-1" || getCurrentPage[goBackPage].route.indexOf("/category/index") != "-1" || getCurrentPage[goBackPage].route.indexOf("/index/index") != "-1") {
          uni.switchTab({
            url: "/" + getCurrentPage[goBackPage].route
          });
        } else {
          this.$Router.back(delta);
        }
      } else {
        uni.switchTab({
          url: "/pages/index/index"
        });
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 69:
/*!*************************************************!*\
  !*** ./node_modules/zg-sdk-uniapp/zhuge.min.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {!function(e,t){if(true)module.exports=t();else { var a, i; }}(window,function(){return function(e){var t={};function i(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=e,i.c=t,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(a,r,function(t){return e[t]}.bind(null,r));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);var a={uuid(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()},type:e=>Object.prototype.toString.call(e),isObject(e){return"[object Object]"===this.type(e)},isArray(e){return"[object Array]"===this.type(e)},isString(e){return"[object String]"===this.type(e)},isNumber(e){return"[object Number]"===this.type(e)},isDate(e){return"[object Date]"===this.type(e)},isFunction(e){return"[object Function]"===this.type(e)},extend(e,t){let i=e||{},a=t||{};for(let e in i)if(this.isObject(i[e]))a[e]=a[e]?a[e]:{},this.extend(i[e],a[e]);else if(this.isArray(i[e]))if(a[e]&&a[e]!==[]){let t=0,r=a[e].length,s=i[e].length;for(;t<r&&t<s;t++)a[e][t]=this.extend(i[e][t],a[e][t])}else a[e]=i[e];else a[e]=null===a[e]||void 0===a[e]?i[e]:a[e];return a},popEach(e,t){t(e.pop()),e.length&&this.popEach(e,t)},shiftEach(e,t){t(e.shift()),e.length&&this.shiftEach(e,t)},encode(e){let t={};for(let i in e)t["_"+i]=e[i];return t},getSystemInfo:()=>new Promise((e,t)=>{uni.getSystemInfo({success(t){e(t)},fail(e){t(e)}})}),getNet:()=>new Promise((e,t)=>{uni.getNetworkType({success(t){let i=t.networkType.toLowerCase();e({net:"wifi"===i?1:0,mnet:"wifi"===i?0:{"2g":1,"3g":3,"4g":13}[i]||0})},fail(e){t(e)}})}),getCurrentPage(){if(getCurrentPages&&getCurrentPages().length){let e=getCurrentPages();return e[e.length-1]}return null},getPageRoute(){const e=this.getCurrentPage();return e?e.route:""},getPagePath(e){return this.getPageRoute()+e.pathParam},getTimezone:e=>6e4*-e.getTimezoneOffset(),request(e,t){let i=uni.request;return new Promise((a,r)=>{let s=this.extend({url:e+"/apipool",method:"POST",data:{},header:{"content-type":"application/x-www-form-urlencoded"},dataType:"json",responseType:"arraybuffer",success(e){a(e)},fail(e){r(e)}},t);i(s)})},getUtmByQuery(e){let t=["utm_source","utm_medium","utm_campaign","utm_content","utm_term"],i={};for(let a in e)t.indexOf(a)>-1&&(i[`${a}`]=e[a]);return i},haveUtm(e){let t=["utm_source","utm_medium","utm_campaign","utm_content","utm_term"],i=!1,a={};for(const r in e)t.indexOf(r)>-1&&(i=!0,a[r]=e[r]);return i?a:null},deleteQueryParams(e,t){let i=[];return e.split("&").forEach(function(e){let a=new RegExp(t+"=.*"),r="";a.test(e)?(r=e.replace(a,""))&&i.push(r):i.push(e)}),i.join("&")},addUrlParam(e,t){let i=e,a="";for(let e in t)a&&(a+="&"),i=this.deleteQueryParams(i,e),a+=e+"="+t[e];let r=i.split("?");return r.length>1?r[1]?r[1]=a+"&"+r[1]:r[1]=a:1===r.length&&r.push(a),r.join("?")},syncHelper(e){let t=[];return{getQueue(e){let i=null,a=null,r=new Promise((e,s)=>{let u=()=>{t.forEach((e,i)=>{e===r&&t.splice(i,1)})};i=(()=>{u(),e()}),a=(e=>{u(),s(e)})});return t.push(r),{resolve:i,reject:a,promise:r}},async getAwaitQueue(e){if(t.length){let i=[];for(let a=0;a<t.length&&t[a]!==e;a++)i.push(t[a]);i.length&&await Promise.all(i)}}}},isEqual(e,t){if(this.type(e)!==this.type(t))return!1;let i=!0;for(let a in e)e[a]!==t[a]&&(i=!1);return i},getTitle(e){let t="";e.data&&e.data.title&&e.data.title.length>0&&(t=Array.isArray(e.data.title)?e.data.title.join(" "):e.data.title);try{if(!t.length&&__wxConfig&&(__wxConfig.tabBar&&__wxConfig.tabBar.list.forEach(i=>{i.pagePath===`${e.route}.html`&&i.text&&(t=i.text)}),!t.length)){let i=__wxConfig.page[e.route]||__wxConfig.page[`${e.route}.html`];t=i?i.window.navigationBarTitleText:__wxConfig.global.window.navigationBarTitleText}}catch(e){}return t||e.route}};let r=a.syncHelper("storage"),s=e=>new Promise((t,i)=>{uni.getStorage({key:e,success(e){t(e.data)},fail(){t()}})}),u=(e,t)=>new Promise((i,a)=>{uni.setStorage({key:e,data:t,success(){i()},fail(e){a(e)}})});var n={key:"zg",async getAll(){let e=await s(this.key);return e||(e={sid:0,update:0,utm:{}},await u(this.key,e)),e},async get(e){let t=r.getQueue(`storage-get-${e}`);await r.getAwaitQueue(t.promise);const i=await this.getAll();return t.resolve(),i[e]},async set(e,t){let i=r.getQueue(`storage-set-${e}`);await r.getAwaitQueue(i.promise);let a=await this.getAll();a[e]=t,await u(this.key,a),i.resolve()},async registerDid(e){let t=r.getQueue("storage-set-did");await r.getAwaitQueue(t.promise);let i=e||a.uuid();return await u("zg-did",i),t.resolve(),i},async getDid(){let e=r.getQueue("storage-get-did");await r.getAwaitQueue(e.promise);const t=await s("zg-did");return e.resolve(),t},async setUtm(e){await this.set("utm",e)}},o={1001:{utm_source:"微信主程序",utm_medium:"发现栏小程序主入口"},1005:{utm_source:"搜索",utm_medium:"顶部搜索框的搜索结果页"},1006:{utm_source:"搜索",utm_medium:"发现栏小程序主入口搜索框的搜索结果页"},1007:{utm_source:"分享",utm_medium:"单人聊天会话中的小程序消息卡片"},1008:{utm_source:"分享",utm_medium:"群聊会话中的小程序消息卡片"},1011:{utm_source:"扫码",utm_medium:"扫描二维码"},1012:{utm_source:"扫码",utm_medium:"长按图片识别二维码"},1013:{utm_source:"扫码",utm_medium:"手机相册选取二维码"},1014:{utm_source:"小程序模板消息",utm_medium:"小程序模板消息"},1017:{utm_source:"体验版",utm_medium:"前往体验版的入口页"},1019:{utm_source:"微信支付",utm_medium:"微信钱包"},1020:{utm_source:"公众号",utm_medium:"公众号profile页相关小程序列表"},1022:{utm_source:"微信主程序",utm_medium:"聊天顶部置顶小程序入口"},1023:{utm_source:"桌面图标",utm_medium:"安卓系统桌面图标"},1024:{utm_source:"微信主程序",utm_medium:"小程序 profile 页"},1025:{utm_source:"扫码",utm_medium:"扫描一维码"},1026:{utm_source:"微信主程序",utm_medium:"附近小程序列表"},1027:{utm_source:"搜索",utm_medium:"顶部搜索框搜索结果页“使用过的小程序”列表"},1028:{utm_source:"微信卡券",utm_medium:"我的卡包"},1029:{utm_source:"微信卡券",utm_medium:"卡券详情页"},1030:{utm_source:"测试",utm_medium:"自动化测试下打开小程序"},1031:{utm_source:"扫码",utm_medium:"长按图片识别一维码"},1032:{utm_source:"扫码",utm_medium:"手机相册选取一维码"},1034:{utm_source:"微信支付",utm_medium:"微信支付完成页"},1035:{utm_source:"公众号",utm_medium:"公众号自定义菜单"},1036:{utm_source:"分享",utm_medium:"App分享消息卡片"},1037:{utm_source:"小程序",utm_medium:"小程序打开小程序"},1038:{utm_source:"小程序",utm_medium:"从另一个小程序返回"},1039:{utm_source:"摇电视",utm_medium:"摇电视"},1042:{utm_source:"搜索",utm_medium:"添加好友搜索框的搜索结果页"},1043:{utm_source:"公众号",utm_medium:"公众号模板消息"},1044:{utm_source:"分享",utm_medium:"带shareTicket的小程序消息卡片（详情）"},1045:{utm_source:"广告",utm_medium:"朋友圈广告"},1046:{utm_source:"广告",utm_medium:"朋友圈广告详情页"},1047:{utm_source:"扫码",utm_medium:"扫描小程序码"},1048:{utm_source:"扫码",utm_medium:"长按图片识别小程序码"},1049:{utm_source:"扫码",utm_medium:"手机相册选取小程序码"},1052:{utm_source:"微信卡券",utm_medium:"卡券的适用门店列表"},1053:{utm_source:"搜索",utm_medium:"搜一搜的结果页"},1054:{utm_source:"搜索",utm_medium:"顶部搜索框小程序快捷入口"},1056:{utm_source:"音乐播放器菜单",utm_medium:"音乐播放器菜单"},1057:{utm_source:"微信支付",utm_medium:"钱包中的银行卡详情页"},1058:{utm_source:"公众号",utm_medium:"公众号文章"},1059:{utm_source:"体验版",utm_medium:"体验版小程序绑定邀请页"},1064:{utm_source:"微信WIFI",utm_medium:"微信连Wi-Fi状态栏"},1067:{utm_source:"广告",utm_medium:"公众号文章广告"},1068:{utm_source:"广告",utm_medium:"附近小程序列表广告"},1069:{utm_source:"移动应用",utm_medium:"移动应用"},1071:{utm_source:"微信支付",utm_medium:"钱包中的银行卡列表页"},1072:{utm_source:"微信支付",utm_medium:"二维码收款页面"},1073:{utm_source:"客服消息",utm_medium:"客服消息列表下发的小程序消息卡片"},1074:{utm_source:"公众号会话",utm_medium:"公众号会话下发的小程序消息卡片"},1077:{utm_source:"摇周边",utm_medium:"摇周边"},1078:{utm_source:"微信WIFI",utm_medium:"连Wi-Fi成功页"},1079:{utm_source:"微信游戏中心",utm_medium:"微信游戏中心"},1081:{utm_source:"客服消息",utm_medium:"客服消息下发的文字链"},1082:{utm_source:"公众号",utm_medium:"公众号会话下发的文字链"},1084:{utm_source:"广告",utm_medium:"朋友圈广告原生页"},1089:{utm_source:"微信主程序",utm_medium:"微信聊天主界面下拉"},1090:{utm_source:"小程序",utm_medium:"长按小程序右上角菜单唤出最近使用历史"},1091:{utm_source:"公众号",utm_medium:"公众号文章商品卡片"},1092:{utm_source:"微信城市服务",utm_medium:"城市服务入口"},1095:{utm_source:"广告",utm_medium:"小程序广告组件"},1096:{utm_source:"分享",utm_medium:"聊天记录"},1097:{utm_source:"微信支付",utm_medium:"微信支付签约页"},1099:{utm_source:"小程序",utm_medium:"页面内嵌插件"},1102:{utm_source:"公众号",utm_medium:"公众号profile页服务预览"},1129:{utm_source:"爬虫",utm_medium:"微信爬虫"},isShare:function(e){return-1!==[1020,1035,1036,1037,1038,1043].indexOf(e)},isCartShare:function(e){return-1!==[1044,1007,1008,1036].indexOf(e)}};const m=a.syncHelper("tracker"),c=new class{constructor(){this._config={debug:!1,usePlugin:!1,serverUrl:{normal:"https://u.zhugeapi.net",bac:"https://ubak.zhugeio.com"},timeout:18e5,did:"",vn:"1.0",pv:!1,utmMode:"session",parseScene:!0,forwardShare:!1,appId:"",utm:{},superProperty:{},sendLimit:1,duration:!1,afterDuration:null,beforeDuration:null,shareToUtm:{}},this.cn="",this.appKey="",this.referrerDomain="miniprogram",this.referrerUrl=null,this.utmCache=null,this.cuid=null,this.did=null,this.openOptions=null,this.pathParam="",this.pageReady=!1,this.requestCache=[],this.limitCache=[],this.prevPagePath="",this.prevPage=null,this.pageTimeQueue=[]}async _initDid(){const e=await n.getDid(),t=await n.registerDid(e||this._config.did);this.did=t}async _info(){let e=await a.getSystemInfo(),t=new Date,i=await n.getAll(),r={dt:"pl",pr:{$rs:`${e.windowWidth}x${e.windowHeight}`,$tz:a.getTimezone(t),$ct:t.getTime(),$cuid:i.cuid,$sid:i.sid}};await this._sendRequest(r,t)}async sessionUpdate(e){await n.set("update",e)}async _sessionEnd(){let e=await n.getAll(),t=new Date,i=e.update-e.sid,r={dt:"se",pr:{$ct:e.update,$cn:this.cn,$tz:a.getTimezone(t),$dru:i,$sid:e.sid,$cuid:e.cuid,$referrer_domain:this.referrerDomain}};await this._sendRequest(r,t)}async _sessionStart(e){let t=a.isEqual(e,{})?null:e,i=new Date,r=i.getTime(),s=await a.getSystemInfo(),u=await a.getNet();await n.set("sid",r),await this.sessionUpdate(r),await n.setUtm(t||this.utmCache);let o={dt:"ss",pr:{$ct:r,$sid:r,$cuid:await n.get("cuid"),$cn:this.cn,$tz:a.getTimezone(i),$url:a.getPagePath(this),$ref:this.referrerUrl,$os:s.system.split(/\s/)[0],$ov:s.system.split(/\s/)[1],$wv:s.version,$mnet:u.mnet,$net:u.net,$vn:this._config.vn,$referrer_domain:this.referrerDomain,$wxeid:this._config.appId}};await this._sendRequest(o,i),await this._info()}async clearCache(){await Promise.all(this.requestCache.map(e=>(["se","pl"].includes(e.dt)||(e.pr.$url=a.getPagePath(this)),this._sendRequest(e)))),this.requestCache=[]}async _sendRequest(e){if(!this.pageReady)return void this.requestCache.push(e);const t=new Date;await this.sessionUpdate(t.getTime());let i=await n.get("utm")||{};for(let t in i)i[t]&&(e.pr[`$${t}`]=i[t]);await this._batchRequest(e)}async flush(){if(!this.limitCache.length)return;let e=new Date;const t=this.limitCache.map(e=>e);this.limitCache=[];let i={method:"web_event_sr.upload",event:{sln:"itn",pl:"js",sdk:"sys",sdkv:"1.0.5",owner:"zg",ut:`${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()} ${e.toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0]}`,tz:a.getTimezone(e),debug:this._config.debug?1:0,ak:this.appKey,usr:{did:await n.getDid()},data:t},_:e.getTime()+""};a.isObject(i.event)&&(i.event=JSON.stringify(i.event));let r={data:i};a.request(this._config.serverUrl.normal,r).catch(()=>a.request(this._config.serverUrl.bac,r)).catch(e=>{console.error("上传数据失败",e)})}async _batchRequest(e){this.limitCache.push(e),this.limitCache.length<this._config.sendLimit||await this.flush()}async _updateSession(e,t){let i=m.getQueue(e);await m.getAwaitQueue(i.promise);const a=(new Date).getTime();let r=await n.getAll();r.sid&&r.update?a-r.update>this._config.timeout?(await this._sessionEnd(),await this._sessionStart(t)):await this.sessionUpdate(a):await this._sessionStart(t),i.resolve()}async _track(e){let t=new Date;await this._updateSession("_track");let i=await n.getAll(),r=await a.getNet(),s=await a.getSystemInfo(),u={dt:"evt",pr:{$eid:e,$ct:t.getTime(),$sid:i.sid,$cuid:i.cuid,$cn:this.cn,$tz:a.getTimezone(t),$url:a.getPagePath(this),$ref:this.referrerUrl,$os:s.system.split(/\s/)[0],$ov:s.system.split(/\s/)[1],$wv:s.version,$mnet:r.mnet,$net:r.net,$vn:this._config.vn,$referrer_domain:this.referrerDomain,$wxeid:this._config.appId}};return u.pr=a.extend(u.pr,a.encode(this._config.superProperty)),{requestData:u,date:t}}_parseUtm(e){let t=a.getUtmByQuery(e.query||{});if(this._config.parseScene&&e&&e.scene){let i=e.scene;this.cn=i+"";const r=o[i];let s={},u=null;if(o.isShare(i)&&e.referrerInfo&&(u=e.referrerInfo.appId),r){s={utm_source:r.utm_source,utm_medium:r.utm_medium,utm_campaign:u};let t=e.query||{};o.isCartShare(i)&&t.zg_uid&&t.zg_share_id&&(s.utm_term=t.zg_uid,s.utm_content=t.zg_share_id)}t=a.extend(s,t)}this.utmCache=!this._config.utm||a.isEqual(this._config.utm,{})?t:this._config.utm}async _getActivePage(e={time:0,path:""}){this.pageTimeQueue.push(e),this.pageTimeQueue.length>1&&(await this.duration(),this.pageTimeQueue.shift())}async duration(){a.isFunction(this._config.beforeDuration)&&c._config.beforeDuration(this.prevPage);let e=this.pageTimeQueue[0],t=this.pageTimeQueue[1].time-e.time;await this._updateSession("duration");let i=await this._track("dr");i.requestData.dt="abp",i.requestData.pr.$dr=t,i.requestData.pr.$url=e.path,await this._sendRequest(i.requestData,i.date),a.isFunction(this._config.beforeDuration)&&this._config.afterDuration(this.prevPage)}async pv(e){await this._updateSession("pv");let t=await this._track("pv");t.requestData.dt="abp";const i=a.getCurrentPage();let r={$page_title:a.getTitle(i)};this._config.forwardShare&&e&&(r.$share_open_type=1008===e.scene?"群聊":"聊天",e.query&&e.query.zg_share_level&&(r.$share_level=Number(e.query.zg_share_level)),i.data&&i.data.zg_share_data&&(r=a.extend(r,a.encode(i.data.zg_share_data)))),t.requestData.pr=a.extend(t.requestData.pr,r),await this._sendRequest(t.requestData,t.date)}async track(e,t){await this._updateSession(e);let i=await this._track(e);i.requestData.pr=a.extend(i.requestData.pr,a.encode(t)),await this._sendRequest(i.requestData,i.date)}async identify(e,t){await this._updateSession("identify");let i=await n.getAll(),r=new Date;await n.set("cuid",e),this.cuid=e;let s={dt:"usr",pr:{$ct:r.getTime(),$tz:a.getTimezone(r),$cuid:e,$sid:i.sid,$url:a.getPagePath(this)}};s.pr=a.extend(s.pr,a.encode(t)),await this._sendRequest(s,r)}async _load(){if(uni.getAccountInfoSync){let e=uni.getAccountInfoSync();e&&e.miniProgram&&e.miniProgram.appId&&(this._config.appId=e.miniProgram.appId)}await this._initDid()}async load(e,t){this.appKey=e,a.isObject(t)&&(this._config=a.extend(this._config,t)),await this._load(),await this._updateSession("load",this._config.utm),this._config.utm&&!a.isEqual(this._config.utm,{})&&await n.setUtm(this._config.utm)}async setUtm(e){let t=a.haveUtm(e);t&&(await this._updateSession("setUtm",t),await n.setUtm(t),this.did=await n.getDid(),this.cuid=await n.get("cuid"))}weixinIdentify(){let e=this._config.appId;arguments[0]&&"string"==typeof arguments[0]&&(e=arguments[0]);let t=this._config.serverUrl.normal,i="",r="",s="",u="",n="",o="",m="",c=[function(e){wx.login({success:t=>{i=t.code,e&&e()},fail:function(e){console.error("诸葛SDK提示：","登录失败",e)}})},function(e){wx.getSetting({success:t=>{t.authSetting["scope.userInfo"]?wx.getUserInfo({lang:"zh_CN",success:t=>{n=t.userInfo,o=t.iv,m=t.encryptedData,e&&e()}}):console.error("诸葛SDK提示：","未授权",t)}})},function(n){let o=this,m={url:t+"/zgwx/user/code2session",method:"GET",data:{code:i,appId:e},success:e=>{r=e.data.openid,s=e.data.unionid,u=e.data.session_key,n&&n()},fail:function(e){t!==o._config.serverUrl.bac?(m.url=o._config.serverUrl.bac+"/zgwx/user/code2session",a.request(m)):console.error("诸葛SDK提示：","获取codeSession失败",e)}};a.request(m)},function(e){let i=this,r={url:t+"/zgwx/data/decrypt",method:"POST",data:{sessionKey:u,iv:o,encryptData:m},success:function(t){s=t.data.unionId,e&&e(t.data||{})},fail:function(e){t!==i._config.serverUrl.bac?(r.url=i._config.serverUrl.bac+"/zgwx/data/decrypt",a.request(r)):console.error("诸葛SDK提示：","获取codeSession失败",e)}};a.request(r)},function(e){let t="";switch(n.gender){case 1:t="男";break;case 2:t="女"}this.identify(s||r,{name:n.nickName,avatar:n.avatarUrl,"微信-昵称":n.nickName,"微信-性别":t,"微信-城市":n.city,"微信-省":n.province,"微信-国家":n.country}),e&&e()}],d=Array.prototype.pop.call(arguments);"function"==typeof d&&c.push(function(){d({userInfo:n,unionid:s,openid:r,sessionKey:u})}),function e(t,i,a){if(t.length<=a)return;let r=a||0;t[r].call(i,function(){e(t,i,r+1)})}(c,this)}async trackRevenue(e){await this._updateSession("revenue");let t=await this._track("revenue");t.requestData.dt="abp";let i=a.extend({price:0,total:0,productID:null,productQuantity:0,revenueType:null},e);i.total=function(e,t){let i=0;try{e.toString().split(".")[1]&&(i+=e.toString().split(".")[1].length)}catch(e){console.error(e)}try{t.toString().split(".")[1]&&(i+=t.toString().split(".")[1].length)}catch(e){console.error(e)}return Number(e.toString().replace(".",""))*Number(t.toString().replace(".",""))/Math.pow(10,i)}(i.price,i.productQuantity);let r=["productID","revenueType"],s=["price","total","productQuantity"],u={};for(let e in i){if(-1===r.indexOf(e)&&-1===s.indexOf(e))continue;let t=i[e];s.indexOf(e)>-1&&((t=Number(t))||(t=0)),u["$"+e]=t}t.requestData.pr=a.extend(t.requestData.pr,u),await this._sendRequest(t.requestData,t.date)}setSuperProperty(e){a.isObject(e)&&(this._config.superProperty=e)}extendSuperPropertys(e){a.isObject(e)&&(this._config.superProperty=a.extend(this._config.superProperty,e))}removeSuperProperty(e){for(let t of e)delete this._config.superProperty[t]}getSuperProperty(){return this._config.superProperty}};var d=c;const l={zgPrivateAttrs:["eid","ct","tz","cuid","cn","sid","url","os","ov","wv","mnet","referrer_domain","net","vn","wxeid","uid","share_id","share_title","share_level","title","path"]};var h={openData:null,shareId:null,shareLevel:null,shared:!1,async trackOpenShare(e){if(!e||!d._config.forwardShare)return;if(this.shared)return void(this.shared=!1);const t=e.query||{},i=a.getCurrentPage(),r=i.route;if(t.zg_uid&&t.zg_share_id){let s={$uid:t.zg_uid,$share_id:t.zg_share_id,$title:a.getTitle(i),$path:r,$share_open_type:e.scene?e.scene:"待确认场景",$share_level:Number(t.zg_share_level)};this.shareId=t.zg_share_id,this.shareLevel=Number(t.zg_share_level);let u={};for(let e in t){let i=e.replace(/^zg_/,"");-1===l.zgPrivateAttrs.indexOf(i)&&/^zg_/.test(e)&&(u[i]=t[e])}const n=d._config.shareToUtm;if(a.isObject(n)&&!a.isEqual(n,{})){let e={};for(let t in n)null!==u[t]&&void 0!==u[t]&&(e[n[t]]=u[t]);a.isEqual(e,{})||(e.utm_campaign||(e.utm_campaign="分享打开"),await d.setUtm(e))}this.openData={path:r,props:u},s=a.extend(s,a.encode(u)),d._track("wxsopen").then(async e=>{e.requestData.dt="abp",e.requestData.pr=a.extend(e.requestData.pr,s),await d._sendRequest(e.requestData,e.date)})}},onShareAppMessage(){const e=this;return function(t){if(!d._config.forwardShare)return t;t.path=t.path||this.__route__+d.pathParam;const i=t.title||a.getTitle(this),r=t.path.split("?")[0],s=this.$data.zg_share_data;let u=(new Date).getTime(),n=1;!this.$data.newShare&&e.openData&&e.openData.path===r&&a.isEqual(s||{},e.openData.props)&&(u=e.shareId,n=e.shareLevel+1);let o={share_id:u,uid:d.cuid||d.did,share_level:n},m={$share_title:i,$title:a.getTitle(this)||"",$path:r},c={};for(let e in o)m[`$${e}`]=c[`zg_${e}`]=o[e];for(let e in s)-1===l.zgPrivateAttrs.indexOf(e)&&(m[`_${e}`]=c[`zg_${e}`]=s[e]);return t.path=a.addUrlParam(t.path,c),d._track("wxshare").then(async e=>{e.requestData.dt="abp",e.requestData.pr=a.extend(e.requestData.pr,m),await d._sendRequest(e.requestData,e.date)}),e.shared=!0,t}}};const _={app:{onLaunch(){},onShow(e){(async()=>{d._parseUtm(e),"fresh"===d._config.utmMode&&await n.setUtm(d.utmCache),await d._updateSession("appShow")})(),d.openOptions=e},async onHide(){d._config.duration&&(d.pageReady=!0,await d._getActivePage({time:(new Date).getTime(),path:a.getPagePath(d)}),d.pageTimeQueue=[],d.prevPagePath="",d.prevPage=null,d.pageReady=!1)}},page:{onLoad(){},onShow(){let e=a.getCurrentPage().options;if(e&&!a.isEqual(e,{})){let t=[],i=Object.keys(e);i.sort((e,t)=>e>t?1:e<t?-1:0),i.forEach(i=>{t.push(`${i}=${e[i]}`)}),d.pathParam=`?${t.join("&")}`}else d.pathParam="";d.prevPagePath!==a.getPagePath(d)&&d._config.duration&&d._getActivePage({time:(new Date).getTime(),path:a.getPagePath(d)}),d.pageReady=!0,d.clearCache(),h.trackOpenShare(d.openOptions),d._config.pv&&d.pv(d.openOptions),d.openOptions=null},onReady(){},onHide(){d.prevPagePath=a.getPagePath(d),d.prevPage=a.getCurrentPage(),d.pageReady=!1,d.flush(),d.referrerUrl=a.getPagePath(d)},onUnload(){d.prevPagePath=a.getPagePath(d),d.prevPage=a.getCurrentPage(),d.pageReady=!1,d.flush(),d.referrerUrl=a.getPagePath(d)}}};var p={onLaunch(){this._zg_isAppRoot_=!0,_.app.onLaunch.call(this)},onLoad(){_.page.onLoad.call(this)},onShow(e){this.zhuge=d,this.zhugeShare=h,this._zg_isAppRoot_?_.app.onShow.call(this,e):_.page.onShow.call(this)},onReady(){_.page.onReady.call(this)},onHide(){this._zg_isAppRoot_?_.app.onHide.call(this):_.page.onHide.call(this)},onUnload(){this._zg_isAppRoot_||_.page.onUnload.call(this)}};i.d(t,"zhuge",function(){return d}),i.d(t,"mixins",function(){return p})}])});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 70:
/*!***************************************!*\
  !*** ./src/common/js/wxShareMixin.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  data: function data() {
    return {
      wxShare: {
        title: "文器库商城",
        path: "" // imageUrl:"http://beifa-mall.oss-cn-shanghai.aliyuncs.com/appletsImages/WechatIMG30.png",

      }
    };
  },
  onShareAppMessage: function onShareAppMessage(res) {
    //发送给朋友
    var routes = getCurrentPages();
    var options = routes[routes.length - 1].options;
    var shareNumber = uni.getStorageSync("shareNumber") ? uni.getStorageSync("shareNumber") : "";
    this.wxShare.path = "/" + routes[routes.length - 1].route + "?shareNumber=" + shareNumber;

    for (var i in options) {
      this.wxShare.path += "&" + i + "=" + options[i];
    }

    return this.wxShare;
  },
  onShareTimeline: function onShareTimeline(res) {
    //分享到朋友圈
    var routes = getCurrentPages();
    var options = routes[routes.length - 1].options;
    var shareNumber = uni.getStorageSync("shareNumber") ? uni.getStorageSync("shareNumber") : "";
    this.wxShare.path = "/" + routes[routes.length - 1].route + "?shareNumber=" + shareNumber;

    for (var i in options) {
      this.wxShare.path += "&" + i + "=" + options[i];
    }

    return this.wxShare;
  },
  methods: {
    shareJudge: function shareJudge() {
      if (this.$Route.query.shareNumber) {
        uni.setStorageSync("routerShareNumber", this.$Route.query.shareNumber);
      }
    },
    wxShareH5: function wxShareH5() {
      var _this = this;

      this.$wxShare.ready(function () {
        // 分享到朋友圈
        _this.$wxShare.onMenuShareTimeline({
          title: _this.wxShare.title,
          // 分享标题
          link: window.location.href,
          // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: _this.wxShare.imageUrl,
          // 分享图标
          success: function success() {}
        });

        _this.$wxShare.onMenuShareAppMessage({
          title: _this.wxShare.title,
          // 分享标题
          desc: '我的时尚生活 GET A LIFE',
          // 分享描述
          link: window.location.href,
          // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: _this.wxShare.imageUrl,
          // 分享图标
          success: function success() {}
        });
      });
    }
  },
  mounted: function mounted() {
    //plus分享code
    this.shareJudge();
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 730:
/*!*****************************************!*\
  !*** ./src/common/js/uniUploadImage.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AES = _interopRequireDefault(__webpack_require__(/*! @/utils/AES.js */ 19));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  methods: {
    uploadImage: function uploadImage(res, params) {
      var _this = this;

      //上传图片   res为生成的临时地址   params为可选参数 
      uni.uploadFile({
        url: this.$config.addImageUrl + '/base/file/mgmt/addOneImage',
        filePath: res,
        name: 'image',
        success: function success(uploadFileRes) {
          _this.updateImage(JSON.parse(_AES.default.decrypt(JSON.parse(uploadFileRes.data))), params);
        },
        fail: function fail(params) {}
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 8:
/*!***********************************!*\
  !*** ./src/api/decorate/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 9));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  searchComponent: function searchComponent(id) {
    //获取店铺首页头部tab
    return _request.default.post(_url.default.searchComponent + id + "/0");
  },
  storeSearchNew: function storeSearchNew(storeId) {
    //获取店铺首页banner以及商品
    return _request.default.post(_url.default.storeSearchNew + storeId);
  },
  storeList: function storeList(params) {
    //获取店铺首页装修数据
    return _request.default.post(_url.default.storeList, params);
  },
  labelItems: function labelItems(title, page) {
    //获取首页底部tab数据
    return _request.default.post(_url.default.labelItems, {
      page: page,
      title: title,
      urlSuffix: "shouyezhuangxiu"
    });
  },
  decorateList: function decorateList(params) {
    //装修系统分页
    return _request.default.post(_url.default.decorateList, params);
  },
  getMiniRotuer: function getMiniRotuer() {
    //装修组建站内跳转配置  用于配置h5站内跳转地址对应
    return _request.default.post(_url.default.getMiniRotuer, {});
  }
};
exports.default = _default;

/***/ }),

/***/ 882:
/*!*******************************!*\
  !*** ./src/api/cash/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 883));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  withdrawInfo: function withdrawInfo() {
    //用户提现信息
    return _request.default.post(_url.default.withdrawInfo, {});
  },
  sendCaptcha: function sendCaptcha() {
    //发送提现短信验证码
    return _request.default.post(_url.default.sendCaptcha, {});
  },
  apply: function apply(params) {
    //申请提现
    return _request.default.post(_url.default.apply, params);
  },
  pageWithdrawApplys: function pageWithdrawApplys(params) {
    //提现记录
    return _request.default.post(_url.default.pageWithdrawApplys, params);
  }
};
exports.default = _default;

/***/ }),

/***/ 883:
/*!*****************************!*\
  !*** ./src/api/cash/url.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var cashApi = {
  withdrawInfo: "/cash/member/withdraw/info",
  //用户提现信息
  sendCaptcha: "/cash/member/withdraw/sendCaptcha",
  //发送提现短信验证码
  apply: '/cash/member/withdraw/apply',
  //申请提现
  pageWithdrawApplys: '/cash/member/withdraw/pageWithdrawApplys' //提现记录

};
var _default = cashApi;
exports.default = _default;

/***/ }),

/***/ 9:
/*!*********************************!*\
  !*** ./src/api/decorate/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var decorateApi = {
  searchComponent: "/decorate/app/homePage/searchComponent/",
  //获取首页头部tab
  storeSearchNew: "/decorate/appHomePage/storeSearchNew/",
  //获取店铺首页数据
  storeList: "/decorate/customer/component/list",
  //获取店铺首页装修数据 / 通用装修
  // labelItems:"/decorate/app/homePage/recommendSliding/labelItems",	//获取首页底部tab商品数据
  decorateList: "/decorate/customer/component/componentPage",
  //装修系统分页
  labelItems: "/decorate/customer/component/boutique/labelItems",
  //首页底部tab
  getMiniRotuer: "/decorate/customer/component/getMiniRotuer" //装修组建站内跳转配置  用于配置h5站内跳转地址对应

};
var _default = decorateApi;
exports.default = _default;

/***/ }),

/***/ 900:
/*!*********************************************!*\
  !*** ./src/common/js/downloadAndPreview.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 下载 和 预览图片
var _default = {
  data: function data() {
    return {
      isScopedFlag: false,
      //是否第二次授权  如果再次授权不再弹出警告弹窗
      authorizeFlag: false //是否已授权

    };
  },
  mounted: function mounted() {
    this.uniGetSetting();
  },
  methods: {
    previewImage: function previewImage() {
      //预览图片 兼容base64
      if (this.shareImage.indexOf('http') > -1) {
        uni.downloadFile({
          url: this.shareImage,
          success: function success(res) {
            if (res.statusCode == 200) {
              uni.previewImage({
                urls: [res.tempFilePath],
                longPressActions: {
                  itemList: ['发送给朋友', '保存图片', '收藏'],
                  success: function success(data) {},
                  fail: function fail(err) {}
                }
              });
            }
          },
          fail: function fail(err) {}
        });
      } else {
        var base64 = this.shareImage.replace(/^data:image\/\w+;base64,/, ""); //去掉data:image/png;base64,

        var filePath = wx.env.USER_DATA_PATH + '/hym_pay_qrcode.png';
        uni.getFileSystemManager().writeFile({
          filePath: filePath,
          //创建一个临时文件名
          data: base64,
          //写入的文本或二进制数据
          encoding: 'base64',
          //写入当前文件的字符编码
          success: function success(res) {
            uni.previewImage({
              urls: [filePath],
              longPressActions: {
                itemList: ['发送给朋友', '保存图片', '收藏'],
                success: function success(data) {},
                fail: function fail(err) {}
              }
            });
          },
          fail: function fail(err) {}
        });
      }
    },
    previewDownLoad: function previewDownLoad() {
      //点击下载前处理
      this.isScopedFlag = false;
      this.getDownLoadScope();
    },
    getDownLoadScope: function getDownLoadScope() {
      var _this2 = this;

      //下载临时文件
      if (!this.authorizeFlag) {
        uni.authorize({
          scope: "scope.writePhotosAlbum",
          success: function success(res) {
            _this2.downloadFile();
          },
          fail: function fail(err) {
            if (!_this2.isScopedFlag) {
              uni.showModal({
                title: "警告",
                content: "您点击了拒绝授权，将无法正常保存图片，点击确定重新获取授权",
                confirm: function confirm() {
                  _this2.getDownLoadScope();
                },
                cancel: function cancel() {
                  uni.showToast({
                    title: "您点击了取消",
                    icon: "none"
                  });
                }
              });
            }

            _this2.isScopedFlag = true;
          }
        });
      } else {
        this.downloadFile();
      }
    },
    downloadFile: function downloadFile() {
      if (this.shareImage.indexOf('http') > -1) {
        uni.downloadFile({
          url: this.shareImage,
          success: function success(res) {
            if (res.statusCode == 200) {
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function success(data) {
                  uni.showToast({
                    title: "保存成功",
                    icon: "none"
                  });
                },
                fail: function fail(err) {
                  uni.showToast({
                    title: "您取消了保存",
                    icon: "none"
                  });
                }
              });
            } else {
              uni.showToast({
                title: "临时文件生成失败",
                icon: "none"
              });
            }
          }
        });
      } else {
        var base64 = this.shareImage.replace(/^data:image\/\w+;base64,/, ""); //去掉data:image/png;base64,

        var filePath = wx.env.USER_DATA_PATH + '/hym_pay_qrcode.png';
        uni.getFileSystemManager().writeFile({
          filePath: filePath,
          //创建一个临时文件名
          data: base64,
          //写入的文本或二进制数据
          encoding: 'base64',
          //写入当前文件的字符编码
          success: function success(res) {
            uni.saveImageToPhotosAlbum({
              filePath: filePath,
              success: function success(data) {
                uni.showToast({
                  title: "保存成功",
                  icon: "none"
                });
              },
              fail: function fail(err) {
                uni.showToast({
                  title: "临时文件生成失败",
                  icon: "none"
                });
              }
            });
          },
          fail: function fail(err) {
            uni.showToast({
              title: "临时文件生成失败",
              icon: "none"
            });
          }
        });
      }
    },
    uniGetSetting: function uniGetSetting() {
      //是否已授权
      var _this = this;

      uni.getSetting({
        success: function success(res) {
          if (!res.authSetting['scope.writePhotosAlbum']) {
            _this.authorizeFlag = false;
          } else {
            _this.authorizeFlag = false;
          }
        },
        fail: function fail(err) {}
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 92:
/*!********************************!*\
  !*** ./src/api/goods/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = _interopRequireDefault(__webpack_require__(/*! ./url.js */ 93));

var _request = _interopRequireDefault(__webpack_require__(/*! @/utils/request.js */ 10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  getMerchantAppFrontendCategoryList: function getMerchantAppFrontendCategoryList(params) {
    //获取分类列表
    return _request.default.post(_url.default.getMerchantAppFrontendCategoryList, params);
  },
  brandAll: function brandAll() {
    //获取品牌列表
    return _request.default.post(_url.default.brandAll);
  },
  getGoodsDetail: function getGoodsDetail(id) {
    //获取商品详情
    return _request.default.post(_url.default.getGoodsDetail + id);
  },
  getGoodsRecommendByGoodsDetail: function getGoodsRecommendByGoodsDetail(parmas) {
    //商品详情店铺商品
    return _request.default.post(_url.default.getGoodsRecommendByGoodsDetail, parmas);
  },
  getGoodsComments: function getGoodsComments(id) {
    //评价
    return _request.default.post(_url.default.getGoodsComments + id);
  },
  saveGoodsFavorite: function saveGoodsFavorite(params) {
    //收藏商品
    return _request.default.post(_url.default.saveGoodsFavorite, [params]);
  },
  findGoodsFavorite: function findGoodsFavorite(id) {
    //查看商品是否收藏
    return _request.default.post(_url.default.findGoodsFavorite + id);
  },
  cancelGoodsFavorite: function cancelGoodsFavorite(id) {
    //取消收藏改商品
    return _request.default.post(_url.default.cancelGoodsFavorite + id);
  },
  saveGoodsFootprint: function saveGoodsFootprint(params) {
    //添加足迹
    return _request.default.post(_url.default.saveGoodsFootprint, params);
  },
  findAppSkuCommentById: function findAppSkuCommentById(params) {
    //评价详情
    return _request.default.post(_url.default.findAppSkuCommentById, params);
  },
  findAppGoodsPraiseById: function findAppGoodsPraiseById(id) {
    //获取订单不同类型的总个数
    return _request.default.post(_url.default.findAppGoodsPraiseById + id, {});
  },
  addGoodsSkuAppendComment: function addGoodsSkuAppendComment(params) {
    //追评
    return _request.default.post(_url.default.addGoodsSkuAppendComment, params);
  },
  addGoodsSkuCommentDto: function addGoodsSkuCommentDto(params) {
    //添加评论
    return _request.default.post(_url.default.addGoodsSkuCommentDto, params);
  },
  storeGoodsList: function storeGoodsList(params) {
    //店铺商品列表
    return _request.default.post(_url.default.storeGoodsList, params);
  },
  newGoodsList: function newGoodsList(params) {
    //店铺上新
    return _request.default.post(_url.default.newGoodsList, params);
  },
  storeCategory: function storeCategory(storeId) {
    //获取店铺分类
    return _request.default.post(_url.default.storeCategory + storeId, {});
  },
  getGoodsFavoriteList: function getGoodsFavoriteList(params) {
    //我的收藏
    return _request.default.post(_url.default.getGoodsFavoriteList, params);
  },
  getGoodsFootprintList: function getGoodsFootprintList(params) {
    //我的足迹
    return _request.default.post(_url.default.getGoodsFootprintList, params);
  },
  findCartGoods: function findCartGoods(itemId) {
    //购物车查询sku
    return _request.default.post(_url.default.findCartGoods + itemId, {});
  },
  bindGoodsList: function bindGoodsList(params) {
    //搜索店铺商品
    return _request.default.post(_url.default.bindGoodsList, params);
  },
  findAppSkuCommentImagesById: function findAppSkuCommentImagesById(params) {
    return _request.default.post(_url.default.findAppSkuCommentImagesById, params);
  },
  cusGoodsDetails: function cusGoodsDetails(itemId) {
    //获取商品详情
    return _request.default.post(_url.default.cusGoodsDetails, {
      itemId: itemId
    });
  }
};
exports.default = _default;

/***/ }),

/***/ 93:
/*!******************************!*\
  !*** ./src/api/goods/url.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var goosApi = {
  getMerchantAppFrontendCategoryList: "/goods/frontendCategory/getMerchantAppFrontendCategoryList",
  //获取分类列表
  brandAll: "/goods/brand/all",
  //获取品牌列表
  getGoodsDetail: "/app/goods/getGoodsDetail/",
  //获取商品详情
  getGoodsRecommendByGoodsDetail: "/goods/recommend/getGoodsRecommendByGoodsDetail",
  //商品详情店铺商品
  getGoodsComments: "/goods/skucomment/getGoodsComments/",
  //评价
  saveGoodsFavorite: "/goods/favorite/saveGoodsFavorite",
  //收藏商品
  findGoodsFavorite: "/goods/favorite/findGoodsFavorite/",
  //查看商品是否收藏
  cancelGoodsFavorite: "/goods/favorite/cancelGoodsFavorite/",
  //取消收藏该商品
  saveGoodsFootprint: "/goods/footprint/saveGoodsFootprint",
  //添加足迹
  findAppSkuCommentById: "/goods/skucomment/findAppSkuCommentById",
  //评价详情
  findAppGoodsPraiseById: "/goods/skucomment/findAppGoodsPraiseById/",
  //获取订单不同类型的总数
  addGoodsSkuCommentDto: "/goods/skucomment/addGoodsSkuCommentDto",
  //添加评论
  addGoodsSkuAppendComment: "/goods/skucomment/addGoodsSkuAppendComment",
  //追评
  storeGoodsList: "/goods/item/storeGoodsList",
  //店铺商品列表
  newGoodsList: "goods/item/newGoodsList",
  //店铺上新
  storeCategory: "/goods/frontendCategory/store/list/",
  //获取店铺分类
  getGoodsFavoriteList: "/goods/favorite/getGoodsFavoriteList",
  //我的收藏
  getGoodsFootprintList: "/goods/footprint/getGoodsFootprintList",
  //我的足迹
  findCartGoods: "/goods/item/findCartGoods/",
  //购物车查询sku
  bindGoodsList: "/goods/item/bindGoodsList",
  //搜索店铺商品
  findAppSkuCommentImagesById: '/goods/skucomment/findAppSkuCommentImagesById',
  //根据图片查询评论上下
  cusGoodsDetails: "/goods/custom/item/detail" //获取商品详情

};
var _default = goosApi;
exports.default = _default;

/***/ }),

/***/ 978:
/*!*****************************************!*\
  !*** ./src/common/js/homeTitleMixin.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  methods: {
    renovationGoTo: function renovationGoTo(params) {
      var type = Number(params.linkType);

      switch (type) {
        case 1:
          //url跳转
          if (params.linkValue) {
            if (params.linkValue.indexOf(this.$config.localhostUrl) != "-1") {
              //站内页面
              var hrefLink = params.linkValue.split("/");

              if (hrefLink[hrefLink.length - 2] == "act") {
                //装修页面
                //更改首页渲染内容  选中tab  装修参数
                this.$emit("setWebView", params.title, hrefLink[hrefLink.length - 1]);
              }
            } else if (params.linkValue.indexOf("http") == "-1") {
              if (params.linkValue == "/pages/category/index" || params.linkValue == "/pages/index/index" || params.linkValue == "/pages/my/index" || params.linkValue == "/pages/cart/index") {
                uni.switchTab({
                  url: params.linkValue
                });
              } else {
                this.$Router.push({
                  path: params.linkValue
                });
              }
            } else {
              this.$Router.push({
                path: "/pages/webView/index",
                query: {
                  url: params.linkValue
                }
              });
            }
          }

          break;

        case 3:
          //店铺
          this.$Router.push({
            path: "/pages/shop/index",
            query: {
              storeId: params.linkValue
            }
          });
          break;

        case 4:
          //商品
          this.$Router.push({
            path: "/pages/goodsDetails/index",
            query: {
              goodsId: params.linkValue
            }
          });
          break;

        case 5:
          //类目
          this.$Router.push({
            path: "/pages/goodsList/index",
            query: {
              frontCategoryId: params.linkValue
            }
          });
          break;

        case 6:
          //品牌
          this.$Router.push({
            path: "/pages/goodsList/index",
            query: {
              brandId: params.linkValue
            }
          });
          break;
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map