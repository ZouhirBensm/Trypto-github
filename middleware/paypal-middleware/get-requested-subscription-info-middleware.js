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

  next()



}