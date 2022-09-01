const User = require('../../models/User');


module.exports = async (req,res,next)=>{

  let isSessionUserSubscriber
  try {
    isSessionUserSubscriber = await User.exists({
      _id: req.session.userId,
      subscriptionID: { $ne: null }
    })
  } catch(e){
    res.locals.notifications.push(e);
  }

  res.locals.isSessionUserSubscriber = isSessionUserSubscriber
  next()
}