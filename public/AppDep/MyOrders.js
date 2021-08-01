"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Order = _interopRequireDefault(require("./Order"));

var _reactRouterDom = require("react-router-dom");

var _Matches = _interopRequireDefault(require("../Matches"));

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

var fetchedOrders = {};
var type; // function repairData(_fetchedOrders){
//   let _repairedData = []
//   _repairedData = _fetchedOrders.data
//   return _repairedData
// }

var MyOrders = /*#__PURE__*/function (_Component) {
  _inherits(MyOrders, _Component);

  var _super = _createSuper(MyOrders);

  function MyOrders() {
    var _this;

    _classCallCheck(this, MyOrders);

    _this = _super.call(this);
    _this.state = {
      userId: '',
      orderstype: 'buy',
      orders: []
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MyOrders, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //DOM is ready
      this.loadData(this.state.orderstype);
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_orderstype) {
        var _userID, response1, data, response2, data2;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _userID = '';
                _context.next = 3;
                return fetch('http://localhost:3000/databases/CurrentUserID');

              case 3:
                response1 = _context.sent;
                _context.next = 6;
                return response1.json();

              case 6:
                data = _context.sent;
                _userID = data.data;
                console.log(_orderstype); //console.log('This',_userID)
                // if (_orderstype === '') {
                //   _orderstype = 'buy'
                // }

                _context.next = 11;
                return fetch("http://localhost:3000/data/".concat(_orderstype, "/").concat(_userID));

              case 11:
                response2 = _context.sent;
                _context.next = 14;
                return response2.json();

              case 14:
                data2 = _context.sent;
                fetchedOrders = data2.data; //console.log(data.type)

                this.setState({
                  userId: _userID,
                  orders: fetchedOrders
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData(_x) {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // Typical usage (don't forget to compare props):
      if (this.state.orderstype !== prevState.orderstype) {
        this.loadData(this.state.orderstype);
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      //e.preventDefault()
      //console.log(e.target.value);
      this.setState({
        orderstype: e.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      //console.log(this.state.orderstype)
      var myOrdersRows = this.state.orders.map(function (order) {
        return /*#__PURE__*/_react.default.createElement(_Order.default, {
          key: order._id,
          order: order,
          type: _this2.state.orderstype
        });
      });
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("form", {
        name: "toogle"
      }, /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        id: "Buy",
        name: "radio",
        value: "buy",
        defaultChecked: true,
        onClick: this.handleClick
      }), "Buy"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        id: "Sell",
        name: "radio",
        value: "sell",
        onClick: this.handleClick
      }), "Sell")), /*#__PURE__*/_react.default.createElement("h1", null, "State: ", this.state.orderstype), /*#__PURE__*/_react.default.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("th", null, "Order _id"), /*#__PURE__*/_react.default.createElement("th", null, "Posted By"), /*#__PURE__*/_react.default.createElement("th", null, "Date Posted"), /*#__PURE__*/_react.default.createElement("th", null, "Crypto"), /*#__PURE__*/_react.default.createElement("th", null, "Amount"), /*#__PURE__*/_react.default.createElement("th", null, "Min Amount"), /*#__PURE__*/_react.default.createElement("th", null, "Max Amount"), /*#__PURE__*/_react.default.createElement("th", null, "Price"), /*#__PURE__*/_react.default.createElement("th", null, "Expiry Date"), /*#__PURE__*/_react.default.createElement("th", null, "Expiry Time"), /*#__PURE__*/_react.default.createElement("th", null, "Payment"), /*#__PURE__*/_react.default.createElement("th", null, "Type"), /*#__PURE__*/_react.default.createElement("th", null, "Delete?"), /*#__PURE__*/_react.default.createElement("th", null, "Update Amount"))), /*#__PURE__*/_react.default.createElement("tbody", null, myOrdersRows)));
    }
  }]);

  return MyOrders;
}(_react.Component);

var _default = MyOrders;
exports.default = _default;