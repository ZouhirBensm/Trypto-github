const { LoggingInError } = require("../../custom-errors/custom-errors")

module.exports = (req,res,next)=>{
  if(req.session.userId){
    next()
  } else {
    next(new LoggingInError(["Access denied. Client must have a logged in session to access data"]))
  }
}