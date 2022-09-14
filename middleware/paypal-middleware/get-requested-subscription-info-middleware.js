const fetch = require('node-fetch')
const ENV = require('../../config/base')
const Subscriber = require('../../models/Subscriber')
const utils = require('../../full-stack-libs/utils')

module.exports = async (req,res, next) =>{
  console.log('in post paypal/unsubscribe req.body', req.body)
  // console.log({isSessionUserSubscriber: res.locals.isSessionUserSubscriber})

  // Find Subscription information
  let subscriptionInfo
  try {
    subscriptionInfo = await Subscriber.findOne({userID: req.body.userId}).select('plan subscriptionDateTime paypal_subscriptionID paypal_plan_id')
  } catch(error){
    return next(error)
  }

  res.locals.subscriptionInfo = subscriptionInfo
  

  console.log("\nsubscriptionInfo___________1\n", subscriptionInfo)


  // Kept as reference
  // let sessionUser = null

  // let query = User.findOne({
  //   _id: req.body.userId,
  //   subscriptionID: subscriptionInfo._id
  // })
  // .select('subscriptionID -_id')

  // query = query.populate({
  //   // Populate protagonists
  //   path: "subscriptionID", 
  //   // Fields allowed to populate with
  //   select: "-_id plan subscriptionDateTime paypal_subscriptionID paypal_plan_id",
  // })

  
  // sessionUser = await query.exec()
  // console.log("\nUserWithSubscription___________2\n", sessionUser)

  next()



}