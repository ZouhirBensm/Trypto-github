
const HashForPasswordReset = require("../../models/HashForPasswordReset")
const {ResetPasswordReset} = require("../../custom-errors/custom-errors")


module.exports = async (req,res,next) => {
  // update the entries used field to true
  let ret_hashforpasswordreset_update
  try {
    ret_hashforpasswordreset_update = await HashForPasswordReset.updateOne({ hash: res.locals.hash }, { used: true }, { upsert: false, new: true });
  } catch (e) {
    let error = new ResetPasswordReset(res.locals.response_message, "Making HashForPasswordReset used failed")
    return next(error)

    // some error handling
    // new Error throw
    // res.status(500).json({message})
    // error = new CustomError("message")
    // return next(error)
  }

  // No entry identified to edit password
  if (ret_hashforpasswordreset_update.matchedCount == 0) {
  // if (true) {
    let error = new ResetPasswordReset("No entry to reset password", "No entry to reset password")
    return next(error)
  }
  // The entry reset link has already been used
  if (ret_hashforpasswordreset_update.modifiedCount == 0) {
  // if (true) {
    let error = new ResetPasswordReset("This reset link has already been utilized", "This reset link has already been utilized")
    return next(error)
  }

  return next()
}