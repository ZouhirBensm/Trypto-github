// TODO: # 77 Think of a way to merge messaging-backend.js in /paginated-messages/:userID route WITH home-orders-controllers.js in getPaginatedOrdersController

// TODO: # 78 Fix populate queries

const express = require('express')
const ENV = require('../config/base')

const messagingBackend_app_router = express.Router()

// Import checkIfUseridWithinDBmiddleware
const checkIfUseridWithinDBmiddleware = require('../middleware/checkIf-userid-withinDB-middleware')


const {filterObject} = require('../controllers/libs/match-maker-functions')

const Message = require('../models/messaging-models/Message')

const Message2 = require('../models/messaging-models/Message2')
const Protagonist = require('../models/messaging-models/Protagonist')
const { ObjectId } = require('mongodb')



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
messagingBackend_app_router.get('/paginated-messages/:userID', async (req,res) => { // TODO #92 route callback is required to be in controller file and also all dependencies

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

  // TODO #79 Decentralize the DB Message structure and re-write all the queries that reference it! see gitlab issue image.

  // TODO #78 I only require to populate the last sender's email in the msg_stream, but in this instance all senders get their email's populated
  
  // TODO #80 Query by req.session.userId and check equality with path_param_userID
  let query = Message.find({protagonists: {$elemMatch: {"$in": [path_param_userID]}}})
  .populate({
    path: "msg_stream.sender", 
    // match: { "_id": { $ne: path_param_userID} }, 
    select: "email"
  })

  // Instance of multiple populate operations
  // let query = Message.find({protagonists: {$elemMatch: {"$in": [path_param_userID]}}})
  // .populate({
  //   path: "msg_stream.sender", 
  //   match: { "_id": { $ne: path_param_userID} }, 
  //   select: "_id"
  // })
  // .populate({
  //   path: "msg_stream.receiver", 
  //   match: { "_id": { $ne: path_param_userID} }, 
  //   select: "_id"
  // })
  
  // .populate("msg_stream.receiver", "email")
  
  let protagonists_communications = await query.exec()








  let query2 = Message2.find()
  .populate({
    // Populate protagonists
    path: "protagonists", 
    // Condition to population on the protagonists document fields
    match: {protagonists: {$elemMatch: {$in: [path_param_userID]}}},
    // Fields allowed to populate with
    select: "-_id protagonists"
  })
  .populate({
    // Populate msg_stream
    path: "msg_stream.sender", 
    // Fields allowed to populate with
    select: "-_id email"
  })

  let protagonists_communications2 = await query2.exec()

  //FILTER
  let protagonists_communications3 = protagonists_communications2.filter(element => element.protagonists != null)
  console.log("this::: ", protagonists_communications3)

  // console.log(`entries with my protagonist ${req.session.userId}:`,protagonists_communications)

  protagonists_communications3.forEach(element => {
    console.log("boom",element.msg_stream)
  });

  // console.log("compare", "\n\nnew\n\n", protagonists_communications3, "\n\nold\n\n", protagonists_communications)

  const number_of_pages = Math.ceil(protagonists_communications3.length/limit)

  // TODO #81 Refactor this variable name into something "convo"
  let messages_page_management_obj = {}

  messages_page_management_obj.number_of_pages = {
    number: number_of_pages
  }

  if(endIndex < protagonists_communications3.length){
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

  messages_page_management_obj.CONVOS = protagonists_communications3.slice(startIndex, endIndex)

  res.json({
    srv_: messages_page_management_obj,
  })
})

// paginatedOrdersAccessMiddleware,  homeOrdersController.getPaginatedOrdersController


module.exports = messagingBackend_app_router
