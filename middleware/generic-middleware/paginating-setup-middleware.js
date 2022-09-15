const ENV = require('../../config/base')
const full_stack_utils = require('../../full-stack-libs/utils')

module.exports = (req,res,next)=>{
  // console.log("\n_______________\n")
  res.locals.page = parseInt(req.query.page)
  res.locals.limit = parseInt(req.query.limit)
  res.locals.startIndex = (res.locals.page - 1)*res.locals.limit
  res.locals.endIndex = res.locals.page*res.locals.limit
  
  // console.log("in paginatingSetupMiddleware: ",res.locals.page, res.locals.limit, res.locals.startIndex, res.locals.endIndex)
  
  // console.log("\n______________________________")

  next()
}