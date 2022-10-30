
const HashForPasswordReset = require("../../models/HashForPasswordReset")
const crypto = require('crypto')
const bcrypt = require('bcryptjs')


module.exports = async (req,res,next) => {
  console.log("\n\n_____reHachHexForPassResetMiddleware")

  // the clicked hex
  var hex = req.params.hex
  //hash it

  let hash
  try {
    hash = crypto.createHash('sha256').update(hex).digest('hex')
  } catch (error) {
    //render error page!  
    return res.render('bodies/error')
  }

  if(!hash) return res.render('bodies/error')

  console.log("---> (2)", hash, typeof hash)
  
  res.locals.hash = hash


  return next()
}