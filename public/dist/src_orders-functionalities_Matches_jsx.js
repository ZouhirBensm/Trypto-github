"use strict";
(self["webpackChunktrypto"] = self["webpackChunktrypto"] || []).push([["src_orders-functionalities_Matches_jsx"],{

/***/ "./src/orders-functionalities/Matches.jsx":
/*!************************************************!*\
  !*** ./src/orders-functionalities/Matches.jsx ***!
  \************************************************/
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
// import ReactDOM from 'react-dom'


 // import axios from 'axios';

var Matches = /*#__PURE__*/function (_React$Component) {
  _inherits(Matches, _React$Component);

  var _super = _createSuper(Matches);

  function Matches() {
    var _this;

    _classCallCheck(this, Matches);

    _this = _super.call(this);
    _this.state = {
      orders: [],
      orderstype: 'sellordersdata',
      page: 1,
      limit: 2,
      //Limit per page defined here!
      nextPage: 2,
      previousPage: undefined,
      on_off_limit_next: false,
      on_off_limit_previous: true,
      number_of_pages: 1
    };
    _this.controls = _this.controls.bind(_assertThisInitialized(_this));
    _this.handleToogleFound = _this.handleToogleFound.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Matches, [{
    key: "controls",
    value: function controls(_page) {
      var _this2 = this;

      this.setState({
        page: _page
      }, function () {
        _this2.loadData(_this2.state.orderstype);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData(this.state.orderstype);
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_orderstype) {
        var _this3 = this;

        var serverOBJ;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch("".concat("http://localhost:3000", "/paginated-orders/").concat(_orderstype, "?page=").concat(this.state.page, "&limit=").concat(this.state.limit), {
                  method: 'GET'
                }).then(function (response) {
                  // console.log("response: ", response, "\n\n")
                  return response.json();
                }).then(function (response) {
                  console.log("response: ", response, "\n\n");
                  return response;
                }).catch(function (err) {
                  return console.log(err);
                });

              case 2:
                serverOBJ = _context.sent;
                // let serverOBJ = await axios.get(`${process.env.ROOT}/paginated-orders/${_orderstype}?page=${this.state.page}&limit=${this.state.limit}`)
                // .then(response => {
                //   console.log("response: ", response, "\n\n")
                //   return response.data
                // })
                // .catch((err)=>console.log(err))
                console.log("Data retrieved matches: ", serverOBJ.srv_);
                this.setState({
                  orders: serverOBJ.srv_.ORDERS,
                  nextPage: serverOBJ.srv_.next,
                  previousPage: serverOBJ.srv_.previous,
                  number_of_pages: serverOBJ.srv_.number_of_pages.number
                }, function () {
                  if (_this3.state.nextPage == undefined) {
                    _this3.setState({
                      on_off_limit_next: true
                    });
                  } else {
                    _this3.setState({
                      on_off_limit_next: false
                    });
                  }

                  if (_this3.state.previousPage == undefined) {
                    _this3.setState({
                      on_off_limit_previous: true
                    });
                  } else {
                    _this3.setState({
                      on_off_limit_previous: false
                    });
                  }
                });

              case 5:
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
    key: "handleToogleFound",
    value: function handleToogleFound(e) {
      this.setState({
        orderstype: e.target.value,
        page: 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      console.log("operating under: ", this.state.orderstype);
      return /*#__PURE__*/React.createElement("div", {
        className: "wrapper2"
      }, /*#__PURE__*/React.createElement("form", {
        name: "toogle"
      }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
        type: "radio",
        id: "matchesbuy",
        name: "radio",
        value: "sellordersdata",
        defaultChecked: true,
        onClick: this.handleToogleFound
      }), "Sell orders that match my buys"), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
        type: "radio",
        id: "matchessell",
        name: "radio",
        value: "buyordersdata",
        onClick: this.handleToogleFound
      }), "Buy orders that match my sells")), /*#__PURE__*/React.createElement(_OrderTable__WEBPACK_IMPORTED_MODULE_2__["default"], {
        order_type: this.state.orderstype,
        orders: this.state.orders,
        buttons: "normal"
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

  return Matches;
}(React.Component); // const element = <Matches />;
// ReactDOM.render(element, document.getElementById('react-div'));


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Matches);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX29yZGVycy1mdW5jdGlvbmFsaXRpZXNfTWF0Y2hlc19qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7Q0FFQTs7SUFFTUU7Ozs7O0FBQ0oscUJBQWE7QUFBQTs7QUFBQTs7QUFDWDtBQUNBLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxNQUFBQSxNQUFNLEVBQUUsRUFERztBQUVYQyxNQUFBQSxVQUFVLEVBQUUsZ0JBRkQ7QUFHWEMsTUFBQUEsSUFBSSxFQUFFLENBSEs7QUFJWEMsTUFBQUEsS0FBSyxFQUFFLENBSkk7QUFJRDtBQUNWQyxNQUFBQSxRQUFRLEVBQUUsQ0FMQztBQU1YQyxNQUFBQSxZQUFZLEVBQUVDLFNBTkg7QUFPWEMsTUFBQUEsaUJBQWlCLEVBQUUsS0FQUjtBQVFYQyxNQUFBQSxxQkFBcUIsRUFBRSxJQVJaO0FBU1hDLE1BQUFBLGVBQWUsRUFBRTtBQVROLEtBQWI7QUFXQSxVQUFLQyxRQUFMLEdBQWdCLE1BQUtBLFFBQUwsQ0FBY0MsSUFBZCwrQkFBaEI7QUFDQSxVQUFLQyxpQkFBTCxHQUF5QixNQUFLQSxpQkFBTCxDQUF1QkQsSUFBdkIsK0JBQXpCO0FBZFc7QUFlWjs7OztXQUVELGtCQUFTRSxLQUFULEVBQWdCO0FBQUE7O0FBQ2QsV0FBS0MsUUFBTCxDQUFjO0FBQ1paLFFBQUFBLElBQUksRUFBRVc7QUFETSxPQUFkLEVBRUcsWUFBTTtBQUNQLGNBQUksQ0FBQ0UsUUFBTCxDQUFjLE1BQUksQ0FBQ2hCLEtBQUwsQ0FBV0UsVUFBekI7QUFDRCxPQUpEO0FBS0Q7OztXQUVELDZCQUFtQjtBQUNqQixXQUFLYyxRQUFMLENBQWMsS0FBS2hCLEtBQUwsQ0FBV0UsVUFBekI7QUFDRDs7Ozs4RUFHRCxpQkFBZWUsV0FBZjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUN3QkMsS0FBSyxXQUFJQyx1QkFBSiwrQkFB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LHFCQUFxQixvQkFBb0IsR0FBRyxxQkFBcUIsbUJBQW1CLEdBQUcsT0FBTyxpSEFBaUgsVUFBVSxZQUFZLGFBQWEsV0FBVyxLQUFLLE9BQU8sS0FBSyxZQUFZLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSwyQ0FBMkMsa0JBQWtCLHNDQUFzQyx5Q0FBeUMsbUlBQW1JLEdBQUcsNEJBQTRCLDRCQUE0QixnQkFBZ0IsT0FBTyxvQkFBb0IsaUJBQWlCLHFCQUFxQiw0QkFBNEIsdUJBQXVCLGFBQWEsZ0JBQWdCLGFBQWEsY0FBYyxHQUFHLHFCQUFxQixvQkFBb0IsR0FBRyxxQkFBcUIsbUJBQW1CLEdBQUcsbUJBQW1CO0FBQ2xrRDtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ052QyxNQUFxRztBQUNyRyxNQUEyRjtBQUMzRixNQUFrRztBQUNsRyxNQUFxSDtBQUNySCxNQUE4RztBQUM5RyxNQUE4RztBQUM5RyxNQUE0RztBQUM1RztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHlGQUFPOzs7O0FBSXNEO0FBQzlFLE9BQU8saUVBQWUseUZBQU8sSUFBSSxnR0FBYyxHQUFHLGdHQUFjLFlBQVksRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RyeXB0by8uL3NyYy9vcmRlcnMtZnVuY3Rpb25hbGl0aWVzL01hdGNoZXMuanN4Iiwid2VicGFjazovL3RyeXB0by8uL3NyYy9vcmRlcnMtZnVuY3Rpb25hbGl0aWVzL3N0eWxlcy9NeU9yZGVycy5jc3MiLCJ3ZWJwYWNrOi8vdHJ5cHRvLy4vc3JjL29yZGVycy1mdW5jdGlvbmFsaXRpZXMvc3R5bGVzL015T3JkZXJzLmNzcz84ZTYwIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG4vLyBpbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0ICcuL3N0eWxlcy9NeU9yZGVycy5jc3MnXG5pbXBvcnQgUGFnZVNlbGVjdG9yIGZyb20gJy4vUGFnZVNlbGVjdG9yJztcbmltcG9ydCBPcmRlclRhYmxlIGZyb20gJy4vT3JkZXJUYWJsZSc7XG4vLyBpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jbGFzcyBNYXRjaGVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG9yZGVyczogW10sXG4gICAgICBvcmRlcnN0eXBlOiAnc2VsbG9yZGVyc2RhdGEnLFxuICAgICAgcGFnZTogMSxcbiAgICAgIGxpbWl0OiAyLCAvL0xpbWl0IHBlciBwYWdlIGRlZmluZWQgaGVyZSFcbiAgICAgIG5leHRQYWdlOiAyLFxuICAgICAgcHJldmlvdXNQYWdlOiB1bmRlZmluZWQsXG4gICAgICBvbl9vZmZfbGltaXRfbmV4dDogZmFsc2UsXG4gICAgICBvbl9vZmZfbGltaXRfcHJldmlvdXM6IHRydWUsXG4gICAgICBudW1iZXJfb2ZfcGFnZXM6IDEsXG4gICAgfVxuICAgIHRoaXMuY29udHJvbHMgPSB0aGlzLmNvbnRyb2xzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVUb29nbGVGb3VuZCA9IHRoaXMuaGFuZGxlVG9vZ2xlRm91bmQuYmluZCh0aGlzKVxuICB9XG5cbiAgY29udHJvbHMoX3BhZ2UpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHBhZ2U6IF9wYWdlXG4gICAgfSwgKCkgPT4ge1xuICAgICAgdGhpcy5sb2FkRGF0YSh0aGlzLnN0YXRlLm9yZGVyc3R5cGUpXG4gICAgfSlcbiAgfVxuICBcbiAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICB0aGlzLmxvYWREYXRhKHRoaXMuc3RhdGUub3JkZXJzdHlwZSlcbiAgfVxuXG4gIFxuICBhc3luYyBsb2FkRGF0YShfb3JkZXJzdHlwZSl7XG4gICAgbGV0IHNlcnZlck9CSiA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52LlJPT1R9L3BhZ2luYXRlZC1vcmRlcnMvJHtfb3JkZXJzdHlwZX0/cGFnZT0ke3RoaXMuc3RhdGUucGFnZX0mbGltaXQ9JHt0aGlzLnN0YXRlLmxpbWl0fWAsIHtcbiAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVzcG9uc2U6IFwiLCByZXNwb25zZSwgXCJcXG5cXG5cIilcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcbiAgICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2U6IFwiLCByZXNwb25zZSwgXCJcXG5cXG5cIilcbiAgICAgIHJldHVybiByZXNwb25zZVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpPT5jb25zb2xlLmxvZyhlcnIpKVxuXG4gICAgLy8gbGV0IHNlcnZlck9CSiA9IGF3YWl0IGF4aW9zLmdldChgJHtwcm9jZXNzLmVudi5ST09UfS9wYWdpbmF0ZWQtb3JkZXJzLyR7X29yZGVyc3R5cGV9P3BhZ2U9JHt0aGlzLnN0YXRlLnBhZ2V9JmxpbWl0PSR7dGhpcy5zdGF0ZS5saW1pdH1gKVxuICAgIC8vIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2U6IFwiLCByZXNwb25zZSwgXCJcXG5cXG5cIilcbiAgICAvLyAgIHJldHVybiByZXNwb25zZS5kYXRhXG4gICAgLy8gfSlcbiAgICAvLyAuY2F0Y2goKGVycik9PmNvbnNvbGUubG9nKGVycikpXG4gICAgXG4gICAgY29uc29sZS5sb2coXCJEYXRhIHJldHJpZXZlZCBtYXRjaGVzOiBcIiwgc2VydmVyT0JKLnNydl8pXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBvcmRlcnM6IHNlcnZlck9CSi5zcnZfLk9SREVSUyxcbiAgICAgIG5leHRQYWdlOiBzZXJ2ZXJPQkouc3J2Xy5uZXh0LFxuICAgICAgcHJldmlvdXNQYWdlOiBzZXJ2ZXJPQkouc3J2Xy5wcmV2aW91cyxcbiAgICAgIG51bWJlcl9vZl9wYWdlczogc2VydmVyT0JKLnNydl8ubnVtYmVyX29mX3BhZ2VzLm51bWJlclxuICAgIH0sICgpID0+IHtcbiAgICAgIGlmKHRoaXMuc3RhdGUubmV4dFBhZ2U9PXVuZGVmaW5lZCl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG9uX29mZl9saW1pdF9uZXh0OiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBvbl9vZmZfbGltaXRfbmV4dDogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGlmKHRoaXMuc3RhdGUucHJldmlvdXNQYWdlPT11bmRlZmluZWQpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBvbl9vZmZfbGltaXRfcHJldmlvdXM6IHRydWVcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG9uX29mZl9saW1pdF9wcmV2aW91czogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgXG4gIH1cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgLy8gVHlwaWNhbCB1c2FnZSAoZG9uJ3QgZm9yZ2V0IHRvIGNvbXBhcmUgcHJvcHMpOlxuICAgIGlmICh0aGlzLnN0YXRlLm9yZGVyc3R5cGUgIT09IHByZXZTdGF0ZS5vcmRlcnN0eXBlKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKHRoaXMuc3RhdGUub3JkZXJzdHlwZSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlVG9vZ2xlRm91bmQoZSl7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBvcmRlcnN0eXBlOiBlLnRhcmdldC52YWx1ZSxcbiAgICAgIHBhZ2U6IDEsXG4gICAgfVxuICAgIClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zb2xlLmxvZyhcIm9wZXJhdGluZyB1bmRlcjogXCIsIHRoaXMuc3RhdGUub3JkZXJzdHlwZSlcblxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwid3JhcHBlcjJcIj5cbiAgICAgICAgPGZvcm0gbmFtZT1cInRvb2dsZVwiPlxuICAgICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJtYXRjaGVzYnV5XCIgbmFtZT1cInJhZGlvXCIgdmFsdWU9J3NlbGxvcmRlcnNkYXRhJyBkZWZhdWx0Q2hlY2tlZCBvbkNsaWNrPXt0aGlzLmhhbmRsZVRvb2dsZUZvdW5kfS8+U2VsbCBvcmRlcnMgdGhhdCBtYXRjaCBteSBidXlzPC9sYWJlbD5cbiAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwibWF0Y2hlc3NlbGxcIiBuYW1lPVwicmFkaW9cIiB2YWx1ZT0nYnV5b3JkZXJzZGF0YScgb25DbGljaz17dGhpcy5oYW5kbGVUb29nbGVGb3VuZH0vPkJ1eSBvcmRlcnMgdGhhdCBtYXRjaCBteSBzZWxsczwvbGFiZWw+IFxuICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgPE9yZGVyVGFibGUgXG4gICAgICAgIG9yZGVyX3R5cGU9e3RoaXMuc3RhdGUub3JkZXJzdHlwZX0gXG4gICAgICAgIG9yZGVycz17dGhpcy5zdGF0ZS5vcmRlcnN9XG4gICAgICAgIGJ1dHRvbnM9J25vcm1hbCcvPlxuXG4gICAgICAgIDxQYWdlU2VsZWN0b3IgXG4gICAgICAgIG51bWJlcl9vZl9wYWdlcz17dGhpcy5zdGF0ZS5udW1iZXJfb2ZfcGFnZXN9IFxuICAgICAgICBwYWdlPXt0aGlzLnN0YXRlLnBhZ2V9IFxuICAgICAgICBvbl9vZmZfbGltaXRfcHJldmlvdXM9e3RoaXMuc3RhdGUub25fb2ZmX2xpbWl0X3ByZXZpb3VzfSBcbiAgICAgICAgb25fb2ZmX2xpbWl0X25leHQ9e3RoaXMuc3RhdGUub25fb2ZmX2xpbWl0X25leHR9IFxuICAgICAgICBwcmV2aW91c1BhZ2U9e3RoaXMuc3RhdGUucHJldmlvdXNQYWdlfSBcbiAgICAgICAgbmV4dFBhZ2U9e3RoaXMuc3RhdGUubmV4dFBhZ2V9IFxuICAgICAgICBjb250cm9scz17dGhpcy5jb250cm9sc30vPlxuXG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuLy8gY29uc3QgZWxlbWVudCA9IDxNYXRjaGVzIC8+O1xuXG4vLyBSZWFjdERPTS5yZW5kZXIoZWxlbWVudCwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlYWN0LWRpdicpKTtcblxuZXhwb3J0IGRlZmF1bHQgTWF0Y2hlcyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiZGl2LndyYXBwZXIyIHRyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCg2LDFmcik7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLDFmcik7XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzIDogXFxuICBcXFwib25lIHR3b1xcXCJcXG4gIFxcXCJ0aHJlZSB0aHJlZVxcXCIgXFxuICBcXFwiZm91ciBmaXZlXFxcIlxcbiAgXFxcInNpeCBzZXZlblxcXCJcXG4gIFxcXCJlaWdodCBlaWdodFxcXCJcXG4gIFxcXCJuaW5lIHRlblxcXCI7XFxufVxcblxcblxcbnRhYmxlLmJvcmRlcmVkLXRhYmxlIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGdyZWVuO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBcXG59XFxuXFxuXFxuZGl2LndyYXBwZXIyIHtcXG4gIGhlaWdodDogODB2aDtcXG4gIG92ZXJmbG93OiBzY3JvbGw7XFxuICBib3JkZXI6IDFweCBibGFjayBzb2xpZDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMTAlO1xcbiAgYm90dG9tOiAxMCU7XFxuICBsZWZ0OiAzJTtcXG4gIHJpZ2h0OiAzJTtcXG59XFxuXFxudHIgPiB0ZCNidXR0b24xIHtcXG4gIGdyaWQtYXJlYTogbmluZTtcXG59XFxuXFxudHIgPiB0ZCNidXR0b24yIHtcXG4gIGdyaWQtYXJlYTogdGVuO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvb3JkZXJzLWZ1bmN0aW9uYWxpdGllcy9zdHlsZXMvTXlPcmRlcnMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsYUFBYTtFQUNiLGlDQUFpQztFQUNqQyxvQ0FBb0M7RUFDcEM7Ozs7OztZQU1VO0FBQ1o7OztBQUdBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFdBQVc7O0FBRWI7OztBQUdBO0VBQ0UsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLFFBQVE7RUFDUixXQUFXO0VBQ1gsUUFBUTtFQUNSLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImRpdi53cmFwcGVyMiB0ciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoNiwxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhcyA6IFxcbiAgXFxcIm9uZSB0d29cXFwiXFxuICBcXFwidGhyZWUgdGhyZWVcXFwiIFxcbiAgXFxcImZvdXIgZml2ZVxcXCJcXG4gIFxcXCJzaXggc2V2ZW5cXFwiXFxuICBcXFwiZWlnaHQgZWlnaHRcXFwiXFxuICBcXFwibmluZSB0ZW5cXFwiO1xcbn1cXG5cXG5cXG50YWJsZS5ib3JkZXJlZC10YWJsZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBncmVlbjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgXFxufVxcblxcblxcbmRpdi53cmFwcGVyMiB7XFxuICBoZWlnaHQ6IDgwdmg7XFxuICBvdmVyZmxvdzogc2Nyb2xsO1xcbiAgYm9yZGVyOiAxcHggYmxhY2sgc29saWQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDEwJTtcXG4gIGJvdHRvbTogMTAlO1xcbiAgbGVmdDogMyU7XFxuICByaWdodDogMyU7XFxufVxcblxcbnRyID4gdGQjYnV0dG9uMSB7XFxuICBncmlkLWFyZWE6IG5pbmU7XFxufVxcblxcbnRyID4gdGQjYnV0dG9uMiB7XFxuICBncmlkLWFyZWE6IHRlbjtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9NeU9yZGVycy5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL015T3JkZXJzLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiJdLCJuYW1lcyI6WyJQYWdlU2VsZWN0b3IiLCJPcmRlclRhYmxlIiwiTWF0Y2hlcyIsInN0YXRlIiwib3JkZXJzIiwib3JkZXJzdHlwZSIsInBhZ2UiLCJsaW1pdCIsIm5leHRQYWdlIiwicHJldmlvdXNQYWdlIiwidW5kZWZpbmVkIiwib25fb2ZmX2xpbWl0X25leHQiLCJvbl9vZmZfbGltaXRfcHJldmlvdXMiLCJudW1iZXJfb2ZfcGFnZXMiLCJjb250cm9scyIsImJpbmQiLCJoYW5kbGVUb29nbGVGb3VuZCIsIl9wYWdlIiwic2V0U3RhdGUiLCJsb2FkRGF0YSIsIl9vcmRlcnN0eXBlIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiUk9PVCIsIm1ldGhvZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnIiLCJzZXJ2ZXJPQkoiLCJzcnZfIiwiT1JERVJTIiwibmV4dCIsInByZXZpb3VzIiwibnVtYmVyIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwiZSIsInRhcmdldCIsInZhbHVlIiwiUmVhY3QiLCJDb21wb25lbnQiXSwic291cmNlUm9vdCI6IiJ9