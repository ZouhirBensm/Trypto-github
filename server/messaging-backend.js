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


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } =  require("../middleware/generic-middleware/set-user-if-any-middleware")
const {require_loggedin_for_pages, require_loggedin_for_data} = require("../middleware/generic-middleware/check-loggedin-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } =  require("../middleware/generic-middleware/authenticate-role-middleware")



const User = require('../models/User')
const {MongoError} = require('../custom-errors/custom-errors')




// Start middleware for this messagingBackend_app_router
// Route is called upon as request from browser as '/messaging/'
messagingBackend_app_router.use(set_user_if_any, (req, res, next) => {
  res.locals.userId = req.session.userId
  res.locals.currentUserEmail = res.locals.user.email;
  res.locals.currentUserName = res.locals.user.username;

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


// TODO !!!! add a middleware for this route
messagingBackend_app_router.get('/', require_loggedin_for_pages(true), async (req,res, next)=>{

  res.locals.userIdB = req.query.userIdB;
  res.locals.orderId = req.query.orderId;

  // console.log("\n\n________________res.locals.user.email:\n\n", res.locals.user.email,
  //   "\n\nreq.query.userIdB:\n\n", req.query.userIdB,
  //   "\n\nreq.query.orderId:\n\n", req.query.orderId)


  let ret_userB

  try {
    ret_userB = await User.findById(req.query.userIdB)
    .populate({
      // Populate protagonists
      path: "userprofileimageID",
      // Fields allowed to populate with
      select: "path image.name -_id",
    })
    .select('-_id userprofileimageID username')
  } catch (error) {
    const message = "User B could not be identified within the Database."
    const e = new MongoError(message, error.code)
    return next(e)
  }

  console.log("ret_userB: ", ret_userB)

  res.locals.userUsernameB = ret_userB.username

  const default_userB_profile_image_path = "public/img/profile-images/square.png"
  
  let userB_profile_image_path = ret_userB.userprofileimageID ? ret_userB.userprofileimageID.path + '/' + ret_userB.userprofileimageID.image.name : default_userB_profile_image_path

  
  userB_profile_image_path = userB_profile_image_path.replace("public", '')
  
  res.locals.userB_profile_image_path = userB_profile_image_path
  
  console.log("\n\nuserB_profile_image_path--->", userB_profile_image_path)


  var JSX_to_load = 'Messaging';

  // console.log("Response locals: ___________________/n", res.locals, "\n\n____________________")
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load,
  })
})








messagingBackend_app_router.get('/paginated-messages/:userId', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), requester_auth_middleware(4), paginatingSetupMiddleware, destructureURLandRefererMiddleware, messagesInfoRetrievalMiddleware, distributePaginatedDataController)


module.exports = messagingBackend_app_router
