let Parser = require('rss-parser');
let parser = new Parser();
const CATEGORY = require('../../../../full-stack-libs/Types/ArticleCategories');
const SOURCES = require('../../../../full-stack-libs/Types/ArticleSources');
const determineCategory = require('../third_party_articles_categories_matcher/third_party_articles_categories_matcher')

const { countWords, takeUntilWordNumber } = require('../../../../full-stack-libs/utils');





async function functionCoinJournalArticles(){

  try {
    feed = await parser.parseURL('https://coinjournal.net/news/tag/bitcoin/feed/');
  } catch (error) {
    return error
  }

  let MostRecentItems = feed.items.slice(0,5)

  // console.log("\n\n\MostRecentItems", MostRecentItems);
  let articlesFromCoinJournal = articalizeForBidBlock(MostRecentItems)

  // console.log("\n\n\articlesFromCoinJournal", articlesFromCoinJournal);
  return articlesFromCoinJournal
}

module.exports = {functionCoinJournalArticles}


function articalizeForBidBlock(_MostRecentItems){
  let articlesFromCoinJournal = _MostRecentItems.map(_item => {

    const excerpt_word_count = countWords(_item.contentSnippet)
    const excerpt_max_number_of_words = 12
    let excerpt = excerpt_word_count > excerpt_max_number_of_words ? takeUntilWordNumber(_item.contentSnippet, excerpt_max_number_of_words) + ' ...' : _item.contentSnippet

    // console.log('\n\n', _item.contentSnippet, "\n<->\n", excerpt)

    // console.log('\n\n', _item)

    const category = determineCategory(_item.categories)
    // console.log(category)

    const obj = {
      _id: ObjectId(),
      publishedDate: _item.isoDate,
      h1: _item.title,
      source: SOURCES.COINJOURNAL,
      content: _item.content,
      category: category,
      excerpt: excerpt,
      url: _item.link,
      enclosure: '/img/default-rss-enclosure-images/coinjournal.png'
    }

    // console.log("\n\nobj========", obj._id)

    return obj
  })
  return articlesFromCoinJournal
}



const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))



