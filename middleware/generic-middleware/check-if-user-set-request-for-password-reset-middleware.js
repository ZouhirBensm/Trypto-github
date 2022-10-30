const HashForPasswordReset = require("../../models/HashForPasswordReset")

module.exports = async (req,res, next) =>{
  console.log("\n\n\n_____________checkIfUserSetRequestForPasswordResetMiddleware")
  
  if (!res.locals.ret_user) return next()
  if (!res.locals.ret_user.active) return next()


  // if user proceed
  let hashforpasswordreset_ifany
  
  try {
    hashforpasswordreset_ifany = await HashForPasswordReset.findOne({userID: res.locals.ret_user._id, used: false})
  } catch (error) {
    // some error handling
  }




  res.locals.hashforpasswordreset_ifany = hashforpasswordreset_ifany
  console.log("hashforpasswordreset_ifany", hashforpasswordreset_ifany)

  return next()
}