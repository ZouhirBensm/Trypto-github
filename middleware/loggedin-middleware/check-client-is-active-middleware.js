const { LoggingInError } = require('../../custom-errors/custom-errors')

module.exports = async (req,res,next)=>{

  if (!res.locals.foundUserIfAny.active) {
    let e = new LoggingInError(`This account ${req.body.email} has not yet been confirmed, please confirm by clicking link sent to email!`, 403); 
    return next(e);
  } 

  return next()
}