

function seeData(req, res, next) {
  console.log("seeData...")

  console.log("____________________________\n\nreq.body.create_true_edit_false: \n\n")
  console.log(req.body.create_true_edit_false)

  // TODO !!!!! HERE based on the req.body.create_true_edit_false got to middlewares A or middlewares B


  // console.log("____________________________\n\nreq.body: \n\n")
  // console.log(req.body)

  // console.log("____________________________\n\nJSON.parse(req.body.nested_data_copy): \n\n")
  // console.log('\n\n', JSON.parse(req.body.nested_data_copy))

  // console.log("____________________________\n\nreq.files: \n\n")
  // console.log('\n\n', req.files)

  // // return res.status(200).end()

  // res.locals.nested_data = JSON.parse(req.body.nested_data_copy)
  
  return next()
}



// TEMPORAL COMMENTED OUT
// function setTheExcerptMiddleware(req, res, next) {
//   console.log("setTheExcerptMiddleware...")

//   let excerpt
//   let split_content = req.body.content.split(" ")
//   let split_excerpt = split_content.slice(0, 12)
//   excerpt = split_excerpt.join(" ")

//   req.body.excerpt = excerpt

//   return next()
// }


// TODO !!!! need to set an exerpt, and pull it from the nested_data_copy, on the back end and integrate it to the Article schema and save
// TODO !!!! need to add the category input on the front end and save it in the Article schema



const createArticlePOSTMiddleware = {
  seeData: seeData
}



module.exports = createArticlePOSTMiddleware