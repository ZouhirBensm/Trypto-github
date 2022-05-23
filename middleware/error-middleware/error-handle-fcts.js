// No Custom Error needed at the moment
const { MongoCreateCustomError } = require('../../custom-errors/custom-errors')


// Other Error Handlers
const errorLogger = (err, req ,res, next) => {
  console.error('\n\nOn errorLogger\n\n\x1b[31m', err)
  next(err) // Sends the error to next middleware error handler function
}

const errorResponseDispatcher = (err, req ,res, next) => {
  switch (err.constructor.name) {
    case "MongoError":
      res.status(500).json({
        error: {
          type: `${err.name}`,
          message: [`${err.message}`],
        }
      })
      break;
    // This custom error is not needed but it's format is good to keep to implement new validation custom errors for the backend!
    case "LoggingInError":
      res.status(err.statusCode).json({
        error: {
          type: `${err.name}`,
          message: res.locals.notification, // Array<string> format
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