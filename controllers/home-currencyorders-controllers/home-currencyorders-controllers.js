// When required for the first time runs the entire script, then subsequent times only retrieces the Model
const BuyCryptoOrder = require('../../models/home-currencyorders-models/BuyCryptoOrder')
const SellCryptoOrder = require('../../models/home-currencyorders-models/SellCryptoOrder')
const BuyLocationCryptoOrder = require('../../models/home-currencyorders-models/BuyLocationCryptoOrder')
const SellLocationCryptoOrder = require('../../models/home-currencyorders-models/SellLocationCryptoOrder')
const httpStatus = require("http-status-codes")
const { MongoError } = require('../../custom-errors/custom-errors')

module.exports = {
  updateOrderController: async (req, res, next) => {

    console.log("new DATA:", req.body)
    console.log("path UID:", req.params.userID)

    console.log('Current User: ' + req.session.userId + ' and Order asked to update: ' + req.body.OrderID + ' order to update type: ' + req.body.OrderType)


    let TypeCryptoOrder = undefined
    // switch ("wrong") {
    switch (req.body.OrderType) {
      case "buyordersdata":
        TypeCryptoOrder = BuyCryptoOrder
        break;
      case "sellordersdata":
        TypeCryptoOrder = SellCryptoOrder
        break;
      default:
        let error = new MongoError(`Target TypeCryptoOrder: "${TypeCryptoOrder}" not reconized in switch statement`)
        return next(error)
    }


    // If upsert is true then if the row trying to be updated does not exist then a new row is inserted instead , if false then it does not do anything .

    // If new is true then the modified document is returned after the update rather than the original , if false then the original document is returned

    let patchRet

    try {
      // throw new Error()
      patchRet = await TypeCryptoOrder.findByIdAndUpdate(req.body.OrderID, { $set: req.body }, { upsert: false, new: true });
    } catch (error) {
      error = new MongoError("Could not find by ID and update")
      return next(error)
    }


    console.log(patchRet)


    res.status(200).json({
      srv_: "Successfully updated"
    })

  },


  deleteOrderController: (req, res, next) => {
    // console.log("req body on /delete-this-order: ", req.body) 
    var id = req.body.OrderID

    if (req.body.OrderType === 'buyordersdata') {
      //console.log('Order type is a buy type')
      BuyCryptoOrder.findByIdAndDelete(id, (error, buyorder) => {
        if (error) { return next(error) }
      })
      res.json({
        memorized_order_type: req.body.OrderType
      })
    } else if (req.body.OrderType === 'sellordersdata') {
      //console.log('Order type is a sell type')
      SellCryptoOrder.findByIdAndDelete(id, (error, sellorder) => {
        if (error) { return next(error) }
      })
      res.json({
        memorized_order_type: req.body.OrderType
      })
    }
  },



  registerOrder: async (req, res, next) => {

    console.log("body: \n", req.body)

    console.log("register order: req.params.type_order: \n", req.params.type_order)

    console.log("\n\nexpiration:\n", req.body.expirydate)

    req.body.expireAt = new Date(req.body.expirydate.slice(0, 4), req.body.expirydate.slice(5, 7) - 1, req.body.expirydate.slice(8, 10), req.body.expirytime.slice(0, 2), req.body.expirytime.slice(3, 5))

    //console.log(new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5)))

    // console.log(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))

    //console.log('typeof: ', typeof req.body.expireAt + '\n','req.body.expireAt: '+ req.body.expireAt+ '\n','Current Date: '+ new Date()+ '\n')

    //console.log(new Date('July 22, 2013 14:00:00'))


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




    console.log(TypeCryptoOrder, TypeLocationCryptoOrder)

    let type_order_instance, type_location_order_instance

    type_location_order_instance = new TypeLocationCryptoOrder({
      location: {
        province_state: req.body.province_state,
        country: req.body.country
      },
      expireAt: req.body.expireAt,
    })

    // TODO !! when expireAt changes in orders update, do add the update also for it's respective location, when profile deletion, delete currency order locations


    type_order_instance = new TypeCryptoOrder({
      crypto: "Bitcoin",
      chain: req.body.chain,
      [req.body.amount ? "amount" : null]: req.body.amount,
      [req.body.minamount ? "maxamount" : null]: req.body.maxamount,
      [req.body.minamount ? "minamount" : null]: req.body.minamount,
      rate: req.body.rate,
      expirydate: req.body.expirydate,
      expirytime: req.body.expirytime,
      payment: req.body.payment,
      userid: req.session.userId,
      expireAt: req.body.expireAt,
      currencyorderlocationID: type_location_order_instance._id
    })



    // let createOrderRet
    // try {
    //   createOrderRet = await TypeCryptoOrder.create({
    //     crypto: "Bitcoin",
    //     chain: req.body.chain,
    //     [req.body.amount ? "amount" : null]: req.body.amount,
    //     [req.body.minamount ? "maxamount" : null]: req.body.maxamount,
    //     [req.body.minamount ? "minamount" : null]: req.body.minamount,
    //     rate: req.body.rate,
    //     expirydate: req.body.expirydate,
    //     expirytime: req.body.expirytime,
    //     payment: req.body.payment,
    //     userid: req.session.userId,
    //     expireAt: req.body.expireAt
    //   })
    // } catch (error) {
    //   return next(error)
    // }


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

    // console.log("\n\n\nSaved subscriber information\n\n", ret_subinfo_save)






    res.status(httpStatus.StatusCodes.OK).json({
      saved: "success"
    })




    // if(req.body.expireAt > new Date()){
    // } else {
    //   res.status(httpStatus.StatusCodes.BAD_REQUEST).json({
    //     saved: "No"
    //   })
    // }

  }
}