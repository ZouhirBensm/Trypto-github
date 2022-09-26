
const full_stack_utils = require("../../full-stack-libs/utils")

const ENV = require("../../config/base")

module.exports = async (req, res, next) => {
  // console.log("\nin destructure-URL-&-referer-middleware.js_______________\n")

  
  
  const URL_fromReferer = req.headers.referer.split("?")[0]
  console.log({URL_fromReferer})
  const parsed_URL_fromReferer = full_stack_utils.parseURL(URL_fromReferer)
  // console.log({parsed_URL_fromReferer})
  const paths_URL_fromReferer = full_stack_utils.URLpathDecomposer(parsed_URL_fromReferer[3])
  // console.log({ paths_URL_fromReferer })

  
  res.locals.URL_fromReferer = URL_fromReferer
  res.locals.parsed_URL_fromReferer = parsed_URL_fromReferer
  res.locals.paths_URL_fromReferer = paths_URL_fromReferer
  


  const URL_fromAPIcall = `${parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}${req.url}`.split("?")[0]
  console.log({URL_fromAPIcall})
  const parsed_URL_fromAPIcall = full_stack_utils.parseURL(URL_fromAPIcall)
  // console.log({parsed_URL_fromAPIcall})
  const paths_URL_fromAPIcall = full_stack_utils.URLpathDecomposer(parsed_URL_fromAPIcall[3])
  // console.log({ paths_URL_fromAPIcall })
  
  res.locals.URL_fromAPIcall = URL_fromAPIcall
  res.locals.parsed_URL_fromAPIcall = parsed_URL_fromAPIcall
  res.locals.paths_URL_fromAPIcall = paths_URL_fromAPIcall

  // console.log("\n______________________________")
  
  next()
}