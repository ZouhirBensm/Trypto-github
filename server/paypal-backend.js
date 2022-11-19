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
  next()
})



paypalBackend_app_router.post('/unsubscribe', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.USER.SUBSCRIBER.BASIC, ROLE.MASTER]), requester_auth_middleware(1), hasUnSubProcessStartedMiddleware, getRequestedSubscriptionInfoMiddleware, paypalUnsubscribeMiddleware, paypalControllers.paypalUnsubscribeController)







// Kept bacause might reimplement when app deployed on digital ocean
// paypalBackend_app_router.post('/ipn', IPNController.index)



module.exports = paypalBackend_app_router