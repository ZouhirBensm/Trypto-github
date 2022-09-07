const ENV = require('../config/base')
//Global variable loggedIn that will be accessible from all our ejs files
global.loggedIn = null
global.navBars = null

const NAVBAR = require('../full-stack-libs/Types/Navbar')
// console.log(process.env.ROOT)

// TODO #98 Better organize server folder

const mongoose = require('mongoose')

//Fixes
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// ENV.database_link
// mongodb+srv://Maestro:DB%24%251993@cluster0.81z5d.mongodb.net/mern_database_atlas
mongoose.connect(ENV.database_link)
.catch(e => {throw e})

// Assign the "DB CONNECTION" to the db variable
// db can then be use for "DATA CHANGES", "DATA STATE CHANGES"
global.db = mongoose.connection
// console.log("\n\n\n\ndb:\n\n", db._connectionString, db, typeof db)
// const clientP = db.then(m => m.getClient())
const clientP = db.then(m => {
  // console.log("\n\n\n\nm:\n\n", m); 
  return m.getClient();
})
// console.log("\n\n\n\clientP\n\n", clientP)

// runs once the DB is connected to the web server on the open event i.e. as soon the DB "opens"/connects
db.once("open", () => {
  console.log(`Successfully connected to MongoDB using Mongoose from server.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
})





// A shell in which your views are rendered: file in which other render() views are rendered layouts.ejs
const layouts = require("express-ejs-layouts")

const express = require('express');


const homeOrdersBackend_app_router = require('./home-orders-registerlogin-backend')
const messagingBackend_app_router = require('./messaging-backend');
const paypalBackend_app_router = require('./paypal-backend')
const operationsBackend_app_router = require('./operations-backend')
const articlesBackend_app_router = require('./articles-backend')

const { errorLoggerMiddleware } = require('../middleware/error-middleware/error-handle-fcts-middleware')

const { errorResponderController, errorResponseDispatcherController } = require('../controllers/error-controllers/error-handle-fcts-controller')

const { invalidPathHandler } = require("../controllers/register-login-controllers/register-login-controllers")

const express_server_app_router = express();


const expressSession = require('express-session')
const MongoStore = require('connect-mongo');


const sessionMiddleware = expressSession({
  //Pass in the configuration object with value secret
  //The secret string is used to sign and encrypt the session ID cookie being shared with the browser
  secret: ENV.express_session_secret,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    // mongoUrl: 'mongodb+srv://Maestro:DB%24%251993@cluster0.81z5d.mongodb.net/mern_database_atlas',
    // mongoUrl: ENV.database_link,
    clientPromise: clientP,
    // mongoUrl: 'mongodb+srv://Maestro:DB%24%251993@cluster0.81z5d.mongodb.net/mern_database_atlas',
    // collectionName: 'sessions',
    // ttl: 1000*60*60*24 // 1 Day,
    stringify: false,
  }),
  cookie: {
    secure: false,
    sameSite: 'strict',
    //originalMaxAge: 24*60*60
    maxAge: 1000*60*60*24 // 1 Day
  }
});


//We register the expressSession middleware in our express_server_app_router
express_server_app_router.use(sessionMiddleware)


express_server_app_router.set('view engine', 'ejs')
// console.log(express_server_app_router.get("view engine"))


// Express.js know to use this package as an additional middleware layer
express_server_app_router.use(layouts)
// Parse incomming requests that have json payloads
express_server_app_router.use(express.json())
// Tell your express.js application to parse incomming requests that are URL encoded data (usually form post and utf-8 content)
express_server_app_router.use(express.urlencoded({extended: true}))







// Enablig ressources on our public directory to be served by the web server on HTTP requests, therefor accessible to servered HTML, EJS files when public ressources referenced within.
express_server_app_router.use(express.static('public'));



express_server_app_router.use((req, res, next) => {
  // console.log("Testing!")
  res.locals.ENV = ENV;
  res.locals.userId = req.session.userId
  // res.locals.CATEGORY = {};
  loggedIn = req.session.userId
  // Default navbars unless overwritten
  navBars = NAVBAR.CLIENTS
  next()
})


express_server_app_router.use('/', homeOrdersBackend_app_router)
// All routes that fall upon this router are appended by default the first path argument '/messaging'. 
// Then within the router you only define from the 2nd layer directory
express_server_app_router.use('/messaging', messagingBackend_app_router)



express_server_app_router.use('/paypal', paypalBackend_app_router)

// TODO figure out how to set the /operations URL to the operations.bidblock.ca subdomain
express_server_app_router.use('/operations', operationsBackend_app_router)


express_server_app_router.use('/articles', articlesBackend_app_router)



// Fail-safe catch-all non registered routes to render error page 
// if "earlier" endpoints does not exist 
// i.e no endpoints match the request made on the server and no error thrown
// all requests go through this and either sets up a custom no match page response (if it's a GET request) 
// or uses Express' default response (if it's anything other than a GET request) 
express_server_app_router.use(invalidPathHandler)



// Middleware error handlers that processes any thrown errors
express_server_app_router.use(errorLoggerMiddleware)
// Retrieves the error and either responds to client based on the nature of the error or redirects the error to the generic errorResponderController middleware
express_server_app_router.use(errorResponseDispatcherController)
// Cuts off error handling from express' default error handler because the function responds to client
express_server_app_router.use(errorResponderController)


// Note: Errors thrown during the application (i.e. before express_server_app_router.use(errorLoggerMiddleware)) get dealt with the error function middlewares (the errorResponderController always responds), and thus circumvent this express_server_app_router.use(invalidPathHandler) middleware


// Upgrade the HTTP Express Server to a Socket IO Server
module.exports = {express_server_app_router, sessionMiddleware}
const server_instance = require("./io-server-setup")


// .listen() Returns a Express.JS HTTP web server instance when express_server_app_router.listen()
// listening on the server_instance also listens on the express_server_app_router?
server_instance.listen(ENV.port, function () {
  console.log(`Express web server has started and is listening for requests on port ${ENV.port}`);
});




/*
 Entire repository with the name of Trypto-gitlab on the Gitlab platform (URL: https://gitlab.com/Maestro07/trypto-gitlab) with a Project ID: 31112112 and accessed with user account: freelancebenz@gmail.com is regimented by the intellectual property laws of the Canadian Intellectual Property Office Canadian Copyright © issued by Innovation, Science and Economic Development Canada. Copyright registered the 12th of October 2021 under the registration number 1187187. Registerer name is Zouhir Mohamed Bachir Bensmaia, born the 26th January 1993. Copyright covers all future and past software edits, and also functional subtleties the project accomplishes.
*/