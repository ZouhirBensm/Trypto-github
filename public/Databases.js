"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _MakeBuy = _interopRequireDefault(require("./AppDep/MakeBuy"));

var _MakeSell = _interopRequireDefault(require("./AppDep/MakeSell"));

var _BuyOrders = _interopRequireDefault(require("./AppDep/BuyOrders"));

var _SellOrders = _interopRequireDefault(require("./AppDep/SellOrders"));

var _MyOrders = _interopRequireDefault(require("./AppDep/MyOrders"));

var _reactRouterDom = require("react-router-dom");

var _reactBootstrap = require("react-bootstrap");

var _Matches = _interopRequireDefault(require("./Matches"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Databases = /*#__PURE__*/function (_Component) {
  _inherits(Databases, _Component);

  var _super = _createSuper(Databases);

  function Databases() {
    _classCallCheck(this, Databases);

    return _super.apply(this, arguments);
  }

  _createClass(Databases, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar, {
        bg: "light",
        expand: "lg"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Brand, {
        href: "#home"
      }, "Make an Order"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Toggle, {
        "aria-controls": "basic-navbar-nav"
      }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Collapse, {
        id: "basic-navbar-nav"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
        className: "mr-auto"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Link, {
        href: "/databases/makebuy"
      }, "Make a Buy Order"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Link, {
        href: "/databases/makesell"
      }, "Make a Sell Order")))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Switch, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/databases/makebuy",
        component: _MakeBuy.default
      }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/databases/makesell",
        component: _MakeSell.default
      }))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar, {
        bg: "light",
        expand: "lg"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Brand, {
        href: "#home"
      }, "See existing Orders"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Toggle, {
        "aria-controls": "basic-navbar-nav"
      }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Navbar.Collapse, {
        id: "basic-navbar-nav"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav, {
        className: "mr-auto"
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Link, {
        href: "/databases/buyordersdata"
      }, "People Buying"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Link, {
        href: "/databases/sellordersdata"
      }, "People Selling"), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Nav.Link, {
        href: "/databases/AllMyOrders"
      }, "All my Orders")))), /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Switch, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/databases/buyordersdata",
        component: _BuyOrders.default
      }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/databases/sellordersdata",
        component: _SellOrders.default
      }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: "/databases/AllMyOrders",
        component: _MyOrders.default
      }))));
    }
  }]);

  return Databases;
}(_react.Component);

var element = /*#__PURE__*/_react.default.createElement(Databases, null);

_reactDom.default.render(element, document.getElementById('contents'));