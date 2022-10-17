// Libraries
const express = require('express')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const httpStatus = require("http-status-codes")
const CoinGecko = require('coingecko-api');
var nodemailer = require('nodemailer');

// Initializations
const homeOrdersBackend_app_router = express.Router()
const CoinGeckoClient = new CoinGecko();


// ENV variables
const ENV = require('../config/base')




// In case you need to connect to DB directly
const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
const uri = ENV.database_link;
const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Utils
const utils = require('../full-stack-libs/utils')
const ROLE = require("../full-stack-libs/Types/Role")
const NAVBAR = require('../full-stack-libs/Types/Navbar')


// Custom Error
const { CustomError } = require('../custom-errors/custom-errors');
const { DeleteAccountProcessError } = require("../custom-errors/custom-errors")


// Controllers
const homeCurrencyOrdersController = require("../controllers/home-currencyorders-controllers/home-currencyorders-controllers")
const RegisterLoginController = require("../controllers/register-login-controllers/login-controllers")
const {registerController} = require("../controllers/register-login-controllers/register")
const distributePaginatedDataController = require("../controllers/generic-controllers/distribute-paginated-data-controller")
const isUpController = require("../controllers/generic-controllers/is-up-controller")


// Middleware
const requireRefererMiddleware = require('../middleware/generic-middleware/require-referer')
const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')
const paginatedOrdersSetupMiddleware = require('../middleware/home-currencyorders-middleware/paginated-orders-setup-middleware')
const currencyordersRetrievalMiddleware = require('../middleware/home-currencyorders-middleware/currencyorders-retrieval-middleware')
const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')
const startEmptyNotificationsMiddleware = require('../middleware/generic-middleware/start-empty-notifications-middleware')
const { getDetailedUserSubscriptionInfo } = require('../middleware/generic-middleware/get-detailed-user-subsciption-information-middleware')

const deleteMarketOrderMiddleware = require('../middleware/delete-account-process-middleware/delete-market-order-middleware.js')
const deleteBuyCryptoOrdersMiddleware = require('../middleware/delete-account-process-middleware/delete-buycryptoorders-middleware')
const deleteSellOrdersMiddleware = require('../middleware/delete-account-process-middleware/delete-sellcryptoorders-middleware')
const deleteProtagonistsMiddleware = require('../middleware/delete-account-process-middleware/delete-protagonists-middleware')
const deleteMessagesMiddleware = require('../middleware/delete-account-process-middleware/delete-messages-middleware')
const sessionSubscriberMiddleware = require('../middleware/paypal-middleware/session-subscriber-middleware')
const deleteEffectUserToUnsubscribeMiddleware = require('../middleware/delete-account-process-middleware/delete-effect-user-to-unsubscribe-middleware')
const deleteUserMiddleware = require('../middleware/delete-account-process-middleware/delete-user-middleware')
const logoutMiddleware = require('../middleware/generic-middleware/logout-middleware')
// const checkPathUserIdMiddleware = require('../middleware/generic-middleware/check-path-userId-middleware')
const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')

// const verifyingPasswordMiddleware = require('../middleware/loggedin-middleware/verifying-password-middleware')
const verifyingPasswordMiddleware2 = require('../middleware/loggedin-middleware/verifying-password-middleware2')

const verifyingAccountActiveMiddleware = require('../middleware/loggedin-middleware/verifying-account-active-middleware')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")

const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")

const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")






// Database Models
const User = require('../models/User')
const BuyCryptoOrder = require('../models/home-currencyorders-models/BuyCryptoOrder');
const SellCryptoOrder = require('../models/home-currencyorders-models/SellCryptoOrder');
const Protagonist = require('../models/messaging-models/Protagonist')
const Message = require('../models/messaging-models/Message')
const Subscriber = require('../models/Subscriber');
const HexForUnactiveUser = require('../models/HexForUnactiveUser');





// Start middleware for this homeOrdersBackend_app_router
homeOrdersBackend_app_router.use(set_user_if_any, (req, res, next) => {
  // Might need this as a "script endpoint global" variable!
  // res.locals.userId = req.session.userId
  navBars = NAVBAR.CLIENTS
  next()
})


homeOrdersBackend_app_router.get('/', (req, res) => {

  res.locals.userId = req.session.userId
  res.locals.popup = req.query.popup


  console.log("\n\n\nBack in get '/' route\nAre we still logged in?\n", req.session.userId, "\nDo we have any pop-up messages: \n", req.query.popup)


  var JSX_to_load = 'App';
  // console.log("Response locals: ___________________/n", res.locals, "\n\n____________________")

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', { JSX_to_load: JSX_to_load })
})


homeOrdersBackend_app_router.get('/users/login', require_loggedin_for_pages(false), (req, res, next) => {
  res.locals.popup = req.query.popup

  var JSX_to_load = 'MgtUser';

  // console.log("Response locals: ___________________/n", res.locals, "\n\n____________________")
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
    // selectedUser: undefined
  })
})


homeOrdersBackend_app_router.get('/subscription', require_loggedin_for_pages(false), function (req, res, next) {
  console.log("/subscription: ", req.session.userId)

  var JSX_to_load = 'Subscription';
  res.locals.isPaypalScriptNeeded = true

  console.log("Response locals: ___________________/n", res.locals, "\n\n____________________")
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
    // isPaypalScriptNeeded: true
  })
})


homeOrdersBackend_app_router.get('/users/profile', require_loggedin_for_pages(true), authenticate_role_for_pages([ROLE.USER.SUBSCRIBER.BASIC, ROLE.USER.NOTSUBSCRIBER, ROLE.MASTER]), getDetailedUserSubscriptionInfo("SESSION"), (req, res) => {

  res.locals.userId = req.session.userId


  var JSX_to_load = 'MgtUser';

  // console.log("Response locals: ___________________/n", res.locals, "\n\n____________________")

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
})


// Endpoints
// /btclayerexchange/allmyorders, /btclayerexchange/matches, /btclayerexchange/buyordersdata, /btclayerexchange/sellordersdata
// /btclayerexchange/makebuy, /btclayerexchange/makesell, 
homeOrdersBackend_app_router.get(['/btclayerexchange/:page?'], require_loggedin_for_pages(true), (req, res) => {

  // console.log("page: ", req.params.page)

  console.log("paths:", res.locals.paths_URL)

  // res.locals.paths_URL[0] == "btclayerexchange"? res.locals.userId = req.session.userId: null

  res.locals.userId = req.session.userId

  var JSX_to_load = 'BTClayerexchange';

  // console.log("\n\nResponse locals: ___________________/n", res.locals, "\n\n____________________\n\n")
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
})









homeOrdersBackend_app_router.post('/users/register', requireRefererMiddleware, require_loggedin_for_data(false), destructureURLandRefererMiddleware, RegisterLoginController.validateController, registerController)


// TODO when a account is created and not confirmed for a month, delete the acount automatically




homeOrdersBackend_app_router.get('/confirm-user-email/:userID/:hexfield', async (req, res, next) => {
  // TODO check if user exists -> error
  // check if active -> error
  // only not active pull his hex -> error
  // compare hex -> error
  // change status to active: true
  // json success message

  // CHECK IF USER
  let ret_user
  try {
    ret_user = await User.findOne({ _id: req.params.userID })
  } catch (e) {
    utils.redBkLog(e)
    return res.render('bodies/error')
  }

  if(!ret_user) {
  // if(true) {
    let e = new Error("No found user under that UID")
    utils.redBkLog(e)
    return res.render('bodies/error')
  }

  console.log(ret_user)

  // CHECK IF ACTIVE OR NOT
  if(ret_user.active) {
  // if(true) {
    let e = new Error("Account already active")
    utils.redBkLog(e)
    return res.redirect(`/users/login?popup=${e.message}`)
  }

  // NOT ACTIVE
  // PULL IN HEX

  let ret_user_hex
  try {
    ret_user_hex = await HexForUnactiveUser.findOne({ userID: ret_user._id })
  } catch (e) {
    utils.redBkLog(e)
    return res.render('bodies/error')
  }

  if(ret_user_hex.hexfield != req.params.hexfield) {
    utils.redBkLog(e)
    return res.render('bodies/error')
  }

  let updated_user_ret
  // HEXs ARE EQUAL
  try {
    updated_user_ret = await User.updateOne({_id: req.params.userID}, {active: true, $unset: {hexforunactiveuserID: 1}}, { upsert: false, new: true });
  } catch(e) {
    utils.redBkLog(e)
    return res.render('bodies/error')
  }



  console.log(updated_user_ret)
  
  if(updated_user_ret.nModified == 0) {
    let e = new Error("Was unable to upadate the users active to true, and unset the hexforunactiveuserID field")
    utils.redBkLog(e)
    return res.render('bodies/error')
  }

  
  
  // RID OF THE HEX ENTRY
  let ret_delete_hex
  try {
    ret_delete_hex = await HexForUnactiveUser.deleteOne({_id: ret_user.hexforunactiveuserID})
  } catch (e) {
    utils.redBkLog(e)
    return res.render('bodies/error')
  }

  console.log("ret_delete_hex--->", ret_delete_hex)


  let sucess_message = `Congrats you have successfully confirmed your account!`

  res.redirect(`/users/login?popup=${sucess_message}`)
})

















// TODO add guards
// TODO middleware this code
homeOrdersBackend_app_router.get('/resend-user-email/:userEmail', destructureURLandRefererMiddleware, async (req, res, next) => {

  // TODO refactor errors, and integrate to UI

  console.log(req.params)


  let ret_user
  try {
    ret_user = await User.findOne({ email: req.params.userEmail })
  } catch (e) {
    return next(e)
  }

  if(!ret_user) {
  // if(true) {
    let e = new Error("No found user under that email")
    return next(e)
  }

  if(ret_user.active) {
    let e = new Error("Account already active")
    return next(e)
  }


  let ret_user_hex
  try {
    ret_user_hex = await HexForUnactiveUser.findOne({ userID: ret_user._id })
  } catch (e) {
    return next(e)
  }

  console.log(ret_user)

  let now = new Date()
  // console.log(`Date: ${now},\n\nWelcome ${ret_user.email}!\n\nPlease confirm your ${ENV.domain_without_protocol} account now, by clicking on this link:\n\n${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/confirm-user-email/${ret_user._id}/${ret_user_hex.hexfield}\n\nThank you!`)

  // TODO should be send mail middleware
  // ___________________________________________

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ENV.bidblock_email,
      pass: ENV.bidblock_email_app_pass_code
    }
  });


  console.log("transporter::::\n\n", transporter)
  console.log(2)

  let info
  var mailOptions = {
    from: ENV.bidblock_email,
    to: ret_user.email,
    subject: 'Confirm your BidBlock Account Now!',
    // TODO send email with a link to the server with the hex mounted on to activate the user
    text: `Date: ${now},\n\nWelcome ${ret_user.email}!\n\nPlease confirm your ${ENV.domain_without_protocol} account now, by clicking on this link:\n\n${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/confirm-user-email/${ret_user._id}/${ret_user_hex.hexfield}\n\nThank you!`
  };
  
  try {
    info = await transporter.sendMail(mailOptions);
  } catch (e) {
    return next(e)
  }

  console.log("returned info::::::\n\n\n", info);
  console.log(3)

  // ___________________________________________

  if(info) {
    res.status(200).json({
      message: `Resent the confirmation message @ ${now}`
    })
  } else {
    let e = new Error("Message not sent")
    return next(e)
  }

})







homeOrdersBackend_app_router.post('/check/user/register', requireRefererMiddleware, RegisterLoginController.checkRegisterController)


homeOrdersBackend_app_router.get('/isup', isUpController)



homeOrdersBackend_app_router.get('/cryptoprice', async (req, res, next) => {

  let params = {
    ids: ['bitcoin', 'ethereum', 'litecoin', 'bitcoin-cash', 'zcash', 'monero'],
    vs_currencies: ['cad', 'usd', 'eur']
  }

  try {
    let data = await CoinGeckoClient.simple.price(params)
    return res.json({
      data: data.data
    })
  } catch (e) {
    console.log(`CoinGeckoClient api call error: ${e}`)
    next(e)
  }
  //console.log(typeof data.data, typeof JSON.stringify(data.data))
})












homeOrdersBackend_app_router.patch('/update/:userID', require_loggedin_for_data(true), requester_auth_middleware(2), homeCurrencyOrdersController.updateOrderController)

// Might be needed!
// homeOrdersBackend_app_router.get('/current-user-ID', require_loggedin_for_data(true), (req,res)=>{
//   console.log(req.session.userId)

//   res.json({
//     srv_usr_ID: req.session.userId
//   })
// })


homeOrdersBackend_app_router.delete('/delete-this-order', require_loggedin_for_data(true), homeCurrencyOrdersController.deleteOrderController)




homeOrdersBackend_app_router.post('/:type_order/save', require_loggedin_for_data(true), homeCurrencyOrdersController.registerOrder)





homeOrdersBackend_app_router.get('/logout', require_loggedin_for_data(true), (req, res) => {
  //Destroy the Session data, including the userId property
  req.session.destroy(() => {
    res.status(httpStatus.StatusCodes.PERMANENT_REDIRECT).redirect('/?popup=You have successfully logged out')
  })
})


// TODO add userID for articles
homeOrdersBackend_app_router.delete('/users/profile/delete/:userId', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), requester_auth_middleware(4), startEmptyNotificationsMiddleware, deleteBuyCryptoOrdersMiddleware, deleteSellOrdersMiddleware, deleteMarketOrderMiddleware, deleteProtagonistsMiddleware, deleteMessagesMiddleware,
  sessionSubscriberMiddleware, deleteEffectUserToUnsubscribeMiddleware, deleteUserMiddleware, logoutMiddleware, (req, res, next) => {

    console.log("Final point: ", res.locals.notifications.length, res.locals.notifications.length == 0, res.locals.notifications.length === 0)

    if (res.locals.notifications.length === 0) {
      res.status(200).json({
        srv_: "User account and linked data completly deleted."
      })
    } else {
      console.log("WTFFF")
      let notifications_messages = res.locals.notifications.map(notification => notification.message);
      let e = new DeleteAccountProcessError(notifications_messages)

      return next(e)
    }
  })


// homeOrdersBackend_app_router.delete('/users/profile/delete/:userId', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), requester_auth_middleware(4), startEmptyNotificationsMiddleware, deleteMarketOrderMiddleware, logoutMiddleware, (req,res,next)=>{

//   console.log("Final point: ", res.locals.notifications.length, res.locals.notifications.length == 0, res.locals.notifications.length === 0)

//   if (res.locals.notifications.length === 0){
//     res.status(200).json({
//       srv_: "User account and linked data completly deleted."
//     })
//   } else {
//     console.log("WTFFF")
//     let notifications_messages = res.locals.notifications.map(notification => notification.message);
//     let error = new DeleteAccountProcessError(notifications_messages)

//     return next(error)
//   }
// })












// homeOrdersBackend_app_router.get('/paginated-orders/:type_orders/:data_of_userID?', requireRefererMiddleware, require_loggedin_for_data(true), requester_auth_middleware(5), paginatingSetupMiddleware, destructureURLandRefererMiddleware, paginatedOrdersSetupMiddleware, currencyordersRetrievalMiddleware, distributePaginatedDataController)





// TODO re-put these guards
// requireRefererMiddleware, require_loggedin_for_data(true), requester_auth_middleware(5)
homeOrdersBackend_app_router.get('/paginated-orders/:type_orders/:data_of_userID?', paginatingSetupMiddleware, destructureURLandRefererMiddleware, paginatedOrdersSetupMiddleware, currencyordersRetrievalMiddleware, distributePaginatedDataController)










homeOrdersBackend_app_router.post('/users/login', requireRefererMiddleware, require_loggedin_for_data(false), verifyingAccountActiveMiddleware, verifyingPasswordMiddleware2, RegisterLoginController.loginController)

module.exports = homeOrdersBackend_app_router
//router references the homeOrdersBackend const


// Manually create a webhook
// https://riptutorial.com/paypal/example/1867/testing-sandbox-webhooks-with-ngrok-and-express--node-