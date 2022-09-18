const ENV = require('../../config/base')
const {FirstPathNotRegistered} = require("../../custom-errors/custom-errors")

const full_stack_utils = require('../../full-stack-libs/utils')

module.exports = (req, res, next)=>{
  // console.log("\n_______________\n")

  // console.log("in distribute-paginated-data-controller.js: ", res.locals.data_to_be_paginated_and_served)

  const number_of_pages = Math.ceil(res.locals.data_to_be_paginated_and_served.length/res.locals.limit)

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


  console.log("res.locals.paths_URL_fromAPIcall[0]: ", res.locals.paths_URL_fromAPIcall[0])
  switch (res.locals.paths_URL_fromAPIcall[0]) {
    case "paginated-messages":
      data_pages_managed_obj.CONVOS = res.locals.data_to_be_paginated_and_served.slice(res.locals.startIndex, res.locals.endIndex)
      break;
    case "paginated-orders":
      data_pages_managed_obj.ORDERS = res.locals.data_to_be_paginated_and_served.slice(res.locals.startIndex, res.locals.endIndex)
      break;
    case "paginated-users":
      data_pages_managed_obj.USERS = res.locals.data_to_be_paginated_and_served.slice(res.locals.startIndex, res.locals.endIndex)
      break;
    case "paginated-articles":
      data_pages_managed_obj.ARTICLES = res.locals.data_to_be_paginated_and_served.slice(res.locals.startIndex, res.locals.endIndex)
      break;
    default:
      let error = new FirstPathNotRegistered(firstPath)
      return next(error)
      break;
  }




  // console.log("\n______________________________")
  res.status(200).json({
    srv_: data_pages_managed_obj,
  })
  
}
