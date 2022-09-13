const User = require('../../models/User');


module.exports = async (req,res,next)=>{

  // TODO: rename this varible to something with more sense
  let isSessionUserSubscriber
  try {
    isSessionUserSubscriber = await User.exists({
      _id: req.params.userId,
      subscriptionID: { $ne: null }
    })
  } catch(e){
    res.locals.notifications.push(e);
  }

  res.locals.isSessionUserSubscriber = isSessionUserSubscriber
  next()
}