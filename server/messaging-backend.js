// TODO: think of a way to merge messaging-backend.js in /paginated-messages/:userID route WITH home-orders-controllers.js in getPaginatedOrdersController

const express = require('express')
const ENV = require('../config/base')

const messagingBackend_app_router = express.Router()

// Import checkIfUseridWithinDBmiddleware
const checkIfUseridWithinDBmiddleware = require('../middleware/checkIf-userid-withinDB-middleware')


const {filterObject} = require('../controllers/libs/match-maker-functions')

const Message = require('../models/messaging-models/Message')



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
messagingBackend_app_router.get('/paginated-messages/:userID', async (req,res) => { // TODO route callback is required to be in controller file and also all dependencies

  // let messages

  let path_param_userID = req.params.userID
  let page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const startIndex = (page - 1)*limit
  const endIndex = page*limit


  let filter_object = filterObject(path_param_userID)
  
  // console.log("\n\nmsgs_user: ", path_param_userID)
  // console.log("page: ", page)
  // console.log("limit: ", limit)
  // console.log("startIndex: ", startIndex)
  // console.log("endIndex: ", endIndex)
  // console.log("\nFind filter: \n", filter_object)


  // TODO better to use back end req.session.userId than path_param_userID bellow. Make sure they are equal (in middleware for e.g.)
  let query = Message.find({protagonists: {$elemMatch: {"$in": [path_param_userID]}}})

  let protagonists_communications = await query.exec()

  console.log(`entries with my protagonist ${req.session.userId}:`,protagonists_communications)

  const number_of_pages = Math.ceil(protagonists_communications.length/limit)

  let messages_page_management_obj = {}

  messages_page_management_obj.number_of_pages = {
    number: number_of_pages
  }

  if(endIndex < protagonists_communications.length){
    messages_page_management_obj.next = {
      page: page + 1,
      limit: limit
    }
  }
  if(startIndex > 0){
    messages_page_management_obj.previous = {
      page: page - 1,
      limit: limit
    }
  }

  messages_page_management_obj.MSGS = protagonists_communications.slice(startIndex, endIndex)

  res.json({
    srv_: messages_page_management_obj,
  })
})

// paginatedOrdersAccessMiddleware,  homeOrdersController.getPaginatedOrdersController


module.exports = messagingBackend_app_router
