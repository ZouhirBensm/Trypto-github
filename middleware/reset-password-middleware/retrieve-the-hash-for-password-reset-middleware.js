
const HashForPasswordReset = require("../../models/HashForPasswordReset")
const {ResetPasswordReset} = require("../../custom-errors/custom-errors")


module.exports = async (req,res,next) => {

    // else from this point the entry switched to used true and now ready to update the password
    let ret_hashforpasswordreset
    try {
      ret_hashforpasswordreset = await HashForPasswordReset.findOne({ hash: res.locals.hash })
    } catch (e) {
      //some error handling
      let error = new ResetPasswordReset(res.locals.response_message, "Retrieving HashForPasswordReset failed")
      return next(error)
    }
  
    // Not needed redundant, but ok I guess
    if (!ret_hashforpasswordreset) {
    // if (true) {
      let error = new ResetPasswordReset(res.locals.response_message, "No entry to reset password")
      return next(error)
    }

    res.locals.ret_hashforpasswordreset = ret_hashforpasswordreset

    return next()
  
}