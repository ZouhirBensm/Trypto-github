const express = require('express')
const articlesBackend_app_router = express.Router()


// Environment variables and types
const ENV = require('../config/base')
const NAVBAR = require('../full-stack-libs/Types/Navbar')
const ROLE = require('../full-stack-libs/Types/Role')
const CATEGORY = require('../full-stack-libs/Types/ArticleCategories')


const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')

const articlesRetrievalMiddleware = require('../middleware/articles-middleware/articles-retrieval-middleware')

const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')

const requireRefererMiddleware = require('../middleware/generic-middleware/require-referer')


const distributePaginatedDataController = require('../controllers/generic-controllers/distribute-paginated-data-controller')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } =  require("../middleware/generic-middleware/set-user-if-any-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } =  require("../middleware/generic-middleware/authenticate-role-middleware")
const { require_loggedin_for_pages, require_loggedin_for_data } =  require("../middleware/generic-middleware/check-loggedin-middleware")



// Start middleware for this articlesBackend_app_router
// Route is called upon as request from browser as '/articles'
articlesBackend_app_router.use(set_user_if_any, (req, res, next) => {
  res.locals.CATEGORY = CATEGORY;
  next()
})

articlesBackend_app_router.get(['/:category?', '/individual_article/:articleID'], (req,res)=>{

  console.log("category:", req.params.category)
  // console.log({userId: req.session.userId})

  var JSX_to_load = 'ArticlesCategorySelector';
  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load, 
  })
})


articlesBackend_app_router.get('/paginated-articles/data', requireRefererMiddleware, paginatingSetupMiddleware, destructureURLandRefererMiddleware, articlesRetrievalMiddleware, distributePaginatedDataController)


module.exports = articlesBackend_app_router
