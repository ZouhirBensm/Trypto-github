const express = require('express')
const router = express.Router()

// In case you need to connect to DB
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
// Import postTrackerMiddleware
const postTrackerMiddleware = require('../middleware/home-orders-middleware/postTrackerMiddleware')
// Import paginatedOrdersAccessMiddleware
const paginatedOrdersAccessMiddleware = require('../middleware/home-orders-middleware/paginated-orders-access-middleware')
// Import checkifSecondUserCredPost
const checkifSecondUserCredPost = require('../middleware/checkif-second-user-cred-post')

// We import the User model
const User = require('../models/User')

// No Custom Error needed at the moment
const { CustomError } = require('../custom-errors/custom-errors');

const BuyCryptoOrder = require('../models/home-orders-models/BuyCryptoOrder');
const SellCryptoOrder = require('../models/home-orders-models/SellCryptoOrder');
const PostsAmountsTimeframe = require('../models/home-orders-models/PostAmountsTimeframe')



router.get('/paginated-orders/:type_orders/:userID?', paginatedOrdersAccessMiddleware,  homeOrdersController.getPaginatedOrdersController)








router.get('/',(req,res)=>{

  console.log("Are we still logged in? ", req.session.userId, "\n\nDo we have any pop-up messages", req.query.popup)
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


router.get('/users/:what_page', loggedInRedirectHome, (req,res,next)=>{
  console.log("icit: ", req.params.what_page, req.session.userId)
  var JSX_to_load = 'MgtUser';
  res.render('generic-boilerplate-ejs-to-render-react-components', { 
    JSX_to_load : JSX_to_load, 
    [req.params.what_page === "profile" ? "userId": null]: req.session.userId,
  })
})

router.delete('/users/profile/delete/:userId', async (req,res,next)=>{
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

  // How to use the DB and do stuff to it. Ideally you would pass the DB from server.js and just manipulate it here
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


router.post('/users/login', checkifSecondUserCredPost, RegisterLoginController.loginController)

// router.get('/users/register', loggedInRedirectHome, (req,res)=>{
//   var JSX_to_load = 'MgtUser';
//   // console.log(JSX_to_load)
//   res.render('generic-boilerplate-ejs-to-render-react-components', { JSX_to_load : JSX_to_load })
// })

// Register New User
router.post('/users/register', checkifSecondUserCredPost, RegisterLoginController.validateController, RegisterLoginController.registerController)

// makebuy, makesell, AllMyOrders, matches, buyordersdata, sellordersdata
router.get('/databases/:what_page?', checkIfUseridWithinDBmiddleware, (req,res)=>{
  console.log(req.params.what_page)
  var JSX_to_load = 'OrdersApp';
  res.render('generic-boilerplate-ejs-to-render-react-components', { JSX_to_load : JSX_to_load })
})



router.post('/update', homeOrdersController.updateOrderController)

router.get(['/current-user-ID'], checkIfUseridWithinDBmiddleware, (req,res)=>{
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

// router.get('/users/profile', (req,res)=>{
//   var JSX_to_load = 'MgtUser';
//   res.render('generic-boilerplate-ejs-to-render-react-components', { JSX_to_load : JSX_to_load })
// })


module.exports = router