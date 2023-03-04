const express = require('express')

// Initializations
const paypalBackend_app_router = express.Router()


// Types and utilities
const ROLE = require('../full-stack-libs/Types/Role')



// TODO: delete these folders/files
// /Users/Zouhir/Documents/MERN/BlockchainMERN/controllers/paypal-controllers/ipn.ctrl.js
// const IPNController = require('../controllers/paypal-controllers/ipn.ctrl')



// Middleware
const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')
const hasUnSubProcessStartedMiddleware = require('../middleware/paypal-middleware/has-unsub-process-started-middleware')

const getRequestedSubscriptionInfoMiddleware = require('../middleware/paypal-middleware/get-requested-subscription-info-middleware');
const paypalUnsubscribeMiddleware = require('../middleware/paypal-middleware/paypal-unsubscribe-middleware');



// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")
const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")



const paypalControllers = require('../controllers/paypal-controllers/paypal-controllers')



// Start middleware for this paypalBackend_app_router
// Route is called upon as request from browser as '/paypal'
paypalBackend_app_router.use(set_user_if_any, (req, res, next) => {
  return next()
})






paypalBackend_app_router.post('/unsubscribe', 
require_loggedin_for_data(true), 
authenticate_role_for_data([ROLE.USER.SUBSCRIBER.BASIC, ROLE.MASTER]), 
requester_auth_middleware(1), 
hasUnSubProcessStartedMiddleware, 
getRequestedSubscriptionInfoMiddleware, 
paypalUnsubscribeMiddleware, 
paypalControllers.paypalUnsubscribeController)


// Example of a body.
// req.body:  {
//   userId: '640295af979bcf46064af383',
//   paypal_subscriptionID: 'I-55SDU2B9BGXC',
//   paypal_plan_id: 'P-8K2448559P9609535MMAPYHA',
//   paypal_product_id: 'PROD-6NP19803R0467982A'
// }

// TODO !!!!! HERE figure out what differentiates a BASIC to a FREE user and edit the collections accordingly.
paypalBackend_app_router.post('/upgrade-plan-to-basic', 
require_loggedin_for_data(true), 
authenticate_role_for_data([ROLE.USER.NOTSUBSCRIBER, ROLE.MASTER]), 
requester_auth_middleware(1), (req, res)=>{

  console.log("\n\nreq.body: ", req.body)

  res.status(200).json({
    message: "Hello From the server!"
  })
})












// Kept bacause might reimplement when app deployed on digital ocean
// paypalBackend_app_router.post('/ipn', IPNController.index)



module.exports = paypalBackend_app_router