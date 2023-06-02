const httpStatus = require("http-status-codes")
let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR

class CustomError extends Error {
  constructor() {
    super()
    this.statusCode = errorCode
  }
}


class GenericJSONError extends CustomError {
  constructor(message, overwriteStatus = undefined) {
    super()
    this.type = this.constructor.name
    this.statusCode = overwriteStatus || errorCode
    this.message = message
  }
}



class PayloadInadequateError extends CustomError {
  constructor(message, overwriteStatus = undefined) {
    super()
    this.type = this.constructor.name
    this.statusCode = overwriteStatus || errorCode
    this.message = message
  }
}

// Kept as an example
// class SubCustomError extends CustomError {
//   constructor(){
//     super()
//   }
// }

// Used to test errorResponseDispatcherController when the error is thrown at login-controllers.js in registerController function, when User.create errors' out
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


class GoogleAPIError extends CustomError {
  constructor(message, code){
    super()
    this.type = this.constructor.name
    this.message = message
    this.usr_message = message
  }
}


class ValidationError extends CustomError {
  constructor(notification, validatee, overwriteStatus = undefined){
    super()
    this.type = this.constructor.name
    this.message = notification
    this.validatee = validatee
    overwriteStatus? this.statusCode = overwriteStatus: null
  }
}


class LoggingInError extends CustomError {
  constructor(msg, statusCode = undefined){
    super()
    this.type = this.constructor.name
    this.message = msg
    this.statusCode = statusCode ||  this.statusCode
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
    this.message =  `No particular data identified to serve i.e first path: ${this.path_received} not registered in the distributePaginatedDataController.js. Please register ${this.path_received} in the controller, and define paginated served Data.`
  }
}


class UnsubscribeError extends CustomError {
  constructor(client_message, admin_message){
    super()
    this.type = this.constructor.name
    this.message = admin_message
    this.client_message = client_message
    this.admin_message= admin_message
  }
}

class RoleNotPermitedError extends CustomError {
  constructor(current_role, permitted_roles){
    super()
    this.type = this.constructor.name
    this.message = `You are logged in as a ${current_role} role, but the only permitted roles are the folowing: ${permitted_roles}`
  }
}

class DeleteAccountProcessError extends CustomError {
  constructor(array_of_messages){
    super()
    this.type = this.constructor.name
    this.message = array_of_messages
    this.client_message = "The deletion process was a failure"
    this.admin_message= array_of_messages
  }
}

class SessionRoleOrSentUIDnotAllowed extends CustomError {
  constructor(client_message, admin_message){
    super()
    this.type = this.constructor.name
    this.message = admin_message
    this.client_message = client_message
    this.admin_message= admin_message
  }
}

class ResetPasswordReset extends CustomError {
  constructor(client_message, admin_message, statusCode = undefined){
    super()
    this.type = this.constructor.name
    this.message = admin_message
    this.client_message = client_message
    this.admin_message= admin_message
    this.statusCode = statusCode ||  this.statusCode
  }
}


class MarketOrderSubmissionError extends CustomError {
  constructor(client_message, admin_message, statusCode = undefined){
    super()
    this.type = this.constructor.name
    this.message = admin_message
    this.client_message = client_message
    this.admin_message= admin_message
    this.statusCode = statusCode ||  this.statusCode
  }
}

class ProfileImageUploadError extends CustomError {
  constructor(client_message, admin_message, statusCode = undefined){
    super()
    this.type = this.constructor.name
    this.message = admin_message
    this.client_message = client_message
    this.admin_message= admin_message
    this.statusCode = statusCode ||  this.statusCode
  }
}

class CreateArticleError extends CustomError {
  constructor(admin_message, statusCode = undefined){
    super()
    this.type = this.constructor.name
    this.message = admin_message
    this.admin_message= admin_message
    this.statusCode = statusCode ||  this.statusCode
  }
}

module.exports = {
  // SubCustomError,
  MongoError,
  CustomError,
  GenericJSONError,
  ValidationError,
  LoggingInError,
  NoRefererError,
  FirstPathNotRegistered,
  UnsubscribeError,
  DeleteAccountProcessError,
  RoleNotPermitedError,
  SessionRoleOrSentUIDnotAllowed,
  ResetPasswordReset,
  MarketOrderSubmissionError,
  ProfileImageUploadError,
  CreateArticleError,
  GoogleAPIError,
  PayloadInadequateError
}