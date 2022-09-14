module.exports = (req, res, next) => {
  res.locals.notifications = []
  next()
}