const ENV = require('../../config/base')

module.exports = (req,res,next)=>{
  console.log("\n_______________\n")
  res.locals.page = parseInt(req.query.page)
  res.locals.limit = parseInt(req.query.limit)
  res.locals.startIndex = (res.locals.page - 1)*res.locals.limit
  res.locals.endIndex = res.locals.page*res.locals.limit

  // const URL = `${ENV.domain}${req.url}`.split("?")[0]
  // res.locals.url = URL
  // console.log("FUCKING THING DOING THE API CALL:", res.locals.url)

  console.log("in paginatingSetupMiddleware: ",res.locals.page, res.locals.limit, res.locals.startIndex, res.locals.endIndex)
  
  console.log("\n______________________________")
  next()
}