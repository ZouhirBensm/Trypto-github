const { UnsubscribeError } = require("../../custom-errors/custom-errors")
const Subscriber = require("../../models/Subscriber")

// Check if the User with posted userId has a subscription i.e. returns true/false
module.exports = async (req, res, next)=>{

  let hasUnSubProcessStarted
  try {
    hasUnSubProcessStarted = await Subscriber.exists({
      userID: req.body.userId,
      expireAt: { $ne: null }
    })
  } catch(error){
    return next(error)
  }



  console.log("\n\n", {hasUnSubProcessStarted})

  res.locals.hasUnSubProcessStarted = hasUnSubProcessStarted;

  if (hasUnSubProcessStarted) {
    let error = new UnsubscribeError(`You have already engaged a request to unsubscribe. No need to request again. Thank you.`, `Sorry, cannot proceed, endpoint ${req.method} ${req.headers.referer} says that the unsubscription process is already engaged.`)
    return next(error)
  }

  next()
}