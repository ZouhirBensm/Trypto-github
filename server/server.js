const ENV = require('../config/base')
//Global variable loggedIn that will be accessible from all our ejs files
global.loggedIn = null
// console.log(process.env.ROOT)

// A shell in which your views are rendered: file in which other render() views are rendered layouts.ejs
const layouts = require("express-ejs-layouts")
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

// Import Long homeOrdersController functions
const homeOrdersController = require("../controllers/home-orders-controllers/homeOrdersController")
// Import Long Controller functions
const Controller = require("../controllers/Controller")

//Import redirectIfAuthenticatedMiddleware
const redirectIfAuthenticatedMiddleware = require('../middleware/redirectIfAuthenticatedMiddleware')

//Import authMiddleware
const authMiddleware = require('../middleware/authMiddleware')

const postTrackerMiddleware = require('../middleware/home-orders-middleware/postTrackerMiddleware')

const express = require('express');

const express_server_router = express();
const path = require('path')
const ejs = require('ejs')

const expressSession = require('express-session')
const MongoStore = require('connect-mongo');



//We register the expressSession middleware in our express_server_router
express_server_router.use(expressSession({
  //Pass in the configuration object with value secret
  //The secret string is used to sign and encrypt the session ID cookie being shared with the browser
  secret: ENV.express_session_secret,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    // mongoUrl: 'mongodb+srv://Maestro:DB%24%251993@cluster0.81z5d.mongodb.net/mern_database_atlas',
    mongoUrl: ENV.database_link,
    // mongoUrl: 'mongodb+srv://Maestro:DB%24%251993@cluster0.81z5d.mongodb.net/mern_database_atlas',
    collectionName: 'sessions',
    // ttl: 1000*60*60*24 // 1 Day,
  }),
  cookie: {
    secure: false,
    sameSite: 'strict',
    //originalMaxAge: 24*60*60
    maxAge: 1000*60*60*24 // 1 Day
  }
}))

// Express.js know to use this package as an additional middleware layer
express_server_router.use(layouts)
// Parse incomming requests that have json payloads
express_server_router.use(express.json())
// Tell your express.js application to parse incomming requests that are URL encoded data (usually form post and utf-8 content)
express_server_router.use(express.urlencoded({extended: true}))
const mongoose = require('mongoose')

//Fixes
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

//We import the User model
const User = require('../models/User')
//We import the BuyCryptoOrder model
const BuyCryptoOrder = require('../models/home-orders-models/BuyCryptoOrder')
//We import the SellCryptoOrder model
const SellCryptoOrder = require('../models/home-orders-models/SellCryptoOrder')


// ENV.database_link
// mongodb+srv://Maestro:DB%24%251993@cluster0.81z5d.mongodb.net/mern_database_atlas
mongoose.connect(ENV.database_link, {useNewUrlParser:true, useUnifiedTopology: true})
.catch(e => {throw e})



express_server_router.set('view engine', 'ejs')
// console.log(express_server_router.get("view engine"))

//Middleware executed for all requests
express_server_router.use('*', (req,res,next)=>{
  loggedIn = req.session.userId
  next()
})

express_server_router.use(express.static('public'));


express_server_router.listen(ENV.port, function () {
  console.log(`Express web server has started and is listening for requests on port ${ENV.port}`);
});

 
express_server_router.get('/',(req,res)=>{
  //console.log(req.session)
  var JSX_to_load = 'App';
  res.render('home-orders', { JSX_to_load : JSX_to_load })
})

express_server_router.get('/api', async (req,res)=>{

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
    console.log(`CoinGeckoClient simple() method error: ${e}`)
  }
  //console.log(typeof data.data, typeof JSON.stringify(data.data))
})

express_server_router.get('/data/:target/:userID?', homeOrdersController.paginateController)

express_server_router.get('/login', redirectIfAuthenticatedMiddleware, (req,res)=>{
  res.render('login')
})

express_server_router.get('/register', redirectIfAuthenticatedMiddleware, (req,res)=>{
  res.render('register')
})

// Register New User
express_server_router.post('/users/store', redirectIfAuthenticatedMiddleware, async (req,res)=>{
  await User.create(req.body,(error,user)=>{
      if(error){
          return res.redirect('/register')
      }
      res.redirect('/')
  })
})

express_server_router.post('/users/login', redirectIfAuthenticatedMiddleware, Controller.loginController)



express_server_router.get(['/databases', '/databases/makebuy', '/databases/makesell', '/databases/AllMyOrders', '/databases/buyordersdata', '/databases/sellordersdata', '/databases/matches'], authMiddleware, (req,res)=>{
  var JSX_to_load = 'OrdersApp';
  res.render('home-orders', { JSX_to_load : JSX_to_load })
})

express_server_router.post('/update', homeOrdersController.updateOrderController)

express_server_router.get(['/databases/CurrentUserID'], authMiddleware, (req,res)=>{
  console.log(req.session.userId)

  res.json({
    data: req.session.userId
  })
})

express_server_router.post('/deleteThisOrder', authMiddleware, homeOrdersController.deleteOrderController)

express_server_router.post('/:target/store', authMiddleware, postTrackerMiddleware, homeOrdersController.registerOrder)

express_server_router.get('/logout', (req,res)=>{
  //Destroy the Session data, including the userId property
  req.session.destroy(()=>{
      res.redirect('/')
  })
})

/*
 Entire repository with the name of Trypto-gitlab with a Project ID: 31112112 and accessed with user account: freelancebenz@gmail.com is regimented under the intellectual property restrictions and obligations of the Canadian Copyright © issued by Innovation, Science and Economic Development Canada Canadian Intellectual Property Office. Registered the 12th of October 2021 under registration number is 1187187.
*/