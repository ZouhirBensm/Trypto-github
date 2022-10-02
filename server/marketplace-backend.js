// Libraries
const express = require('express')
const CoinGecko = require('coingecko-api');

// Initializations
const marketplaceBackend_app_router = express.Router()


// ENV variables
const ENV = require('../config/base')




// Utils
const utils = require('../full-stack-libs/utils')
const ROLE = require("../full-stack-libs/Types/Role")
const NAVBAR = require('../full-stack-libs/Types/Navbar')


// Custom Error
const { CustomError } = require('../custom-errors/custom-errors');
const { DeleteAccountProcessError } = require("../custom-errors/custom-errors")


// Controllers
const homeOrdersController = require("../controllers/home-orders-controllers/home-orders-controllers")

const marketplaceController = require("../controllers/marketplace-controllers/marketplace-controllers")

const distributePaginatedDataController = require("../controllers/generic-controllers/distribute-paginated-data-controller")


// Middleware
const requireRefererMiddleware = require('../middleware/generic-middleware/require-referer')
const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')
const paginatedOrdersSetupMiddleware = require('../middleware/home-orders-middleware/paginated-orders-setup-middleware')
// const ordersRetrievalMiddleware = require('../middleware/home-orders-middleware/orders-retrieval-middleware')



const ordersRetrievalMiddleware = require('../middleware/marketplace-middleware/orders-retrieval-middleware')

const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')
const startEmptyNotificationsMiddleware = require('../middleware/generic-middleware/start-empty-notifications-middleware')
const {getDetailedUserSubscriptionInfo} = require('../middleware/generic-middleware/get-detailed-user-subsciption-information-middleware')


const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } =  require("../middleware/generic-middleware/set-user-if-any-middleware")

const {require_loggedin_for_pages, require_loggedin_for_data} = require("../middleware/generic-middleware/check-loggedin-middleware")

const { authenticate_role_for_pages, authenticate_role_for_data } =  require("../middleware/generic-middleware/authenticate-role-middleware")






// Database Models
const User = require('../models/User')
const BuyCryptoOrder = require('../models/home-orders-models/BuyCryptoOrder');
const SellCryptoOrder = require('../models/home-orders-models/SellCryptoOrder');
const Protagonist = require('../models/messaging-models/Protagonist')
const Message = require('../models/messaging-models/Message')
const Subscriber = require('../models/Subscriber')









// Start middleware for this marketplaceBackend_app_router
marketplaceBackend_app_router.use(set_user_if_any, (req, res, next) => {
  // Might need this as a "script endpoint global" variable!
  // res.locals.userId = req.session.userId
  navBars = NAVBAR.CLIENTS
  next()
})









marketplaceBackend_app_router.get(['/', '/databases', '/databases/AllMyOrders' , '/databases/sellordersdata', '/make/makesell'], require_loggedin_for_pages(true), (req,res)=>{

  // console.log("paths:", res.locals.paths_URL)
  
  res.locals.paths_URL[1] == "databases"? res.locals.userId = req.session.userId: null
  
  var JSX_to_load = 'OrdersApp2';

  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load,
  })
})




// TODO to be added after
// require_loggedin_for_pages(true)
// TODO replace endpoint with
// ['/databases/sellordersdata/:orderID', '/databases/AllMyOrders/:orderID']
marketplaceBackend_app_router.get(['/databases/:what_page/:orderID'], (req,res)=>{

  console.log("paths:", res.locals.paths_URL)
  
  res.locals.paths_URL[1] == "databases"? res.locals.userId = req.session.userId: null
  
  var JSX_to_load = 'OrdersApp2';

  res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
    JSX_to_load : JSX_to_load,
  })
})



marketplaceBackend_app_router.get(['/order/:userId/sellordersdata/:orderID', '/order/:userId/AllMyOrders/:orderID'], marketplaceController.getOrderController)

// marketplaceBackend_app_router.get('/order/:userId/:type_order/:orderID', marketplaceController.getOrderController)



// // Endpoints
// // /databases/AllMyOrders, /databases/matches, /databases/buyordersdata, /databases/sellordersdata
// // /make/makebuy, /make/makesell, 
// marketplaceBackend_app_router.get(['/databases/:what_page?', '/make/:type'], require_loggedin_for_pages(true), (req,res)=>{

//   // console.log("what_page: ", req.params.what_page)
//   // console.log("what_type: ", req.params.type)

//   console.log("paths:", res.locals.paths_URL)
  
//   res.locals.paths_URL[0] == "databases"? res.locals.userId = req.session.userId: null
  
//   var JSX_to_load = 'OrdersApp2';

//   // console.log("\n\nResponse locals: ___________________/n", res.locals, "\n\n____________________\n\n")
//   res.render('generic-boilerplate-ejs-to-render-react-components-client', { 
//     JSX_to_load : JSX_to_load,
//   })
// })




// marketplaceBackend_app_router.patch('/update', require_loggedin_for_data(true), homeOrdersController.updateOrderController)



// marketplaceBackend_app_router.delete('/delete-this-order', require_loggedin_for_data(true), homeOrdersController.deleteOrderController)



// TODO add the require login middleware
// require_loggedin_for_data(true), homeOrdersController.registerOrder

// marketplaceController.registerOrder
marketplaceBackend_app_router.post('/sellorders/save', marketplaceController.registerOrder2)


// JUST IN CASE, KEPT AS REFERENCE TODO TO DELETE
// marketplaceBackend_app_router.post('/sellorders/save', marketplaceController.registerOrder)





// requireRefererMiddleware, require_loggedin_for_data(true), requester_auth_middleware(5), paginatingSetupMiddleware, destructureURLandRefererMiddleware, paginatedOrdersSetupMiddleware, ordersRetrievalMiddleware, distributePaginatedDataController






marketplaceBackend_app_router.get(['/paginated-orders/sellordersdata/:data_of_userID?', '/paginated-orders/AllMyOrders/:data_of_userID?'], paginatingSetupMiddleware, destructureURLandRefererMiddleware, paginatedOrdersSetupMiddleware, ordersRetrievalMiddleware, distributePaginatedDataController)



module.exports = marketplaceBackend_app_router
