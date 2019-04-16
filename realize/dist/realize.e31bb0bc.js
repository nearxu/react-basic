// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"react-dom/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAttribute = setAttribute;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function setAttribute(dom, name, value) {
  if (name === 'classname') {
    name = 'class';
  }

  if (/on\w+/.test(name)) {
    // event
    name = name.toLowerCase();
    dom[name] = value || '';
  } else if (name === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || '';
    } else if (value || _typeof(value) === 'object') {
      for (var k in value) {
        dom.style[k] = typeof value[k] === 'number' ? value[k] + 'px' : value[k];
      }
    }
  } else {
    // simple attrs
    if (name in dom) {
      dom[name] = value;
    }

    if (value) {
      dom.setAttribute(name, value);
    } else {
      dom.removeAttribute(name);
    }
  }
}
},{}],"react-dom/diff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diff = diff;
exports.renderComponent = renderComponent;

var _react = require("../react");

var _dom = require("./dom");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function diff(dom, vnode, container) {
  var result = diffNode(dom, vnode); // dom

  if (container && vnode.parentNode !== container) {
    container.appendChild(result);
  }

  return result;
}

function diffNode(dom, vnode) {
  var copyDom = dom;
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') return;
  if (typeof vnode == 'number') vnode = String(vnode);

  if (typeof vnode === 'string') {
    // text
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vnode) {
        dom.textContent = vnode; // just repleceWith 
      }
    } else {
      copyDom = document.createTextNode(vnode);

      if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(copyDom, dom);
      }
    }

    return copyDom;
  }

  if (typeof vnode.tag === 'function') {
    return diffComponent(dom, vnode);
  }

  if (!dom) {
    copyDom = document.createElement(vnode.tag);
  }

  if (vnode.children && vnode.children.length > 0) {
    diffChildren(copyDom, vnode.children);
  }

  diffAttribute(copyDom, vnode);
  return copyDom;
}

function diffChildren(dom, virChild) {
  var children = [];
  var keyed = {}; // dom and virtual diff

  if (dom.childNodes) {
    for (var _i = 0, _Object$entries = Object.entries(dom.childNodes); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          k = _Object$entries$_i[0],
          v = _Object$entries$_i[1];

      // lost child id ,dont diff 
      if (v && v.key) {
        keyed[v.key] = v;
      } else {
        children.push(v);
      }
    }
  } // first render


  if (virChild && virChild.length > 0) {
    // so bady solution code
    for (var i = 0; i < virChild.length; i++) {
      var vchild = virChild[i];
      var child = void 0;
      child = diffNode(child, vchild);

      if (child) {
        dom.appendChild(child);
      }
    }
  }
}

function diffAttribute(dom, vnode) {
  var now = {};
  var virAttr = vnode.attrs; // for(let i=0;i<dom.attributes.length;i++){
  //   const attr = dom.attributes[i];
  //   now[attr.name] = attr.value;
  // }

  for (var _i2 = 0, _Object$entries2 = Object.entries(dom.attributes); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        _k2 = _Object$entries2$_i[0],
        v = _Object$entries2$_i[1];

    now[_k2] = v;
  } // remove old diff new attr


  for (var k in now) {
    if (!(k in virAttr)) {
      (0, _dom.setAttribute)(dom, k, undefined);
    }
  }

  for (var _k in virAttr) {
    if (now[_k] !== virAttr[_k]) {
      (0, _dom.setAttribute)(dom, _k, virAttr[_k]);
    }
  }
}

function diffComponent(dom, vnode) {
  var c = dom && dom._component;
  var oldDom = dom;

  if (c && c.constructor === vnode.tag) {
    // no component change
    setComponentProps(c, vnode.attrs); // check props

    dom = c.base;
  } else {
    if (c) {
      oldDom = null;
    }

    c = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(c, vnode.attrs);
    dom = c.base;
  }

  return dom;
}

function createComponent(component, props) {
  var instance;

  if (component.prototype && component.prototype.render) {
    instance = new component(props);
  } else {
    instance = new _react.Component(props);
    instance.constructor = component;

    instance.render = function () {
      return this.constructor(props);
    };
  }

  return instance;
}

function setComponentProps(component, props) {
  //  component.base保存的是组件的dom对象
  if (!component.base) {
    if (component.componentWillMount) component.componentWillMount();
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props);
  }

  component.props = props;
  renderComponent(component);
}

function renderComponent(component) {
  var base;
  var renderer = component.render();

  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  base = diffNode(component.base, renderer);

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else if (component.componentDidMount) {
    component.componentDidMount();
  }

  component.base = base;
  base._component = component;
}
},{"../react":"react/index.js","./dom":"react-dom/dom.js"}],"react/component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _diff = require("../react-dom/diff");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Component =
/*#__PURE__*/
function () {
  function Component() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Component);

    this.state = {};
    this.props = props;
  } // render


  _createClass(Component, [{
    key: "setState",
    value: function setState(stateChange) {
      Object.assign(this.state, stateChange);
      (0, _diff.renderComponent)(this);
    }
  }]);

  return Component;
}();

exports.default = Component;
},{"../react-dom/diff":"react-dom/diff.js"}],"react/createElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = createElement;

function createElement(tag, attrs) {
  attrs = attrs || {};

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    attrs: attrs,
    children: children,
    key: attrs.key || null
  };
}
},{}],"react/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _component = _interopRequireDefault(require("./component"));

var _createElement = require("./createElement");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  Component: _component.default,
  createElement: _createElement.createElement
};
exports.default = _default;
},{"./component":"react/component.js","./createElement":"react/createElement.js"}],"react-dom/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;
exports.renderComponent = renderComponent;

var _diff = require("./diff");

var _react = require("../react");

function render(vnode, container, dom) {
  return (0, _diff.diff)(dom, vnode, container);
}

function _render(vnode, container) {
  if (vnode === undefined) return;

  if (typeof vnode === 'string' || typeof vnode === 'number') {
    var textNode = document.createTextNode(vnode);
    return container.appendChild(textNode);
  } // just function


  if (typeof vnode.tag === 'function') {
    var component = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(component, vnode.attrs);
    return component.base;
  }

  var dom = document.createElement(vnode.tag);

  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(function (key) {
      var value = vnode.attrs[key];
      if (key === 'className') key = 'class';

      if (typeof value === 'function') {
        dom[key.toLowerCase()] = value;
      } else {
        dom.setAttribute(key, vnode.attrs[key]);
      }
    });
  }

  if (vnode.children) {
    vnode.children.forEach(function (child) {
      return _render(child, dom);
    });
  }

  return dom;
}

function createComponent(component, props) {
  var instance;

  if (component.prototype && component.prototype.render) {
    // class 
    instance = new component(props);
  } else {
    // function
    instance = new component(props);
    instance.constructor = component;

    instance.render = function () {
      return this.constructor(props);
    };

    instance.setState = function (state) {};
  }

  return instance;
} // refresh props ,two life componentWillMount , componentWillReceiveProps


function setComponentProps(component, props) {
  if (!component.base) {
    if (component.componentWillMount) return componentWillMount();
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props);
  }

  component.props = props;
  renderComponent(component);
} // componentWillUpdate，componentDidUpdate，componentDidMount


function renderComponent(component) {
  var base;
  var renderer = component.render();

  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate();
  }

  base = _render(renderer);

  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate();
  } else if (component.componentDidMount) {
    component.componentDidMount();
  }

  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base);
  }

  component.base = base;
  base._component = component;
}
},{"./diff":"react-dom/diff.js","../react":"react/index.js"}],"react-dom/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _render = require("./render");

var _default = {
  render: _render.render
};
exports.default = _default;
},{"./render":"react-dom/render.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _react = _interopRequireDefault(require("./react"));

var _reactDom = _interopRequireDefault(require("./react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      count: 0
    };
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log('mount');
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log('will');
    }
  }, {
    key: "add",
    value: function add() {
      this.setState({
        count: this.state.count + 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", null, "Hello,World! ", this.props.name, _react.default.createElement("p", null, "count: ", this.state.count, " "), _react.default.createElement("button", {
        onClick: function onClick() {
          return _this2.add();
        }
      }, "add count"));
    }
  }]);

  return App;
}(_react.default.Component);

_reactDom.default.render(_react.default.createElement(App, {
  name: "tom"
}), document.getElementById('app'));
},{"./react":"react/index.js","./react-dom":"react-dom/index.js"}],"C:/Users/nearxu/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59323" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/nearxu/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/realize.e31bb0bc.js.map