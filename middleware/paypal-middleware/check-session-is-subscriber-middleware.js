const { UnsubscribeError } = require("../../custom-errors/custom-errors")
const Subscriber = require("../../models/Subscriber")
const User = require("../../models/User")

// Check if the User with posted userId has a subscription i.e. returns true/false
module.exports = async (req, res, next)=>{

  let isSessionUserSubscriber = await User.exists({
    _id: req.session.userId,
    subscriptionID: { $ne: null }
  })

  console.log("\n\n/check-session-is-subscriber-middleware.js\n", {isSessionUserSubscriber})

  res.locals.isSessionUserSubscriber = isSessionUserSubscriber;

  if (!isSessionUserSubscriber && req.method === 'POST') {
    let error = new UnsubscribeError(`You are not a subscriber to be doing this type of request!`, `Sorry, cannot proceed, endpoint ${req.method} ${req.headers.referer} requires the logged in user to be a subscriber`)
    return next(error)
  }

  next()
}