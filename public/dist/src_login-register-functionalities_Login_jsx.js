"use strict";
(self["webpackChunktrypto"] = self["webpackChunktrypto"] || []).push([["src_login-register-functionalities_Login_jsx"],{

/***/ "./src/login-register-functionalities/Login.jsx":
/*!******************************************************!*\
  !*** ./src/login-register-functionalities/Login.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _styles_MgtUser_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/MgtUser.css */ "./src/login-register-functionalities/styles/MgtUser.css");
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




var Login = /*#__PURE__*/function (_React$Component) {
  _inherits(Login, _React$Component);

  var _super = _createSuper(Login);

  function Login() {
    var _this;

    _classCallCheck(this, Login);

    _this = _super.call(this);
    _this.state = {
      notification: []
    };
    _this.functionneed = _this.functionneed.bind(_assertThisInitialized(_this));
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Login, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      var _this2 = this;

      e.preventDefault(); // console.log(e.target.parentNode)
      // console.log(document.getElementById("loginregister").elements);
      // console.log(document.getElementById("loginregister").elements[0].value)
      // console.log(document.getElementById("loginregister").elements[1].value)

      fetch("".concat("http://localhost:3000", "/users/login"), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: document.getElementById("loginregister").elements[0].value,
          password: document.getElementById("loginregister").elements[1].value
        })
      }).then(function (response) {
        // console.log("api ress: ", response); 
        return response.json();
      }).then(function (data) {
        console.log(data);

        if (data.server) {
          window.location.href = "".concat("http://localhost:3000", "/");
        } else if (data.error) {
          _this2.setState({
            notification: data.error.message
          });
        } else {
          throw new Error("Front end does not support server response data structure, when api call made to POST /users/login.\nMust be object with data.server.message or data.error.message");
        } // console.log("server responses with: ", data)

      });
    }
  }, {
    key: "functionneed",
    value: function functionneed() {}
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var notifyDisplays = this.state.notification.map(function (notification, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          key: index
        }, notification);
      });
      console.log(notifyDisplays);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
        id: "container-log-reg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
        id: "loginregister",
        className: "form"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", null, "Login"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Email"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
        type: "text",
        name: "email"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
        type: "text",
        name: "password"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
        type: "submit",
        onClick: function onClick(e) {
          return _this3.handleSubmit(e);
        }
      }, "Login")), notifyDisplays);
    }
  }]);

  return Login;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Login);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2xvZ2luLXJlZ2lzdGVyLWZ1bmN0aW9uYWxpdGllc19Mb2dpbl9qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0lBRU1DOzs7OztBQUVKLG1CQUFhO0FBQUE7O0FBQUE7O0FBQ1g7QUFDQSxVQUFLQyxLQUFMLEdBQWE7QUFDWEMsTUFBQUEsWUFBWSxFQUFFO0FBREgsS0FBYjtBQUdBLFVBQUtDLFlBQUwsR0FBb0IsTUFBS0EsWUFBTCxDQUFrQkMsSUFBbEIsK0JBQXBCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCRCxJQUFsQiwrQkFBcEI7QUFOVztBQU9aOzs7O1dBRUQsc0JBQWFFLENBQWIsRUFBZTtBQUFBOztBQUNiQSxNQUFBQSxDQUFDLENBQUNDLGNBQUYsR0FEYSxDQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBQyxNQUFBQSxLQUFLLFdBQUlDLHVCQUFKLG1CQUFvQztBQUN2Q0csUUFBQUEsTUFBTSxFQUFFLE1BRCtCO0FBRXZDQyxRQUFBQSxPQUFPLEVBQUU7QUFDUCwwQkFBZ0Isa0JBRFQ7QUFFUCxvQkFBVTtBQUZILFNBRjhCO0FBTXZDQyxRQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQ25CQyxVQUFBQSxLQUFLLEVBQUVDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixlQUF4QixFQUF5Q0MsUUFBekMsQ0FBa0QsQ0FBbEQsRUFBcURDLEtBRHpDO0FBRW5CQyxVQUFBQSxRQUFRLEVBQUVKLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixlQUF4QixFQUF5Q0MsUUFBekMsQ0FBa0QsQ0FBbEQsRUFBcURDO0FBRjVDLFNBQWY7QUFOaUMsT0FBcEMsQ0FBTCxDQVdDRSxJQVhELENBV00sVUFBQUMsUUFBUSxFQUFJO0FBQ2hCO0FBQ0EsZUFBT0EsUUFBUSxDQUFDQyxJQUFULEVBQVA7QUFDRCxPQWRELEVBZUNGLElBZkQsQ0FlTSxVQUFBRyxJQUFJLEVBQUk7QUFDWkMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlGLElBQVo7O0FBQ0EsWUFBR0EsSUFBSSxDQUFDRyxNQUFSLEVBQWU7QUFDYkMsVUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFoQixhQUEwQnZCLHVCQUExQjtBQUNELFNBRkQsTUFFTyxJQUFHaUIsSUFBSSxDQUFDTyxLQUFSLEVBQWM7QUFDbkIsZ0JBQUksQ0FBQ0MsUUFBTCxDQUFjO0FBQ1poQyxZQUFBQSxZQUFZLEVBQUV3QixJQUFJLENBQUNPLEtBQUwsQ0FBV0U7QUFEYixXQUFkO0FBR0QsU0FKTSxNQUlBO0FBQ0wsZ0JBQU0sSUFBSUMsS0FBSixDQUFVLG9LQUFWLENBQU47QUFDRCxTQVZXLENBV1o7O0FBQ0QsT0EzQkQ7QUE0QkQ7OztXQUVELHdCQUFjLENBQUU7OztXQUVoQixrQkFBUztBQUFBOztBQUVQLFVBQU1DLGNBQWMsR0FBRyxLQUFLcEMsS0FBTCxDQUFXQyxZQUFYLENBQXdCb0MsR0FBeEIsQ0FBNEIsVUFBQ3BDLFlBQUQsRUFBZXFDLEtBQWYsRUFBeUI7QUFDMUUsNEJBQU87QUFBSyxhQUFHLEVBQUVBO0FBQVYsV0FBa0JyQyxZQUFsQixDQUFQO0FBQ0QsT0FGc0IsQ0FBdkI7QUFJQXlCLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZUyxjQUFaO0FBRUEsMEJBQ0U7QUFBSyxVQUFFLEVBQUM7QUFBUixzQkFDRTtBQUFNLFVBQUUsRUFBQyxlQUFUO0FBQXlCLGlCQUFTLEVBQUM7QUFBbkMsc0JBQ0UscUVBREYsZUFFRSx3RUFGRixlQUdFO0FBQU8sWUFBSSxFQUFDLE1BQVo7QUFBbUIsWUFBSSxFQUFDO0FBQXhCLFFBSEYsZUFJRSwyRUFKRixlQUtFO0FBQU8sWUFBSSxFQUFDLE1BQVo7QUFBbUIsWUFBSSxFQUFDO0FBQXhCLFFBTEYsZUFNRTtBQUFRLFlBQUksRUFBQyxRQUFiO0FBQXNCLGVBQU8sRUFBRSxpQkFBQy9CLENBQUQ7QUFBQSxpQkFBTyxNQUFJLENBQUNELFlBQUwsQ0FBa0JDLENBQWxCLENBQVA7QUFBQTtBQUEvQixpQkFORixDQURGLEVBVUkrQixjQVZKLENBREY7QUFjRDs7OztFQXhFaUJ0Qzs7QUEyRXBCLGlFQUFlQyxLQUFmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJ5cHRvLy4vc3JjL2xvZ2luLXJlZ2lzdGVyLWZ1bmN0aW9uYWxpdGllcy9Mb2dpbi5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9zdHlsZXMvTWd0VXNlci5jc3MnIFxuXG5jbGFzcyBMb2dpbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5vdGlmaWNhdGlvbjogW11cbiAgICB9XG4gICAgdGhpcy5mdW5jdGlvbm5lZWQgPSB0aGlzLmZ1bmN0aW9ubmVlZC5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVTdWJtaXQgPSB0aGlzLmhhbmRsZVN1Ym1pdC5iaW5kKHRoaXMpXG4gIH1cblxuICBoYW5kbGVTdWJtaXQoZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgLy8gY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZSlcbiAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2lucmVnaXN0ZXJcIikuZWxlbWVudHMpO1xuICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5yZWdpc3RlclwiKS5lbGVtZW50c1swXS52YWx1ZSlcbiAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2lucmVnaXN0ZXJcIikuZWxlbWVudHNbMV0udmFsdWUpXG5cbiAgICBmZXRjaChgJHtwcm9jZXNzLmVudi5ST09UfS91c2Vycy9sb2dpbmAsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBlbWFpbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbnJlZ2lzdGVyXCIpLmVsZW1lbnRzWzBdLnZhbHVlLFxuICAgICAgICBwYXNzd29yZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbnJlZ2lzdGVyXCIpLmVsZW1lbnRzWzFdLnZhbHVlLFxuICAgICAgfSlcbiAgICB9KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiYXBpIHJlc3M6IFwiLCByZXNwb25zZSk7IFxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKVxuICAgIH0pXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgaWYoZGF0YS5zZXJ2ZXIpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3Byb2Nlc3MuZW52LlJPT1R9L2A7XG4gICAgICB9IGVsc2UgaWYoZGF0YS5lcnJvcil7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIG5vdGlmaWNhdGlvbjogZGF0YS5lcnJvci5tZXNzYWdlLFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRnJvbnQgZW5kIGRvZXMgbm90IHN1cHBvcnQgc2VydmVyIHJlc3BvbnNlIGRhdGEgc3RydWN0dXJlLCB3aGVuIGFwaSBjYWxsIG1hZGUgdG8gUE9TVCAvdXNlcnMvbG9naW4uXFxuTXVzdCBiZSBvYmplY3Qgd2l0aCBkYXRhLnNlcnZlci5tZXNzYWdlIG9yIGRhdGEuZXJyb3IubWVzc2FnZVwiKVxuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2coXCJzZXJ2ZXIgcmVzcG9uc2VzIHdpdGg6IFwiLCBkYXRhKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbm5lZWQoKXt9XG5cbiAgcmVuZGVyKCkge1xuXG4gICAgY29uc3Qgbm90aWZ5RGlzcGxheXMgPSB0aGlzLnN0YXRlLm5vdGlmaWNhdGlvbi5tYXAoKG5vdGlmaWNhdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9Pntub3RpZmljYXRpb259PC9kaXY+XG4gICAgfSlcblxuICAgIGNvbnNvbGUubG9nKG5vdGlmeURpc3BsYXlzKVxuICAgIFxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGFpbmVyLWxvZy1yZWdcIj5cbiAgICAgICAgPGZvcm0gaWQ9XCJsb2dpbnJlZ2lzdGVyXCIgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICAgIDxoMz5Mb2dpbjwvaDM+XG4gICAgICAgICAgPGxhYmVsPkVtYWlsPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZW1haWxcIi8+IFxuICAgICAgICAgIDxsYWJlbD5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInBhc3N3b3JkXCIvPiBcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBvbkNsaWNrPXsoZSkgPT4gdGhpcy5oYW5kbGVTdWJtaXQoZSl9PkxvZ2luPC9idXR0b24+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgey8qIGRpc3BsYXkgdGhlIG5vdGlmaWNhdGlvbiBmcm9tIHRoZSBzZXJ2ZXIgaGVyZSEgKi99XG4gICAgICAgIHsgbm90aWZ5RGlzcGxheXMgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2dpbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkxvZ2luIiwic3RhdGUiLCJub3RpZmljYXRpb24iLCJmdW5jdGlvbm5lZWQiLCJiaW5kIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiUk9PVCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVtYWlsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVsZW1lbnRzIiwidmFsdWUiLCJwYXNzd29yZCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInNlcnZlciIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsImVycm9yIiwic2V0U3RhdGUiLCJtZXNzYWdlIiwiRXJyb3IiLCJub3RpZnlEaXNwbGF5cyIsIm1hcCIsImluZGV4IiwiQ29tcG9uZW50Il0sInNvdXJjZVJvb3QiOiIifQ==