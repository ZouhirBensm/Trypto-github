const express = require('express')
const messagingBackend_router = express.Router()

// Route is called upon as request from browser as '/messaging/'
messagingBackend_router.get('/',(req,res)=>{
  res.render('messaging')
})

module.exports = messagingBackend_router
