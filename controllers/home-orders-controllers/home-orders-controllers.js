// When required for the first time runs the entire script, then subsequent times only retrieces the Model
const BuyCryptoOrder = require('../../models/home-orders-models/BuyCryptoOrder')
const SellCryptoOrder = require('../../models/home-orders-models/SellCryptoOrder')
const ENV = require('../../config/base')
const httpStatus = require("http-status-codes")
const {filterObject, buyMatchesFinder, sellMatchesFinder} = require('../libs/match-maker-functions')

module.exports = {
  getPaginatedOrdersController: async (req, res, next) => {

    // const mongoose = require('mongoose')
    // const db = mongoose.connection
    // console.log(`Successfully connected to MongoDB using Mongoose from getPaginatedOrdersController the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)



    let orders
    // URL path parameters
    let type_orders = req.params.type_orders
    let path_param_userID = req.params.userID

    // Query string parameters
    let page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const crypto = req.query.crypto
    
    const startIndex = (page - 1)*limit
    const endIndex = page*limit
    // console.log("domain: ", ENV.domain)
    // console.log("Analize request", req.headers.referer)
  
    let filter_object = filterObject(path_param_userID, crypto)

    // console.log("\nFind filter: \n", filter_object)
  

    let bOrders = BuyCryptoOrder.find(filter_object).populate('userid')
    let sOrders = SellCryptoOrder.find(filter_object).populate('userid')

    let [buyOrders, sellOrders] = await Promise.all([bOrders, sOrders]).catch(e => {
      return next(e)
    })
  
    let mybuyOrders = buyOrders.filter(order_entry => order_entry.userid._id.toString() === req.session.userId)
    let mysellOrders = sellOrders.filter(order_entry => order_entry.userid._id.toString() === req.session.userId)
  
    //await Promise.all([sellMatchesFinder(), buyMatchesFinder()]).then(val => {console.log('sellMatchesFinder process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', val[0], '\n', 'buyMatchesFinder process to receive array of matching buys for each sell:\n', 'Value from promise returned: ', val[1], '\n')})
    
  
    // console.log(req.headers.referer)
    // console.log("\n\n____________________________________")


    switch(type_orders) {

      case 'buyordersdata':
        if(req.headers.referer == ENV.domain + '/databases/matches'){
          try {
            orders = await buyMatchesFinder(mysellOrders, buyOrders, req.session.userId)
            .then(
              arrayOfarrayMatchesforEachSell => {console.log('buyMatchesFinder process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', arrayOfarrayMatchesforEachSell, '\n'); orders = arrayOfarrayMatchesforEachSell; orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i); return orders},
              rejected_err => {console.log("buyMatchesFinder reject function caught a rejected error: ", rejected_err); throw rejected_err}
            )
          } catch(err){
            return next(err)
          }
          // console.log("orders!!!!!:::::", orders)
        } else {
          // console.log("Normal Mode!") 
          orders = buyOrders
          // console.log("orders!!!!!:::::", orders)
        }
        break

      case 'sellordersdata':
        if(req.headers.referer == ENV.domain + '/databases/matches'){
          try {
            orders = await sellMatchesFinder(mybuyOrders, sellOrders, req.session.userId)
            .then(
              arrayOfarrayMatchesforEachBuy => {console.log('sellMatchesFinder process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', arrayOfarrayMatchesforEachBuy, '\n'); orders = arrayOfarrayMatchesforEachBuy; orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i); return orders},
              rejected_err => {console.log("sellMatchesFinder reject function caught a rejected error: ", rejected_err); throw rejected_err}
            )
          } catch(err){
            return next(err)
          }
          // console.log("orders!!!!!:::::", orders)
        } else {
          // console.log("Normal Mode!") 
          orders = sellOrders
          // console.log("orders!!!!!:::::", orders)
        }
        break

      default:
        console.log('Target data not identified')
        break
    }

    // let descriptive = {
    //   type_orders: type_orders,
    //   page: page,
    //   crypto: crypto,
    //   limit: limit,
    //   userid: path_param_userID,
    // }
    // console.log("\nDescription: \n", descriptive)
    // console.log("Retrieved Orders", orders)
  
    const number_of_pages = Math.ceil(orders.length/limit)
  
    let orders_management_obj = {}

    orders_management_obj.number_of_pages = {
      number: number_of_pages
    }
  
    if(endIndex < orders.length){
      orders_management_obj.next = {
        page: page + 1,
        limit: limit
      }
    }
    if(startIndex > 0){
      orders_management_obj.previous = {
        page: page - 1,
        limit: limit
      }
    }
    
    orders_management_obj.ORDERS = orders.slice(startIndex, endIndex)

    // console.log("sliced:::::: ", orders_management_obj.ORDERS)
  
    res.json({
      srv_: orders_management_obj,
    })
  
  },



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
    // console.log(req.session)
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