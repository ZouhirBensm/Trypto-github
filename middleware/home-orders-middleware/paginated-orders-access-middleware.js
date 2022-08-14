const { LoggingInError } = require("../../custom-errors/custom-errors")

// here!
// TODO render this middleware generic or see if can delete and use something else
// TODO inside /middleware setup a generic folder and put all root level middleware in there!
module.exports = (req,res,next)=>{
  if(req.session.userId){
    next()
  } else {
    next(new LoggingInError(["Access denied. Client must have a logged in session to access data"]))
  }
}