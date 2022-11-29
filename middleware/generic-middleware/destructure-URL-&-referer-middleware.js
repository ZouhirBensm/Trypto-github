
const full_stack_utils = require("../../full-stack-libs/utils")

const ENV = require("../../config/base")

module.exports = async (req, res, next) => {
  
  const URL_fromReferer = req.headers.referer.split("?")[0]
  const parsed_URL_fromReferer = full_stack_utils.parseURL(URL_fromReferer)
  const paths_URL_fromReferer = full_stack_utils.URLpathDecomposer(parsed_URL_fromReferer[3])

  

  res.locals.URL_fromReferer = URL_fromReferer
  res.locals.parsed_URL_fromReferer = parsed_URL_fromReferer
  res.locals.paths_URL_fromReferer = paths_URL_fromReferer
  


  const URL_fromAPIcall = `${parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}${req.url}`.split("?")[0]
  
  
  const parsed_URL_fromAPIcall = full_stack_utils.parseURL(URL_fromAPIcall)
  const paths_URL_fromAPIcall = full_stack_utils.URLpathDecomposer(parsed_URL_fromAPIcall[3])
  
  res.locals.URL_fromAPIcall = URL_fromAPIcall
  res.locals.parsed_URL_fromAPIcall = parsed_URL_fromAPIcall
  res.locals.paths_URL_fromAPIcall = paths_URL_fromAPIcall
  
  return next()
}