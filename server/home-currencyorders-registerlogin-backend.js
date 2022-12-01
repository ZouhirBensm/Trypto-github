// Libraries
const express = require('express')
const multer = require('multer')
const path = require('path')
var { existsSync, mkdirSync } = require('fs');
const httpStatus = require("http-status-codes")
const CoinGecko = require('coingecko-api');

const {ProfileImageUploadError} = require('../custom-errors/custom-errors')


// METHOD 3
const MulterSetup = require('../services/multer-services/multer.src')
const multerinstance = new MulterSetup(`./public/img/temporal-new`, new ProfileImageUploadError("Server Error | Please, try again later", "Directory: temporal-new directory is not present."), new ProfileImageUploadError("Only images with proper extensions i.e. [ png, jpeg, apng, avif, gif, webp ] are allowed.", "Only images with proper extensions i.e. [ png, jpeg, apng, avif, gif, webp ] are allowed."))

// Initializations
const homeOrdersBackend_app_router = express.Router()
const CoinGeckoClient = new CoinGecko();


// ENV variables
const ENV = require('../config/base')
// console.log("\n\nENV-------->\n\n", ENV)




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
const { DeleteAccountProcessError } = require("../custom-errors/custom-errors")


// Controllers
const profileController = require('../controllers/profile-controllers/profile-controllers')
const homeCurrencyOrdersController = require("../controllers/home-currencyorders-controllers/home-currencyorders-controllers")

// const RegisterLoginController = require("../controllers/register-login-controllers/login-controllers")
const LoginController = require("../controllers/register-login-controllers/login-controllers")


const { registerController } = require("../controllers/register-login-controllers/register")
const distributePaginatedDataController = require("../controllers/generic-controllers/distribute-paginated-data-controller")
const { resendConfirmationController } = require("../controllers/register-login-controllers/resend-confirmation-controller")



// Middleware
const profileMiddleware = require('../middleware/profile-middleware/profile-middleware2')
const requireRefererMiddleware = require('../middleware/generic-middleware/require-referer')
const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')
const paginatedOrdersSetupMiddleware = require('../middleware/home-currencyorders-middleware/paginated-orders-setup-middleware')
const currencyordersRetrievalMiddleware = require('../middleware/home-currencyorders-middleware/currencyorders-retrieval-middleware')
const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')
const startEmptyNotificationsMiddleware = require('../middleware/generic-middleware/start-empty-notifications-middleware')
const { getDetailedUserSubscriptionInfo } = require('../middleware/generic-middleware/get-detailed-user-subsciption-information-middleware')
const { getProfilePicNameIfAnyMiddleware } = require('../middleware/generic-middleware/get-profile-pic-name-if-any-middleware')

const deleteMarketOrderMiddleware = require('../middleware/delete-account-process-middleware/delete-market-order-middleware.js')
const deleteBuyCryptoOrdersMiddleware = require('../middleware/delete-account-process-middleware/delete-buycryptoorders-middleware')
const deleteSellOrdersMiddleware = require('../middleware/delete-account-process-middleware/delete-sellcryptoorders-middleware')
const deleteProtagonistsMiddleware = require('../middleware/delete-account-process-middleware/delete-protagonists-middleware')
const deleteMessagesMiddleware = require('../middleware/delete-account-process-middleware/delete-messages-middleware')
const sessionSubscriberMiddleware = require('../middleware/paypal-middleware/session-subscriber-middleware')

// RENAME
const deleteIfAgendaJobThatUnsubsUserOnBidBlockMiddleware = require('../middleware/delete-account-process-middleware/delete-if-agenda-job-that-unsubs-user-on-bidblock-middleware')


const deleteUserMiddleware = require('../middleware/delete-account-process-middleware/delete-user-middleware')
const deleteHexMiddleware = require('../middleware/delete-account-process-middleware/delete-hex-middleware')

const deleteUserProfileImageIfAnyMiddleware = require('../middleware/delete-account-process-middleware/delete-user-profile-image-ifany-middleware')
const deleteFSProfilePictureIfAnyMiddleware = require('../middleware/delete-account-process-middleware/delete-fs-profile-picture-ifany-middleware')


const logoutMiddleware = require('../middleware/generic-middleware/logout-middleware')
// const checkPathUserIdMiddleware = require('../middleware/generic-middleware/check-path-userId-middleware')

const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')


const verifyingPasswordMiddleware = require('../middleware/loggedin-middleware/verifying-password-middleware')


const {responseMessageSetterMiddleware} = require('../middleware/reset-password-middleware/response-message-middleware')
// const responseMessageMiddleware = require('../middleware/reset-password-middleware/response-message-middleware')
const verifyingAccountActiveMiddleware = require('../middleware/loggedin-middleware/verifying-account-active-middleware')
const checkIfUserByEmailMiddleware = require('../middleware/generic-middleware/check-if-user-by-email-middleware')
const checkIfUserSetAndUsedRequestForPasswordResetMiddleware = require('../middleware/generic-middleware/check-if-user-set-and-used-request-for-password-reset-middleware')
const createHashForPasswordResetLinkMiddleware = require('../middleware/reset-password-middleware/create-hash-for-password-reset-link-middleware')
const sendEmailToResetPasswordMiddleware = require('../middleware/reset-password-middleware/send-email-to-reset-password-middleware')


const reHachHexForPassResetMiddleware = require('../middleware/reset-password-middleware/re-hach-hex-for-pass-reset-middleware')

const markHashForPasswordResetAsUsedMiddleware = require('../middleware/reset-password-middleware/mark-hash-forpassword-reset-as-used-middleware')
const retrieveTheHashForPasswordResetMiddleware = require('../middleware/reset-password-middleware/retrieve-the-hash-for-password-reset-middleware')
const createAndUpdateNewPasswordController = require('../controllers/reset-password-controllers/create-and-update-new-password-controller')



// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")

const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")

const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")






// Database Models
const User = require('../models/User')
const HexForUnactiveUser = require('../models/HexForUnactiveUser');
const UserProfileImage = require('../models/UserProfileImage');

// Errors
const {MongoError} = require('../custom-errors/custom-errors')





// Start middleware for this homeOrdersBackend_app_router
homeOrdersBackend_app_router.use(set_user_if_any, (req, res, next) => {
  // Might need this as a "script endpoint global" variable!
  // res.locals.userId = req.session.userId
  navBars = NAVBAR.CLIENTS
  next()
})



homeOrdersBackend_app_router.get('/users/profile', require_loggedin_for_pages(true), authenticate_role_for_pages([ROLE.USER.SUBSCRIBER.BASIC, ROLE.USER.NOTSUBSCRIBER, ROLE.MASTER]), getDetailedUserSubscriptionInfo("SESSION"), getProfilePicNameIfAnyMiddleware("SESSION"), homeCurrencyOrdersController.renderMgtUserSPAController)


homeOrdersBackend_app_router.post('/users/upload/userprofileimage/:selectedUserID', multerinstance.upload.single('image'), profileMiddleware.makeSureDestinationFolderPresentMiddleware, profileMiddleware.sharpAndDisplaceNewProfilePicMiddleware, profileMiddleware.isThereProfilePicAlreadyMiddleware, profileMiddleware.retrievePrevImageInfo_DeletePrevPic_DeletePicEntry_Middleware,profileMiddleware.instantiateNewImageMiddleware, profileMiddleware.editUsersLinkedImageIDMiddleare, profileMiddleware.saveNewImageEntryMiddleware, profileController.sucessUploadProfilePicController)



















homeOrdersBackend_app_router.post('/users/submission-new-password', responseMessageSetterMiddleware("Server Error, please try again later."), reHachHexForPassResetMiddleware, markHashForPasswordResetAsUsedMiddleware, retrieveTheHashForPasswordResetMiddleware, createAndUpdateNewPasswordController)



homeOrdersBackend_app_router.get(`/users/requestresetpasswordpage/:hex`, (req, res) => {


  var JSX_to_load = 'MgtUser';

  // console.log("Response locals: ___________________/n", res.locals, "\n\n____________________")
  return res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
    // selectedUser: undefined
    // hash: res.locals.hash
  })


})







// TODO ! resend confirm email on pop up in the login interface

homeOrdersBackend_app_router.post('/users/requestpasswordresetbyemail', responseMessageSetterMiddleware("If a user under those credentials exists, an email with the reset link shall be sent."), destructureURLandRefererMiddleware, checkIfUserByEmailMiddleware, checkIfUserSetAndUsedRequestForPasswordResetMiddleware, createHashForPasswordResetLinkMiddleware, sendEmailToResetPasswordMiddleware, (req, res) => {

  // check if user is active if so proceed else popup with reason
  // create a entry with parameter code, created date, expiry 1 hour
  // send email with userID, and parameter code


  res.status(200).json({
    message: "If a user under those credentials exists, an email with the reset link shall be sent."
  })
})





homeOrdersBackend_app_router.get('/users/forgotpasswordpage', (req, res) => {
  var JSX_to_load = 'MgtUser';

  // console.log("Response locals: ___________________/n", res.locals, "\n\n____________________")
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
    // selectedUser: undefined
  })
  res.status(200).end()
})







homeOrdersBackend_app_router.post('/check/user/register', requireRefererMiddleware, LoginController.checkRegisterController)



homeOrdersBackend_app_router.post('/users/register', requireRefererMiddleware, require_loggedin_for_data(false), destructureURLandRefererMiddleware, LoginController.validateController, registerController)











homeOrdersBackend_app_router.get('/resend-user-email/:userEmail', destructureURLandRefererMiddleware, resendConfirmationController)






homeOrdersBackend_app_router.get('/', (req, res) => {

  res.locals.userId = req.session.userId
  res.locals.popup = req.query.popup


  console.log("\n\n\nBack in get '/' route\nAre we still logged in?\n", req.session.userId, "\nDo we have any pop-up messages: \n", req.query.popup)


  var JSX_to_load = 'App';
  // console.log("Response locals: ___________________/n", res.locals, "\n\n____________________")

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', { JSX_to_load: JSX_to_load })
  // res.render('test')
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


















homeOrdersBackend_app_router.get('/confirm-user-email/:userID/:hexfield', async (req, res, next) => {

  // CHECK IF USER
  let ret_user
  try {
    ret_user = await User.findOne({ _id: req.params.userID })
  } catch (e) {
    utils.redBkLog(e)
    return res.render('bodies/error')
  }

  if (!ret_user) {
    // if(true) {
    let e = new Error("No found user under that UID")
    utils.redBkLog(e)
    return res.render('bodies/error')
  }

  console.log(ret_user)

  // CHECK IF ACTIVE OR NOT
  if (ret_user.active) {
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

  if (ret_user_hex.hexfield != req.params.hexfield) {
    utils.redBkLog(e)
    return res.render('bodies/error')
  }

  let updated_user_ret
  // HEXs ARE EQUAL
  try {
    updated_user_ret = await User.updateOne({ _id: req.params.userID }, { active: true, $unset: { hexforunactiveuserID: 1 } }, { upsert: false, new: true });
  } catch (e) {
    utils.redBkLog(e)
    return res.render('bodies/error')
  }



  console.log(updated_user_ret)

  if (updated_user_ret.nModified == 0) {
    let e = new Error("Was unable to upadate the users active to true, and unset the hexforunactiveuserID field")
    utils.redBkLog(e)
    return res.render('bodies/error')
  }



  // RID OF THE HEX ENTRY
  let ret_delete_hex
  try {
    ret_delete_hex = await HexForUnactiveUser.deleteOne({ _id: ret_user.hexforunactiveuserID })
  } catch (e) {
    utils.redBkLog(e)
    return res.render('bodies/error')
  }

  console.log("ret_delete_hex--->", ret_delete_hex)


  let sucess_message = `Congrats you have successfully confirmed your account!`

  res.redirect(`/users/login?popup=${sucess_message}`)
})































homeOrdersBackend_app_router.get('/cryptoprice', async (req, res, next) => {

  let params = {
    ids: ['bitcoin'],
    vs_currencies: ['cad', 'usd', 'eur']
  }

  let data
  try {
    data = await CoinGeckoClient.simple.price(params)
  } catch (e) {
    return next(e)
  }

  console.log(data)
  return res.json({
    data: data.data
  })
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
















homeOrdersBackend_app_router.get('/paginated-orders/:type_orders/:data_of_userID?', requireRefererMiddleware, require_loggedin_for_data(true), requester_auth_middleware(5), paginatingSetupMiddleware, destructureURLandRefererMiddleware, paginatedOrdersSetupMiddleware, currencyordersRetrievalMiddleware, distributePaginatedDataController)


homeOrdersBackend_app_router.post('/users/login', requireRefererMiddleware, require_loggedin_for_data(false), verifyingAccountActiveMiddleware, verifyingPasswordMiddleware, LoginController.loginController)









// TODO add userID for articles
homeOrdersBackend_app_router.delete('/users/profile/delete/:userId', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), requester_auth_middleware(4), startEmptyNotificationsMiddleware, deleteBuyCryptoOrdersMiddleware, deleteSellOrdersMiddleware, deleteMarketOrderMiddleware, deleteProtagonistsMiddleware, deleteMessagesMiddleware,
deleteUserProfileImageIfAnyMiddleware, deleteFSProfilePictureIfAnyMiddleware,
sessionSubscriberMiddleware, deleteIfAgendaJobThatUnsubsUserOnBidBlockMiddleware, deleteHexMiddleware, deleteUserMiddleware, logoutMiddleware, (req, res, next) => {

  console.log("Final point: ", res.locals.notifications.length)

  

  if (res.locals.notifications.length !== 0) {
    let notifications_messages = res.locals.notifications.map(notification => notification.message);
    let e = new DeleteAccountProcessError(notifications_messages)
    return next(e)
  } 


  return res.status(200).json({
    srv_: "User account and linked data completly deleted."
  })

})



// KEPT AS REFERENCE
// homeOrdersBackend_app_router.delete('/users/profile/delete/:userId', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), requester_auth_middleware(4), startEmptyNotificationsMiddleware, deleteUserProfileImageIfAnyMiddleware, deleteFSProfilePictureIfAnyMiddleware, (req, res, next) => {

//   console.log("Final point: ", res.locals.notifications.length)

  

//   if (res.locals.notifications.length !== 0) {
//     let notifications_messages = res.locals.notifications.map(notification => notification.message);
//     let e = new DeleteAccountProcessError(notifications_messages)
//     return next(e)
//   } 


//   return res.status(200).json({
//     srv_: "User account and linked data completly deleted."
//   })
  
// })











module.exports = homeOrdersBackend_app_router
//router references the homeOrdersBackend const


// Manually create a webhook
// https://riptutorial.com/paypal/example/1867/testing-sandbox-webhooks-with-ngrok-and-express--node-