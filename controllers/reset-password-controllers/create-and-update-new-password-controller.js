var bcrypt = require('bcryptjs');
const {ResetPasswordReset} = require("../../custom-errors/custom-errors")
const User = require('../../models/User')




module.exports = async (req, res, next) => {

  // Hash the password
  let newpasswordhash

  try {
    newpasswordhash = await bcrypt.hash(req.body.newpassword, 10)
  } catch (e) {
    // some error handling
    let error = new ResetPasswordReset(res.locals.response_message, "Hashing New Password Failed")
    return next(error)
  }


  let updated_user_ret
  try {
    updated_user_ret = await User.updateOne({ _id: res.locals.ret_hashforpasswordreset.userID }, { password: newpasswordhash }, { upsert: false, new: true });
  } catch (e) {
    //some error handling
    let error = new ResetPasswordReset(res.locals.response_message, "Saving new password in User failed")
    return next(error)
  }


  res.status(200).json({
    message: "Congrats, you have successfully reset your password, please proceed to log in with new credentials."
  })


}