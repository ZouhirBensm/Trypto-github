const { LoggingInError } = require("../custom-errors/custom-errors")

// If your already logged middleware makes impossible to post for new loggin or register
module.exports = (req,res,next)=>{

  console.log(req.headers)
  error = new LoggingInError(["No req.headers.referer identified, a referer is needed to process the request."]);
  req.headers.referer ? next(): next(error)
}