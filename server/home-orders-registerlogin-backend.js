const express = require('express')
const homeOrdersBackend_app_router = express.Router()

// In case you need to connect to DB #@
// const ENV = require('../config/base')
// const {MongoClient} = require('mongodb');
// const uri = ENV.database_link;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


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
// Import paginatedOrdersAccessMiddleware
const paginatedOrdersAccessMiddleware = require('../middleware/home-orders-middleware/paginated-orders-access-middleware')
// Import StopIfAlreadyLoggedIn
const StopIfAlreadyLoggedIn = require('../middleware/stop-if-already-loggedin')
// Import requireReferer
const requireReferer = require('../middleware/require-referer')

// We import the User model, the mongoose connection is already defined for all routers files
const User = require('../models/User')

// No Custom Error needed at the moment
const { CustomError } = require('../custom-errors/custom-errors');

const BuyCryptoOrder = require('../models/home-orders-models/BuyCryptoOrder');
const SellCryptoOrder = require('../models/home-orders-models/SellCryptoOrder');



homeOrdersBackend_app_router.get('/paginated-orders/:type_orders/:userID?', paginatedOrdersAccessMiddleware,  homeOrdersController.getPaginatedOrdersController)


homeOrdersBackend_app_router.get('/users/:what_page', loggedInRedirectHome, (req,res,next)=>{
  console.log("icit: ", req.params.what_page, req.session.userId)
  var JSX_to_load = 'MgtUser';
  res.render('generic-boilerplate-ejs-to-render-react-components', { 
    JSX_to_load : JSX_to_load, 
    [req.params.what_page === "profile" ? "userId": null]: req.session.userId,
  })
})

// makebuy, makesell, AllMyOrders, matches, buyordersdata, sellordersdata
homeOrdersBackend_app_router.get('/databases/:what_page?', checkIfUseridWithinDBmiddleware, (req,res)=>{
  console.log("what_page: ", req.params.what_page)
  
  var JSX_to_load = 'OrdersApp';
  res.render('generic-boilerplate-ejs-to-render-react-components', { 
    JSX_to_load : JSX_to_load , 
    [req.params.what_page === "AllMyOrders" ? "userId": null]: req.session.userId,
  })
})


// Login User
homeOrdersBackend_app_router.post('/users/login', requireReferer, StopIfAlreadyLoggedIn, RegisterLoginController.loginController)


// Register New User
homeOrdersBackend_app_router.post('/users/register', requireReferer, StopIfAlreadyLoggedIn, RegisterLoginController.validateController, RegisterLoginController.registerController)






homeOrdersBackend_app_router.get('/',(req,res)=>{
  console.log("Are we still logged in? ", req.session.userId, "\n\nDo we have any pop-up messages:: ", req.query.popup)
  var JSX_to_load = 'App';
  res.render('generic-boilerplate-ejs-to-render-react-components', { JSX_to_load : JSX_to_load })
})

homeOrdersBackend_app_router.get('/cryptoprice', async (req,res,next)=>{

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




homeOrdersBackend_app_router.delete('/users/profile/delete/:userId', async (req,res,next)=>{
  console.log("\n\n\n\n____Process to delete user and all of his orders___")
  console.log(req.params.userId, " vs ", req.session.userId)

  console.log("Session:", req.session)

  await BuyCryptoOrder.deleteMany({userid: req.session.userId}, (error, response)=>{
    if(error){return next(error)}
    console.log("buys deleted response", response)
  })
  await SellCryptoOrder.deleteMany({userid: req.session.userId}, (error, response)=>{
    if(error){return next(error)}
    console.log("sells deleted response", response)
  })
  // await PostsAmountsTimeframe.deleteOne({userid: req.session.userId}, (error, response)=>{
  //   if(error){return next(error)}
  //   console.log("posts amounts deleted response", response)
  // })
  await User.findByIdAndDelete(req.session.userId, (error, user) =>{ 
    if(error){return next(error)}
    console.log("user deleted", user)
  })

  req.session.destroy()

  res.status(200).json({
    srv_: "User account and linked data completly deleted."
  })

  // How to use the DB and do stuff to it. Ideally you would pass the DB from server.js and just manipulate it here #@
  // try {
  //   await client.connect();
  //   // databasesList = await client.db().admin().listDatabases();
  //   // console.log("Databases:");
  //   // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  //   let sessionCollection = await client.db(ENV.database_name).collection("sessions").find()
  //   JSON.parse(sessionCollection.session)
  //   console.log("did it work? ", JSON.parse(sessionCollection.session))

  // } catch (e) {
  //     console.error(e);
  // } finally {
  //   await client.close();
  // }

})







homeOrdersBackend_app_router.patch('/update', homeOrdersController.updateOrderController)

homeOrdersBackend_app_router.get('/current-user-ID', checkIfUseridWithinDBmiddleware, (req,res)=>{
  console.log(req.session.userId)

  res.json({
    srv_usr_ID: req.session.userId
  })
})

homeOrdersBackend_app_router.delete('/delete-this-order', checkIfUseridWithinDBmiddleware, homeOrdersController.deleteOrderController)

homeOrdersBackend_app_router.post('/:type_order/save', checkIfUseridWithinDBmiddleware, homeOrdersController.registerOrder)

homeOrdersBackend_app_router.get('/logout', (req,res)=>{
  //Destroy the Session data, including the userId property
  req.session.destroy(()=>{
      res.redirect('/?popup=You have successfully logged out')
  })
})


module.exports = homeOrdersBackend_app_router
//router references the homeOrdersBackend const