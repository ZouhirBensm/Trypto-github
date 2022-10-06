const BuyCryptoOrder = require('../../models/home-orders-models/BuyCryptoOrder');


module.exports = async (req,res,next)=>{

  let buyOrdersDeletionRet
  try {
    buyOrdersDeletionRet = await BuyCryptoOrder.deleteMany({userid: req.params.userId})
  } catch (e) {
    res.locals.notifications.push(e);
  }
  
  next()




}