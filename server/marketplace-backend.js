// Libraries
const express = require('express')
// const multer = require('multer')
// const path = require('path')
// const CoinGecko = require('coingecko-api');
// var { existsSync, mkdirSync } = require('fs');


const {MarketOrderSubmissionError} = require('../custom-errors/custom-errors')

// Initializations
const marketplaceBackend_app_router = express.Router()


const MulterSetup = require('../services/multer-services/multer.src')
const multerinstance = new MulterSetup(`./public/img/temporal-new`, new MarketOrderSubmissionError("Server Error | Please, try again later", "Directory: temporal-new directory is not present."), new MarketOrderSubmissionError("Server Error | Please, try again later", 'Only images with proper extensions are allowed'))



// ENV variables
// const ENV = require('../config/base')


// Utils
// const utils = require('../full-stack-libs/utils')
const ROLE = require("../full-stack-libs/Types/Role")
const NAVBAR = require('../full-stack-libs/Types/Navbar')

const state_cities_map = require('../full-stack-libs/Data/state_cities_map')
const provinces_territories_map = require('../full-stack-libs/Data/provinces_territories_map')
const {States, Provinces_Territories} = require('../full-stack-libs/Data/states_provinces_territories')


// Custom Error
// const { CustomError, DeleteAccountProcessError } = require("../custom-errors/custom-errors")



// Controllers
const marketplaceController = require("../controllers/marketplace-controllers/marketplace-controllers")
const moreMarketplaceController = require("../controllers/marketplace-controllers/more-marketplace-controllers")

const distributePaginatedDataController = require("../controllers/generic-controllers/distribute-paginated-data-controller")


// Middleware
// const requireRefererMiddleware = require('../middleware/generic-middleware/require-referer')
const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')

const paginatedOrdersSetupMiddleware = require('../middleware/generic-middleware/paginated-orders-setup-middleware')




// const ordersRetrievalMiddleware = require('../middleware/marketplace-middleware/orders-retrieval-middleware')
// const uploadsMiddleware = require('../middleware/uploads-middleware/uploads-middleware')

const marketplaceMiddleware = require('../middleware/marketplace-middleware/marketplace-middleware3')

const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')
// const startEmptyNotificationsMiddleware = require('../middleware/generic-middleware/start-empty-notifications-middleware')
// const { getPopulatedUser } = require('../middleware/generic-middleware/get-populated-user')


const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")

const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")

const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")







// TODO !!!!! Now that I fixed the middleware that requires log in or logged out, make the market orders for see to all


// Start middleware for this marketplaceBackend_app_router
marketplaceBackend_app_router.use(set_user_if_any, (req, res, next) => {
  // Might need this as a "script endpoint global" variable!
  // res.locals.userId = req.session.userId
  navBars = NAVBAR.CLIENTS
  return next()
})





// require_loggedin_for_pages(true)
marketplaceBackend_app_router.get(['/allmyorders', '/sellordersdata', '/makesell'], 
require_loggedin_for_pages(true), 
(req, res) => {

  console.log("\n\nSimple\n\n")

  res.locals.popup = req.query.popup

  // Make sell user ID is the session's
  res.locals.userId = req.session.userId
  
  // console.log("\nDo we have any pop-up messages: \n", req.query.popup);
  // console.log("\n\n\nres.locals: ---->>>>>", res.locals)

  var JSX_to_load = 'MarketPlace';

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
  
})












// // ORIGINAL
// // TODO !!! make sure it's ok to expose the api to the public, required to load recent orders on the home page
// marketplaceBackend_app_router.get(['/paginated-orders/sellordersdata/:data_of_userID?'], 
// // TODO !!!! needs to be uncommented below
// // require_loggedin_for_data(true), 
// // authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), 
// // requester_auth_middleware(5), 
// paginatingSetupMiddleware, 
// destructureURLandRefererMiddleware, 
// paginatedOrdersSetupMiddleware, 
// marketplaceMiddleware.filterSetupsMiddleware,
// marketplaceMiddleware.determineRearrangeDataOrNotMiddleware,
// marketplaceMiddleware.queryAndOrganizeDataMiddleware,
// marketplaceMiddleware.ordersRetrievalMiddleware, 
// distributePaginatedDataController
// )


marketplaceBackend_app_router.get(['/paginated-orders/sellordersdata/:data_of_userID?'], 
paginatingSetupMiddleware, 
destructureURLandRefererMiddleware, 
paginatedOrdersSetupMiddleware, 
marketplaceMiddleware.filterSetupsMiddleware,
marketplaceMiddleware.determineRearrangeDataOrNotMiddleware,
marketplaceMiddleware.queryAndOrganizeDataMiddleware,
marketplaceMiddleware.ordersRetrievalMiddleware, 
distributePaginatedDataController
)









marketplaceBackend_app_router.get('/associated-user-locality/:userID', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), requester_auth_middleware(2), moreMarketplaceController.retrieveUserAssociatedLocalityIfAnyController)








marketplaceBackend_app_router.get(['/sellordersdata/:orderID', '/allmyorders/:orderID'], require_loggedin_for_pages(true), (req, res) => {

  console.log("\n\nDetailed\n\n")
  // console.log("paths:", res.locals.paths_URL);

  res.locals.userId = req.session.userId


  var JSX_to_load = 'MarketPlace';

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
})


// TODO !!!! the web_keys pdf is open to public, which is an issue. Should be open only for a email in exchange


// TODO !!!!! after adding sub category, search adapted, seed adapted

marketplaceBackend_app_router.post('/sellorders/save/:userID?', 
require_loggedin_for_data(true), 
requester_auth_middleware(2), 
multerinstance.upload.array('image'), 

marketplaceMiddleware.seeDataRespond,


marketplaceMiddleware.instantiateMarketOrderLocationMiddleware, 
marketplaceMiddleware.instantiateMarketOrderMiddleware,
marketplaceMiddleware.processImageFilesMiddleware,
marketplaceMiddleware.instantiateMarketOrderImagesMiddleware,
marketplaceMiddleware.saveAllMarketOrderMiddleware,
marketplaceMiddleware.setupAgendaJobToDeleteOrderImagesOnExpiryMiddleware,
marketplaceController.registerMarketOrderController
)
























marketplaceBackend_app_router.get('/json/agglomerates', require_loggedin_for_data(true), moreMarketplaceController.retrieveCitiesPerPoliticalAreaController)





































marketplaceBackend_app_router.get(['/order/:userId/sellordersdata/:orderID', '/order/:userId/allmyorders/:orderID'], require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), requester_auth_middleware(4), marketplaceController.getOrderController)





marketplaceBackend_app_router.patch('/:userId/update1', 
marketplaceController.seeDataRes,
// require_loggedin_for_data(true), 
// authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), 
// requester_auth_middleware(4), 
marketplaceController.seeDataRes,
marketplaceController.updateOrder1Controller
)


marketplaceBackend_app_router.patch('/:userId/update23', 
require_loggedin_for_data(true), 
authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), 
requester_auth_middleware(4), 
marketplaceController.updateOrder23Controller
)




















































marketplaceBackend_app_router.delete('/:userId/delete-this-order', 
require_loggedin_for_data(true), 
authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), 
requester_auth_middleware(4), 
marketplaceController.deleteMarketOrderImages, marketplaceController.deleteOrderController
)
















module.exports = marketplaceBackend_app_router



// TODO download the VScode icon extensions