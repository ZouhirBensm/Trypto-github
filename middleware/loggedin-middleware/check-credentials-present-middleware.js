const User = require("../../models/User")
const { LoggingInError } = require('../../custom-errors/custom-errors')



module.exports = async (req,res,next)=>{

  res.locals.notification = []

  const {email} = req.body

  if (!email) {let e = new LoggingInError("Please enter an e-mail"); return next(e)}
  
  const {password} = req.body
  
  if (!password) {
    let e = new LoggingInError("Please enter a password"); return next(e);
  } 

  return next()
}