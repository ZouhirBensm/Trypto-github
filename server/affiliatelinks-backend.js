// Router towards /ral
const express = require('express')
const affiliateLinks_app_router = express.Router()



// https://bidblock.ca/ral/one
affiliateLinks_app_router.get('/one', (req,res)=>{
  return res.redirect('https://b0a443z2g-s6kv0l5qlb06pff6.hop.clickbank.net');
})

// fe: Front-end
// https://bidblock.ca/ral/one-fe
affiliateLinks_app_router.get('/one-fe', (req,res)=>{
  return res.render('redirect-one');
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


// https://bidblock.ca/ral/four-fe
affiliateLinks_app_router.get('/four-fe', (req,res)=>{
  return res.render('redirect-four');
})

// https://bidblock.ca/ral/five
affiliateLinks_app_router.get('/five', (req,res)=>{
  return res.redirect('https://www.kqzyfj.com/click-100957645-12332060');
})


// https://bidblock.ca/ral/six-fe
affiliateLinks_app_router.get('/six-fe', (req,res)=>{
  return res.render('redirect-six');
})




module.exports = affiliateLinks_app_router

