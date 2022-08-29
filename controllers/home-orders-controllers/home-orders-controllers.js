// When required for the first time runs the entire script, then subsequent times only retrieces the Model
const BuyCryptoOrder = require('../../models/home-orders-models/BuyCryptoOrder')
const SellCryptoOrder = require('../../models/home-orders-models/SellCryptoOrder')
const httpStatus = require("http-status-codes")

module.exports = {
  updateOrderController: async (req,res, next)=>{

    console.log("new DATA:", req.body)
    
    console.log('Current User: ' + req.session.userId + ' and Order asked to update: ' + req.body.OrderID + ' order to update type: ' + req.body.OrderType)
    
    if(req.body.OrderType === 'buyordersdata'){
    //   old_buycryptoOrder = await BuyCryptoOrder.findById(req.body.OrderID) #@
    //   console.log("\n\n\n\n___________________________old crypto order:", old_buycryptoOrder)
    //   BuyCryptoOrder.findByIdAndUpdate(req.body.OrderID, {
    //     // crypto: req.body.NewCrypto,
    //     [old_buycryptoOrder.crypto != req.body.NewCrypto ? "crypto": null]: req.body.NewCrypto,
    //     // amount: req.body.NewAmount,
    //     [old_buycryptoOrder.amount != req.body.NewAmount ? "amount": null]: req.body.NewAmount,
    //     // price: req.body.NewPrice,
    //     [old_buycryptoOrder.price != req.body.NewPrice ? "price": null]: req.body.NewPrice,
    //     // expirydate: req.body.NewExpiryDate,
    //     [old_buycryptoOrder.expirydate != req.body.NewExpiryDate ? "expirydate": null]: req.body.NewExpiryDate,
    //     // expirytime: req.body.NewExpiryTime,
    //     [old_buycryptoOrder.expirytime != req.body.NewExpiryTime ? "expirytime": null]: req.body.NewExpiryTime,
    //     // payment: req.body.NewPayment,
    //     [old_buycryptoOrder.payment != req.body.NewPayment ? "payment": null]: req.body.NewPayment,
    //     }, (error, old_order) => {
    //     if(error){return next(error)}
    //     console.log("Update Callback: ", old_order) 
    //   })

    // If upsert is true then if the row trying to be updated does not exist then a new row is inserted instead , if false then it does not do anything .

    // If new is true then the modified document is returned after the update rather than the original , if false then the original document is returned
    BuyCryptoOrder.findByIdAndUpdate(req.body.OrderID, { $set: req.body }, { upsert: true, new: true }, (error, order) => {
      if(error){return next(error)}
      console.log("Update Callback: ", order) 
    });


    } else if (req.body.OrderType === 'sellordersdata'){
      SellCryptoOrder.findByIdAndUpdate(req.body.OrderID, { $set: req.body }, { upsert: true, new: true }, (error, order) => {
        if(error){return next(error)}
        console.log("Update Callback: ", order) 
      });
    }
  
    res.json({
      srv_: "successfully updated"
    })
    // res.redirect('/databases/AllMyOrders') 
  
  },
  deleteOrderController: (req,res,next)=>{
    // console.log("req body on /delete-this-order: ", req.body) 
    var id = req.body.OrderID
  
    if (req.body.OrderType === 'buyordersdata') {
      //console.log('Order type is a buy type')
      BuyCryptoOrder.findByIdAndDelete(id, (error, buyorder) =>{ 
        if(error){return next(error)}
      })
      res.json({
        memorized_order_type: req.body.OrderType
      })
    } else if (req.body.OrderType === 'sellordersdata') {
      //console.log('Order type is a sell type')
      SellCryptoOrder.findByIdAndDelete(id, (error, sellorder) =>{ 
        if(error){return next(error)}
      })
      res.json({
        memorized_order_type: req.body.OrderType
      })
    }
  },



  registerOrder:  (req,res,next)=>{
    console.log("register order: req.params.type_order: \n", req.params.type_order)
    
    console.log("\n\nexpiration:\n", req.body.expirydate)

    req.body.expireAt = new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))
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
  
    
    if(req.body.expireAt > new Date()){
      TypeCryptoOrder.create({
        crypto: req.body.crypto,
        [req.body.amount ? "amount": null]: req.body.amount,
        [req.body.minamount ? "maxamount": null]: req.body.maxamount,
        [req.body.minamount ? "minamount": null]: req.body.minamount,
        price: req.body.price,
        expirydate: req.body.expirydate,
        expirytime: req.body.expirytime,
        payment: req.body.payment,
        userid: req.session.userId,
        expireAt: req.body.expireAt
      }, (error, typecryptoorder) => {
        // error = new Error("create failed")
        // return next(error)
        if(error){return next(error)}
        res.status(httpStatus.StatusCodes.OK).json({
          saved: "success"
        })
      })
    } else {
      res.status(httpStatus.StatusCodes.BAD_REQUEST).json({
        saved: "No"
      })
    }
  }
}