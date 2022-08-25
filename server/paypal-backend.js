const express = require('express')
const fetch = require('node-fetch')
const ENV = require('../config/base');
const Subscriber = require('../models/Subscriber');
const utils = require('../full-stack-libs/utils')

const paypalBackend_app_router = express.Router()



// TODO: delete these folders/files
// /Users/Zouhir/Documents/MERN/BlockchainMERN/controllers/paypal-controllers/ipn.ctrl.js

// const IPNController = require('../controllers/paypal-controllers/ipn.ctrl')



// Route is called upon as request from browser as '/paypal/'
paypalBackend_app_router.get('/',   (req,res) =>{
  res.status(200).send('paypal home');
  res.end();
})

//_____________________________________________

// TODO add/create isSessionUserSubscriber middleware
// TODO make the endpoint use req.body.userId to unsubscribe as opposed to req.session.userId
paypalBackend_app_router.post('/unsubscribe', async (req,res) =>{
  console.log('paypal/unsubscribe', req.body)


  let subscriber = await Subscriber.findOne({userID: req.session.userId}).select('paypal_subscriptionID -_id')
  

  console.log("\n___________\n", subscriber.paypal_subscriptionID)

  // let isSessionUserSubscriber = await User.exists({
  //   _id: req.session.userId,
  //   subscriptionID: { $ne: null }
  // })


  // console.log({isSessionUserSubscriber})

  // let sessionUser = null

  // let query = User.findOne({
  //   _id: req.session.userId,
  //   // subscriptionID: { $ne: null }
  // })
  // .select('subscriptionID -_id')

  // if (isSessionUserSubscriber) { 
  //   query = query.populate({
  //     // Populate protagonists
  //     path: "subscriptionID", 
  //     // Fields allowed to populate with
  //     select: "-_id plan subscriptionDateTime paypal_subscriptionID paypal_plan_id",
  //   })
  // }
  
  // sessionUser = await query.exec()
  // console.log({sessionUser})

  // TODO try it without the await
  let Authorization_string_for_fetch = await utils.returnFetchAuthorizationString()


  // TODO Fetch is soon to be implemented in node: Node v17, in the meantime use other api
  let response = await fetch(`${ENV.paypal_api_root}/billing/subscriptions/${subscriber.paypal_subscriptionID}/cancel`, {
    body: JSON.stringify({
      reason: "test_reason",
    }),
    headers: {
      Authorization: `${Authorization_string_for_fetch}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  })

  console.log("response!!\n ", response)



  res.status(200).send('paypal home');
  res.end();
})

//_____________________________________________

// paypalBackend_app_router.post('/ipn', IPNController.index)



module.exports = paypalBackend_app_router