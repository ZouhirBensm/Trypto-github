const express = require('express')
const fetch = require('node-fetch')
const ENV = require('../config/base');
const Subscriber = require('../models/Subscriber');
const User = require('../models/User');
const utils = require('../full-stack-libs/utils')

const paypalBackend_app_router = express.Router()

// Import checkSession_is_subscriberMiddleware
const checkSession_is_subscriberMiddleware = require('../middleware/paypal-middleware/check-session-is-subscriber-middleware')
// Import checkPostedUserID_is_SessionUserIDMiddleware
const checkPostedUserID_is_SessionUserIDMiddleware = require('../middleware/generic/check-posted-userid-is-session-userID-middleware')



// TODO: delete these folders/files
// /Users/Zouhir/Documents/MERN/BlockchainMERN/controllers/paypal-controllers/ipn.ctrl.js

// const IPNController = require('../controllers/paypal-controllers/ipn.ctrl')

// Import paypalSubscriptionDeletionMiddleware
const paypalSubscriptionDeletionMiddleware = require('../middleware/paypal-middleware/paypal-subscription-deletion-middleware')



// Route is called upon as request from browser as '/paypal/'
paypalBackend_app_router.get('/',   (req,res) =>{
  res.status(200).send('paypal home');
  res.end();
})

//_____________________________________________

// TODO create a is logged in middleware and put in position: 1
paypalBackend_app_router.post('/unsubscribe', checkPostedUserID_is_SessionUserIDMiddleware, checkSession_is_subscriberMiddleware, paypalSubscriptionDeletionMiddleware, async (req,res) => {

  let paypal_cancel_sub_response_status = res.locals.paypalCancelSubResponseStatus
  let subscriptionInfo = res.locals.subscriptionInfo

  console.log("in the end controller for paypal/unsubscribe we got: ", paypal_cancel_sub_response_status)
  
  // In the 200 range
  if(paypal_cancel_sub_response_status > 199 || paypal_cancel_sub_response_status < 300 ){
    
    const SubscriptiondeletionReturn = await Subscriber.findOneAndDelete({_id: subscriptionInfo._id})
    

    // TODO Unset the subscriptionID, completly gets rid of the subscriptionID field, see if it's better to set it to null OR create without a subscriptionID when free plan, and create the field on basic plan
    // TODO apply the changes at the next month registration date day
    let userUnsubscribed = await User.updateOne({_id: req.session.userId}, {$unset: {subscriptionID: 1 }});

    // let userToUnsubscribe = await User.findOne({ _id: req.session.userId })
    // userToUnsubscribe.subscriptionID = null
    // userToUnsubscribe =  await userToUnsubscribe.save()

    res.status(200).send('POST to /paypal/unsubscribe response when done, you should have the user unsubscribed now!');
    res.end();
  } else {
    res.status(200).send('POST to /paypal/unsubscribe response when done, subsciption is  still on BidBlock and Paypal files, please contact an admin to unsubscribe properly!');
    res.end();
  }

})



// paypalBackend_app_router.post('/unsubscribe', checkPostedUserID_is_SessionUserIDMiddleware, checkSession_is_subscriberMiddleware, async (req,res, next) =>{

//   console.log("in post /paypal/unsubscribe endpoint res.locals.isSessionUserSubscriber", res.locals.isSessionUserSubscriber)
//   console.log('in post paypal/unsubscribe req.body', req.body)

//   // Proceeding from this point session User has a subscription
//   if (!res.locals.isSessionUserSubscriber) {
//     return next(new Error("sorry, cannot proceed, endpoint requires the logged in user to be a subscriber"))
//   }


//   // Find Subscription information
//   let subscriptionInfo = await Subscriber.findOne({userID: req.session.userId}).select('plan subscriptionDateTime paypal_subscriptionID paypal_plan_id')
  

//   console.log("\nsubscriptionInfo___________1\n", subscriptionInfo)


//   // Kept as reference
//   // let sessionUser = null

//   // let query = User.findOne({
//   //   _id: req.session.userId,
//   //   subscriptionID: subscriptionInfo._id
//   // })
//   // .select('subscriptionID -_id')

//   // query = query.populate({
//   //   // Populate protagonists
//   //   path: "subscriptionID", 
//   //   // Fields allowed to populate with
//   //   select: "-_id plan subscriptionDateTime paypal_subscriptionID paypal_plan_id",
//   // })

  
//   // sessionUser = await query.exec()
//   // console.log("\nUserWithSubscription___________2\n", sessionUser)



//   let Authorization_header_value_4_fetch = utils.return_Authorization_header_value_4_fetch()


//   // TODO Fetch is soon to be implemented in node: Node v17, in the meantime use other api
//   let response = await fetch(`${ENV.paypal_api_root}/billing/subscriptions/${subscriptionInfo.paypal_subscriptionID}/cancel`, {
//     body: JSON.stringify({
//       reason: "reason not yet implemented in the BidBlock application",
//     }),
//     headers: {
//       Authorization: `${Authorization_header_value_4_fetch}`,
//       "Content-Type": "application/json"
//     },
//     method: "POST"
//   })

//   console.log("response!!\n ", response)




//   // if response between 200 and 299 -> delete subscriber entry where userId = req.session.userId and let user know he has been unsubscribed
//   // else notify the user that their subscription is still on file and is required to call for a manual unsubsciption by an admin

//   res.status(200).send('POST to /paypal/unsubscribe response when done');
//   res.end();
// })

//_____________________________________________

// paypalBackend_app_router.post('/ipn', IPNController.index)



module.exports = paypalBackend_app_router