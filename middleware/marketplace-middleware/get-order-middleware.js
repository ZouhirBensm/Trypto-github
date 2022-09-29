const BuyMarketOrder = require('../../models/market-orders-models/BuyMarketOrder')
const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder')


module.exports = async (req,res,next) => {

  let TypeMarketOrder = undefined
    switch (req.params.type_order) {
      case "buyordersdata":
        TypeMarketOrder = BuyMarketOrder
        break;
      case "sellordersdata":
        TypeMarketOrder = SellMarketOrder
        break;
      default:
        console.log(`Target "${TypeMarketOrder}" not reconized`)
        break;
    }
  
    let order

    try {
      order = await TypeMarketOrder.findById({_id: req.params.orderID})
      .populate({
        // Populate protagonists
        path: "userid",
        // Fields allowed to populate with
        select: "_id email",
      })
    } catch (e) {
      return next(e)
    }


    console.log("---------->>>>", order)


    if (order) {
      console.log("Found!!!!")
      res.status(200).json(order)
    } else {
      console.log("Not Found!!!!")
    }

  next()
}