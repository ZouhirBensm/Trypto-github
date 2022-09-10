const ENV = require('../../config/base')
const full_stack_utils = require('../../full-stack-libs/utils')

module.exports = (req,res,next)=>{
  console.log("\n_______________\n")
  res.locals.page = parseInt(req.query.page)
  res.locals.limit = parseInt(req.query.limit)
  res.locals.startIndex = (res.locals.page - 1)*res.locals.limit
  res.locals.endIndex = res.locals.page*res.locals.limit
  
  console.log("in paginatingSetupMiddleware: ",res.locals.page, res.locals.limit, res.locals.startIndex, res.locals.endIndex)
  
  console.log("\n______________________________")


  // // TODO in own middleware
  // console.log("\n_______________\n")
  // const URL_fromAPIcall = `${ENV.domain}${req.url}`.split("?")[0]
  // // console.log({URL_fromAPIcall})
  // const parsed_URL_fromAPIcall = full_stack_utils.parseURL(URL_fromAPIcall)
  // // console.log({parsed_URL_fromAPIcall})
  // const paths_URL_fromAPIcall = full_stack_utils.URLpathDecomposer(parsed_URL_fromAPIcall[3])
  // console.log({paths_URL_fromAPIcall})

  // res.locals.paths_URL_fromAPIcall = paths_URL_fromAPIcall

  // const URL_fromReferer = req.headers.referer.split("?")[0]
  // // console.log({URL_fromReferer})
  // const parsed_URL_fromReferer = full_stack_utils.parseURL(URL_fromReferer)
  // // console.log({parsed_URL_fromReferer})
  // const paths_URL_fromReferer = full_stack_utils.URLpathDecomposer(parsed_URL_fromReferer[3])
  // console.log({paths_URL_fromReferer})

  // res.locals.paths_URL_fromReferer = paths_URL_fromReferer
  // console.log("\n______________________________")
  // // ____________________

  next()
}