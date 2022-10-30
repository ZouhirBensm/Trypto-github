const HexForPasswordReset = require("../../models/HexForPasswordReset")

module.exports = async (req, res, next) => {
  console.log("\n\n\n__________________createHexForPasswordResetLinkMiddleware")

  res.locals.done = false
  // console.log("checkIfUserActiveMiddleware")

  // If no user next()
  if (!res.locals.ret_user) {
    // some error handling
    // res.status(200).end()
    res.locals.done = true
    return next()
  }


  console.log("ACTIVE? ", res.locals.ret_user.active)
  // If user
  // If not active next()
  if (!res.locals.ret_user.active) {
    // if(true) {
    // some error handling
    // res.status(200).end()
    res.locals.done = true
    return next()
  }

  // If the hex for that user has not yet expired, and not used
  if (res.locals.hexforpasswordreset_ifany) {

    // resend the email to reset his password
    // if(true) {
    return next()
  }


  // If user, active, and has no hex

  // Generate a hex that expires after 2 mins
  var now = new Date(),
  exp = new Date(now);
  exp.setMinutes(now.getMinutes() + 3);

  // If user and active, create a hex entry
  let hexforpasswordreset_instance = new HexForPasswordReset({
    userID: res.locals.ret_user._id,
    expireAt: exp
  })

  let ret_hexforpasswordreset_save

  try {
    ret_hexforpasswordreset_save = await hexforpasswordreset_instance.save()
  } catch (error) {
    // some error handling
  }

  console.log(ret_hexforpasswordreset_save)
  res.locals.ret_hexforpasswordreset_save = ret_hexforpasswordreset_save

  // send email to reset the password



  return next()






}