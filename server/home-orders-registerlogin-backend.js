// Libraries
const express = require('express')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const httpStatus = require("http-status-codes")
const CoinGecko = require('coingecko-api');

// Initializations
const homeOrdersBackend_app_router = express.Router()
const CoinGeckoClient = new CoinGecko();


// ENV variables
const ENV = require('../config/base')




// In case you need to connect to DB directly
const {MongoClient} = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
const uri = ENV.database_link;
const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Utils
const utils = require('../full-stack-libs/utils')
const ROLE = require("../full-stack-libs/Types/Role")



// Custom Error
const { CustomError } = require('../custom-errors/custom-errors');
const { DeleteAccountProcessError } = require("../custom-errors/custom-errors")


// Controllers
const homeOrdersController = require("../controllers/home-orders-controllers/home-orders-controllers")
const RegisterLoginController = require("../controllers/register-login-controllers/register-login-controllers")
const distributePaginatedDataController = require("../controllers/generic-controllers/distribute-paginated-data-controller")
const isUpController = require("../controllers/generic-controllers/is-up-controller")


// Middleware
const requireRefererMiddleware = require('../middleware/generic-middleware/require-referer')
const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')
const ordersRetrievalMiddleware = require('../middleware/home-orders-middleware/orders-retrieval-middleware')
const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')


const  deleteBuyCryptoOrdersMiddleware = require('../middleware/delete-account-process-middleware/delete-buycryptoorders-middleware')
const  deleteSellOrdersMiddleware = require('../middleware/delete-account-process-middleware/delete-sellcryptoorders-middleware')
const  deleteProtagonistsMiddleware = require('../middleware/delete-account-process-middleware/delete-protagonists-middleware')
const  deleteMessagesMiddleware = require('../middleware/delete-account-process-middleware/delete-messages-middleware')
const  sessionSubscriberMiddleware = require('../middleware/paypal-middleware/session-subscriber-middleware')
const  deleteEffectUserToUnsubscribeMiddleware = require('../middleware/delete-account-process-middleware/delete-effect-user-to-unsubscribe-middleware')
const  deleteUserMiddleware = require('../middleware/delete-account-process-middleware/delete-user-middleware')
const  logoutMiddleware = require('../middleware/generic-middleware/logout-middleware')
const checkPathUserIdMiddleware = require('../middleware/generic-middleware/check-path-userId-middleware')

const verifyingPasswordMiddleware = require('../middleware/loggedin-middleware/verifying-password-middleware')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } =  require("../middleware/generic-middleware/set-user-if-any-middleware")

const {require_loggedin_for_pages, require_loggedin_for_data} = require("../middleware/generic-middleware/check-loggedin-middleware")

const { authenticate_role_for_pages, authenticate_role_for_data } =  require("../middleware/generic-middleware/authenticate-role-middleware")






// Database Models
const User = require('../models/User')
const BuyCryptoOrder = require('../models/home-orders-models/BuyCryptoOrder');
const SellCryptoOrder = require('../models/home-orders-models/SellCryptoOrder');
const Protagonist = require('../models/messaging-models/Protagonist')
const Message = require('../models/messaging-models/Message')
const Subscriber = require('../models/Subscriber')


// Start middleware for this homeOrdersBackend_app_router
homeOrdersBackend_app_router.use(set_user_if_any, (req, res, next) => {
  next()
})


// require_loggedin_for_data(true)
// for test 1@
// requireRefererMiddleware
homeOrdersBackend_app_router.get('/paginated-orders/:type_orders/:userID?', requireRefererMiddleware, require_loggedin_for_data(true), paginatingSetupMiddleware, destructureURLandRefererMiddleware, ordersRetrievalMiddleware, distributePaginatedDataController)


homeOrdersBackend_app_router.get('/users/login', require_loggedin_for_pages(false), (req,res,next)=>{
  var JSX_to_load = 'MgtUser';
  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load,
  })
})


homeOrdersBackend_app_router.get('/subscription', require_loggedin_for_pages(false), function(req,res,next) {
  console.log("/subscription: ", req.session.userId)

  var JSX_to_load = 'Subscription';
  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load, 
    isPaypalScriptNeeded: true
  })
})


homeOrdersBackend_app_router.get('/users/profile', require_loggedin_for_pages(true), authenticate_role_for_pages([ROLE.USER.SUBSCRIBER.BASIC, ROLE.USER.NOTSUBSCRIBER, ROLE.MASTER]) , async (req,res,next)=>{

  let sessionUser = null

  let query = User.findOne({
    _id: req.session.userId,
    // subscriptionID: { $ne: null }
  })
  .select('registrationDateTime email subscriptionID -_id')

  query = query.populate({
    // Populate protagonists
    path: "subscriptionID", 
    // Fields allowed to populate with
    select: "-_id plan subscriptionDateTime paypal_subscriptionID paypal_plan_id expireAt",
  })
  
  sessionUser = await query.exec()
  console.log({sessionUser})
  

  var JSX_to_load = 'MgtUser';
  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load, 
    // [sessionUser? "sessionUser": null]: sessionUser,
    sessionUser: sessionUser,
    // [req.params.what_page === "profile" ? "userId": null]: req.session.userId,
  })
})

// Endpoints
// /databases/AllMyOrders, /databases/matches, /databases/buyordersdata, /databases/sellordersdata
// /make/makebuy, /make/makesell, 
homeOrdersBackend_app_router.get(['/databases/:what_page?', '/make/:type'], require_loggedin_for_pages(true), (req,res)=>{

  console.log("what_page: ", req.params.what_page)
  console.log("what_type: ", req.params.type)
  
  var JSX_to_load = 'OrdersApp';

  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load,
  })
})


homeOrdersBackend_app_router.post('/users/login', requireRefererMiddleware, require_loggedin_for_data(false), verifyingPasswordMiddleware, RegisterLoginController.loginController)


homeOrdersBackend_app_router.post('/users/register', requireRefererMiddleware, require_loggedin_for_data(false), RegisterLoginController.validateController, RegisterLoginController.registerController)


homeOrdersBackend_app_router.post('/check/user/register', requireRefererMiddleware, RegisterLoginController.checkRegisterController)



homeOrdersBackend_app_router.get('/',(req,res)=>{
  console.log("\n\n\nBack in get '/' route\nAre we still logged in?\n", req.session.userId, "\nDo we have any pop-up messages: \n", req.query.popup)

  res.locals.popup = req.query.popup

  var JSX_to_load = 'App';
  res.render('generic-boilerplate-ejs-to-render-react-components-client', { JSX_to_load : JSX_to_load })
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


homeOrdersBackend_app_router.delete('/users/profile/delete/:userId', checkPathUserIdMiddleware, deleteBuyCryptoOrdersMiddleware, deleteSellOrdersMiddleware, deleteProtagonistsMiddleware, deleteMessagesMiddleware, sessionSubscriberMiddleware, deleteEffectUserToUnsubscribeMiddleware, deleteUserMiddleware, logoutMiddleware, (req,res,next)=>{
  console.log("Final point: ", res.locals.notifications.length, res.locals.notifications.length == 0, res.locals.notifications.length === 0)

  if (res.locals.notifications.length === 0){
    res.status(200).json({
      srv_: "User account and linked data completly deleted."
    })
  } else {
    console.log("WTFFF")
    let notifications_messages = res.locals.notifications.map(notification => notification.message);
    let error = new DeleteAccountProcessError(notifications_messages)

    return next(error)
  }
})



homeOrdersBackend_app_router.patch('/update', require_loggedin_for_data(true), homeOrdersController.updateOrderController)



homeOrdersBackend_app_router.get('/current-user-ID', require_loggedin_for_data(true), (req,res)=>{
  console.log(req.session.userId)

  res.json({
    srv_usr_ID: req.session.userId
  })
})


homeOrdersBackend_app_router.delete('/delete-this-order', require_loggedin_for_data(true), homeOrdersController.deleteOrderController)


homeOrdersBackend_app_router.post('/:type_order/save', require_loggedin_for_data(true), homeOrdersController.registerOrder)


homeOrdersBackend_app_router.get('/logout', require_loggedin_for_data(true), (req,res)=>{
  //Destroy the Session data, including the userId property
  req.session.destroy(()=>{
      res.redirect('/?popup=You have successfully logged out')
  })
})


module.exports = homeOrdersBackend_app_router
//router references the homeOrdersBackend const


// Manually create a webhook
// https://riptutorial.com/paypal/example/1867/testing-sandbox-webhooks-with-ngrok-and-express--node-