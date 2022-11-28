const BuyCryptoOrder = require('../../models/home-currencyorders-models/BuyCryptoOrder');
const BuyLocationCryptoOrder = require('../../models/home-currencyorders-models/BuyLocationCryptoOrder')


module.exports = async (req,res,next)=>{
  let array_of_buycurrencyorderlocations_ids_where_user_is_engaged
  try {
    array_of_buycurrencyorderlocations_ids_where_user_is_engaged = await BuyCryptoOrder.find({userid: req.params.userId}).select("currencyorderlocationID -_id")
  } catch(e){
    res.locals.notifications.push(e);
  }

  console.log("array_of_buycurrencyorderlocations_ids_where_user_is_engaged", array_of_buycurrencyorderlocations_ids_where_user_is_engaged)


  // TODO #95 Instead of deleting the locations one-by-one. Feed the SellMarketOrderLocation.deleteMany the array of IDs references and delete all at once i.e. the method itself loops
  for (const obj_id of array_of_buycurrencyorderlocations_ids_where_user_is_engaged) {

    // console.log(obj_id)

    let locationDeletedRet
    try {
      locationDeletedRet = await BuyLocationCryptoOrder.deleteOne({_id: obj_id.currencyorderlocationID})
    } catch (e) {
      res.locals.notifications.push(e)
      break
    }

  }



  let buyOrdersDeletionRet

  try {
    buyOrdersDeletionRet = await BuyCryptoOrder.deleteMany({userid: req.params.userId})
  } catch (e) {
    res.locals.notifications.push(e);
  }

  
  return next()

}