
const express = require('express')

const currencyBackend_app_router = express.Router()

const NAVBAR = require('../full-stack-libs/Types/Navbar')

// Controllers
const currencyOrdersController = require('../controllers/currencyorders-controllers/currencyorders-controllers')
const distributePaginatedDataController = require("../controllers/generic-controllers/distribute-paginated-data-controller")



// Middlewares
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")
const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")
const requireRefererMiddleware = require('../middleware/generic-middleware/require-referer')
const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')
const destructureURLandRefererMiddleware = require('../middleware/generic-middleware/destructure-URL-&-referer-middleware')
const paginatingSetupMiddleware = require('../middleware/generic-middleware/paginating-setup-middleware')
const paginatedOrdersSetupMiddleware = require('../middleware/generic-middleware/paginated-orders-setup-middleware')



const currencyordersRetrievalMiddleware = require('../middleware/currencyorders-middleware/currencyorders-retrieval-middleware')



currencyBackend_app_router.use(set_user_if_any, (req, res, next) => {
  navBars = NAVBAR.CLIENTS
  return next()
})





currencyBackend_app_router.get('/paginated-orders/:type_orders/:data_of_userID?', 
requireRefererMiddleware, 
require_loggedin_for_data(true), 
requester_auth_middleware(5), 
paginatingSetupMiddleware, 
destructureURLandRefererMiddleware, 
paginatedOrdersSetupMiddleware,
currencyordersRetrievalMiddleware, 
distributePaginatedDataController
)














currencyBackend_app_router.delete('/delete-this-order', require_loggedin_for_data(true), currencyOrdersController.deleteOrderController)


// Endpoints
// /btclayerexchange/buyordersdata, 
// /btclayerexchange/sellordersdata,
// /btclayerexchange/allmyorders, 
// /btclayerexchange/matches, 
// /btclayerexchange/makebuy, 
// /btclayerexchange/makesell
currencyBackend_app_router.get(['/btclayerexchange/:page?'], require_loggedin_for_pages(true), (req, res) => {

  // console.log("\npage: ", req.params.page)
  // console.log("\npaths:---->", res.locals.paths_URL)

  res.locals.userId = req.session.userId

  var JSX_to_load = 'BTClayerexchange';
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
})

currencyBackend_app_router.post('/:type_order/save', require_loggedin_for_data(true), currencyOrdersController.registerOrder)


currencyBackend_app_router.patch('/update/:userID', require_loggedin_for_data(true), 
requester_auth_middleware(2), 
currencyOrdersController.updateOrderController)



module.exports = currencyBackend_app_router