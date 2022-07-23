"use strict";
(self["webpackChunktrypto"] = self["webpackChunktrypto"] || []).push([["src_login-register-functionalities_Profile_jsx"],{

/***/ "./src/login-register-functionalities/Profile.jsx":
/*!********************************************************!*\
  !*** ./src/login-register-functionalities/Profile.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _styles_MgtUser_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/MgtUser.css */ "./src/login-register-functionalities/styles/MgtUser.css");
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


var Profile = /*#__PURE__*/function (_React$Component) {
  _inherits(Profile, _React$Component);

  var _super = _createSuper(Profile);

  function Profile() {
    var _this;

    _classCallCheck(this, Profile);

    _this = _super.call(this);
    _this.state = {};
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Profile, [{
    key: "handleSubmit",
    value: function () {
      var _handleSubmit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
        var userId, response, srv_;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                userId = document.getElementById("userId").innerHTML;
                console.log("did it work?", userId);
                _context.next = 5;
                return fetch("".concat("http://localhost:3000", "/users/profile/delete/").concat(userId), {
                  method: 'DELETE' // headers: {
                  //   'Content-Type': 'application/json',
                  //   'Accept': 'application/json'
                  // },
                  // body: JSON.stringify({
                  //   email: document.getElementById("loginregister").elements[0].value,
                  //   password: document.getElementById("loginregister").elements[1].value,
                  // })

                });

              case 5:
                response = _context.sent;
                console.log(response);
                _context.next = 9;
                return response.json();

              case 9:
                srv_ = _context.sent;
                console.log(srv_);

                if (!(response.status === 200)) {
                  _context.next = 16;
                  break;
                }

                console.log("do we make it here?");
                window.location.href = "".concat("http://localhost:3000", "?popup=").concat(srv_.srv_);
                _context.next = 17;
                break;

              case 16:
                throw new Error("Server was unable to delete the account.");

              case 17:
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
      var _this2 = this;

      return /*#__PURE__*/React.createElement("div", {
        id: "container-log-reg"
      }, /*#__PURE__*/React.createElement("button", {
        type: "submit",
        onClick: function onClick(e) {
          return _this2.handleSubmit(e);
        }
      }, "Delete Account"));
    }
  }]);

  return Profile;
}(React.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Profile);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2xvZ2luLXJlZ2lzdGVyLWZ1bmN0aW9uYWxpdGllc19Qcm9maWxlX2pzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7SUFFTUE7Ozs7O0FBRUoscUJBQWE7QUFBQTs7QUFBQTs7QUFDWDtBQUNBLFVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBRUEsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCQyxJQUFsQiwrQkFBcEI7QUFKVztBQUtaOzs7OztrRkFFRCxpQkFBbUJDLENBQW5CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNFQSxnQkFBQUEsQ0FBQyxDQUFDQyxjQUFGO0FBQ01DLGdCQUFBQSxNQUZSLEdBRWlCQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0NDLFNBRm5EO0FBR0VDLGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxjQUFaLEVBQTRCTCxNQUE1QjtBQUhGO0FBQUEsdUJBS3lCTSxLQUFLLFdBQUlDLHVCQUFKLG1DQUE2Q1AsTUFBN0MsR0FBdUQ7QUFDakZVLGtCQUFBQSxNQUFNLEVBQUUsUUFEeUUsQ0FFakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFUaUYsaUJBQXZELENBTDlCOztBQUFBO0FBS1FDLGdCQUFBQSxRQUxSO0FBZ0JFUCxnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlNLFFBQVo7QUFoQkY7QUFBQSx1QkFrQnFCQSxRQUFRLENBQUNDLElBQVQsRUFsQnJCOztBQUFBO0FBa0JRQyxnQkFBQUEsSUFsQlI7QUFtQkVULGdCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWVEsSUFBWjs7QUFuQkYsc0JBcUJLRixRQUFRLENBQUNHLE1BQVQsS0FBb0IsR0FyQnpCO0FBQUE7QUFBQTtBQUFBOztBQXNCSVYsZ0JBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHFCQUFaO0FBQ0FVLGdCQUFBQSxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLElBQWhCLGFBQTBCVix1QkFBMUIsb0JBQW9ETSxJQUFJLENBQUNBLElBQXpEO0FBdkJKO0FBQUE7O0FBQUE7QUFBQSxzQkF5QlUsSUFBSUssS0FBSixDQUFVLDBDQUFWLENBekJWOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7O1dBOEJBLGtCQUFTO0FBQUE7O0FBQ1AsMEJBQ0U7QUFBSyxVQUFFLEVBQUM7QUFBUixzQkFDRTtBQUFRLFlBQUksRUFBQyxRQUFiO0FBQXNCLGVBQU8sRUFBRSxpQkFBQ3BCLENBQUQ7QUFBQSxpQkFBTyxNQUFJLENBQUNGLFlBQUwsQ0FBa0JFLENBQWxCLENBQVA7QUFBQTtBQUEvQiwwQkFERixDQURGO0FBS0Q7Ozs7RUE3Q21CcUIsS0FBSyxDQUFDQzs7QUFnRDVCLGlFQUFlMUIsT0FBZiIsInNvdXJjZXMiOlsid2VicGFjazovL3RyeXB0by8uL3NyYy9sb2dpbi1yZWdpc3Rlci1mdW5jdGlvbmFsaXRpZXMvUHJvZmlsZS5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAnLi9zdHlsZXMvTWd0VXNlci5jc3MnIFxuXG5jbGFzcyBQcm9maWxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHN1cGVyKClcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgIH1cbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCA9IHRoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcylcbiAgfVxuXG4gIGFzeW5jIGhhbmRsZVN1Ym1pdChlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCB1c2VySWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJJZFwiKS5pbm5lckhUTUxcbiAgICBjb25zb2xlLmxvZyhcImRpZCBpdCB3b3JrP1wiLCB1c2VySWQpXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52LlJPT1R9L3VzZXJzL3Byb2ZpbGUvZGVsZXRlLyR7dXNlcklkfWAsIHtcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAvLyBoZWFkZXJzOiB7XG4gICAgICAvLyAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAvLyAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIC8vIH0sXG4gICAgICAvLyBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAvLyAgIGVtYWlsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2lucmVnaXN0ZXJcIikuZWxlbWVudHNbMF0udmFsdWUsXG4gICAgICAvLyAgIHBhc3N3b3JkOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2lucmVnaXN0ZXJcIikuZWxlbWVudHNbMV0udmFsdWUsXG4gICAgICAvLyB9KVxuICAgIH0pXG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgXG4gICAgY29uc3Qgc3J2XyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgIGNvbnNvbGUubG9nKHNydl8pXG5cbiAgICBpZihyZXNwb25zZS5zdGF0dXMgPT09IDIwMCl7XG4gICAgICBjb25zb2xlLmxvZyhcImRvIHdlIG1ha2UgaXQgaGVyZT9cIilcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7cHJvY2Vzcy5lbnYuUk9PVH0/cG9wdXA9JHtzcnZfLnNydl99YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VydmVyIHdhcyB1bmFibGUgdG8gZGVsZXRlIHRoZSBhY2NvdW50LlwiKVxuICAgIH1cbiAgfVxuXG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGlkPVwiY29udGFpbmVyLWxvZy1yZWdcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgb25DbGljaz17KGUpID0+IHRoaXMuaGFuZGxlU3VibWl0KGUpfT5EZWxldGUgQWNjb3VudDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9maWxlIl0sIm5hbWVzIjpbIlByb2ZpbGUiLCJzdGF0ZSIsImhhbmRsZVN1Ym1pdCIsImJpbmQiLCJlIiwicHJldmVudERlZmF1bHQiLCJ1c2VySWQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwiY29uc29sZSIsImxvZyIsImZldGNoIiwicHJvY2VzcyIsImVudiIsIlJPT1QiLCJtZXRob2QiLCJyZXNwb25zZSIsImpzb24iLCJzcnZfIiwic3RhdHVzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiRXJyb3IiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJzb3VyY2VSb290IjoiIn0=