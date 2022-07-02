const express = require('express')
const messagingBackend_app_router = express.Router()

// Import checkIfUseridWithinDBmiddleware
const checkIfUseridWithinDBmiddleware = require('../middleware/checkIf-userid-withinDB-middleware')

// Route is called upon as request from browser as '/messaging/'
messagingBackend_app_router.get('/', checkIfUseridWithinDBmiddleware, (req,res)=>{
  console.log("logged in user: ", req.session.userId)
  var JSX_to_load = 'Messaging';
  res.render('generic-boilerplate-ejs-to-render-react-components', { 
    JSX_to_load : JSX_to_load, 
    // [req.params.what_page === "profile" ? "userId": null]: req.session.userId,
  })
})

module.exports = messagingBackend_app_router
