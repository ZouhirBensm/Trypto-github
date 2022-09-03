const express = require('express')
const operationsBackend_app_router = express.Router()


// Environment variables and types
const ENV = require('../config/base')
const NAVBAR = require('../full-stack-libs/Types/Navbar')
const ROLE = require('../full-stack-libs/Types/Role')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } =  require("../middleware/generic-middleware/set-user-if-any-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } =  require("../middleware/generic-middleware/authenticate-role-middleware")
const { require_loggedin_for_pages, require_loggedin_for_data } =  require("../middleware/generic-middleware/check-loggedin-middleware")



// Start middleware for this operationsBackend_app_router
// Route is called upon as request from browser as '/operations'
operationsBackend_app_router.use(set_user_if_any, (req, res, next) => {
  navBars = NAVBAR.OPERATORS
  next()
})

operationsBackend_app_router.get('/', require_loggedin_for_pages(true), authenticate_role_for_pages([ROLE.MASTER]), (req,res)=>{

  console.log(req.session.userId)
  var JSX_to_load = 'Operations';
  
  res.render('generic-boilerplate-ejs-to-render-react-components-operations', { 
    JSX_to_load : JSX_to_load, 
  })
})


module.exports = operationsBackend_app_router
