const Article = require('../../models/articles-models/Article')

const {filterObject} = require('../../middleware/libs/match-maker-functions')

const CATEGORY = require('../../full-stack-libs/Types/ArticleCategories')
const {THIRD_PARTY_CATEGORIES} = require('../../full-stack-libs/utils.arrays')

const {functionArticleAggregator} = require('./libs/rss-article-aggregator/rss-article-aggregator')


module.exports = async (req,res,next)=>{

  let articles
  let filter_object
  filter_object = filterObject(null, req.query.category)

  if(req.query.category=="RECENT") {
    // Grab DB all articles 
    articles = await Article.find(filter_object)
    // + All third party articles
    let retrievedArticles = await functionArticleAggregator(THIRD_PARTY_CATEGORIES)

    articles = [...articles, ...retrievedArticles]

  } else if (THIRD_PARTY_CATEGORIES.includes(req.query.category)) {
    // Grab only third party articles
    let retrievedArticles = await functionArticleAggregator([req.query.category])
    articles = retrievedArticles

  } else {
    // Grab DB articles with the particular category requested
    articles = await Article.find(filter_object)
  }


  articles.sort(function compare(a, b) {
    var dateA = new Date(a.publishedDate);
    var dateB = new Date(b.publishedDate);
    return dateB - dateA;
  });
  
  
  

  res.locals.data_to_be_paginated_and_served = articles
  return next()
}