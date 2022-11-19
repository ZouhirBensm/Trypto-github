// When required for the first time runs the entire script, then subsequent times only retrieces the Model

const fs = require('fs')

const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder')
const SellMarketOrderLocation = require('../../models/market-orders-models/SellMarketOrderLocation')
const SellMarketOrderImage = require('../../models/market-orders-models/SellMarketOrderImage')


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




function registerMarketOrderController(req, res) {

  let success_message = "Done, success."
  res.status(200).json({
    server: {
      message: success_message
    }
  })
  
}









async function deleteMarketOrderImages(req, res, next) {
  
  const directory = `public/img/marketorder-images/${req.body.market_orderID}`

  try {
    fs.rmSync(directory, { recursive: true, force: true });
  } catch (e) {
    let error = new Error(`Was unable to delete the images associated with market order ID: ${req.body.market_orderID}`)
    return next(error)
  }

  return next()
  
}


async function deleteOrderController(req, res, next) {

  let market_Order_deletetionReturn
  try {
    market_Order_deletetionReturn = await SellMarketOrder.findByIdAndDelete(req.body.market_orderID)
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: market_Order_deletetionReturn`)
    return next(error)
  }

  let location_market_Order_deletetionReturn
  try {
    location_market_Order_deletetionReturn = await SellMarketOrderLocation.findOneAndDelete({sellmarketorderID: req.body.market_orderID})
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: location_market_Order_deletetionReturn`)
    return next(error)
  }


  
  let sellmarketorderimage_deletetionReturn
  try {
    sellmarketorderimage_deletetionReturn = await SellMarketOrderImage.findOneAndDelete({sellmarketorderID: req.body.market_orderID})
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: sellmarketorderimage_deletetionReturn`)
    return next(error)
  }


  res.status(200).json({
    srv_: "Successfully deleted"
  })
}




marketplaceController = {
  updateOrderController: updateOrderController,
  deleteOrderController: deleteOrderController,
  getOrderController: getOrderController,
  registerMarketOrderController: registerMarketOrderController,
  deleteMarketOrderImages: deleteMarketOrderImages
}


module.exports = marketplaceController