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
/* harmony import */ var _styles_MgtUser_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/MgtUser.css */ "./src/login-register-functionalities/styles/MgtUser.css");
/* harmony import */ var _full_stack_libs_validations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../full-stack-libs/validations */ "./full-stack-libs/validations.js");
/* harmony import */ var _full_stack_libs_validations__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_full_stack_libs_validations__WEBPACK_IMPORTED_MODULE_1__);
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

// import React from 'react';



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

                _verifyEmail = (0,_full_stack_libs_validations__WEBPACK_IMPORTED_MODULE_1__.verifyEmail)(email);
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

                _verifyPassword = (0,_full_stack_libs_validations__WEBPACK_IMPORTED_MODULE_1__.verifyPassword)(password);
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
        return /*#__PURE__*/React.createElement("div", {
          key: index
        }, notification);
      });
      console.log(notifyDisplays);
      return (
        /*#__PURE__*/
        // Template out this code
        React.createElement("div", {
          id: "container-log-reg"
        }, /*#__PURE__*/React.createElement("form", {
          id: "loginregister",
          className: "form"
        }, /*#__PURE__*/React.createElement("h3", null, "Register React"), /*#__PURE__*/React.createElement("label", null, "Email"), /*#__PURE__*/React.createElement("input", {
          type: "text",
          name: "email"
        }), /*#__PURE__*/React.createElement("label", null, "Password"), /*#__PURE__*/React.createElement("input", {
          type: "password",
          name: "password"
        }), /*#__PURE__*/React.createElement("button", {
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
}(React.Component);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Register);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2xvZ2luLXJlZ2lzdGVyLWZ1bmN0aW9uYWxpdGllc19SZWdpc3Rlcl9qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxTQUFTQSxXQUFULENBQXFCQyxTQUFyQixFQUErQjtBQUM3QkMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksd0JBQVosRUFBc0NGLFNBQXRDO0FBQ0EsTUFBTUcsc0JBQXNCLEdBQUcsbUNBQS9CO0FBQ0EsTUFBTUMsaUJBQWlCLEdBQUdELHNCQUFzQixDQUFDRSxJQUF2QixDQUE0QkwsU0FBNUIsQ0FBMUIsQ0FINkIsQ0FJN0I7O0FBRUEsTUFBSUksaUJBQUosRUFBdUI7QUFDckIsV0FBTztBQUNMRSxNQUFBQSxJQUFJLEVBQUUsSUFERDtBQUVMQyxNQUFBQSxZQUFZLEVBQUUsQ0FBQyw2REFBRDtBQUZULEtBQVA7QUFJRCxHQUxELE1BS087QUFDTCxXQUFPO0FBQ0xELE1BQUFBLElBQUksRUFBRSxLQUREO0FBRUxDLE1BQUFBLFlBQVksRUFBRSxDQUFDLDhFQUFEO0FBRlQsS0FBUDtBQUlEO0FBQ0Y7O0FBRUQsU0FBU0MsY0FBVCxDQUF3QkMsU0FBeEIsRUFBa0M7QUFDaENSLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLCtCQUFaLEVBQTZDTyxTQUE3QztBQUNBLE1BQUlILElBQUksR0FBR0ksU0FBWDtBQUFBLE1BQXNCSCxZQUFZLEdBQUcsRUFBckM7QUFFQyxPQUFELENBQVFGLElBQVIsQ0FBYUksU0FBYixJQUF5QixJQUF6QixHQUFnQ0YsWUFBWSxHQUFHQSxZQUFZLENBQUNJLE1BQWIsQ0FBb0IsbURBQXBCLENBQS9DO0FBQ0MsYUFBRCxDQUFjTixJQUFkLENBQW1CSSxTQUFuQixJQUErQixJQUEvQixHQUFzQ0YsWUFBWSxHQUFHQSxZQUFZLENBQUNJLE1BQWIsQ0FBb0Isb0VBQXBCLENBQXJEO0FBQ0MseUNBQUQsQ0FBMENOLElBQTFDLENBQStDSSxTQUEvQyxJQUEyRCxJQUEzRCxHQUFrRUYsWUFBWSxHQUFH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QUksRUFBQztBQUF4QixVQUhGLGVBSUUsOENBSkYsZUFLRTtBQUFPLGNBQUksRUFBQyxVQUFaO0FBQXVCLGNBQUksRUFBQztBQUE1QixVQUxGLGVBTUU7QUFBUSxjQUFJLEVBQUMsUUFBYjtBQUNBLGlCQUFPO0FBQUEsK0VBQ0wsa0JBQU9qQyxDQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNNb0Msc0JBQUFBLEdBRE4sR0FDWSxNQUFJLENBQUN2QyxnQkFBTCxDQUFzQkcsQ0FBdEIsQ0FEWjtBQUFBO0FBQUEsNkJBRWtCb0MsR0FBRyxDQUFDQyxJQUFKLEVBRmxCOztBQUFBO0FBRU1DLHNCQUFBQSxHQUZOO0FBR0U7QUFDQXpELHNCQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw2RUFBWixFQUEyRndELEdBQTNGLEVBSkYsQ0FLRTs7QUFMRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQURLOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRFAsc0JBTkYsQ0FERixFQW1CSUwsY0FuQko7QUFGRjtBQXdCRDs7OztFQS9Jb0JNLEtBQUssQ0FBQ0M7O0FBa0o3QixpRUFBZTdDLFFBQWYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cnlwdG8vLi9mdWxsLXN0YWNrLWxpYnMvdmFsaWRhdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdHJ5cHRvLy4vc3JjL2xvZ2luLXJlZ2lzdGVyLWZ1bmN0aW9uYWxpdGllcy9SZWdpc3Rlci5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gdmVyaWZ5RW1haWwoX2VtYWlsc3RyKXtcbiAgY29uc29sZS5sb2coXCJ2ZXJpZnlpbmcgdGhpcyBlbWFpbDogXCIsIF9lbWFpbHN0cik7XG4gIGNvbnN0IGVtYWlsUmVndWxhckV4cHJlc3Npb24gPSAvKF5bXkAuXSspQChbXkAuXSspXFwuezF9KFxcd3sxLDZ9JCkvO1xuICBjb25zdCBFbWFpbFZlcmlmX3N0YXR1cyA9IGVtYWlsUmVndWxhckV4cHJlc3Npb24udGVzdChfZW1haWxzdHIpIFxuICAvLyBjb25zdCBhcnJheVJlZyA9IGVtYWlsUmVndWxhckV4cHJlc3Npb24uZXhlYyhfZW1haWxzdHIpXG4gIFxuICBpZiAoRW1haWxWZXJpZl9zdGF0dXMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZmxhZzogdHJ1ZSxcbiAgICAgIG5vdGlmaWNhdGlvbjogWydlbWFpbCBmb3JtYXQgaXMgcHJvcGVyOiA8bmFtZT5APGVtYWlsLXByb3ZpZGVyPi48ZXh0ZW50aW9uPiddXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICBmbGFnOiBmYWxzZSxcbiAgICAgIG5vdGlmaWNhdGlvbjogWydlbWFpbCBmb3JtYXQgaXMgaW52YWxpZCBpLmUgbm90IGFzIHN1Y2g6IDxuYW1lPkA8ZW1haWwtcHJvdmlkZXI+LjxleHRlbnRpb24+J11cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmVyaWZ5UGFzc3dvcmQoX3Bhc3N3b3JkKXtcbiAgY29uc29sZS5sb2coXCJcXG5cXG52ZXJpZnlpbmcgdGhpcyBwYXNzd29yZDogXCIsIF9wYXNzd29yZClcbiAgbGV0IGZsYWcgPSB1bmRlZmluZWQsIG5vdGlmaWNhdGlvbiA9IFtdO1xuXG4gICgvXFxkL2cpLnRlc3QoX3Bhc3N3b3JkKT8gbnVsbCA6IG5vdGlmaWNhdGlvbiA9IG5vdGlmaWNhdGlvbi5jb25jYXQoXCJZb3VyIHBhc3N3b3JkIG11c3QgY29udGFpbiBhdCBsZWFzdCBhIGRpZ2l0IFswLTldXCIpO1xuICAoL1tBLVphLXpdL2cpLnRlc3QoX3Bhc3N3b3JkKT8gbnVsbCA6IG5vdGlmaWNhdGlvbiA9IG5vdGlmaWNhdGlvbi5jb25jYXQoXCJZb3VyIHBhc3N3b3JkIG11c3QgY29udGFpbiBhdCBsZWFzdCBhbiBhbHBoYWJldCBjaGFyYWN0ZXIgW0EtWmEtel1cIik7XG4gICgvW1xcW1xcXVxcKz8uLHw9YH4hQDojXCI7LyQnPiU8XiYqKCl7X30tXS9nKS50ZXN0KF9wYXNzd29yZCk/IG51bGwgOiBub3RpZmljYXRpb24gPSBub3RpZmljYXRpb24uY29uY2F0KFwiWW91ciBwYXNzd29yZCBtdXN0IGNvbnRhaW4gYXQgbGVhc3QgYSBzcGVjaWFsIGNoYXJhY3RlcjogW0AjISQlXiYqKClbXXt9LV8rLzwnPjtcXFwiOj8uLHw9YH5dXCIpO1xuICAhKC9cXHMvZykudGVzdChfcGFzc3dvcmQpPyBudWxsIDogbm90aWZpY2F0aW9uID0gbm90aWZpY2F0aW9uLmNvbmNhdChcIllvdXIgcGFzc3dvcmQgY2Fubm90IGNvbnRhaW4gYW55IHNwYWNlcyBhdCBhbnkgcG9pbnRcIik7XG4gICEoX3Bhc3N3b3JkLmxlbmd0aCA8IDgpID8gbnVsbDogbm90aWZpY2F0aW9uID0gbm90aWZpY2F0aW9uLmNvbmNhdChcIllvdXIgcGFzc3dvcmQncyBsZW5ndGggaW5zdWZmaWNpZW50LiBQYXNzd29yZHMgcmVxdWlyZSBhdCBsZWFzdCA3IGNoYXJhY3RlcnNcIik7XG4gICEoX3Bhc3N3b3JkLmxlbmd0aCA+IDM5KSA/IG51bGw6IG5vdGlmaWNhdGlvbiA9IG5vdGlmaWNhdGlvbi5jb25jYXQoXCJZb3VyIHBhc3N3b3JkJ3MgbGVuZ3RoIGV4Y2Vzc2l2bHkgbG9uZy4gUGFzc3dvcmRzIHJlcXVpcmUgdG8gYmUgbGVzcyB0aGFuIDQwIGNoYXJhY3RlcnNcIik7XG4gICEoX3Bhc3N3b3JkLmxlbmd0aCA9PT0gMCkgPyBudWxsOiBub3RpZmljYXRpb24gPSBub3RpZmljYXRpb24uY29uY2F0KFwiTm8gcGFzc3dvcmQgd2FzIGlucHV0ZWQhXCIpO1xuXG4gICh7ZmxhZywgbm90aWZpY2F0aW9ufSA9ICB7ZmxhZzogIW5vdGlmaWNhdGlvbi5sZW5ndGgsIG5vdGlmaWNhdGlvbjogbm90aWZpY2F0aW9uLmxlbmd0aCA9PT0gMD8gW1wicGFzc3dvcmQgZm9ybWF0IGlzIHByb3BlcjogcmVzcGVjdFxcJ3MgYWxsIGNvbmRpdGlvbnNcIl06bm90aWZpY2F0aW9ufSlcbiAgLy8gY29uc29sZS5sb2coZmxhZywgbm90aWZpY2F0aW9uKVxuICBcbiAgcmV0dXJuIHtmbGFnLCBub3RpZmljYXRpb259XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSAge3ZlcmlmeUVtYWlsLCB2ZXJpZnlQYXNzd29yZH0iLCIvLyBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICcuL3N0eWxlcy9NZ3RVc2VyLmNzcycgXG5pbXBvcnQge3ZlcmlmeUVtYWlsLCB2ZXJpZnlQYXNzd29yZH0gZnJvbSAnLi4vLi4vZnVsbC1zdGFjay1saWJzL3ZhbGlkYXRpb25zJ1xuXG5cblxuY2xhc3MgUmVnaXN0ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBub3RpZmljYXRpb246IFtdXG4gICAgfVxuICAgIHRoaXMuaGFuZGxlVmFsaWRhdGlvbiA9IHRoaXMuaGFuZGxlVmFsaWRhdGlvbi5iaW5kKHRoaXMpXG4gICAgdGhpcy5oYW5kbGVSZWdpc3RyYXRpb25DYWxsID0gdGhpcy5oYW5kbGVSZWdpc3RyYXRpb25DYWxsLmJpbmQodGhpcylcbiAgfVxuXG4gIC8vZ2VuZXJhdG9yIGZ1bmN0aW9uXG4gIGFzeW5jICpoYW5kbGVWYWxpZGF0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbnJlZ2lzdGVyXCIpLmVsZW1lbnRzWzBdLnZhbHVlXG4gICAgY29uc3QgcGFzc3dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2lucmVnaXN0ZXJcIikuZWxlbWVudHNbMV0udmFsdWVcbiAgICBsZXQgZmxhZywgbm90aWZpY2F0aW9uID0gW107XG4gICAgLy8gY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZSlcbiAgICAvLyBjb25zb2xlLmxvZyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2lucmVnaXN0ZXJcIikuZWxlbWVudHMpO1xuICAgIC8vIGNvbnNvbGUubG9nKGVtYWlsKVxuICAgIC8vIGNvbnNvbGUubG9nKHBhc3N3b3JkKVxuXG5cbiAgICAvLyBEZXN0cnVjdHVyaW5nIGFuZCBhc3NpZ25pbmcgXG4gICAgKHtmbGFnLCBub3RpZmljYXRpb259ID0gdmVyaWZ5RW1haWwoZW1haWwpKVxuICAgIGNvbnNvbGUubG9nKFwiYWZ0ZXIgdmVyaWZ5RW1haWw6IFwiLCBmbGFnLCBub3RpZmljYXRpb24pICAgIFxuICAgIGlmKCFmbGFnKSB7XG4gICAgICAvLyBzZXQgdGhlIHN0YXRlIG9mIHRoZSBub3RpZmljYXRpb24gdG8gdGVsbCB0aGUgdXNlciBcIkhleSB1c2VyIGVtYWlsIG5vdCBnb29kIVwiXG4gICAgICB0aGlzLnNldFN0YXRlKHtub3RpZmljYXRpb246IG5vdGlmaWNhdGlvbn0pXG4gICAgICBjb25zb2xlLmxvZyhcIkhleSB1c2VyIGVtYWlsIG5vdCBnb29kIVwiKTtcbiAgICAgIC8vIHlpZWxkIHRvIGVuZCBwcm9jZXNzXG4gICAgICB5aWVsZCB7eWllbGRfbGV2ZWw6IDEsIG51bWJlcl9vZl9tYXhfeWllbGRfbGV2ZWxzOiAzLCBpblByb2Nlc3NDaGVja2luZzogXCJlbWFpbFwiLCBtZXNzYWdlOiBub3RpZmljYXRpb259XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNldCB0aGUgc3RhdGUgb2YgdGhlIG5vdGlmaWNhdGlvbiB0byB0ZWxsIGNvbXBvbmVudCBcIkdvb2QgZW1haWxcIlxuICAgICAgY29uc29sZS5sb2coXCJIZXkgY29tcG9uZW50IGVtYWlsIGdvb2QhXCIpO1xuICAgICAgLy8gcHJvY2VlZCB0byBjaGVjayB0aGUgcGFzc3dvcmRcbiAgICAgIFxuICAgICAgKHtmbGFnLCBub3RpZmljYXRpb259ID0gdmVyaWZ5UGFzc3dvcmQocGFzc3dvcmQpKVxuICAgICAgY29uc29sZS5sb2coXCJhZnRlciB2ZXJpZnlQYXNzd29yZDogXCIsIGZsYWcsIG5vdGlmaWNhdGlvbik7XG4gICAgICBpZighZmxhZykge1xuICAgICAgICAvLyBzZXQgdGhlIHN0YXRlIG9mIHRoZSBub3RpZmljYXRpb24gdG8gdGVsbCBVc2VyIFwiSGV5IHVzZXIgcGFzc3dvcmQgbm90IEdvb2RcIlxuICAgICAgICB0aGlzLnNldFN0YXRlKHtub3RpZmljYXRpb246IG5vdGlmaWNhdGlvbn0pXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGV5IHVzZXIgcGFzc3dvcmQgbm90IEdvb2RcIik7XG4gICAgICAgIC8vIHlpZWxkIHRvIGVuZCBwcm9jZXNzXG4gICAgICAgIHlpZWxkIHt5aWVsZF9sZXZlbDogMiwgbnVtYmVyX29mX21heF95aWVsZF9sZXZlbHM6IDMsIGluUHJvY2Vzc0NoZWNraW5nOiBcInBhc3N3b3JkXCIsIG1lc3NhZ2U6IG5vdGlmaWNhdGlvbn1cbiAgICAgIH0gZWxzZSB7IC8vIGZpbmlzaCBhbmQgcmV0dXJuXG4gICAgICAgIC8vIHNldCB0aGUgc3RhdGUgb2YgdGhlIG5vdGlmaWNhdGlvbiB0byB0ZWxsIGNvbXBvbmVudCBcIkdvb2QgcGFzc3dvcmRcIlxuICAgICAgICBjb25zb2xlLmxvZyhcIkhleSBjb21wb25lbnQgcGFzc3dvcmQgZ29vZCFcIik7XG4gICAgICAgIC8vIHByb2NlZWQgdG8gbWFrZSBhcGkgY2FsbCB0aGlzLmhhbmRsZVJlZ2lzdHJhdGlvbihlbWFpbCwgcGFzc3dvcmQpXG4gICAgICAgIC8vIHJldHVybnMgbmV3IGZsYWcsIG1lc3NhZ2VcbiAgICAgICAgKHtmbGFnLCBub3RpZmljYXRpb259ID0gYXdhaXQgdGhpcy5oYW5kbGVSZWdpc3RyYXRpb25DYWxsKGVtYWlsLCBwYXNzd29yZCkpXG4gICAgICAgIGNvbnNvbGUubG9nKFwiXFxuXFxuQWZ0ZXIgQVBJIGNhbGwsIHdlIGFyZSBsZWZ0IHdpdGg6IFwiLCBmbGFnLCBub3RpZmljYXRpb24pXG4gICAgICAgIGlmKCFmbGFnKSB7XG4gICAgICAgICAgLy8gc2V0IHRoZSBzdGF0ZSBvZiB0aGUgbm90aWZpY2F0aW9uIHRvIHRlbGwgdGhlIHVzZXIgPG1lc3NhZ2U+XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bm90aWZpY2F0aW9uOiBub3RpZmljYXRpb259KVxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGV5IGNvbXBvbmVudCB0aGUgc2VydmVyIGZhaWxlZFwiKVxuICAgICAgICAgIC8vIHlpZWxkIHRoZSBmaW5hbCByZXR1cm4gdG8gZW5kIHByb2Nlc3Mgd2l0aCBzZXJ2ZXIgZXJyb3Igbm90aWZpY2F0aW9uXG4gICAgICAgICAgLy8gcmV0dXJuIHt5aWVsZF9sZXZlbDogMywgbnVtYmVyX29mX21heF95aWVsZF9sZXZlbHM6IDMsIGluUHJvY2Vzc0NoZWNraW5nOiBcIlBPU1QgL3VzZXJzL3JlZ2lzdGVyIGVuZHBvaW50XCIsIG1lc3NhZ2U6IG5vdGlmaWNhdGlvbn1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgLy8gcG9zdCBvciBnZXQocXVlcnkgc3RyaW5nKSB0aGUgbWVzc2FnZS9ub3RpZmljYXRpb24gdGhlbiBzZXJ2ZSBpdCBmcm9tIHRoZSBzZXJ2ZXIsIGhhdmUgaXQgYXMgYSBwb3AgdXAgaWYgeW91IHdhbnRcbiAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yKClcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke3Byb2Nlc3MuZW52LlJPT1R9L2A7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3lpZWxkX2xldmVsOiAzLCBudW1iZXJfb2ZfbWF4X3lpZWxkX2xldmVsczogMywgaW5Qcm9jZXNzQ2hlY2tpbmc6IFwiUE9TVCAvdXNlcnMvcmVnaXN0ZXIgZW5kcG9pbnRcIiwgbWVzc2FnZTogbm90aWZpY2F0aW9ufVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZVJlZ2lzdHJhdGlvbkNhbGwgKF9lbWFpbCwgX3Bhc3N3b3JkKXtcbiAgICBjb25zb2xlLmxvZyhcIk1ha2luZyBBUEkgY2FsbCFcIilcbiAgICBcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3Byb2Nlc3MuZW52LlJPT1R9L3VzZXJzL3JlZ2lzdGVyYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGVtYWlsOiBfZW1haWwsXG4gICAgICAgIHBhc3N3b3JkOiBfcGFzc3dvcmQsXG4gICAgICB9KVxuICAgIH0pXG4gICBcbiAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICBsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpXG5cbiAgICBzd2l0Y2ggKHJlc3BvbnNlLnN0YXR1cykge1xuICAgICAgY2FzZSAyMDA6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZmxhZzogdHJ1ZSxcbiAgICAgICAgICBub3RpZmljYXRpb246IGRhdGEuc2VydmVyLm1lc3NhZ2VcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgcGFnZSBub3RpZmljYXRpb25cbiAgICAgIGNhc2UgNTAwOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGZsYWc6IGZhbHNlLFxuICAgICAgICAgIG5vdGlmaWNhdGlvbjogZGF0YS5lcnJvci5tZXNzYWdlXG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBmaW5hbFlpZWxkIGEgZmxhZyBhbmQgdGhlbiByZXR1cm4gdGhlIGNhbGxpbmcgZnVuY3Rpb24gKmhhbmRsZVZhbGlkYXRpb24oZSkgd2l0aCB0aGlzIHN0cmluZyBgJHtyZXR1cm5lZCBtZXNzYWdlfWBcbiAgfVxuXG4gIFxuXG5cblxuICByZW5kZXIoKSB7XG5cbiAgICBjb25zdCBub3RpZnlEaXNwbGF5cyA9IHRoaXMuc3RhdGUubm90aWZpY2F0aW9uPy5tYXAoKG5vdGlmaWNhdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9Pntub3RpZmljYXRpb259PC9kaXY+XG4gICAgfSlcblxuICAgIGNvbnNvbGUubG9nKG5vdGlmeURpc3BsYXlzKVxuICAgIFxuICAgIHJldHVybiAoXG4gICAgICAvLyBUZW1wbGF0ZSBvdXQgdGhpcyBjb2RlXG4gICAgICA8ZGl2IGlkPVwiY29udGFpbmVyLWxvZy1yZWdcIj5cbiAgICAgICAgPGZvcm0gaWQ9XCJsb2dpbnJlZ2lzdGVyXCIgY2xhc3NOYW1lPVwiZm9ybVwiPlxuICAgICAgICAgIDxoMz5SZWdpc3RlciBSZWFjdDwvaDM+XG4gICAgICAgICAgPGxhYmVsPkVtYWlsPC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiZW1haWxcIi8+IFxuICAgICAgICAgIDxsYWJlbD5QYXNzd29yZDwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJwYXNzd29yZFwiLz4gXG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgXG4gICAgICAgICAgb25DbGljaz17XG4gICAgICAgICAgICBhc3luYyAoZSkgPT4ge1xuICAgICAgICAgICAgICBsZXQgZ2VuID0gdGhpcy5oYW5kbGVWYWxpZGF0aW9uKGUpXG4gICAgICAgICAgICAgIGxldCB2YWwgPSBhd2FpdCBnZW4ubmV4dCgpXG4gICAgICAgICAgICAgIC8vIGF3YWl0IGdlbi5uZXh0KClcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXR1cm5lZCB2YWwgb24gYnV0dG9uIGNsaWNrIHN0YXRlbWVudHNcXG5BZnRlciBsZXQgdmFsID0gYXdhaXQgZ2VuLm5leHQoKVxcblwiLCB2YWwpXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUmV0dXJuZWQgdmFsIG9uIGJ1dHRvbiBjbGljayBzdGF0ZW1lbnRzXFxuQWZ0ZXIgYXdhaXQgZ2VuLm5leHQoKVxcblwiLCBnZW4pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfT5SZWdpc3RlcjwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgICAgIHsvKiBkaXNwbGF5IHRoZSBub3RpZmljYXRpb24gZnJvbSB0aGUgc2VydmVyIGhlcmUhICovfVxuICAgICAgICB7IG5vdGlmeURpc3BsYXlzIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVnaXN0ZXIiXSwibmFtZXMiOlsidmVyaWZ5RW1haWwiLCJfZW1haWxzdHIiLCJjb25zb2xlIiwibG9nIiwiZW1haWxSZWd1bGFyRXhwcmVzc2lvbiIsIkVtYWlsVmVyaWZfc3RhdHVzIiwidGVzdCIsImZsYWciLCJub3RpZmljYXRpb24iLCJ2ZXJpZnlQYXNzd29yZCIsIl9wYXNzd29yZCIsInVuZGVmaW5lZCIsImNvbmNhdCIsImxlbmd0aCIsIm1vZHVsZSIsImV4cG9ydHMiLCJSZWdpc3RlciIsInN0YXRlIiwiaGFuZGxlVmFsaWRhdGlvbiIsImJpbmQiLCJoYW5kbGVSZWdpc3RyYXRpb25DYWxsIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZW1haWwiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZWxlbWVudHMiLCJ2YWx1ZSIsInBhc3N3b3JkIiwic2V0U3RhdGUiLCJ5aWVsZF9sZXZlbCIsIm51bWJlcl9vZl9tYXhfeWllbGRfbGV2ZWxzIiwiaW5Qcm9jZXNzQ2hlY2tpbmciLCJtZXNzYWdlIiwiY29uc3RydWN0b3IiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJwcm9jZXNzIiwiZW52IiwiUk9PVCIsIl9lbWFpbCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzcG9uc2UiLCJqc29uIiwiZGF0YSIsInN0YXR1cyIsInNlcnZlciIsImVycm9yIiwibm90aWZ5RGlzcGxheXMiLCJtYXAiLCJpbmRleCIsImdlbiIsIm5leHQiLCJ2YWwiLCJSZWFjdCIsIkNvbXBvbmVudCJdLCJzb3VyY2VSb290IjoiIn0=