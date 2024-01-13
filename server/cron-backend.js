const express = require('express')

const cronBackend_app_router = express.Router()


// const cronMiddlewares = require('../middleware/contact-middleware/contact-middleware.js')

// const cronController = require('../controllers/contact-controller/contact-controller.js')


// Middleware
const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')

// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")
const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")



cronBackend_app_router.get('/task1', (req,res)=>{
  console.log('testing')
  res.status(200).send('Testing from /cron/task1')
})



module.exports = cronBackend_app_router