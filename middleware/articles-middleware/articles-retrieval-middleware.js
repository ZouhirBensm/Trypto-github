const Article = require('../../models/articles-models/Article')

const {filterObject} = require('../../middleware/libs/match-maker-functions')

const CATEGORY = require('../../full-stack-libs/Types/ArticleCategories')
const {THIRD_PARTY_SOURCES} = require('../../full-stack-libs/utils.arrays')

const {functionArticleAggregator} = require('./libs/rss-article-aggregator/rss-article-aggregator')
const SOURCES = require('../../full-stack-libs/Types/ArticleSources')


module.exports = async (req,res,next)=>{

  let articles
  let filter_object
  filter_object = filterObject(null, req.query.category)

  let retrievedArticles = await functionArticleAggregator(THIRD_PARTY_SOURCES)

  console.log(filter_object)
  articles = await Article.find(filter_object)
  .populate({
    // Populate protagonists
    path: "articleenclosureimage_id",
    // Fields allowed to populate with
    select: "path image.name -_id",
  })



  // console.log('articles:\n\n', articles)

  // console.log(articles[0].articleenclosureimage_id?.image)
  // console.log(articles[0].articleheadtag_id)

  if(req.query.category=="RECENT") {
    articles = [...articles, ...retrievedArticles]

  } else {
    retrievedArticles = retrievedArticles.filter(retrievedArticle => {return retrievedArticle.category == filter_object.category})

    articles = [...articles, ...retrievedArticles]

  }


  articles.sort(function compare(a, b) {
    var dateA = new Date(a.publishedDate);
    var dateB = new Date(b.publishedDate);
    return dateB - dateA;
  });

  articles.sort(function compare(a, b) {
    var sourceA = a.source;
    var sourceB = b.source;

    if(sourceA == SOURCES.BIDBLOCK && sourceB != SOURCES.BIDBLOCK) return -1;
    return 1
  });
  
  
  // console.log("\n____________________\n\narticlesRetrievalMiddleware->  articles:\n\n",  articles)

  res.locals.data_to_be_paginated_and_served = articles
  return next()
}