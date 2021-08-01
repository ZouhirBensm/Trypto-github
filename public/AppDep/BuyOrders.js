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

var objBuyOrders = {};

function repairData(_objBuyOrders) {
  var _repairedData = [];
  _repairedData = _objBuyOrders.data;
  return _repairedData;
}

var BuyOrders = /*#__PURE__*/function (_Component) {
  _inherits(BuyOrders, _Component);

  var _super = _createSuper(BuyOrders);

  function BuyOrders() {
    var _this;

    _classCallCheck(this, BuyOrders);

    _this = _super.call(this);
    _this.state = {
      buyorders: []
    };
    return _this;
  }

  _createClass(BuyOrders, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //DOM is ready
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var response, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch('http://localhost:3000/data/buyordersdata');

              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.json();

              case 5:
                data = _context.sent;
                objBuyOrders = repairData(data); // .then(response => response.json())
                // .then(data => {
                //   objBuyOrders = repairData(data)
                //   //console.log(objBuyOrders.data[0].crypto)
                // });

                this.setState({
                  buyorders: objBuyOrders
                }); //console.log(typeof this.state.buyorders)

              case 8:
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
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(BuyOrdersFilter, null), /*#__PURE__*/_react.default.createElement("hr", null), /*#__PURE__*/_react.default.createElement(BuyOrderTable, {
        buyorders: this.state.buyorders
      }), /*#__PURE__*/_react.default.createElement("hr", null));
    }
  }]);

  return BuyOrders;
}(_react.Component);

var _default = BuyOrders;
exports.default = _default;

var BuyOrdersFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(BuyOrdersFilter, _React$Component);

  var _super2 = _createSuper(BuyOrdersFilter);

  function BuyOrdersFilter() {
    _classCallCheck(this, BuyOrdersFilter);

    return _super2.apply(this, arguments);
  }

  _createClass(BuyOrdersFilter, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("hr", null), "This is a placeholder for the buy orders filter");
    }
  }]);

  return BuyOrdersFilter;
}(_react.default.Component);

function BuyOrderTable(props) {
  //console.log(typeof props.issues)
  var buyordersRow = props.buyorders.map(function (buyorder) {
    return /*#__PURE__*/_react.default.createElement(BuyOrderRow, {
      key: buyorder._id,
      buyorder: buyorder
    });
  });
  return /*#__PURE__*/_react.default.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Order _id"), /*#__PURE__*/_react.default.createElement("th", null, "Posted by"), /*#__PURE__*/_react.default.createElement("th", null, "Date Posted"), /*#__PURE__*/_react.default.createElement("th", null, "Crypto"), /*#__PURE__*/_react.default.createElement("th", null, "Amount"), /*#__PURE__*/_react.default.createElement("th", null, "Price"), /*#__PURE__*/_react.default.createElement("th", null, "Expiry date"), /*#__PURE__*/_react.default.createElement("th", null, "Expiry time"), /*#__PURE__*/_react.default.createElement("th", null, "Payment"))), /*#__PURE__*/_react.default.createElement("tbody", null, buyordersRow));
}

function BuyOrderRow(props) {
  var buyorder = props.buyorder;
  return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, buyorder._id), /*#__PURE__*/_react.default.createElement("td", null, buyorder.userid.email), /*#__PURE__*/_react.default.createElement("td", null, buyorder.postedDate), /*#__PURE__*/_react.default.createElement("td", null, buyorder.crypto), /*#__PURE__*/_react.default.createElement("td", null, buyorder.amount), /*#__PURE__*/_react.default.createElement("td", null, buyorder.price), /*#__PURE__*/_react.default.createElement("td", null, buyorder.expirydate), /*#__PURE__*/_react.default.createElement("td", null, buyorder.expirytime), /*#__PURE__*/_react.default.createElement("td", null, buyorder.payment));
}