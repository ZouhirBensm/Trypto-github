// When required for the first time runs the entire script, then subsequent times only retrieces the Model


const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder')
const SellMarketOrderLocation = require('../../models/market-orders-models/SellMarketOrderLocation')


const { MongoError } = require('../../custom-errors/custom-errors')
const { ValidationError } = require('../../custom-errors/custom-errors')

const httpStatus = require("http-status-codes")


var ObjectId = require('mongodb').ObjectId;


async function updateOrderController(req, res, next) {

  console.log("chakalaka----->>>>", req.body.pkobmOr_4ft2sd)

  req.body.pkobmOr_4ft2sd.expireAt = new Date(req.body.pkobmOr_4ft2sd.expirydate.slice(0, 4), req.body.pkobmOr_4ft2sd.expirydate.slice(5, 7) - 1, req.body.pkobmOr_4ft2sd.expirydate.slice(8, 10), req.body.pkobmOr_4ft2sd.expirytime.slice(0, 2), req.body.pkobmOr_4ft2sd.expirytime.slice(3, 5))


  let updatedMarketOrder_ifAny

  try {
    updatedMarketOrder_ifAny = await SellMarketOrder.findByIdAndUpdate(req.body.pkobmOr_4ft2sd._id, { $set: req.body.pkobmOr_4ft2sd }, { upsert: false, new: true });
  } catch (e) {
    let error = new MongoError(e.message)
    return next(error)
  }


  console.log("\n\nDo I have the ingredients: ", updatedMarketOrder_ifAny.sellmarketorderlocationID, req.body.pkobmOr_4ft2sd.expireAt, "\n\n")

  let updatedMarketOrderLocation_ifAny

  try {
    // TODO optimization, check whether the expiry changed, then go a findByIdAndUpdate else don't. This feature might be built in the findByIdAndUpdate itself
    updatedMarketOrderLocation_ifAny = await SellMarketOrderLocation.findByIdAndUpdate(updatedMarketOrder_ifAny.sellmarketorderlocationID, { $set: { expireAt: req.body.pkobmOr_4ft2sd.expireAt } }, { upsert: false, new: true });
  } catch (e) {
    let error = new MongoError(e.message)
    return next(error)
  }


  if (updatedMarketOrder_ifAny && updatedMarketOrderLocation_ifAny) {
    res.status(200).json({
      srv_: "Successfully updated"
    })
  }

  // res.status(200).end
}


async function deleteOrderController(req, res, next) {
  let getSellMarketOrderLocationID_todelete
  try {
    getSellMarketOrderLocationID_todelete = await SellMarketOrder.findById(req.body.market_orderID)
      .select('sellmarketorderlocationID -_id')
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: getSellMarketOrderLocationID_todelete`)
    return next(error)
  }



  let market_Order_deletetionReturn
  try {
    market_Order_deletetionReturn = await SellMarketOrder.findByIdAndDelete(req.body.market_orderID)
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: market_Order_deletetionReturn`)
    return next(error)
  }

  let location_market_Order_deletetionReturn
  try {
    location_market_Order_deletetionReturn = await SellMarketOrderLocation.findByIdAndDelete(getSellMarketOrderLocationID_todelete?.sellmarketorderlocationID)
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: location_market_Order_deletetionReturn`)
    return next(error)
  }

  res.status(200).json({
    srv_: "Successfully deleted"
  })
}



async function getOrderController(req, res, next) {
  let order

  try {
    order = await SellMarketOrder.findById({ _id: ObjectId(req.params.orderID) })
      .populate({
        // Populate protagonists
        path: "userid",
        // Fields allowed to populate with
        select: "_id username email",
      })
      .populate({
        // Populate protagonists
        path: "sellmarketorderlocationID",
        // Fields allowed to populate with
        select: "location.st location.neigh location.province_state location.city location.country -_id",
      })

  } catch (e) {
    let error = new MongoError(`No order found by that ID: ${e.message}`)
    return next(error)
  }



  console.log("---------->>>>", order)

  console.log("Found!!!!")


  res.status(200).json(order)
}









marketplaceController = {
  updateOrderController: updateOrderController,
  deleteOrderController: deleteOrderController,
  getOrderController: getOrderController,
}


module.exports = marketplaceController










// async function registerMarketOrder(req, res, next) {

//   let body_marketOR_basic_data = req.body.marketOrderBasicData
//   let body_marketOR_location_data = req.body.marketOrderTradeLocationSpecifics


//   console.log("\n\expirydate:\n", body_marketOR_basic_data.expirydate)

//   body_marketOR_basic_data.expireAt = new Date(body_marketOR_basic_data.expirydate.slice(0, 4), body_marketOR_basic_data.expirydate.slice(5, 7) - 1, body_marketOR_basic_data.expirydate.slice(8, 10), body_marketOR_basic_data.expirytime.slice(0, 2), body_marketOR_basic_data.expirytime.slice(3, 5))

//   console.log("\n\expireAt:\n", body_marketOR_basic_data.expireAt)


//   let create_res_sellmarketorderlocation


//   try {
//     create_res_sellmarketorderlocation = await SellMarketOrderLocation.create({
//       geometry: {
//         lat: body_marketOR_location_data.geometry.lat,
//         lng: body_marketOR_location_data.geometry.lng,
//       },
//       location: {
//         address: body_marketOR_location_data.location.address,
//         st_number: body_marketOR_location_data.location.st_number,
//         st: body_marketOR_location_data.location.st,
//         neigh: body_marketOR_location_data.location.neigh,
//         province_state: body_marketOR_location_data.location.province_state,
//         city: body_marketOR_location_data.location.city,
//         country: body_marketOR_location_data.location.country
//       },
//       expireAt: body_marketOR_basic_data.expireAt,
//     })

//   } catch (e) {
//     e = new MongoError(`Unable to create the SellMarketOrderLocation entry ${e.message}`)
//     return next(e)
//   }

//   console.log("create_res_sellmarketorderlocation", create_res_sellmarketorderlocation._id)


//   let create_res_sellmarketorder

//   // TODO add backend validation for this create, in case of api calls trying to create orders with erroneous data
//   try {
//     create_res_sellmarketorder = await SellMarketOrder.create({
//       title: body_marketOR_basic_data.title,
//       description: body_marketOR_basic_data.description,
//       category: body_marketOR_basic_data.category,
//       price: body_marketOR_basic_data.price,
//       crypto: body_marketOR_basic_data.crypto,
//       conversion: body_marketOR_basic_data.conversion,
//       payment: body_marketOR_basic_data.payment,
//       chain: body_marketOR_basic_data.chain,
//       expireAt: body_marketOR_basic_data.expireAt,
//       expirydate: body_marketOR_basic_data.expirydate,
//       expirytime: body_marketOR_basic_data.expirytime,
//       userid: req.session.userId,
//       sellmarketorderlocationID: create_res_sellmarketorderlocation._id
//     })
//   } catch (e) {
//     e = new MongoError(`Unable to create the SellMarketOrder entry ${e.message}`)
//     return next(e)
//   }

//   res.status(200).end()
// }




