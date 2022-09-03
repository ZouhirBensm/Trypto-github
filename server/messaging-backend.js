// TODO: #78 Fix populate queries

const express = require('express')
const ENV = require('../config/base')

const messagingBackend_app_router = express.Router()

// Import distributePaginatedDataController
const distributePaginatedDataController = require("../controllers/generic-controllers/distribute-paginated-data-controller")


// Import checkIfUseridWithinDBmiddleware
const checkIfUseridWithinDBmiddleware = require('../middleware/loggedin-middleware/checkIf-userid-withinDB-middleware')

// Import checkURLuserIDMiddleware
const checkURLuserIDMiddleware = require('../middleware/loggedin-middleware/check-URL-userID-middleware')


// Import paginatingSetupMiddleware
const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')
// Import messagesRetrievalMiddleware
const messagesInfoRetrievalMiddleware = require('../middleware/messages-middleware/messages-info-retrieval-middleware')

const checkPathUserIdMiddleware = require('../middleware/generic-middleware/check-path-userId-middleware')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } =  require("../middleware/generic-middleware/set-user-if-any-middleware")

// Use this to check the role, requires a res.locals.user.role
// const { not_loggedin_for_pages, loggedin_for_pages, not_loggedin_for_data, loggedin_for_data } =  require("../middleware/generic-middleware/check-loggedin-middleware")
const {require_loggedin_for_pages, require_loggedin_for_data} = require("../middleware/generic-middleware/check-loggedin-middleware")

// Use this to check the role, requires a res.locals.user.role
const { authenticate_role_for_pages, authenticate_role_for_data } =  require("../middleware/generic-middleware/authenticate-role-middleware")


const ROLE = require("../full-stack-libs/Types/Role")


messagingBackend_app_router.use(set_user_if_any, (req, res, next) => {
  res.locals.currentUserEmail = res.locals.user.email;
  res.locals.userIdB = req.query.userIdB;
  res.locals.orderId = req.query.orderId;
  next()
})


// Route is called upon as request from browser as '/messaging/'
messagingBackend_app_router.get('/', require_loggedin_for_pages(true), (req,res)=>{

  console.log("\n\n________________res.locals.user.email:\n\n", res.locals.user.email,
    "\n\nreq.query.userIdB:\n\n", req.query.userIdB,
    "\n\nreq.query.orderId:\n\n", req.query.orderId)

  var JSX_to_load = 'Messaging';
  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load, 
    // userId: req.session.userId,
    // userIdB: req.query.userIdB,
    // orderId: req.query.orderId,
  })
})


// Route is called upon as request from browser as '/messaging/'
messagingBackend_app_router.get('/messages', require_loggedin_for_pages(true), (req,res)=>{

  console.log("\n\n________________res.locals.user.email:\n\n", res.locals.user.email,
  "\n\nreq.query.userIdB:\n\n", req.query.userIdB,
  "\n\nreq.query.orderId:\n\n", req.query.orderId)


  var JSX_to_load = 'Messaging';
  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load, 
    // userId: req.session.userId,
    // userIdB: req.query.userIdB,
    // orderId: req.query.orderId,
  })


})



// checkURLuserIDMiddleware
messagingBackend_app_router.get('/paginated-messages/:userId', checkPathUserIdMiddleware, require_loggedin_for_data(true), paginatingSetupMiddleware, messagesInfoRetrievalMiddleware, distributePaginatedDataController)


module.exports = messagingBackend_app_router
