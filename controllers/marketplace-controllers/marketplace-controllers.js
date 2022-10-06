// When required for the first time runs the entire script, then subsequent times only retrieces the Model


const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder')
const SellMarketOrderLocation = require('../../models/market-orders-models/SellMarketOrderLocation')


const {MongoError} = require('../../custom-errors/custom-errors')
const {ValidationError} = require('../../custom-errors/custom-errors')

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

  updateOrderController: async (req,res, next)=>{

    console.log("new DATA:", req.body)
    
    console.log('Current User: ' + req.session.userId + ' and Order asked to update: ' + req.body.pkobmOr_4ft2sd._id)
    
    // If upsert is true then if the row trying to be updated does not exist then a new row is inserted instead , if false then it does not do anything .

    // If new is true then the modified document is returned after the update rather than the original , if false then the original document is returned


    let updatedMarketOrder_ifAny

    try{
      updatedMarketOrder_ifAny = await SellMarketOrder.findByIdAndUpdate(req.body.pkobmOr_4ft2sd._id, { $set: req.body.pkobmOr_4ft2sd }, { upsert: false, new: true });
    } catch(e){
      let error = new MongoError(e.message)
      return next(error)
    }


    if (updatedMarketOrder_ifAny){
      res.status(200).json({
        srv_: "Successfully updated"
      })
    }

    // res.redirect('/databases/AllMyOrders') 
  
  },


  deleteOrderController: async (req,res,next)=>{
    // console.log("req body on /delete-this-order: ", req.body) 
    console.log(req.body.market_orderID)


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

  },




  registerMarketOrder: async (req,res,next)=>{
    console.log(req.body)


    let body_mOR_basic_data = req.body.pkobmOr_basicData
    let body_mOR_location_data = req.body.pkobmOr_LocationData


    console.log("\n\expirydate:\n", body_mOR_basic_data.expirydate)

    body_mOR_basic_data.expireAt = new Date(body_mOR_basic_data.expirydate.slice(0,4), body_mOR_basic_data.expirydate.slice(5,7)-1, body_mOR_basic_data.expirydate.slice(8,10), body_mOR_basic_data.expirytime.slice(0,2), body_mOR_basic_data.expirytime.slice(3,5))

    console.log("\n\expireAt:\n", body_mOR_basic_data.expireAt)


    let create_res_sellmarketorderlocation


    try {
      create_res_sellmarketorderlocation = await SellMarketOrderLocation.create({
        geometry: {
          lat: body_mOR_location_data.geometry.lat,
          lng: body_mOR_location_data.geometry.lng,
        },
        location: {
          address: body_mOR_location_data.location.address,
          st_number: body_mOR_location_data.location.st_number,
          st: body_mOR_location_data.location.st,
          neigh: body_mOR_location_data.location.neigh,
          province_state: body_mOR_location_data.location.province_state,
          city: body_mOR_location_data.location.city,
          country: body_mOR_location_data.location.country
        },
        expireAt: body_mOR_basic_data.expireAt,
      })
      
    } catch (e) {
      e = new MongoError(`Unable to create the SellMarketOrderLocation entry ${e.message}`)
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
        e = new MongoError(`Unable to create the SellMarketOrder entry ${e.message}`)

        return next(e)
      }

      
    } else {
      e = new ValidationError(`Not saved, because date expiry before now, or create location failed`, "body_mOR_basic_data.expireAt | create_res_sellmarketorderlocation", httpStatus.StatusCodes.BAD_REQUEST)
      return next(e)
    }
    

    res.status(200).end()

  },

  // TODO when delete account, delete market, and location entries
  // TODO operations access to market order data and U,D capabilities


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