const Article = require('../../models/articles-models/Article')

const {filterObject2} = require('../../middleware/libs/match-maker-functions')

module.exports = async (req,res,next)=>{
  console.log("\n_______________\n")
  console.log("in articlesRetrievalMiddleware: ",res.locals.page, res.locals.limit, res.locals.startIndex, res.locals.endIndex, {user: res.locals.user})

  console.log("CATEGORY ON THE SERVER BEFORE QUERY IS: ", req.query.category)

  let filter_object = filterObject2(req.query.category)

  let articles = await Article.find(filter_object)

  // console.log({articles})

  res.locals.data_to_be_paginated_and_served = articles

  console.log("in articlesRetrievalMiddleware: ", res.locals.data_to_be_paginated_and_served)

  console.log("\n______________________________")
  next()
}