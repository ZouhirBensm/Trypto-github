// When required for the first time runs the entire script, then subsequent times only retrieces the Model


const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder')
const SellMarketOrderLocation = require('../../models/market-orders-models/SellMarketOrderLocation')

const httpStatus = require("http-status-codes")



module.exports = {
  // updateOrderController: async (req,res, next)=>{

  //   console.log("new DATA:", req.body)
    
  //   console.log('Current User: ' + req.session.userId + ' and Order asked to update: ' + req.body.OrderID + ' order to update type: ' + req.body.OrderType)
    
  //   if(req.body.OrderType === 'buyordersdata'){
  //   //   old_buycryptoOrder = await BuyCryptoOrder.findById(req.body.OrderID) #@
  //   //   console.log("\n\n\n\n___________________________old crypto order:", old_buycryptoOrder)
  //   //   BuyCryptoOrder.findByIdAndUpdate(req.body.OrderID, {
  //   //     // crypto: req.body.NewCrypto,
  //   //     [old_buycryptoOrder.crypto != req.body.NewCrypto ? "crypto": null]: req.body.NewCrypto,
  //   //     // amount: req.body.NewAmount,
  //   //     [old_buycryptoOrder.amount != req.body.NewAmount ? "amount": null]: req.body.NewAmount,
  //   //     // price: req.body.NewPrice,
  //   //     [old_buycryptoOrder.price != req.body.NewPrice ? "price": null]: req.body.NewPrice,
  //   //     // expirydate: req.body.NewExpiryDate,
  //   //     [old_buycryptoOrder.expirydate != req.body.NewExpiryDate ? "expirydate": null]: req.body.NewExpiryDate,
  //   //     // expirytime: req.body.NewExpiryTime,
  //   //     [old_buycryptoOrder.expirytime != req.body.NewExpiryTime ? "expirytime": null]: req.body.NewExpiryTime,
  //   //     // payment: req.body.NewPayment,
  //   //     [old_buycryptoOrder.payment != req.body.NewPayment ? "payment": null]: req.body.NewPayment,
  //   //     }, (error, old_order) => {
  //   //     if(error){return next(error)}
  //   //     console.log("Update Callback: ", old_order) 
  //   //   })

  //   // If upsert is true then if the row trying to be updated does not exist then a new row is inserted instead , if false then it does not do anything .

  //   // If new is true then the modified document is returned after the update rather than the original , if false then the original document is returned
  //   BuyCryptoOrder.findByIdAndUpdate(req.body.OrderID, { $set: req.body }, { upsert: true, new: true }, (error, order) => {
  //     if(error){return next(error)}
  //     console.log("Update Callback: ", order) 
  //   });


  //   } else if (req.body.OrderType === 'sellordersdata'){
  //     SellCryptoOrder.findByIdAndUpdate(req.body.OrderID, { $set: req.body }, { upsert: true, new: true }, (error, order) => {
  //       if(error){return next(error)}
  //       console.log("Update Callback: ", order) 
  //     });
  //   }
  
  //   res.json({
  //     srv_: "successfully updated"
  //   })
  //   // res.redirect('/databases/AllMyOrders') 
  
  // },


  // deleteOrderController: (req,res,next)=>{
  //   // console.log("req body on /delete-this-order: ", req.body) 
  //   var id = req.body.OrderID
  
  //   if (req.body.OrderType === 'buyordersdata') {
  //     //console.log('Order type is a buy type')
  //     BuyCryptoOrder.findByIdAndDelete(id, (error, buyorder) =>{ 
  //       if(error){return next(error)}
  //     })
  //     res.json({
  //       memorized_order_type: req.body.OrderType
  //     })
  //   } else if (req.body.OrderType === 'sellordersdata') {
  //     //console.log('Order type is a sell type')
  //     SellCryptoOrder.findByIdAndDelete(id, (error, sellorder) =>{ 
  //       if(error){return next(error)}
  //     })
  //     res.json({
  //       memorized_order_type: req.body.OrderType
  //     })
  //   }
  // },

  registerOrder2: async (req,res,next)=>{
    console.log(req.body)


    let body_mOR_basic_data = req.body.pkobmOr_basicData
    let body_mOR_location_data = req.body.pkobmOr_LocationData


    console.log("\n\expirydate:\n", body_mOR_basic_data.expirydate)

    body_mOR_basic_data.expireAt = new Date(body_mOR_basic_data.expirydate.slice(0,4), body_mOR_basic_data.expirydate.slice(5,7)-1, body_mOR_basic_data.expirydate.slice(8,10), body_mOR_basic_data.expirytime.slice(0,2), body_mOR_basic_data.expirytime.slice(3,5))

    console.log("\n\expireAt:\n", body_mOR_basic_data.expireAt)


    let create_res_sellmarketorderlocation


    try {
      create_res_sellmarketorderlocation = await SellMarketOrderLocation.create({
        // TODO refactor location to geometry
        location: {
          lat: body_mOR_location_data.location.lat,
          lng: body_mOR_location_data.location.lng,
        },
        // TODO refactor human location to location
        human_location: {
          address: body_mOR_location_data.human_location.address,
          st_number: body_mOR_location_data.human_location.st_number,
          st: body_mOR_location_data.human_location.st,
          neigh: body_mOR_location_data.human_location.neigh,
          province_state: body_mOR_location_data.human_location.province_state,
          city: body_mOR_location_data.human_location.city,
          country: body_mOR_location_data.human_location.country
        },
        expireAt: body_mOR_basic_data.expireAt,
      })
      
    } catch (e) {
      e = new Error(`Unable to create the SellMarketOrderLocation entry ${e.message}`)
      return next(e)
    }

    console.log("create_res_sellmarketorderlocation", create_res_sellmarketorderlocation._id)


    let create_res_sellmarketorder

    if(body_mOR_basic_data.expireAt > new Date() && create_res_sellmarketorderlocation) {
      try {
        create_res_sellmarketorder = await SellMarketOrder.create({
          title: body_mOR_basic_data.title,
          category: body_mOR_basic_data.category,
          price: body_mOR_basic_data.price,
          crypto: body_mOR_basic_data.crypto,
          conversion: body_mOR_basic_data.conversion,
          payment: body_mOR_basic_data.payment,
          chain: body_mOR_basic_data.chain,
          expireAt: body_mOR_basic_data.expireAt,
          expirydate: body_mOR_basic_data.expirydate,
          expirytime: body_mOR_basic_data.expirytime,
          userid: req.session.userId,
          sellmarketorderlocationID: create_res_sellmarketorderlocation._id
        })
      } catch (e) {
        e = new Error(`Unable to create the SellMarketOrder entry ${e.message}`)
        return next(e)
      }

      
    } else {
      res.status(httpStatus.StatusCodes.BAD_REQUEST).json({
        saved: "Not saved, because either date expiry before now, or saving the SellMarketOrderLocation entry defined but falsy"
      })
    }
    
    console.log("create_res_sellmarketorder", create_res_sellmarketorder)

    if (create_res_sellmarketorder) {
      res.status(200).end()
    } else {
      let e = new Error(`SellMarketOrder defined but falsy`)
      return next(e)
    }

  },

  // TODO when delete account, delete market, and location entries
  // TODO operations access to market order data and U,D capabilities



  registerOrder:  (req,res,next)=>{
    
    console.log("\n\nexpiration:\n", req.body.expirydate)

    req.body.expireAt = new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))


    // ________________________________________NOT NEEDED!

    //console.log(new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5)))
    // console.log(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))
    
    //console.log('typeof: ', typeof req.body.expireAt + '\n','req.body.expireAt: '+ req.body.expireAt+ '\n','Current Date: '+ new Date()+ '\n')
    //console.log(new Date('July 22, 2013 14:00:00'))


    // ________________________________________
  


  
    
    if(req.body.expireAt > new Date()){
      SellMarketOrder.create({
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        crypto: req.body.crypto,
        conversion: req.body.conversion,
        payment: req.body.payment,
        chain: req.body.chain,
        expireAt: req.body.expireAt,
        expirydate: req.body.expirydate,
        expirytime: req.body.expirytime,
        userid: req.session.userId,
      }, (error, typemarketorder) => {
        // error = new Error("create failed")
        // return next(error)
        console.log("error", error)
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


  },

  getOrderController: async (req,res,next) => {
    let order

    try {
      order = await SellMarketOrder.findById({_id: req.params.orderID})
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
      // TODO deal with the UI when no order under these circumstances is the case
      const e = new Error("No order found by that ID")
      return next(e)
    }
  }
}