// Libraries
const express = require('express')
const multer = require('multer')
// const path = require('path')
// var { existsSync, mkdirSync } = require('fs');
const httpStatus = require("http-status-codes")
const CoinGecko = require('coingecko-api');

const {ProfileImageUploadError} = require('../custom-errors/custom-errors')

const MulterSetup = require('../services/multer-services/multer.src')
const multerinstance = new MulterSetup(`./public/img/temporal-new`, new ProfileImageUploadError("Server Error | Please, try again later", "Directory: temporal-new directory is not present."), new ProfileImageUploadError("Only images with proper extensions i.e. [ png, jpeg, apng, avif, gif, webp ] are allowed.", "Only images with proper extensions i.e. [ png, jpeg, apng, avif, gif, webp ] are allowed."))

// Initializations
const homeOrdersBackend_app_router = express.Router()
const CoinGeckoClient = new CoinGecko();


// ENV variables
const ENV = require('../config/base')

// In case you need to connect to DB directly
const { MongoClient } = require('mongodb');
// var ObjectId = require('mongodb').ObjectId;
const uri = ENV.database_link;
// const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Utils
const utils = require('../full-stack-libs/utils')
const ROLE = require("../full-stack-libs/Types/Role")
const NAVBAR = require('../full-stack-libs/Types/Navbar')



// Controllers
const profileController = require('../controllers/profile-controllers/profile-controllers')
const homeCurrencyOrdersController = require("../controllers/home-currencyorders-controllers/home-currencyorders-controllers")

// const RegisterLoginController = require("../controllers/register-login-controllers/login-controllers")
const LoginController = require("../controllers/register-login-controllers/login-controllers")


// const { registerController } = require("../controllers/register-login-controllers/register")
const registerController = require("../controllers/register-login-controllers/register-controller")
const { resendConfirmationController } = require("../controllers/register-login-controllers/resend-confirmation-controller")

// Middleware
const profileMiddleware = require('../middleware/profile-middleware/profile-middleware2')
const requireRefererMiddleware = require('../middleware/generic-middleware/require-referer')
const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')
const startEmptyNotificationsMiddleware = require('../middleware/generic-middleware/start-empty-notifications-middleware')
const { getPopulatedUser } = require('../middleware/generic-middleware/get-populated-user')
const { getProfilePicNameIfAnyMiddleware } = require('../middleware/generic-middleware/get-profile-pic-name-if-any-middleware')

const deleteMarketOrderMiddleware = require('../middleware/delete-account-process-middleware/delete-market-order-middleware.js')
const deleteBuyCryptoOrdersMiddleware = require('../middleware/delete-account-process-middleware/delete-buycryptoorders-middleware')
const deleteSellOrdersMiddleware = require('../middleware/delete-account-process-middleware/delete-sellcryptoorders-middleware')
const deleteProtagonistsMiddleware = require('../middleware/delete-account-process-middleware/delete-protagonists-middleware')
const deleteMessagesMiddleware = require('../middleware/delete-account-process-middleware/delete-messages-middleware')
const sessionSubscriberMiddleware = require('../middleware/paypal-middleware/session-subscriber-middleware')
const registerMiddleware = require('../middleware/register-middleware/register-middleware')


const conditional_Unsub_AgendaJobDel_SubDel_Middleware = require('../middleware/delete-account-process-middleware/conditional-unsub-agendajobdel-subdel-middleware')


const deleteUserMiddleware = require('../middleware/delete-account-process-middleware/delete-user-middleware')
const deleteUserAssociatedLocalityMiddleware = require('../middleware/delete-account-process-middleware/delete-user-associated-locality-middleware')

const saveDeletionReasonMiddleware = require('../middleware/delete-account-process-middleware/save-deletion-reason-middleware')
const deleteHexMiddleware = require('../middleware/delete-account-process-middleware/delete-hex-middleware')

const deleteUserProfileImageIfAnyMiddleware = require('../middleware/delete-account-process-middleware/delete-user-profile-image-ifany-middleware')
const deleteFSProfilePictureIfAnyMiddleware = require('../middleware/delete-account-process-middleware/delete-fs-profile-picture-ifany-middleware')


const logoutMiddleware = require('../middleware/generic-middleware/logout-middleware')

const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')




const checkIfClientIsUserMiddleware = require('../middleware/loggedin-middleware/check-if-client-is-user-middleware')
const checkClientIsActiveMiddleware = require('../middleware/loggedin-middleware/check-client-is-active-middleware')
const passwordVerifierMiddleware = require('../middleware/loggedin-middleware/password-verifier-middleware')


const {responseMessageSetterMiddleware} = require('../middleware/reset-password-middleware/response-message-middleware')
const checkCredentialsPresentMiddleware = require('../middleware/loggedin-middleware/check-credentials-present-middleware')

const checkIfUserByEmailMiddleware = require('../middleware/generic-middleware/check-if-user-by-email-middleware')
const checkIfUserSetAndUsedRequestForPasswordResetMiddleware = require('../middleware/generic-middleware/check-if-user-set-and-used-request-for-password-reset-middleware')
const createHashForPasswordResetLinkMiddleware = require('../middleware/reset-password-middleware/create-hash-for-password-reset-link-middleware')
const sendEmailToResetPasswordMiddleware = require('../middleware/reset-password-middleware/send-email-to-reset-password-middleware')
const marketingMiddleware = require('../middleware/home-currencyorders-middleware/marketing-middleware')


const reHachHexForPassResetMiddleware = require('../middleware/reset-password-middleware/re-hach-hex-for-pass-reset-middleware')

const markHashForPasswordResetAsUsedMiddleware = require('../middleware/reset-password-middleware/mark-hash-forpassword-reset-as-used-middleware')
const retrieveTheHashForPasswordResetMiddleware = require('../middleware/reset-password-middleware/retrieve-the-hash-for-password-reset-middleware')
const createAndUpdateNewPasswordController = require('../controllers/reset-password-controllers/create-and-update-new-password-controller')
const marketingController = require('../controllers/home-currencyorders-controllers/marketing-controllers')


const faqDataMiddleware = require('../middleware/home-currencyorders-middleware/faq-data-middleware')
const faqResponseControllers = require('../controllers/home-currencyorders-controllers/faq-response-controllers')



// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")

const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")

const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")






// Database Models
const User = require('../models/User')
const HexForUnactiveUser = require('../models/HexForUnactiveUser');


// TODO !!!! Overuse of set_user_if_any, Figure out endpoints that require it and implement set_user_if_any in cases when needed
homeOrdersBackend_app_router.use(set_user_if_any, (req, res, next) => {
  navBars = NAVBAR.CLIENTS
  return next()
})




// TODO !!!! when closing the process, properly close the mongoose connection or something. Look into earnanswers



homeOrdersBackend_app_router.get('/faqs/:faq_title?', faqDataMiddleware.retrieveFAQsMiddleware, faqResponseControllers.responseFAQsController)






homeOrdersBackend_app_router.get('/users/profile', 
require_loggedin_for_pages(true), 
authenticate_role_for_pages([ROLE.USER.SUBSCRIBER.BASIC, ROLE.USER.NOTSUBSCRIBER, ROLE.MASTER]), 
getPopulatedUser("SESSION", "subscriptionID"), 
getProfilePicNameIfAnyMiddleware("SESSION"),
homeCurrencyOrdersController.renderMgtUserSPAController)












homeOrdersBackend_app_router.get('/todelete', (req,res)=>{
  var JSX_to_load = 'ToDelete';

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
})
















homeOrdersBackend_app_router.post('/users/upload/userprofileimage/:selectedUserID', multerinstance.upload.single('image'), profileMiddleware.makeSureDestinationFolderPresentMiddleware, profileMiddleware.sharpAndDisplaceNewProfilePicMiddleware, profileMiddleware.isThereProfilePicAlreadyMiddleware, profileMiddleware.retrievePrevImageInfo_DeletePrevPic_DeletePicEntry_Middleware,profileMiddleware.instantiateNewImageMiddleware, profileMiddleware.editUsersLinkedImageIDMiddleare, profileMiddleware.saveNewImageEntryMiddleware, profileController.sucessUploadProfilePicController)


homeOrdersBackend_app_router.post('/users/submission-new-password', responseMessageSetterMiddleware("Server Error, please try again later."), reHachHexForPassResetMiddleware, markHashForPasswordResetAsUsedMiddleware, retrieveTheHashForPasswordResetMiddleware, createAndUpdateNewPasswordController)


homeOrdersBackend_app_router.get(`/users/requestresetpasswordpage/:hex`, (req, res) => {
  var JSX_to_load = 'MgtUser';

  return res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
    // selectedUser: undefined
    // hash: res.locals.hash
  })
})



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

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
    // selectedUser: undefined
  })
})


homeOrdersBackend_app_router.post('/check/user/register', requireRefererMiddleware, LoginController.checkRegisterController)


homeOrdersBackend_app_router.post('/users/register',
requireRefererMiddleware, 
require_loggedin_for_data(false), 
destructureURLandRefererMiddleware, 
LoginController.validateController,

registerMiddleware.instantiateHexForUnactiveUserMiddleware,
registerMiddleware.instantiateUserMiddleware,
registerMiddleware.ifLocalityOrganizeAssociatedLocalityMiddleware,
registerMiddleware.ifSubscriberInstantiateSubscriberMiddleware,
registerMiddleware.saveHex4UnactiveUserMiddleware,
registerMiddleware.saveUserMiddleware,
registerMiddleware.doubleCheckSaveMiddleware,
registerMiddleware.setAgendaJobToDeleteUserIfStillNotActive,
registerMiddleware.mailConfirmLinkMiddleware,
registerController.responseOnRegistrationController
)



homeOrdersBackend_app_router.get('/resend-user-email/:userEmail', destructureURLandRefererMiddleware, resendConfirmationController)


homeOrdersBackend_app_router.get('/purge', 
require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER]), async (req, res) => {
  const numRemoved = await agenda.purge();
  res.status(200).json({message: `Done purge on Agenda!`})
})


homeOrdersBackend_app_router.get('/', async (req, res) => {
  res.locals.userId = req.session.userId
  res.locals.popup = req.query.popup

  console.log("\n\nGET '/' route\nIs user logged in?\n", !!req.session.userId, req.session.userId)
  console.log("\n\nDo we have any pop-up messages: \n", req.query.popup)

  var JSX_to_load = 'App';

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', { JSX_to_load: JSX_to_load })
})

// TODO !  Make Contrats confirmed account popup green
homeOrdersBackend_app_router.get('/users/login', require_loggedin_for_pages(false), (req, res, next) => {
  res.locals.popup = req.query.popup
  var JSX_to_load = 'MgtUser';

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
})



homeOrdersBackend_app_router.get('/subscription', require_loggedin_for_pages(false), function (req, res, next) {
  var JSX_to_load = 'Subscription';
  res.locals.isPaypalScriptNeeded = true

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
    // isPaypalScriptNeeded: true
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


  // CANCEL AGENDA JOB THAT IS SUPPOSED TO DELETE THE UNACTIVE USER (BECAUSE JUST ACTIVATED)
  const jobname = `Delete registered user ${ret_user._id}, if account stays unactive`
  const numRemoved = await agenda.cancel({ name: jobname });

  console.log("numRemoved: ", numRemoved)


  let sucess_message = `Congrats you have successfully confirmed your account!`

  res.redirect(`/users/login?popup=${sucess_message}`)
})


homeOrdersBackend_app_router.get('/cryptoprice', async (req, res, next) => {

  let params = {
    ids: ['bitcoin'],
    vs_currencies: ['cad', 'usd', 'eur', 'mxn']
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


homeOrdersBackend_app_router.get('/logout', require_loggedin_for_data(true), (req, res) => {
  //Destroy the Session data, including the userId property
  req.session.destroy(() => {
    res.status(httpStatus.StatusCodes.PERMANENT_REDIRECT).redirect('/?popup=You have successfully logged out')
  })
})


homeOrdersBackend_app_router.post('/users/login', requireRefererMiddleware, require_loggedin_for_data(false), 
checkCredentialsPresentMiddleware,
checkIfClientIsUserMiddleware,
checkClientIsActiveMiddleware,
passwordVerifierMiddleware,
LoginController.loginController)













// TODO add userID for articles


homeOrdersBackend_app_router.delete('/users/profile/delete/:userId', require_loggedin_for_data(true), 
authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), 
requester_auth_middleware(4), 
destructureURLandRefererMiddleware, 
startEmptyNotificationsMiddleware, 
deleteBuyCryptoOrdersMiddleware, 
deleteSellOrdersMiddleware, 
deleteMarketOrderMiddleware, 
deleteProtagonistsMiddleware, 
deleteMessagesMiddleware,
deleteUserProfileImageIfAnyMiddleware, 
deleteFSProfilePictureIfAnyMiddleware,
sessionSubscriberMiddleware, 
conditional_Unsub_AgendaJobDel_SubDel_Middleware, 
deleteHexMiddleware, 
deleteUserMiddleware,
deleteUserAssociatedLocalityMiddleware,
saveDeletionReasonMiddleware,
logoutMiddleware, 
homeCurrencyOrdersController.deleteAccountController)


// homeOrdersBackend_app_router.delete('/users/profile/delete/:userId', saveDeletionReasonMiddleware, (req,res)=>{

//   console.log("\nEndpoint DELETE account: body: \n", req.body)


//   const mock_msg = "Mock User account and linked data completly deleted."
//   const mock_referer = "users"

//   return res.status(200).json({
//     srv_: mock_msg,
//     referer: mock_referer
//   })


// })






homeOrdersBackend_app_router.post('/marketing/email', requireRefererMiddleware, require_loggedin_for_data(false), marketingMiddleware.emailValidationMidleware, marketingMiddleware.databaseCollectionSave, marketingController.emailSubmitController)





homeOrdersBackend_app_router.get('/FAQ/:faq?', requireRefererMiddleware, (req,res)=>{


  var JSX_to_load = 'FAQPage';

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
    // selectedUser: undefined
  })
})





homeOrdersBackend_app_router.get('/terms-conditions', requireRefererMiddleware, 
// require_loggedin_for_data(true), 
// authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), 
(req,res)=>{

  var JSX_to_load = 'TermsConditions';

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
    // selectedUser: undefined
  })
})






module.exports = homeOrdersBackend_app_router
//router references the homeOrdersBackend const


// Manually create a webhook
// https://riptutorial.com/paypal/example/1867/testing-sandbox-webhooks-with-ngrok-and-express--node-