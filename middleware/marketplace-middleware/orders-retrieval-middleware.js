const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder')

var ObjectId = require('mongodb').ObjectId; 

const ENV = require('../../config/base')


const {filterObject} = require('../../middleware/libs/match-maker-functions')

module.exports = async (req,res,next)=>{
  console.log("\n\n\n_________________________________in ordersRetrievalMiddleware: \n\n\n\n")


  // const crypto = req.query.crypto
  // let filter_object = filterObject(crypto)
  // console.log(filter_object)
  
  let orders



  let sellOrders

  try {
    sellOrders = await SellMarketOrder.find().populate('userid')
  } catch (e) {
    return next(e)
  }

  console.log("\n\n\n\nsellOrders!!\n\n", sellOrders)

  // console.log({path_param_userID: res.locals.path_param_userID}, typeof res.locals.path_param_userID, typeof ObjectId(res.locals.path_param_userID))


  
  let mysellOrders = sellOrders.filter((order_entry) => {
    // console.log(order_entry.userid._id, path_param_userID)
    // console.log(order_entry.userid._id.toString() == path_param_userID)
    console.log(order_entry.userid._id.toString() == res.locals.path_param_userID)
    return order_entry.userid._id.toString() == res.locals.path_param_userID
    // path_param_userID 
    // || req.session.userId
  })


  // console.log("\n\n\n\nmysellOrders!!\n\n", mysellOrders)


  // console.log("\n\n_______________\n\n")
  // console.log("res.locals.type_orders: ", res.locals.type_orders)
  // console.log("ENV.domain_without_protocol: ", ENV.domain_without_protocol)
  // console.log("res.locals.URL_fromReferer: ", res.locals.URL_fromReferer)
  // console.log("\n\n_______________\n\n")

  
  

  console.log("\n\n_______________\n\n")
  console.log(res.locals.URL_fromReferer)
  console.log(`${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}`)
  console.log("\n\n_______________\n\n")

  

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