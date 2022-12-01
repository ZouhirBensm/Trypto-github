// Libraries
const express = require('express')
const multer = require('multer')
const path = require('path')
const CoinGecko = require('coingecko-api');
var { existsSync, mkdirSync } = require('fs');

const {MarketOrderSubmissionError} = require('../custom-errors/custom-errors')

// Initializations
const marketplaceBackend_app_router = express.Router()


const MulterSetup = require('../services/multer-services/multer.src')
const multerinstance = new MulterSetup(`./public/img/temporal-new`, new MarketOrderSubmissionError("Server Error | Please, try again later", "Directory: temporal-new directory is not present."), new MarketOrderSubmissionError("Server Error | Please, try again later", 'Only images with proper extensions are allowed'))



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
const marketplaceController = require("../controllers/marketplace-controllers/marketplace-controllers")

const distributePaginatedDataController = require("../controllers/generic-controllers/distribute-paginated-data-controller")


// Middleware
const requireRefererMiddleware = require('../middleware/generic-middleware/require-referer')
const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')
const paginatedOrdersSetupMiddleware = require('../middleware/home-currencyorders-middleware/paginated-orders-setup-middleware')




// const ordersRetrievalMiddleware = require('../middleware/marketplace-middleware/orders-retrieval-middleware')
// const uploadsMiddleware = require('../middleware/uploads-middleware/uploads-middleware')

const marketplaceMiddleware = require('../middleware/marketplace-middleware/marketplace-middleware')

const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')
const startEmptyNotificationsMiddleware = require('../middleware/generic-middleware/start-empty-notifications-middleware')
const { getDetailedUserSubscriptionInfo } = require('../middleware/generic-middleware/get-detailed-user-subsciption-information-middleware')


const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")

const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")

const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")






// Database Models
const User = require('../models/User')
const BuyCryptoOrder = require('../models/home-currencyorders-models/BuyCryptoOrder');
const SellCryptoOrder = require('../models/home-currencyorders-models/SellCryptoOrder');
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








marketplaceBackend_app_router.get(['/paginated-orders/sellordersdata/:data_of_userID?'], require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), requester_auth_middleware(5), paginatingSetupMiddleware, destructureURLandRefererMiddleware, paginatedOrdersSetupMiddleware, marketplaceMiddleware.ordersRetrievalMiddleware, distributePaginatedDataController)










// const marketOrderID = ObjectId()
// let directory = `./public/img/${marketOrderID}`

// if (!existsSync(dir)) {
//   mkdirSync(dir, { recursive: true });
// }



// upload.any(),
// uploadsBackend_app_router.post('/post', upload.array('image'), (req, res, next) => {

//   if (!req.files) {
//     console.log("No file received", req.body, req.files);
//     return res.send({
//       success: false
//     });

//   } else {
//     console.log('file received', req.body, req.files);
//     return res.send({
//       success: true
//     })
//   }
// })






// marketplaceBackend_app_router.post('/sellorders/save', require_loggedin_for_data(true), marketplaceController.registerMarketOrder)



marketplaceBackend_app_router.post('/sellorders/save/:userID?', require_loggedin_for_data(true), requester_auth_middleware(2), multerinstance.upload.array('image'), marketplaceMiddleware.instantiateMarketOrderLocationMiddleware, marketplaceMiddleware.instantiateMarketOrderMiddleware, marketplaceMiddleware.processImageFilesMiddleware, marketplaceMiddleware.instantiateMarketOrderImagesMiddleware, marketplaceMiddleware.saveAllMarketOrderMiddleware, marketplaceMiddleware.setupAgendaJobToDeleteOrderImagesOnExpiryMiddleware, marketplaceController.registerMarketOrderController)
















marketplaceBackend_app_router.get(['/', '/allmyorders', '/sellordersdata', '/makesell'], require_loggedin_for_pages(true), (req, res) => {

  res.locals.popup = req.query.popup

  console.log("\nDo we have any pop-up messages: \n", req.query.popup);

  // console.log("paths:", res.locals.paths_URL)
  res.locals.userId = req.session.userId


  var JSX_to_load = 'MarketPlace';

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
})



marketplaceBackend_app_router.get(['/sellordersdata/:orderID', '/allmyorders/:orderID'], require_loggedin_for_pages(true), (req, res) => {

  console.log("paths:", res.locals.paths_URL);

  (res.locals.paths_URL[1] == "allmyorders" || res.locals.paths_URL[1] == "sellordersdata") ? res.locals.userId = req.session.userId : null

  var JSX_to_load = 'MarketPlace';

  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
})







// , require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), requester_auth_middleware(4)
marketplaceBackend_app_router.get(['/order/:userId/sellordersdata/:orderID', '/order/:userId/allmyorders/:orderID'], marketplaceController.getOrderController)





marketplaceBackend_app_router.delete('/:userId/delete-this-order', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), requester_auth_middleware(4), marketplaceController.deleteMarketOrderImages, marketplaceController.deleteOrderController)









marketplaceBackend_app_router.patch('/:userId/update', require_loggedin_for_data(true), authenticate_role_for_data([ROLE.MASTER, ROLE.USER.NOTSUBSCRIBER, ROLE.USER.SUBSCRIBER.BASIC]), requester_auth_middleware(4), marketplaceController.updateOrderController)













module.exports = marketplaceBackend_app_router



// TODO download the VScode icon extensions