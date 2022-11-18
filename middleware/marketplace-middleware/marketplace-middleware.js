const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder')

var ObjectId = require('mongodb').ObjectId; 

const ENV = require('../../config/base')


const {filterObject} = require('../../middleware/libs/match-maker-functions')



async function ordersRetrievalMiddleware(req, res, next) {
  console.log("\n\n\n_______________in ordersRetrievalMiddleware: \n\n\n\n")
  
  let orders

  let sellOrders

  try {
    sellOrders = await SellMarketOrder.find().populate('userid')
  } catch (e) {
    return next(e)
  }

  console.log("\n\n\n\nsellOrders!!\n\n", sellOrders)


  
  let mysellOrders = sellOrders.filter((order_entry) => {
    console.log(order_entry.userid._id.toString() == res.locals.path_param_userID)
    return order_entry.userid._id.toString() == res.locals.path_param_userID
  })

  

    if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/marketplace/allmyorders` || res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/operations/help-for-market-orders/${res.locals.path_param_userID}`) {
      console.log("MY MODE -> from path param")
      orders = mysellOrders
    } else if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/marketplace/sellordersdata`) {        
      console.log("NORMAL MODE")
      orders = sellOrders
    } else {
      const e = new Error("The path URL not identified to enable to return proper orders")
      return next(e)
    }


  console.log("\n\n\n\nORDERS!!\n\n", orders)

  res.locals.data_to_be_paginated_and_served = orders
  return next()

}


marketplaceMiddleware = {
  ordersRetrievalMiddleware: ordersRetrievalMiddleware,
}


module.exports = marketplaceMiddleware