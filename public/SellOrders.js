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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var objSellOrders = {};

function repairData(_objSellOrders) {
  var _repairedData = [];
  _repairedData = _objSellOrders.data;
  return _repairedData;
}

var SellOrders = /*#__PURE__*/function (_Component) {
  _inherits(SellOrders, _Component);

  var _super = _createSuper(SellOrders);

  function SellOrders() {
    var _this;

    _classCallCheck(this, SellOrders);

    _this = _super.call(this);
    _this.state = {
      sellorders: []
    };
    return _this;
  }

  _createClass(SellOrders, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //DOM is ready
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch('http://localhost:3000/data/sellordersdata').then(function (response) {
                  return response.json();
                }).then(function (data) {
                  objSellOrders = repairData(data); //console.log(objBuyOrders.data[0].crypto)
                });

              case 2:
                response = _context.sent;
                this.setState({
                  sellorders: objSellOrders
                }); //console.log(typeof this.state.buyorders)

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(SellOrdersFilter, null), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement(SellOrderTable, {
        sellorders: this.state.sellorders
      }), /*#__PURE__*/_react.default.createElement("hr", null));
    }
  }]);

  return SellOrders;
}(_react.Component);

var _default = SellOrders;
exports.default = _default;

var SellOrdersFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(SellOrdersFilter, _React$Component);

  var _super2 = _createSuper(SellOrdersFilter);

  function SellOrdersFilter() {
    _classCallCheck(this, SellOrdersFilter);

    return _super2.apply(this, arguments);
  }

  _createClass(SellOrdersFilter, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("hr", null), "This is a placeholder for the sell orders filter");
    }
  }]);

  return SellOrdersFilter;
}(_react.default.Component);

function SellOrderTable(props) {
  //console.log(typeof props.issues)
  var sellordersRow = props.sellorders.map(function (sellorder) {
    return /*#__PURE__*/_react.default.createElement(SellOrderRow, {
      key: sellorder._id,
      sellorder: sellorder
    });
  });
  return /*#__PURE__*/_react.default.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Order _id"), /*#__PURE__*/_react.default.createElement("th", null, "User Posted"), /*#__PURE__*/_react.default.createElement("th", null, "Crypto"), /*#__PURE__*/_react.default.createElement("th", null, "Date Posted"), /*#__PURE__*/_react.default.createElement("th", null, "Expiry Date"), /*#__PURE__*/_react.default.createElement("th", null, "Expiry Time"), /*#__PURE__*/_react.default.createElement("th", null, "Payment Prefered"), /*#__PURE__*/_react.default.createElement("th", null, "Price Wanted"), /*#__PURE__*/_react.default.createElement("th", null, "Min Amount"), /*#__PURE__*/_react.default.createElement("th", null, "Max Amount"))), /*#__PURE__*/_react.default.createElement("tbody", null, sellordersRow));
}

function SellOrderRow(props) {
  var sellorder = props.sellorder;
  return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, sellorder._id), /*#__PURE__*/_react.default.createElement("td", null, sellorder.userid.email), /*#__PURE__*/_react.default.createElement("td", null, sellorder.crypto), /*#__PURE__*/_react.default.createElement("td", null, sellorder.datePosted), /*#__PURE__*/_react.default.createElement("td", null, sellorder.expirydate), /*#__PURE__*/_react.default.createElement("td", null, sellorder.expirytime), /*#__PURE__*/_react.default.createElement("td", null, sellorder.payment), /*#__PURE__*/_react.default.createElement("td", null, sellorder.price), /*#__PURE__*/_react.default.createElement("td", null, sellorder.minamount), /*#__PURE__*/_react.default.createElement("td", null, sellorder.maxamount));
}