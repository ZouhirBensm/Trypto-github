const {functionBitcoinMagazineArticles} = require('../third-party-rss-articles/bitcoin-magazine-rss-articles')
const {functionCoinDeskArticles} = require('../third-party-rss-articles/coindesk-rss-articles')
const {functionCoinJournalArticles} = require('../third-party-rss-articles/coinjournal-rss-articles')
const CATEGORY = require('../../../../full-stack-libs/Types/ArticleCategories')
const SOURCES = require('../../../../full-stack-libs/Types/ArticleSources')

const { isIterable } = require('../../../../full-stack-libs/utils')

async function functionArticleAggregator(ARRAY_OF_NEEDED){
  let aggregated_array_of_all_articles = []

  let articlesFromBitcoinMagazine, articlesFromCoinDesk, articlesFromCoinJournal
  
  try {
    articlesFromBitcoinMagazine  = await functionBitcoinMagazineArticles()
    articlesFromCoinDesk  = await functionCoinDeskArticles()
    articlesFromCoinJournal  = await functionCoinJournalArticles()
  } catch (error) {
    return error
  }

  // console.log(articlesFromCoinJournal)
  



  ARRAY_OF_NEEDED.forEach(third_party_source => {
    switch (third_party_source) {
      case SOURCES.BITCOIN_MAGAZINE:
        aggregated_array_of_all_articles = [
          ...aggregated_array_of_all_articles,
          ...(isIterable(articlesFromCoinJournal) ? articlesFromCoinJournal : [])
        ];
        
        break;
      case SOURCES.COINDESK:
        aggregated_array_of_all_articles = [
          ...aggregated_array_of_all_articles,
          ...(isIterable(articlesFromCoinDesk) ? articlesFromCoinDesk : [])
        ];
        break;
      case SOURCES.COINJOURNAL:
        aggregated_array_of_all_articles = [
          ...aggregated_array_of_all_articles,
          ...(isIterable(articlesFromCoinJournal) ? articlesFromCoinJournal : [])
        ];
        break;
      default:
        break;
    }
  });



  return aggregated_array_of_all_articles
}

module.exports = {functionArticleAggregator}