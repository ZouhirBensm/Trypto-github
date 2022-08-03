const express = require('express')
const ENV = require('../config/base')

const messagingBackend_app_router = express.Router()

// Import checkIfUseridWithinDBmiddleware
const checkIfUseridWithinDBmiddleware = require('../middleware/checkIf-userid-withinDB-middleware')



// Route is called upon as request from browser as '/messaging/'
messagingBackend_app_router.get('/', checkIfUseridWithinDBmiddleware, (req,res)=>{
  
  // console.log("logged in user: ", req.session.userId)
  // console.log("orderId: ", req.query.orderId)
  // console.log("user B: ", req.query.userIdB)

  

  var JSX_to_load = 'Messaging';
  res.render('generic-boilerplate-ejs-to-render-react-components', { 
    JSX_to_load : JSX_to_load, 
    // userId: req.session.userId,
    // userIdB: req.query.userIdB,
    // orderId: req.query.orderId,
  })



})


// Route is called upon as request from browser as '/messaging/'
messagingBackend_app_router.get('/messages', checkIfUseridWithinDBmiddleware, (req,res)=>{
  
  // res.send("HHEEELLOOO!!!")

  var JSX_to_load = 'Messaging';
  res.render('generic-boilerplate-ejs-to-render-react-components', { 
    JSX_to_load : JSX_to_load, 
    // userId: req.session.userId,
    // userIdB: req.query.userIdB,
    // orderId: req.query.orderId,
  })


})


module.exports = messagingBackend_app_router
