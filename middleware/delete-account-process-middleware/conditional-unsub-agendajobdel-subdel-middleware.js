const fetch = require('node-fetch')
const ENV = require('../../config/base')
const { MongoClient } = require('mongodb');
const uri = ENV.database_link;
const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const utils = require('../../full-stack-libs/utils')


const Subscriber = require('../../models/Subscriber');


module.exports = async (req,res,next)=>{
  let isSelectedUserSubscriber = res.locals.isSelectedUserSubscriber

  console.log("\n\n______make sure we retrieve isSelectedUserSubscriber in the bigMiddleware: ", isSelectedUserSubscriber)


  
  if(!isSelectedUserSubscriber){
    // USER NOT SUBSCRIBER
    return next()
  }


  // USER SUBSCRIBER
  // Determine if required to unsub from paypal ?
  let hasUnSubProcessStarted

  try {
    hasUnSubProcessStarted = await Subscriber.exists({
      userID: req.params.userId,
      expireAt: { $ne: null }
    })
  } catch(e){
    res.locals.notifications.push(e);
  }


  // If unsub triggered get rid of the job that nullifies User.subscriptionId

  if(hasUnSubProcessStarted){
    const jobname = `Nullify particular User: ${req.params.userId} subscriptionID field and set role to UNSUBSCRIBER`
    const numRemoved = await agenda.cancel({ name: jobname });
  } else { // If the unsub process not triggered their is no job to cancel, and  we have established that the user is a subscriber, therefor we make a request to paypal to unsubscribe

    let subscriptionInfo
    try {
      subscriptionInfo = await Subscriber.findOne({userID: req.params.userId}).select('-_id paypal_subscriptionID')
    } catch(e){
      res.locals.notifications.push(e);
    }

    let Authorization_header_value_4_fetch = utils.return_Authorization_header_value_4_fetch()

    let paypal_cancel_sub_response = await fetch(`${process.env.PAYPAL_API_ROOT}/billing/subscriptions/${subscriptionInfo.paypal_subscriptionID}/cancel`, {
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
    

    if(!(paypal_cancel_sub_response.status>199 && paypal_cancel_sub_response.status<301)){
      let e = new Error("Paypal did not successfully unsubscribe the user requesting a account deletion from it's server's")
      res.locals.notifications.push(e);
    }
  }



  // Delete Subscriber where userid = req.params.userId
  let subscriber_deletion_response
  try{
    subscriber_deletion_response = await Subscriber.findOneAndDelete({userID: req.params.userId})
  } catch(e){
    res.locals.notifications.push(e);
  }

  
  return next()

}