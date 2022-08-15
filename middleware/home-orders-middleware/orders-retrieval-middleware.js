const BuyCryptoOrder = require('../../models/home-orders-models/BuyCryptoOrder')

const SellCryptoOrder = require('../../models/home-orders-models/SellCryptoOrder')

const ENV = require('../../config/base')

const {filterObject, buyMatchesFinder, sellMatchesFinder} = require('../../middleware/libs/match-maker-functions')

module.exports = async (req,res,next)=>{
  console.log("\n\n\n______in intermediateMiddlewareOrders: \n\n",res.locals.page, res.locals.limit, res.locals.startIndex, res.locals.endIndex)


  // URL path parameters
  let type_orders = req.params.type_orders
  let path_param_userID = req.params.userID

  // Query string parameters
  const crypto = req.query.crypto
  
  let filter_object = filterObject(path_param_userID, crypto)
  
  let orders
  // console.log("\nFind filter: \n", filter_object)

  // console.log("\n\norders_user: ", path_param_userID)
  // console.log("page: ", res.locals.page)
  // console.log("limit: ", res.locals.limit)
  // console.log("startIndex: ", res.locals.startIndex)
  // console.log("endIndex: ", res.locals.endIndex)
  // console.log("\nFind filter: \n", filter_object)

  let bOrders = BuyCryptoOrder.find(filter_object).populate('userid')
  let sOrders = SellCryptoOrder.find(filter_object).populate('userid')

  let [buyOrders, sellOrders] = await Promise.all([bOrders, sOrders]).catch(e => {
    return next(e)
  })

  console.log("buys: ", buyOrders)

  console.log(req.session.userId)
  let mybuyOrders = buyOrders.filter((order_entry) => {
    // console.log(order_entry.userid._id, req.session.userId)
    // console.log(order_entry.userid._id.toString() == req.session.userId)
    return order_entry.userid._id.toString() == req.session.userId;
  })
  let mysellOrders = sellOrders.filter((order_entry) => {
    // console.log(order_entry.userid._id, req.session.userId)
    // console.log(order_entry.userid._id.toString() == req.session.userId)
    return order_entry.userid._id.toString() == req.session.userId
  })

  console.log("my buys: ", mybuyOrders)
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

  console.log("\n\n\n\n_______ORDERS!!______", orders)
  
  // let descriptive = {
  //   type_orders: type_orders,
  //   page: res.locals.page,
  //   crypto: crypto,
  //   limit: res.locals.limit,
  //   userid: path_param_userID,
  // }
  // console.log("\nDescription: \n", descriptive)
  // console.log("Retrieved Orders", orders)



  res.locals.data_to_be_paginated_and_served = orders
  next()
}