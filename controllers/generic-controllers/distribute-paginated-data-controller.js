const ENV = require('../../config/base')
const {FirstPathNotRegistered} = require("../../custom-errors/custom-errors")

const full_stack_utils = require('../../full-stack-libs/utils')

module.exports = (req, res, next)=>{

  console.log("in distribute-paginated-data-controller.js: ", res.locals.data_to_be_paginated_and_served)

  const number_of_pages = Math.ceil(res.locals.data_to_be_paginated_and_served.length/res.locals.limit)
  
  // TODO #81 Refactor this variable name into something "convo"
  let data_pages_managed_obj = {}

  data_pages_managed_obj.number_of_pages = {
    number: number_of_pages
  }

  if(res.locals.endIndex < res.locals.data_to_be_paginated_and_served.length){
    data_pages_managed_obj.next = {
      page: res.locals.page + 1,
      limit: res.locals.limit
    }
  }
  if(res.locals.startIndex > 0){
    data_pages_managed_obj.previous = {
      page: res.locals.page - 1,
      limit: res.locals.limit
    }
  }


  const [all, protocol, fullhost, fullpath] = full_stack_utils.parseURL(req.headers.referer)

  console.log("URL destructured: ", {all, protocol, fullhost, fullpath})

  const firstPath = full_stack_utils.parseFullPath4firstpath(fullpath)

  console.log("first path directory name: ", firstPath)


  switch (firstPath) {
    case "messaging":
      data_pages_managed_obj.CONVOS = res.locals.data_to_be_paginated_and_served.slice(res.locals.startIndex, res.locals.endIndex)
      break;
    case "databases":
      data_pages_managed_obj.ORDERS = res.locals.data_to_be_paginated_and_served.slice(res.locals.startIndex, res.locals.endIndex)
      break;
    default:
      let error = new FirstPathNotRegistered(firstPath)
      return next(error)
      break;
  }

  res.json({
    srv_: data_pages_managed_obj,
  })
  
}
