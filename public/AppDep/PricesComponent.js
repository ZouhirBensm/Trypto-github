"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Prices = _interopRequireDefault(require("./Prices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var PricesComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(PricesComponent, _React$Component);

  var _super = _createSuper(PricesComponent);

  function PricesComponent() {
    var _this;

    _classCallCheck(this, PricesComponent);

    _this = _super.call(this);
    _this.state = {
      country: ''
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PricesComponent, [{
    key: "handleClick",
    value: function handleClick(e) {
      //e.preventDefault()
      //console.log(e.target.value);
      this.setState({
        country: e.target.value
      }); // document.getElementsByName("toogle");
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var i = 0;
      var pricesRows = this.props.prices.map(function (price) {
        i++;
        return /*#__PURE__*/_react.default.createElement(_Prices.default, {
          key: i,
          price: price,
          country: _this2.state.country
        });
      }); //console.log(typeof this.props.prices)

      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("form", {
        name: "toogle"
      }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        id: "Canada",
        name: "radio",
        value: this.props.countries.one,
        onClick: this.handleClick
      }), this.props.countries.one), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        id: "America",
        name: "radio",
        value: this.props.countries.two,
        onClick: this.handleClick
      }), this.props.countries.two), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        id: "Europe",
        name: "radio",
        value: this.props.countries.three,
        onClick: this.handleClick
      }), this.props.countries.three)), /*#__PURE__*/_react.default.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Country"), /*#__PURE__*/_react.default.createElement("th", null, "Name"), /*#__PURE__*/_react.default.createElement("th", null, "Value"))), /*#__PURE__*/_react.default.createElement("tbody", null, pricesRows)));
    }
  }]);

  return PricesComponent;
}(_react.default.Component);

var _default = PricesComponent;
exports.default = _default;