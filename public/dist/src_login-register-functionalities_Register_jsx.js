(self["webpackChunktrypto"] = self["webpackChunktrypto"] || []).push([["src_login-register-functionalities_Register_jsx"],{

/***/ "./full-stack-libs/validations.js":
/*!****************************************!*\
  !*** ./full-stack-libs/validations.js ***!
  \****************************************/
/***/ ((module) => {

function verifyEmail(_emailstr) {
  console.log("verifying this email: ", _emailstr);
  var emailRegularExpression = /(^[^@.]+)@([^@.]+)\.{1}(\w{1,6}$)/;
  var EmailVerif_status = emailRegularExpression.test(_emailstr); // const arrayReg = emailRegularExpression.exec(_emailstr)

  if (EmailVerif_status) {
    return {
      flag: true,
      notification: ['email format is proper: <name>@<email-provider>.<extention>']
    };
  } else {
    return {
      flag: false,
      notification: ['email format is invalid i.e not as such: <name>@<email-provider>.<extention>']
    };
  }
}

function verifyPassword(_password) {
  console.log("\n\nverifying this password: ", _password);
  var flag = undefined,
      notification = [];
  /\d/g.test(_password) ? null : notification = notification.concat("Your password must contain at least a digit [0-9]");
  /[A-Za-z]/g.test(_password) ? null : notification = notification.concat("Your password must contain at least an alphabet character [A-Za-z]");
  /[\[\]\+?.,|=`~!@:#";/$'>%<^&*(){_}-]/g.test(_password) ? null : notification = notification.concat("Your password must contain at least a special character: [@#!$%^&*()[]{}-_+/<'>;\":?.,|=`~]");
  !/\s/g.test(_password) ? null : notification = notification.concat("Your password cannot contain any spaces at any point");
  !(_password.length < 8) ? null : notification = notification.concat("Your password's length insufficient. Passwords require at least 7 characters");
  !(_password.length > 39) ? null : notification = notification.concat("Your password's length excessivly long. Passwords require to be less than 40 characters");
  !(_password.length === 0) ? null : notification = notification.concat("No password was inputed!");
  var _flag$notification = {
    flag: !notification.length,
    notification: notification.length === 0 ? ["password format is proper: respect\'s all conditions"] : notification
  };
  flag = _flag$notification.flag;
  notification = _flag$notification.notification;
  // console.log(flag, notification)
  return {
    flag: flag,
    notification: notification
  };
}

module.exports = {
  verifyEmail: verifyEmail,
  verifyPassword: verifyPassword
};

/***/ }),

/***/ "./src/login-register-functionalities/Register.jsx":
/*!*********************************************************!*\
  !*** ./src/login-register-functionalities/Register.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _styles_MgtUser_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/MgtUser.css */ "./src/login-register-functionalities/styles/MgtUser.css");
/* harmony import */ var _full_stack_libs_validations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../full-stack-libs/validations */ "./full-stack-libs/validations.js");
/* harmony import */ var _full_stack_libs_validations__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_full_stack_libs_validations__WEBPACK_IMPORTED_MODULE_2__);
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

function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume(key === "return" ? "return" : "next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

_AsyncGenerator.prototype[typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"] = function () { return this; };

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }





var Register = /*#__PURE__*/function (_React$Component) {
  _inherits(Register, _React$Component);

  var _super = _createSuper(Register);

  function Register() {
    var _this2;

    _classCallCheck(this, Register);

    _this2 = _super.call(this);
    _this2.state = {
      notification: []
    };
    _this2.handleValidation = _this2.handleValidation.bind(_assertThisInitialized(_this2));
    _this2.handleRegistrationCall = _this2.handleRegistrationCall.bind(_assertThisInitialized(_this2));
    return _this2;
  } //generator function


  _createClass(Register, [{
    key: "handleValidation",
    value: function handleValidation(e) {
      var _this = this;

      return _wrapAsyncGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var email, password, flag, notification, _verifyEmail, _verifyPassword, _yield$_awaitAsyncGen;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                email = document.getElementById("loginregister").elements[0].value;
                password = document.getElementById("loginregister").elements[1].value;
                notification = []; // console.log(e.target.parentNode)
                // console.log(document.getElementById("loginregister").elements);
                // console.log(email)
                // console.log(password)
                // Destructuring and assigning 

                _verifyEmail = (0,_full_stack_libs_validations__WEBPACK_IMPORTED_MODULE_2__.verifyEmail)(email);
                flag = _verifyEmail.flag;
                notification = _verifyEmail.notification;
                console.log("after verifyEmail: ", flag, notification);

                if (flag) {
                  _context.next = 15;
                  break;
                }

                // set the state of the notification to tell the user "Hey user email not good!"
                _this.setState({
                  notification: notification
                });

                console.log("Hey user email not good!"); // yield to end process

                _context.next = 13;
                return {
                  yield_level: 1,
                  number_of_max_yield_levels: 3,
                  inProcessChecking: "email",
                  message: notification
                };

              case 13:
                _context.next = 36;
                break;

              case 15:
                // set the state of the notification to tell component "Good email"
                console.log("Hey component email good!"); // proceed to check the password

                _verifyPassword = (0,_full_stack_libs_validations__WEBPACK_IMPORTED_MODULE_2__.verifyPassword)(password);
                flag = _verifyPassword.flag;
                notification = _verifyPassword.notification;
                console.log("after verifyPassword: ", flag, notification);

                if (flag) {
                  _context.next = 27;
                  break;
                }

                // set the state of the notification to tell User "Hey user password not Good"
                _this.setState({
                  notification: notification
                });

                console.log("Hey user password not Good"); // yield to end process

                _context.next = 25;
                return {
                  yield_level: 2,
                  number_of_max_yield_levels: 3,
                  inProcessChecking: "password",
                  message: notification
                };

              case 25:
                _context.next = 36;
                break;

              case 27:
                // finish and return
                // set the state of the notification to tell component "Good password"
                console.log("Hey component password good!"); // proceed to make api call this.handleRegistration(email, password)
                // returns new flag, message

                _context.next = 30;
                return _awaitAsyncGenerator(_this.handleRegistrationCall(email, password));

              case 30:
                _yield$_awaitAsyncGen = _context.sent;
                flag = _yield$_awaitAsyncGen.flag;
                notification = _yield$_awaitAsyncGen.notification;
                console.log("\n\nAfter API call, we are left with: ", flag, notification);

                if (!flag) {
                  // set the state of the notification to tell the user <message>
                  _this.setState({
                    notification: notification
                  });

                  console.log("Hey component the server failed"); // yield the final return to end process with server error notification
                  // return {yield_level: 3, number_of_max_yield_levels: 3, inProcessChecking: "POST /users/register endpoint", message: notification}
                } else {
                  // TODO
                  // post or get(query string) the message/notification then serve it from the server, have it as a pop up if you want
                  _this.constructor();

                  window.location.href = "".concat("http://localhost:3000", "/");
                }

                return _context.abrupt("return", {
                  yield_level: 3,
                  number_of_max_yield_levels: 3,
                  inProcessChecking: "POST /users/register endpoint",
                  message: notification
                });

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }, {
    key: "handleRegistrationCall",
    value: function () {
      var _handleRegistrationCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_email, _password) {
        var response, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log("Making API call!");
                _context2.next = 3;
                return fetch("".concat("http://localhost:3000", "/users/register"), {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify({
                    email: _email,
                    password: _password
                  })
                });

              case 3:
                response = _context2.sent;
                _context2.next = 6;
                return response.json();

              case 6:
                data = _context2.sent;
                _context2.t0 = response.status;
                _context2.next = _context2.t0 === 200 ? 10 : _context2.t0 === 500 ? 11 : 12;
                break;

              case 10:
                return _context2.abrupt("return", {
                  flag: true,
                  notification: data.server.message
                });

              case 11:
                return _context2.abrupt("return", {
                  flag: false,
                  notification: data.error.message
                });

              case 12:
                return _context2.abrupt("break", 13);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function handleRegistrationCall(_x, _x2) {
        return _handleRegistrationCall.apply(this, arguments);
      }

      return handleRegistrationCall;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state$notificat,
          _this3 = this;

      var notifyDisplays = (_this$state$notificat = this.state.notification) === null || _this$state$notificat === void 0 ? void 0 : _this$state$notificat.map(function (notification, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          key: index
        }, notification);
      });
      console.log(notifyDisplays);
      return (
        /*#__PURE__*/
        // Template out this code
        react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
          id: "container-log-reg"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", {
          id: "loginregister",
          className: "form"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", null, "Register React"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Email"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
          type: "text",
          name: "email"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", null, "Password"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("input", {
          type: "password",
          name: "password"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
          type: "submit",
          onClick: /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
              var gen, val;
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      gen = _this3.handleValidation(e);
                      _context3.next = 3;
                      return gen.next();

                    case 3:
                      val = _context3.sent;
                      // await gen.next()
                      console.log("Returned val on button click statements\nAfter let val = await gen.next()\n", val); // console.log("Returned val on button click statements\nAfter await gen.next()\n", gen)

                    case 5:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            }));

            return function (_x3) {
              return _ref.apply(this, arguments);
            };
          }()
        }, "Register")), notifyDisplays)
      );
    }
  }]);

  return Register;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Register);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2xvZ2luLXJlZ2lzdGVyLWZ1bmN0aW9uYWxpdGllc19SZWdpc3Rlcl9qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxTQUFTQSxXQUFULENBQXFCQyxTQUFyQixFQUErQjtBQUM3QkMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQVosRUFBc0NGLFNBQXRDO0FBQ0EsTUFBTUcsc0JBQXNCLEdBQUcsbUNBQS9CO0FBQ0EsTUFBTUMsaUJBQWlCLEdBQUdELHNCQUFzQixDQUFDRSxJQUF2QixDQUE0QkwsU0FBNUIsQ0FBMUIsQ0FINkIsQ0FJN0I7O0FBRUEsTUFBSUksaUJBQUosRUFBdUI7QUFDckIsV0FBTztBQUNMRSxNQUFBQSxJQUFJLEVBQUUsSUFERDtBQUVMQyxNQUFBQSxZQUFZLEVBQUUsQ0FBQyw2REFBRDtBQUZULEtBQVA7QUFJRCxHQUxELE1BS087QUFDTCxXQUFPO0FBQ0xELE1BQUFBLElBQUksRUFBRSxLQUREO0FBRUxDLE1BQUFBLFlBQVksRUFBRSxDQUFDLDhFQUFEO0FBRlQsS0FBUDtBQUlEO0FBQ0Y7O0FBRUQsU0FBU0MsY0FBVCxDQUF3QkMsU0FBeEIsRUFBa0M7QUFDaENSLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLCtCQUFaLEVBQTZDTyxTQUE3QztBQUNBLE1BQUlILElBQUksR0FBR0ksU0FBWDtBQUFBLE1BQXNCSCxZQUFZLEdBQUcsRUFBckM7QUFFQyxPQUFELENBQVFGLElBQVIsQ0FBYUksU0FBYixJQUF5QixJQUF6QixHQUFnQ0YsWUFBWSxHQUFHQSxZQUFZLENBQUNJLE1BQWIsQ0FBb0IsbURBQXBCLENBQS9DO0FBQ0MsYUFBRCxDQUFjTixJQUFkLENBQW1CSSxTQUFuQixJQUErQixJQUEvQixHQUFzQ0YsWUFBWSxHQUFHQSxZQUFZLENBQUNJLE1BQWIsQ0FBb0Isb0VBQXBCLENBQXJEO0FBQ0MseUNBQUQsQ0FBMENOLElBQTFDLENBQStDSSxTQUEvQyxJQUEyRCxJQUEzRCxHQUFrRUYsWUFBWSxHQUFH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QUFJLEVBQUM7QUFBeEIsVUFIRixlQUlFLDJFQUpGLGVBS0U7QUFBTyxjQUFJLEVBQUMsVUFBWjtBQUF1QixjQUFJLEVBQUM7QUFBNUIsVUFMRixlQU1FO0FBQVEsY0FBSSxFQUFDLFFBQWI7QUFDQSxpQkFBTztBQUFBLCtFQUNMLGtCQUFPakMsQ0FBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTW9DLHNCQUFBQSxHQUROLEdBQ1ksTUFBSSxDQUFDdkMsZ0JBQUwsQ0FBc0JHLENBQXRCLENBRFo7QUFBQTtBQUFBLDZCQUVrQm9DLEdBQUcsQ0FBQ0MsSUFBSixFQUZsQjs7QUFBQTtBQUVNQyxzQkFBQUEsR0FGTjtBQUdFO0FBQ0ExRCxzQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksNkVBQVosRUFBMkZ5RCxHQUEzRixFQUpGLENBS0U7O0FBTEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFESzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURQLHNCQU5GLENBREYsRUFtQklMLGNBbkJKO0FBRkY7QUF3QkQ7Ozs7RUEvSW9CdkM7O0FBa0p2QixpRUFBZUMsUUFBZiIsInNvdXJjZXMiOlsid2VicGFjazovL3RyeXB0by8uL2Z1bGwtc3RhY2stbGlicy92YWxpZGF0aW9ucy5qcyIsIndlYnBhY2s6Ly90cnlwdG8vLi9zcmMvbG9naW4tcmVnaXN0ZXItZnVuY3Rpb25hbGl0aWVzL1JlZ2lzdGVyLmpzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiB2ZXJpZnlFbWFpbChfZW1haWxzdHIpe1xuICBjb25zb2xlLmxvZyhcInZlcmlmeWluZyB0aGlzIGVtYWlsOiBcIiwgX2VtYWlsc3RyKTtcbiAgY29uc3QgZW1haWxSZWd1bGFyRXhwcmVzc2lvbiA9IC8oXlteQC5dKylAKFteQC5dKylcXC57MX0oXFx3ezEsNn0kKS87XG4gIGNvbnN0IEVtYWlsVmVyaWZfc3RhdHVzID0gZW1haWxSZWd1bGFyRXhwcmVzc2lvbi50ZXN0KF9lbWFpbHN0cikgXG4gIC8vIGNvbnN0IGFycmF5UmVnID0gZW1haWxSZWd1bGFyRXhwcmVzc2lvbi5leGVjKF9lbWFpbHN0cilcbiAgXG4gIGlmIChFbWFpbFZlcmlmX3N0YXR1cykge1xuICAgIHJldHVybiB7XG4gICAgICBmbGFnOiB0cnVlLFxuICAgICAgbm90aWZpY2F0aW9uOiBbJ2VtYWlsIGZvcm1hdCBpcyBwcm9wZXI6IDxuYW1lPkA8ZW1haWwtcHJvdmlkZXI+LjxleHRlbnRpb24+J11cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZsYWc6IGZhbHNlLFxuICAgICAgbm90aWZpY2F0aW9uOiBbJ2VtYWlsIGZvcm1hdCBpcyBpbnZhbGlkIGkuZSBub3QgYXMgc3VjaDogPG5hbWU+QDxlbWFpbC1wcm92aWRlcj4uPGV4dGVudGlvbj4nXVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB2ZXJpZnlQYXNzd29yZChfcGFzc3dvcmQpe1xuICBjb25zb2xlLmxvZyhcIlxcblxcbnZlcmlmeWluZyB0aGlzIHBhc3N3b3JkOiBcIiwgX3Bhc3N3b3JkKVxuICBsZXQgZmxhZyA9IHVuZGVmaW5lZCwgbm90aWZpY2F0aW9uID0gW107XG5cbiAgKC9cXGQvZykudGVzdChfcGFzc3dvcmQpPyBudWxsIDogbm90aWZpY2F0aW9uID0gbm90aWZpY2F0aW9uLmNvbmNhdChcIllvdXIgcGFzc3dvcmQgbXVzdCBjb250YWluIGF0IGxlYXN0IGEgZGlnaXQgWzAtOV1cIik7XG4gICgvW0EtWmEtel0vZykudGVzdChfcGFzc3dvcmQpPyBudWxsIDogbm90aWZpY2F0aW9uID0gbm90aWZpY2F0aW9uLmNvbmNhdChcIllvdXIgcGFzc3dvcmQgbXVzdCBjb250YWluIGF0IGxlYXN0IGFuIGFscGhhYmV0IGNoYXJhY3RlciBbQS1aYS16XVwiKTtcbiAgKC9bXFxbXFxdXFwrPy4sfD1gfiFAOiNcIjsvJCc+JTxeJiooKXtffS1dL2cpLnRlc3QoX3Bhc3N3b3JkKT8gbnVsbCA6IG5vdGlmaWNhdGlvbiA9IG5vdGlmaWNhdGlvbi5jb25jYXQoXCJZb3VyIHBhc3N3b3JkIG11c3QgY29udGFpbiBhdCBsZWFzdCBhIHNwZWNpYWwgY2hhcmFjdGVyOiBbQCMhJCVeJiooKVtde30tXysvPCc+O1xcXCI6Py4sfD1gfl1cIik7XG4gICEoL1xccy9nKS50ZXN0KF9wYXNzd29yZCk/IG51bGwgOiBub3RpZmljYXRpb24gPSBub3RpZmljYXRpb24uY29uY2F0KFwiWW91ciBwYXNzd29yZCBjYW5ub3QgY29udGFpbiBhbnkgc3BhY2VzIGF0IGFueSBwb2ludFwiKTtcbiAgIShfcGFzc3dvcmQubGVuZ3RoIDwgOCkgPyBudWxsOiBub3RpZmljYXRpb24gPSBub3RpZmljYXRpb24uY29uY2F0KFwiWW91ciBwYXNzd29yZCdzIGxlbmd0aCBpbnN1ZmZpY2llbnQuIFBhc3N3b3JkcyByZXF1aXJlIGF0IGxlYXN0IDcgY2hhcmFjdGVyc1wiKTtcbiAgIShfcGFzc3dvcmQubGVuZ3RoID4gMzkpID8gbnVsbDogbm90aWZpY2F0aW9uID0gbm90aWZpY2F0aW9uLmNvbmNhdChcIllvdXIgcGFzc3dvcmQncyBsZW5ndGggZXhjZXNzaXZseSBsb25nLiBQYXNzd29yZHMgcmVxdWlyZSB0byBiZSBsZXNzIHRoYW4gNDAgY2hhcmFjdGVyc1wiKTtcbiAgIShfcGFzc3dvcmQubGVuZ3RoID09PSAwKSA/IG51bGw6IG5vdGlmaWNhdGlvbiA9IG5vdGlmaWNhdGlvbi5jb25jYXQoXCJObyBwYXNzd29yZCB3YXMgaW5wdXRlZCFcIik7XG5cbiAgKHtmbGFnLCBub3RpZmljYXRpb259ID0gIHtmbGFnOiAhbm90aWZpY2F0aW9uLmxlbmd0aCwgbm90aWZpY2F0aW9uOiBub3RpZmljYXRpb24ubGVuZ3RoID09PSAwPyBbXCJwYXNzd29yZCBmb3JtYXQgaXMgcHJvcGVyOiByZXNwZWN0XFwncyBhbGwgY29uZGl0aW9uc1wiXTpub3RpZmljYXRpb259KVxuICAvLyBjb25zb2xlLmxvZyhmbGFnLCBub3RpZmljYXRpb24pXG4gIFxuICByZXR1cm4ge2ZsYWcsIG5vdGlmaWNhdGlvbn1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9ICB7dmVyaWZ5RW1haWwsIHZlcmlmeVBhc3N3b3JkfSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJy4vc3R5bGVzL01ndFVzZXIuY3NzJyBcbmltcG9ydCB7dmVyaWZ5RW1haWwsIHZlcmlmeVBhc3N3b3JkfSBmcm9tICcuLi8uLi9mdWxsLXN0YWNrLWxpYnMvdmFsaWRhdGlvbnMnXG5cblxuXG5jbGFzcyBSZWdpc3RlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5vdGlmaWNhdGlvbjogW11cbiAgICB9XG4gICAgdGhpcy5oYW5kbGVWYWxpZGF0aW9uID0gdGhpcy5oYW5kbGVWYWxpZGF0aW9uLmJpbmQodGhpcylcbiAgICB0aGlzLmhhbmRsZVJlZ2lzdHJhdGlvbkNhbGwgPSB0aGlzLmhhbmRsZVJlZ2lzdHJhdGlvbkNhbGwuYmluZCh0aGlzKVxuICB9XG5cbiAgLy9nZW5lcmF0b3IgZnVuY3Rpb25cbiAgYXN5bmMgKmhhbmRsZVZhbGlkYXRpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2lucmVnaXN0ZXJcIikuZWxlbWVudHNbMF0udmFsdWVcbiAgICBjb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5yZWdpc3RlclwiKS5lbGVtZW50c1sxXS52YWx1ZVxuICAgIGxldCBmbGFnLCBub3RpZmljYXRpb24gPSBbXTtcbiAgICAvLyBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlKVxuICAgIC8vIGNvbnNvbGUubG9nKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5yZWdpc3RlclwiKS5lbGVtZW50cyk7XG4gICAgLy8gY29uc29sZS5sb2coZW1haWwpXG4gICAgLy8gY29uc29sZS5sb2cocGFzc3dvcmQpXG5cblxuICAgIC8vIERlc3RydWN0dXJpbmcgYW5kIGFzc2lnbmluZyBcbiAgICAoe2ZsYWcsIG5vdGlmaWNhdGlvbn0gPSB2ZXJpZnlFbWFpbChlbWFpbCkpXG4gICAgY29uc29sZS5sb2coXCJhZnRlciB2ZXJpZnlFbWFpbDogXCIsIGZsYWcsIG5vdGlmaWNhdGlvbikgICAgXG4gICAgaWYoIWZsYWcpIHtcbiAgICAgIC8vIHNldCB0aGUgc3RhdGUgb2YgdGhlIG5vdGlmaWNhdGlvbiB0byB0ZWxsIHRoZSB1c2VyIFwiSGV5IHVzZXIgZW1haWwgbm90IGdvb2QhXCJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbjogbm90aWZpY2F0aW9ufSlcbiAgICAgIGNvbnNvbGUubG9nKFwiSGV5IHVzZXIgZW1haWwgbm90IGdvb2QhXCIpO1xuICAgICAgLy8geWllbGQgdG8gZW5kIHByb2Nlc3NcbiAgICAgIHlpZWxkIHt5aWVsZF9sZXZlbDogMSwgbnVtYmVyX29mX21heF95aWVsZF9sZXZlbHM6IDMsIGluUHJvY2Vzc0NoZWNraW5nOiBcImVtYWlsXCIsIG1lc3NhZ2U6IG5vdGlmaWNhdGlvbn1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2V0IHRoZSBzdGF0ZSBvZiB0aGUgbm90aWZpY2F0aW9uIHRvIHRlbGwgY29tcG9uZW50IFwiR29vZCBlbWFpbFwiXG4gICAgICBjb25zb2xlLmxvZyhcIkhleSBjb21wb25lbnQgZW1haWwgZ29vZCFcIik7XG4gICAgICAvLyBwcm9jZWVkIHRvIGNoZWNrIHRoZSBwYXNzd29yZFxuICAgICAgXG4gICAgICAoe2ZsYWcsIG5vdGlmaWNhdGlvbn0gPSB2ZXJpZnlQYXNzd29yZChwYXNzd29yZCkpXG4gICAgICBjb25zb2xlLmxvZyhcImFmdGVyIHZlcmlmeVBhc3N3b3JkOiBcIiwgZmxhZywgbm90aWZpY2F0aW9uKTtcbiAgICAgIGlmKCFmbGFnKSB7XG4gICAgICAgIC8vIHNldCB0aGUgc3RhdGUgb2YgdGhlIG5vdGlmaWNhdGlvbiB0byB0ZWxsIFVzZXIgXCJIZXkgdXNlciBwYXNzd29yZCBub3QgR29vZFwiXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe25vdGlmaWNhdGlvbjogbm90aWZpY2F0aW9ufSlcbiAgICAgICAgY29uc29sZS5sb2coXCJIZXkgdXNlciBwYXNzd29yZCBub3QgR29vZFwiKTtcbiAgICAgICAgLy8geWllbGQgdG8gZW5kIHByb2Nlc3NcbiAgICAgICAgeWllbGQge3lpZWxkX2xldmVsOiAyLCBudW1iZXJfb2ZfbWF4X3lpZWxkX2xldmVsczogMywgaW5Qcm9jZXNzQ2hlY2tpbmc6IFwicGFzc3dvcmRcIiwgbWVzc2FnZTogbm90aWZpY2F0aW9ufVxuICAgICAgfSBlbHNlIHsgLy8gZmluaXNoIGFuZCByZXR1cm5cbiAgICAgICAgLy8gc2V0IHRoZSBzdGF0ZSBvZiB0aGUgbm90aWZpY2F0aW9uIHRvIHRlbGwgY29tcG9uZW50IFwiR29vZCBwYXNzd29yZFwiXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGV5IGNvbXBvbmVudCBwYXNzd29yZCBnb29kIVwiKTtcbiAgICAgICAgLy8gcHJvY2VlZCB0byBtYWtlIGFwaSBjYWxsIHRoaXMuaGFuZGxlUmVnaXN0cmF0aW9uKGVtYWlsLCBwYXNzd29yZClcbiAgICAgICAgLy8gcmV0dXJucyBuZXcgZmxhZywgbWVzc2FnZVxuICAgICAgICAoe2ZsYWcsIG5vdGlmaWNhdGlvbn0gPSBhd2FpdCB0aGlzLmhhbmRsZVJlZ2lzdHJhdGlvbkNhbGwoZW1haWwsIHBhc3N3b3JkKSlcbiAgICAgICAgY29uc29sZS5sb2coXCJcXG5cXG5BZnRlciBBUEkgY2FsbCwgd2UgYXJlIGxlZnQgd2l0aDogXCIsIGZsYWcsIG5vdGlmaWNhdGlvbilcbiAgICAgICAgaWYoIWZsYWcpIHtcbiAgICAgICAgICAvLyBzZXQgdGhlIHN0YXRlIG9mIHRoZSBub3RpZmljYXRpb24gdG8gdGVsbCB0aGUgdXNlciA8bWVzc2FnZT5cbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtub3RpZmljYXRpb246IG5vdGlmaWNhdGlvbn0pXG4gICAgICAgICAgY29uc29sZS5sb2coXCJIZXkgY29tcG9uZW50IHRoZSBzZXJ2ZXIgZmFpbGVkXCIpXG4gICAgICAgICAgLy8geWllbGQgdGhlIGZpbmFsIHJldHVybiB0byBlbmQgcHJvY2VzcyB3aXRoIHNlcnZlciBlcnJvciBub3RpZmljYXRpb25cbiAgICAgICAgICAvLyByZXR1cm4ge3lpZWxkX2xldmVsOiAzLCBudW1iZXJfb2ZfbWF4X3lpZWxkX2xldmVsczogMywgaW5Qcm9jZXNzQ2hlY2tpbmc6IFwiUE9TVCAvdXNlcnMvcmVnaXN0ZXIgZW5kcG9pbnRcIiwgbWVzc2FnZTogbm90aWZpY2F0aW9ufVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAvLyBwb3N0IG9yIGdldChxdWVyeSBzdHJpbmcpIHRoZSBtZXNzYWdlL25vdGlmaWNhdGlvbiB0aGVuIHNlcnZlIGl0IGZyb20gdGhlIHNlcnZlciwgaGF2ZSBpdCBhcyBhIHBvcCB1cCBpZiB5b3Ugd2FudFxuICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IoKVxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYCR7cHJvY2Vzcy5lbnYuUk9PVH0vYDtcblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7eWllbGRfbGV2ZWw6IDMsIG51bWJlcl9vZl9tYXhfeWllbGRfbGV2ZWxzOiAzLCBpblByb2Nlc3NDaGVja2luZzogXCJQT1NUIC91c2Vycy9yZWdpc3RlciBlbmRwb2ludFwiLCBtZXNzYWdlOiBub3RpZmljYXRpb259XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaGFuZGxlUmVnaXN0cmF0aW9uQ2FsbCAoX2VtYWlsLCBfcGFzc3dvcmQpe1xuICAgIGNvbnNvbGUubG9nKFwiTWFraW5nIEFQSSBjYWxsIVwiKVxuICAgIFxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7cHJvY2Vzcy5lbnYuUk9PVH0vdXNlcnMvcmVnaXN0ZXJgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgZW1haWw6IF9lbWFpbCxcbiAgICAgICAgcGFzc3dvcmQ6IF9wYXNzd29yZCxcbiAgICAgIH0pXG4gICAgfSlcbiAgIFxuICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgLy8gY29uc29sZS5sb2coZGF0YSlcblxuICAgIHN3aXRjaCAocmVzcG9uc2Uuc3RhdHVzKSB7XG4gICAgICBjYXNlIDIwMDpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBmbGFnOiB0cnVlLFxuICAgICAgICAgIG5vdGlmaWNhdGlvbjogZGF0YS5zZXJ2ZXIubWVzc2FnZVxuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZSBwYWdlIG5vdGlmaWNhdGlvblxuICAgICAgY2FzZSA1MDA6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZmxhZzogZmFsc2UsXG4gICAgICAgICAgbm90aWZpY2F0aW9uOiBkYXRhLmVycm9yLm1lc3NhZ2VcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIGZpbmFsWWllbGQgYSBmbGFnIGFuZCB0aGVuIHJldHVybiB0aGUgY2FsbGluZyBmdW5jdGlvbiAqaGFuZGxlVmFsaWRhdGlvbihlKSB3aXRoIHRoaXMgc3RyaW5nIGAke3JldHVybmVkIG1lc3NhZ2V9YFxuICB9XG5cbiAgXG5cblxuXG4gIHJlbmRlcigpIHtcblxuICAgIGNvbnN0IG5vdGlmeURpc3BsYXlzID0gdGhpcy5zdGF0ZS5ub3RpZmljYXRpb24/Lm1hcCgobm90aWZpY2F0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH0+e25vdGlmaWNhdGlvbn08L2Rpdj5cbiAgICB9KVxuXG4gICAgY29uc29sZS5sb2cobm90aWZ5RGlzcGxheXMpXG4gICAgXG4gICAgcmV0dXJuIChcbiAgICAgIC8vIFRlbXBsYXRlIG91dCB0aGlzIGNvZGVcbiAgICAgIDxkaXYgaWQ9XCJjb250YWluZXItbG9nLXJlZ1wiPlxuICAgICAgICA8Zm9ybSBpZD1cImxvZ2lucmVnaXN0ZXJcIiBjbGFzc05hbWU9XCJmb3JtXCI+XG4gICAgICAgICAgPGgzPlJlZ2lzdGVyIFJlYWN0PC9oMz5cbiAgICAgICAgICA8bGFiZWw+RW1haWw8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJlbWFpbFwiLz4gXG4gICAgICAgICAgPGxhYmVsPlBhc3N3b3JkPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cInBhc3N3b3JkXCIvPiBcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBcbiAgICAgICAgICBvbkNsaWNrPXtcbiAgICAgICAgICAgIGFzeW5jIChlKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBnZW4gPSB0aGlzLmhhbmRsZVZhbGlkYXRpb24oZSlcbiAgICAgICAgICAgICAgbGV0IHZhbCA9IGF3YWl0IGdlbi5uZXh0KClcbiAgICAgICAgICAgICAgLy8gYXdhaXQgZ2VuLm5leHQoKVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJldHVybmVkIHZhbCBvbiBidXR0b24gY2xpY2sgc3RhdGVtZW50c1xcbkFmdGVyIGxldCB2YWwgPSBhd2FpdCBnZW4ubmV4dCgpXFxuXCIsIHZhbClcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJSZXR1cm5lZCB2YWwgb24gYnV0dG9uIGNsaWNrIHN0YXRlbWVudHNcXG5BZnRlciBhd2FpdCBnZW4ubmV4dCgpXFxuXCIsIGdlbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9PlJlZ2lzdGVyPC9idXR0b24+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgICAgey8qIGRpc3BsYXkgdGhlIG5vdGlmaWNhdGlvbiBmcm9tIHRoZSBzZXJ2ZXIgaGVyZSEgKi99XG4gICAgICAgIHsgbm90aWZ5RGlzcGxheXMgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWdpc3RlciJdLCJuYW1lcyI6WyJ2ZXJpZnlFbWFpbCIsIl9lbWFpbHN0ciIsImNvbnNvbGUiLCJsb2ciLCJlbWFpbFJlZ3VsYXJFeHByZXNzaW9uIiwiRW1haWxWZXJpZl9zdGF0dXMiLCJ0ZXN0IiwiZmxhZyIsIm5vdGlmaWNhdGlvbiIsInZlcmlmeVBhc3N3b3JkIiwiX3Bhc3N3b3JkIiwidW5kZWZpbmVkIiwiY29uY2F0IiwibGVuZ3RoIiwibW9kdWxlIiwiZXhwb3J0cyIsIlJlYWN0IiwiUmVnaXN0ZXIiLCJzdGF0ZSIsImhhbmRsZVZhbGlkYXRpb24iLCJiaW5kIiwiaGFuZGxlUmVnaXN0cmF0aW9uQ2FsbCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImVtYWlsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVsZW1lbnRzIiwidmFsdWUiLCJwYXNzd29yZCIsInNldFN0YXRlIiwieWllbGRfbGV2ZWwiLCJudW1iZXJfb2ZfbWF4X3lpZWxkX2xldmVscyIsImluUHJvY2Vzc0NoZWNraW5nIiwibWVzc2FnZSIsImNvbnN0cnVjdG9yIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwicHJvY2VzcyIsImVudiIsIlJPT1QiLCJfZW1haWwiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJzdGF0dXMiLCJzZXJ2ZXIiLCJlcnJvciIsIm5vdGlmeURpc3BsYXlzIiwibWFwIiwiaW5kZXgiLCJnZW4iLCJuZXh0IiwidmFsIiwiQ29tcG9uZW50Il0sInNvdXJjZVJvb3QiOiIifQ==