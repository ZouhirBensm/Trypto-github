
const HashForPasswordReset = require("../../models/HashForPasswordReset")



module.exports = async (req,res,next) => {
  console.log("\n\n_____compareTheHashForPassResetMiddleware")

  // look if present in DB
  let ifany_found_hash_for_password_reset
  try {
    ifany_found_hash_for_password_reset = await HashForPasswordReset.find({hash: res.locals.hash})
  } catch (error) {
    //render error page!
    return res.render('bodies/error')
  }

  // no hash found
  if(!ifany_found_hash_for_password_reset){
    //render error page!
    return res.render('bodies/error')
  }


  return next()
}