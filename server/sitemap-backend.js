const express = require('express')

// Initializations
const sitemapBackend_app_router = express.Router()


// Types and utilities
const ROLE = require('../full-stack-libs/Types/Role')



const sitemapMiddleware = require('../middleware/sitemap-middlewares/sitemap-middlewares')
const sitemapController = require('../controllers/sitemap-controller/sitemap-controller')


// Middleware
const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')

// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")
const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")





sitemapBackend_app_router.use(set_user_if_any, (req, res, next) => {
  return next()
})






sitemapBackend_app_router.get('/sync-sitemap-2-database', 
require_loggedin_for_data(true), 
authenticate_role_for_data([ROLE.MASTER]),
sitemapMiddleware.middleware1,
sitemapMiddleware.middleware2,
// sitemapMiddleware.middleware3,
sitemapController.controller1
)




sitemapBackend_app_router.get('/sitemap.xml', (req,res)=>{
  const filePath = path.resolve('public/sitemap/sitemap.xml');
  res.status(200).sendFile(filePath);
})





module.exports = sitemapBackend_app_router