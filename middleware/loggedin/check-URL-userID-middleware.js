const { LoggingInError } = require("../../custom-errors/custom-errors")

// Checking whether or not the URL userID is equal to the backend logged in userID
module.exports = (req, res, next)=>{
  if (req.params.userID == req.session.userId) {
    console.log("In the check-URL-userID-middleware.js")
    res.locals.path_param_userID = req.params.userID
    next()
  } else {
    console.log("In the check-URL-userID-middleware.js")
    next(new LoggingInError(["You cannot access the page because the query userID is not equal to the current logged in user on the backend."]))
  }
}