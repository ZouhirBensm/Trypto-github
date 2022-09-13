const fetch = require('node-fetch')
const ENV = require('../../config/base')
const { MongoClient } = require('mongodb');
const uri = ENV.database_link;
const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const utils = require('../../full-stack-libs/utils')


const Subscriber = require('../../models/Subscriber');


module.exports = async (req,res,next)=>{
  let isSessionUserSubscriber = res.locals.isSessionUserSubscriber

  console.log("\n\n______make sure we retrieve isSessionUserSubscriber in the bigMiddleware: ", isSessionUserSubscriber)


  // Was the user a subscriber i.e. if User with a subscriptionID
  if(isSessionUserSubscriber){

    // If a subscriber check whether or not i'm required to unsubscribe from paypal i.e. does the Subscriber already engaged a expireAt
    let hasUnSubProcessStarted
    try {
      hasUnSubProcessStarted = await Subscriber.exists({
        userID: req.params.userId,
        expireAt: { $ne: null }
      })
    } catch(e){
      res.locals.notifications.push(e);
    }
  
    console.log("\n\n", {hasUnSubProcessStarted})
  
    // If unsub triggered get rid of the job that nullifies User.subscriptionId
    if(hasUnSubProcessStarted){
      
      try {
        await mongodbClient.connect();
        let nullify_user_subscription_jobs_collection = mongodbClient.db(ENV.database_name).collection("effect_users_to_unsubscribe_agendajobs")
        nullify_user_subscription_jobs_deletion_response = await nullify_user_subscription_jobs_collection.findOneAndDelete({name: `Nullify particular User: ${req.params.userId} subscriptionID field and set role to UNSUBSCRIBER`})
        console.log("\n\nnullify_user_subscription_jobs_deletion_response:\n\n", nullify_user_subscription_jobs_deletion_response)
        console.log(1)
      } catch (e) {
          console.log(2)
          // console.error(e);
          res.locals.notifications.push(e);
      } finally {
        console.log(1)
        await mongodbClient.close();
      }
    } else { // If the unsub process not triggered their is no job to nullify, and  we have established that the user is a subscriber, therefor we make a request to paypal to unsubscribe
      let subscriptionInfo
      try {
        subscriptionInfo = await Subscriber.findOne({userID: req.params.userId}).select('-_id paypal_subscriptionID')
        console.log("\nsubscriptionInfo___________1\n", subscriptionInfo)
      } catch(e){
        res.locals.notifications.push(e);
      }
  
      let Authorization_header_value_4_fetch = utils.return_Authorization_header_value_4_fetch()
  
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
      

      if(!(paypal_cancel_sub_response.status>199 && paypal_cancel_sub_response.status<301)){
        let error = new Error("Paypal did not successfully unsubscribe the user requesting a account deletion from it's server's")
        res.locals.notifications.push(error);
        // return next(error)
      }
    }



    // Delete Subscriber where userid = req.params.userId
    let subscriber_deletion_response
    try{
      subscriber_deletion_response = await Subscriber.findOneAndDelete({userID: req.params.userId})
    } catch(error){
      res.locals.notifications.push(error);
    }
    console.log("\n\n_______subscriber deletion response: ", subscriber_deletion_response)

  }

  next()

}