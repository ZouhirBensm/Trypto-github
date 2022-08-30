const httpStatus = require("http-status-codes")
// No Custom Error needed at the moment
const { MongoError } = require('../../custom-errors/custom-errors')
const ENV = require('../../config/base')


// Other Error Handlers
const errorLogger = (err, req ,res, next) => {
  // console.error(err.stack)
  console.error('\n\n\x1b[31;5mOn errorLogger\x1b[0m\n\n\x1b[37;41;1m', err, '\x1b[0m')
  return next(err) // Sends the error to next middleware error handler function
}

const errorResponseDispatcher = async (err, req ,res, next) => {
  console.log("\n\n\x1b[33;5mOn errorResponseDispatcher\x1b[0m\n\n\n\x1b[37;43;1mConstructor: ", err.constructor.name, '\x1b[0m')

  switch (err.constructor.name) {
    // Used to experiment custom throw errors for mongo DB methods
    case "MongoError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.usr_message,
        }
      })
      break;

    case "LoggingInError":
      return res.status(err.statusCode).send({
        error: {
          type: err.type,
          message: err.message, // Array<string> format
          // message: res.locals.notification, // Array<string> format
          
        }
      })
      break;
    case "ValidationError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.message, // Array<string> format
          validatee: err.validatee
        }
      })
    break;
    case "NoRefererError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.message, // String format
        }
      })
    break;
    case "FirstPathNotRegistered":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.message, // String format
        }
      })
    break;
    case "UnsubscribeError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: {
            client_message: err.client_message,
            admin_message: err.admin_message
          }
        }
      })
    break;
    default:
      console.log("switch end")
      return next(err)
      break;
  }
}

const errorResponder = (err, req ,res, next) => {
  console.log("\n\n\n\x1b[38;5;130;5mOn errorResponder\x1b[0m")


  console.log("\n\x1b[37;48;5;172;1mEnvironment", ENV.environment , '\x1b[0m\n\n')
  // for (let i = 0; i < 256; ++i){
  //   console.log(`\x1b[48;5;${i}m${i}\x1b[0m`)
  // }
  // Catches all errors, and as a consequence of responding to client, circumvents express' default error handler 


  // res.header("Content-Type", "application/json")
  const errorStatus = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR

  let error_sent

  ENV.environment === "developement" ? 
  error_sent = `\n\nOn errorResponder\n\nAn Error has occured on the server please have a look! Error: ${err}`: 
  error_sent = `${errorStatus} | Sorry, our web server is Down!`;


  return res.status(errorStatus).send(error_sent) 
  
  // Personal note: err is an object and JSON.stringify(err,null,4) is a string

}

module.exports = {
  errorLogger,
  errorResponseDispatcher,
  errorResponder
}