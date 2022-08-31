const User = require('../../models/User')



module.exports = async (req,res,next)=>{
  
  await User.findByIdAndDelete(req.session.userId, (error, user) =>{ 
    if(error){return next(error)}
    console.log("user deleted", user)
  })

  next()
}