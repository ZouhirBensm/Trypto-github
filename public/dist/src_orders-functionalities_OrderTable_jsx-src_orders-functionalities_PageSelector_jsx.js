"use strict";
(self["webpackChunktrypto"] = self["webpackChunktrypto"] || []).push([["src_orders-functionalities_OrderTable_jsx-src_orders-functionalities_PageSelector_jsx"],{

/***/ "./src/orders-functionalities/OrderTable.jsx":
/*!***************************************************!*\
  !*** ./src/orders-functionalities/OrderTable.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// import React from 'react';
var OrderTable = /*#__PURE__*/function (_React$Component) {
  _inherits(OrderTable, _React$Component);

  var _super = _createSuper(OrderTable);

  function OrderTable(props) {
    var _this;

    _classCallCheck(this, OrderTable);

    _this = _super.call(this, props);
    _this.state = {
      orderID_toToggle: undefined,
      buttons: _this.props.buttons
    };
    _this.handleToogleEdit = _this.handleToogleEdit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(OrderTable, [{
    key: "handleToogleEdit",
    value: function handleToogleEdit(buttons, valueid, e) {
      //e.preventDefault()
      //console.log(e.target.value);
      this.setState(function (prevState) {
        return {
          orderID_toToggle: valueid,
          buttons: buttons
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // console.log("Parent toogled id ", this.state.orderID_toToggle )
      // console.log("buttons ", this.state.buttons )
      var ordersRow = this.props.orders.map(function (order) {
        return /*#__PURE__*/React.createElement(OrderRow, {
          handleClick: _this2.props.handleClick,
          buttons: order._id === _this2.state.orderID_toToggle ? _this2.state.buttons : _this2.props.buttons,
          order_type: _this2.props.order_type,
          key: order._id,
          order: order,
          handleToogleEdit: _this2.handleToogleEdit
        });
      }); // console.log("Does Not Require Keys: ", ordersRow)

      return /*#__PURE__*/React.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/React.createElement("tbody", null, ordersRow));
    }
  }]);

  return OrderTable;
}(React.Component);

var OrderRow = /*#__PURE__*/function (_React$Component2) {
  _inherits(OrderRow, _React$Component2);

  var _super2 = _createSuper(OrderRow);

  function OrderRow(props) {
    var _this3;

    _classCallCheck(this, OrderRow);

    _this3 = _super2.call(this, props); // this.state = {
    // }

    _this3.handleSubmit = _this3.handleSubmit.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(OrderRow, [{
    key: "handleSubmit",
    value: function () {
      var _handleSubmit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var _JSON$stringify;

        var orderType, amount, minamount, maxamount, response, payload;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                console.log("Testing handle submit");
                orderType = document.getElementById("my_form").elements["OrderType"].value;

                // console.log(document.getElementById("my_form").elements["OrderID"].value)
                // console.log(document.getElementById("my_form").elements["OrderType"].value)
                // console.log(document.getElementById("my_form").elements["price"].value)
                // console.log(document.getElementById("my_form").elements["expirydate"].value)
                // console.log(document.getElementById("my_form").elements["expirytime"].value)
                // console.log(document.getElementById("my_form").elements["crypto"].value)
                // console.log(document.getElementById("my_form").elements["payment"].value)
                if (orderType === "buyordersdata") {
                  amount = document.getElementById("my_form").elements["amount"].value;
                  minamount, maxamount = undefined;
                } else if (orderType === "sellordersdata") {
                  minamount = document.getElementById("my_form").elements["minamount"].value;
                  maxamount = document.getElementById("my_form").elements["maxamount"].value;
                  amount = undefined;
                }

                console.log(amount, minamount, maxamount);
                _context.next = 7;
                return fetch("".concat("http://localhost:3000", "/update"), {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify((_JSON$stringify = {
                    OrderType: document.getElementById("my_form").elements["OrderType"].value,
                    OrderID: document.getElementById("my_form").elements["OrderID"].value,
                    crypto: document.getElementById("my_form").elements["crypto"].value
                  }, _defineProperty(_JSON$stringify, orderType === "buyordersdata" ? "amount" : null, amount), _defineProperty(_JSON$stringify, orderType === "sellordersdata" ? "minamount" : null, minamount), _defineProperty(_JSON$stringify, orderType === "sellordersdata" ? "maxamount" : null, maxamount), _defineProperty(_JSON$stringify, "price", document.getElementById("my_form").elements["price"].value), _defineProperty(_JSON$stringify, "expirydate", document.getElementById("my_form").elements["expirydate"].value), _defineProperty(_JSON$stringify, "expirytime", document.getElementById("my_form").elements["expirytime"].value), _defineProperty(_JSON$stringify, "payment", document.getElementById("my_form").elements["payment"].value), _JSON$stringify))
                });

              case 7:
                response = _context.sent;
                console.log("api ress: ", response);
                _context.next = 11;
                return response.json();

              case 11:
                payload = _context.sent;
                console.log("payload: ", payload);

                if (response.status === 200) {
                  window.location.href = "".concat("http://localhost:3000", "?popup=").concat(payload.srv_);
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function handleSubmit(_x) {
        return _handleSubmit.apply(this, arguments);
      }

      return handleSubmit;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      console.log("state buttons child", this.props.buttons);
      var order = this.props.order;
      console.log(order);
      var display_normal = [];
      var display_editing = []; // console.log(this.props.buttons)

      var amount_normal;
      var amount_editing; // console.log("WTF ", this.props.order_type)
      // console.log(order)

      if (this.props.order_type == "buyordersdata") {
        amount_normal = /*#__PURE__*/React.createElement("td", {
          id: "amount1",
          key: "td-amount-key-order:".concat(order._id)
        }, 'Amount: ' + order.amount);
        amount_editing = /*#__PURE__*/React.createElement("td", {
          id: "amount1",
          key: "td-edit-amount-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement(BuyAmount, {
          amount: order.amount
        }));
      }

      if (this.props.order_type == "sellordersdata") {
        amount_normal = /*#__PURE__*/React.createElement("td", {
          id: "amount1",
          key: "td-amount-key-order:".concat(order._id)
        }, 'Amount Range: ' + order.minamount, "-", order.maxamount);
        amount_editing = /*#__PURE__*/React.createElement("td", {
          id: "amount1",
          key: "td-edit-amount-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement(SellAmount, {
          minamount: order.minamount,
          maxamount: order.maxamount
        }));
      }

      display_normal.push( /*#__PURE__*/React.createElement("td", {
        id: "crypto1",
        key: "td-crypto-key-order:".concat(order._id)
      }, order.crypto), /*#__PURE__*/React.createElement("td", {
        id: "price1",
        key: "td-price-key-order:".concat(order._id)
      }, 'Price: ' + order.price), /*#__PURE__*/React.createElement("td", {
        id: "expiry1",
        key: "td-expiry-key-order:".concat(order._id)
      }, 'Exp.: ' + order.expirydate, "@", order.expirytime), /*#__PURE__*/React.createElement("td", {
        id: "payment1",
        key: "td-payment-key-order:".concat(order._id)
      }, order.payment), amount_normal);

      if (this.props.buttons == "normal") {
        display_normal.push( /*#__PURE__*/React.createElement("td", {
          id: "deal1",
          key: "td-deal-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement("button", null, /*#__PURE__*/React.createElement("a", {
          href: "/messaging?orderId=".concat(order._id, "&userIdB=").concat(order.userid._id)
        }, "Deal"))));
      }

      if (this.props.buttons == "my") {
        display_normal.push( /*#__PURE__*/React.createElement("td", {
          id: "button1",
          key: "td-button1-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick(e) {
            return _this4.props.handleClick(_this4.props.order_type, order._id, e);
          }
        }, "Delete")), /*#__PURE__*/React.createElement("td", {
          id: "button2",
          key: "td-button2-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick(e) {
            return _this4.props.handleToogleEdit("edit", order._id, e);
          }
        }, "Update")));
      }

      if (this.props.buttons == "edit") {
        display_editing.push(
        /*#__PURE__*/
        //   <div id="container-log-reg">
        //   <form id="loginregister" className="form">
        //     <h3>Login</h3>
        //     <label>Email</label>
        //     <input type="text" name="email"/> 
        //     <label>Password</label>
        //     <input type="text" name="password" value="Zouhir123!"/> 
        //     <button type="submit" onClick={(e) => this.handleSubmit(e)}>Login</button>
        //   </form>
        //   {/* display the notification from the server here! */}
        //   { notifyDisplays }
        // </div>
        React.createElement("td", {
          id: "form4",
          key: "td-edit-form4-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement("form", {
          className: "update-form",
          id: "my_form"
        })), /*#__PURE__*/React.createElement("td", {
          id: "ordertype4",
          key: "td-edit-ordertype4-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement("input", {
          form: "my_form",
          type: "hidden",
          name: "OrderType",
          value: this.props.order_type
        })), /*#__PURE__*/React.createElement("td", {
          id: "orderid4",
          key: "td-edit-orderid4-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement("input", {
          form: "my_form",
          type: "hidden",
          name: "OrderID",
          value: order._id
        }), " "), /*#__PURE__*/React.createElement("td", {
          id: "crypto1",
          key: "td-edit-crypto-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement("label", {
          htmlFor: "crypto-select"
        }, "Crypto"), /*#__PURE__*/React.createElement(TheSelectCrypto, {
          curentValue: order.crypto
        })), amount_editing, /*#__PURE__*/React.createElement("td", {
          id: "price1",
          key: "td-edit-price-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement("label", {
          htmlFor: "price-select"
        }, "Price"), /*#__PURE__*/React.createElement("input", {
          form: "my_form",
          type: "number",
          id: "price-select",
          name: "price",
          min: "0",
          required: true,
          defaultValue: order.price
        })), /*#__PURE__*/React.createElement("td", {
          id: "expiry1",
          key: "td-edit-expiry-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement("label", {
          htmlFor: "expirydate-select"
        }, "Order Expiry Date"), /*#__PURE__*/React.createElement("input", {
          form: "my_form",
          id: "expirydate-select",
          type: "date",
          name: "expirydate",
          required: true,
          defaultValue: order.expirydate
        }), /*#__PURE__*/React.createElement("label", {
          htmlFor: "expirytime-select"
        }, "Order Expiry Time"), /*#__PURE__*/React.createElement("input", {
          form: "my_form",
          id: "expirytime-select",
          type: "time",
          name: "expirytime",
          required: true,
          defaultValue: order.expirytime
        })), /*#__PURE__*/React.createElement("td", {
          id: "payment1",
          key: "td-edit-payment-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement("label", {
          htmlFor: "payment-select"
        }, "Payment"), /*#__PURE__*/React.createElement(TheSelectPayment, {
          curentValue: order.payment
        })), /*#__PURE__*/React.createElement("td", {
          id: "button1",
          key: "td-edit-button1-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement("button", {
          type: "submit",
          onClick: function onClick(e) {
            return _this4.handleSubmit(e);
          }
        }, "SaveHandle")), /*#__PURE__*/React.createElement("td", {
          id: "button2",
          key: "td-edit-button2-key-order:".concat(order._id)
        }, /*#__PURE__*/React.createElement("button", {
          onClick: function onClick(e) {
            return _this4.props.handleToogleEdit("my", order._id, e);
          }
        }, "Revert")));
      } // console.log("Require Keys: ", display_editing)


      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
        id: "id1"
      }, order._id), /*#__PURE__*/React.createElement("td", {
        id: "email1"
      }, order.userid.email, " wants to buy"), /*#__PURE__*/React.createElement("td", {
        id: "posteddate1"
      }, 'On: ' + order.postedDate), this.props.buttons == "normal" || this.props.buttons == "my" ? display_normal : null, this.props.buttons == "edit" ? display_editing : null);
    }
  }]);

  return OrderRow;
}(React.Component);

function TheSelectCrypto(props) {
  var currentValue = props.curentValue;
  return /*#__PURE__*/React.createElement("select", {
    form: "my_form",
    name: "crypto",
    id: "crypto-select",
    required: true,
    defaultValue: currentValue
  }, /*#__PURE__*/React.createElement("option", {
    value: "Bitcoin"
  }, "Bitcoin"), /*#__PURE__*/React.createElement("option", {
    value: "Ethereum"
  }, "Ethereum"), /*#__PURE__*/React.createElement("option", {
    value: "Litecoin"
  }, "Litecoin"), /*#__PURE__*/React.createElement("option", {
    value: "Bitcoin Cash"
  }, "Bitcoin Cash"), /*#__PURE__*/React.createElement("option", {
    value: "Zcash"
  }, "Zcash"), /*#__PURE__*/React.createElement("option", {
    value: "Monero"
  }, "Monero"));
}

function BuyAmount(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "amount-select"
  }, "Amount"), /*#__PURE__*/React.createElement("input", {
    form: "my_form",
    type: "number",
    id: "amount-select",
    name: "amount",
    min: "10",
    max: "10000",
    required: true,
    defaultValue: props.amount
  }));
}

function SellAmount(props) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "min-amount-select"
  }, "Min Amount"), /*#__PURE__*/React.createElement("input", {
    form: "my_form",
    type: "number",
    id: "min-amount-select",
    name: "minamount",
    required: true,
    defaultValue: props.minamount
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "max-amount-select"
  }, "Max Amount"), /*#__PURE__*/React.createElement("input", {
    form: "my_form",
    type: "number",
    id: "max-amount-select",
    name: "maxamount",
    required: true,
    defaultValue: props.maxamount
  }));
}

function TheSelectPayment(props) {
  var currentValue = props.curentValue;
  return /*#__PURE__*/React.createElement("select", {
    form: "my_form",
    name: "payment",
    id: "payment-select",
    required: true,
    defaultValue: currentValue
  }, /*#__PURE__*/React.createElement("option", {
    value: "Paypal"
  }, "Paypal"), /*#__PURE__*/React.createElement("option", {
    value: "Interac"
  }, "Interac"), /*#__PURE__*/React.createElement("option", {
    value: "Cash"
  }, "Cash"));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrderTable);

/***/ }),

/***/ "./src/orders-functionalities/PageSelector.jsx":
/*!*****************************************************!*\
  !*** ./src/orders-functionalities/PageSelector.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _styles_PageSelector_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/PageSelector.css */ "./src/orders-functionalities/styles/PageSelector.css");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// import React from 'react';


var PageSelector = /*#__PURE__*/function (_React$Component) {
  _inherits(PageSelector, _React$Component);

  var _super = _createSuper(PageSelector);

  function PageSelector(props) {
    var _this;

    _classCallCheck(this, PageSelector);

    _this = _super.call(this, props);
    _this.state = {
      page: 1
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.paginatorSetter = _this.paginatorSetter.bind(_assertThisInitialized(_this)); //this.handleClick = this.handleChange.bind(this);

    console.log("props", props);
    _this.numbered_list = _this.paginatorSetter(props);
    return _this;
  }

  _createClass(PageSelector, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        page: nextProps.page
      }); // console.log(nextProps, this.props)

      this.numbered_list = this.paginatorSetter(nextProps);
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      var _this2 = this;

      //document.getElementById("myBtn").disabled = true;
      //console.log("ID: ", e.target.id)
      //console.log('child: ', this.props.previousPage, this.props.nextPage)
      //console.log("CHECK! : ", this.props.check)
      // console.log(parseInt(e.target.dataset.key))
      if (e.target.id == "previous") {
        //console.log("previous was clicked")
        this.setState({
          page: this.state.page - 1
        }, function () {
          //console.log(this.state.page)
          _this2.props.controls(_this2.state.page);
        });
      } else if (e.target.id == "next") {
        //console.log("next was clicked")
        this.setState({
          page: this.state.page + 1
        }, function () {
          //console.log(this.state.page)
          _this2.props.controls(_this2.state.page);
        });
      }

      if (e.target.dataset.key) {
        this.setState({
          page: parseInt(e.target.dataset.key)
        }, function () {
          //console.log(this.state.page)
          _this2.props.controls(_this2.state.page);
        });
      }
    }
  }, {
    key: "paginatorSetter",
    value: function paginatorSetter(props) {
      var _this3 = this;

      var pages_numbers = [];

      for (var i = 1; i < props.number_of_pages + 1; i++) {
        pages_numbers.push(i);
      }

      var numbered_list = pages_numbers.map(function (page_number) {
        if (_this3.state.page === page_number) {
          return /*#__PURE__*/React.createElement("span", {
            "data-key": page_number,
            onClick: _this3.handleClick,
            key: page_number,
            style: {
              color: "red"
            }
          }, "    ", page_number, "    ");
        }

        return /*#__PURE__*/React.createElement("span", {
          "data-key": page_number,
          onClick: _this3.handleClick,
          key: page_number
        }, "    ", page_number, "    ");
      });
      var extra_span_keys = props.number_of_pages;

      if (numbered_list.length > 4) {
        if (this.state.page === 1 || this.state.page === 2) {
          // console.log("not trimmed start")
          numbered_list = numbered_list.slice(0, 4);
          numbered_list.push( /*#__PURE__*/React.createElement("span", {
            "data-key": props.number_of_pages,
            onClick: this.handleClick,
            key: ++extra_span_keys
          }, "    ...    "));
        } else if (this.state.page === numbered_list.length || this.state.page === numbered_list.length - 1 || this.state.page === numbered_list.length - 2) {
          // console.log("not trimmed end")
          numbered_list = numbered_list.slice(-4);
          numbered_list.unshift( /*#__PURE__*/React.createElement("span", {
            "data-key": 1,
            onClick: this.handleClick,
            key: ++extra_span_keys
          }, "    ...    "));
        } else if (this.state.page - 2 > 0 && this.state.page + 2 < numbered_list.length) {
          // console.log("trimed")
          numbered_list = numbered_list.slice(this.state.page - 2, this.state.page + 2);
          numbered_list.push( /*#__PURE__*/React.createElement("span", {
            "data-key": props.number_of_pages,
            onClick: this.handleClick,
            key: ++extra_span_keys
          }, "    ...    "));
          numbered_list.unshift( /*#__PURE__*/React.createElement("span", {
            "data-key": 1,
            onClick: this.handleClick,
            key: ++extra_span_keys
          }, "    ...    "));
        }
      }

      return numbered_list;
    }
  }, {
    key: "render",
    value: function render() {
      // console.log("numbered_list2", numbered_list)
      // console.log("you are on page:", this.state.page, "\n", "lower bound:", this.state.page,"\n", "upper bound:", this.state.page,"\n", "and their is:", this.props.number_of_pages,"\n")
      //console.log("childs fucking page: ", this.state.page)
      return /*#__PURE__*/React.createElement("div", {
        className: "wrapper3"
      }, this.props.number_of_pages === 0 ? /*#__PURE__*/React.createElement("div", null, "No entries avaible at the moment") : '', /*#__PURE__*/React.createElement("div", {
        className: "pagination"
      }, /*#__PURE__*/React.createElement("button", {
        disabled: this.props.on_off_limit_previous,
        id: "previous",
        onClick: this.handleClick
      }, "Previous Page"), /*#__PURE__*/React.createElement("div", {
        className: "page_numbers"
      }, this.numbered_list.length === 0 ? '0' : this.numbered_list), /*#__PURE__*/React.createElement("button", {
        disabled: this.props.on_off_limit_next,
        id: "next",
        onClick: this.handleClick
      }, "Next Page")));
    }
  }]);

  return PageSelector;
}(React.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageSelector);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/orders-functionalities/styles/PageSelector.css":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/orders-functionalities/styles/PageSelector.css ***!
  \**************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "div.page_numbers {\n  width: fit-content;\n  display: inline;\n}\n\ndiv.pagination {\n  display: flex;\n  justify-content: center;\n}", "",{"version":3,"sources":["webpack://./src/orders-functionalities/styles/PageSelector.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB","sourcesContent":["div.page_numbers {\n  width: fit-content;\n  display: inline;\n}\n\ndiv.pagination {\n  display: flex;\n  justify-content: center;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/orders-functionalities/styles/PageSelector.css":
/*!************************************************************!*\
  !*** ./src/orders-functionalities/styles/PageSelector.css ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_PageSelector_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./PageSelector.css */ "./node_modules/css-loader/dist/cjs.js!./src/orders-functionalities/styles/PageSelector.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_PageSelector_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_PageSelector_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_PageSelector_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_PageSelector_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX29yZGVycy1mdW5jdGlvbmFsaXRpZXNfT3JkZXJUYWJsZV9qc3gtc3JjX29yZGVycy1mdW5jdGlvbmFsaXRpZXNfUGFnZVNlbGVjdG9yX2pzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBRU1BOzs7OztBQUVKLHNCQUFZQyxLQUFaLEVBQWtCO0FBQUE7O0FBQUE7O0FBQ2hCLDhCQUFNQSxLQUFOO0FBQ0EsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLGdCQUFnQixFQUFFQyxTQURQO0FBRVhDLE1BQUFBLE9BQU8sRUFBRSxNQUFLSixLQUFMLENBQVdJO0FBRlQsS0FBYjtBQUlBLFVBQUtDLGdCQUFMLEdBQXdCLE1BQUtBLGdCQUFMLENBQXNCQyxJQUF0QiwrQkFBeEI7QUFOZ0I7QUFPakI7Ozs7V0FFRCwwQkFBaUJGLE9BQWpCLEVBQTBCRyxPQUExQixFQUFtQ0MsQ0FBbkMsRUFBcUM7QUFDbkM7QUFDQTtBQUNBLFdBQUtDLFFBQUwsQ0FBYyxVQUFBQyxTQUFTO0FBQUEsZUFBSztBQUMxQlIsVUFBQUEsZ0JBQWdCLEVBQUVLLE9BRFE7QUFFMUJILFVBQUFBLE9BQU8sRUFBRUE7QUFGaUIsU0FBTDtBQUFBLE9BQXZCO0FBSUQ7OztXQUVELGtCQUFRO0FBQUE7O0FBQ047QUFDQTtBQUVBLFVBQU1PLFNBQVMsR0FBRyxLQUFLWCxLQUFMLENBQVdZLE1BQVgsQ0FBa0JDLEdBQWxCLENBQXNCLFVBQUNDLEtBQUQsRUFBVztBQUNqRCw0QkFBTyxvQkFBQyxRQUFEO0FBQ1AscUJBQVcsRUFBRSxNQUFJLENBQUNkLEtBQUwsQ0FBV2UsV0FEakI7QUFFUCxpQkFBTyxFQUFFRCxLQUFLLENBQUNFLEdBQU4sS0FBYyxNQUFJLENBQUNmLEtBQUwsQ0FBV0MsZ0JBQXpCLEdBQTJDLE1BQUksQ0FBQ0QsS0FBTCxDQUFXRyxPQUF0RCxHQUErRCxNQUFJLENBQUNKLEtBQUwsQ0FBV0ksT0FGNUU7QUFH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QUNsRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDdENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RyeXB0by8uL3NyYy9vcmRlcnMtZnVuY3Rpb25hbGl0aWVzL09yZGVyVGFibGUuanN4Iiwid2VicGFjazovL3RyeXB0by8uL3NyYy9vcmRlcnMtZnVuY3Rpb25hbGl0aWVzL1BhZ2VTZWxlY3Rvci5qc3giLCJ3ZWJwYWNrOi8vdHJ5cHRvLy4vc3JjL29yZGVycy1mdW5jdGlvbmFsaXRpZXMvc3R5bGVzL1BhZ2VTZWxlY3Rvci5jc3MiLCJ3ZWJwYWNrOi8vdHJ5cHRvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90cnlwdG8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90cnlwdG8vLi9zcmMvb3JkZXJzLWZ1bmN0aW9uYWxpdGllcy9zdHlsZXMvUGFnZVNlbGVjdG9yLmNzcz8wYTJmIiwid2VicGFjazovL3RyeXB0by8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90cnlwdG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RyeXB0by8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90cnlwdG8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdHJ5cHRvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdHJ5cHRvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgT3JkZXJUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBvcmRlcklEX3RvVG9nZ2xlOiB1bmRlZmluZWQsXG4gICAgICBidXR0b25zOiB0aGlzLnByb3BzLmJ1dHRvbnNcbiAgICB9XG4gICAgdGhpcy5oYW5kbGVUb29nbGVFZGl0ID0gdGhpcy5oYW5kbGVUb29nbGVFZGl0LmJpbmQodGhpcylcbiAgfVxuXG4gIGhhbmRsZVRvb2dsZUVkaXQoYnV0dG9ucywgdmFsdWVpZCwgZSl7XG4gICAgLy9lLnByZXZlbnREZWZhdWx0KClcbiAgICAvL2NvbnNvbGUubG9nKGUudGFyZ2V0LnZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHByZXZTdGF0ZSA9PiAoe1xuICAgICAgb3JkZXJJRF90b1RvZ2dsZTogdmFsdWVpZCxcbiAgICAgIGJ1dHRvbnM6IGJ1dHRvbnNcbiAgICB9KSlcbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIC8vIGNvbnNvbGUubG9nKFwiUGFyZW50IHRvb2dsZWQgaWQgXCIsIHRoaXMuc3RhdGUub3JkZXJJRF90b1RvZ2dsZSApXG4gICAgLy8gY29uc29sZS5sb2coXCJidXR0b25zIFwiLCB0aGlzLnN0YXRlLmJ1dHRvbnMgKVxuXG4gICAgY29uc3Qgb3JkZXJzUm93ID0gdGhpcy5wcm9wcy5vcmRlcnMubWFwKChvcmRlcikgPT4ge1xuICAgICAgcmV0dXJuIDxPcmRlclJvdyBcbiAgICAgIGhhbmRsZUNsaWNrPXt0aGlzLnByb3BzLmhhbmRsZUNsaWNrfSBcbiAgICAgIGJ1dHRvbnM9e29yZGVyLl9pZCA9PT0gdGhpcy5zdGF0ZS5vcmRlcklEX3RvVG9nZ2xlPyB0aGlzLnN0YXRlLmJ1dHRvbnM6IHRoaXMucHJvcHMuYnV0dG9uc30gXG4gICAgICBvcmRlcl90eXBlPXt0aGlzLnByb3BzLm9yZGVyX3R5cGV9IFxuICAgICAga2V5PXtvcmRlci5faWR9IFxuICAgICAgb3JkZXI9e29yZGVyfVxuICAgICAgaGFuZGxlVG9vZ2xlRWRpdD17dGhpcy5oYW5kbGVUb29nbGVFZGl0fVxuICAgICAgLz5cbiAgICB9KVxuICAgIC8vIGNvbnNvbGUubG9nKFwiRG9lcyBOb3QgUmVxdWlyZSBLZXlzOiBcIiwgb3JkZXJzUm93KVxuXG4gICAgcmV0dXJuKFxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlcmVkLXRhYmxlXCI+XG4gICAgICAgIHsvKiA8dGhlYWQ+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoPk9yZGVyIF9pZDwvdGg+XG4gICAgICAgICAgICA8dGg+UG9zdGVkIGJ5PC90aD5cbiAgICAgICAgICAgIDx0aD5EYXRlIFBvc3RlZDwvdGg+XG4gICAgICAgICAgICA8dGg+Q3J5cHRvPC90aD5cbiAgICAgICAgICAgIDx0aD5BbW91bnQ8L3RoPlxuICAgICAgICAgICAgPHRoPlByaWNlPC90aD5cbiAgICAgICAgICAgIDx0aD5FeHBpcnk8L3RoPlxuICAgICAgICAgICAgPHRoPlBheW1lbnQ8L3RoPlxuICAgICAgICAgICAgPHRoPkRlYWw8L3RoPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+ICovfVxuICAgICAgICA8dGJvZHk+XG4gICAgICAgICAge29yZGVyc1Jvd31cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvdGFibGU+XG4gICAgKTtcbiAgfVxufVxuXG5cbmNsYXNzIE9yZGVyUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgIHN1cGVyKHByb3BzKVxuICAgIC8vIHRoaXMuc3RhdGUgPSB7XG4gICAgLy8gfVxuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKVxuICB9XG5cblxuICBhc3luYyBoYW5kbGVTdWJtaXQoZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc29sZS5sb2coXCJUZXN0aW5nIGhhbmRsZSBzdWJtaXRcIilcbiAgICBjb25zdCBvcmRlclR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15X2Zvcm1cIikuZWxlbWVudHNbXCJPcmRlclR5cGVcIl0udmFsdWVcbiAgICBsZXQgYW1vdW50LCBtaW5hbW91bnQsIG1heGFtb3VudFxuICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlfZm9ybVwiKS5lbGVtZW50c1tcIk9yZGVySURcIl0udmFsdWUpXG4gICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteV9mb3JtXCIpLmVsZW1lbnRzW1wiT3JkZXJUeXBlXCJdLnZhbHVlKVxuICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlfZm9ybVwiKS5lbGVtZW50c1tcInByaWNlXCJdLnZhbHVlKVxuICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlfZm9ybVwiKS5lbGVtZW50c1tcImV4cGlyeWRhdGVcIl0udmFsdWUpXG4gICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteV9mb3JtXCIpLmVsZW1lbnRzW1wiZXhwaXJ5dGltZVwiXS52YWx1ZSlcbiAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15X2Zvcm1cIikuZWxlbWVudHNbXCJjcnlwdG9cIl0udmFsdWUpXG4gICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteV9mb3JtXCIpLmVsZW1lbnRzW1wicGF5bWVudFwiXS52YWx1ZSlcbiAgICBpZiAob3JkZXJUeXBlID09PSBcImJ1eW9yZGVyc2RhdGFcIikge1xuICAgICAgYW1vdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteV9mb3JtXCIpLmVsZW1lbnRzW1wiYW1vdW50XCJdLnZhbHVlXG4gICAgICBtaW5hbW91bnQsIG1heGFtb3VudCA9IHVuZGVmaW5lZFxuICAgIH0gZWxzZSBpZiAob3JkZXJUeXBlID09PSBcInNlbGxvcmRlcnNkYXRhXCIpIHtcbiAgICAgIG1pbmFtb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlfZm9ybVwiKS5lbGVtZW50c1tcIm1pbmFtb3VudFwiXS52YWx1ZVxuICAgICAgbWF4YW1vdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteV9mb3JtXCIpLmVsZW1lbnRzW1wibWF4YW1vdW50XCJdLnZhbHVlXG4gICAgICBhbW91bnQgPSB1bmRlZmluZWRcbiAgICB9XG4gICAgY29uc29sZS5sb2coYW1vdW50LCBtaW5hbW91bnQsIG1heGFtb3VudClcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52LlJPT1R9L3VwZGF0ZWAsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgT3JkZXJUeXBlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15X2Zvcm1cIikuZWxlbWVudHNbXCJPcmRlclR5cGVcIl0udmFsdWUsXG4gICAgICAgIE9yZGVySUQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlfZm9ybVwiKS5lbGVtZW50c1tcIk9yZGVySURcIl0udmFsdWUsXG4gICAgICAgIGNyeXB0bzogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteV9mb3JtXCIpLmVsZW1lbnRzW1wiY3J5cHRvXCJdLnZhbHVlLFxuICAgICAgICBbb3JkZXJUeXBlID09PSBcImJ1eW9yZGVyc2RhdGFcIiA/IFwiYW1vdW50XCI6IG51bGxdOiBhbW91bnQsXG4gICAgICAgIFtvcmRlclR5cGUgPT09IFwic2VsbG9yZGVyc2RhdGFcIiA/IFwibWluYW1vdW50XCI6IG51bGxdOiBtaW5hbW91bnQsXG4gICAgICAgIFtvcmRlclR5cGUgPT09IFwic2VsbG9yZGVyc2RhdGFcIiA/IFwibWF4YW1vdW50XCI6IG51bGxdOiBtYXhhbW91bnQsXG4gICAgICAgIHByaWNlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15X2Zvcm1cIikuZWxlbWVudHNbXCJwcmljZVwiXS52YWx1ZSxcbiAgICAgICAgZXhwaXJ5ZGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteV9mb3JtXCIpLmVsZW1lbnRzW1wiZXhwaXJ5ZGF0ZVwiXS52YWx1ZSxcbiAgICAgICAgZXhwaXJ5dGltZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteV9mb3JtXCIpLmVsZW1lbnRzW1wiZXhwaXJ5dGltZVwiXS52YWx1ZSxcbiAgICAgICAgcGF5bWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteV9mb3JtXCIpLmVsZW1lbnRzW1wicGF5bWVudFwiXS52YWx1ZSxcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGNvbnNvbGUubG9nKFwiYXBpIHJlc3M6IFwiLCByZXNwb25zZSk7XG4gICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgIGNvbnNvbGUubG9nKFwicGF5bG9hZDogXCIsIHBheWxvYWQpXG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7cHJvY2Vzcy5lbnYuUk9PVH0/cG9wdXA9JHtwYXlsb2FkLnNydl99YDtcbiAgICB9XG5cbiAgfVxuXG4gIHJlbmRlcigpe1xuICAgIGNvbnNvbGUubG9nKFwic3RhdGUgYnV0dG9ucyBjaGlsZFwiLCB0aGlzLnByb3BzLmJ1dHRvbnMpXG4gICAgY29uc3Qgb3JkZXIgPSB0aGlzLnByb3BzLm9yZGVyO1xuXG4gICAgY29uc29sZS5sb2cob3JkZXIpXG4gICAgbGV0IGRpc3BsYXlfbm9ybWFsID0gW107XG4gICAgbGV0IGRpc3BsYXlfZWRpdGluZyA9IFtdO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvcHMuYnV0dG9ucylcbiAgICBcbiAgICBsZXQgYW1vdW50X25vcm1hbDtcbiAgICBsZXQgYW1vdW50X2VkaXRpbmc7XG4gICAgLy8gY29uc29sZS5sb2coXCJXVEYgXCIsIHRoaXMucHJvcHMub3JkZXJfdHlwZSlcbiAgICAvLyBjb25zb2xlLmxvZyhvcmRlcilcbiAgICBpZiAodGhpcy5wcm9wcy5vcmRlcl90eXBlID09IFwiYnV5b3JkZXJzZGF0YVwiKSB7XG4gICAgICBhbW91bnRfbm9ybWFsID0gPHRkIGlkPVwiYW1vdW50MVwiIGtleT17YHRkLWFtb3VudC1rZXktb3JkZXI6JHtvcmRlci5faWR9YH0+eydBbW91bnQ6ICcgKyBvcmRlci5hbW91bnR9PC90ZD5cbiAgICAgIGFtb3VudF9lZGl0aW5nID0gICAgICBcbiAgICAgIDx0ZCBpZD1cImFtb3VudDFcIiBrZXk9e2B0ZC1lZGl0LWFtb3VudC1rZXktb3JkZXI6JHtvcmRlci5faWR9YH0+XG4gICAgICAgIDxCdXlBbW91bnQgYW1vdW50ID0ge29yZGVyLmFtb3VudH0gLz5cbiAgICAgIDwvdGQ+ICAgXG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMub3JkZXJfdHlwZSA9PSBcInNlbGxvcmRlcnNkYXRhXCIpIHtcbiAgICAgIGFtb3VudF9ub3JtYWwgPSA8dGQgaWQ9XCJhbW91bnQxXCIga2V5PXtgdGQtYW1vdW50LWtleS1vcmRlcjoke29yZGVyLl9pZH1gfT57J0Ftb3VudCBSYW5nZTogJyArICBvcmRlci5taW5hbW91bnR9LXtvcmRlci5tYXhhbW91bnR9PC90ZD5cbiAgICAgIGFtb3VudF9lZGl0aW5nID1cbiAgICAgIDx0ZCBpZD1cImFtb3VudDFcIiBrZXk9e2B0ZC1lZGl0LWFtb3VudC1rZXktb3JkZXI6JHtvcmRlci5faWR9YH0+XG4gICAgICAgIDxTZWxsQW1vdW50IG1pbmFtb3VudCA9IHtvcmRlci5taW5hbW91bnR9IG1heGFtb3VudCA9IHtvcmRlci5tYXhhbW91bnR9Lz5cbiAgICAgIDwvdGQ+ICAgXG4gICAgfVxuXG4gICAgZGlzcGxheV9ub3JtYWwucHVzaChcbiAgICAgIDx0ZCBpZD1cImNyeXB0bzFcIiBrZXk9e2B0ZC1jcnlwdG8ta2V5LW9yZGVyOiR7b3JkZXIuX2lkfWB9PntvcmRlci5jcnlwdG99PC90ZD4sXG4gICAgICA8dGQgaWQ9XCJwcmljZTFcIiBrZXk9e2B0ZC1wcmljZS1rZXktb3JkZXI6JHtvcmRlci5faWR9YH0+eydQcmljZTogJyArIG9yZGVyLnByaWNlfTwvdGQ+LFxuICAgICAgPHRkIGlkPVwiZXhwaXJ5MVwiIGtleT17YHRkLWV4cGlyeS1rZXktb3JkZXI6JHtvcmRlci5faWR9YH0+eydFeHAuOiAnICsgb3JkZXIuZXhwaXJ5ZGF0ZX1Ae29yZGVyLmV4cGlyeXRpbWV9PC90ZD4sXG4gICAgICA8dGQgaWQ9XCJwYXltZW50MVwiIGtleT17YHRkLXBheW1lbnQta2V5LW9yZGVyOiR7b3JkZXIuX2lkfWB9PntvcmRlci5wYXltZW50fTwvdGQ+LFxuICAgICAgYW1vdW50X25vcm1hbCxcbiAgICApXG5cbiAgICBpZiAodGhpcy5wcm9wcy5idXR0b25zID09IFwibm9ybWFsXCIpIHtcblxuXG4gICAgICBkaXNwbGF5X25vcm1hbC5wdXNoKDx0ZCBpZD1cImRlYWwxXCIga2V5PXtgdGQtZGVhbC1rZXktb3JkZXI6JHtvcmRlci5faWR9YH0+XG4gICAgICAgIDxidXR0b24+PGEgaHJlZj17YC9tZXNzYWdpbmc/b3JkZXJJZD0ke29yZGVyLl9pZH0mdXNlcklkQj0ke29yZGVyLnVzZXJpZC5faWR9YH0+RGVhbDwvYT48L2J1dHRvbj5cbiAgICAgIDwvdGQ+KVxuICAgIH1cbiAgXG4gICAgaWYgKHRoaXMucHJvcHMuYnV0dG9ucyA9PSBcIm15XCIpIHtcbiAgICAgIGRpc3BsYXlfbm9ybWFsLnB1c2goPHRkIGlkPVwiYnV0dG9uMVwiIGtleT17YHRkLWJ1dHRvbjEta2V5LW9yZGVyOiR7b3JkZXIuX2lkfWB9PjxidXR0b24gb25DbGljaz17KGUpID0+IHRoaXMucHJvcHMuaGFuZGxlQ2xpY2sodGhpcy5wcm9wcy5vcmRlcl90eXBlLCBvcmRlci5faWQsIGUpfT5EZWxldGU8L2J1dHRvbj48L3RkPiwgPHRkIGlkPVwiYnV0dG9uMlwiIGtleT17YHRkLWJ1dHRvbjIta2V5LW9yZGVyOiR7b3JkZXIuX2lkfWB9PjxidXR0b24gb25DbGljaz17KGUpID0+IHRoaXMucHJvcHMuaGFuZGxlVG9vZ2xlRWRpdChcImVkaXRcIiwgb3JkZXIuX2lkLCBlKX0+VXBkYXRlPC9idXR0b24+PC90ZD4pXG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMuYnV0dG9ucyA9PSBcImVkaXRcIikge1xuICAgICAgZGlzcGxheV9lZGl0aW5nLnB1c2goXG4gICAgICAvLyAgIDxkaXYgaWQ9XCJjb250YWluZXItbG9nLXJlZ1wiPlxuICAgICAgLy8gICA8Zm9ybSBpZD1cImxvZ2lucmVnaXN0ZXJcIiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAvLyAgICAgPGgzPkxvZ2luPC9oMz5cbiAgICAgIC8vICAgICA8bGFiZWw+RW1haWw8L2xhYmVsPlxuICAgICAgLy8gICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbWFpbFwiLz4gXG4gICAgICAvLyAgICAgPGxhYmVsPlBhc3N3b3JkPC9sYWJlbD5cbiAgICAgIC8vICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwicGFzc3dvcmRcIiB2YWx1ZT1cIlpvdWhpcjEyMyFcIi8+IFxuICAgICAgLy8gICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhhbmRsZVN1Ym1pdChlKX0+TG9naW48L2J1dHRvbj5cbiAgICAgIC8vICAgPC9mb3JtPlxuICAgICAgLy8gICB7LyogZGlzcGxheSB0aGUgbm90aWZpY2F0aW9uIGZyb20gdGhlIHNlcnZlciBoZXJlISAqL31cbiAgICAgIC8vICAgeyBub3RpZnlEaXNwbGF5cyB9XG4gICAgICAvLyA8L2Rpdj5cblxuICAgICAgICA8dGQgaWQ9XCJmb3JtNFwiIGtleT17YHRkLWVkaXQtZm9ybTQta2V5LW9yZGVyOiR7b3JkZXIuX2lkfWB9Pjxmb3JtIGNsYXNzTmFtZT1cInVwZGF0ZS1mb3JtXCIgaWQ9XCJteV9mb3JtXCI+PC9mb3JtPjwvdGQ+LFxuICAgICAgICA8dGQgaWQ9XCJvcmRlcnR5cGU0XCIga2V5PXtgdGQtZWRpdC1vcmRlcnR5cGU0LWtleS1vcmRlcjoke29yZGVyLl9pZH1gfT48aW5wdXQgZm9ybT1cIm15X2Zvcm1cIiB0eXBlPSdoaWRkZW4nIG5hbWU9J09yZGVyVHlwZScgdmFsdWU9e3RoaXMucHJvcHMub3JkZXJfdHlwZX0vPjwvdGQ+LFxuICAgICAgICA8dGQgaWQ9XCJvcmRlcmlkNFwiIGtleT17YHRkLWVkaXQtb3JkZXJpZDQta2V5LW9yZGVyOiR7b3JkZXIuX2lkfWB9PjxpbnB1dCBmb3JtPVwibXlfZm9ybVwiIHR5cGU9J2hpZGRlbicgbmFtZT0nT3JkZXJJRCcgdmFsdWU9e29yZGVyLl9pZH0vPiA8L3RkPixcbiAgICAgICAgPHRkIGlkPVwiY3J5cHRvMVwiIGtleT17YHRkLWVkaXQtY3J5cHRvLWtleS1vcmRlcjoke29yZGVyLl9pZH1gfT5cbiAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNyeXB0by1zZWxlY3RcIj5DcnlwdG88L2xhYmVsPlxuICAgICAgICAgIDxUaGVTZWxlY3RDcnlwdG8gXG4gICAgICAgICAgICBjdXJlbnRWYWx1ZSA9IHtvcmRlci5jcnlwdG99XG4gICAgICAgICAgLz5cbiAgICAgICAgPC90ZD4gLFxuICAgICAgICBhbW91bnRfZWRpdGluZyxcbiAgICAgICAgPHRkIGlkPVwicHJpY2UxXCIga2V5PXtgdGQtZWRpdC1wcmljZS1rZXktb3JkZXI6JHtvcmRlci5faWR9YH0+XG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJwcmljZS1zZWxlY3RcIj5QcmljZTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGZvcm09XCJteV9mb3JtXCIgdHlwZT1cIm51bWJlclwiIGlkPVwicHJpY2Utc2VsZWN0XCIgbmFtZT1cInByaWNlXCIgbWluPVwiMFwiIHJlcXVpcmVkIGRlZmF1bHRWYWx1ZT17b3JkZXIucHJpY2V9Lz4gXG4gICAgICAgIDwvdGQ+LFxuICAgICAgICA8dGQgaWQ9XCJleHBpcnkxXCIga2V5PXtgdGQtZWRpdC1leHBpcnkta2V5LW9yZGVyOiR7b3JkZXIuX2lkfWB9PlxuICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZXhwaXJ5ZGF0ZS1zZWxlY3RcIj5PcmRlciBFeHBpcnkgRGF0ZTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGZvcm09XCJteV9mb3JtXCIgaWQ9XCJleHBpcnlkYXRlLXNlbGVjdFwiIHR5cGU9XCJkYXRlXCIgbmFtZT1cImV4cGlyeWRhdGVcIiByZXF1aXJlZCBkZWZhdWx0VmFsdWU9e29yZGVyLmV4cGlyeWRhdGV9Lz5cbiAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImV4cGlyeXRpbWUtc2VsZWN0XCI+T3JkZXIgRXhwaXJ5IFRpbWU8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBmb3JtPVwibXlfZm9ybVwiIGlkPVwiZXhwaXJ5dGltZS1zZWxlY3RcIiB0eXBlPVwidGltZVwiIG5hbWU9XCJleHBpcnl0aW1lXCIgcmVxdWlyZWQgZGVmYXVsdFZhbHVlPXtvcmRlci5leHBpcnl0aW1lfS8+XG4gICAgICAgIDwvdGQ+ICxcbiAgICAgICAgPHRkIGlkPVwicGF5bWVudDFcIiBrZXk9e2B0ZC1lZGl0LXBheW1lbnQta2V5LW9yZGVyOiR7b3JkZXIuX2lkfWB9PlxuICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicGF5bWVudC1zZWxlY3RcIj5QYXltZW50PC9sYWJlbD5cbiAgICAgICAgICA8VGhlU2VsZWN0UGF5bWVudCBcbiAgICAgICAgICAgIGN1cmVudFZhbHVlID0ge29yZGVyLnBheW1lbnR9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC90ZD4sXG4gICAgICAgIDx0ZCBpZD1cImJ1dHRvbjFcIiBrZXk9e2B0ZC1lZGl0LWJ1dHRvbjEta2V5LW9yZGVyOiR7b3JkZXIuX2lkfWB9PjxidXR0b24gdHlwZT1cInN1Ym1pdFwiIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLmhhbmRsZVN1Ym1pdChlKX0+U2F2ZUhhbmRsZTwvYnV0dG9uPjwvdGQ+LFxuICAgICAgICA8dGQgaWQ9XCJidXR0b24yXCIga2V5PXtgdGQtZWRpdC1idXR0b24yLWtleS1vcmRlcjoke29yZGVyLl9pZH1gfT48YnV0dG9uIG9uQ2xpY2s9eyhlKSA9PiB0aGlzLnByb3BzLmhhbmRsZVRvb2dsZUVkaXQoXCJteVwiLCBvcmRlci5faWQsIGUpfT5SZXZlcnQ8L2J1dHRvbj48L3RkPlxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKFwiUmVxdWlyZSBLZXlzOiBcIiwgZGlzcGxheV9lZGl0aW5nKVxuICAgIHJldHVybihcbiAgICAgIDx0cj5cbiAgICAgICAgPHRkIGlkPVwiaWQxXCI+e29yZGVyLl9pZH08L3RkPlxuICAgICAgICA8dGQgaWQ9XCJlbWFpbDFcIj57b3JkZXIudXNlcmlkLmVtYWlsfSB3YW50cyB0byBidXk8L3RkPlxuICAgICAgICA8dGQgaWQ9XCJwb3N0ZWRkYXRlMVwiPnsnT246ICcgKyBvcmRlci5wb3N0ZWREYXRlfTwvdGQ+XG4gICAgICAgIHt0aGlzLnByb3BzLmJ1dHRvbnMgPT0gXCJub3JtYWxcIiB8fCB0aGlzLnByb3BzLmJ1dHRvbnMgPT0gXCJteVwiID8gZGlzcGxheV9ub3JtYWw6IG51bGx9XG4gICAgICAgIHt0aGlzLnByb3BzLmJ1dHRvbnMgPT0gXCJlZGl0XCIgPyBkaXNwbGF5X2VkaXRpbmc6IG51bGx9XG4gICAgICA8L3RyPlxuICAgICk7XG4gIH1cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5mdW5jdGlvbiBUaGVTZWxlY3RDcnlwdG8ocHJvcHMpe1xuICBsZXQgY3VycmVudFZhbHVlID0gcHJvcHMuY3VyZW50VmFsdWU7XG4gIHJldHVybihcbiAgPHNlbGVjdCBmb3JtPVwibXlfZm9ybVwiIG5hbWU9XCJjcnlwdG9cIiBpZD1cImNyeXB0by1zZWxlY3RcIiByZXF1aXJlZCBkZWZhdWx0VmFsdWU9e2N1cnJlbnRWYWx1ZX0+XG4gICAgPG9wdGlvbiB2YWx1ZT1cIkJpdGNvaW5cIj5CaXRjb2luPC9vcHRpb24+XG4gICAgPG9wdGlvbiB2YWx1ZT1cIkV0aGVyZXVtXCI+RXRoZXJldW08L29wdGlvbj5cbiAgICA8b3B0aW9uIHZhbHVlPVwiTGl0ZWNvaW5cIj5MaXRlY29pbjwvb3B0aW9uPlxuICAgIDxvcHRpb24gdmFsdWU9XCJCaXRjb2luIENhc2hcIj5CaXRjb2luIENhc2g8L29wdGlvbj5cbiAgICA8b3B0aW9uIHZhbHVlPVwiWmNhc2hcIj5aY2FzaDwvb3B0aW9uPlxuICAgIDxvcHRpb24gdmFsdWU9XCJNb25lcm9cIj5Nb25lcm88L29wdGlvbj5cbiAgPC9zZWxlY3Q+XG4gKVxufVxuXG5mdW5jdGlvbiBCdXlBbW91bnQocHJvcHMpIHtcbiAgcmV0dXJuKFxuICA8ZGl2PlxuICAgIDxsYWJlbCBodG1sRm9yPVwiYW1vdW50LXNlbGVjdFwiPkFtb3VudDwvbGFiZWw+XG4gICAgPGlucHV0IGZvcm09XCJteV9mb3JtXCIgdHlwZT1cIm51bWJlclwiIGlkPVwiYW1vdW50LXNlbGVjdFwiIG5hbWU9XCJhbW91bnRcIiBtaW49XCIxMFwiIG1heD1cIjEwMDAwXCIgcmVxdWlyZWQgZGVmYXVsdFZhbHVlPXtwcm9wcy5hbW91bnR9Lz4gIFxuICA8L2Rpdj5cbiAgKVxufVxuXG5mdW5jdGlvbiBTZWxsQW1vdW50KHByb3BzKSB7XG4gIHJldHVybiAoXG4gIDxkaXY+XG4gICAgICA8bGFiZWwgaHRtbEZvcj1cIm1pbi1hbW91bnQtc2VsZWN0XCI+TWluIEFtb3VudDwvbGFiZWw+XG4gICAgICA8aW5wdXQgZm9ybT1cIm15X2Zvcm1cIiB0eXBlPVwibnVtYmVyXCIgaWQ9XCJtaW4tYW1vdW50LXNlbGVjdFwiIG5hbWU9XCJtaW5hbW91bnRcIiByZXF1aXJlZCBkZWZhdWx0VmFsdWU9e3Byb3BzLm1pbmFtb3VudH0vPiBcbiAgICAgIDxsYWJlbCBodG1sRm9yPVwibWF4LWFtb3VudC1zZWxlY3RcIj5NYXggQW1vdW50PC9sYWJlbD5cbiAgICAgIDxpbnB1dCBmb3JtPVwibXlfZm9ybVwiIHR5cGU9XCJudW1iZXJcIiBpZD1cIm1heC1hbW91bnQtc2VsZWN0XCIgbmFtZT1cIm1heGFtb3VudFwiIHJlcXVpcmVkIGRlZmF1bHRWYWx1ZT17cHJvcHMubWF4YW1vdW50fS8+IFxuICA8L2Rpdj5cbiAgKVxufVxuXG5mdW5jdGlvbiBUaGVTZWxlY3RQYXltZW50KHByb3BzKXtcbiAgbGV0IGN1cnJlbnRWYWx1ZSA9IHByb3BzLmN1cmVudFZhbHVlO1xuICByZXR1cm4oXG4gIDxzZWxlY3QgZm9ybT1cIm15X2Zvcm1cIiBuYW1lPVwicGF5bWVudFwiIGlkPVwicGF5bWVudC1zZWxlY3RcIiByZXF1aXJlZCBkZWZhdWx0VmFsdWU9e2N1cnJlbnRWYWx1ZX0+XG4gICAgPG9wdGlvbiB2YWx1ZT1cIlBheXBhbFwiPlBheXBhbDwvb3B0aW9uPlxuICAgIDxvcHRpb24gdmFsdWU9XCJJbnRlcmFjXCI+SW50ZXJhYzwvb3B0aW9uPlxuICAgIDxvcHRpb24gdmFsdWU9XCJDYXNoXCI+Q2FzaDwvb3B0aW9uPlxuICA8L3NlbGVjdD5cbiApXG59XG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyVGFibGUiLCIvLyBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICcuL3N0eWxlcy9QYWdlU2VsZWN0b3IuY3NzJ1xuXG5cblxuY2xhc3MgUGFnZVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHBhZ2U6IDEsXG4gICAgfVxuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy5wYWdpbmF0b3JTZXR0ZXIgPSB0aGlzLnBhZ2luYXRvclNldHRlci5iaW5kKHRoaXMpO1xuICAgIC8vdGhpcy5oYW5kbGVDbGljayA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgY29uc29sZS5sb2coXCJwcm9wc1wiLCBwcm9wcylcbiAgICB0aGlzLm51bWJlcmVkX2xpc3QgPSB0aGlzLnBhZ2luYXRvclNldHRlcihwcm9wcylcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHBhZ2U6IG5leHRQcm9wcy5wYWdlIH0pOyAgXG4gICAgLy8gY29uc29sZS5sb2cobmV4dFByb3BzLCB0aGlzLnByb3BzKVxuICAgIHRoaXMubnVtYmVyZWRfbGlzdCA9IHRoaXMucGFnaW5hdG9yU2V0dGVyKG5leHRQcm9wcylcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKGUpIHtcbiAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlCdG5cIikuZGlzYWJsZWQgPSB0cnVlO1xuICAgIC8vY29uc29sZS5sb2coXCJJRDogXCIsIGUudGFyZ2V0LmlkKVxuICAgIC8vY29uc29sZS5sb2coJ2NoaWxkOiAnLCB0aGlzLnByb3BzLnByZXZpb3VzUGFnZSwgdGhpcy5wcm9wcy5uZXh0UGFnZSlcbiAgICAvL2NvbnNvbGUubG9nKFwiQ0hFQ0shIDogXCIsIHRoaXMucHJvcHMuY2hlY2spXG4gICAgLy8gY29uc29sZS5sb2cocGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5rZXkpKVxuICAgIGlmKGUudGFyZ2V0LmlkID09IFwicHJldmlvdXNcIil7XG4gICAgICAvL2NvbnNvbGUubG9nKFwicHJldmlvdXMgd2FzIGNsaWNrZWRcIilcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHBhZ2U6IHRoaXMuc3RhdGUucGFnZS0xXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS5wYWdlKVxuICAgICAgICB0aGlzLnByb3BzLmNvbnRyb2xzKHRoaXMuc3RhdGUucGFnZSlcbiAgICAgIH0pXG4gICAgfVxuICAgIGVsc2UgaWYoZS50YXJnZXQuaWQgPT0gXCJuZXh0XCIpe1xuICAgICAgLy9jb25zb2xlLmxvZyhcIm5leHQgd2FzIGNsaWNrZWRcIilcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBwYWdlOiB0aGlzLnN0YXRlLnBhZ2UrMVxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc3RhdGUucGFnZSlcbiAgICAgICAgdGhpcy5wcm9wcy5jb250cm9scyh0aGlzLnN0YXRlLnBhZ2UpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmKGUudGFyZ2V0LmRhdGFzZXQua2V5KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgcGFnZTogcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5rZXkpXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIC8vY29uc29sZS5sb2codGhpcy5zdGF0ZS5wYWdlKVxuICAgICAgICB0aGlzLnByb3BzLmNvbnRyb2xzKHRoaXMuc3RhdGUucGFnZSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcGFnaW5hdG9yU2V0dGVyKHByb3BzKXtcbiAgICBsZXQgcGFnZXNfbnVtYmVycyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcHJvcHMubnVtYmVyX29mX3BhZ2VzKzE7IGkrKykge1xuICAgICAgcGFnZXNfbnVtYmVycy5wdXNoKGkpXG4gICAgfVxuXG4gICAgbGV0IG51bWJlcmVkX2xpc3QgPSBwYWdlc19udW1iZXJzLm1hcChcbiAgICAgIHBhZ2VfbnVtYmVyID0+IHtcbiAgICAgICAgaWYodGhpcy5zdGF0ZS5wYWdlID09PSBwYWdlX251bWJlcil7XG4gICAgICAgICAgcmV0dXJuIDxzcGFuIGRhdGEta2V5PXtwYWdlX251bWJlcn0gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30ga2V5PXtwYWdlX251bWJlcn0gc3R5bGU9e3tjb2xvcjogXCJyZWRcIn19PiAgICB7cGFnZV9udW1iZXJ9ICAgIDwvc3Bhbj5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHNwYW4gZGF0YS1rZXk9e3BhZ2VfbnVtYmVyfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSBrZXk9e3BhZ2VfbnVtYmVyfT4gICAge3BhZ2VfbnVtYmVyfSAgICA8L3NwYW4+XG4gICAgICB9XG4gICAgKVxuXG4gICAgbGV0IGV4dHJhX3NwYW5fa2V5cyA9IHByb3BzLm51bWJlcl9vZl9wYWdlc1xuICAgIGlmKG51bWJlcmVkX2xpc3QubGVuZ3RoPjQpIHtcbiAgICAgIGlmKHRoaXMuc3RhdGUucGFnZSA9PT0gMSB8fCB0aGlzLnN0YXRlLnBhZ2UgPT09IDIpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJub3QgdHJpbW1lZCBzdGFydFwiKVxuICAgICAgICBudW1iZXJlZF9saXN0ID0gbnVtYmVyZWRfbGlzdC5zbGljZSgwLCA0KVxuICAgICAgICBudW1iZXJlZF9saXN0LnB1c2goPHNwYW4gZGF0YS1rZXk9e3Byb3BzLm51bWJlcl9vZl9wYWdlc30gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30ga2V5PXsrK2V4dHJhX3NwYW5fa2V5c30+ICAgIC4uLiAgICA8L3NwYW4+KVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLnBhZ2UgPT09IG51bWJlcmVkX2xpc3QubGVuZ3RoIHx8IHRoaXMuc3RhdGUucGFnZSA9PT0gbnVtYmVyZWRfbGlzdC5sZW5ndGgtMSB8fCB0aGlzLnN0YXRlLnBhZ2UgPT09IG51bWJlcmVkX2xpc3QubGVuZ3RoLTIpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJub3QgdHJpbW1lZCBlbmRcIilcbiAgICAgICAgbnVtYmVyZWRfbGlzdCA9IG51bWJlcmVkX2xpc3Quc2xpY2UoLTQpXG4gICAgICAgIG51bWJlcmVkX2xpc3QudW5zaGlmdCg8c3BhbiBkYXRhLWtleT17MX0gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30ga2V5PXsrK2V4dHJhX3NwYW5fa2V5c30+ICAgIC4uLiAgICA8L3NwYW4+KVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLnBhZ2UtMiA+IDAgJiYgdGhpcy5zdGF0ZS5wYWdlKzIgPCBudW1iZXJlZF9saXN0Lmxlbmd0aCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRyaW1lZFwiKVxuICAgICAgICBudW1iZXJlZF9saXN0ID0gbnVtYmVyZWRfbGlzdC5zbGljZSh0aGlzLnN0YXRlLnBhZ2UtMix0aGlzLnN0YXRlLnBhZ2UrMilcbiAgICAgICAgbnVtYmVyZWRfbGlzdC5wdXNoKDxzcGFuIGRhdGEta2V5PXtwcm9wcy5udW1iZXJfb2ZfcGFnZXN9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9IGtleT17KytleHRyYV9zcGFuX2tleXN9PiAgICAuLi4gICAgPC9zcGFuPilcbiAgICAgICAgbnVtYmVyZWRfbGlzdC51bnNoaWZ0KDxzcGFuIGRhdGEta2V5PXsxfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfSBrZXk9eysrZXh0cmFfc3Bhbl9rZXlzfT4gICAgLi4uICAgIDwvc3Bhbj4pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudW1iZXJlZF9saXN0XG4gIH1cblxuXG5cbiAgcmVuZGVyKCkge1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJudW1iZXJlZF9saXN0MlwiLCBudW1iZXJlZF9saXN0KVxuICAgIC8vIGNvbnNvbGUubG9nKFwieW91IGFyZSBvbiBwYWdlOlwiLCB0aGlzLnN0YXRlLnBhZ2UsIFwiXFxuXCIsIFwibG93ZXIgYm91bmQ6XCIsIHRoaXMuc3RhdGUucGFnZSxcIlxcblwiLCBcInVwcGVyIGJvdW5kOlwiLCB0aGlzLnN0YXRlLnBhZ2UsXCJcXG5cIiwgXCJhbmQgdGhlaXIgaXM6XCIsIHRoaXMucHJvcHMubnVtYmVyX29mX3BhZ2VzLFwiXFxuXCIpXG5cbiAgICAvL2NvbnNvbGUubG9nKFwiY2hpbGRzIGZ1Y2tpbmcgcGFnZTogXCIsIHRoaXMuc3RhdGUucGFnZSlcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIndyYXBwZXIzXCI+XG4gICAgICAgIHt0aGlzLnByb3BzLm51bWJlcl9vZl9wYWdlcyA9PT0gMCA/IDxkaXY+Tm8gZW50cmllcyBhdmFpYmxlIGF0IHRoZSBtb21lbnQ8L2Rpdj4gOiAnJ31cbiAgICAgICAgey8qIDxoMT5QYWdlU2VsZWN0b3I8L2gxPlxuICAgICAgICA8cD55b3UgYXJlIG9uIHBhZ2U6IHt0aGlzLnN0YXRlLnBhZ2V9PC9wPlxuICAgICAgICA8cD5hbmQgdGhlaXIgaXM6IHt0aGlzLnByb3BzLm51bWJlcl9vZl9wYWdlc308L3A+ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2luYXRpb25cIj5cbiAgICAgICAgICA8YnV0dG9uIGRpc2FibGVkPXt0aGlzLnByb3BzLm9uX29mZl9saW1pdF9wcmV2aW91c30gaWQ9XCJwcmV2aW91c1wiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PlByZXZpb3VzIFBhZ2U8L2J1dHRvbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2VfbnVtYmVyc1wiPlxuICAgICAgICAgICAge3RoaXMubnVtYmVyZWRfbGlzdC5sZW5ndGggPT09IDAgPyAnMCc6IHRoaXMubnVtYmVyZWRfbGlzdH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIGRpc2FibGVkPXt0aGlzLnByb3BzLm9uX29mZl9saW1pdF9uZXh0fSBpZD1cIm5leHRcIiAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+TmV4dCBQYWdlPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VTZWxlY3RvciIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiZGl2LnBhZ2VfbnVtYmVycyB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBpbmxpbmU7XFxufVxcblxcbmRpdi5wYWdpbmF0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL29yZGVycy1mdW5jdGlvbmFsaXRpZXMvc3R5bGVzL1BhZ2VTZWxlY3Rvci5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7QUFDekJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiZGl2LnBhZ2VfbnVtYmVycyB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBpbmxpbmU7XFxufVxcblxcbmRpdi5wYWdpbmF0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9QYWdlU2VsZWN0b3IuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9QYWdlU2VsZWN0b3IuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJPcmRlclRhYmxlIiwicHJvcHMiLCJzdGF0ZSIsIm9yZGVySURfdG9Ub2dnbGUiLCJ1bmRlZmluZWQiLCJidXR0b25zIiwiaGFuZGxlVG9vZ2xlRWRpdCIsImJpbmQiLCJ2YWx1ZWlkIiwiZSIsInNldFN0YXRlIiwicHJldlN0YXRlIiwib3JkZXJzUm93Iiwib3JkZXJzIiwibWFwIiwib3JkZXIiLCJoYW5kbGVDbGljayIsIl9pZCIsIm9yZGVyX3R5cGUiLCJSZWFjdCIsIkNvbXBvbmVudCIsIk9yZGVyUm93IiwiaGFuZGxlU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJjb25zb2xlIiwibG9nIiwib3JkZXJUeXBlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVsZW1lbnRzIiwidmFsdWUiLCJhbW91bnQiLCJtaW5hbW91bnQiLCJtYXhhbW91bnQiLCJmZXRjaCIsInByb2Nlc3MiLCJlbnYiLCJST09UIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiT3JkZXJUeXBlIiwiT3JkZXJJRCIsImNyeXB0byIsInJlc3BvbnNlIiwianNvbiIsInBheWxvYWQiLCJzdGF0dXMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJzcnZfIiwiZGlzcGxheV9ub3JtYWwiLCJkaXNwbGF5X2VkaXRpbmciLCJhbW91bnRfbm9ybWFsIiwiYW1vdW50X2VkaXRpbmciLCJwdXNoIiwicHJpY2UiLCJleHBpcnlkYXRlIiwiZXhwaXJ5dGltZSIsInBheW1lbnQiLCJ1c2VyaWQiLCJlbWFpbCIsInBvc3RlZERhdGUiLCJUaGVTZWxlY3RDcnlwdG8iLCJjdXJyZW50VmFsdWUiLCJjdXJlbnRWYWx1ZSIsIkJ1eUFtb3VudCIsIlNlbGxBbW91bnQiLCJUaGVTZWxlY3RQYXltZW50IiwiUGFnZVNlbGVjdG9yIiwicGFnZSIsInBhZ2luYXRvclNldHRlciIsIm51bWJlcmVkX2xpc3QiLCJuZXh0UHJvcHMiLCJ0YXJnZXQiLCJpZCIsImNvbnRyb2xzIiwiZGF0YXNldCIsImtleSIsInBhcnNlSW50IiwicGFnZXNfbnVtYmVycyIsImkiLCJudW1iZXJfb2ZfcGFnZXMiLCJwYWdlX251bWJlciIsImNvbG9yIiwiZXh0cmFfc3Bhbl9rZXlzIiwibGVuZ3RoIiwic2xpY2UiLCJ1bnNoaWZ0Iiwib25fb2ZmX2xpbWl0X3ByZXZpb3VzIiwib25fb2ZmX2xpbWl0X25leHQiXSwic291cmNlUm9vdCI6IiJ9