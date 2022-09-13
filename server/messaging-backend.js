// TODO: #78 Fix populate queries

const express = require('express')

const messagingBackend_app_router = express.Router()


// Environment variables and types
const ENV = require('../config/base')
const ROLE = require("../full-stack-libs/Types/Role")




// Controllers
const distributePaginatedDataController = require("../controllers/generic-controllers/distribute-paginated-data-controller")


// Middleware
const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')
const messagesInfoRetrievalMiddleware = require('../middleware/messages-middleware/messages-info-retrieval-middleware')
const checkPathUserIdMiddleware = require('../middleware/generic-middleware/check-path-userId-middleware')
const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } =  require("../middleware/generic-middleware/set-user-if-any-middleware")
const {require_loggedin_for_pages, require_loggedin_for_data} = require("../middleware/generic-middleware/check-loggedin-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } =  require("../middleware/generic-middleware/authenticate-role-middleware")




// Start middleware for this messagingBackend_app_router
// Route is called upon as request from browser as '/messaging/'
messagingBackend_app_router.use(set_user_if_any, (req, res, next) => {
  res.locals.currentUserEmail = res.locals.user.email;
  res.locals.userIdB = req.query.userIdB;
  res.locals.orderId = req.query.orderId;
  next()
})



messagingBackend_app_router.get('/', require_loggedin_for_pages(true), (req,res)=>{

  console.log("\n\n________________res.locals.user.email:\n\n", res.locals.user.email,
    "\n\nreq.query.userIdB:\n\n", req.query.userIdB,
    "\n\nreq.query.orderId:\n\n", req.query.orderId)

  var JSX_to_load = 'Messaging';
  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load,
  })
})


messagingBackend_app_router.get('/messages', require_loggedin_for_pages(true), (req,res)=>{
  
  console.log("\n\n________________res.locals.user.email:\n\n", res.locals.user.email,
  "\n\nreq.query.userIdB:\n\n", req.query.userIdB,
  "\n\nreq.query.orderId:\n\n", req.query.orderId)


  var JSX_to_load = 'Messaging';
  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load,
  })


})


messagingBackend_app_router.get('/paginated-messages/:userId', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), paginatingSetupMiddleware, destructureURLandRefererMiddleware, messagesInfoRetrievalMiddleware, distributePaginatedDataController)


module.exports = messagingBackend_app_router
