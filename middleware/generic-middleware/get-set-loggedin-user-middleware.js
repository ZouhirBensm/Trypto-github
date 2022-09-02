const User = require('../../models/User')

module.exports = async (req,res,next)=>{
  await User.findById(req.session.userId, (error,user)=>{
    if(error){return next(error)}
    if(!user){
      return res.status(401).send("No user is logged in")
    }
    res.locals.user = user
  })
  next()
}
