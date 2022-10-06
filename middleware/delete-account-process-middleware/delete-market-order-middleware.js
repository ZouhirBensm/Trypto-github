const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder');

const SellMarketOrderLocation = require('../../models/market-orders-models/SellMarketOrderLocation');

module.exports = async (req,res,next)=>{


  let array_of_sellmarketorderlocations_ids_where_user_is_engaged
  try {
    array_of_sellmarketorderlocations_ids_where_user_is_engaged = await SellMarketOrder.find({userid: req.params.userId}).select("sellmarketorderlocationID -_id")
  } catch(e){
    res.locals.notifications.push(e);
  }

  console.log("array_of_sellmarketorderlocations_ids_where_user_is_engaged", array_of_sellmarketorderlocations_ids_where_user_is_engaged)





  res.locals.array_of_sellmarketorderlocations_ids_where_user_is_engaged = array_of_sellmarketorderlocations_ids_where_user_is_engaged





  // TODO #95 Instead of deleting the locations one-by-one. Feed the SellMarketOrderLocation.deleteMany the array of IDs references and delete all at once i.e. the method itself loops
  for (const obj_id of res.locals.array_of_sellmarketorderlocations_ids_where_user_is_engaged) {

    console.log(obj_id)

    let locationDeletedRet
    try {
      locationDeletedRet = await SellMarketOrderLocation.deleteOne({_id: obj_id.sellmarketorderlocationID})
    } catch (e) {
      res.locals.notifications.push(e)
      break
    }

  }
  


  let marketOrderDeletionRet


  try {
    marketOrderDeletionRet = await SellMarketOrder.deleteMany({userid: req.params.userId})
  } catch (e) {
    res.locals.notifications.push(e);
  }


  
  next()
}