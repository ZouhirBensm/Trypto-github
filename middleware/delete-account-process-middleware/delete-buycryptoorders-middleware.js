const BuyCryptoOrder = require('../../models/home-orders-models/BuyCryptoOrder');


module.exports = async (req,res,next)=>{

  res.locals.notifications = []
  console.log("\n\n\n\n____Process to delete user and all of his orders___")
  console.log(req.params.userId, " vs ", req.session.userId)
  console.log("Session:", req.session)

  await BuyCryptoOrder.deleteMany({userid: req.session.userId}, (error, response)=>{
    if(error){return next(error)}
    console.log("buys deleted response", response)
  })
  
  next()
}