const User = require('../../models/User')



module.exports = async (req,res,next)=>{
  
  try{
    await User.findByIdAndDelete(req.session.userId, (error, user) =>{ 
      if(error){res.locals.notifications.push(error);}
      console.log("user deleted", user)
    })
  } catch(e) {
    res.locals.notifications.push(e);
  }

  next()
}