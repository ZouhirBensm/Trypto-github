// Router towards /ral
const express = require('express')
const affiliateLinks_app_router = express.Router()





// Start middleware for this messagingBackend_app_router
// Route is called upon as request from browser as '/messaging/'
affiliateLinks_app_router.use(set_user_if_any)



// https://bidblock.ca/ral
affiliateLinks_app_router.get('/', (req,res)=>{
  return res.status(200).send('HOME ral');
})


// https://bidblock.ca/ral/one
affiliateLinks_app_router.get('/one', (req,res)=>{
  return res.redirect('https://b0a443z2g-s6kv0l5qlb06pff6.hop.clickbank.net');
})

// https://bidblock.ca/ral/two
affiliateLinks_app_router.get('/two', (req,res)=>{
  return res.redirect('https://44b61e35k2x3ry1onmodm0qntz.hop.clickbank.net');
})

// https://bidblock.ca/ral/three
affiliateLinks_app_router.get('/three', (req,res)=>{
  return res.redirect('https://ecd8a0x2t1ucoz1o0ackl3qp1a.hop.clickbank.net');
})



// https://bidblock.ca/ral/four
affiliateLinks_app_router.get('/four', (req,res)=>{
  return res.redirect('https://0ffac9yclat0r206j8yels0zew.hop.clickbank.net');
})




module.exports = affiliateLinks_app_router

