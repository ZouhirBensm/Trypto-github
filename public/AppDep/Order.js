"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactBootstrap = require("react-bootstrap");

var _Edit = _interopRequireDefault(require("./Edit"));

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

var Order = /*#__PURE__*/function (_Component) {
  _inherits(Order, _Component);

  var _super = _createSuper(Order);

  function Order() {
    var _this;

    _classCallCheck(this, Order);

    _this = _super.call(this);
    _this.state = {
      userId: '',
      showComponent: false
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Order, [{
    key: "handleClick",
    value: function handleClick() {
      //e.preventDefault()
      //console.log(e.target.value);
      this.setState(function (prevState) {
        return {
          showComponent: !prevState.showComponent
        };
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      //DOM is ready
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _userID, response1, data;

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
                _userID = data.data; // .then(response1 => response1.json())
                // .then(data => {
                //   _userID = data.data
                // });

                this.setState({
                  userId: _userID
                });

              case 9:
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
      var order = this.props.order;
      console.log('here', this.props.type);
      return /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, order._id), /*#__PURE__*/_react.default.createElement("td", null, order.userid.email), /*#__PURE__*/_react.default.createElement("td", null, order.postedDate), /*#__PURE__*/_react.default.createElement("td", null, order.crypto), /*#__PURE__*/_react.default.createElement("td", null, order.amount ? order.amount : ''), /*#__PURE__*/_react.default.createElement("td", null, order.minamount ? order.minamount : ''), /*#__PURE__*/_react.default.createElement("td", null, order.maxamount ? order.maxamount : ''), /*#__PURE__*/_react.default.createElement("td", null, order.price), /*#__PURE__*/_react.default.createElement("td", null, order.expirydate), /*#__PURE__*/_react.default.createElement("td", null, order.expirytime), /*#__PURE__*/_react.default.createElement("td", null, order.payment), /*#__PURE__*/_react.default.createElement("td", null, this.props.type), /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("form", {
        action: "/deleteThisOrder",
        method: "post"
      }, /*#__PURE__*/_react.default.createElement("input", {
        type: "hidden",
        name: "OrderType",
        value: this.props.type
      }), /*#__PURE__*/_react.default.createElement("input", {
        type: "hidden",
        name: "OrderID",
        value: order._id
      }), /*#__PURE__*/_react.default.createElement("input", {
        type: "submit",
        value: "Delete this order"
      }))), /*#__PURE__*/_react.default.createElement("td", null, /*#__PURE__*/_react.default.createElement("button", {
        onClick: this.handleClick
      }, "Update"), this.state.showComponent ? /*#__PURE__*/_react.default.createElement(_Edit.default, {
        orderid: order._id,
        ordertype: this.props.type,
        userid: this.state.userId,
        crypto: order.crypto,
        amount: order.amount ? order.amount : '',
        minamount: order.minamount ? order.minamount : '',
        maxamount: order.maxamount ? order.maxamount : '',
        price: order.price,
        expirydate: order.expirydate,
        expirytime: order.expirytime,
        payment: order.payment
      }) : null));
    }
  }]);

  return Order;
}(_react.Component);

var _default = Order;
exports.default = _default;