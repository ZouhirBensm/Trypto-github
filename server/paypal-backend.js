const express = require('express')
const fetch = require('node-fetch');
const Agenda = require("agenda");
const ENV = require('../config/base');
const httpStatus = require("http-status-codes")

const Subscriber = require('../models/Subscriber');
const User = require('../models/User');
const utils = require('../full-stack-libs/utils')
const billing_utils = require('../full-stack-libs/utils.billing')

// Setting up agenda for persistant jobs on each event when user unsubscribes to nullify their User subscriptionID field
console.log("before agenda: ", db._connectionString)
const agenda = new Agenda({
  db: { 
    address: db._connectionString,
    maxConcurrency: 10, // not having wanted effect of having no more thant 10 jobs processes runing simultaneously total
    defaultConcurrency: 1, // not having wanted effect of 1 process per job
    collection: "NullifyUserSubscriptionJobs"
  },
});





(async function () {
  await agenda.start()
  // const numRemoved = await agenda.cancel({ name: "Nullify particular User subscriptionID field" });

  async function graceful() {
    await agenda.stop();
    await agenda.close({ force: true });
    console.log(" Exiting agenda gracefully...")
    process.exit(0);
  }
  
  process.on("SIGTERM", graceful);
  process.on("SIGINT", graceful);
})();


const paypalBackend_app_router = express.Router()

// Import checkSession_is_subscriberMiddleware
const checkSession_is_subscriberMiddleware = require('../middleware/paypal-middleware/check-session-is-subscriber-middleware')
// Import checkPostedUserID_is_SessionUserIDMiddleware
const checkPostedUserID_is_SessionUserIDMiddleware = require('../middleware/generic/check-posted-userid-is-session-userID-middleware')

const hasUnSubProcessStarted = require('../middleware/paypal-middleware/has-unsub-process-started-middleware')



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
paypalBackend_app_router.post('/unsubscribe', checkPostedUserID_is_SessionUserIDMiddleware, checkSession_is_subscriberMiddleware, hasUnSubProcessStarted, paypalSubscriptionDeletionMiddleware, async (req,res) => {

  let paypal_cancel_sub_response_status = res.locals.paypalCancelSubResponseStatus
  let subscriptionInfo = res.locals.subscriptionInfo

  console.log("in the end controller for paypal/unsubscribe we got: ", subscriptionInfo)
  
  // In the 200 range
  if(paypal_cancel_sub_response_status > 199 && paypal_cancel_sub_response_status < 300 ){

    console.log("\n\nSubscription date time: \n", subscriptionInfo.subscriptionDateTime, "\ntype:\n", typeof subscriptionInfo.subscriptionDateTime)


    let [current_billing_cycle_botom_datetime, current_billing_cycle_top_datetime] = billing_utils.BillingDateTimeCalculator(subscriptionInfo.subscriptionDateTime)

    
    unsubscriptionTakesEffectOnBidBlock = current_billing_cycle_top_datetime;

    console.log("unsubscription takes effect: ", unsubscriptionTakesEffectOnBidBlock)

    console.log({unsubscriptionTakesEffectOnBidBlock})

    // set the expiryAt field of the Subscriber entry at the unsubscriptionTakesEffectOnBidBlock date
    const SubscriptionSetExpityReturn = await Subscriber.findOneAndUpdate({_id: subscriptionInfo._id}, {expireAt: unsubscriptionTakesEffectOnBidBlock})

    agenda.define(`Nullify particular User: ${req.session.userId} subscriptionID field`, async (job, done) => {
      let userUnsubscribed = await User.updateOne({_id: req.session.userId}, {subscriptionID: null});
      console.log("executing the event: Nullify particular User subscriptionID field")
      done()
      const numRemoved = await agenda.cancel({ name: `Nullify particular User: ${req.session.userId} subscriptionID field`});
      console.log("cancelled!")
    });


    await agenda.schedule(unsubscriptionTakesEffectOnBidBlock, `Nullify particular User: ${req.session.userId} subscriptionID field`);

    res.status(httpStatus.StatusCodes.OK).json({
      server: {
        client_message: `You have successfully unsubscribed, your paid for subscription benefits will stay valid until: ${unsubscriptionTakesEffectOnBidBlock}, and recurring charges will seize as of today`,
        admin_message: 'POST to /paypal/unsubscribe response when done, you should have the user unsubscribed now!'
      }
    });
    // res.end();

  } else {

    res.status(httpStatus.StatusCodes.ACCEPTED).json({
      server: {
        client_message: `Unsubscription failed for some backend reason, please contact webmaster to manually unsubscribe for you! contact <a href="https://webdevelopercanada.website/Zouhir">Webmaster's website<a/>`,
        admin_message: 'POST to /paypal/unsubscribe response when done, subsciption is  still on BidBlock and Paypal files, please contact an admin to unsubscribe properly!'
      }
    });
    // res.end();
  }

})

// paypalBackend_app_router.post('/ipn', IPNController.index)



module.exports = paypalBackend_app_router