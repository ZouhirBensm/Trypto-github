const User = require("../../models/User")
const { LoggingInError } = require('../../custom-errors/custom-errors')



module.exports = async (req,res,next)=>{

  res.locals.notification = []

  const {email} = req.body
  console.log("\n\n\nemail:\n", email)

  if (!email) {let e = new LoggingInError("Please enter an e-mail"); return next(e)}
  
  const {password} = req.body
  
  console.log("\n\n\npassword:\n", password)
  
  if (!password) {
    let e = new LoggingInError("Please enter a password"); return next(e);
  } 

  return next()
}