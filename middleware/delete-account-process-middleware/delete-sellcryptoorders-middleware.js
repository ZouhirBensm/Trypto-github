const SellCryptoOrder = require('../../models/home-orders-models/SellCryptoOrder');


module.exports = async (req,res,next)=>{
  await SellCryptoOrder.deleteMany({userid: req.params.userId}, (error, response)=>{
    if(error){res.locals.notifications.push(error)}
    console.log("sells deleted response", response)
  })
  
  next()
}