const express = require('express')


// Initializations
const contactBackend_app_router = express.Router()


const contactMiddlewares = require('../middleware/contact-middleware/contact-middleware.js')

const contactController = require('../controllers/contact-controller/contact-controller.js')


// Middleware
const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')

// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")
const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")





contactBackend_app_router.use(set_user_if_any, (req, res, next) => {
  return next()
})






contactBackend_app_router.get('/', 
  require_loggedin_for_data(false), (req, res) => {
    
  var JSX_to_load = 'Contact';

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })

})

contactBackend_app_router.post('/receive-contact-information', 
// contactMiddlewares.middleware0,
contactMiddlewares.middleware1,
// contactMiddlewares.middleware2,
// contactMiddlewares.middleware3,
// contactMiddlewares.middleware4,
// contactMiddlewares.middleware5,
contactController.controller1)




module.exports = contactBackend_app_router