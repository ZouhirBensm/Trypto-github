const SellCryptoOrder = require('../../models/home-orders-models/SellCryptoOrder');


module.exports = async (req,res,next)=>{
  await SellCryptoOrder.deleteMany({userid: req.session.userId}, (error, response)=>{
    if(error){return next(error)}
    console.log("sells deleted response", response)
  })
  
  next()
}