const Article = require('../../models/articles-models/Article')
const {THIRD_PARTY_SOURCES} = require('../../full-stack-libs/utils.arrays')

const {functionArticleAggregator} = require('./libs/rss-article-aggregator/rss-article-aggregator')


module.exports = async (req,res,next)=>{

  let articles

  articles = await Article.find()
  // + All third party articles
  let retrievedArticles = await functionArticleAggregator(THIRD_PARTY_SOURCES)

  articles = [...articles, ...retrievedArticles]


  
  articles.sort(function compare(a, b) {
    var dateA = new Date(a.publishedDate);
    var dateB = new Date(b.publishedDate);
    return dateB - dateA;
  });
  
  // console.log(articles)

  res.locals.data_to_be_served = articles.slice(0, 5)
  return next()
}