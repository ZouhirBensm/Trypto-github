const BuyCryptoOrder = require('../../models/home-orders-models/BuyCryptoOrder');


module.exports = async (req,res,next)=>{
  // TODO put in own middleware
  res.locals.notifications = []

  await BuyCryptoOrder.deleteMany({userid: req.params.userId}, (error, response)=>{
    if(error){ res.locals.notifications.push(error);}
    console.log("buys deleted response", response)
  })
  
  next()
}