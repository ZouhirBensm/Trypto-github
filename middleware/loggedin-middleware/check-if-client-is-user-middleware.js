const User = require("../../models/User")
const { LoggingInError } = require('../../custom-errors/custom-errors')

module.exports = async (req,res,next)=>{


  let foundUserIfAny = await User.findOne({email: req.body.email}).select("active password _id")
  console.log({foundUserIfAny})

  if(!foundUserIfAny) {
    let e = new LoggingInError("This email was not found in our repertoire"); 
    return next(e);
  } 
  console.log("foundUserIfAny", foundUserIfAny)

  res.locals.foundUserIfAny = foundUserIfAny

  return next()

}