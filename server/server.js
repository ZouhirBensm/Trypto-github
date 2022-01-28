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
const matchesPaginateMiddleware = require('../middleware/matchesPaginateMiddleware')



const express = require('express');

const app = express();
const path = require('path')
const ejs = require('ejs')
const bcrypt = require('bcrypt')
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

// ENV.database_link
// mongodb+srv://Maestro:DB%24%251993@cluster0.81z5d.mongodb.net/mern_database_atlas
mongoose.connect(ENV.database_link, {useNewUrlParser:true, useUnifiedTopology: true})
.catch(e => console.log(`An Error on mongoose.connect: server.js line 61 The Error: ${e}`))



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
  res.render('index')
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

app.get('/data/:target', paginateMiddleware, (req,res)=>{
  res.json({
    data: res.paginatedResults
  })
})




app.get('/data/:target/:userID', paginateMiddleware, (req,res)=>{
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
                  //console.log(req.session)
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
  res.render('databases')
})




//Edit  of orders Magic happens here
app.get(['/databases/AllMyOrders/Edit'], authMiddleware, (req,res)=>{
  res.render('databases')
})



app.post('/update', (req,res)=>{
  const UserID = req.session.userId
  var OrderID = req.body.OrderID
  var OrderType = req.body.OrderType
  

  var NewCrypto = req.body.NewCrypto
  
  var NewAmount = req.body.NewAmount
  
  var NewMinAmount = req.body.NewMinAmount
  var NewMaxAmount = req.body.NewMaxAmount

  var NewPrice = req.body.NewPrice
  var NewExpiryDate = req.body.NewExpiryDate
  var NewExpiryTime = req.body.NewExpiryTime
  var NewPayment = req.body.NewPayment
  
  // var NewAmount = req.body.NewAmount
  //console.log('Current User: ' + UserID + ' and Order asked to update: ' + OrderID + ' order to update type: ' + OrderType)
  
  if(OrderType === 'buy'){
    BuyCryptoOrder.findByIdAndUpdate(OrderID, {
      crypto: NewCrypto,
      amount: NewAmount,
      price: NewPrice,
      expirydate: NewExpiryDate,
      expirytime: NewExpiryTime,
      payment: NewPayment,
      }, (error, blogspot) => { 
      console.log(error,blogspot) 
    })
  } else if (OrderType === 'sell'){
    SellCryptoOrder.findByIdAndUpdate(OrderID, {
      crypto: NewCrypto,
      minamount: NewMinAmount,
      maxamount: NewMaxAmount,
      price: NewPrice,
      expirydate: NewExpiryDate,
      expirytime: NewExpiryTime,
      payment: NewPayment,
      }, (error, blogspot) => { 
      console.log(error,blogspot) 
    })
  }


  res.render('databases') 

})

app.get('/matches', authMiddleware, (req,res)=>{
  res.render('matches')
})


app.get('/api/matches/:target', matchesPaginateMiddleware, (req,res)=>{
  res.json({
    data: res.paginatedResults,
  })
})


app.get(['/databases/CurrentUserID'], authMiddleware, (req,res)=>{
  //con  sole.log(req.session)

  res.json({
    data: req.session.userId
  })
  //res.render('databases')
})

app.get(['/databases/buyordersdata', '/databases/sellordersdata'], authMiddleware, (req,res)=>{
  res.render('databases')

})

//Save form input buyconstruct.ejs to buycryptoorders database
app.post('/buyorders/store', authMiddleware, (req,res)=>{
  
  req.body.expireAt = new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))
  //var offset = req.body.expireAt.getTimezoneOffset() //
  console.log(new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5)))
  //console.log(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7), req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))
  
  console.log('typeof: ', typeof req.body.expireAt + '\n','req.body.expireAt: '+ req.body.expireAt+ '\n','Current Date: '+ new Date()+ '\n')
  //console.log(new Date('July 22, 2013 14:00:00'))
  if(req.body.expireAt > new Date()){
    BuyCryptoOrder.create({
        ...req.body,
        userid: req.session.userId
    }, (error, buycryptoorder) => {
        //console.log(buycryptoorder, error)
        res.redirect('/databases')        
    })
  } else {
    res.redirect('/databases')  
  }
})

//Save form input sellconstruct.ejs to sellcryptoorders database
app.post('/sellorders/store', authMiddleware, (req,res)=>{
  req.body.expireAt = new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))
  //var offset = req.body.expireAt.getTimezoneOffset() //
  console.log(new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5)))
  //console.log(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7), req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))
  
  console.log('typeof: ', typeof req.body.expireAt + '\n','req.body.expireAt: '+ req.body.expireAt+ '\n','Current Date: '+ new Date()+ '\n')
  //console.log(new Date('July 22, 2013 14:00:00'))

  if(req.body.expireAt > new Date()){
    SellCryptoOrder.create({
      ...req.body,
      userid: req.session.userId
    }, (error, sellcryptoorder) => {
        res.redirect('/databases')        
    })
  } else {
    res.redirect('/databases')  
  }
})

//Save form input sellconstruct.ejs to sellcryptoorders database
app.post('/deleteThisOrder', authMiddleware, (req,res)=>{
  //console.log('delete comes here')
  //console.log(req.body) 
  var id = req.body.OrderID

  if (req.body.OrderType === 'buy') {
    //console.log('Order type is a buy type')
    BuyCryptoOrder.findByIdAndDelete(req.body.OrderID, (error, buyorder) =>{ 
      console.log(error, buyorder)
    })
  } else if (req.body.OrderType === 'sell') {
    //console.log('Order type is a sell type')
    SellCryptoOrder.findByIdAndDelete(id, (error, sellorder) =>{ 
    console.log(error, sellorder)
    })
  }
  res.redirect('/databases/AllMyOrders') 
})




/* Youtube
*/

app.get('/logout', (req,res)=>{
  //Destroy the Session data, including the userId property
  req.session.destroy(()=>{
      res.redirect('/')
  })
})