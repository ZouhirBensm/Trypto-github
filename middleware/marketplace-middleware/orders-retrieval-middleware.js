const BuyMarketOrder = require('../../models/market-orders-models/BuyMarketOrder')

const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder')

var ObjectId = require('mongodb').ObjectId; 

const ENV = require('../../config/base')

// const {filterObject, buyMatchesFinder, sellMatchesFinder} = require('../../middleware/libs/match-maker-functions')

// TODO switch to match-maker-functions and adapt
const {filterObject, buyMatchesFinder, sellMatchesFinder} = require('../../middleware/libs/match-maker-functions2')

module.exports = async (req,res,next)=>{
  console.log("\n\n\n_________________________________in ordersRetrievalMiddleware: \n\n\n\n")


  // TODO crypto not sent from the front end, there for not needed! so delete or change!
  const crypto = req.query.crypto
  
  let filter_object = filterObject(crypto)
  
  let orders

  console.log(filter_object)
















  let bOrders = BuyMarketOrder.find(filter_object).populate('userid')
  let sOrders = SellMarketOrder.find(filter_object).populate('userid')

  let [buyOrders, sellOrders] = await Promise.all([bOrders, sOrders]).catch(e => {
    return next(e)
  })

  // console.log("\n\n\n\nbuyOrders!!\n\n", buyOrders)
  // console.log("\n\n\n\nsellOrders!!\n\n", sellOrders)

  // console.log({path_param_userID: res.locals.path_param_userID}, typeof res.locals.path_param_userID, typeof ObjectId(res.locals.path_param_userID))


  

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


  // console.log("\n\n\n\nmybuyOrders!!\n\n", mybuyOrders)
  // console.log("\n\n\n\nmysellOrders!!\n\n", mysellOrders)


  // console.log("\n\n_______________\n\n")
  // console.log("res.locals.type_orders: ", res.locals.type_orders)
  // console.log("ENV.domain_without_protocol: ", ENV.domain_without_protocol)
  // console.log("res.locals.URL_fromReferer: ", res.locals.URL_fromReferer)
  // console.log("\n\n_______________\n\n")



  console.log(`${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/marketplace/databases/matches`)
  
  switch(res.locals.type_orders) {

    case 'buyordersdata':

      // console.log(res.locals.URL_fromReferer)
      // console.log(`${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/databases/matches`)
      // console.log(`${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/databases/AllMyOrders`)
      // console.log(`${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/operations/help-for-orders/${res.locals.path_param_userID}`)


      // console.log(res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/databases/matches`)
      // console.log(res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/databases/AllMyOrders` || res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/operations/help-for-orders/${res.locals.path_param_userID}` )


      

      if(res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/marketplace/databases/matches`){

        console.log("MATCHES MODE 1")

        try {
          orders = await buyMatchesFinder(mysellOrders, buyOrders, res.locals.path_param_userID)
          .then(
            arrayOfarrayMatchesforEachSell => {
              // console.log('buyMatchesFinder process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', arrayOfarrayMatchesforEachSell, '\n'); 
              orders = arrayOfarrayMatchesforEachSell; 
              orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i); 
              return orders
            },
            rejected_err => {
              console.log("buyMatchesFinder reject function caught a rejected error: ", rejected_err); throw rejected_err
            }
          )

        } catch(err){
          return next(err)
        }
        // console.log("buyss that match the sells", orders)

      
      } else if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/marketplace/databases/AllMyOrders`) {

        console.log("MY MODE -> from path param")
        orders = mybuyOrders
      } else {        
        console.log("should be set to true: ", res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/marketplace/databases/buyordersdata`)

        console.log("NORMAL MODE")
        orders = buyOrders

        // console.log("orders!!!!!:::::", orders)
      }
      break

    case 'sellordersdata':
      // console.log(res.locals.URL_fromReferer)
      // console.log(`${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/databases/matches`)
      // console.log(`${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/databases/AllMyOrders`)
      // console.log(`${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/operations/help-for-orders/${res.locals.path_param_userID}`)

      // console.log(res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/databases/matches`)
      // console.log(res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/databases/AllMyOrders` || res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/operations/help-for-orders/${res.locals.path_param_userID}` )


      if(res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/marketplace/databases/matches`){
        console.log("MATCHES MODE 2")

        try {
          orders = await sellMatchesFinder(mybuyOrders, sellOrders, res.locals.path_param_userID)
          
          

          .then(
            arrayOfarrayMatchesforEachBuy => {
              // console.log('sellMatchesFinder process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', arrayOfarrayMatchesforEachBuy, '\n'); 
              orders = arrayOfarrayMatchesforEachBuy; 
              orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i); 
              return orders
            },
            rejected_err => {
              console.log("sellMatchesFinder reject function caught a rejected error: ", rejected_err); throw rejected_err
            }
          )
          
        } catch(err){
          return next(err)
        }
        // console.log("sells that match the buys", orders)

      } else if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/marketplace/databases/AllMyOrders`) {
        console.log("MY MODE -> from path param")
        orders = mysellOrders
      } else {        
        console.log("NORMAL MODE")
        console.log("should be set tu true: ", res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/marketplace/databases/sellordersdata`)

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