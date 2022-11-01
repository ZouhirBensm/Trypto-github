module.exports = (req, res, next) => {

  res.locals.response_message = "If a user under those credentials exists, an email with the reset link shall be sent."

  return next()

}