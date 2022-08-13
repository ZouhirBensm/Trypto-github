const { LoggingInError } = require("../../custom-errors/custom-errors")

module.exports = (req, res, next)=>{
  res.locals.path_param_userID = req.params.userID
  if (req.params.userID == req.session.userId) {
    console.log("In the paginated-messages-middleware.js")
    next()
  } else {
    console.log("In the paginated-messages-middleware.js")
    next(new LoggingInError(["You cannot access the messages page because the query userID is not equal to the current logged in user on the backend."]))
  }
}