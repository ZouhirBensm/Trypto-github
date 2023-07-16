const Article = require('../../models/articles-models/Article')

const {filterObject} = require('../../middleware/libs/match-maker-functions')

const CATEGORY = require('../../full-stack-libs/Types/ArticleCategories')
const {THIRD_PARTY_SOURCES} = require('../../full-stack-libs/utils.arrays')

const {functionArticleAggregator} = require('./libs/rss-article-aggregator/rss-article-aggregator')
const SOURCES = require('../../full-stack-libs/Types/ArticleSources')



async function middleware0(req,res,next) {
  setTimeout(()=>{return next()}, 60000)
}


async function middleware1(req,res,next) {

  


  
  let filter_category = req.query.category ? req.query.category : undefined
  let filter_source = req.query.source ? req.query.source : undefined
  
  let filter_object
  filter_object = filterObject(undefined, req.query.category, req.query.source)
  console.log(filter_object)
  res.locals.filter_object = filter_object

  



  let articles
  
  

  // ALL MY ARTICLES!
  articles = await Article.find(filter_object)
  .populate({
    // Populate protagonists
    path: "articleenclosureimage_id",
    // Fields allowed to populate with
    select: "path image.name -_id",
  })


  
    console.log('articles:\n\n', articles)
  
    // console.log(articles[0].articleenclosureimage_id?.image)
    // console.log(articles[0].articleheadtag_id)

  res.locals.articles = articles




  return next()

}





async function middleware2(req,res,next) {

  if (res.locals.filter_object?.source == SOURCES.BIDBLOCK) {
    return next()
  }


  // THIRD PARTY ARTICLES!
  let retrievedArticles = []

  
  retrievedArticles = await functionArticleAggregator(THIRD_PARTY_SOURCES)
  
  
  if(!res.locals.filter_object?.category) {
    
    // NO CATEGORY SO TAKE ALL
    res.locals.articles = [...res.locals.articles, ...retrievedArticles]

  } else {

    // FILTER CATEGORY ON THIRD PARTY ARTICLES
    retrievedArticles = retrievedArticles.filter(retrievedArticle => {return retrievedArticle.category == res.locals.filter_object.category})

    res.locals.articles = [...res.locals.articles, ...retrievedArticles]

  }





  
  
  // console.log("\n____________________\n\narticlesRetrievalMiddleware->  articles:\n\n",  articles)

  return next()
}


async function middleware3(req,res,next) {

  res.locals.articles.sort(function compare(a, b) {
    var dateA = new Date(a.publishedDate);
    var dateB = new Date(b.publishedDate);
    return dateB - dateA;
  });

  return next()

}


async function middleware4(req,res,next) {
  if (res.locals.filter_object?.source == SOURCES.BIDBLOCK) {
    return next()
  }

  res.locals.articles.sort(function compare(a, b) {
    var sourceA = a.source;
    var sourceB = b.source;
  
    if(sourceA == SOURCES.BIDBLOCK && sourceB != SOURCES.BIDBLOCK) return -1;
    return 1
  });

  return next()
}









async function middleware5(req,res,next) {

  res.locals.data_to_be_paginated_and_served = res.locals.articles
  return next()
}


module.exports = {
  middleware0,
  middleware1,
  middleware2,
  middleware3,
  middleware4,
  middleware5,
}