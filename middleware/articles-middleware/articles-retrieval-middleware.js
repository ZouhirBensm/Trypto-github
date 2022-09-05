const Article = require('../../models/articles-models/Article')

module.exports = async (req,res,next)=>{
  console.log("\n_______________\n")
  console.log("in articlesRetrievalMiddleware: ",res.locals.page, res.locals.limit, res.locals.startIndex, res.locals.endIndex, {user: res.locals.user})



  let articles = await Article.find()

  console.log({articles})

  res.locals.data_to_be_paginated_and_served = articles

  console.log("in articlesRetrievalMiddleware: ", res.locals.data_to_be_paginated_and_served)

  console.log("\n______________________________")
  next()
}