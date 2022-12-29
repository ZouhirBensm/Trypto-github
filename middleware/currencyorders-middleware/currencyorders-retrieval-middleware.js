const BuyCryptoOrder = require('../../models/home-currencyorders-models/BuyCryptoOrder')

const SellCryptoOrder = require('../../models/home-currencyorders-models/SellCryptoOrder')

const ENV = require('../../config/base')

const {formOrderFindFilter, buyMatchesFinder, sellMatchesFinder} = require('../../middleware/libs/match-maker-functions')

module.exports = async (req,res,next)=>{

  let searchEngineTerms = req.query.search
  searchEngineTerms = searchEngineTerms ? JSON.parse(searchEngineTerms) : undefined

  // console.log("currencyordersRetrievalMiddleware()->searchEngineTerms: ", searchEngineTerms)


  
  let findObject = formOrderFindFilter(searchEngineTerms)
  
  // console.log("currencyordersRetrievalMiddleware()->findObject: ", findObject)



  let orders = []



  let bOrders = BuyCryptoOrder.find(findObject).sort({ postedDate: -1 }).populate('userid')
  let sOrders = SellCryptoOrder.find(findObject).sort({ postedDate: -1 }).populate('userid')

  let [buyOrders, sellOrders] = await Promise.all([bOrders, sOrders]).catch(e => {
    return next(e)
  })


  let mybuyOrders = buyOrders.filter((order_entry) => {
    return order_entry.userid._id.toString() == res.locals.path_param_userID;
  })

  let mysellOrders = sellOrders.filter((order_entry) => {
    return order_entry.userid._id.toString() == res.locals.path_param_userID
  })


  // console.log("\n\nres.locals.URL_fromReferer->", res.locals.URL_fromReferer)
  // console.log("\n\nbuild->", `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/currency/btclayerexchange/%PAGE%`)
  
  switch(res.locals.type_orders) {

    case 'buyordersdata':

      if(res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/currency/btclayerexchange/matches`){
        console.log("MATCHES MODE")
        try {
          orders = await buyMatchesFinder(mysellOrders, buyOrders, res.locals.path_param_userID)
          .then(
            (arrayOfarrayMatchesforEachSell) => {
              // console.log('buyMatchesFinder process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', arrayOfarrayMatchesforEachSell, '\n'); 
              orders = arrayOfarrayMatchesforEachSell; 
              orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i); 
              return orders
            },
            (rejected_err) => {
              console.log("buyMatchesFinder reject function caught a rejected error: ", rejected_err); throw rejected_err
            }
          )
        } catch(err){
          return next(err)
        }

      } else if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/currency/btclayerexchange/allmyorders` || res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/operations/help-for-orders/${res.locals.path_param_userID}`) {
        console.log("MY MODE -> from path param")
        orders = mybuyOrders
      } else if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/currency/btclayerexchange/buyordersdata`) {        
        console.log("NORMAL MODE")
        orders = buyOrders
      } else {
        console.log("NOT RECOGNIZED MODE")
      }
      break

    case 'sellordersdata':
      if(res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/currency/btclayerexchange/matches`){
        console.log("\n MATCHES MODE:\n")

        try {
          orders = await sellMatchesFinder(mybuyOrders, sellOrders, res.locals.path_param_userID)
          .then(
            (arrayOfarrayMatchesforEachBuy) => {
              // console.log('sellMatchesFinder process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', arrayOfarrayMatchesforEachBuy, '\n'); 
              orders = arrayOfarrayMatchesforEachBuy; 
              orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i); 
              return orders
            },
            (rejected_err) => {
              console.log("sellMatchesFinder reject function caught a rejected error: ", rejected_err); throw rejected_err
            }
          )
        } catch(err){
          return next(err)
        }

      } else if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/currency/btclayerexchange/allmyorders` || res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/operations/help-for-orders/${res.locals.path_param_userID}`) {
        console.log("MY MODE -> from path param")
        orders = mysellOrders
      } else if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/currency/btclayerexchange/sellordersdata`) {        
        console.log("NORMAL MODE")
        orders = sellOrders
      } else {
        console.log("NOT RECOGNIZED MODE")
      }
      break

    default:
      console.log('Target data not identified')
      break
  }

  // console.log("\n\n\n\nORDERS!!\n\n", orders)
  



  res.locals.data_to_be_paginated_and_served = orders
  return next()
}