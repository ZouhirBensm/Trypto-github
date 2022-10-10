// When required for the first time runs the entire script, then subsequent times only retrieces the Model
const BuyCryptoOrder = require('../../models/home-currencyorders-models/BuyCryptoOrder')
const SellCryptoOrder = require('../../models/home-currencyorders-models/SellCryptoOrder')
const httpStatus = require("http-status-codes")

module.exports = {
  updateOrderController: async (req, res, next) => {

    console.log("new DATA:", req.body)

    console.log('Current User: ' + req.session.userId + ' and Order asked to update: ' + req.body.OrderID + ' order to update type: ' + req.body.OrderType)


    let TypeCryptoOrder = undefined
    switch (req.body.OrderType) {
      case "buyordersdata":
        TypeCryptoOrder = BuyCryptoOrder
        break;
      case "sellordersdata":
        TypeCryptoOrder = SellCryptoOrder
        break;
      default:
        console.log(`Target "${TypeCryptoOrder}" not reconized`)
        break;
    }


    // If upsert is true then if the row trying to be updated does not exist then a new row is inserted instead , if false then it does not do anything .

    // If new is true then the modified document is returned after the update rather than the original , if false then the original document is returned

    let patchRet

    try {
      patchRet = await TypeCryptoOrder.findByIdAndUpdate(req.body.OrderID, { $set: req.body }, { upsert: true, new: false });
    } catch (error) {
      // TODO make sure error integrates with front end UI
      return next(error)
    }


    console.log(patchRet)


    res.json({
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
    switch (req.params.type_order) {
      case "buyorders":
        TypeCryptoOrder = BuyCryptoOrder
        break;
      case "sellorders":
        TypeCryptoOrder = SellCryptoOrder
        break;
      default:
        console.log(`Target "${TypeCryptoOrder}" not reconized`)
        break;
    }


    console.log(TypeCryptoOrder)

    let createOrderRet
    try {
      createOrderRet = await TypeCryptoOrder.create({
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
        expireAt: req.body.expireAt
      })
    } catch (error) {
      return next(error)
    }


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