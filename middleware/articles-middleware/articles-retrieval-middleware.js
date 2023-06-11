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

  if(req.query.category=="RECENT") {
    // Grab DB all articles 
    articles = await Article.find(filter_object)
    // + All third party articles

    articles = [...articles, ...retrievedArticles]

  } else {
    // Grab DB articles with the particular category requested
    console.log(filter_object)
    articles = await Article.find(filter_object)

    // console.log(retrievedArticles)

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
  
  
  

  res.locals.data_to_be_paginated_and_served = articles
  return next()
}