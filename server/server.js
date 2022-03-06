
const ENV = require('../config/base')
//Global variable loggedIn that will be accessible from all our ejs files
global.loggedIn = null

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

//Import redirectIfAuthenticatedMiddleware
const redirectIfAuthenticatedMiddleware = require('../middleware/redirectIfAuthenticatedMiddleware')

//Import authMiddleware
const authMiddleware = require('../middleware/authMiddleware')

const paginateMiddleware = require('../middleware/paginateMiddleware')
const matchesPaginateMiddleware = require('../middleware/matchespaginateMiddleware')
const postTrackerMiddleware = require('../middleware/postTrackerMiddleware')


const express = require('express');

const app = express();
const path = require('path')
const ejs = require('ejs')
// const bcrypt = require('bcrypt')
var bcrypt = require('bcryptjs');
const expressSession = require('express-session')
const MongoStore = require('connect-mongo');



//We register the expressSession middleware in our app
app.use(expressSession({
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
    ttl: 1000*60*60*24 // 1 Day,
  }),
  cookie: {
      secure: false,
      sameSite: 'strict',
      //originalMaxAge: 24*60*60
      maxAge: 1000*60*60*24 // 1 Day
  }
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const mongoose = require('mongoose')

//Fixes
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

//We import the User model
const User = require('../models/User')
//We import the BuyCryptoOrder model
const BuyCryptoOrder = require('../models/BuyCryptoOrder')
//We import the SellCryptoOrder model
const SellCryptoOrder = require('../models/SellCryptoOrder')
//We import the PostsAmountsTimeframe model
const PostsAmountsTimeframe = require('../models/PostAmountsTimeframe')


// ENV.database_link
// mongodb+srv://Maestro:DB%24%251993@cluster0.81z5d.mongodb.net/mern_database_atlas
mongoose.connect(ENV.database_link, {useNewUrlParser:true, useUnifiedTopology: true})
.catch(e => {throw e})



app.set('view engine', 'ejs')

//Middleware executed for all requests
app.use('*', (req,res,next)=>{
  loggedIn = req.session.userId
  next()
})

app.use(express.static('public'));


app.listen(ENV.port, function () {
  console.log(`App started on port ${ENV.port}`);
});

 
app.get('/',(req,res)=>{
  //console.log(req.session)
  var JSX_to_load = 'App';
  res.render('index', { JSX_to_load : JSX_to_load })
})

app.get('/api',(req,res)=>{
  (async function(){
    //delete
    let params = {
      ids: ['bitcoin', 'ethereum', 'litecoin', 'bitcoin-cash', 'zcash', 'monero'],
      vs_currencies: ['cad', 'usd', 'eur']
    }

    try {
      let data = await CoinGeckoClient.simple.price(params).then(data=>data.data);
      return res.json({
        data: data
      })
    } catch(e) {
      console.log(`CoinGeckoClient simple() method error: ${e}`)
    }
    //console.log(typeof data.data, typeof JSON.stringify(data.data))
    
  })()
  //loadData();
  //delete
})


// app.get('/api/matches/:target', matchesPaginateMiddleware, (req,res)=>{
//   res.json({
//     data: res.paginatedResults,
//   })
// })


app.get('/data/:target/:userID?', paginateMiddleware, (req,res)=>{
  res.json({
    data: res.paginatedResults,
  })
})




app.get('/login', redirectIfAuthenticatedMiddleware, (req,res)=>{
  res.render('login')
})

app.get('/register', redirectIfAuthenticatedMiddleware, (req,res)=>{
  //res.sendFile helps us get the full absulute path which otherwise changes
  //based on different Operating systems
  //res.sendFile(path.resolve(__dirname,'pages/contact.html'))
  res.render('register')
})

//User model creates a new document with browser request data
app.post('/users/store', redirectIfAuthenticatedMiddleware, async (req,res)=>{

  await User.create(req.body,(error,user)=>{
    //console.log(req.body)
    //Log the errors if User validation does not work
      if(error){
          return res.redirect('/register')
      }
      res.redirect('/')
  })
})

app.post('/users/login', redirectIfAuthenticatedMiddleware, (req,res)=>{
  
  
  //Extract the email and password from the login form with req.body
  const {email, password} = req.body

  //Try to find one user with the inputed email
  User.findOne({email: email}, (error,user)=>{
      if(user){
          //Compare inputed password with database user.password
          bcrypt.compare(password, user.password, (error,same)=>{
              if(same){
                  //store
                  //Sets up the Session object with cookie created and userId
                  req.session.userId = user._id



                  // console.log("QUERIED DATABASE: ", data)
                  // console.log("SESSION to WORK WITH: ", req.session)

                  res.redirect('/')
                  
              //If password is wrong
              } else {
                  res.redirect('/login')
              }
          })
      //If user email does not exist in database
      } else {
          res.redirect('/login')
      }
  })
})

app.get(['/databases', '/databases/makebuy', '/databases/makesell', '/databases/AllMyOrders'], authMiddleware, (req,res)=>{
  var JSX_to_load = 'Databases';
  res.render('index', { JSX_to_load : JSX_to_load })
})




//Edit  of orders Magic happens here
app.get(['/databases/AllMyOrders/Edit'], authMiddleware, (req,res)=>{
  var JSX_to_load = 'Databases';
  res.render('index', { JSX_to_load : JSX_to_load })
})



app.post('/update', (req,res)=>{

  console.log(req.body)
  
  console.log('Current User: ' + req.session.userId + ' and Order asked to update: ' + req.body.OrderID + ' order to update type: ' + req.body.OrderType)
  
  if(req.body.OrderType === 'buyordersdata'){
    BuyCryptoOrder.findByIdAndUpdate(req.body.OrderID, {
      crypto: req.body.NewCrypto,
      amount: req.body.NewAmount,
      price: req.body.NewPrice,
      expirydate: req.body.NewExpiryDate,
      expirytime: req.body.NewExpiryTime,
      payment: req.body.NewPayment,
      }, (error, blogspot) => { 
      console.log(error,blogspot) 
    })
  } else if (req.body.OrderType === 'sellordersdata'){
    SellCryptoOrder.findByIdAndUpdate(req.body.OrderID, {
      crypto: req.body.NewCrypto,
      minamount: req.body.NewMinAmount,
      maxamount: req.body.NewMaxAmount,
      price: req.body.NewPrice,
      expirydate: req.body.NewExpiryDate,
      expirytime: req.body.NewExpiryTime,
      payment: req.body.NewPayment,
      }, (error, blogspot) => { 
      console.log(error,blogspot) 
    })
  }


  // var JSX_to_load = 'Databases';
  // res.render('index', { JSX_to_load : JSX_to_load })

  
  res.redirect('/databases/AllMyOrders') 

})

app.get('/matches', authMiddleware, (req,res)=>{
  var JSX_to_load = 'Matches';
  res.render('index', { JSX_to_load : JSX_to_load })
})




app.get(['/databases/CurrentUserID'], authMiddleware, (req,res)=>{
  console.log(req.session.userId)

  res.json({
    data: req.session.userId
  })
  // var JSX_to_load = 'Databases';
  // res.render('index', { JSX_to_load : JSX_to_load })

})

app.get(['/databases/buyordersdata', '/databases/sellordersdata'], authMiddleware, (req,res)=>{
  var JSX_to_load = 'Databases';
  res.render('index', { JSX_to_load : JSX_to_load })

})

//Save form input sellconstruct.ejs to sellcryptoorders database
app.post('/deleteThisOrder', authMiddleware, (req,res)=>{
  //console.log('delete comes here')
  console.log("server bod:::", req.body) 
  var id = req.body.OrderID

  if (req.body.OrderType === 'buyordersdata') {
    //console.log('Order type is a buy type')
    BuyCryptoOrder.findByIdAndDelete(req.body.OrderID, (error, buyorder) =>{ 
      console.log(error)
    })
    // res.redirect('/databases/AllMyOrders') 
    res.json({
      memorized_order_type: req.body.OrderType
    })
  } else if (req.body.OrderType === 'sellordersdata') {
    //console.log('Order type is a sell type')
    SellCryptoOrder.findByIdAndDelete(id, (error, sellorder) =>{ 
      console.log(error)
    })
    // res.redirect('/databases/AllMyOrders') 
    res.json({
      memorized_order_type: req.body.OrderType
    })
  }
})

//Save form input buyconstruct.ejs to buycryptoorders database
app.post('/buyorders/store', authMiddleware, postTrackerMiddleware, (req,res)=>{

  // console.log(req.session)
  req.body.expireAt = new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))
  //var offset = req.body.expireAt.getTimezoneOffset() //
  //console.log(new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5)))
  // console.log(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))
  // console.log(req.body.expireAt)
  
  //console.log('typeof: ', typeof req.body.expireAt + '\n','req.body.expireAt: '+ req.body.expireAt+ '\n','Current Date: '+ new Date()+ '\n')
  //console.log(new Date('July 22, 2013 14:00:00'))


  console.log("WAZAAAA", req.session.posts_amounts_timeframe)
  if(req.body.expireAt > new Date() && req.session.posts_amounts_timeframe < 20){
    // 7 orders per timeframe allowed
    BuyCryptoOrder.create({
      crypto: req.body.crypto,
      amount: req.body.amount,
      price: req.body.price,
      expirydate: req.body.expirydate,
      expirytime: req.body.expirytime,
      payment: req.body.payment,
      userid: req.session.userId,
      expireAt: req.body.expireAt
    }, (error, buycryptoorder) => {
        //console.log(buycryptoorder, error)
        // res.redirect('/databases/makebuy')  
        res.json({
          iterator: req.session.posts_amounts_timeframe,
          message: "Buy post successfully saved in database",
        })
    })
  } else {
    res.json({
      iterator: req.session.posts_amounts_timeframe,
      message: "You have reached your posting limit",
    })
  }

})

//Save form input sellconstruct.ejs to sellcryptoorders database
app.post('/sellorders/store', authMiddleware, postTrackerMiddleware, (req,res)=>{
  console.log(req.body)
  req.body.expireAt = new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))
  //var offset = req.body.expireAt.getTimezoneOffset() //
  //console.log(new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5)))
  //console.log(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7), req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))
  
  //console.log('typeof: ', typeof req.body.expireAt + '\n','req.body.expireAt: '+ req.body.expireAt+ '\n','Current Date: '+ new Date()+ '\n')
  //console.log(new Date('July 22, 2013 14:00:00'))

  if(req.body.expireAt > new Date() && req.session.posts_amounts_timeframe < 20){
    SellCryptoOrder.create({
      crypto: req.body.crypto,
      minamount: req.body.minamount,
      maxamount: req.body.maxamount,
      price: req.body.price,
      expirydate: req.body.expirydate,
      expirytime: req.body.expirytime,
      payment: req.body.payment,
      userid: req.session.userId,
      expireAt: req.body.expireAt
    }, (error, sellcryptoorder) => {
      res.json({
        iterator: req.session.posts_amounts_timeframe,
        message: "Sell post successfully saved in database",
      })       
    })
  } else {
    res.json({
      iterator: req.session.posts_amounts_timeframe,
      message: "You have reached your posting limit",
    })
  }
})






app.get('/logout', (req,res)=>{


  
  
  //Destroy the Session data, including the userId property
  req.session.destroy(()=>{
      res.redirect('/')
  })
})

// console.log(process.env.ROOT)

/*
 Entire current directory with the name of Trypto-gitlab with a Project ID: 31112112 is under the restrictions and obligations of intellectual property through a Canadian Copyright © issued by Innovation, Science and Economic Development Canada Canadian Intellectual Property Office. Registration number is 1187187, and registered the 12th of October 2021.
*/