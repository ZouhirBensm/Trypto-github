const HexForPasswordReset = require("../../models/HexForPasswordReset")

module.exports = async (req,res, next) =>{
  console.log("\n\n\n__________________checkIfUserHasUsableHexForPasswordResetMiddleware")
  
  if (!res.locals.ret_user) return next()
  if (!res.locals.ret_user.active) return next()


  // if user proceed
  let hexforpasswordreset_ifany
  try {
    hexforpasswordreset_ifany = await HexForPasswordReset.findOne({userID: res.locals.ret_user._id, used: false})
  } catch (error) {
    // some error handling
  }

  res.locals.hexforpasswordreset_ifany = hexforpasswordreset_ifany
  return next()
}