"use strict";
(self["webpackChunktrypto"] = self["webpackChunktrypto"] || []).push([["src_orders-functionalities_MyOrders_jsx"],{

/***/ "./src/orders-functionalities/MyOrders.jsx":
/*!*************************************************!*\
  !*** ./src/orders-functionalities/MyOrders.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _styles_MyOrders_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/MyOrders.css */ "./src/orders-functionalities/styles/MyOrders.css");
/* harmony import */ var _PageSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageSelector */ "./src/orders-functionalities/PageSelector.jsx");
/* harmony import */ var _OrderTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OrderTable */ "./src/orders-functionalities/OrderTable.jsx");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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




var MyOrders = /*#__PURE__*/function (_React$Component) {
  _inherits(MyOrders, _React$Component);

  var _super = _createSuper(MyOrders);

  function MyOrders() {
    var _this;

    _classCallCheck(this, MyOrders);

    _this = _super.call(this);
    _this.state = {
      userId: '',
      orderstype: 'buyordersdata',
      orders: [],
      page: 1,
      limit: 3,
      //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      number_of_pages: 1,
      orderID_toToggle: undefined
    };
    _this.handleOrderTypeToogle = _this.handleOrderTypeToogle.bind(_assertThisInitialized(_this));
    _this.handleDelete = _this.handleDelete.bind(_assertThisInitialized(_this));
    _this.controls = _this.controls.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MyOrders, [{
    key: "handleClick",
    value: function handleClick(valuetype, valueid, e) {
      var _this2 = this;

      // console.log("handleClick: ", valuetype, valueid)
      fetch("".concat("http://localhost:3000", "/delete-this-order"), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          OrderType: valuetype,
          OrderID: valueid
        })
      }).then(function (response) {
        return response.json();
      }).then(function (OBJserv_) {
        // console.log(OBJserv_)
        var elements_left_in_page = document.getElementsByTagName("tr"); // console.log("Conditions", this.state.on_off_limit_next, elements_left_in_page.length === 1, this.state.number_of_pages != 1)
        //true, true, true

        if (_this2.state.on_off_limit_next && elements_left_in_page.length === 1 && _this2.state.number_of_pages != 1) {
          // console.log("1")
          _this2.handleDelete(OBJserv_.memorized_order_type, true);
        } else {
          // console.log("2")
          _this2.handleDelete(OBJserv_.memorized_order_type);
        } // console.log("elements_left_in_page: ",  elements_left_in_page, elements_left_in_page.length)
        // console.log("bounds: ",  this.props.on_off_limit_previous, this.props.on_off_limit_next)
        // console.log(OBJserv_.memorized_order_type)

      });
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(value) {
      var _this3 = this;

      var _signal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      //e.preventDefault()
      //console.log(e.target.value);
      console.log(_signal);

      if (!_signal) {
        console.log("HERRRE1!!!");
        this.setState({
          orderstype: value,
          page: this.state.page
        }, function () {
          _this3.loadData(_this3.state.orderstype);
        });
      } else {
        console.log("HERRRE2!!!");
        this.setState({
          orderstype: value,
          page: this.state.page - 1
        }, function () {
          _this3.loadData(_this3.state.orderstype);
        });
      }
    }
  }, {
    key: "controls",
    value: function controls(_page) {
      var _this4 = this;

      this.setState({
        page: _page
      }, function () {
        //console.log("callback: ", this.state.page)
        _this4.loadData(_this4.state.orderstype);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      //DOM is ready
      this.loadData(this.state.orderstype);
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_orderstype) {
        var _this5 = this;

        var _userID, response2, serverOBJ;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // console.log(_orderstype)
                // let _userID = ''
                // console.log(`${process.env.ROOT}/current-user-ID`)
                // const response1 = await fetch(`${process.env.ROOT}/current-user-ID`)    
                // const srv_ = await response1.json()
                // _userID = srv_.srv_usr_ID
                _userID = document.getElementById("userId").innerHTML; // console.log("did it work????", _userID, typeof _userID)

                _context.next = 3;
                return fetch("".concat("http://localhost:3000", "/paginated-orders/").concat(_orderstype, "/").concat(_userID, "?page=").concat(this.state.page, "&limit=").concat(this.state.limit));

              case 3:
                response2 = _context.sent;
                _context.next = 6;
                return response2.json();

              case 6:
                serverOBJ = _context.sent;
                this.setState({
                  userId: _userID,
                  orders: serverOBJ.srv_.ORDERS,
                  nextPage: serverOBJ.srv_.next,
                  previousPage: serverOBJ.srv_.previous,
                  number_of_pages: serverOBJ.srv_.number_of_pages.number
                }, function () {
                  // console.log("page: ", this.state.previousPage, this.state.nextPage)
                  if (_this5.state.nextPage == undefined) {
                    _this5.setState({
                      on_off_limit_next: true
                    });
                  } else {
                    _this5.setState({
                      on_off_limit_next: false
                    });
                  }

                  if (_this5.state.previousPage == undefined) {
                    _this5.setState({
                      on_off_limit_previous: true
                    });
                  } else {
                    _this5.setState({
                      on_off_limit_previous: false
                    });
                  } // let remainder = this.state.orders.length%this.state.limit
                  // console.log("remainder",remainder)

                });

              case 8:
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
    key: "handleOrderTypeToogle",
    value: function handleOrderTypeToogle(e) {
      var _this6 = this;

      //e.preventDefault()
      //console.log(e.target.value);
      this.setState({
        orderstype: e.target.value,
        page: 1
      }, function () {
        _this6.loadData(_this6.state.orderstype); // console.log("Ordertype on: ", this.state.orderstype)

      });
    }
  }, {
    key: "render",
    value: function render() {
      console.log("ordertype!!! ", this.state.orderstype);
      return /*#__PURE__*/React.createElement("div", {
        className: "wrapper2"
      }, /*#__PURE__*/React.createElement("form", {
        name: "toogle"
      }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
        type: "radio",
        id: "Buy",
        name: "radio",
        value: "buyordersdata",
        defaultChecked: true,
        onClick: this.handleOrderTypeToogle
      }), "Buy"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
        type: "radio",
        id: "Sell",
        name: "radio",
        value: "sellordersdata",
        onClick: this.handleOrderTypeToogle
      }), "Sell")), /*#__PURE__*/React.createElement(_OrderTable__WEBPACK_IMPORTED_MODULE_2__["default"], {
        order_type: this.state.orderstype,
        orders: this.state.orders,
        buttons: "my",
        handleClick: this.handleClick
      }), /*#__PURE__*/React.createElement(_PageSelector__WEBPACK_IMPORTED_MODULE_1__["default"], {
        number_of_pages: this.state.number_of_pages,
        page: this.state.page,
        on_off_limit_previous: this.state.on_off_limit_previous,
        on_off_limit_next: this.state.on_off_limit_next,
        previousPage: this.state.previousPage,
        nextPage: this.state.nextPage,
        controls: this.controls
      }));
    }
  }]);

  return MyOrders;
}(React.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyOrders);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/orders-functionalities/styles/MyOrders.css":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/orders-functionalities/styles/MyOrders.css ***!
  \**********************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "div.wrapper2 tr {\n  display: grid;\n  grid-template-rows: repeat(6,1fr);\n  grid-template-columns: repeat(2,1fr);\n  grid-template-areas : \n  \"one two\"\n  \"three three\" \n  \"four five\"\n  \"six seven\"\n  \"eight eight\"\n  \"nine ten\";\n}\n\n\ntable.bordered-table {\n  border: 1px solid green;\n  width: 100%;\n  \n}\n\n\ndiv.wrapper2 {\n  height: 80vh;\n  overflow: scroll;\n  border: 1px black solid;\n  position: absolute;\n  top: 10%;\n  bottom: 10%;\n  left: 3%;\n  right: 3%;\n}\n\ntr > td#button1 {\n  grid-area: nine;\n}\n\ntr > td#button2 {\n  grid-area: ten;\n}", "",{"version":3,"sources":["webpack://./src/orders-functionalities/styles/MyOrders.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,iCAAiC;EACjC,oCAAoC;EACpC;;;;;;YAMU;AACZ;;;AAGA;EACE,uBAAuB;EACvB,WAAW;;AAEb;;;AAGA;EACE,YAAY;EACZ,gBAAgB;EAChB,uBAAuB;EACvB,kBAAkB;EAClB,QAAQ;EACR,WAAW;EACX,QAAQ;EACR,SAAS;AACX;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,cAAc;AAChB","sourcesContent":["div.wrapper2 tr {\n  display: grid;\n  grid-template-rows: repeat(6,1fr);\n  grid-template-columns: repeat(2,1fr);\n  grid-template-areas : \n  \"one two\"\n  \"three three\" \n  \"four five\"\n  \"six seven\"\n  \"eight eight\"\n  \"nine ten\";\n}\n\n\ntable.bordered-table {\n  border: 1px solid green;\n  width: 100%;\n  \n}\n\n\ndiv.wrapper2 {\n  height: 80vh;\n  overflow: scroll;\n  border: 1px black solid;\n  position: absolute;\n  top: 10%;\n  bottom: 10%;\n  left: 3%;\n  right: 3%;\n}\n\ntr > td#button1 {\n  grid-area: nine;\n}\n\ntr > td#button2 {\n  grid-area: ten;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/orders-functionalities/styles/MyOrders.css":
/*!********************************************************!*\
  !*** ./src/orders-functionalities/styles/MyOrders.css ***!
  \********************************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_MyOrders_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./MyOrders.css */ "./node_modules/css-loader/dist/cjs.js!./src/orders-functionalities/styles/MyOrders.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_MyOrders_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_MyOrders_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_MyOrders_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_MyOrders_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX29yZGVycy1mdW5jdGlvbmFsaXRpZXNfTXlPcmRlcnNfanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztJQUVNRTs7Ozs7QUFDSixzQkFBYTtBQUFBOztBQUFBOztBQUNYO0FBQ0EsVUFBS0MsS0FBTCxHQUFhO0FBQ1hDLE1BQUFBLE1BQU0sRUFBRSxFQURHO0FBRVhDLE1BQUFBLFVBQVUsRUFBRSxlQUZEO0FBR1hDLE1BQUFBLE1BQU0sRUFBRSxFQUhHO0FBSVhDLE1BQUFBLElBQUksRUFBRSxDQUpLO0FBS1hDLE1BQUFBLEtBQUssRUFBRSxDQUxJO0FBS0Q7QUFDVkMsTUFBQUEsUUFBUSxFQUFFLENBTkM7QUFPWEMsTUFBQUEsWUFBWSxFQUFFQyxTQVBIO0FBUVhDLE1BQUFBLGlCQUFpQixFQUFFLEtBUlI7QUFTWEMsTUFBQUEscUJBQXFCLEVBQUUsSUFUWjtBQVVYQyxNQUFBQSxlQUFlLEVBQUUsQ0FWTjtBQVdYQyxNQUFBQSxnQkFBZ0IsRUFBRUo7QUFYUCxLQUFiO0FBYUEsVUFBS0sscUJBQUwsR0FBNkIsTUFBS0EscUJBQUwsQ0FBMkJDLElBQTNCLCtCQUE3QjtBQUNBLFVBQUtDLFlBQUwsR0FBb0IsTUFBS0EsWUFBTCxDQUFrQkQsSUFBbEIsK0JBQXBCO0FBQ0EsVUFBS0UsUUFBTCxHQUFnQixNQUFLQSxRQUFMLENBQWNGLElBQWQsK0JBQWhCO0FBQ0EsVUFBS0csV0FBTCxHQUFtQixNQUFLQSxXQUFMLENBQWlCSCxJQUFqQiwrQkFBbkI7QUFsQlc7QUFtQlo7Ozs7V0FFRCxxQkFBWUksU0FBWixFQUF1QkMsT0FBdkIsRUFBZ0NDLENBQWhDLEVBQWtDO0FBQUE7O0FBQ2hDO0FBRUFDLE1BQUFBLEtBQUssV0FBSUMsdUJBQUoseUJBQTBDO0FBQzdDRyxRQUFBQSxNQUFNLEVBQUUsUUFEcUM7QUFFN0NDLFFBQUFBLE9BQU8sRUFBRTtBQUNQLDBCQUFnQixrQkFEVDtBQUVQLG9CQUFVO0FBRkgsU0FGb0M7QUFNN0NDLFFBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDbkJDLFVBQUFBLFNBQVMsRUFBRVosU0FEUTtBQUVuQmEsVUFBQUEsT0FBTyxFQUFFWjtBQUZVLFNBQWY7QUFOdUMsT0FBMUMsQ0FBTCxDQVdDYSxJQVhELENBV00sVUFBQUMsUUFBUTtBQUFBLGVBQUlBLFFBQVEsQ0FBQ0MsSUFBVCxFQUFKO0FBQUEsT0FYZCxFQVlDRixJQVpELENBWU0sVUFBQUcsUUFBUSxFQUFJO0FBQ2hCO0FBQ0EsWUFBSUMscUJBQXFCLEdBQUdDLFFBQVEsQ0FBQ0Msb0JBQVQsQ0FBOEIsSUFBOUIsQ0FBNUIsQ0FGZ0IsQ0FHaEI7QUFFQTs7QUFDQSxZQUFHLE1BQUksQ0FBQ3RDLEtBQUwsQ0FBV1MsaUJBQVgsSUFBZ0MyQixxQkFBcUIsQ0FBQ0csTUFBdEIsS0FBaUMsQ0FBakUsSUFBc0UsTUFBSSxDQUFDdkMsS0FBTCxDQUFXVyxlQUFYLElBQThCLENBQXZHLEVBQXlHO0FBQ3ZHO0FBQ0EsZ0JBQUksQ0FBQ0ksWUFBTCxDQUFrQm9CLFFBQVEsQ0FBQ0ssb0JBQTNCLEVBQWlELElBQWpEO0FBQ0QsU0FIRCxNQUdPO0FBQ0w7QUFDQSxnQkFBSSxDQUFDekIsWUFBTCxDQUFrQm9CLFFBQVEsQ0FBQ0ssb0JBQTNCO0FBQ0QsU0FaZSxDQWFoQjtBQUNBO0FBQ0E7O0FBQ0QsT0E1QkQ7QUE2QkQ7OztXQUVELHNCQUFhQyxLQUFiLEVBQW9DO0FBQUE7O0FBQUEsVUFBaEJDLE9BQWdCLHVFQUFOLEtBQU07O0FBQ2xDO0FBQ0E7QUFDQUMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlGLE9BQVo7O0FBRUEsVUFBRyxDQUFDQSxPQUFKLEVBQVk7QUFDVkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWjtBQUNBLGFBQUtDLFFBQUwsQ0FBYztBQUNaM0MsVUFBQUEsVUFBVSxFQUFFdUMsS0FEQTtBQUVackMsVUFBQUEsSUFBSSxFQUFFLEtBQUtKLEtBQUwsQ0FBV0k7QUFGTCxTQUFkLEVBR0csWUFBTTtBQUNQLGdCQUFJLENBQUMwQyxRQUFMLENBQWMsTUFBSSxDQUFDOUMsS0FBTCxDQUFXRSxVQUF6QjtBQUNELFNBTEQ7QUFNRCxPQVJELE1BUU87QUFDTHlDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVo7QUFDQSxhQUFLQyxRQUFMLENBQWM7QUFDWjNDLFVBQUFBLFVBQVUsRUFBRXVDLEtBREE7QUFFWnJDLFVBQUFBLElBQUksRUFBRSxLQUFLSixLQUFMLENBQVdJLElBQVgsR0FBZ0I7QUFGVixTQUFkLEVBR0csWUFBTTtBQUNQLGdCQUFJLENBQUMwQyxRQUFMLENBQWMsTUFBSSxDQUFDOUMsS0FBTCxDQUFXRSxVQUF6QjtBQUNELFNBTEQ7QUFNRDtBQUNGOzs7V0FFRCxrQkFBUzZDLEtBQVQsRUFBZ0I7QUFBQTs7QUFDZCxXQUFLRixRQUFMLENBQWM7QUFDWnpDLFFBQUFBLElBQUksRUFBRTJDO0FBRE0sT0FBZCxFQUVHLFlBQU07QUFDUDtBQUNBLGNBQUksQ0FBQ0QsUUFBTCxDQUFjLE1BQUksQ0FBQzlDLEtBQUwsQ0FBV0UsVUFBekI7QUFDRCxPQUxEO0FBTUQ7OztXQUVELDZCQUFtQjtBQUNqQjtBQUNBLFdBQUs0QyxRQUFMLENBQWMsS0FBSzlDLEtBQUwsQ0FBV0UsVUFBekI7QUFDRDs7Ozs4RUFFRCxpQkFBZThDLFdBQWY7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdNQyxnQkFBQUEsT0FUUixHQVNrQlosUUFBUSxDQUFDYSxjQUFULENBQXdCLFFBQXhCLEVBQWtDQyxTQVRwRCxFQVVFOztBQVZGO0FBQUEsdUJBWTBCOUIsS0FBSyxXQUFJQyx1QkFBSiwrQkFBeUMwQixXQUF6QyxjQUF3REMsT0FBeEQsbUJBQXdFLEtBQUtqRCxLQUFMLENBQVdJLElBQW5GLG9CQUFpRyxLQUFLSixLQUFMLENBQVdLLEtBQTVHLEVBWi9COztBQUFBO0FBWVErQyxnQkFBQUEsU0FaUjtBQUFBO0FBQUEsdUJBbUIwQkEsU0FBUyxDQUFDbEIsSUFBVixFQW5CMUI7O0FBQUE7QUFtQlFtQixnQkFBQUEsU0FuQlI7QUFxQkUscUJBQUtSLFFBQUwsQ0FBYztBQUNaNUMsa0JBQUFBLE1BQU0sRUFBRWdELE9BREk7QUFFWjlDLGtCQUFBQSxNQUFNLEVBQUVrRCxTQUFTLENBQUNDLElBQVYsQ0FBZUMsTUFGWDtBQUdaakQsa0JBQUFBLFFBQVEsRUFBRStDLFNBQVMsQ0FBQ0MsSUFBVixDQUFlRSxJQUhiO0FBSVpqRCxrQkFBQUEsWUFBWSxFQUFFOEMsU0FBUyxDQUFDQyxJQUFWLENBQWVHLFFBSmpCO0FBS1o5QyxrQkFBQUEsZUFBZSxFQUFFMEMsU0FBUyxDQUFDQyxJQUFWLENBQWUzQyxlQUFmLENBQStCK0M7QUFMcEMsaUJBQWQsRUFNRyxZQUFNO0FBQ1A7QUFDQSxzQkFBRyxNQUFJLENBQUMxRCxLQUFMLENBQVdNLFFBQVgsSUFBcUJFLFNBQXhCLEVBQWtDO0FBQ2hDLDBCQUFJLENBQUNxQyxRQUFMLENBQWM7QUFDWnBDLHNCQUFBQSxpQkFBaUIsRUFBRTtBQURQLHFCQUFkO0FBR0QsbUJBSkQsTUFJTztBQUNMLDBCQUFJLENBQUNvQyxRQUFMLENBQWM7QUFDWnBDLHNCQUFBQSxpQkFBaUIsRUFBRTtBQURQLHFCQUFkO0FBR0Q7O0FBQ0Qsc0JBQUcsTUFBSSxDQUFDVCxLQUFMLENBQVdPLFlBQVgsSUFBeUJDLFNBQTVCLEVBQXNDO0FBQ3BDLDBCQUFJLENBQUNxQyxRQUFMLENBQWM7QUFDWm5DLHNCQUFBQSxxQkFBcUIsRUFBRTtBQURYLHFCQUFkO0FBR0QsbUJBSkQsTUFJTztBQUNMLDBCQUFJLENBQUNtQyxRQUFMLENBQWM7QUFDWm5DLHNCQUFBQSxxQkFBcUIsRUFBRTtBQURYLHFCQUFkO0FBR0QsbUJBbkJNLENBb0JQO0FBQ0E7O0FBQ0QsaUJBNUJEOztBQXJCRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7OztXQW9EQSwrQkFBc0JVLENBQXRCLEVBQXdCO0FBQUE7O0FBQ3RCO0FBQ0E7QUFDQSxXQUFLeUIsUUFBTCxDQUFjO0FBQ1ozQyxRQUFBQSxVQUFVLEVBQUVrQixDQUFDLENBQUN1QyxNQUFGLENBQVNsQixLQURUO0FBRVpyQyxRQUFBQSxJQUFJLEVBQUU7QUFGTSxPQUFkLEVBR0csWUFBTTtBQUNQLGNBQUksQ0FBQzBDLFFBQUwsQ0FBYyxNQUFJLENBQUM5QyxLQUFMLENBQVdFLFVBQXpCLEVBRE8sQ0FFUDs7QUFDRCxPQU5EO0FBT0Q7OztXQUVELGtCQUFTO0FBQ1B5QyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxlQUFaLEVBQTZCLEtBQUs1QyxLQUFMLENBQVdFLFVBQXhDO0FBQ0EsMEJBQ0U7QUFBSyxpQkFBUyxFQUFDO0FBQWYsc0JBQ0U7QUFBTSxZQUFJLEVBQUM7QUFBWCxzQkFDRSxnREFBTztBQUFPLFlBQUksRUFBQyxPQUFaO0FBQW9CLFVBQUUsRUFBQyxLQUF2QjtBQUE2QixZQUFJLEVBQUMsT0FBbEM7QUFBMEMsYUFBSyxFQUFDLGVBQWhEO0FBQWdFLHNCQUFjLE1BQTlFO0FBQStFLGVBQU8sRUFBRSxLQUFLVztBQUE3RixRQUFQLFFBREYsZUFFRSxnREFBTztBQUFPLFlBQUksRUFBQyxPQUFaO0FBQW9CLFVBQUUsRUFBQyxNQUF2QjtBQUE4QixZQUFJLEVBQUMsT0FBbkM7QUFBMkMsYUFBSyxFQUFDLGdCQUFqRDtBQUFrRSxlQUFPLEVBQUUsS0FBS0E7QUFBaEYsUUFBUCxTQUZGLENBREYsZUFNRSxvQkFBQyxtREFBRDtBQUNBLGtCQUFVLEVBQUUsS0FBS2IsS0FBTCxDQUFXRSxVQUR2QjtBQUVBLGNBQU0sRUFBRSxLQUFLRixLQUFMLENBQVdHLE1BRm5CO0FBR0EsZUFBTyxFQUFDLElBSFI7QUFJQSxtQkFBVyxFQUFFLEtBQUtjO0FBSmxCLFFBTkYsZUFhRSxvQkFBQyxxREFBRDtBQUNBLHVCQUFlLEVBQUUsS0FBS2pCLEtBQUwsQ0FBV1csZUFENUI7QUFFQSxZQUFJLEVBQUUsS0FBS1gsS0FBTCxDQUFXSSxJQUZqQjtBQUdBLDZCQUFxQixFQUFFLEtBQUtKLEtBQUwsQ0FBV1UscUJBSGxDO0FBSUEseUJBQWlCLEVBQUUsS0FBS1YsS0FBTCxDQUFXUyxpQkFKOUI7QUFLQSxvQkFBWSxFQUFFLEtBQUtULEtBQUwsQ0FBV08sWUFMekI7QUFNQSxnQkFBUSxFQUFFLEtBQUtQLEtBQUwsQ0FBV00sUUFOckI7QUFPQSxnQkFBUSxFQUFFLEtBQUtVO0FBUGYsUUFiRixDQURGO0FBd0JEOzs7O0VBeExvQjRDLEtBQUssQ0FBQ0M7O0FBMkw3QixpRUFBZTlELFFBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hNQTtBQUNnSDtBQUNqQjtBQUMvRiw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0EsMkRBQTJELGtCQUFrQixzQ0FBc0MseUNBQXlDLG1JQUFtSSxHQUFHLDRCQUE0Qiw0QkFBNEIsZ0JBQWdCLE9BQU8sb0JBQW9CLGlCQUFpQixxQkFBcUIsNEJBQTRCLHVCQUF1QixhQUFhLGdCQUFnQixhQUFhLGNBQWMsR0FBRyxxQkFBcUIsb0JBQW9CLEdBQUcscUJBQXFCLG1CQUFtQixHQUFHLE9BQU8saUhBQWlILFVBQVUsWUFBWSxhQUFhLFdBQVcsS0FBSyxPQUFPLEtBQUssWUFBWSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsMkNBQTJDLGtCQUFrQixzQ0FBc0MseUNBQXlDLG1JQUFtSSxHQUFHLDRCQUE0Qiw0QkFBNEIsZ0JBQWdCLE9BQU8sb0JBQW9CLGlCQUFpQixxQkFBcUIsNEJBQTRCLHVCQUF1QixhQUFhLGdCQUFnQixhQUFhLGNBQWMsR0FBRyxxQkFBcUIsb0JBQW9CLEdBQUcscUJBQXFCLG1CQUFtQixHQUFHLG1CQUFtQjtBQUNsa0Q7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOdkMsTUFBcUc7QUFDckcsTUFBMkY7QUFDM0YsTUFBa0c7QUFDbEcsTUFBcUg7QUFDckgsTUFBOEc7QUFDOUcsTUFBOEc7QUFDOUcsTUFBNEc7QUFDNUc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyx5RkFBTzs7OztBQUlzRDtBQUM5RSxPQUFPLGlFQUFlLHlGQUFPLElBQUksZ0dBQWMsR0FBRyxnR0FBYyxZQUFZLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cnlwdG8vLi9zcmMvb3JkZXJzLWZ1bmN0aW9uYWxpdGllcy9NeU9yZGVycy5qc3giLCJ3ZWJwYWNrOi8vdHJ5cHRvLy4vc3JjL29yZGVycy1mdW5jdGlvbmFsaXRpZXMvc3R5bGVzL015T3JkZXJzLmNzcyIsIndlYnBhY2s6Ly90cnlwdG8vLi9zcmMvb3JkZXJzLWZ1bmN0aW9uYWxpdGllcy9zdHlsZXMvTXlPcmRlcnMuY3NzPzhlNjAiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9zdHlsZXMvTXlPcmRlcnMuY3NzJ1xuaW1wb3J0IFBhZ2VTZWxlY3RvciBmcm9tICcuL1BhZ2VTZWxlY3Rvcic7XG5pbXBvcnQgT3JkZXJUYWJsZSBmcm9tICcuL09yZGVyVGFibGUnO1xuXG5jbGFzcyBNeU9yZGVycyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB1c2VySWQ6ICcnLFxuICAgICAgb3JkZXJzdHlwZTogJ2J1eW9yZGVyc2RhdGEnLFxuICAgICAgb3JkZXJzOiBbXSxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBsaW1pdDogMywgLy9MaW1pdCBwZXIgcGFnZSBkZWZpbmVkIGhlcmUhXG4gICAgICBuZXh0UGFnZTogMixcbiAgICAgIHByZXZpb3VzUGFnZTogdW5kZWZpbmVkLFxuICAgICAgb25fb2ZmX2xpbWl0X25leHQ6IGZhbHNlLFxuICAgICAgb25fb2ZmX2xpbWl0X3ByZXZpb3VzOiB0cnVlLFxuICAgICAgbnVtYmVyX29mX3BhZ2VzOiAxLFxuICAgICAgb3JkZXJJRF90b1RvZ2dsZTogdW5kZWZpbmVkLFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZU9yZGVyVHlwZVRvb2dsZSA9IHRoaXMuaGFuZGxlT3JkZXJUeXBlVG9vZ2xlLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZURlbGV0ZSA9IHRoaXMuaGFuZGxlRGVsZXRlLmJpbmQodGhpcylcbiAgICB0aGlzLmNvbnRyb2xzID0gdGhpcy5jb250cm9scy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLmhhbmRsZUNsaWNrLmJpbmQodGhpcylcbiAgfVxuXG4gIGhhbmRsZUNsaWNrKHZhbHVldHlwZSwgdmFsdWVpZCwgZSl7XG4gICAgLy8gY29uc29sZS5sb2coXCJoYW5kbGVDbGljazogXCIsIHZhbHVldHlwZSwgdmFsdWVpZClcblxuICAgIGZldGNoKGAke3Byb2Nlc3MuZW52LlJPT1R9L2RlbGV0ZS10aGlzLW9yZGVyYCwge1xuICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgT3JkZXJUeXBlOiB2YWx1ZXR5cGUsXG4gICAgICAgIE9yZGVySUQ6IHZhbHVlaWRcbiAgICAgIH0pXG4gICAgfSlcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgLnRoZW4oT0JKc2Vydl8gPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coT0JKc2Vydl8pXG4gICAgICBsZXQgZWxlbWVudHNfbGVmdF9pbl9wYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0clwiKVxuICAgICAgLy8gY29uc29sZS5sb2coXCJDb25kaXRpb25zXCIsIHRoaXMuc3RhdGUub25fb2ZmX2xpbWl0X25leHQsIGVsZW1lbnRzX2xlZnRfaW5fcGFnZS5sZW5ndGggPT09IDEsIHRoaXMuc3RhdGUubnVtYmVyX29mX3BhZ2VzICE9IDEpXG5cbiAgICAgIC8vdHJ1ZSwgdHJ1ZSwgdHJ1ZVxuICAgICAgaWYodGhpcy5zdGF0ZS5vbl9vZmZfbGltaXRfbmV4dCAmJiBlbGVtZW50c19sZWZ0X2luX3BhZ2UubGVuZ3RoID09PSAxICYmIHRoaXMuc3RhdGUubnVtYmVyX29mX3BhZ2VzICE9IDEpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIjFcIilcbiAgICAgICAgdGhpcy5oYW5kbGVEZWxldGUoT0JKc2Vydl8ubWVtb3JpemVkX29yZGVyX3R5cGUsIHRydWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIjJcIilcbiAgICAgICAgdGhpcy5oYW5kbGVEZWxldGUoT0JKc2Vydl8ubWVtb3JpemVkX29yZGVyX3R5cGUpXG4gICAgICB9XG4gICAgICAvLyBjb25zb2xlLmxvZyhcImVsZW1lbnRzX2xlZnRfaW5fcGFnZTogXCIsICBlbGVtZW50c19sZWZ0X2luX3BhZ2UsIGVsZW1lbnRzX2xlZnRfaW5fcGFnZS5sZW5ndGgpXG4gICAgICAvLyBjb25zb2xlLmxvZyhcImJvdW5kczogXCIsICB0aGlzLnByb3BzLm9uX29mZl9saW1pdF9wcmV2aW91cywgdGhpcy5wcm9wcy5vbl9vZmZfbGltaXRfbmV4dClcbiAgICAgIC8vIGNvbnNvbGUubG9nKE9CSnNlcnZfLm1lbW9yaXplZF9vcmRlcl90eXBlKVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVEZWxldGUodmFsdWUsIF9zaWduYWwgPSBmYWxzZSl7XG4gICAgLy9lLnByZXZlbnREZWZhdWx0KClcbiAgICAvL2NvbnNvbGUubG9nKGUudGFyZ2V0LnZhbHVlKTtcbiAgICBjb25zb2xlLmxvZyhfc2lnbmFsKTtcblxuICAgIGlmKCFfc2lnbmFsKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiSEVSUlJFMSEhIVwiKVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG9yZGVyc3R5cGU6IHZhbHVlLFxuICAgICAgICBwYWdlOiB0aGlzLnN0YXRlLnBhZ2UsXG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZERhdGEodGhpcy5zdGF0ZS5vcmRlcnN0eXBlKTtcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiSEVSUlJFMiEhIVwiKVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIG9yZGVyc3R5cGU6IHZhbHVlLFxuICAgICAgICBwYWdlOiB0aGlzLnN0YXRlLnBhZ2UtMSxcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnN0YXRlLm9yZGVyc3R5cGUpO1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBjb250cm9scyhfcGFnZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcGFnZTogX3BhZ2VcbiAgICB9LCAoKSA9PiB7XG4gICAgICAvL2NvbnNvbGUubG9nKFwiY2FsbGJhY2s6IFwiLCB0aGlzLnN0YXRlLnBhZ2UpXG4gICAgICB0aGlzLmxvYWREYXRhKHRoaXMuc3RhdGUub3JkZXJzdHlwZSlcbiAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAvL0RPTSBpcyByZWFkeVxuICAgIHRoaXMubG9hZERhdGEodGhpcy5zdGF0ZS5vcmRlcnN0eXBlKVxuICB9XG5cbiAgYXN5bmMgbG9hZERhdGEoX29yZGVyc3R5cGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhfb3JkZXJzdHlwZSlcbiAgICAvLyBsZXQgX3VzZXJJRCA9ICcnXG4gICAgLy8gY29uc29sZS5sb2coYCR7cHJvY2Vzcy5lbnYuUk9PVH0vY3VycmVudC11c2VyLUlEYClcbiAgICAvLyBjb25zdCByZXNwb25zZTEgPSBhd2FpdCBmZXRjaChgJHtwcm9jZXNzLmVudi5ST09UfS9jdXJyZW50LXVzZXItSURgKSAgICBcbiAgICAvLyBjb25zdCBzcnZfID0gYXdhaXQgcmVzcG9uc2UxLmpzb24oKVxuICAgIC8vIF91c2VySUQgPSBzcnZfLnNydl91c3JfSURcblxuXG4gICAgY29uc3QgX3VzZXJJRCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcklkXCIpLmlubmVySFRNTFxuICAgIC8vIGNvbnNvbGUubG9nKFwiZGlkIGl0IHdvcms/Pz8/XCIsIF91c2VySUQsIHR5cGVvZiBfdXNlcklEKVxuXG4gICAgY29uc3QgcmVzcG9uc2UyID0gYXdhaXQgZmV0Y2goYCR7cHJvY2Vzcy5lbnYuUk9PVH0vcGFnaW5hdGVkLW9yZGVycy8ke19vcmRlcnN0eXBlfS8ke191c2VySUR9P3BhZ2U9JHt0aGlzLnN0YXRlLnBhZ2V9JmxpbWl0PSR7dGhpcy5zdGF0ZS5saW1pdH1gKVxuICAgIC8vT1JcbiAgICAvLyAudGhlbihyZXNwb25zZTIgPT4gcmVzcG9uc2UyLmpzb24oKSlcbiAgICAvLyAudGhlbigoZGF0YSkgPT4ge1xuICAgIC8vICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAvLyB9KTtcbiAgICBcbiAgICBjb25zdCBzZXJ2ZXJPQkogPSBhd2FpdCByZXNwb25zZTIuanNvbigpXG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHVzZXJJZDogX3VzZXJJRCxcbiAgICAgIG9yZGVyczogc2VydmVyT0JKLnNydl8uT1JERVJTLFxuICAgICAgbmV4dFBhZ2U6IHNlcnZlck9CSi5zcnZfLm5leHQsXG4gICAgICBwcmV2aW91c1BhZ2U6IHNlcnZlck9CSi5zcnZfLnByZXZpb3VzLFxuICAgICAgbnVtYmVyX29mX3BhZ2VzOiBzZXJ2ZXJPQkouc3J2Xy5udW1iZXJfb2ZfcGFnZXMubnVtYmVyXG4gICAgfSwgKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJwYWdlOiBcIiwgdGhpcy5zdGF0ZS5wcmV2aW91c1BhZ2UsIHRoaXMuc3RhdGUubmV4dFBhZ2UpXG4gICAgICBpZih0aGlzLnN0YXRlLm5leHRQYWdlPT11bmRlZmluZWQpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBvbl9vZmZfbGltaXRfbmV4dDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgb25fb2ZmX2xpbWl0X25leHQ6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpZih0aGlzLnN0YXRlLnByZXZpb3VzUGFnZT09dW5kZWZpbmVkKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgb25fb2ZmX2xpbWl0X3ByZXZpb3VzOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBvbl9vZmZfbGltaXRfcHJldmlvdXM6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICAvLyBsZXQgcmVtYWluZGVyID0gdGhpcy5zdGF0ZS5vcmRlcnMubGVuZ3RoJXRoaXMuc3RhdGUubGltaXRcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVtYWluZGVyXCIscmVtYWluZGVyKVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVPcmRlclR5cGVUb29nbGUoZSl7XG4gICAgLy9lLnByZXZlbnREZWZhdWx0KClcbiAgICAvL2NvbnNvbGUubG9nKGUudGFyZ2V0LnZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG9yZGVyc3R5cGU6IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgcGFnZTogMSxcbiAgICB9LCAoKSA9PiB7XG4gICAgICB0aGlzLmxvYWREYXRhKHRoaXMuc3RhdGUub3JkZXJzdHlwZSk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcIk9yZGVydHlwZSBvbjogXCIsIHRoaXMuc3RhdGUub3JkZXJzdHlwZSlcbiAgICB9KVxuICB9XG4gIFxuICByZW5kZXIoKSB7XG4gICAgY29uc29sZS5sb2coXCJvcmRlcnR5cGUhISEgXCIsIHRoaXMuc3RhdGUub3JkZXJzdHlwZSlcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3dyYXBwZXIyJz5cbiAgICAgICAgPGZvcm0gbmFtZT1cInRvb2dsZVwiPlxuICAgICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJCdXlcIiBuYW1lPVwicmFkaW9cIiB2YWx1ZT0nYnV5b3JkZXJzZGF0YScgZGVmYXVsdENoZWNrZWQgb25DbGljaz17dGhpcy5oYW5kbGVPcmRlclR5cGVUb29nbGV9Lz5CdXk8L2xhYmVsPlxuICAgICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJTZWxsXCIgbmFtZT1cInJhZGlvXCIgdmFsdWU9J3NlbGxvcmRlcnNkYXRhJyBvbkNsaWNrPXt0aGlzLmhhbmRsZU9yZGVyVHlwZVRvb2dsZX0vPlNlbGw8L2xhYmVsPiAgXG4gICAgICAgIDwvZm9ybT5cblxuICAgICAgICA8T3JkZXJUYWJsZSBcbiAgICAgICAgb3JkZXJfdHlwZT17dGhpcy5zdGF0ZS5vcmRlcnN0eXBlfSBcbiAgICAgICAgb3JkZXJzPXt0aGlzLnN0YXRlLm9yZGVyc31cbiAgICAgICAgYnV0dG9ucz0nbXknXG4gICAgICAgIGhhbmRsZUNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICAvPlxuICAgICAgICBcbiAgICAgICAgPFBhZ2VTZWxlY3RvciBcbiAgICAgICAgbnVtYmVyX29mX3BhZ2VzPXt0aGlzLnN0YXRlLm51bWJlcl9vZl9wYWdlc30gXG4gICAgICAgIHBhZ2U9e3RoaXMuc3RhdGUucGFnZX0gXG4gICAgICAgIG9uX29mZl9saW1pdF9wcmV2aW91cz17dGhpcy5zdGF0ZS5vbl9vZmZfbGltaXRfcHJldmlvdXN9IFxuICAgICAgICBvbl9vZmZfbGltaXRfbmV4dD17dGhpcy5zdGF0ZS5vbl9vZmZfbGltaXRfbmV4dH0gXG4gICAgICAgIHByZXZpb3VzUGFnZT17dGhpcy5zdGF0ZS5wcmV2aW91c1BhZ2V9IFxuICAgICAgICBuZXh0UGFnZT17dGhpcy5zdGF0ZS5uZXh0UGFnZX0gXG4gICAgICAgIGNvbnRyb2xzPXt0aGlzLmNvbnRyb2xzfS8+IFxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNeU9yZGVycyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiZGl2LndyYXBwZXIyIHRyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg2LDFmcik7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLDFmcik7XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzIDogXFxuICBcXFwib25lIHR3b1xcXCJcXG4gIFxcXCJ0aHJlZSB0aHJlZVxcXCIgXFxuICBcXFwiZm91ciBmaXZlXFxcIlxcbiAgXFxcInNpeCBzZXZlblxcXCJcXG4gIFxcXCJlaWdodCBlaWdodFxcXCJcXG4gIFxcXCJuaW5lIHRlblxcXCI7XFxufVxcblxcblxcbnRhYmxlLmJvcmRlcmVkLXRhYmxlIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZWVuO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBcXG59XFxuXFxuXFxuZGl2LndyYXBwZXIyIHtcXG4gIGhlaWdodDogODB2aDtcXG4gIG92ZXJmbG93OiBzY3JvbGw7XFxuICBib3JkZXI6IDFweCBibGFjayBzb2xpZDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMTAlO1xcbiAgYm90dG9tOiAxMCU7XFxuICBsZWZ0OiAzJTtcXG4gIHJpZ2h0OiAzJTtcXG59XFxuXFxudHIgPiB0ZCNidXR0b24xIHtcXG4gIGdyaWQtYXJlYTogbmluZTtcXG59XFxuXFxudHIgPiB0ZCNidXR0b24yIHtcXG4gIGdyaWQtYXJlYTogdGVuO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvb3JkZXJzLWZ1bmN0aW9uYWxpdGllcy9zdHlsZXMvTXlPcmRlcnMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsYUFBYTtFQUNiLGlDQUFpQztFQUNqQyxvQ0FBb0M7RUFDcEM7Ozs7OztZQU1VO0FBQ1o7OztBQUdBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFdBQVc7O0FBRWI7OztBQUdBO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixXQUFXO0VBQ1gsUUFBUTtFQUNSLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImRpdi53cmFwcGVyMiB0ciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhcyA6IFxcbiAgXFxcIm9uZSB0d29cXFwiXFxuICBcXFwidGhyZWUgdGhyZWVcXFwiIFxcbiAgXFxcImZvdXIgZml2ZVxcXCJcXG4gIFxcXCJzaXggc2V2ZW5cXFwiXFxuICBcXFwiZWlnaHQgZWlnaHRcXFwiXFxuICBcXFwibmluZSB0ZW5cXFwiO1xcbn1cXG5cXG5cXG50YWJsZS5ib3JkZXJlZC10YWJsZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBncmVlbjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgXFxufVxcblxcblxcbmRpdi53cmFwcGVyMiB7XFxuICBoZWlnaHQ6IDgwdmg7XFxuICBvdmVyZmxvdzogc2Nyb2xsO1xcbiAgYm9yZGVyOiAxcHggYmxhY2sgc29saWQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDEwJTtcXG4gIGJvdHRvbTogMTAlO1xcbiAgbGVmdDogMyU7XFxuICByaWdodDogMyU7XFxufVxcblxcbnRyID4gdGQjYnV0dG9uMSB7XFxuICBncmlkLWFyZWE6IG5pbmU7XFxufVxcblxcbnRyID4gdGQjYnV0dG9uMiB7XFxuICBncmlkLWFyZWE6IHRlbjtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9NeU9yZGVycy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL015T3JkZXJzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiJdLCJuYW1lcyI6WyJQYWdlU2VsZWN0b3IiLCJPcmRlclRhYmxlIiwiTXlPcmRlcnMiLCJzdGF0ZSIsInVzZXJJZCIsIm9yZGVyc3R5cGUiLCJvcmRlcnMiLCJwYWdlIiwibGltaXQiLCJuZXh0UGFnZSIsInByZXZpb3VzUGFnZSIsInVuZGVmaW5lZCIsIm9uX29mZl9saW1pdF9uZXh0Iiwib25fb2ZmX2xpbWl0X3ByZXZpb3VzIiwibnVtYmVyX29mX3BhZ2VzIiwib3JkZXJJRF90b1RvZ2dsZSIsImhhbmRsZU9yZGVyVHlwZVRvb2dsZSIsImJpbmQiLCJoYW5kbGVEZWxldGUiLCJjb250cm9scyIsImhhbmRsZUNsaWNrIiwidmFsdWV0eXBlIiwidmFsdWVpZCIsImUiLCJmZXRjaCIsInByb2Nlc3MiLCJlbnYiLCJST09UIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiT3JkZXJUeXBlIiwiT3JkZXJJRCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJPQkpzZXJ2XyIsImVsZW1lbnRzX2xlZnRfaW5fcGFnZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsZW5ndGgiLCJtZW1vcml6ZWRfb3JkZXJfdHlwZSIsInZhbHVlIiwiX3NpZ25hbCIsImNvbnNvbGUiLCJsb2ciLCJzZXRTdGF0ZSIsImxvYWREYXRhIiwiX3BhZ2UiLCJfb3JkZXJzdHlwZSIsIl91c2VySUQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsInJlc3BvbnNlMiIsInNlcnZlck9CSiIsInNydl8iLCJPUkRFUlMiLCJuZXh0IiwicHJldmlvdXMiLCJudW1iZXIiLCJ0YXJnZXQiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJzb3VyY2VSb290IjoiIn0=