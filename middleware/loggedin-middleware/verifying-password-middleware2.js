const User = require("../../models/User")
var bcrypt = require('bcryptjs');
const { LoggingInError } = require('../../custom-errors/custom-errors')

// TODO resend email link

module.exports = async (req,res,next)=>{


  let foundUserIfAny = await User.findOne({email: req.body.email}).select("active password _id")
  console.log({foundUserIfAny})

  if(!foundUserIfAny) {
    let e = new LoggingInError("This email was not found in our repertoire"); return next(e)
  } 

  console.log("foundUserIfAny", foundUserIfAny)




  if (!foundUserIfAny.active) {
  // if (false) {
    let e = new LoggingInError(`This account ${req.body.email} has not yet been confirmed, please confirm by clicking link sent to email, when registering!`); return next(e);
  } 

  

console.log(req.body)

  // Compare the passwords
  let bcryptCompareRet

  try {
    bcryptCompareRet = await bcrypt.compare(req.body.password, foundUserIfAny.password)
  } catch (error) {
    console.error(`---> Error in: bcrypt.compare,\n${error}`);
    let e = new LoggingInError(error.message); return next(e);
  }

  console.log({bcryptCompareRet})

  if(bcryptCompareRet) {
    req.session.userId = foundUserIfAny._id
  } else {
    let e = new LoggingInError("Erroneous password submission for this email"); return next(e);
  }


  return next()
}