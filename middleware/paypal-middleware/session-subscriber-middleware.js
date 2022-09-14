const User = require('../../models/User');


module.exports = async (req,res,next)=>{

  
  let isSelectedUserSubscriber
  try {
    isSelectedUserSubscriber = await User.exists({
      _id: req.params.userId,
      subscriptionID: { $ne: null }
    })
  } catch(e){
    res.locals.notifications.push(e);
  }

  res.locals.isSelectedUserSubscriber = isSelectedUserSubscriber
  next()
}