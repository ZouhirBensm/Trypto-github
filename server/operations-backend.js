const express = require('express')
const operationsBackend_app_router = express.Router()


const ENV = require('../config/base')
const NAVBAR = require('../full-stack-libs/Types/Navbar')
const ROLE = require('../full-stack-libs/Types/Role')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } =  require("../middleware/operations-middleware/set-user-if-any-middleware")

// Use this to check the role, requires a res.locals.user.role
const { authenticate_role_for_pages, authenticate_role_for_data } =  require("../middleware/operations-middleware/authenticate-role-middleware")


// Use this to check the role, requires a res.locals.user.role
const { loggedin_for_pages, loggedin_for_data } =  require("../middleware/operations-middleware/check-loggedin-middleware")




operationsBackend_app_router.use(set_user_if_any, (req, res, next) => {
  // req.session.destroy()
  navBars = NAVBAR.OPERATORS
  next()
})

// Route is called upon as request from browser as '/operations'
operationsBackend_app_router.get('/', loggedin_for_pages, authenticate_role_for_pages(ROLE.MASTER), (req,res)=>{

  console.log(req.session.userId)
  var JSX_to_load = 'Operations';
  
  res.render('generic-boilerplate-ejs-to-render-react-components-operations', { 
    JSX_to_load : JSX_to_load, 
  })
})




module.exports = operationsBackend_app_router
