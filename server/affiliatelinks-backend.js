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


// https://bidblock.ca/ral/seven-fe
affiliateLinks_app_router.get('/seven-fe', (req,res)=>{
  return res.render('redirect-seven');
})


// https://bidblock.ca/ral/eight-fe
affiliateLinks_app_router.get('/eight-fe', (req,res)=>{
  return res.render('redirect-eight');
})


// https://bidblock.ca/ral/nine
affiliateLinks_app_router.get('/nine', (req,res)=>{
  return res.redirect('https://shareasale.com/r.cfm?b=2162525&u=3912076&m=106166&urllink=&afftrack=');
})

// https://bidblock.ca/ral/nine-fe
affiliateLinks_app_router.get('/nine-fe', (req,res)=>{
  return res.render('redirect-nine');
})


// https://bidblock.ca/ral/ten
affiliateLinks_app_router.get('/ten', (req,res)=>{
  return res.redirect('https://shareasale.com/r.cfm?b=2037251&u=3912076&m=106166&urllink=&afftrack=');
})


// https://bidblock.ca/ral/ten-fe
affiliateLinks_app_router.get('/ten-fe', (req,res)=>{
  return res.render('redirect-ten');
})




// https://bidblock.ca/ral/eleven
affiliateLinks_app_router.get('/eleven', (req,res)=>{
  return res.redirect('https://shareasale.com/r.cfm?b=2041034&u=3912076&m=106166&urllink=&afftrack=');
})

// https://bidblock.ca/ral/eleven-fe
affiliateLinks_app_router.get('/eleven-fe', (req,res)=>{
  return res.render('redirect-eleven');
})





// https://bidblock.ca/ral/twelve
affiliateLinks_app_router.get('/twelve', (req,res)=>{
  return res.redirect('https://www.weareplufl.com?snowball=ZOUHIR68705');
})



// https://bidblock.ca/ral/twelve-fe
affiliateLinks_app_router.get('/twelve-fe', (req,res)=>{
  return res.render('redirect-twelve');
})


// https://bidblock.ca/ral/thirteen
affiliateLinks_app_router.get('/thirteen', (req,res)=>{
  return res.redirect('https://www.tabs.co/discount/LOVE276962');
})



// https://bidblock.ca/ral/thirteen-fe
affiliateLinks_app_router.get('/thirteen-fe', (req,res)=>{
  return res.render('redirect-thirteen');
})


// https://bidblock.ca/ral/fourteen
affiliateLinks_app_router.get('/fourteen', (req,res)=>{
  return res.redirect('https://snwbl.io/fore-fathers/ZOUHIR76371');
})



// https://bidblock.ca/ral/fourteen-fe
affiliateLinks_app_router.get('/fourteen-fe', (req,res)=>{
  return res.render('redirect-fourteen');
})


// https://bidblock.ca/ral/fifteen
affiliateLinks_app_router.get('/fifteen', (req,res)=>{
  return res.redirect('https://snwbl.io/frost-buddy/ZOUHIR89146');
})



// https://bidblock.ca/ral/fifteen-fe
affiliateLinks_app_router.get('/fifteen-fe', (req,res)=>{
  return res.render('redirect-fifteen');
})


// https://bidblock.ca/ral/sixteen
affiliateLinks_app_router.get('/sixteen', (req,res)=>{
  return res.redirect('https://www.crossnetgame.com/discount/ZOUHIR66216');
})



// https://bidblock.ca/ral/sixteen-fe
affiliateLinks_app_router.get('/sixteen-fe', (req,res)=>{
  return res.render('redirect-fifteen');
})







//




// https://bidblock.ca/ral/seventeen
affiliateLinks_app_router.get('/seventeen', (req,res)=>{
  return res.redirect('https://lvnta.com/lv_P9ZwSEWjA06JLHb56m?');
})



// https://bidblock.ca/ral/seventeen-fe
affiliateLinks_app_router.get('/seventeen-fe', (req,res)=>{
  return res.render('redirect-seventeen');
})



// https://bidblock.ca/ral/eighteen
affiliateLinks_app_router.get('/eighteen', (req,res)=>{
  return res.redirect('https://lvnta.com/lv_px6znD1hR3V2UrhjVg?url=https%3A%2F%2Famazon.com%2Fdp%2FB083G7F8PG');
})



// https://bidblock.ca/ral/eighteen-fe
affiliateLinks_app_router.get('/eighteen-fe', (req,res)=>{
  return res.render('redirect-eighteen');
})







module.exports = affiliateLinks_app_router

