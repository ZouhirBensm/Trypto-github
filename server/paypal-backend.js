const express = require('express')

const paypalBackend_app_router = express.Router()



const IPNController = require('../controllers/paypal-controllers/ipn.ctrl')



// Route is called upon as request from browser as '/paypal/'
paypalBackend_app_router.post('/',   (req,res) =>{
  res.status(200).send('paypal home');
  res.end();
})

paypalBackend_app_router.post('/ipn', IPNController.index)



module.exports = paypalBackend_app_router