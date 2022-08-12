// TODO: # 77 Think of a way to merge messaging-backend.js in /paginated-messages/:userID route WITH home-orders-controllers.js in getPaginatedOrdersController

// TODO: # 78 Fix populate queries

const express = require('express')
const ENV = require('../config/base')

const messagingBackend_app_router = express.Router()


// Import Long RegisterLoginController functions
const { messagesPageController } = require("../controllers/messenger-controllers/messages-page-controller")


// Import checkIfUseridWithinDBmiddleware
const checkIfUseridWithinDBmiddleware = require('../middleware/checkIf-userid-withinDB-middleware')


const {filterObject} = require('../controllers/libs/match-maker-functions')

// const Message = require('../models/messaging-models/Message')
// const Protagonist = require('../models/messaging-models/Protagonist')
// const { ObjectId } = require('mongodb')



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

// :type_orders/:userID?
messagingBackend_app_router.get('/paginated-messages/:userID', messagesPageController)

// paginatedOrdersAccessMiddleware,  homeOrdersController.getPaginatedOrdersController


module.exports = messagingBackend_app_router
