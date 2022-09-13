const User = require('../../models/User')

async function set_user_if_any(req, res, next) {

  let userfindOne
  try {
    userfindOne = await User.findById(req.session.userId).select("-password")
    // console.log("USER:", userfindOne)
    res.locals.user = userfindOne
  } catch (e) {
    return next(error)
  }
  return next()
}



module.exports = {
  set_user_if_any
}