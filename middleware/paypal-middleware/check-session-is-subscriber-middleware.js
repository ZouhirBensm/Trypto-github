const { LoggingInError } = require("../../custom-errors/custom-errors")
const Subscriber = require("../../models/Subscriber")
const User = require("../../models/User")

// Check if the User with posted userId has a subscription i.e. returns true/false
module.exports = async (req, res, next)=>{

  let isSessionUserSubscriber = await User.exists({
    _id: req.session.userId,
    subscriptionID: { $ne: null }
  })

  console.log({isSessionUserSubscriber})

  res.locals.isSessionUserSubscriber = isSessionUserSubscriber;

  next()
}