const express = require('express')
const router = express.Router()

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

// Import Long homeOrdersController functions
const homeOrdersController = require("../controllers/home-orders-controllers/homeOrdersController")
// Import Long Controller functions
const Controller = require("../controllers/Controller")

// Import redirectIfAuthenticatedMiddleware
const redirectIfAuthenticatedMiddleware = require('../middleware/redirectIfAuthenticatedMiddleware')
// Import authMiddleware
const authMiddleware = require('../middleware/authMiddleware')
// Import postTrackerMiddleware
const postTrackerMiddleware = require('../middleware/home-orders-middleware/postTrackerMiddleware')

// We import the User model
const User = require('../models/User')

// No Custom Error needed at the moment
const { CustomError } = require('../custom-errors/home-orders-custom-errors')




router.get('/',(req,res)=>{
  // console.log(loggedIn)
  var JSX_to_load = 'App';
  res.render('home-orders', { JSX_to_load : JSX_to_load })
})

router.get('/api', async (req,res,next)=>{

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

router.get('/data/:target/:userID?', homeOrdersController.paginateController)

router.get('/login', redirectIfAuthenticatedMiddleware, (req,res,next)=>{
  let notification
  let email
  let password
  // res.render('login')
  console.log("1", notification)
  res.render('login', {notification, email, password}, function(err, html) {
    if(err) {
        return next(err)
    } else {
        res.send(html);
    }
  })
})

router.post('/users/login', redirectIfAuthenticatedMiddleware, Controller.loginController)

router.get('/register', redirectIfAuthenticatedMiddleware, (req,res)=>{
  res.render('register')
})

// Register New User
router.post('/users/store', redirectIfAuthenticatedMiddleware, async (req,res, next)=>{
  await User.create(req.body,(error,user)=>{
    if(error){return next(error)}
    res.redirect('/')
  })
})

router.get(['/databases', '/databases/makebuy', '/databases/makesell', '/databases/AllMyOrders', '/databases/buyordersdata', '/databases/sellordersdata', '/databases/matches'], authMiddleware, (req,res)=>{
  var JSX_to_load = 'OrdersApp';
  res.render('home-orders', { JSX_to_load : JSX_to_load })
})

router.post('/update', homeOrdersController.updateOrderController)

router.get(['/databases/CurrentUserID'], authMiddleware, (req,res)=>{
  console.log(req.session.userId)

  res.json({
    data: req.session.userId
  })
})

router.post('/deleteThisOrder', authMiddleware, homeOrdersController.deleteOrderController)

router.post('/:target/store', authMiddleware, postTrackerMiddleware, homeOrdersController.registerOrder)

router.get('/logout', (req,res)=>{
  //Destroy the Session data, including the userId property
  req.session.destroy(()=>{
      res.redirect('/')
  })
})




module.exports = router