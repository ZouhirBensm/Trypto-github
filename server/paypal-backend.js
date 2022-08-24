const express = require('express')

const paypalBackend_app_router = express.Router()



// TODO: delete these folders/files
// /Users/Zouhir/Documents/MERN/BlockchainMERN/controllers/paypal-controllers/ipn.ctrl.js

// const IPNController = require('../controllers/paypal-controllers/ipn.ctrl')



// Route is called upon as request from browser as '/paypal/'
paypalBackend_app_router.get('/',   (req,res) =>{
  res.status(200).send('paypal home');
  res.end();
})

// paypalBackend_app_router.post('/ipn', IPNController.index)



module.exports = paypalBackend_app_router