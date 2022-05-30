const ENV = require('../config/base')
//Global variable loggedIn that will be accessible from all our ejs files
global.loggedIn = null
// console.log(process.env.ROOT)

// A shell in which your views are rendered: file in which other render() views are rendered layouts.ejs
const layouts = require("express-ejs-layouts")

const express = require('express');

const homeOrdersBackend = require('./home-orders-registerlogin-backend')
const messagingBackend = require('./messaging-backend');
const { errorLogger, errorResponder, errorResponseDispatcher } = require('../middleware/error-middleware/error-handle-fcts')

const { invalidPathHandler } = require("../controllers/register-login-controllers/register-login-controllers")

const express_server_router = express();

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

// Enablig ressources on our public directory to be served by the web server on HTTP requests, therefor accessible to servered HTML, EJS files when public ressources referenced within.
express_server_router.use(express.static('public'));



express_server_router.use('/', homeOrdersBackend)
// All routes that fall upon this router are appended by default the first path argument '/messaging'. 
// Then within the router you only define from the 2nd layer directory
express_server_router.use('/messaging', messagingBackend)



// Middleware error handlers that processes any thrown errors
express_server_router.use(errorLogger)
// Retrieves the error and either responds to client based on the nature of the error or redirects the error to the generic errorResponder middleware
express_server_router.use(errorResponseDispatcher)
// Cuts off error handling from express' default error handler because the function responds to client
express_server_router.use(errorResponder)

// Fail-safe catch-all non registered routes to render error page 
// if "earlier" endpoints does not exist 
// i.e no endpoints match the request made on the server and no error thrown
// all requests go through this and either sets up a custom no match page response (if it's a GET request) 
// or uses Express' default response (if it's anything other than a GET request) 
express_server_router.use(invalidPathHandler)

// Note: Errors thrown during the application (i.e. before express_server_router.use(errorLogger)) get dealt with the error function middlewares (the errorResponder always responds), and thus circumvent this express_server_router.use(invalidPathHandler) middleware



express_server_router.listen(ENV.port, function () {
  console.log(`Express web server has started and is listening for requests on port ${ENV.port}`);
});



/*
 Entire repository with the name of Trypto-gitlab on the Gitlab platform (URL: https://gitlab.com/Maestro07/trypto-gitlab) with a Project ID: 31112112 and accessed with user account: freelancebenz@gmail.com is regimented by the intellectual property laws of the Canadian Intellectual Property Office Canadian Copyright © issued by Innovation, Science and Economic Development Canada. Copyright registered the 12th of October 2021 under the registration number 1187187. Registerer name is Zouhir Mohamed Bachir Bensmaia, born the 26th January 1993. Copyright encompasses all future and past software edits.
*/