const User = require("../../models/User")



module.exports = async (req, res, next) => {
  console.log("\n\n\n__________________checkIfUserByEmailMiddleware")


  // CHECK IF USER
  let ret_user
  try {
    ret_user = await User.findOne({ email: req.body.email })
  } catch (e) {
    // some error handling
    return res.status(500).json({message: "Querying for user failed"})
  }

  console.log(ret_user)
  res.locals.ret_user = ret_user

  next()

}