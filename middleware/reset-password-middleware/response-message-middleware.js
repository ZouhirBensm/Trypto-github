function responseMessageSetterMiddleware(message) {
  return (req, res, next) => {

    res.locals.response_message = message 
  
    return next()
  
  }
}

module.exports = {responseMessageSetterMiddleware}