const httpStatus = require("http-status-codes")
let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR

class CustomError extends Error {
  constructor() {
    super()
    this.statusCode = errorCode
  }
}

// Kept as an example
// class SubCustomError extends CustomError {
//   constructor(){
//     super()
//   }
// }

// Used to test errorResponseDispatcherController when the error is thrown at register-login-controllers.js in registerController function, when User.create errors' out
class MongoError extends CustomError {
  constructor(message, code){
    super()
    this.type = this.constructor.name
    this.message = message
    this.usr_message = message
    // Override usr_message
    switch (code) {
      // Code for duplicate entries
      case 11000:
        this.usr_message = ["This user already exists in our repertoire, please input another email."]
        break;
    
      default:
        break;
    }
  }
}


class ValidationError extends CustomError {
  constructor(notification, validatee){
    super()
    this.type = this.constructor.name
    this.message = notification
    this.validatee = validatee
  }
}


class LoggingInError extends CustomError {
  constructor(msgs_array){
    super()
    this.type = this.constructor.name
    this.message = msgs_array
  }
}

class NoRefererError extends CustomError {
  constructor(message){
    super()
    this.type = this.constructor.name
    this.message = message
  }
}

class FirstPathNotRegistered extends CustomError {
  constructor(path_received){
    super()
    this.type = this.constructor.name
    this.path_received = path_received
    this.message =  `no particular data identified to serve i.e first path: ${this.path_received} not registered in the distributePaginatedDataController.js. Please register ${this.path_received} in the controller, and define paginated served Data.`
  }
}


class UnsubscribeError extends CustomError {
  constructor(client_message, admin_message){
    super()
    this.type = this.constructor.name
    this.client_message = client_message
    this.admin_message= admin_message
  }
}

class DeleteAccountProcessError extends CustomError {
  constructor(array_of_messages){
    super()
    this.type = this.constructor.name
    this.client_message = "The deletion process was a failure"
    this.admin_message= array_of_messages
  }
}

module.exports = {
  // SubCustomError,
  MongoError,
  CustomError,
  ValidationError,
  LoggingInError,
  NoRefererError,
  FirstPathNotRegistered,
  UnsubscribeError,
  DeleteAccountProcessError
}