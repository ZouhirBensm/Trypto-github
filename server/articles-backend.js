const express = require('express')
const articlesBackend_app_router = express.Router()

// TODO !!!! Make sure all default images, and image that get uploaded are optimized in size and format


// Environment variables and types
const ENV = require('../config/base')
const NAVBAR = require('../full-stack-libs/Types/Navbar')
const ROLE = require('../full-stack-libs/Types/Role')
const CATEGORY = require('../full-stack-libs/Types/ArticleCategories')


const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')

const articlesRetrievalMiddleware = require('../middleware/articles-middleware/articles-retrieval-middleware')
const recentArticlesRetrievalMiddleware = require('../middleware/articles-middleware/recent-articles-retrieval-middleware')

const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')

const requireRefererMiddleware = require('../middleware/generic-middleware/require-referer')


const distributePaginatedDataController = require('../controllers/generic-controllers/distribute-paginated-data-controller')

const distributeDataController = require('../controllers/articles-controllers/distribute-data-controller')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } =  require("../middleware/generic-middleware/set-user-if-any-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } =  require("../middleware/generic-middleware/authenticate-role-middleware")
const { require_loggedin_for_pages, require_loggedin_for_data } =  require("../middleware/generic-middleware/check-loggedin-middleware")



// Start middleware for this articlesBackend_app_router
// Route is called upon as request from browser as '/articles'
articlesBackend_app_router.use(set_user_if_any, (req, res, next) => {
  // Might need this as a "script endpoint global" variable!
  // res.locals.CATEGORY = CATEGORY;
  navBars = NAVBAR.CLIENTS;
  next()
})


articlesBackend_app_router.get('/recent-articles', requireRefererMiddleware, recentArticlesRetrievalMiddleware, distributeDataController)


articlesBackend_app_router.get('/paginated-articles/data', requireRefererMiddleware, paginatingSetupMiddleware, destructureURLandRefererMiddleware, articlesRetrievalMiddleware, distributePaginatedDataController)


articlesBackend_app_router.get(['/:category?', '/individual_article/:articleID'], (req,res)=>{

  res.locals.CATEGORY = CATEGORY;

  var JSX_to_load = 'ArticlesCategorySelector';

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load, 
  })
})









module.exports = articlesBackend_app_router
