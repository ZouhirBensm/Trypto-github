"use strict";
(self["webpackChunktrypto"] = self["webpackChunktrypto"] || []).push([["src_orders-functionalities_Orders_jsx"],{

/***/ "./src/orders-functionalities/Orders.jsx":
/*!***********************************************!*\
  !*** ./src/orders-functionalities/Orders.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _styles_Orders_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/Orders.css */ "./src/orders-functionalities/styles/Orders.css");
/* harmony import */ var _PageSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageSelector */ "./src/orders-functionalities/PageSelector.jsx");
/* harmony import */ var _SearchEngine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchEngine */ "./src/orders-functionalities/SearchEngine.jsx");
/* harmony import */ var _OrderTable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OrderTable */ "./src/orders-functionalities/OrderTable.jsx");
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





var Orders = /*#__PURE__*/function (_React$Component) {
  _inherits(Orders, _React$Component);

  var _super = _createSuper(Orders);

  function Orders(props) {
    var _this;

    _classCallCheck(this, Orders);

    _this = _super.call(this, props);
    _this.state = {
      orders: [],
      page: 1,
      limit: 3,
      //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      crypto: undefined,
      searchTerm: '',
      number_of_pages: 1
    };
    _this.controls = _this.controls.bind(_assertThisInitialized(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.repairData = _this.repairData.bind(_assertThisInitialized(_this));
    console.log("constructor", _this.props.match.params.order_type);
    return _this;
  }

  _createClass(Orders, [{
    key: "repairData",
    value: function repairData(_objOrders) {
      var _repairedData = [];
      _repairedData = _objOrders.srv_.results;
      return _repairedData;
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      this.setState({
        crypto: this.state.searchTerm,
        page: 1
      }, function () {
        _this2.loadData();
      });

      if (this.state.searchTerm == "All") {
        this.setState({
          crypto: undefined
        }, function () {
          _this2.loadData();
        });
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      //console.log(e.target.value)
      this.setState({
        //orders: this.props.orders,
        searchTerm: e.target.value
      });
    }
  }, {
    key: "controls",
    value: function controls(_page) {
      var _this3 = this;

      this.setState({
        page: _page
      }, function () {
        //console.log("callback: ", this.state.page)
        _this3.loadData();
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
        var _this4 = this;

        var objOrders, response, serverOBJ;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                objOrders = {}; // console.log("LOAD: ", this.props.match.params.order_type)
                // console.log("LOAD: ", this.props.orders)

                _context.next = 3;
                return fetch("".concat("http://localhost:3000", "/paginated-orders/").concat(this.props.match.params.order_type, "?page=").concat(this.state.page, "&limit=").concat(this.state.limit).concat(this.state.crypto ? "&crypto=".concat(this.state.crypto) : ""));

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                serverOBJ = _context.sent;
                console.log("just added: ", serverOBJ); //console.log("Next: ", data.data.next)
                //console.log("Previous: ", data.data.previous)
                // .then(response => response.json())
                // .then(data => {
                //   objOrders = repairData(data)
                //   //console.log(objOrders.data[0].crypto)
                // });
                // console.log(data.data.number_of_pages.number)

                this.setState({
                  orders: serverOBJ.srv_.ORDERS,
                  nextPage: serverOBJ.srv_.next,
                  previousPage: serverOBJ.srv_.previous,
                  number_of_pages: serverOBJ.srv_.number_of_pages.number
                }, function () {
                  if (_this4.state.nextPage == undefined) {
                    _this4.setState({
                      on_off_limit_next: true
                    });
                  } else {
                    _this4.setState({
                      on_off_limit_next: false
                    });
                  }

                  if (_this4.state.previousPage == undefined) {
                    _this4.setState({
                      on_off_limit_previous: true
                    });
                  } else {
                    _this4.setState({
                      on_off_limit_previous: false
                    });
                  }
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
      // console.log(this.props)
      // console.log("HERE RENDER: ", this.state.orders)
      // console.log("here@@@", this.props.match.params.order_type)
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_SearchEngine__WEBPACK_IMPORTED_MODULE_2__["default"], {
        searchTerm: this.state.searchTerm,
        handleSubmit: this.handleSubmit,
        handleChange: this.handleChange
      }), /*#__PURE__*/React.createElement("div", {
        className: "wrapper"
      }, /*#__PURE__*/React.createElement(_OrderTable__WEBPACK_IMPORTED_MODULE_3__["default"], {
        buttons: "normal",
        order_type: this.props.match.params.order_type,
        orders: this.state.orders
      }), /*#__PURE__*/React.createElement(_PageSelector__WEBPACK_IMPORTED_MODULE_1__["default"], {
        number_of_pages: this.state.number_of_pages,
        page: this.state.page,
        on_off_limit_previous: this.state.on_off_limit_previous,
        on_off_limit_next: this.state.on_off_limit_next,
        previousPage: this.state.previousPage,
        nextPage: this.state.nextPage,
        controls: this.controls
      })));
    }
  }]);

  return Orders;
}(React.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Orders);

/***/ }),

/***/ "./src/orders-functionalities/SearchEngine.jsx":
/*!*****************************************************!*\
  !*** ./src/orders-functionalities/SearchEngine.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _styles_SearchEngine_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/SearchEngine.css */ "./src/orders-functionalities/styles/SearchEngine.css");
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


var SearchEngine = /*#__PURE__*/function (_React$Component) {
  _inherits(SearchEngine, _React$Component);

  var _super = _createSuper(SearchEngine);

  function SearchEngine() {
    var _this;

    _classCallCheck(this, SearchEngine);

    _this = _super.call(this);
    _this.state = {
      on_off: false
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SearchEngine, [{
    key: "handleClick",
    value: function handleClick(e) {
      this.setState(function (prevState) {
        return {
          on_off: !prevState.on_off
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, !this.state.on_off ? /*#__PURE__*/React.createElement("button", {
        className: "drop-down",
        onClick: this.handleClick
      }, "Drop Down") : /*#__PURE__*/React.createElement("div", {
        className: "search-inputs"
      }, /*#__PURE__*/React.createElement("form", {
        className: "search-component",
        onSubmit: this.props.handleSubmit
      }, /*#__PURE__*/React.createElement("label", null, "Select a crypto you want to filter for", /*#__PURE__*/React.createElement("select", {
        value: this.props.searchTerm,
        onChange: this.props.handleChange
      }, /*#__PURE__*/React.createElement("option", {
        value: "All"
      }, "All"), /*#__PURE__*/React.createElement("option", {
        value: "Bitcoin"
      }, "Bitcoin"), /*#__PURE__*/React.createElement("option", {
        value: "Ethereum"
      }, "Ethereum"), /*#__PURE__*/React.createElement("option", {
        value: "Litecoin"
      }, "Litecoin"), /*#__PURE__*/React.createElement("option", {
        value: "Zcash"
      }, "Zcash"), /*#__PURE__*/React.createElement("option", {
        value: "Bitcoin Cash"
      }, "Bitcoin Cash"), /*#__PURE__*/React.createElement("option", {
        value: "Monero"
      }, "Monero"))), /*#__PURE__*/React.createElement("input", {
        type: "submit",
        value: "Submit"
      })), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleClick
      }, "Drop Up")));
    }
  }]);

  return SearchEngine;
}(React.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchEngine);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/orders-functionalities/styles/Orders.css":
/*!********************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/orders-functionalities/styles/Orders.css ***!
  \********************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, "div.wrapper tr {\n  display: grid;\n  grid-template-rows: repeat(6,1fr);\n  grid-template-columns: repeat(2,1fr);\n  grid-template-areas : \n  \"one two\"\n  \"three three\" \n  \"four five\"\n  \"six seven\"\n  \"eight eight\"\n  \"nine nine\";\n}\ntr > td#id1 {\n  grid-area: one;\n}\ntr > td#email1 {\n  grid-area: two;\n}\ntr > td#posteddate1 {\n  grid-area: eight;\n}\ntr > td#crypto1 {\n  grid-area: three;\n}\ntr > td#amount1 {\n  grid-area: four;\n}\ntr > td#price1 {\n  grid-area: six;\n}\ntr > td#expiry1 {\n  grid-area: seven;\n  \n}\ntr > td#payment1 {\n  grid-area: five;\n}\ntr > td#deal1 {\n  grid-area: nine;\n}\n\n\n\n\ndiv.wrapper {\n  /* height: 80vh;\n  overflow: scroll;\n  border: 1px black solid;\n  position: absolute;\n  bottom: 10%;\n  top: 10%;\n  left: 3%;\n  right: 3%; */\n\n\n  height: 70vh;\n  width: 94vw;\n  overflow: scroll;\n  border: 1px red solid;\n  position: absolute;\n  bottom: 10%;\n  top: 20%;\n  left: 3%;\n  right: 3%;\n  \n}", "",{"version":3,"sources":["webpack://./src/orders-functionalities/styles/Orders.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,iCAAiC;EACjC,oCAAoC;EACpC;;;;;;aAMW;AACb;AACA;EACE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,gBAAgB;AAClB;AACA;EACE,eAAe;AACjB;AACA;EACE,cAAc;AAChB;AACA;EACE,gBAAgB;;AAElB;AACA;EACE,eAAe;AACjB;AACA;EACE,eAAe;AACjB;;;;;AAKA;EACE;;;;;;;cAOY;;;EAGZ,YAAY;EACZ,WAAW;EACX,gBAAgB;EAChB,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;EACX,QAAQ;EACR,QAAQ;EACR,SAAS;;AAEX","sourcesContent":["div.wrapper tr {\n  display: grid;\n  grid-template-rows: repeat(6,1fr);\n  grid-template-columns: repeat(2,1fr);\n  grid-template-areas : \n  \"one two\"\n  \"three three\" \n  \"four five\"\n  \"six seven\"\n  \"eight eight\"\n  \"nine nine\";\n}\ntr > td#id1 {\n  grid-area: one;\n}\ntr > td#email1 {\n  grid-area: two;\n}\ntr > td#posteddate1 {\n  grid-area: eight;\n}\ntr > td#crypto1 {\n  grid-area: three;\n}\ntr > td#amount1 {\n  grid-area: four;\n}\ntr > td#price1 {\n  grid-area: six;\n}\ntr > td#expiry1 {\n  grid-area: seven;\n  \n}\ntr > td#payment1 {\n  grid-area: five;\n}\ntr > td#deal1 {\n  grid-area: nine;\n}\n\n\n\n\ndiv.wrapper {\n  /* height: 80vh;\n  overflow: scroll;\n  border: 1px black solid;\n  position: absolute;\n  bottom: 10%;\n  top: 10%;\n  left: 3%;\n  right: 3%; */\n\n\n  height: 70vh;\n  width: 94vw;\n  overflow: scroll;\n  border: 1px red solid;\n  position: absolute;\n  bottom: 10%;\n  top: 20%;\n  left: 3%;\n  right: 3%;\n  \n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/orders-functionalities/styles/SearchEngine.css":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/orders-functionalities/styles/SearchEngine.css ***!
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
___CSS_LOADER_EXPORT___.push([module.id, "div#react-div > div > button.drop-down {\n  margin: 0 auto;\n  display: block;\n  position: absolute;\n  top: 7vh;\n  bottom: 83vh;\n  left: 0;\n  right: 0;\n  width: fit-content;\n  /* left: 30%;\n  right: 30%; */\n  /* min-width: fit-content; */\n} \n\ndiv#react-div > div > div.search-inputs {\n  background-color: red;\n  position: absolute;\n  top: 7vh;\n  bottom: 12vh;\n  z-index: 2;\n  width: 100%;\n} \n\n \n\ndiv#react-div,\ndiv#react-div > div {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n", "",{"version":3,"sources":["webpack://./src/orders-functionalities/styles/SearchEngine.css"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,cAAc;EACd,kBAAkB;EAClB,QAAQ;EACR,YAAY;EACZ,OAAO;EACP,QAAQ;EACR,kBAAkB;EAClB;eACa;EACb,4BAA4B;AAC9B;;AAEA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,QAAQ;EACR,YAAY;EACZ,UAAU;EACV,WAAW;AACb;;;;AAIA;;EAEE,WAAW;EACX,YAAY;EACZ,kBAAkB;AACpB","sourcesContent":["div#react-div > div > button.drop-down {\n  margin: 0 auto;\n  display: block;\n  position: absolute;\n  top: 7vh;\n  bottom: 83vh;\n  left: 0;\n  right: 0;\n  width: fit-content;\n  /* left: 30%;\n  right: 30%; */\n  /* min-width: fit-content; */\n} \n\ndiv#react-div > div > div.search-inputs {\n  background-color: red;\n  position: absolute;\n  top: 7vh;\n  bottom: 12vh;\n  z-index: 2;\n  width: 100%;\n} \n\n \n\ndiv#react-div,\ndiv#react-div > div {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/orders-functionalities/styles/Orders.css":
/*!******************************************************!*\
  !*** ./src/orders-functionalities/styles/Orders.css ***!
  \******************************************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_Orders_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./Orders.css */ "./node_modules/css-loader/dist/cjs.js!./src/orders-functionalities/styles/Orders.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_Orders_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_Orders_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_Orders_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_Orders_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/orders-functionalities/styles/SearchEngine.css":
/*!************************************************************!*\
  !*** ./src/orders-functionalities/styles/SearchEngine.css ***!
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_SearchEngine_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./SearchEngine.css */ "./node_modules/css-loader/dist/cjs.js!./src/orders-functionalities/styles/SearchEngine.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_SearchEngine_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_SearchEngine_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_SearchEngine_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_SearchEngine_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX29yZGVycy1mdW5jdGlvbmFsaXRpZXNfT3JkZXJzX2pzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7SUFFTUc7Ozs7O0FBQ0osa0JBQVlDLEtBQVosRUFBa0I7QUFBQTs7QUFBQTs7QUFDaEIsOEJBQU1BLEtBQU47QUFDQSxVQUFLQyxLQUFMLEdBQWE7QUFDWEMsTUFBQUEsTUFBTSxFQUFFLEVBREc7QUFFWEMsTUFBQUEsSUFBSSxFQUFFLENBRks7QUFHWEMsTUFBQUEsS0FBSyxFQUFFLENBSEk7QUFHRDtBQUNWQyxNQUFBQSxRQUFRLEVBQUUsQ0FKQztBQUtYQyxNQUFBQSxZQUFZLEVBQUVDLFNBTEg7QUFNWEMsTUFBQUEsaUJBQWlCLEVBQUUsS0FOUjtBQU9YQyxNQUFBQSxxQkFBcUIsRUFBRSxJQVBaO0FBUVhDLE1BQUFBLE1BQU0sRUFBRUgsU0FSRztBQVNYSSxNQUFBQSxVQUFVLEVBQUUsRUFURDtBQVVYQyxNQUFBQSxlQUFlLEVBQUU7QUFWTixLQUFiO0FBWUEsVUFBS0MsUUFBTCxHQUFnQixNQUFLQSxRQUFMLENBQWNDLElBQWQsK0JBQWhCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCRCxJQUFsQiwrQkFBcEI7QUFDQSxVQUFLRSxZQUFMLEdBQW9CLE1BQUtBLFlBQUwsQ0FBa0JGLElBQWxCLCtCQUFwQjtBQUNBLFVBQUtHLFVBQUwsR0FBa0IsTUFBS0EsVUFBTCxDQUFnQkgsSUFBaEIsK0JBQWxCO0FBRUFJLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGFBQVosRUFBMkIsTUFBS25CLEtBQUwsQ0FBV29CLEtBQVgsQ0FBaUJDLE1BQWpCLENBQXdCQyxVQUFuRDtBQW5CZ0I7QUFvQmpCOzs7O1dBRUQsb0JBQVdDLFVBQVgsRUFBc0I7QUFDcEIsVUFBSUMsYUFBYSxHQUFHLEVBQXBCO0FBQ0FBLE1BQUFBLGFB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RztBQUM5RyxNQUEwRztBQUMxRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHVGQUFPOzs7O0FBSW9EO0FBQzVFLE9BQU8saUVBQWUsdUZBQU8sSUFBSSw4RkFBYyxHQUFHLDhGQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QjdFLE1BQXFHO0FBQ3JHLE1BQTJGO0FBQzNGLE1BQWtHO0FBQ2xHLE1BQXFIO0FBQ3JILE1BQThHO0FBQzlHLE1BQThHO0FBQzlHLE1BQWdIO0FBQ2hIO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsNkZBQU87Ozs7QUFJMEQ7QUFDbEYsT0FBTyxpRUFBZSw2RkFBTyxJQUFJLG9HQUFjLEdBQUcsb0dBQWMsWUFBWSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJ5cHRvLy4vc3JjL29yZGVycy1mdW5jdGlvbmFsaXRpZXMvT3JkZXJzLmpzeCIsIndlYnBhY2s6Ly90cnlwdG8vLi9zcmMvb3JkZXJzLWZ1bmN0aW9uYWxpdGllcy9TZWFyY2hFbmdpbmUuanN4Iiwid2VicGFjazovL3RyeXB0by8uL3NyYy9vcmRlcnMtZnVuY3Rpb25hbGl0aWVzL3N0eWxlcy9PcmRlcnMuY3NzIiwid2VicGFjazovL3RyeXB0by8uL3NyYy9vcmRlcnMtZnVuY3Rpb25hbGl0aWVzL3N0eWxlcy9TZWFyY2hFbmdpbmUuY3NzIiwid2VicGFjazovL3RyeXB0by8uL3NyYy9vcmRlcnMtZnVuY3Rpb25hbGl0aWVzL3N0eWxlcy9PcmRlcnMuY3NzPzdkZWMiLCJ3ZWJwYWNrOi8vdHJ5cHRvLy4vc3JjL29yZGVycy1mdW5jdGlvbmFsaXRpZXMvc3R5bGVzL1NlYXJjaEVuZ2luZS5jc3M/MDI4MSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICcuL3N0eWxlcy9PcmRlcnMuY3NzJ1xuaW1wb3J0IFBhZ2VTZWxlY3RvciBmcm9tICcuL1BhZ2VTZWxlY3Rvcic7XG5pbXBvcnQgU2VhcmNoRW5naW5lIGZyb20gJy4vU2VhcmNoRW5naW5lJztcbmltcG9ydCBPcmRlclRhYmxlIGZyb20gJy4vT3JkZXJUYWJsZSc7XG5cbmNsYXNzIE9yZGVycyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgb3JkZXJzOiBbXSxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBsaW1pdDogMywgLy9MaW1pdCBwZXIgcGFnZSBkZWZpbmVkIGhlcmUhXG4gICAgICBuZXh0UGFnZTogMixcbiAgICAgIHByZXZpb3VzUGFnZTogdW5kZWZpbmVkLFxuICAgICAgb25fb2ZmX2xpbWl0X25leHQ6IGZhbHNlLFxuICAgICAgb25fb2ZmX2xpbWl0X3ByZXZpb3VzOiB0cnVlLFxuICAgICAgY3J5cHRvOiB1bmRlZmluZWQsXG4gICAgICBzZWFyY2hUZXJtOiAnJyxcbiAgICAgIG51bWJlcl9vZl9wYWdlczogMSxcbiAgICB9XG4gICAgdGhpcy5jb250cm9scyA9IHRoaXMuY29udHJvbHMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCA9IHRoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcylcbiAgICB0aGlzLnJlcGFpckRhdGEgPSB0aGlzLnJlcGFpckRhdGEuYmluZCh0aGlzKVxuICAgIFxuICAgIGNvbnNvbGUubG9nKFwiY29uc3RydWN0b3JcIiwgdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMub3JkZXJfdHlwZSlcbiAgfVxuICBcbiAgcmVwYWlyRGF0YShfb2JqT3JkZXJzKXtcbiAgICBsZXQgX3JlcGFpcmVkRGF0YSA9IFtdXG4gICAgX3JlcGFpcmVkRGF0YSA9IF9vYmpPcmRlcnMuc3J2Xy5yZXN1bHRzXG4gICAgcmV0dXJuIF9yZXBhaXJlZERhdGFcbiAgfVxuICBcbiAgaGFuZGxlU3VibWl0KGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY3J5cHRvOiB0aGlzLnN0YXRlLnNlYXJjaFRlcm0sXG4gICAgICBwYWdlOiAxXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5sb2FkRGF0YSgpXG4gICAgfSlcbiAgICBpZih0aGlzLnN0YXRlLnNlYXJjaFRlcm0gPT0gXCJBbGxcIil7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgY3J5cHRvOiB1bmRlZmluZWRcbiAgICAgIH0sICgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNoYW5nZShlKXtcbiAgICAvL2NvbnNvbGUubG9nKGUudGFyZ2V0LnZhbHVlKVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgLy9vcmRlcnM6IHRoaXMucHJvcHMub3JkZXJzLFxuICAgICAgc2VhcmNoVGVybTogZS50YXJnZXQudmFsdWVcbiAgICB9KVxuICB9XG5cbiAgY29udHJvbHMoX3BhZ2UpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2U6IF9wYWdlXG4gICAgfSwgKCkgPT4ge1xuICAgICAgLy9jb25zb2xlLmxvZyhcImNhbGxiYWNrOiBcIiwgdGhpcy5zdGF0ZS5wYWdlKVxuICAgICAgdGhpcy5sb2FkRGF0YSgpXG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgLy9ET00gaXMgcmVhZHlcbiAgICB0aGlzLmxvYWREYXRhKClcbiAgfVxuXG4gIGFzeW5jIGxvYWREYXRhKCl7XG4gICAgbGV0IG9iak9yZGVycyA9IHt9XG4gICAgLy8gY29uc29sZS5sb2coXCJMT0FEOiBcIiwgdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMub3JkZXJfdHlwZSlcbiAgICAvLyBjb25zb2xlLmxvZyhcIkxPQUQ6IFwiLCB0aGlzLnByb3BzLm9yZGVycylcbiAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtwcm9jZXNzLmVudi5ST09UfS9wYWdpbmF0ZWQtb3JkZXJzLyR7dGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMub3JkZXJfdHlwZX0/cGFnZT0ke3RoaXMuc3RhdGUucGFnZX0mbGltaXQ9JHt0aGlzLnN0YXRlLmxpbWl0fSR7dGhpcy5zdGF0ZS5jcnlwdG8gPyBgJmNyeXB0bz0ke3RoaXMuc3RhdGUuY3J5cHRvfWA6IFwiXCIgfWApXG4gICAgbGV0IHNlcnZlck9CSiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgIGNvbnNvbGUubG9nKFwianVzdCBhZGRlZDogXCIsIHNlcnZlck9CSilcbiAgICAvL2NvbnNvbGUubG9nKFwiTmV4dDogXCIsIGRhdGEuZGF0YS5uZXh0KVxuICAgIC8vY29uc29sZS5sb2coXCJQcmV2aW91czogXCIsIGRhdGEuZGF0YS5wcmV2aW91cylcblxuICAgIC8vIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAvLyAudGhlbihkYXRhID0+IHtcbiAgICAvLyAgIG9iak9yZGVycyA9IHJlcGFpckRhdGEoZGF0YSlcbiAgICAvLyAgIC8vY29uc29sZS5sb2cob2JqT3JkZXJzLmRhdGFbMF0uY3J5cHRvKVxuICAgIC8vIH0pO1xuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEuZGF0YS5udW1iZXJfb2ZfcGFnZXMubnVtYmVyKVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgb3JkZXJzOiBzZXJ2ZXJPQkouc3J2Xy5PUkRFUlMsXG4gICAgICBuZXh0UGFnZTogc2VydmVyT0JKLnNydl8ubmV4dCxcbiAgICAgIHByZXZpb3VzUGFnZTogc2VydmVyT0JKLnNydl8ucHJldmlvdXMsXG4gICAgICBudW1iZXJfb2ZfcGFnZXM6IHNlcnZlck9CSi5zcnZfLm51bWJlcl9vZl9wYWdlcy5udW1iZXJcbiAgICB9LCAoKSA9PiB7XG4gICAgICBpZih0aGlzLnN0YXRlLm5leHRQYWdlPT11bmRlZmluZWQpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBvbl9vZmZfbGltaXRfbmV4dDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgb25fb2ZmX2xpbWl0X25leHQ6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpZih0aGlzLnN0YXRlLnByZXZpb3VzUGFnZT09dW5kZWZpbmVkKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgb25fb2ZmX2xpbWl0X3ByZXZpb3VzOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBvbl9vZmZfbGltaXRfcHJldmlvdXM6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICB9KVxuICB9XG4gIFxuICByZW5kZXIoKSB7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5wcm9wcylcbiAgICAvLyBjb25zb2xlLmxvZyhcIkhFUkUgUkVOREVSOiBcIiwgdGhpcy5zdGF0ZS5vcmRlcnMpXG4gICAgLy8gY29uc29sZS5sb2coXCJoZXJlQEBAXCIsIHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLm9yZGVyX3R5cGUpXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIDxTZWFyY2hFbmdpbmUgc2VhcmNoVGVybT17dGhpcy5zdGF0ZS5zZWFyY2hUZXJtfSBoYW5kbGVTdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fSBoYW5kbGVDaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfS8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nd3JhcHBlcic+XG4gICAgICAgIDxPcmRlclRhYmxlIFxuICAgICAgICBidXR0b25zPSdub3JtYWwnIFxuICAgICAgICBvcmRlcl90eXBlPXt0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5vcmRlcl90eXBlfSBcbiAgICAgICAgb3JkZXJzPXt0aGlzLnN0YXRlLm9yZGVyc30vPlxuICAgICAgICA8UGFnZVNlbGVjdG9yIFxuICAgICAgICBudW1iZXJfb2ZfcGFnZXM9e3RoaXMuc3RhdGUubnVtYmVyX29mX3BhZ2VzfSBcbiAgICAgICAgcGFnZT17dGhpcy5zdGF0ZS5wYWdlfSBcbiAgICAgICAgb25fb2ZmX2xpbWl0X3ByZXZpb3VzPXt0aGlzLnN0YXRlLm9uX29mZl9saW1pdF9wcmV2aW91c30gXG4gICAgICAgIG9uX29mZl9saW1pdF9uZXh0PXt0aGlzLnN0YXRlLm9uX29mZl9saW1pdF9uZXh0fSBcbiAgICAgICAgcHJldmlvdXNQYWdlPXt0aGlzLnN0YXRlLnByZXZpb3VzUGFnZX0gXG4gICAgICAgIG5leHRQYWdlPXt0aGlzLnN0YXRlLm5leHRQYWdlfSBcbiAgICAgICAgY29udHJvbHM9e3RoaXMuY29udHJvbHN9Lz5cbiAgICAgIDwvZGl2PlxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyc1xuIiwiLy8gaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9zdHlsZXMvU2VhcmNoRW5naW5lLmNzcydcblxuXG5jbGFzcyBTZWFyY2hFbmdpbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBvbl9vZmY6IGZhbHNlLFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICB9XG4gIGhhbmRsZUNsaWNrKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHByZXZTdGF0ZSA9PiAoe1xuICAgICAgb25fb2ZmOiAhcHJldlN0YXRlLm9uX29mZlxuICAgIH0pKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgIHshdGhpcy5zdGF0ZS5vbl9vZmYgPyBcbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPSdkcm9wLWRvd24nIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PkRyb3AgRG93bjwvYnV0dG9uPiA6XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nc2VhcmNoLWlucHV0cyc+XG4gICAgICAgIDxmb3JtIGNsYXNzTmFtZT0nc2VhcmNoLWNvbXBvbmVudCcgb25TdWJtaXQ9e3RoaXMucHJvcHMuaGFuZGxlU3VibWl0fT5cbiAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICBTZWxlY3QgYSBjcnlwdG8geW91IHdhbnQgdG8gZmlsdGVyIGZvclxuICAgICAgICAgICAgPHNlbGVjdCB2YWx1ZT17dGhpcy5wcm9wcy5zZWFyY2hUZXJtfSBvbkNoYW5nZT17dGhpcy5wcm9wcy5oYW5kbGVDaGFuZ2V9PlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQWxsXCI+QWxsPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJCaXRjb2luXCI+Qml0Y29pbjwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRXRoZXJldW1cIj5FdGhlcmV1bTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTGl0ZWNvaW5cIj5MaXRlY29pbjwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiWmNhc2hcIj5aY2FzaDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQml0Y29pbiBDYXNoXCI+Qml0Y29pbiBDYXNoPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNb25lcm9cIj5Nb25lcm88L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiB2YWx1ZT1cIlN1Ym1pdFwiLz5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xpY2t9PkRyb3AgVXA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICAgfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoRW5naW5lIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJkaXYud3JhcHBlciB0ciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhcyA6IFxcbiAgXFxcIm9uZSB0d29cXFwiXFxuICBcXFwidGhyZWUgdGhyZWVcXFwiIFxcbiAgXFxcImZvdXIgZml2ZVxcXCJcXG4gIFxcXCJzaXggc2V2ZW5cXFwiXFxuICBcXFwiZWlnaHQgZWlnaHRcXFwiXFxuICBcXFwibmluZSBuaW5lXFxcIjtcXG59XFxudHIgPiB0ZCNpZDEge1xcbiAgZ3JpZC1hcmVhOiBvbmU7XFxufVxcbnRyID4gdGQjZW1haWwxIHtcXG4gIGdyaWQtYXJlYTogdHdvO1xcbn1cXG50ciA+IHRkI3Bvc3RlZGRhdGUxIHtcXG4gIGdyaWQtYXJlYTogZWlnaHQ7XFxufVxcbnRyID4gdGQjY3J5cHRvMSB7XFxuICBncmlkLWFyZWE6IHRocmVlO1xcbn1cXG50ciA+IHRkI2Ftb3VudDEge1xcbiAgZ3JpZC1hcmVhOiBmb3VyO1xcbn1cXG50ciA+IHRkI3ByaWNlMSB7XFxuICBncmlkLWFyZWE6IHNpeDtcXG59XFxudHIgPiB0ZCNleHBpcnkxIHtcXG4gIGdyaWQtYXJlYTogc2V2ZW47XFxuICBcXG59XFxudHIgPiB0ZCNwYXltZW50MSB7XFxuICBncmlkLWFyZWE6IGZpdmU7XFxufVxcbnRyID4gdGQjZGVhbDEge1xcbiAgZ3JpZC1hcmVhOiBuaW5lO1xcbn1cXG5cXG5cXG5cXG5cXG5kaXYud3JhcHBlciB7XFxuICAvKiBoZWlnaHQ6IDgwdmg7XFxuICBvdmVyZmxvdzogc2Nyb2xsO1xcbiAgYm9yZGVyOiAxcHggYmxhY2sgc29saWQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDEwJTtcXG4gIHRvcDogMTAlO1xcbiAgbGVmdDogMyU7XFxuICByaWdodDogMyU7ICovXFxuXFxuXFxuICBoZWlnaHQ6IDcwdmg7XFxuICB3aWR0aDogOTR2dztcXG4gIG92ZXJmbG93OiBzY3JvbGw7XFxuICBib3JkZXI6IDFweCByZWQgc29saWQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3R0b206IDEwJTtcXG4gIHRvcDogMjAlO1xcbiAgbGVmdDogMyU7XFxuICByaWdodDogMyU7XFxuICBcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL29yZGVycy1mdW5jdGlvbmFsaXRpZXMvc3R5bGVzL09yZGVycy5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxhQUFhO0VBQ2IsaUNBQWlDO0VBQ2pDLG9DQUFvQztFQUNwQzs7Ozs7O2FBTVc7QUFDYjtBQUNBO0VBQ0UsY0FBYztBQUNoQjtBQUNBO0VBQ0UsY0FBYztBQUNoQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLGVBQWU7QUFDakI7QUFDQTtFQUNFLGNBQWM7QUFDaEI7QUFDQTtFQUNFLGdCQUFnQjs7QUFFbEI7QUFDQTtFQUNFLGVBQWU7QUFDakI7QUFDQTtFQUNFLGVBQWU7QUFDakI7Ozs7O0FBS0E7RUFDRTs7Ozs7OztjQU9ZOzs7RUFHWixZQUFZO0VBQ1osV0FBVztFQUNYLGdCQUFnQjtFQUNoQixxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxRQUFRO0VBQ1IsUUFBUTtFQUNSLFNBQVM7O0FBRVhcIixcInNvdXJjZXNDb250ZW50XCI6W1wiZGl2LndyYXBwZXIgdHIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDYsMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsMWZyKTtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXMgOiBcXG4gIFxcXCJvbmUgdHdvXFxcIlxcbiAgXFxcInRocmVlIHRocmVlXFxcIiBcXG4gIFxcXCJmb3VyIGZpdmVcXFwiXFxuICBcXFwic2l4IHNldmVuXFxcIlxcbiAgXFxcImVpZ2h0IGVpZ2h0XFxcIlxcbiAgXFxcIm5pbmUgbmluZVxcXCI7XFxufVxcbnRyID4gdGQjaWQxIHtcXG4gIGdyaWQtYXJlYTogb25lO1xcbn1cXG50ciA+IHRkI2VtYWlsMSB7XFxuICBncmlkLWFyZWE6IHR3bztcXG59XFxudHIgPiB0ZCNwb3N0ZWRkYXRlMSB7XFxuICBncmlkLWFyZWE6IGVpZ2h0O1xcbn1cXG50ciA+IHRkI2NyeXB0bzEge1xcbiAgZ3JpZC1hcmVhOiB0aHJlZTtcXG59XFxudHIgPiB0ZCNhbW91bnQxIHtcXG4gIGdyaWQtYXJlYTogZm91cjtcXG59XFxudHIgPiB0ZCNwcmljZTEge1xcbiAgZ3JpZC1hcmVhOiBzaXg7XFxufVxcbnRyID4gdGQjZXhwaXJ5MSB7XFxuICBncmlkLWFyZWE6IHNldmVuO1xcbiAgXFxufVxcbnRyID4gdGQjcGF5bWVudDEge1xcbiAgZ3JpZC1hcmVhOiBmaXZlO1xcbn1cXG50ciA+IHRkI2RlYWwxIHtcXG4gIGdyaWQtYXJlYTogbmluZTtcXG59XFxuXFxuXFxuXFxuXFxuZGl2LndyYXBwZXIge1xcbiAgLyogaGVpZ2h0OiA4MHZoO1xcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcXG4gIGJvcmRlcjogMXB4IGJsYWNrIHNvbGlkO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAxMCU7XFxuICB0b3A6IDEwJTtcXG4gIGxlZnQ6IDMlO1xcbiAgcmlnaHQ6IDMlOyAqL1xcblxcblxcbiAgaGVpZ2h0OiA3MHZoO1xcbiAgd2lkdGg6IDk0dnc7XFxuICBvdmVyZmxvdzogc2Nyb2xsO1xcbiAgYm9yZGVyOiAxcHggcmVkIHNvbGlkO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm90dG9tOiAxMCU7XFxuICB0b3A6IDIwJTtcXG4gIGxlZnQ6IDMlO1xcbiAgcmlnaHQ6IDMlO1xcbiAgXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImRpdiNyZWFjdC1kaXYgPiBkaXYgPiBidXR0b24uZHJvcC1kb3duIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDd2aDtcXG4gIGJvdHRvbTogODN2aDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIC8qIGxlZnQ6IDMwJTtcXG4gIHJpZ2h0OiAzMCU7ICovXFxuICAvKiBtaW4td2lkdGg6IGZpdC1jb250ZW50OyAqL1xcbn0gXFxuXFxuZGl2I3JlYWN0LWRpdiA+IGRpdiA+IGRpdi5zZWFyY2gtaW5wdXRzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogN3ZoO1xcbiAgYm90dG9tOiAxMnZoO1xcbiAgei1pbmRleDogMjtcXG4gIHdpZHRoOiAxMDAlO1xcbn0gXFxuXFxuIFxcblxcbmRpdiNyZWFjdC1kaXYsXFxuZGl2I3JlYWN0LWRpdiA+IGRpdiB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL29yZGVycy1mdW5jdGlvbmFsaXRpZXMvc3R5bGVzL1NlYXJjaEVuZ2luZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxjQUFjO0VBQ2QsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixRQUFRO0VBQ1IsWUFBWTtFQUNaLE9BQU87RUFDUCxRQUFRO0VBQ1Isa0JBQWtCO0VBQ2xCO2VBQ2E7RUFDYiw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixZQUFZO0VBQ1osVUFBVTtFQUNWLFdBQVc7QUFDYjs7OztBQUlBOztFQUVFLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImRpdiNyZWFjdC1kaXYgPiBkaXYgPiBidXR0b24uZHJvcC1kb3duIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDd2aDtcXG4gIGJvdHRvbTogODN2aDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIC8qIGxlZnQ6IDMwJTtcXG4gIHJpZ2h0OiAzMCU7ICovXFxuICAvKiBtaW4td2lkdGg6IGZpdC1jb250ZW50OyAqL1xcbn0gXFxuXFxuZGl2I3JlYWN0LWRpdiA+IGRpdiA+IGRpdi5zZWFyY2gtaW5wdXRzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogN3ZoO1xcbiAgYm90dG9tOiAxMnZoO1xcbiAgei1pbmRleDogMjtcXG4gIHdpZHRoOiAxMDAlO1xcbn0gXFxuXFxuIFxcblxcbmRpdiNyZWFjdC1kaXYsXFxuZGl2I3JlYWN0LWRpdiA+IGRpdiB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9PcmRlcnMuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9PcmRlcnMuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL1NlYXJjaEVuZ2luZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL1NlYXJjaEVuZ2luZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iXSwibmFtZXMiOlsiUGFnZVNlbGVjdG9yIiwiU2VhcmNoRW5naW5lIiwiT3JkZXJUYWJsZSIsIk9yZGVycyIsInByb3BzIiwic3RhdGUiLCJvcmRlcnMiLCJwYWdlIiwibGltaXQiLCJuZXh0UGFnZSIsInByZXZpb3VzUGFnZSIsInVuZGVmaW5lZCIsIm9uX29mZl9saW1pdF9uZXh0Iiwib25fb2ZmX2xpbWl0X3ByZXZpb3VzIiwiY3J5cHRvIiwic2VhcmNoVGVybSIsIm51bWJlcl9vZl9wYWdlcyIsImNvbnRyb2xzIiwiYmluZCIsImhhbmRsZVN1Ym1pdCIsImhhbmRsZUNoYW5nZSIsInJlcGFpckRhdGEiLCJjb25zb2xlIiwibG9nIiwibWF0Y2giLCJwYXJhbXMiLCJvcmRlcl90eXBlIiwiX29iak9yZGVycyIsIl9yZXBhaXJlZERhdGEiLCJzcnZfIiwicmVzdWx0cyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInNldFN0YXRlIiwibG9hZERhdGEiLCJ0YXJnZXQiLCJ2YWx1ZSIsIl9wYWdlIiwib2JqT3JkZXJzIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiUk9PVCIsInJlc3BvbnNlIiwianNvbiIsInNlcnZlck9CSiIsIk9SREVSUyIsIm5leHQiLCJwcmV2aW91cyIsIm51bWJlciIsIlJlYWN0IiwiQ29tcG9uZW50Iiwib25fb2ZmIiwiaGFuZGxlQ2xpY2siLCJwcmV2U3RhdGUiXSwic291cmNlUm9vdCI6IiJ9