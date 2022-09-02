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



// Route is called upon as request from browser as '/messaging/'
messagingBackend_app_router.get('/', checkIfUseridWithinDBmiddleware, (req,res)=>{
  
  // console.log("logged in user: ", req.session.userId)
  // console.log("orderId: ", req.query.orderId)
  // console.log("user B: ", req.query.userIdB)
  res.locals.currentUserEmail = res.locals.user.email;
  res.locals.userIdB = req.query.userIdB;
  res.locals.orderId = req.query.orderId;

  var JSX_to_load = 'Messaging';
  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load, 
    // userId: req.session.userId,
    // userIdB: req.query.userIdB,
    // orderId: req.query.orderId,
  })
})


// Route is called upon as request from browser as '/messaging/'
messagingBackend_app_router.get('/messages', checkIfUseridWithinDBmiddleware, (req,res)=>{
  
  res.locals.currentUserEmail = res.locals.user.email;
  res.locals.userIdB = req.query.userIdB;
  res.locals.orderId = req.query.orderId;
  // res.send("HHEEELLOOO!!!")

  var JSX_to_load = 'Messaging';
  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load, 
    // userId: req.session.userId,
    // userIdB: req.query.userIdB,
    // orderId: req.query.orderId,
  })


})

messagingBackend_app_router.get('/paginated-messages/:userID', checkURLuserIDMiddleware, paginatingSetupMiddleware, messagesInfoRetrievalMiddleware, distributePaginatedDataController)


module.exports = messagingBackend_app_router
