const express = require('express')
const router = express.Router()

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

// Import Long homeOrdersController functions
const homeOrdersController = require("../controllers/home-orders-controllers/home-orders-controllers")
// Import Long RegisterLoginController functions
const RegisterLoginController = require("../controllers/register-login-controllers/register-login-controllers")

// Import loggedInRedirectHome
const loggedInRedirectHome = require('../middleware/loggedIn-redirect-home')
// Import checkIfUseridWithinDBmiddleware
const checkIfUseridWithinDBmiddleware = require('../middleware/checkIf-userid-withinDB-middleware')
// Import postTrackerMiddleware
const postTrackerMiddleware = require('../middleware/home-orders-middleware/postTrackerMiddleware')
// Import paginatedOrdersAccessMiddleware
const paginatedOrdersAccessMiddleware = require('../middleware/home-orders-middleware/paginated-orders-access-middleware')
// Import checkifSecondUserCredPost
const checkifSecondUserCredPost = require('../middleware/checkif-second-user-cred-post')

// We import the User model
const User = require('../models/User')

// No Custom Error needed at the moment
const { CustomError } = require('../custom-errors/custom-errors')



router.get('/paginated-orders/:type_orders/:userID?', paginatedOrdersAccessMiddleware,  homeOrdersController.getPaginatedOrdersController)








router.get('/',(req,res)=>{
  // console.log(loggedIn)
  var JSX_to_load = 'App';
  res.render('generic-boilerplate-ejs-to-render-react-components', { JSX_to_load : JSX_to_load })
})

router.get('/cryptoprice', async (req,res,next)=>{

  let params = {
    ids: ['bitcoin', 'ethereum', 'litecoin', 'bitcoin-cash', 'zcash', 'monero'],
    vs_currencies: ['cad', 'usd', 'eur']
  }

  try {
    let data = await CoinGeckoClient.simple.price(params)
    return res.json({
      data: data.data
    })
  } catch(e) {
    console.log(`CoinGeckoClient api call error: ${e}`)
    next(e)
  }
  //console.log(typeof data.data, typeof JSON.stringify(data.data))
})


router.get('/users/login', loggedInRedirectHome, (req,res,next)=>{
  // let notification
  // let email
  // let password
  // // res.render('login')
  // console.log("1 notification: ", notification)
  // res.render('login', {notification, email, password}, function(err, html) {
  //   if(err) {
  //       return next(err)
  //   } else {
  //       res.send(html);
  //   }
  // })
  console.log("ICI??")
  var JSX_to_load = 'LoginRegister';
  res.render('generic-boilerplate-ejs-to-render-react-components', { JSX_to_load : JSX_to_load })
})


router.post('/users/login', checkifSecondUserCredPost, RegisterLoginController.loginController)

router.get('/users/register', loggedInRedirectHome, (req,res)=>{
  var JSX_to_load = 'LoginRegister';
  // console.log(JSX_to_load)
  res.render('generic-boilerplate-ejs-to-render-react-components', { JSX_to_load : JSX_to_load })
})

// Register New User
router.post('/users/register', checkifSecondUserCredPost, RegisterLoginController.validateController, RegisterLoginController.registerController)


router.get(['/databases', '/databases/makebuy', '/databases/makesell', '/databases/AllMyOrders', '/databases/buyordersdata', '/databases/sellordersdata', '/databases/matches'], checkIfUseridWithinDBmiddleware, (req,res)=>{
  var JSX_to_load = 'OrdersApp';
  res.render('generic-boilerplate-ejs-to-render-react-components', { JSX_to_load : JSX_to_load })
})

router.post('/update', homeOrdersController.updateOrderController)

router.get(['/databases/CurrentUserID'], checkIfUseridWithinDBmiddleware, (req,res)=>{
  console.log(req.session.userId)

  res.json({
    data: req.session.userId
  })
})

router.post('/deleteThisOrder', checkIfUseridWithinDBmiddleware, homeOrdersController.deleteOrderController)

router.post('/:target/store', checkIfUseridWithinDBmiddleware, postTrackerMiddleware, homeOrdersController.registerOrder)

router.get('/logout', (req,res)=>{
  //Destroy the Session data, including the userId property
  req.session.destroy(()=>{
      res.redirect('/')
  })
})




module.exports = router