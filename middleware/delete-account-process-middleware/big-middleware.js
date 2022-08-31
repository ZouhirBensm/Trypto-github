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


  if(isSessionUserSubscriber){
    // see if expireAt field exists on the subscribers where userId = req.session.userId
    let hasUnSubProcessStarted = await Subscriber.exists({
      userID: req.session.userId,
      expireAt: { $ne: null }
    })
  
    console.log("\n\n", {hasUnSubProcessStarted})
  
    if(hasUnSubProcessStarted){
      // let nullify_user_subscription_jobs
      try {
        await mongodbClient.connect();
  
        let nullify_user_subscription_jobs_collection = mongodbClient.db(ENV.database_name).collection("NullifyUserSubscriptionJobs")
        nullify_user_subscription_jobs_deletion_response = await nullify_user_subscription_jobs_collection.findOneAndDelete({name: `Nullify particular User: ${req.session.userId} subscriptionID field`})
  
        console.log("\n\nnullify_user_subscription_jobs_deletion_response:\n\n", nullify_user_subscription_jobs_deletion_response)
        
        console.log(1)
      } catch (e) {
          console.log(2)
          console.error(e);
      } finally {
        console.log(1)
        await mongodbClient.close();
      }
    } else {
      // make api call to paypal to unsubscribe the the user that has not an expiration process under gone
      let subscriptionInfo = await Subscriber.findOne({userID: req.session.userId}).select('paypal_subscriptionID')
  
      console.log("\nsubscriptionInfo___________1\n", subscriptionInfo)
  
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
      
      // TODO if paypal_cancel_sub_response.status in 200s good, else bad for front end UI
      console.log("response!!\n ", paypal_cancel_sub_response)
    }

    // delete subscriber where userid = req.session.userId
    let subscriber_deletion_response
    try{
      subscriber_deletion_response = await Subscriber.findOneAndDelete({userID: req.session.userId})
    } catch(error){
      return next(error)
    }
    console.log("\n\n_______subscriber deletion response: ", subscriber_deletion_response)

  }

  next()

}