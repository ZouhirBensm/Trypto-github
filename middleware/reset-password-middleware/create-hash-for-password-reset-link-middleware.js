const HashForPasswordReset = require("../../models/HashForPasswordReset")
const crypto = require('crypto')
const bcrypt = require('bcryptjs')


module.exports = async (req, res, next) => {
  console.log("\n\n\n__________________createHashForPasswordResetLinkMiddleware")

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
  if (res.locals.hashforpasswordreset_ifany) {
    // cannot send resend email until the reset link expires
    console.log(1)
    res.locals.done = true
    console.log(2)
    return next()
  }


  console.log(3)
  // If user, active, and has no hex

  // Generate a hex that expires after 2 mins
  var now = new Date()
  exp = new Date(now)
  exp.setMinutes(now.getMinutes() + 60*6)

  let buffer
  try {
    buffer = crypto.randomBytes(128)
  } catch (error) {
    // some error handling
    return res.status(500).json({message: "Unable to create buffer for hex"})
  }

  
  var hex = buffer.toString('hex');
  
  console.log("--->", hex, typeof hex)

  let hash
  try {
    // hash = await bcrypt.hash(hex)
    hash = crypto.createHash('sha256').update(hex).digest('hex')
  } catch (error) {
    // some error handling
    return res.status(500).json({message: "Unable hash the hex"})
  }

  console.log("---> (1)", hash, typeof hash)



  // If user and active, create a hex entry
  let hashforpasswordreset_instance = new HashForPasswordReset({
    userID: res.locals.ret_user._id,
    expireAt: exp,
    hash: hash
  })

  let ret_hashforpasswordreset_save

  try {
    ret_hashforpasswordreset_save = await hashforpasswordreset_instance.save()
  } catch (error) {
    // some error handling
    return res.status(500).json({message: "Failed while saving the created HashForPasswordReset entry"})
  }

  
  console.log("--->", ret_hashforpasswordreset_save)

  // res.locals.ret_hashforpasswordreset_save = ret_hashforpasswordreset_save
  res.locals.hex = hex

  // send email to reset the password



  return next()






}