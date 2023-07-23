const express = require('express')
const articlesBackend_app_router = express.Router()
const httpStatus = require("http-status-codes")

// TODO !!! Make sure all default images, and image that get uploaded are optimized in size and format


// Environment variables and types
const ENV = require('../config/base')
const NAVBAR = require('../full-stack-libs/Types/Navbar')
const ROLE = require('../full-stack-libs/Types/Role')
const CATEGORY = require('../full-stack-libs/Types/ArticleCategories')


const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')

const articlesRetrievalMiddleware = require('../middleware/articles-middleware/articles-retrieval-middleware')

const individualArticleMiddleware = require('../middleware/articles-middleware/individual-article-middleware')

const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')

const requireRefererMiddleware = require('../middleware/generic-middleware/require-referer')


const distributePaginatedDataController = require('../controllers/generic-controllers/distribute-paginated-data-controller')

const individualArticleController = require('../controllers/article-controllers/individual-article-controller')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")
const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")
const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")


const Article = require('../models/articles-models/Article')
const { MongoError } = require('../custom-errors/custom-errors')



// Start middleware for this articlesBackend_app_router
// Route is called upon as request from browser as '/articles'
articlesBackend_app_router.use(set_user_if_any, (req, res, next) => {
  // Might need this as a "script endpoint global" variable!
  // res.locals.CATEGORY = CATEGORY;
  navBars = NAVBAR.CLIENTS;
  next()
})











articlesBackend_app_router.get('/paginated-articles/data',
  requireRefererMiddleware,
  paginatingSetupMiddleware,
  destructureURLandRefererMiddleware,

  // Throtle for testing Loading spinner
  // articlesRetrievalMiddleware.middleware0,

  articlesRetrievalMiddleware.middleware1,
  articlesRetrievalMiddleware.middleware2,
  articlesRetrievalMiddleware.middleware3,
  articlesRetrievalMiddleware.middleware4,
  articlesRetrievalMiddleware.middleware5,
  distributePaginatedDataController
)






articlesBackend_app_router.get('/:category?', (req, res) => {

  res.locals.CATEGORY = CATEGORY;

  var JSX_to_load = 'ArticlesCategorySelector';

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
})









// TODO !!!!! TEMPORAL to delete from google search console
articlesBackend_app_router.get('/individual_article/64ab99cbd8c98d66aaa99b76', (req,res) => {
  res.status(404).end()
})



articlesBackend_app_router.get('/individual_article/:article_title', 

individualArticleMiddleware.middleware1, 
individualArticleMiddleware.middleware2, 
individualArticleMiddleware.middleware3, 
// individualArticleController.controller1,
individualArticleController.controller2
)









articlesBackend_app_router.get('/data/:article_title', async (req, res, next) => {

  let ret_article
  let e

  try {
    ret_article = await Article.findOne({ link: `/articles/individual_article/${req.params.article_title}` })
  } catch (error) {
    const error_msg = 'Mongo error when executing: Article.findOne'
    e = new MongoError(error_msg, error.code)
    return next(e)
  }

  if (!ret_article) {
    let e
    const error_msg = 'No article data was found'
    const code = undefined
    // Good for SEO, i.e. successfully failed
    const statusCode = httpStatus.StatusCodes.OK
    e = new MongoError(error_msg, undefined, statusCode)

    return next(e)
  }

  res.status(200).json({
    article: ret_article
  })

})









module.exports = articlesBackend_app_router
