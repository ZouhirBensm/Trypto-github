// Other Error Handlers
const errorLogger = (err, req ,res, next) => {
  console.error('\x1b[31m', err)
  next(err) // Sends the error to next middleware error handler function
}

const errorResponder = (err, req ,res, next) => {
  // Catches all errors, and as a consequence of responding to client, circumvents express' default error handler 
  res.header("Content-Type", "application/json")
  // err is an object and JSON.stringify(err,null,4) is a string
  res.status(500).send(`An Error has occured on the server please have a look! Error: ${err}`) 
}

module.exports = {
  errorLogger,
  errorResponder
}