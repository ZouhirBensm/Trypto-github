// TODO: #78 Fix populate queries

const express = require('express')

const messagingBackend_app_router = express.Router()


// Environment variables and types
const ENV = require('../config/base')
const ROLE = require("../full-stack-libs/Types/Role")
const NAVBAR = require('../full-stack-libs/Types/Navbar')




// Controllers
const distributePaginatedDataController = require("../controllers/generic-controllers/distribute-paginated-data-controller")


// Middleware
const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')
const messagesInfoRetrievalMiddleware = require('../middleware/messages-middleware/messages-info-retrieval-middleware')
const checkPathUserIdMiddleware = require('../middleware/generic-middleware/check-path-userId-middleware')
const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')
const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')

const chatPagePrepperMiddleware = require('../middleware/messages-middleware/chat-page-prepper-middleware.js')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } =  require("../middleware/generic-middleware/set-user-if-any-middleware")
const {require_loggedin_for_pages, require_loggedin_for_data} = require("../middleware/generic-middleware/check-loggedin-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } =  require("../middleware/generic-middleware/authenticate-role-middleware")







// Start middleware for this messagingBackend_app_router
// Route is called upon as request from browser as '/messaging/'
messagingBackend_app_router.use(set_user_if_any, (req, res, next) => {
  res.locals.userId = req.session.userId
  res.locals.currentUserEmail = res.locals.user?.email;
  res.locals.currentUserName = res.locals.user?.username;

  navBars = NAVBAR.CLIENTS

  return next()
})




messagingBackend_app_router.get('/messages', require_loggedin_for_pages(true), (req,res)=>{

  // Retrieve the repositories profile names

  var JSX_to_load = 'Messaging';
  // console.log("Response locals: ___________________/n", res.locals, "\n\n____________________")
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load,
  })


})






messagingBackend_app_router.get('/', require_loggedin_for_pages(true), chatPagePrepperMiddleware, (req,res)=>{

  var JSX_to_load = 'Messaging';
  // console.log("Response locals: ___________________/n", res.locals, "\n\n____________________")
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })

})






messagingBackend_app_router.get('/paginated-messages/:userId', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), requester_auth_middleware(4), paginatingSetupMiddleware, destructureURLandRefererMiddleware, messagesInfoRetrievalMiddleware, distributePaginatedDataController)


module.exports = messagingBackend_app_router
