"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

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

var Edit = /*#__PURE__*/function (_Component) {
  _inherits(Edit, _Component);

  var _super = _createSuper(Edit);

  function Edit() {
    _classCallCheck(this, Edit);

    return _super.apply(this, arguments);
  }

  _createClass(Edit, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("form", {
        action: "/update",
        method: "post"
      }, /*#__PURE__*/_react.default.createElement("input", {
        type: "hidden",
        name: "UserID",
        value: this.props.userid
      }), /*#__PURE__*/_react.default.createElement("input", {
        type: "hidden",
        name: "OrderType",
        value: this.props.ordertype
      }), /*#__PURE__*/_react.default.createElement("input", {
        type: "hidden",
        name: "OrderID",
        value: this.props.orderid
      }), /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "crypto-select"
      }, "Crypto"), /*#__PURE__*/_react.default.createElement(TheSelectCrypto, {
        curentValue: this.props.crypto
      }), /*#__PURE__*/_react.default.createElement(Amount, {
        ordertype: this.props.ordertype,
        amount: this.props.amount,
        minamount: this.props.minamount,
        maxamount: this.props.maxamount
      }), /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "price-select"
      }, "Price"), /*#__PURE__*/_react.default.createElement("input", {
        type: "number",
        id: "price-select",
        name: "NewPrice",
        min: "0",
        required: true,
        defaultValue: this.props.price
      }), /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "expirydate-select"
      }, "Order Expiry Date"), /*#__PURE__*/_react.default.createElement("input", {
        id: "expirydate-select",
        type: "date",
        name: "NewExpiryDate",
        required: true,
        defaultValue: this.props.expirydate
      }), /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "expirytime-select"
      }, "Order Expiry Time"), /*#__PURE__*/_react.default.createElement("input", {
        id: "expirytime-select",
        type: "time",
        name: "NewExpiryTime",
        required: true,
        defaultValue: this.props.expirytime
      }), /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "payment-select"
      }, "Payment"), /*#__PURE__*/_react.default.createElement(TheSelectPayment, {
        curentValue: this.props.payment
      }), /*#__PURE__*/_react.default.createElement("input", {
        type: "submit",
        value: "Update this order"
      })));
    }
  }]);

  return Edit;
}(_react.Component);

var _default = Edit; // const element = <Edit />;
// ReactDOM.render(element, document.getElementById('contents'));

exports.default = _default;

function BuyAmount(props) {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "amount-select"
  }, "Amount"), /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    id: "amount-select",
    name: "NewAmount",
    min: "10",
    max: "10000",
    required: true,
    defaultValue: props.amount
  }));
}

function SellAmount(props) {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "min-amount-select"
  }, "Min Amount"), /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    id: "min-amount-select",
    name: "NewMinAmount",
    required: true,
    defaultValue: props.minamount
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "max-amount-select"
  }, "Max Amount"), /*#__PURE__*/_react.default.createElement("input", {
    type: "number",
    id: "max-amount-select",
    name: "NewMaxAmount",
    required: true,
    defaultValue: props.maxamount
  }));
}

function Amount(props) {
  var OrderType = props.ordertype;

  if (OrderType === 'buy') {
    return /*#__PURE__*/_react.default.createElement(BuyAmount, {
      amount: props.amount
    });
  } else if (OrderType === 'sell') {
    return /*#__PURE__*/_react.default.createElement(SellAmount, {
      minamount: props.minamount,
      maxamount: props.maxamount
    });
  }
}

function TheSelectCrypto(props) {
  var currentValue = props.curentValue;
  return /*#__PURE__*/_react.default.createElement("select", {
    name: "NewCrypto",
    id: "crypto-select",
    required: true,
    defaultValue: currentValue
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "Bitcoin"
  }, "Bitcoin"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Ethereum"
  }, "Ethereum"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Litecoin"
  }, "Litecoin"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Bitcoin Cash"
  }, "Bitcoin Cash"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Zcash"
  }, "Zcash"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Monero"
  }, "Monero"));
}

function TheSelectPayment(props) {
  var currentValue = props.curentValue;
  return /*#__PURE__*/_react.default.createElement("select", {
    name: "NewPayment",
    id: "payment-select",
    required: true,
    defaultValue: currentValue
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "Paypal"
  }, "Paypal"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Interac"
  }, "Interac"), /*#__PURE__*/_react.default.createElement("option", {
    value: "Cash"
  }, "Cash"));
}