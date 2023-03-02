const fetch = require('node-fetch')
const ENV = require('../../config/base')
const Subscriber = require('../../models/Subscriber')
const utils = require('../../full-stack-libs/utils')

module.exports = async (req,res, next) =>{
  
  let Authorization_header_value_4_fetch = utils.return_Authorization_header_value_4_fetch()


  // TODO Fetch is soon to be implemented in node: Node v17, in the meantime use other api
  let paypal_cancel_sub_response = await fetch(`${process.env.PAYPAL_API_ROOT}/billing/subscriptions/${res.locals.subscriptionInfo.paypal_subscriptionID}/cancel`, {
    body: JSON.stringify({
      reason: "reason not yet implemented in the BidBlock application",
    }),
    headers: {
      Authorization: `${Authorization_header_value_4_fetch}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  })

  console.log("\nresponse!\n\n ", paypal_cancel_sub_response)

  
  res.locals.paypalCancelSubResponseStatus = paypal_cancel_sub_response.status
  // for testing
  // res.locals.paypalCancelSubResponseStatus = 400

  return next()



}