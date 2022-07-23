"use strict";
(self["webpackChunktrypto"] = self["webpackChunktrypto"] || []).push([["src_orders-functionalities_MakeSell_jsx"],{

/***/ "./src/orders-functionalities/MakeSell.jsx":
/*!*************************************************!*\
  !*** ./src/orders-functionalities/MakeSell.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _styles_Make_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/Make.css */ "./src/orders-functionalities/styles/Make.css");
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


var MakeSell = /*#__PURE__*/function (_React$Component) {
  _inherits(MakeSell, _React$Component);

  var _super = _createSuper(MakeSell);

  function MakeSell() {
    var _this;

    _classCallCheck(this, MakeSell);

    _this = _super.call(this);
    _this.state = {// iterator: 0,
      // message: undefined,
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MakeSell, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault(); // console.log(e.target.parentNode)
      // console.log(document.getElementById("form_id").elements);
      // console.log(document.getElementById("form_id").elements[6].value)

      fetch("".concat("http://localhost:3000", "/sellorders/save"), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          crypto: document.getElementById("form_id").elements[0].value,
          minamount: document.getElementById("form_id").elements[1].value,
          maxamount: document.getElementById("form_id").elements[2].value,
          price: document.getElementById("form_id").elements[3].value,
          expirydate: document.getElementById("form_id").elements[5].value,
          expirytime: document.getElementById("form_id").elements[6].value,
          payment: document.getElementById("form_id").elements[7].value,
          iterator: document.getElementById("form_id").elements[8].value
        })
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        // this.setState({
        //   iterator: result.iterator,
        //   message: result.message,
        // })
        console.log(result);
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      e.preventDefault();
      var crypto = document.getElementById('crypto-select').value; // let minamount = document.getElementById('min-amount-select').value
      // let maxamount = document.getElementById('max-amount-select').value

      var value; //console.log(crypto, minamount, maxamount)

      fetch("".concat("http://localhost:3000", "/cryptoprice")).then(function (res) {
        return res.json();
      }).then(function (data) {
        value = data.data[crypto.toLowerCase()].cad; //console.log(value)

        document.getElementById('price-select').value = value;
      }).catch(function (e) {
        return alert("Their seems to be an error. Enter Price manually. ".concat(e));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // console.log("(1) (render) iterator", this.state.iterator, this.state.message)
      return /*#__PURE__*/React.createElement("form", {
        className: "form",
        id: "form_id"
      }, /*#__PURE__*/React.createElement("h3", null, "Making a sell order..."), /*#__PURE__*/React.createElement("label", {
        htmlFor: "crypto-select"
      }, "Crypto"), /*#__PURE__*/React.createElement("select", {
        name: "crypto",
        id: "crypto-select",
        required: true
      }, /*#__PURE__*/React.createElement("option", {
        value: "Bitcoin"
      }, "Bitcoin"), /*#__PURE__*/React.createElement("option", {
        value: "Ethereum",
        defaultValue: true
      }, "Ethereum"), /*#__PURE__*/React.createElement("option", {
        value: "Litecoin"
      }, "Litecoin"), /*#__PURE__*/React.createElement("option", {
        value: "Bitcoin Cash"
      }, "Bitcoin Cash"), /*#__PURE__*/React.createElement("option", {
        value: "Zcash"
      }, "Zcash"), /*#__PURE__*/React.createElement("option", {
        value: "Monero"
      }, "Monero")), /*#__PURE__*/React.createElement("label", {
        htmlFor: "min-amount-select"
      }, "Min Amount (CAD)"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        id: "min-amount-select",
        name: "minamount",
        required: true,
        defaultValue: "500"
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "max-amount-select"
      }, "Max Amount (CAD)"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        id: "max-amount-select",
        name: "maxamount",
        required: true,
        defaultValue: "1000"
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "price-select"
      }, "Price/Unit"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        id: "price-select",
        name: "price",
        step: "0.01",
        required: true,
        defaultValue: "500"
      }), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleClick
      }, "Market"), /*#__PURE__*/React.createElement("label", {
        htmlFor: "expirydate-select"
      }, "Order Expiry Date"), /*#__PURE__*/React.createElement("input", {
        id: "expirydate-select",
        type: "date",
        name: "expirydate",
        required: true,
        defaultValue: "2022-11-15"
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "expirytime-select"
      }, "Order Expiry Time"), /*#__PURE__*/React.createElement("input", {
        id: "expirytime-select",
        type: "time",
        name: "expirytime",
        required: true,
        defaultValue: "08:37"
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "payment-select"
      }, "Payment"), /*#__PURE__*/React.createElement("select", {
        name: "payment",
        id: "payment-select",
        required: true
      }, /*#__PURE__*/React.createElement("option", {
        value: "Paypal"
      }, "Paypal"), /*#__PURE__*/React.createElement("option", {
        value: "Interac",
        defaultValue: true
      }, "Interac"), /*#__PURE__*/React.createElement("option", {
        value: "Cash"
      }, "Cash")), /*#__PURE__*/React.createElement("input", {
        type: "hidden",
        name: "iterator",
        value: this.state.iterator
      }), /*#__PURE__*/React.createElement("button", {
        type: "submit",
        onClick: function onClick(e) {
          return _this2.handleSubmit(e);
        }
      }, "Submit"));
    }
  }]);

  return MakeSell;
}(React.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MakeSell);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX29yZGVycy1mdW5jdGlvbmFsaXRpZXNfTWFrZVNlbGxfanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0lBR01BOzs7OztBQUNKLHNCQUFhO0FBQUE7O0FBQUE7O0FBQ1g7QUFDQSxVQUFLQyxLQUFMLEdBQWEsQ0FDWDtBQUNBO0FBRlcsS0FBYjtBQUlBLFVBQUtDLFdBQUwsR0FBbUIsTUFBS0EsV0FBTCxDQUFpQkMsSUFBakIsK0JBQW5CO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCRCxJQUFsQiwrQkFBcEI7QUFQVztBQVFaOzs7O1dBRUQsc0JBQWFFLENBQWIsRUFBZTtBQUNiQSxNQUFBQSxDQUFDLENBQUNDLGNBQUYsR0FEYSxDQUViO0FBQ0E7QUFDQTs7QUFFQUMsTUFBQUEsS0FBSyxXQUFJQyx1QkFBSix1QkFBd0M7QUFDM0NHLFFBQUFBLE1BQU0sRUFBRSxNQURtQztBQUUzQ0MsUUFBQUEsT0FBTyxFQUFFO0FBQ1AsMEJBQWdCLGtCQURUO0FBRVAsb0JBQVU7QUFGSCxTQUZrQztBQU0zQ0MsUUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUNuQkMsVUFBQUEsTUFBTSxFQUFFQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUNDLFFBQW5DLENBQTRDLENBQTVDLEVBQStDQyxLQURwQztBQUVuQkMsVUFBQUEsU0FBUyxFQUFFSixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUNDLFFBQW5DLENBQTRDLENBQTVDLEVBQStDQyxLQUZ2QztBQUduQkUsVUFBQUEsU0FBUyxFQUFFTCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUNDLFFBQW5DLENBQTRDLENBQTVDLEVBQStDQyxLQUh2QztBQUluQkcsVUFBQUEsS0FBSyxFQUFFTixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUNDLFFBQW5D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QkFBQ3RCLENBQUQ7QUFBQSxpQkFBTyxNQUFJLENBQUNELFlBQUwsQ0FBa0JDLENBQWxCLENBQVA7QUFBQTtBQUEvQixrQkFwQ0YsQ0FEQTtBQXdDRDs7OztFQXhHb0JtQyxLQUFLLENBQUNDOztBQTJHN0IsaUVBQWV6QyxRQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJ5cHRvLy4vc3JjL29yZGVycy1mdW5jdGlvbmFsaXRpZXMvTWFrZVNlbGwuanN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4vc3R5bGVzL01ha2UuY3NzJ1xuXG5cbmNsYXNzIE1ha2VTZWxsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC8vIGl0ZXJhdG9yOiAwLFxuICAgICAgLy8gbWVzc2FnZTogdW5kZWZpbmVkLFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpXG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgLy8gY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZSlcbiAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1faWRcIikuZWxlbWVudHMpO1xuICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybV9pZFwiKS5lbGVtZW50c1s2XS52YWx1ZSlcblxuICAgIGZldGNoKGAke3Byb2Nlc3MuZW52LlJPT1R9L3NlbGxvcmRlcnMvc2F2ZWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjcnlwdG86IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybV9pZFwiKS5lbGVtZW50c1swXS52YWx1ZSxcbiAgICAgICAgbWluYW1vdW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1faWRcIikuZWxlbWVudHNbMV0udmFsdWUsXG4gICAgICAgIG1heGFtb3VudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtX2lkXCIpLmVsZW1lbnRzWzJdLnZhbHVlLFxuICAgICAgICBwcmljZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtX2lkXCIpLmVsZW1lbnRzWzNdLnZhbHVlLFxuICAgICAgICBleHBpcnlkYXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1faWRcIikuZWxlbWVudHNbNV0udmFsdWUsXG4gICAgICAgIGV4cGlyeXRpbWU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybV9pZFwiKS5lbGVtZW50c1s2XS52YWx1ZSxcbiAgICAgICAgcGF5bWVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtX2lkXCIpLmVsZW1lbnRzWzddLnZhbHVlLFxuICAgICAgICBpdGVyYXRvcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtX2lkXCIpLmVsZW1lbnRzWzhdLnZhbHVlLFxuICAgICAgfSlcbiAgICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgLy8gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAvLyAgIGl0ZXJhdG9yOiByZXN1bHQuaXRlcmF0b3IsXG4gICAgICAvLyAgIG1lc3NhZ2U6IHJlc3VsdC5tZXNzYWdlLFxuICAgICAgLy8gfSlcbiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlQ2xpY2soZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgbGV0IGNyeXB0byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcnlwdG8tc2VsZWN0JykudmFsdWVcbiAgICAvLyBsZXQgbWluYW1vdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbi1hbW91bnQtc2VsZWN0JykudmFsdWVcbiAgICAvLyBsZXQgbWF4YW1vdW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21heC1hbW91bnQtc2VsZWN0JykudmFsdWVcbiAgICBsZXQgdmFsdWVcbiAgICAvL2NvbnNvbGUubG9nKGNyeXB0bywgbWluYW1vdW50LCBtYXhhbW91bnQpXG4gICAgXG4gICAgZmV0Y2goYCR7cHJvY2Vzcy5lbnYuUk9PVH0vY3J5cHRvcHJpY2VgKVxuICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgdmFsdWUgPSBkYXRhLmRhdGFbY3J5cHRvLnRvTG93ZXJDYXNlKCldLmNhZFxuICAgICAgLy9jb25zb2xlLmxvZyh2YWx1ZSlcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmljZS1zZWxlY3QnKS52YWx1ZSA9IHZhbHVlXG4gICAgfSlcbiAgICAuY2F0Y2goZSA9PiBhbGVydChgVGhlaXIgc2VlbXMgdG8gYmUgYW4gZXJyb3IuIEVudGVyIFByaWNlIG1hbnVhbGx5LiAke2V9YCkpXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCIoMSkgKHJlbmRlcikgaXRlcmF0b3JcIiwgdGhpcy5zdGF0ZS5pdGVyYXRvciwgdGhpcy5zdGF0ZS5tZXNzYWdlKVxuICAgIHJldHVybiAoXG4gICAgPGZvcm0gY2xhc3NOYW1lPVwiZm9ybVwiIGlkPVwiZm9ybV9pZFwiPiAgXG4gICAgPGgzPk1ha2luZyBhIHNlbGwgb3JkZXIuLi48L2gzPlxuICAgICAgPGxhYmVsIGh0bWxGb3I9XCJjcnlwdG8tc2VsZWN0XCI+Q3J5cHRvPC9sYWJlbD5cbiAgICAgIDxzZWxlY3QgbmFtZT1cImNyeXB0b1wiIGlkPVwiY3J5cHRvLXNlbGVjdFwiIHJlcXVpcmVkPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQml0Y29pblwiPkJpdGNvaW48L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkV0aGVyZXVtXCIgZGVmYXVsdFZhbHVlPkV0aGVyZXVtPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJMaXRlY29pblwiPkxpdGVjb2luPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJCaXRjb2luIENhc2hcIj5CaXRjb2luIENhc2g8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlpjYXNoXCI+WmNhc2g8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk1vbmVyb1wiPk1vbmVybzwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+ICAgXG4gICAgICBcbiAgICAgIDxsYWJlbCBodG1sRm9yPVwibWluLWFtb3VudC1zZWxlY3RcIj5NaW4gQW1vdW50IChDQUQpPC9sYWJlbD5cbiAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgaWQ9XCJtaW4tYW1vdW50LXNlbGVjdFwiIG5hbWU9XCJtaW5hbW91bnRcIiByZXF1aXJlZCBkZWZhdWx0VmFsdWU9JzUwMCcvPiAgXG5cbiAgICAgIDxsYWJlbCBodG1sRm9yPVwibWF4LWFtb3VudC1zZWxlY3RcIj5NYXggQW1vdW50IChDQUQpPC9sYWJlbD5cbiAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgaWQ9XCJtYXgtYW1vdW50LXNlbGVjdFwiIG5hbWU9XCJtYXhhbW91bnRcIiByZXF1aXJlZCBkZWZhdWx0VmFsdWU9JzEwMDAnLz4gXG5cbiAgICAgIDxsYWJlbCBodG1sRm9yPVwicHJpY2Utc2VsZWN0XCI+UHJpY2UvVW5pdDwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGlkPVwicHJpY2Utc2VsZWN0XCIgbmFtZT1cInByaWNlXCIgc3RlcD1cIjAuMDFcIiByZXF1aXJlZCBkZWZhdWx0VmFsdWU9JzUwMCcvPiBcbiAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+TWFya2V0PC9idXR0b24+XG5cbiAgICAgIDxsYWJlbCBodG1sRm9yPVwiZXhwaXJ5ZGF0ZS1zZWxlY3RcIj5PcmRlciBFeHBpcnkgRGF0ZTwvbGFiZWw+XG4gICAgICA8aW5wdXQgaWQ9XCJleHBpcnlkYXRlLXNlbGVjdFwiIHR5cGU9XCJkYXRlXCIgbmFtZT1cImV4cGlyeWRhdGVcIiByZXF1aXJlZCBkZWZhdWx0VmFsdWU9JzIwMjItMTEtMTUnLz5cblxuICAgICAgPGxhYmVsIGh0bWxGb3I9XCJleHBpcnl0aW1lLXNlbGVjdFwiPk9yZGVyIEV4cGlyeSBUaW1lPC9sYWJlbD5cbiAgICAgIDxpbnB1dCBpZD1cImV4cGlyeXRpbWUtc2VsZWN0XCIgdHlwZT1cInRpbWVcIiBuYW1lPVwiZXhwaXJ5dGltZVwiIHJlcXVpcmVkIGRlZmF1bHRWYWx1ZT0nMDg6MzcnLz5cblxuICAgICAgXG4gICAgICA8bGFiZWwgaHRtbEZvcj1cInBheW1lbnQtc2VsZWN0XCI+UGF5bWVudDwvbGFiZWw+XG4gICAgICA8c2VsZWN0IG5hbWU9XCJwYXltZW50XCIgaWQ9XCJwYXltZW50LXNlbGVjdFwiIHJlcXVpcmVkPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQYXlwYWxcIj5QYXlwYWw8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSW50ZXJhY1wiIGRlZmF1bHRWYWx1ZT5JbnRlcmFjPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkNhc2hcIj5DYXNoPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD4gXG4gICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpdGVyYXRvclwiIHZhbHVlPXt0aGlzLnN0YXRlLml0ZXJhdG9yfS8+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5oYW5kbGVTdWJtaXQoZSl9PlN1Ym1pdDwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1ha2VTZWxsIl0sIm5hbWVzIjpbIk1ha2VTZWxsIiwic3RhdGUiLCJoYW5kbGVDbGljayIsImJpbmQiLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJmZXRjaCIsInByb2Nlc3MiLCJlbnYiLCJST09UIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiY3J5cHRvIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVsZW1lbnRzIiwidmFsdWUiLCJtaW5hbW91bnQiLCJtYXhhbW91bnQiLCJwcmljZSIsImV4cGlyeWRhdGUiLCJleHBpcnl0aW1lIiwicGF5bWVudCIsIml0ZXJhdG9yIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJyZXMiLCJkYXRhIiwidG9Mb3dlckNhc2UiLCJjYWQiLCJjYXRjaCIsImFsZXJ0IiwiUmVhY3QiLCJDb21wb25lbnQiXSwic291cmNlUm9vdCI6IiJ9