let Parser = require('rss-parser');
let parser = new Parser();
const CATEGORY = require('../../../../full-stack-libs/Types/ArticleCategories');
const SOURCES = require('../../../../full-stack-libs/Types/ArticleSources');

const determineCategory = require('../third_party_articles_categories_matcher/third_party_articles_categories_matcher')

const { countWords, takeUntilWordNumber } = require('../../../../full-stack-libs/utils');
// let feed

// KEPT FOR REFERENCE
(async () => {


  // feed.items.forEach((item) => {
  //   console.log(item.title);
  // });
})();



async function functionBitcoinMagazineArticles(){
  try {
    feed = await parser.parseURL('https://bitcoinmagazine.com/.rss/full/');
  } catch (error) {
    return error
  }

  let MostRecentItems = feed.items.slice(0,5)
  let articlesFromBitcoinMagazine = articalizeForBidBlock(MostRecentItems)
  return articlesFromBitcoinMagazine
}

module.exports = {functionBitcoinMagazineArticles}



function articalizeForBidBlock(_MostRecentItems){
  let articlesFromBitcoinMagazine = _MostRecentItems.map(_item => {


    const excerpt_word_count = countWords(_item.contentSnippet)
    const excerpt_max_number_of_words = 12
    let excerpt = excerpt_word_count > excerpt_max_number_of_words ? takeUntilWordNumber(_item.contentSnippet, excerpt_max_number_of_words) + ' ...' : _item.contentSnippet

    // console.log('\n\n', _item.contentSnippet, "\n<->\n", excerpt)
    // console.log("_item.enclosure.url: \n", _item.enclosure.url)

    const _itemEnclosureUrl = _item.enclosure.url.replace('http://', 'https://')
    // console.log("_itemEnclosureUrl: \n", _itemEnclosureUrl)

    // console.log('\n\n', _item.categories)

    const category = determineCategory(_item.categories)
    // console.log(category)

    return {
      _id: ObjectId(),
      publishedDate: _item.isoDate,
      h1: _item.title,
      source: SOURCES.BITCOIN_MAGAZINE,
      content: _item.content,
      category: category,
      excerpt: excerpt,
      url: _item.link,
      enclosure: _itemEnclosureUrl
    }
  })
  return articlesFromBitcoinMagazine
}





const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))



