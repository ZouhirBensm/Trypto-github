const express = require('express')
const multer = require('multer')
const uploadsBackend_app_router = express.Router()
var ObjectId = require('mongodb').ObjectId;
const path = require('path')

var { existsSync, mkdirSync } = require('fs');

const ENV = require('../config/base')

const ROLE = require("../full-stack-libs/Types/Role")
const NAVBAR = require('../full-stack-libs/Types/Navbar')




// const marketOrderID = ObjectId()
// let directory = `./public/img/${marketOrderID}`

// if (!existsSync(dir)) {
//   mkdirSync(dir, { recursive: true });
// }



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // manipulate the req, check is public/img is available or file to error handle
    console.log("req_uuid", req.body, file)
    let p_error = null
    let directory = `./public/img`
    cb(p_error, directory)
  },
  filename: function (req, file, cb) {
    let p_error = null
    let prefix = Math.round(Math.random() * 10000)
    cb(p_error, `${prefix}-${file.originalname}`)
  }
})


let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    suportedExtentions = ['.png', '.jpeg', '.jpg', '.jfif', '.pjpeg', '.pjp', '.apng', '.avif', '.gif', '.svg', '.webp'] 

    var ext = path.extname(file.originalname);
    if (suportedExtentions.includes(ext)) {
      return callback(null, true)
    }
    return callback(new Error('Only images with proper extensions are allowed'))
  },
  // limits: ,
  preservePath: true,
})


const uploadsController = require('../controllers/uploads-controllers/uploads-controllers')


const { requester_auth_middleware } = require('../middleware/generic-middleware/requester-auth-middleware')


// Use this to check the role, requires a res.locals.user.role
const { set_user_if_any } = require("../middleware/generic-middleware/set-user-if-any-middleware")

const { require_loggedin_for_pages, require_loggedin_for_data } = require("../middleware/generic-middleware/check-loggedin-middleware")

const { authenticate_role_for_pages, authenticate_role_for_data } = require("../middleware/generic-middleware/authenticate-role-middleware")


// Database Models
const User = require('../models/User')
const BuyCryptoOrder = require('../models/home-currencyorders-models/BuyCryptoOrder');
const SellCryptoOrder = require('../models/home-currencyorders-models/SellCryptoOrder');
const Protagonist = require('../models/messaging-models/Protagonist')
const Message = require('../models/messaging-models/Message')
const Subscriber = require('../models/Subscriber')



// Start middleware for this marketplaceBackend_app_router
uploadsBackend_app_router.use(set_user_if_any, (req, res, next) => {
  // Might need this as a "script endpoint global" variable!
  // res.locals.userId = req.session.userId
  navBars = NAVBAR.CLIENTS
  next()
})


uploadsBackend_app_router.get('/', (req, res) => {
  res.status(200).json({
    msg: "SUCCESS!!!"
  })
})

// upload.any(),
// uploadsBackend_app_router.post('/post', upload.array('image'), (req, res, next) => {

//   if (!req.files) {
//     console.log("No file received", req.body, req.files);
//     return res.send({
//       success: false
//     });

//   } else {
//     console.log('file received', req.body, req.files);
//     return res.send({
//       success: true
//     })
//   }
// })


uploadsBackend_app_router.post('/post', upload.array('image'), uploadsController.registerMarketOrder)





module.exports = uploadsBackend_app_router