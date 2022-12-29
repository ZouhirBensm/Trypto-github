const BuyCryptoOrder = require('../../models/home-currencyorders-models/BuyCryptoOrder')
const SellCryptoOrder = require('../../models/home-currencyorders-models/SellCryptoOrder')
const BuyLocationCryptoOrder = require('../../models/home-currencyorders-models/BuyLocationCryptoOrder')
const SellLocationCryptoOrder = require('../../models/home-currencyorders-models/SellLocationCryptoOrder')
const httpStatus = require("http-status-codes")
const { MongoError } = require('../../custom-errors/custom-errors')






async function updateOrderController(req, res, next) {
  console.log("\n\ncurrencyOrdersController: \nupdateOrderController()-> req.body", req.body)

  console.log("\n\ncurrencyOrdersController: \nupdateOrderController()-> req.params.userID", req.params.userID)


  console.log("\n\ncurrencyOrdersController: \nupdateOrderController()-> req.session.userId, req.body.OrderID, req.body.OrderType", req.session.userId, req.body.OrderID, req.body.OrderType)

  req.body.expireAt = new Date(req.body.expirydate.slice(0, 4), req.body.expirydate.slice(5, 7) - 1, req.body.expirydate.slice(8, 10), req.body.expirytime.slice(0, 2), req.body.expirytime.slice(3, 5))


  let TypeCryptoOrder = undefined
  let TypeLocationCryptoOrder = undefined

  switch (req.body.OrderType) {
    case "buyordersdata":
      TypeCryptoOrder = BuyCryptoOrder
      TypeLocationCryptoOrder = BuyLocationCryptoOrder
      break;
    case "sellordersdata":
      TypeCryptoOrder = SellCryptoOrder
      TypeLocationCryptoOrder = SellLocationCryptoOrder
      break;
    default:
      let error = new MongoError(`Target "${TypeCryptoOrder}, and ${TypeLocationCryptoOrder}" not reconized`)
      return next(error)
  }





  let updatedOrder_ifAny

  try {
    updatedOrder_ifAny = await TypeCryptoOrder.findByIdAndUpdate(req.body.OrderID, { $set: req.body }, { upsert: false, new: true });
    // If upsert is true then if the row trying to be updated does not exist then a new row is inserted instead , if false then it does not do anything .

    // If new is true then the modified document is returned after the update rather than the original , if false then the original document is returned
  } catch (error) {
    error = new MongoError("Could not find by ID and update")
    return next(error)
  }


  // console.log("\n\ncurrencyOrdersController: \nupdateOrderController()-> updatedOrder_ifAny", updatedOrder_ifAny)
  console.log("\n\n->", updatedOrder_ifAny.currencyorderlocationID)
  console.log("\n\n->", req.body.expireAt)

  let updatedOrderLocation_ifAny

  try {
    // TODO optimization, check whether the expiry changed, then go a findByIdAndUpdate else don't. This feature might be built in the findByIdAndUpdate itself
    updatedOrderLocation_ifAny = await TypeLocationCryptoOrder.findByIdAndUpdate(updatedOrder_ifAny.currencyorderlocationID, { $set: { expireAt: req.body.expireAt } }, { upsert: false, new: true });
  } catch (e) {
    let error = new MongoError(e.message)
    return next(error)
  }


  const success_msg = "Successfully updated"
  res.status(200).json({
    srv_: success_msg
  })
  
}















async function deleteOrderController(req, res, next) {
  // console.log("currencyOrdersController: deleteOrderController()-> req.body ", req.body) 

  var id = req.body.OrderID

  let TypeCryptoOrder = undefined
  let TypeLocationCryptoOrder = undefined

  switch (req.body.OrderType) {
    case "buyordersdata":
      TypeCryptoOrder = BuyCryptoOrder
      TypeLocationCryptoOrder = BuyLocationCryptoOrder
      break;
    case "sellordersdata":
      TypeCryptoOrder = SellCryptoOrder
      TypeLocationCryptoOrder = SellLocationCryptoOrder
      break;
    default:
      console.log(`Target "${TypeCryptoOrder}, and ${TypeLocationCryptoOrder}" not reconized`)
      break;
  }

  let del_ret
  let loc_del_ret

  try {
    del_ret = await TypeCryptoOrder.findOneAndDelete({ _id: id })
  } catch (error) {
    return next(error)
  }
  console.log("\n\ncurrencyOrdersController: deleteOrderController()-> del_ret ", del_ret.currencyorderlocationID)

  try {
    loc_del_ret = await TypeLocationCryptoOrder.findByIdAndDelete(del_ret.currencyorderlocationID)
  } catch (error) {
    return next(error)
  }


  res.status(200).json({
    memorized_order_type: req.body.OrderType
  })
}


async function registerOrder(req, res, next) {
  console.log("body: \n", req.body)

  console.log("register order: req.params.type_order: \n", req.params.type_order)

  console.log("\n\nexpiration:\n", req.body.expirydate)

  req.body.expireAt = new Date(req.body.expirydate.slice(0, 4), req.body.expirydate.slice(5, 7) - 1, req.body.expirydate.slice(8, 10), req.body.expirytime.slice(0, 2), req.body.expirytime.slice(3, 5))

  let TypeCryptoOrder = undefined
  let TypeLocationCryptoOrder = undefined

  switch (req.params.type_order) {
    case "buyorders":
      TypeCryptoOrder = BuyCryptoOrder
      TypeLocationCryptoOrder = BuyLocationCryptoOrder
      break;
    case "sellorders":
      TypeCryptoOrder = SellCryptoOrder
      TypeLocationCryptoOrder = SellLocationCryptoOrder
      break;
    default:
      console.log(`Target "${TypeCryptoOrder}, and ${TypeLocationCryptoOrder}" not reconized`)
      break;
  }

  // console.log(TypeCryptoOrder, TypeLocationCryptoOrder)

  let type_order_instance, type_location_order_instance

  type_location_order_instance = new TypeLocationCryptoOrder({
    location: {
      province_state: req.body.province_state,
      country: req.body.country
    },
    expireAt: req.body.expireAt,
  })


  type_order_instance = new TypeCryptoOrder({
    crypto: "Bitcoin",
    chain: req.body.chain,
    [req.body.amount ? "amount" : null]: req.body.amount,
    [req.body.minamount ? "maxamount" : null]: req.body.maxamount,
    [req.body.minamount ? "minamount" : null]: req.body.minamount,
    rate: req.body.rate,
    expirydate: req.body.expirydate,
    expirytime: req.body.expirytime,
    userid: req.session.userId,
    expireAt: req.body.expireAt,
    currencyorderlocationID: type_location_order_instance._id
  })


  let ret_type_location_order_save
  try {
    ret_type_location_order_save = await type_location_order_instance.save()
  } catch (err) {
    return next(err)
  }


  let ret_type_order_save
  try {
    ret_type_order_save = await type_order_instance.save()
  } catch (err) {
    return next(err)
  }


  return res.status(httpStatus.StatusCodes.OK).json({
    saved: "success"
  })

}


currencyOrdersController = {
  updateOrderController: updateOrderController,
  deleteOrderController: deleteOrderController,
  registerOrder: registerOrder,
}



module.exports = currencyOrdersController