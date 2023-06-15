

// 1234567 for new deployment
require('dotenv').config()

console.log("\n\n",process.env.NODE_ENV)
console.log(process.env.DATABASE_LINK)
console.log(process.env.EXPRESS_SECRET)
console.log(process.env.PORT)
console.log(process.env.DATABASE_NAME)
console.log(process.env.ENVIRONMENT)
console.log(process.env.PAYPAL_PRODUCT_ID)
console.log(process.env.PAYPAL_CLIENT_ID)
console.log(process.env.PAYPAL_SECRET)
console.log(process.env.PAYPAL_API_ROOT)
console.log(process.env.DOMAIN_WITHOUT_PROTOCOL)
console.log(process.env.CONSOLE_CLOUD_GOOGLE_API_KEY)
console.log(process.env.PAYPAL_PLAN_ID)
console.log(process.env.PAYPAL_PRODUCT_ID)
console.log(process.env.BIDBLOCK_EMAIL)
console.log(process.env.BIDBLOCK_EMAIL_APP_PASS_CODE)
console.log(process.env.GOOGLE_MAPS_API_URL, "\n\n")

console.log(`Server starting with NODE_ENV=${process.env.NODE_ENV}`);

const Agenda = require('agenda');

// RATE LIMIT!!!!!
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
  windowMs: 1000, // 1 minutes
  // windowMs: 60 * 1000, // 1 minutes
  // windowMs: 5 * 60 * 1000, // 5 minutes
	// windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 * 12, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  // max: 30, // Limit each IP to 30 requests per `window` (here, per 15 minutes)
	// max: 200 * 5 * 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})



// TODO !!! make sure you use connection.close() the mongoose connection when ctrl + c the express app

const ENV = require('../config/base')
// console.log("------>", ENV)
//Global variable loggedIn that will be accessible from all our ejs files
global.loggedIn = null
global.navBars = null
global.URL_ = null
global.max_marketimagefilesize = 12500000

const NAVBAR = require('../full-stack-libs/Types/Navbar')
// console.log(process.env.ROOT)

// TODO #98 Better organize server folder

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);


mongoose.connect(ENV.database_link)
.catch(e => {throw e})

// Assign the "DB CONNECTION" to the db variable
// db can then be use for "DATA CHANGES", "DATA STATE CHANGES"
global.db = mongoose.connection
// console.log("------>", db)
// console.log("\n\n\n\ndb:\n\n", db._connectionString, db['$initialConnection'], typeof db)
// const clientP = db.then(m => m.getClient())
const clientP = db['$initialConnection'].then(m => {
  // console.log("\n\n\n\nm:\n\n", m, m.getClient()); 
  return m.getClient();
})
// console.log("\n\n\n\clientP\n\n", clientP)

// runs once the DB is connected to the web server on the open event i.e. as soon the DB "opens"/connects

db.once("open", () => {
  console.log(`\nSuccessfully connected to MongoDB using Mongoose from server.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}\n\n\n`)
})


// TODO network in groups to see if audience would pay for a bidblock platform
// TODO look into kickstarter to fund the app: https://www.kickstarter.com/, look into crowdfunding




global.agenda = new Agenda({
  db: {
    address: db._connectionString,
    maxConcurrency: 10, // not having wanted effect of having no more thant 10 jobs processes runing simultaneously total
    defaultConcurrency: 1, // not having wanted effect of 1 process per job
    collection: "AgendaJobs"
  },
});

// IIFE to start Agenda, and be able to forcefully and gracefully close it
(async function () {
  await agenda.start()

  async function graceful() {
    await agenda.stop();
    await agenda.close({ force: true });
    console.log(" Exiting agenda gracefully...")
    process.exit(0);
  }

  process.on("SIGTERM", graceful);
  process.on("SIGINT", graceful);
})();






// A shell in which your views are rendered: file in which other render() views are rendered layouts.ejs
const layouts = require("express-ejs-layouts")

const express = require('express');

const utils = require('../full-stack-libs/utils')


const homeOrdersBackend_app_router = require('./home-currencyorders-registerlogin-backend')
// const currencyBackend_app_router = require('./currencyorders-backend')
const settingsBackend_app_router = require('./settings-backend')
const marketplaceBackend_app_router = require('./marketplace-backend')
const messagingBackend_app_router = require('./messaging-backend');
const paypalBackend_app_router = require('./paypal-backend')
const operationsBackend_app_router = require('./operations-backend')
const articlesBackend_app_router = require('./articles-backend')

const { errorLoggerMiddleware } = require('../middleware/error-middleware/error-handle-fcts-middleware')

const { errorResponderController, errorResponseDispatcherController } = require('../controllers/error-controllers/error-handle-fcts-controller')



const { invalidPathHandler } = require("../controllers/register-login-controllers/login-controllers")

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
    maxAge: 1000*60*60*24 
    // 1 Day
    // maxAge: 1000*60*60*5, // 5 hours then deletes
    // maxAge: 1000*60*30 
    // 30 min for testing then deletes
  }
});


// RATE LIMIT! !!!!!!!!!!!!!!!!!! !!!!!!!!!!!!!!!!
express_server_app_router.set('trust proxy', 1)


express_server_app_router.set('view engine', 'ejs')
// console.log(express_server_app_router.get("view engine"))


// RATE LIMIT!!!!!
// Apply the rate limiting middleware to all requests
express_server_app_router.use(limiter)

//We register the expressSession middleware in our express_server_app_router
express_server_app_router.use(sessionMiddleware)




// Express.js know to use this package as an additional middleware layer
express_server_app_router.use(layouts)
// Parse incomming requests that have json payloads
express_server_app_router.use(express.json())
// Tell your express.js application to parse incomming requests that are URL encoded data (usually form post and utf-8 content)
express_server_app_router.use(express.urlencoded({extended: true}))







// Enablig ressources on our public directory to be served by the web server on HTTP requests, therefor accessible to servered HTML, EJS files when public ressources referenced within.
express_server_app_router.use(express.static('public'));







express_server_app_router.use((req, res, next) => {
  // console.log("\n\n1st middleware: server.js -> req.url:\n", req.url)

  URL_ = req.url.split("?")[0]
  res.locals.paths_URL = utils.URLpathDecomposer(URL_)

  // console.log(URL_, res.locals.paths_URL)
  
  loggedIn = req.session.userId
  

  // navBars = NAVBAR.CLIENTS
  // res.locals.userId = req.session.userId
  return next()
})


express_server_app_router.get('/ip', (request, response) => response.send(request.ip))


express_server_app_router.use('/', homeOrdersBackend_app_router)

// Disables the currency app
// express_server_app_router.use('/currency', currencyBackend_app_router)

express_server_app_router.use('/marketplace', marketplaceBackend_app_router)


express_server_app_router.use('/settings', settingsBackend_app_router)

// All routes that fall upon this router are appended by default the first path argument '/messaging'. 
// Then within the router you only define from the 2nd layer directory
express_server_app_router.use('/messaging', messagingBackend_app_router)



express_server_app_router.use('/paypal', paypalBackend_app_router)

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
  console.log(`Express web server has started and is listening for requests on port ${ENV.port}, ${process.env.NODE_ENV}`);
});




/*
 Entire repository with the name of Trypto-gitlab on the Gitlab platform (URL: https://gitlab.com/Maestro07/trypto-gitlab) with a Project ID: 31112112 and accessed with user account: freelancebenz@gmail.com is regimented by the intellectual property laws of the Canadian Intellectual Property Office Canadian Copyright © issued by Innovation, Science and Economic Development Canada. Copyright registered the 12th of October 2021 under the registration number 1187187. Registerer name is Zouhir Mohamed Bachir Bensmaia, born the 26th January 1993. Copyright covers all future and past software edits.
*/