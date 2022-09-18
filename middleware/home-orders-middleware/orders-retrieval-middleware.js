const BuyCryptoOrder = require('../../models/home-orders-models/BuyCryptoOrder')

const SellCryptoOrder = require('../../models/home-orders-models/SellCryptoOrder')

var ObjectId = require('mongodb').ObjectId; 

const ENV = require('../../config/base')

const {filterObject, buyMatchesFinder, sellMatchesFinder} = require('../../middleware/libs/match-maker-functions')

module.exports = async (req,res,next)=>{
  console.log("\n\n\n______in ordersRetrievalMiddleware: \n\n")


  // URL path parameters
  // let type_orders = req.params.type_orders
  // let path_param_userID = req.params.userID


  // Query string parameters
  const crypto = req.query.crypto
  
  let filter_object = filterObject(crypto)
  
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

  // console.log("\n\n\n\[buyOrders, sellOrders]!!\n\n", [buyOrders, sellOrders])
  // console.log("buys: ", buyOrders)

  console.log({path_param_userID: res.locals.path_param_userID}, typeof res.locals.path_param_userID, typeof ObjectId(res.locals.path_param_userID))

  let mybuyOrders = buyOrders.filter((order_entry) => {
    // console.log(order_entry.userid._id, path_param_userID)
    // console.log(order_entry.userid._id.toString() == path_param_userID)

    console.log(order_entry.userid._id.toString() == res.locals.path_param_userID)
    // console.log(order_entry.userid._id.toString() == req.session.userId)
    return order_entry.userid._id.toString() == res.locals.path_param_userID;
    // path_param_userID 
    // || req.session.userId;
  })
  let mysellOrders = sellOrders.filter((order_entry) => {
    // console.log(order_entry.userid._id, path_param_userID)
    // console.log(order_entry.userid._id.toString() == path_param_userID)
    console.log(order_entry.userid._id.toString() == res.locals.path_param_userID)
    return order_entry.userid._id.toString() == res.locals.path_param_userID
    // path_param_userID 
    // || req.session.userId
  })

  console.log("\n\n[mybuyOrders, mysellOrders]:\n\n ", [mybuyOrders, mysellOrders])


  console.log("\n\n_______________\n\n")
  console.log("res.locals.type_orders: ", res.locals.type_orders)
  console.log("ENV.domain: ", ENV.domain)
  console.log("res.locals.URL_fromReferer: ", res.locals.URL_fromReferer)
  console.log(": ", )
  console.log(": ", )
  console.log("\n\n_______________\n\n")


  
  switch(res.locals.type_orders) {

    case 'buyordersdata':
      console.log(req.headers.referer == ENV.domain + '/databases/matches')
      console.log(res.locals.URL_fromReferer == ENV.domain + '/databases/AllMyOrders' || res.locals.URL_fromReferer == ENV.domain + `/operations/help-for-orders/${res.locals.path_param_userID}`)

      if(req.headers.referer == ENV.domain + '/databases/matches'){
        console.log("MATCHES MODE")
        try {
          orders = await buyMatchesFinder(mysellOrders, buyOrders, res.locals.path_param_userID)
          .then(
            arrayOfarrayMatchesforEachSell => {console.log('buyMatchesFinder process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', arrayOfarrayMatchesforEachSell, '\n'); orders = arrayOfarrayMatchesforEachSell; orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i); return orders},
            rejected_err => {console.log("buyMatchesFinder reject function caught a rejected error: ", rejected_err); throw rejected_err}
          )
        } catch(err){
          return next(err)
        }
        // console.log("orders!!!!!:::::", orders)

      } else if (res.locals.URL_fromReferer == ENV.domain + '/databases/AllMyOrders' || res.locals.URL_fromReferer == ENV.domain + `/operations/help-for-orders/${res.locals.path_param_userID}`) {
        console.log("MY MODE -> from path param")
        orders = mybuyOrders
      } else {        
        console.log("NORMAL MODE")
        orders = buyOrders
        // console.log("orders!!!!!:::::", orders)
      }
      break

    case 'sellordersdata':
      console.log(res.locals.URL_fromReferer == ENV.domain + '/databases/matches')
      console.log(res.locals.URL_fromReferer == ENV.domain + '/databases/AllMyOrders' || res.locals.URL_fromReferer == ENV.domain + `/operations/help-for-orders/${res.locals.path_param_userID}`)

      
      if(res.locals.URL_fromReferer == ENV.domain + '/databases/matches'){
        console.log("MATCHES MODE")
        try {
          orders = await sellMatchesFinder(mybuyOrders, sellOrders, res.locals.path_param_userID)
          .then(
            arrayOfarrayMatchesforEachBuy => {console.log('sellMatchesFinder process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', arrayOfarrayMatchesforEachBuy, '\n'); orders = arrayOfarrayMatchesforEachBuy; orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i); return orders},
            rejected_err => {console.log("sellMatchesFinder reject function caught a rejected error: ", rejected_err); throw rejected_err}
          )
        } catch(err){
          return next(err)
        }
      } else if (res.locals.URL_fromReferer == ENV.domain + '/databases/AllMyOrders' || res.locals.URL_fromReferer == ENV.domain + `/operations/help-for-orders/${res.locals.path_param_userID}`) {
        console.log("MY MODE -> from path param")
        orders = mysellOrders
      } else {        
        console.log("NORMAL MODE")
        orders = sellOrders
        // console.log("orders!!!!!:::::", orders)
      }
      break

    default:
      console.log('Target data not identified')
      break
  }

  console.log("\n\n\n\nORDERS!!\n\n", orders)
  
  
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