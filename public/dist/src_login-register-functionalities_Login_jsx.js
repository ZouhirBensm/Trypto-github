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
/* harmony import */ var _styles_MgtUser_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/MgtUser.css */ "./src/login-register-functionalities/styles/MgtUser.css");
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
        return /*#__PURE__*/React.createElement("div", {
          key: index
        }, notification);
      });
      console.log(notifyDisplays);
      return /*#__PURE__*/React.createElement("div", {
        id: "container-log-reg"
      }, /*#__PURE__*/React.createElement("form", {
        id: "loginregister",
        className: "form"
      }, /*#__PURE__*/React.createElement("h3", null, "Login"), /*#__PURE__*/React.createElement("label", null, "Email"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "email"
      }), /*#__PURE__*/React.createElement("label", null, "Password"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "password"
      }), /*#__PURE__*/React.createElement("button", {
        type: "submit",
        onClick: function onClick(e) {
          return _this3.handleSubmit(e);
        }
      }, "Login")), notifyDisplays);
    }
  }]);

  return Login;
}(React.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Login);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2xvZ2luLXJlZ2lzdGVyLWZ1bmN0aW9uYWxpdGllc19Mb2dpbl9qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7SUFFTUE7Ozs7O0FBRUosbUJBQWE7QUFBQTs7QUFBQTs7QUFDWDtBQUNBLFVBQUtDLEtBQUwsR0FBYTtBQUNYQyxNQUFBQSxZQUFZLEVBQUU7QUFESCxLQUFiO0FBR0EsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCQyxJQUFsQiwrQkFBcEI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CLE1BQUtBLFlBQUwsQ0FBa0JELElBQWxCLCtCQUFwQjtBQU5XO0FBT1o7Ozs7V0FFRCxzQkFBYUUsQ0FBYixFQUFlO0FBQUE7O0FBQ2JBLE1BQUFBLENBQUMsQ0FBQ0MsY0FBRixHQURhLENBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUFDLE1BQUFBLEtBQUssV0FBSUMsdUJBQUosbUJBQW9DO0FBQ3ZDRyxRQUFBQSxNQUFNLEVBQUUsTUFEK0I7QUFFdkNDLFFBQUFBLE9BQU8sRUFBRTtBQUNQLDBCQUFnQixrQkFEVDtBQUVQLG9CQUFVO0FBRkgsU0FGOEI7QUFNdkNDLFFBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDbkJDLFVBQUFBLEtBQUssRUFBRUMsUUFBUSxDQUFDQyxjQUFULENBQXdCLGVBQXhCLEVBQXlDQyxRQUF6QyxDQUFrRCxDQUFsRCxFQUFxREMsS0FEekM7QUFFbkJDLFVBQUFBLFFBQVEsRUFBRUosUUFBUSxDQUFDQyxjQUFULENBQXdCLGVBQXhCLEVBQXlDQyxRQUF6QyxDQUFrRCxDQUFsRCxFQUFxREM7QUFGNUMsU0FBZjtBQU5pQyxPQUFwQyxDQUFMLENBV0NFLElBWEQsQ0FXTSxVQUFBQyxRQUFRLEVBQUk7QUFDaEI7QUFDQSxlQUFPQSxRQUFRLENBQUNDLElBQVQsRUFBUDtBQUNELE9BZEQsRUFlQ0YsSUFmRCxDQWVNLFVBQUFHLElBQUksRUFBSTtBQUNaQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsSUFBWjs7QUFDQSxZQUFHQSxJQUFJLENBQUNHLE1BQVIsRUFBZTtBQUNiQyxVQUFBQSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLElBQWhCLGFBQTBCdkIsdUJBQTFCO0FBQ0QsU0FGRCxNQUVPLElBQUdpQixJQUFJLENBQUNPLEtBQVIsRUFBYztBQUNuQixnQkFBSSxDQUFDQyxRQUFMLENBQWM7QUFDWmhDLFlBQUFBLFlBQVksRUFBRXdCLElBQUksQ0FBQ08sS0FBTCxDQUFXRTtBQURiLFdBQWQ7QUFHRCxTQUpNLE1BSUE7QUFDTCxnQkFBTSxJQUFJQyxLQUFKLENBQVUsb0tBQVYsQ0FBTjtBQUNELFNBVlcsQ0FXWjs7QUFDRCxPQTNCRDtBQTRCRDs7O1dBRUQsd0JBQWMsQ0FBRTs7O1dBRWhCLGtCQUFTO0FBQUE7O0FBRVAsVUFBTUMsY0FBYyxHQUFHLEtBQUtwQyxLQUFMLENBQVdDLFlBQVgsQ0FBd0JvQyxHQUF4QixDQUE0QixVQUFDcEMsWUFBRCxFQUFlcUMsS0FBZixFQUF5QjtBQUMxRSw0QkFBTztBQUFLLGFBQUcsRUFBRUE7QUFBVixXQUFrQnJDLFlBQWxCLENBQVA7QUFDRCxPQUZzQixDQUF2QjtBQUlBeUIsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlTLGNBQVo7QUFFQSwwQkFDRTtBQUFLLFVBQUUsRUFBQztBQUFSLHNCQUNFO0FBQU0sVUFBRSxFQUFDLGVBQVQ7QUFBeUIsaUJBQVMsRUFBQztBQUFuQyxzQkFDRSx3Q0FERixlQUVFLDJDQUZGLGVBR0U7QUFBTyxZQUFJLEVBQUMsTUFBWjtBQUFtQixZQUFJLEVBQUM7QUFBeEIsUUFIRixlQUlFLDhDQUpGLGVBS0U7QUFBTyxZQUFJLEVBQUMsTUFBWjtBQUFtQixZQUFJLEVBQUM7QUFBeEIsUUFMRixlQU1FO0FBQVEsWUFBSSxFQUFDLFFBQWI7QUFBc0IsZUFBTyxFQUFFLGlCQUFDL0IsQ0FBRDtBQUFBLGlCQUFPLE1BQUksQ0FBQ0QsWUFBTCxDQUFrQkMsQ0FBbEIsQ0FBUDtBQUFBO0FBQS9CLGlCQU5GLENBREYsRUFVSStCLGNBVkosQ0FERjtBQWNEOzs7O0VBeEVpQkcsS0FBSyxDQUFDQzs7QUEyRTFCLGlFQUFlekMsS0FBZiIsInNvdXJjZXMiOlsid2VicGFjazovL3RyeXB0by8uL3NyYy9sb2dpbi1yZWdpc3Rlci1mdW5jdGlvbmFsaXRpZXMvTG9naW4uanN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4vc3R5bGVzL01ndFVzZXIuY3NzJyBcblxuY2xhc3MgTG9naW4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBub3RpZmljYXRpb246IFtdXG4gICAgfVxuICAgIHRoaXMuZnVuY3Rpb25uZWVkID0gdGhpcy5mdW5jdGlvbm5lZWQuYmluZCh0aGlzKVxuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKVxuICB9XG5cbiAgaGFuZGxlU3VibWl0KGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0LnBhcmVudE5vZGUpXG4gICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbnJlZ2lzdGVyXCIpLmVsZW1lbnRzKTtcbiAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2lucmVnaXN0ZXJcIikuZWxlbWVudHNbMF0udmFsdWUpXG4gICAgLy8gY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbnJlZ2lzdGVyXCIpLmVsZW1lbnRzWzFdLnZhbHVlKVxuXG4gICAgZmV0Y2goYCR7cHJvY2Vzcy5lbnYuUk9PVH0vdXNlcnMvbG9naW5gLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgZW1haWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5yZWdpc3RlclwiKS5lbGVtZW50c1swXS52YWx1ZSxcbiAgICAgICAgcGFzc3dvcmQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5yZWdpc3RlclwiKS5lbGVtZW50c1sxXS52YWx1ZSxcbiAgICAgIH0pXG4gICAgfSlcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcImFwaSByZXNzOiBcIiwgcmVzcG9uc2UpOyBcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKClcbiAgICB9KVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICAgIGlmKGRhdGEuc2VydmVyKXtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgJHtwcm9jZXNzLmVudi5ST09UfS9gO1xuICAgICAgfSBlbHNlIGlmKGRhdGEuZXJyb3Ipe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBub3RpZmljYXRpb246IGRhdGEuZXJyb3IubWVzc2FnZSxcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZyb250IGVuZCBkb2VzIG5vdCBzdXBwb3J0IHNlcnZlciByZXNwb25zZSBkYXRhIHN0cnVjdHVyZSwgd2hlbiBhcGkgY2FsbCBtYWRlIHRvIFBPU1QgL3VzZXJzL2xvZ2luLlxcbk11c3QgYmUgb2JqZWN0IHdpdGggZGF0YS5zZXJ2ZXIubWVzc2FnZSBvciBkYXRhLmVycm9yLm1lc3NhZ2VcIilcbiAgICAgIH1cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwic2VydmVyIHJlc3BvbnNlcyB3aXRoOiBcIiwgZGF0YSlcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb25uZWVkKCl7fVxuXG4gIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IG5vdGlmeURpc3BsYXlzID0gdGhpcy5zdGF0ZS5ub3RpZmljYXRpb24ubWFwKChub3RpZmljYXRpb24sIGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gPGRpdiBrZXk9e2luZGV4fT57bm90aWZpY2F0aW9ufTwvZGl2PlxuICAgIH0pXG5cbiAgICBjb25zb2xlLmxvZyhub3RpZnlEaXNwbGF5cylcbiAgICBcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBpZD1cImNvbnRhaW5lci1sb2ctcmVnXCI+XG4gICAgICAgIDxmb3JtIGlkPVwibG9naW5yZWdpc3RlclwiIGNsYXNzTmFtZT1cImZvcm1cIj5cbiAgICAgICAgICA8aDM+TG9naW48L2gzPlxuICAgICAgICAgIDxsYWJlbD5FbWFpbDwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImVtYWlsXCIvPiBcbiAgICAgICAgICA8bGFiZWw+UGFzc3dvcmQ8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJwYXNzd29yZFwiLz4gXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KGUpfT5Mb2dpbjwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIHsvKiBkaXNwbGF5IHRoZSBub3RpZmljYXRpb24gZnJvbSB0aGUgc2VydmVyIGhlcmUhICovfVxuICAgICAgICB7IG5vdGlmeURpc3BsYXlzIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9naW4iXSwibmFtZXMiOlsiTG9naW4iLCJzdGF0ZSIsIm5vdGlmaWNhdGlvbiIsImZ1bmN0aW9ubmVlZCIsImJpbmQiLCJoYW5kbGVTdWJtaXQiLCJlIiwicHJldmVudERlZmF1bHQiLCJmZXRjaCIsInByb2Nlc3MiLCJlbnYiLCJST09UIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZW1haWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZWxlbWVudHMiLCJ2YWx1ZSIsInBhc3N3b3JkIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwic2VydmVyIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiZXJyb3IiLCJzZXRTdGF0ZSIsIm1lc3NhZ2UiLCJFcnJvciIsIm5vdGlmeURpc3BsYXlzIiwibWFwIiwiaW5kZXgiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJzb3VyY2VSb290IjoiIn0=