const User = require("../../models/User")
const {ResetPasswordReset} = require("../../custom-errors/custom-errors")



module.exports = async (req, res, next) => {
  console.log("\n\n\n__________________checkIfUserByEmailMiddleware")


  // CHECK IF USER
  let ret_user
  try {
    ret_user = await User.findOne({ email: req.body.email })
  } catch (e) {
    // some error handling
    let error = new ResetPasswordReset(res.locals.response_message, "Querying for user failed")
    return next(error)
  }

  console.log(ret_user)
  res.locals.ret_user = ret_user

  next()

}