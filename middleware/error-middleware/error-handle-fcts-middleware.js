// TODO errorLoggerMiddleware keep in middleware, whereas the 2 other functions need to be put in the controllers folder
// Other Error Handlers
const errorLoggerMiddleware = (err, req ,res, next) => {
  // console.error(err.stack)
  console.error('\n\n\x1b[31;5mOn errorLoggerMiddleware\x1b[0m\n\n\x1b[37;41;1m', err, '\x1b[0m')
  return next(err) // Sends the error to next middleware error handler function
}

module.exports = {
  errorLoggerMiddleware
}