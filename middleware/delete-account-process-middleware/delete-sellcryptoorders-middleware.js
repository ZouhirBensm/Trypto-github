const SellCryptoOrder = require('../../models/home-orders-models/SellCryptoOrder');


module.exports = async (req,res,next)=>{

  let sellOrdersDeletionRet
  try {
    sellOrdersDeletionRet = await SellCryptoOrder.deleteMany({userid: req.params.userId})
  } catch (e) {
    res.locals.notifications.push(e);
  }
  
  next()
}