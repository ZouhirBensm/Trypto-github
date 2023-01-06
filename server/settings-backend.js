const express = require('express')

// Initializations
const settingsBackend_app_router = express.Router()

// Types and utilities
const ROLE = require('../full-stack-libs/Types/Role')
const NAVBAR = require('../full-stack-libs/Types/Navbar')

// Middleware
const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")
const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")




settingsBackend_app_router.use(set_user_if_any, (req, res, next) => {
  navBars = NAVBAR.CLIENTS
  return next()
})




settingsBackend_app_router.get(`/:page?`, (req, res) => {

  console.log(`settingsBackend_app_router: GET /: req.params.page`, req.params.page)
  console.log(`settingsBackend_app_router: GET /: res.sessions.userId`, req.session.userId)

  res.locals.userId = req.session.userId

  var JSX_to_load = 'Settings';

  return res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
})



module.exports = settingsBackend_app_router