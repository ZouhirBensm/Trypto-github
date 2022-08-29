const { LoggingInError } = require("../../custom-errors/custom-errors")
const Subscriber = require("../../models/Subscriber")

// Check if the User with posted userId has a subscription i.e. returns true/false
module.exports = async (req, res, next)=>{

  let hasUnSubProcessStarted = await Subscriber.exists({
    userID: req.session.userId,
    expireAt: { $ne: null }
  })

  console.log("\n\n", {hasUnSubProcessStarted})

  res.locals.hasUnSubProcessStarted = hasUnSubProcessStarted;

  if (hasUnSubProcessStarted) {
    return next(new Error(`Sorry, cannot proceed, endpoint ${req.method} ${req.headers.referer} says that the unsubscription process is already engaged.`))
  }

  next()
}