const fetch = require('node-fetch')
const ENV = require('../../config/base')
const Subscriber = require('../../models/Subscriber')
const utils = require('../../full-stack-libs/utils')

module.exports = async (req,res, next) =>{
  console.log('in post paypal/unsubscribe req.body', req.body)
  console.log({isSessionUserSubscriber: res.locals.isSessionUserSubscriber})


  // Proceeding from this point session User has a subscription
  // TODO requires to be deleted and checked in the proper middleware i.e. where isSessionUserSubscriber stems 

  // if (!res.locals.isSessionUserSubscriber) {
  //   return next(new Error(`Sorry, cannot proceed, endpoint ${req.method} ${req.headers.referer} requires the logged in user to be a subscriber`))
  // }

  // Find Subscription information
  let subscriptionInfo = await Subscriber.findOne({userID: req.session.userId}).select('plan subscriptionDateTime paypal_subscriptionID paypal_plan_id')

  res.locals.subscriptionInfo = subscriptionInfo
  

  console.log("\nsubscriptionInfo___________1\n", subscriptionInfo)


  // Kept as reference
  // let sessionUser = null

  // let query = User.findOne({
  //   _id: req.session.userId,
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



  let Authorization_header_value_4_fetch = utils.return_Authorization_header_value_4_fetch()


  // TODO Fetch is soon to be implemented in node: Node v17, in the meantime use other api
  let paypal_cancel_sub_response = await fetch(`${ENV.paypal_api_root}/billing/subscriptions/${subscriptionInfo.paypal_subscriptionID}/cancel`, {
    body: JSON.stringify({
      reason: "reason not yet implemented in the BidBlock application",
    }),
    headers: {
      Authorization: `${Authorization_header_value_4_fetch}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  })

  console.log("response!!\n ", paypal_cancel_sub_response)

  
  res.locals.paypalCancelSubResponseStatus = paypal_cancel_sub_response.status

  next()



}