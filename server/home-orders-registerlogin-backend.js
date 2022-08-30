const express = require('express')
const mongoose = require('mongoose')
const fetch = require('node-fetch')

const httpStatus = require("http-status-codes")
const homeOrdersBackend_app_router = express.Router()

const ENV = require('../config/base')

// Manually create a webhook
// https://riptutorial.com/paypal/example/1867/testing-sandbox-webhooks-with-ngrok-and-express--node-


// In case you need to connect to DB #@
const {MongoClient} = require('mongodb');
// try replace with MogoClient.ObjectId
var ObjectId = require('mongodb').ObjectId;
const uri = ENV.database_link;
const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const utils = require('../full-stack-libs/utils')


const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

// Import Long homeOrdersController functions
const homeOrdersController = require("../controllers/home-orders-controllers/home-orders-controllers")
// Import Long RegisterLoginController functions
const RegisterLoginController = require("../controllers/register-login-controllers/register-login-controllers")
// Import distributePaginatedDataController
const distributePaginatedDataController = require("../controllers/generic-controllers/distribute-paginated-data-controller")
// Import isUpController
const isUpController = require("../controllers/generic-controllers/is-up-controller")


// Import loggedInRedirectHome
const loggedInRedirectHome = require('../middleware/loggedin/loggedIn-redirect-home')
// Import checkIfUseridWithinDBmiddleware
const checkIfUseridWithinDBmiddleware = require('../middleware/loggedin/checkIf-userid-withinDB-middleware')

// Import paginatedDataAccessMiddleware
const paginatedDataAccessMiddleware = require('../middleware/generic/paginated-data-access-middleware')

// Import StopIfAlreadyLoggedIn
const StopIfAlreadyLoggedIn = require('../middleware/loggedin/stop-if-already-loggedin')
// Import requireReferer
const requireReferer = require('../middleware/generic/require-referer')
// Import paginatingSetupMiddleware
const paginatingSetupMiddleware = require('../middleware/generic/paginating-setup-middleware')
// Import intermediateMiddlewareOrders
const ordersRetrievalMiddleware = require('../middleware/home-orders-middleware/orders-retrieval-middleware')

// Import checkSession_is_subscriberMiddleware
const checkSession_is_subscriberMiddleware = require('../middleware/paypal-middleware/check-session-is-subscriber-middleware')


// We import the User model, the mongoose connection is already defined for all routers files
const User = require('../models/User')

// No Custom Error needed at the moment
const { CustomError } = require('../custom-errors/custom-errors');

const BuyCryptoOrder = require('../models/home-orders-models/BuyCryptoOrder');
const SellCryptoOrder = require('../models/home-orders-models/SellCryptoOrder');

const Protagonist = require('../models/messaging-models/Protagonist')
const Message = require('../models/messaging-models/Message')
const Subscriber = require('../models/Subscriber')


homeOrdersBackend_app_router.get('/paginated-orders/:type_orders/:userID?', paginatedDataAccessMiddleware, paginatingSetupMiddleware, ordersRetrievalMiddleware, distributePaginatedDataController)



homeOrdersBackend_app_router.get('/users/:what_page', loggedInRedirectHome, checkSession_is_subscriberMiddleware ,async (req,res,next)=>{
  console.log("/users/:what_page: ", req.params.what_page, req.session.userId)
  console.log("/users/:what_page: ", res.locals.isSessionUserSubscriber)
  
  // let isSessionUserSubscriber = await User.exists({
  //   _id: req.session.userId,
  //   subscriptionID: { $ne: null }
  // })

  // console.log({isSessionUserSubscriber})

  let sessionUser = null

  let query = User.findOne({
    _id: req.session.userId,
    // subscriptionID: { $ne: null }
  })
  .select('registrationDateTime email subscriptionID -_id')

  if (res.locals.isSessionUserSubscriber) {
    
    query = query.populate({
      // Populate protagonists
      path: "subscriptionID", 
      // Fields allowed to populate with
      select: "-_id plan subscriptionDateTime paypal_subscriptionID paypal_plan_id expireAt",
    })

  }
  
  sessionUser = await query.exec()
  console.log({sessionUser})
  
  
  var JSX_to_load = 'MgtUser';
  res.render('generic-boilerplate-ejs-to-render-react-components', { 
    JSX_to_load : JSX_to_load, 
    // [sessionUser? "sessionUser": null]: sessionUser,
    sessionUser: sessionUser,
    // [req.params.what_page === "profile" ? "userId": null]: req.session.userId,
  })
})

homeOrdersBackend_app_router.get('/subscription', loggedInRedirectHome, function(req,res,next) {


  console.log("/subscription: ", req.session.userId)



  var JSX_to_load = 'Subscription';
  res.render('generic-boilerplate-ejs-to-render-react-components', { 
    JSX_to_load : JSX_to_load, 
    isPaypalScriptNeeded: true
    // [req.params.what_page === "profile" ? "userId": null]: req.session.userId,
  })
})

// makebuy, makesell, AllMyOrders, matches, buyordersdata, sellordersdata
homeOrdersBackend_app_router.get(['/databases/:what_page?', '/make/:type'], checkIfUseridWithinDBmiddleware, (req,res)=>{

  console.log("what_page: ", req.params.what_page)
  console.log("what_type: ", req.params.type)
  
  var JSX_to_load = 'OrdersApp';

  res.render('generic-boilerplate-ejs-to-render-react-components', { 
    JSX_to_load : JSX_to_load, 
    // [req.params.what_page === "AllMyOrders" ? "userId": null]: req.session.userId,
  })
})


// Login User
homeOrdersBackend_app_router.post('/users/login', requireReferer, StopIfAlreadyLoggedIn, RegisterLoginController.loginController)


// Register New User
homeOrdersBackend_app_router.post('/users/register', requireReferer, StopIfAlreadyLoggedIn, RegisterLoginController.validateController, RegisterLoginController.registerController)

// Check if you can register
homeOrdersBackend_app_router.post('/check/user/register', requireReferer, StopIfAlreadyLoggedIn, RegisterLoginController.checkRegisterController)






homeOrdersBackend_app_router.get('/',(req,res)=>{
  console.log("\n\n\nBack in get '/' route\nAre we still logged in?\n", req.session.userId, "\nDo we have any pop-up messages:: \n", req.query.popup)
  res.locals.popup = req.query.popup

  var JSX_to_load = 'App';
  res.render('generic-boilerplate-ejs-to-render-react-components', { JSX_to_load : JSX_to_load })
})


homeOrdersBackend_app_router.get('/isup', isUpController)

homeOrdersBackend_app_router.get('/cryptoprice', async (req,res,next)=>{

  let params = {
    ids: ['bitcoin', 'ethereum', 'litecoin', 'bitcoin-cash', 'zcash', 'monero'],
    vs_currencies: ['cad', 'usd', 'eur']
  }

  try {
    let data = await CoinGeckoClient.simple.price(params)
    return res.json({
      data: data.data
    })
  } catch(e) {
    console.log(`CoinGeckoClient api call error: ${e}`)
    next(e)
  }
  //console.log(typeof data.data, typeof JSON.stringify(data.data))
})




homeOrdersBackend_app_router.delete('/users/profile/delete/:userId', async (req,res,next)=>{
  console.log("\n\n\n\n____Process to delete user and all of his orders___")
  console.log(req.params.userId, " vs ", req.session.userId)

  console.log("Session:", req.session)

  await BuyCryptoOrder.deleteMany({userid: req.session.userId}, (error, response)=>{
    if(error){return next(error)}
    console.log("buys deleted response", response)
  })
  await SellCryptoOrder.deleteMany({userid: req.session.userId}, (error, response)=>{
    if(error){return next(error)}
    console.log("sells deleted response", response)
  })

  // Gets all id's where protagonist is engaged in conversations [{_id:}, {_id:}, ...]
  let array_of_protagonist_ids_where_user_is_engaged = await Protagonist.find({
    protagonists: {
      $elemMatch: {"$in": [req.session.userId]}
    }
  }, { _id: 1})

  console.log("icit array_of_protagonist_entries_need_tobe_deleted!", array_of_protagonist_ids_where_user_is_engaged)

  await Protagonist.deleteMany({
    protagonists: {
      $elemMatch: {"$in": [req.session.userId]}
    }
  }, (error, response)=>{
    if(error){return next(error)}
    console.log("protagonist deletion response", response)
  })

  // TODO #95 Instead of deleting the message streams one-by-one through each element of the protagonists ID array (i.e. array of reference ID's from the messages collection, that reference all the protagonist entries the logged in user was a protagonist). Feed the Message.deleteMany the array of protagonists ID references and delete all at once i.e. the method itself loops
  for (const obj_id of array_of_protagonist_ids_where_user_is_engaged) {
    console.log(obj_id)

    await Message.deleteOne({
      protagonists: obj_id._id
    }, (error, response)=>{
      if(error){return next(error)}
      console.log("One Message deletion response", response)
    })
  }

  let isSessionUserSubscriber = await User.exists({
    _id: req.session.userId,
    subscriptionID: { $ne: null }
  })


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
      console.log("response!!\n ", paypal_cancel_sub_response)
    }
  }
    


  // TODO delete what it references
  // subscribers entry stays in scenario where subscriber and expiring subscriber
  await User.findByIdAndDelete(req.session.userId, (error, user) =>{ 
    if(error){return next(error)}
    console.log("user deleted", user)
  })

  req.session.destroy()

  // TODO if paypal_cancel_sub_response.status in 200s good, else bad for front end UI
  res.status(200).json({
    srv_: "User account and linked data completly deleted."
  })

  // How to use the DB and do stuff to it. Ideally you would pass the DB from server.js and just manipulate it here #@
  // try {
  //   await client.connect();
  //   // databasesList = await client.db().admin().listDatabases();
  //   // console.log("Databases:");
  //   // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  //   let sessionCollection = await client.db(ENV.database_name).collection("sessions").find()
  //   JSON.parse(sessionCollection.session)
  //   console.log("did it work? ", JSON.parse(sessionCollection.session))

  // } catch (e) {
  //     console.error(e);
  // } finally {
  //   await client.close();
  // }

})







homeOrdersBackend_app_router.patch('/update', homeOrdersController.updateOrderController)

homeOrdersBackend_app_router.get('/current-user-ID', checkIfUseridWithinDBmiddleware, (req,res)=>{
  console.log(req.session.userId)

  res.json({
    srv_usr_ID: req.session.userId
  })
})

homeOrdersBackend_app_router.delete('/delete-this-order', checkIfUseridWithinDBmiddleware, homeOrdersController.deleteOrderController)

homeOrdersBackend_app_router.post('/:type_order/save', checkIfUseridWithinDBmiddleware, homeOrdersController.registerOrder)

homeOrdersBackend_app_router.get('/logout', (req,res)=>{
  //Destroy the Session data, including the userId property
  req.session.destroy(()=>{
      res.redirect('/?popup=You have successfully logged out')
  })
})


module.exports = homeOrdersBackend_app_router
//router references the homeOrdersBackend const