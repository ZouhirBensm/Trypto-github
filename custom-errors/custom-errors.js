class CustomError extends Error {
  constructor() {
    super()
    this.statusCode = 500
  }
}

// Kept as an example
// class SubCustomError extends CustomError {
//   constructor(){
//     super()
//   }
// }

// Used to test errorResponseDispatcher when the error is thrown at register-login-controllers.js in registerController function, when User.create errors' out
class MongoError extends CustomError {
  constructor(){
    super()
    this.type = this.constructor.name
    this.message = ['msg1', 'msg2', 'msg3']
  }
}

// TODO Setup validatee as an enum: Email, Password, ...
class ValidationError extends CustomError {
  constructor(notification, validatee){
    super()
    this.type = this.constructor.name
    this.message = notification
    this.validatee = validatee
  }
}


class LoggingInError extends CustomError {
  constructor(){
    super()
    this.type = this.constructor.name
    this.message
  }
}

module.exports = {
  // SubCustomError,
  MongoError,
  CustomError,
  ValidationError,
  LoggingInError
}