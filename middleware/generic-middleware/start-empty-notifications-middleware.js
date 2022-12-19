module.exports = (req, res, next) => {
  res.locals.notifications = []

  // console.log("res.locals.URL_fromReferer---->", res.locals.URL_fromReferer)
  // console.log("res.locals.URL_fromAPIcall---->", res.locals.URL_fromAPIcall)
  
  return next()
}