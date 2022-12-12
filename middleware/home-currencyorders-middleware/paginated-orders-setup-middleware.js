const ENV = require('../../config/base')
const full_stack_utils = require('../../full-stack-libs/utils')

module.exports = (req,res,next)=>{
  // console.log("\n_______________\n")


  
  // console.log("in paginatedOrdersSetupMiddleware: ")

  res.locals.type_orders = req.params.type_orders

  res.locals.path_param_userID = req.params.data_of_userID

  console.log("\nparams:\n", `data_of_userID: ${req.params.data_of_userID}, type_orders: ${res.locals.type_orders}\n`)
  
  // console.log("\n______________________________")

  return next()
}