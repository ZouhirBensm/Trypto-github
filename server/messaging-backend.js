const express = require('express')
const router = express.Router()

// Route is called upon as request from browser as '/messaging/'
router.get('/',(req,res)=>{
  res.render('messaging')
})

module.exports = router
