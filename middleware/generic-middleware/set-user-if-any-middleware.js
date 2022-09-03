const User = require('../../models/User')

async function set_user_if_any(req, res, next) {
  let userfindOne = await User.findById(req.session.userId, (error,user)=>{
    if(error){return next(error)}
    res.locals.user = user
  })
  return next()
}



module.exports = {
  set_user_if_any
}