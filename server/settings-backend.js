const express = require('express')

// Initializations
const settingsBackend_app_router = express.Router()

// Types and utilities
const ROLE = require('../full-stack-libs/Types/Role')
const NAVBAR = require('../full-stack-libs/Types/Navbar')

// Middleware
const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')

const { getDetailedUserSubscriptionInfo } = require('../middleware/generic-middleware/get-detailed-user-subsciption-information-middleware')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")
const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")




settingsBackend_app_router.use(set_user_if_any, (req, res, next) => {
  navBars = NAVBAR.CLIENTS
  return next()
})




settingsBackend_app_router.get(`/:page?`, getDetailedUserSubscriptionInfo("SESSION", "userassociatedlocalityID"), (req, res) => {

  console.log(`\n\nsettingsBackend_app_router: GET /: req.params.page`, req.params.page)
  console.log(`\n\nsettingsBackend_app_router: GET /: res.sessions.userId`, req.session.userId)
  console.log(`\n\nsettingsBackend_app_router: GET /: res.locals.user`, res.locals.user)
  console.log(`\n\nsettingsBackend_app_router: GET /: res.locals.selectedUser`, res.locals.selectedUser)


  // Settings page user Id is sessions, TODO !!!! in the operations page this would change to the pathparams user ID
  // res.locals.userId = req.session.userId
  res.locals.userId = res.locals.selectedUser._id

  var JSX_to_load = 'Settings';

  // TODO !!!! figure out how to template caseSettingsPage variable
  // When refreshing from a particualar page, e.g. /settings/set-users-associated-locality, the caseSettingsPage variable needs to be declared from the server. Because the EJS files are parsed on the server before they get served. If a ejs file is parsed on the server and a variable i.e.caseSettingsPage is missing, the server throws an error that the ejs variable is not declared from the server's perspective.
  // Default value
  // res.locals.caseSettingsPage = req.params.page

  return res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
})



settingsBackend_app_router.post(`/set-users-associated-locality/:userID`, 


async (req, res) => {

  console.log(`POST /settings/set-users-associated-locality/${req.params.userID}`)

  console.log(`POST`, req.body)

  res.status(200).json({
    message: "successful post!"
  })
})


module.exports = settingsBackend_app_router