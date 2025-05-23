const User = require('../../models/User')



module.exports = async (req,res,next)=>{
  
  let userDeletionRet
  
  try{
    userDeletionRet = await User.findByIdAndDelete(req.params.userId)
  } catch(e) {
    res.locals.notifications.push(e);
  }

  console.log("userDeletionRet: ", userDeletionRet)

  res.locals.userDeletionRet = userDeletionRet

  return next()
}