const ENV = require('../../config/base')
const full_stack_utils = require('../../full-stack-libs/utils')

module.exports = (req,res,next)=>{

  res.locals.type_orders = req.params.type_orders
  res.locals.path_param_userID = req.params.data_of_userID

  // console.log("\n** paginatedOrdersSetupMiddleware():\n")
  // console.log(`- data_of_userID: ${req.params.data_of_userID}\n`)
  // console.log(`- type_orders: ${res.locals.type_orders}\n`)

  return next()
}