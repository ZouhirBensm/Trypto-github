
const HashForPasswordReset = require("../../models/HashForPasswordReset")
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const {ResetPasswordReset} = require("../../custom-errors/custom-errors")


module.exports = async (req,res,next) => {
  console.log("\n\n_____reHachHexForPassResetMiddleware")

  // the clicked hex
  var hex = req.body.hex
  //hash it

  let hash
  try {
    hash = crypto.createHash('sha256').update(hex).digest('hex')
  } catch (e) {
    // some error handling
    let error = new ResetPasswordReset(res.locals.response_message, "Hashing failed")
    return next(error)
  }

  if(!hash) return res.status(500).json({message: "no hash"}) //some error handling 

  console.log("---> (2)", hash, typeof hash)
  
  res.locals.hash = hash


  return next()
}