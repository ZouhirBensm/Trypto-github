// No Custom Error needed at the moment
const { MongoError } = require('../../custom-errors/custom-errors')


// Other Error Handlers
const errorLogger = (err, req ,res, next) => {
  console.error('\n\nOn errorLogger\n\n\x1b[31m', err)
  next(err) // Sends the error to next middleware error handler function
}

const errorResponseDispatcher = (err, req ,res, next) => {
  console.log("error Constructor!!! ", err.constructor.name)
  switch (err.constructor.name) {
    // Used to experiment custom throw errors for mongo DB methods
    case "MongoError":
      res.status(500).json({
        error: {
          type: err.type,
          message: err.message,
        }
      })
      break;

    case "LoggingInError":
      res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.message, // Array<string> format
          // message: res.locals.notification, // Array<string> format
          
        }
      })
      break;
    case "ValidationError":
      res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.message, // Array<string> format
          validatee: err.validatee
        }
      })
    break;
    default:
      next(err)
      break;
  }
}

const errorResponder = (err, req ,res, next) => {
  console.log("Arrive HERE??")
  // Catches all errors, and as a consequence of responding to client, circumvents express' default error handler 
  res.header("Content-Type", "application/json")
  res.status(500).send(`\n\nOn errorResponder\n\nAn Error has occured on the server please have a look! Error: ${err}`) 
  
  // Personal note: err is an object and JSON.stringify(err,null,4) is a string

}

module.exports = {
  errorLogger,
  errorResponseDispatcher,
  errorResponder
}