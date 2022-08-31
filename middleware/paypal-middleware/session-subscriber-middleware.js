const User = require('../../models/User');


module.exports = async (req,res,next)=>{

  let isSessionUserSubscriber = await User.exists({
    _id: req.session.userId,
    subscriptionID: { $ne: null }
  })

  res.locals.isSessionUserSubscriber = isSessionUserSubscriber
  next()
}