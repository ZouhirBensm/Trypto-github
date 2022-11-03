const BuyCryptoOrder = require('../../models/home-currencyorders-models/BuyCryptoOrder')

const SellCryptoOrder = require('../../models/home-currencyorders-models/SellCryptoOrder')

var ObjectId = require('mongodb').ObjectId; 

const ENV = require('../../config/base')

const {filterObject, filterObject2, buyMatchesFinder, sellMatchesFinder} = require('../../middleware/libs/match-maker-functions')

module.exports = async (req,res,next)=>{
  console.log("\n\n\n______in ordersRetrievalMiddleware: \n\n")


  // URL path parameters
  // let type_orders = req.params.type_orders
  // let path_param_userID = req.params.userID


  // Query string parameters
  let searchEngineTerms = req.query.search
  searchEngineTerms = searchEngineTerms ? JSON.parse(searchEngineTerms) : undefined
  console.log(searchEngineTerms)


  
  let findObject = filterObject2(searchEngineTerms)
  
  console.log(findObject)
  let orders



  let bOrders = BuyCryptoOrder.find(findObject).populate('userid')
  let sOrders = SellCryptoOrder.find(findObject).populate('userid')

  let [buyOrders, sellOrders] = await Promise.all([bOrders, sOrders]).catch(e => {
    return next(e)
  })


  let mybuyOrders = buyOrders.filter((order_entry) => {
    return order_entry.userid._id.toString() == res.locals.path_param_userID;
  })

  let mysellOrders = sellOrders.filter((order_entry) => {
    return order_entry.userid._id.toString() == res.locals.path_param_userID
  })


  
  switch(res.locals.type_orders) {

    case 'buyordersdata':

      if(res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/btclayerexchange/matches`){
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

      } else if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/btclayerexchange/allmyorders` || res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/operations/help-for-orders/${res.locals.path_param_userID}`) {
        console.log("MY MODE -> from path param")
        orders = mybuyOrders
      } else if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/btclayerexchange/buyordersdata`) {        
        console.log("NORMAL MODE")
        orders = buyOrders
        // console.log("orders!!!!!:::::", orders)
      } else {
        console.log("NOT RECOGNIZED MODE")
      }
      break

    case 'sellordersdata':
      // console.log(res.locals.URL_fromReferer)
      // console.log(`${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/btclayerexchange/matches`)
      // console.log(`${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/btclayerexchange/allmyorders`)
      // console.log(`${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/operations/help-for-orders/${res.locals.path_param_userID}`)

      // console.log(res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/btclayerexchange/matches`)
      // console.log(res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/btclayerexchange/allmyorders` || res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/operations/help-for-orders/${res.locals.path_param_userID}` )


      if(res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/btclayerexchange/matches`){
        console.log("\n MATCHES MODE:\n")

        try {
          orders = await sellMatchesFinder(mybuyOrders, sellOrders, res.locals.path_param_userID)
          .then(
            arrayOfarrayMatchesforEachBuy => {console.log('sellMatchesFinder process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', arrayOfarrayMatchesforEachBuy, '\n'); orders = arrayOfarrayMatchesforEachBuy; orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i); return orders},
            rejected_err => {console.log("sellMatchesFinder reject function caught a rejected error: ", rejected_err); throw rejected_err}
          )
        } catch(err){
          return next(err)
        }

      } else if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/btclayerexchange/allmyorders` || res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/operations/help-for-orders/${res.locals.path_param_userID}`) {
        console.log("MY MODE -> from path param")
        orders = mysellOrders
      } else if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/btclayerexchange/sellordersdata`) {        
        console.log("NORMAL MODE")
        orders = sellOrders
        // console.log("orders!!!!!:::::", orders)
      } else {
        console.log("NOT RECOGNIZED MODE")
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