"use strict";
(self["webpackChunktrypto"] = self["webpackChunktrypto"] || []).push([["src_orders-functionalities_MakeBuy_jsx"],{

/***/ "./src/orders-functionalities/MakeBuy.jsx":
/*!************************************************!*\
  !*** ./src/orders-functionalities/MakeBuy.jsx ***!
  \************************************************/
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


var MakeBuy = /*#__PURE__*/function (_React$Component) {
  _inherits(MakeBuy, _React$Component);

  var _super = _createSuper(MakeBuy);

  function MakeBuy() {
    var _this;

    _classCallCheck(this, MakeBuy);

    _this = _super.call(this);
    _this.state = {// iterator: 0,
      // message: undefined,
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MakeBuy, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault(); // console.log(e.target.parentNode)
      // console.log(document.getElementById("form_id").elements);
      // console.log(document.getElementById("form_id").elements[6].value)

      fetch("".concat("http://localhost:3000", "/buyorders/save"), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          crypto: document.getElementById("form_id").elements[0].value,
          amount: document.getElementById("form_id").elements[1].value,
          price: document.getElementById("form_id").elements[2].value,
          expirydate: document.getElementById("form_id").elements[4].value,
          expirytime: document.getElementById("form_id").elements[5].value,
          payment: document.getElementById("form_id").elements[6].value // iterator: document.getElementById("form_id").elements[7].value,

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
      var crypto = document.getElementById('crypto-select').value; // let amount = document.getElementById('amount-select').value

      var value; //console.log(crypto, amount)

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
      }, /*#__PURE__*/React.createElement("h3", null, "Making a buy order..."), /*#__PURE__*/React.createElement("label", {
        htmlFor: "crypto-select"
      }, "Crypto"), /*#__PURE__*/React.createElement("select", {
        name: "crypto",
        id: "crypto-select",
        required: true
      }, /*#__PURE__*/React.createElement("option", {
        value: "Bitcoin",
        defaultValue: true
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
      }, "Monero")), /*#__PURE__*/React.createElement("label", {
        htmlFor: "amount-select"
      }, "Amount (CAD)"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        id: "amount-select",
        name: "amount",
        required: true,
        defaultValue: "100"
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "price-select"
      }, "Price/Unit"), /*#__PURE__*/React.createElement("input", {
        type: "number",
        id: "price-select",
        name: "price",
        step: "0.01",
        required: true,
        defaultValue: "50000"
      }), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleClick
      }, "Market"), /*#__PURE__*/React.createElement("label", {
        htmlFor: "expirydate-select"
      }, "Order Expiry Date"), /*#__PURE__*/React.createElement("input", {
        id: "expirydate-select",
        type: "date",
        name: "expirydate",
        required: true,
        defaultValue: "2022-09-15"
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "expirytime-select"
      }, "Order Expiry Time"), /*#__PURE__*/React.createElement("input", {
        id: "expirytime-select",
        type: "time",
        name: "expirytime",
        required: true,
        defaultValue: "08:00"
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "payment-select"
      }, "Payment"), /*#__PURE__*/React.createElement("select", {
        name: "payment",
        id: "payment-select",
        required: true
      }, /*#__PURE__*/React.createElement("option", {
        value: "Paypal",
        defaultValue: true
      }, "Paypal"), /*#__PURE__*/React.createElement("option", {
        value: "Interac"
      }, "Interac"), /*#__PURE__*/React.createElement("option", {
        value: "Cash"
      }, "Cash")), /*#__PURE__*/React.createElement("button", {
        type: "submit",
        onClick: function onClick(e) {
          return _this2.handleSubmit(e);
        }
      }, "Submit"));
    }
  }]);

  return MakeBuy;
}(React.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MakeBuy);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX29yZGVycy1mdW5jdGlvbmFsaXRpZXNfTWFrZUJ1eV9qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7SUFHTUE7Ozs7O0FBQ0oscUJBQWE7QUFBQTs7QUFBQTs7QUFDWDtBQUNBLFVBQUtDLEtBQUwsR0FBYSxDQUNYO0FBQ0E7QUFGVyxLQUFiO0FBSUEsVUFBS0MsV0FBTCxHQUFtQixNQUFLQSxXQUFMLENBQWlCQyxJQUFqQiwrQkFBbkI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CLE1BQUtBLFlBQUwsQ0FBa0JELElBQWxCLCtCQUFwQjtBQVBXO0FBUVo7Ozs7V0FDRCxzQkFBYUUsQ0FBYixFQUFlO0FBQ2JBLE1BQUFBLENBQUMsQ0FBQ0MsY0FBRixHQURhLENBRWI7QUFDQTtBQUNBOztBQUVBQyxNQUFBQSxLQUFLLFdBQUlDLHVCQUFKLHNCQUF1QztBQUMxQ0csUUFBQUEsTUFBTSxFQUFFLE1BRGtDO0FBRTFDQyxRQUFBQSxPQUFPLEVBQUU7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUCxvQkFBVTtBQUZILFNBRmlDO0FBTTFDQyxRQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQ25CQyxVQUFBQSxNQUFNLEVBQUVDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixTQUF4QixFQUFtQ0MsUUFBbkMsQ0FBNEMsQ0FBNUMsRUFBK0NDLEtBRHBDO0FBRW5CQyxVQUFBQSxNQUFNLEVBQUVKLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixTQUF4QixFQUFtQ0MsUUFBbkMsQ0FBNEMsQ0FBNUMsRUFBK0NDLEtBRnBDO0FBR25CRSxVQUFBQSxLQUFLLEVBQUVMLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixTQUF4QixFQUFtQ0MsUUFBbkMsQ0FBNEMsQ0FBNUMsRUFBK0NDLEtBSG5DO0FBSW5CRyxVQUFBQSxVQUFVLEVBQUVOLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixTQUF4QixFQUFtQ0MsUUFBbkMs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QyxZQUFJLEVBQUMsWUFBL0M7QUFBNEQsZ0JBQVEsTUFBcEU7QUFBcUUsb0JBQVksRUFBQztBQUFsRixRQWpCRixlQWtCRTtBQUFPLGVBQU8sRUFBQztBQUFmLDZCQWxCRixlQW1CRTtBQUFPLFVBQUUsRUFBQyxtQkFBVjtBQUE4QixZQUFJLEVBQUMsTUFBbkM7QUFBMEMsWUFBSSxFQUFDLFlBQS9DO0FBQTRELGdCQUFRLE1BQXBFO0FBQXFFLG9CQUFZLEVBQUM7QUFBbEYsUUFuQkYsZUFvQkU7QUFBTyxlQUFPLEVBQUM7QUFBZixtQkFwQkYsZUFxQkU7QUFBUSxZQUFJLEVBQUMsU0FBYjtBQUF1QixVQUFFLEVBQUMsZ0JBQTFCO0FBQTJDLGdCQUFRO0FBQW5ELHNCQUNJO0FBQVEsYUFBSyxFQUFDLFFBQWQ7QUFBdUIsb0JBQVk7QUFBbkMsa0JBREosZUFFSTtBQUFRLGFBQUssRUFBQztBQUFkLG1CQUZKLGVBR0k7QUFBUSxhQUFLLEVBQUM7QUFBZCxnQkFISixDQXJCRixlQTJCRTtBQUFRLFlBQUksRUFBQyxRQUFiO0FBQXNCLGVBQU8sRUFBRSxpQkFBQ0csQ0FBRDtBQUFBLGlCQUFPLE1BQUksQ0FBQ0QsWUFBTCxDQUFrQkMsQ0FBbEIsQ0FBUDtBQUFBO0FBQS9CLGtCQTNCRixDQURGO0FBZ0NEOzs7O0VBN0ZtQmlDLEtBQUssQ0FBQ0M7O0FBZ0c1QixpRUFBZXZDLE9BQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cnlwdG8vLi9zcmMvb3JkZXJzLWZ1bmN0aW9uYWxpdGllcy9NYWtlQnV5LmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICcuL3N0eWxlcy9NYWtlLmNzcydcblxuXG5jbGFzcyBNYWtlQnV5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC8vIGl0ZXJhdG9yOiAwLFxuICAgICAgLy8gbWVzc2FnZTogdW5kZWZpbmVkLFxuICAgIH1cbiAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpXG4gIH1cbiAgaGFuZGxlU3VibWl0KGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUpXG4gICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtX2lkXCIpLmVsZW1lbnRzKTtcbiAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1faWRcIikuZWxlbWVudHNbNl0udmFsdWUpXG5cbiAgICBmZXRjaChgJHtwcm9jZXNzLmVudi5ST09UfS9idXlvcmRlcnMvc2F2ZWAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjcnlwdG86IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybV9pZFwiKS5lbGVtZW50c1swXS52YWx1ZSxcbiAgICAgICAgYW1vdW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1faWRcIikuZWxlbWVudHNbMV0udmFsdWUsXG4gICAgICAgIHByaWNlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1faWRcIikuZWxlbWVudHNbMl0udmFsdWUsXG4gICAgICAgIGV4cGlyeWRhdGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybV9pZFwiKS5lbGVtZW50c1s0XS52YWx1ZSxcbiAgICAgICAgZXhwaXJ5dGltZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtX2lkXCIpLmVsZW1lbnRzWzVdLnZhbHVlLFxuICAgICAgICBwYXltZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1faWRcIikuZWxlbWVudHNbNl0udmFsdWUsXG4gICAgICAgIC8vIGl0ZXJhdG9yOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1faWRcIikuZWxlbWVudHNbN10udmFsdWUsXG4gICAgICB9KVxuICAgIH0pXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAvLyB0aGlzLnNldFN0YXRlKHtcbiAgICAgIC8vICAgaXRlcmF0b3I6IHJlc3VsdC5pdGVyYXRvcixcbiAgICAgIC8vICAgbWVzc2FnZTogcmVzdWx0Lm1lc3NhZ2UsXG4gICAgICAvLyB9KVxuICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVDbGljayhlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBsZXQgY3J5cHRvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyeXB0by1zZWxlY3QnKS52YWx1ZVxuICAgIC8vIGxldCBhbW91bnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYW1vdW50LXNlbGVjdCcpLnZhbHVlXG4gICAgbGV0IHZhbHVlXG4gICAgLy9jb25zb2xlLmxvZyhjcnlwdG8sIGFtb3VudClcbiAgICBcbiAgICBmZXRjaChgJHtwcm9jZXNzLmVudi5ST09UfS9jcnlwdG9wcmljZWApXG4gICAgXG4gICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICB2YWx1ZSA9IGRhdGEuZGF0YVtjcnlwdG8udG9Mb3dlckNhc2UoKV0uY2FkXG4gICAgICAvL2NvbnNvbGUubG9nKHZhbHVlKVxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByaWNlLXNlbGVjdCcpLnZhbHVlID0gdmFsdWVcbiAgICB9KVxuICAgIC5jYXRjaChlID0+IGFsZXJ0KGBUaGVpciBzZWVtcyB0byBiZSBhbiBlcnJvci4gRW50ZXIgUHJpY2UgbWFudWFsbHkuICR7ZX1gKSlcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCIoMSkgKHJlbmRlcikgaXRlcmF0b3JcIiwgdGhpcy5zdGF0ZS5pdGVyYXRvciwgdGhpcy5zdGF0ZS5tZXNzYWdlKVxuICAgIHJldHVybiAoXG4gICAgICA8Zm9ybSBjbGFzc05hbWU9XCJmb3JtXCIgaWQ9XCJmb3JtX2lkXCI+XG4gICAgICAgIDxoMz5NYWtpbmcgYSBidXkgb3JkZXIuLi48L2gzPlxuICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImNyeXB0by1zZWxlY3RcIj5DcnlwdG88L2xhYmVsPlxuICAgICAgICA8c2VsZWN0IG5hbWU9XCJjcnlwdG9cIiBpZD1cImNyeXB0by1zZWxlY3RcIiByZXF1aXJlZD5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJCaXRjb2luXCIgZGVmYXVsdFZhbHVlPkJpdGNvaW48L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJFdGhlcmV1bVwiPkV0aGVyZXVtPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTGl0ZWNvaW5cIj5MaXRlY29pbjwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkJpdGNvaW4gQ2FzaFwiPkJpdGNvaW4gQ2FzaDwvb3B0aW9uPlxuICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlpjYXNoXCI+WmNhc2g8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNb25lcm9cIj5Nb25lcm88L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+IFxuICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImFtb3VudC1zZWxlY3RcIj5BbW91bnQgKENBRCk8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGlkPVwiYW1vdW50LXNlbGVjdFwiIG5hbWU9XCJhbW91bnRcIiByZXF1aXJlZCBkZWZhdWx0VmFsdWU9JzEwMCcvPiAgXG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwicHJpY2Utc2VsZWN0XCI+UHJpY2UvVW5pdDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgaWQ9XCJwcmljZS1zZWxlY3RcIiBuYW1lPVwicHJpY2VcIiBzdGVwPVwiMC4wMVwiIHJlcXVpcmVkIGRlZmF1bHRWYWx1ZT0nNTAwMDAnLz4gXG4gICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVDbGlja30+TWFya2V0PC9idXR0b24+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZXhwaXJ5ZGF0ZS1zZWxlY3RcIj5PcmRlciBFeHBpcnkgRGF0ZTwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBpZD1cImV4cGlyeWRhdGUtc2VsZWN0XCIgdHlwZT1cImRhdGVcIiBuYW1lPVwiZXhwaXJ5ZGF0ZVwiIHJlcXVpcmVkIGRlZmF1bHRWYWx1ZT0nMjAyMi0wOS0xNScvPlxuICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImV4cGlyeXRpbWUtc2VsZWN0XCI+T3JkZXIgRXhwaXJ5IFRpbWU8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgaWQ9XCJleHBpcnl0aW1lLXNlbGVjdFwiIHR5cGU9XCJ0aW1lXCIgbmFtZT1cImV4cGlyeXRpbWVcIiByZXF1aXJlZCBkZWZhdWx0VmFsdWU9JzA4OjAwJy8+XG4gICAgICAgIDxsYWJlbCBodG1sRm9yPVwicGF5bWVudC1zZWxlY3RcIj5QYXltZW50PC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdCBuYW1lPVwicGF5bWVudFwiIGlkPVwicGF5bWVudC1zZWxlY3RcIiByZXF1aXJlZD5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQYXlwYWxcIiBkZWZhdWx0VmFsdWU+UGF5cGFsPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSW50ZXJhY1wiPkludGVyYWM8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJDYXNoXCI+Q2FzaDwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD4gXG4gICAgICAgIHsvKiA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJpdGVyYXRvclwiIHZhbHVlPXt0aGlzLnN0YXRlLml0ZXJhdG9yfS8+ICovfVxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5oYW5kbGVTdWJtaXQoZSl9PlN1Ym1pdDwvYnV0dG9uPlxuXG4gICAgICA8L2Zvcm0+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYWtlQnV5Il0sIm5hbWVzIjpbIk1ha2VCdXkiLCJzdGF0ZSIsImhhbmRsZUNsaWNrIiwiYmluZCIsImhhbmRsZVN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZldGNoIiwicHJvY2VzcyIsImVudiIsIlJPT1QiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjcnlwdG8iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZWxlbWVudHMiLCJ2YWx1ZSIsImFtb3VudCIsInByaWNlIiwiZXhwaXJ5ZGF0ZSIsImV4cGlyeXRpbWUiLCJwYXltZW50IiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInJlc3VsdCIsImNvbnNvbGUiLCJsb2ciLCJyZXMiLCJkYXRhIiwidG9Mb3dlckNhc2UiLCJjYWQiLCJjYXRjaCIsImFsZXJ0IiwiUmVhY3QiLCJDb21wb25lbnQiXSwic291cmNlUm9vdCI6IiJ9