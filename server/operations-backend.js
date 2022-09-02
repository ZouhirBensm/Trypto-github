const express = require('express')
const operationsBackend_app_router = express.Router()

const logoutMiddleware =  require("../middleware/generic/logout-middleware")

const ENV = require('../config/base')
const NAVBAR = require('../full-stack-libs/Types/Navbar')


operationsBackend_app_router.use(logoutMiddleware, (req, res, next) => {
  // req.session.destroy()
  navBars = NAVBAR.OPERATORS
  next()
})

// Route is called upon as request from browser as '/operations'
// checkIfUseridWithinDBmiddleware
operationsBackend_app_router.get('/', (req,res)=>{
  var JSX_to_load = 'Operations';
  
  res.render('generic-boilerplate-ejs-to-render-react-components-operations', { 
    JSX_to_load : JSX_to_load, 
  })
})




module.exports = operationsBackend_app_router
