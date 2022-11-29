const {functionBitcoinMagazineArticles} = require('../third-party-rss-articles/bitcoin-magazine-rss-articles')
const {functionCoinDeskArticles} = require('../third-party-rss-articles/coindesk-rss-articles')
const {functionCoinJournalArticles} = require('../third-party-rss-articles/coinjournal-rss-articles')
const CATEGORY = require('../../../../full-stack-libs/Types/ArticleCategories')

async function functionArticleAggregator(ARRAY_OF_NEEDED){
  let aggregated_array_of_all_articles = []

  let articlesFromBitcoinMagazine  = await functionBitcoinMagazineArticles()
  let articlesFromCoinDesk  = await functionCoinDeskArticles()
  let articlesFromCoinJournal  = await functionCoinJournalArticles()
  



  ARRAY_OF_NEEDED.forEach(third_party_category => {
    switch (third_party_category) {
      case CATEGORY.BITCOIN_MAGAZINE:
        aggregated_array_of_all_articles = [...aggregated_array_of_all_articles, ...articlesFromBitcoinMagazine]
        break;
      case CATEGORY.COINDESK:
        aggregated_array_of_all_articles = [...aggregated_array_of_all_articles, ...articlesFromCoinDesk]
        break;
      case CATEGORY.COINJOURNAL:
        aggregated_array_of_all_articles = [...aggregated_array_of_all_articles, ...articlesFromCoinJournal]
        break;
      default:
        break;
    }
  });



  return aggregated_array_of_all_articles
}

module.exports = {functionArticleAggregator}