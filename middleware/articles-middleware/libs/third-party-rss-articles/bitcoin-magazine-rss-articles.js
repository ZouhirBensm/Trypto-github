let Parser = require('rss-parser');
let parser = new Parser();
const CATEGORY = require('../../../../full-stack-libs/Types/ArticleCategories');
// let feed

// KEPT FOR REFERENCE
(async () => {


  // feed.items.forEach((item) => {
  //   console.log(item.title);
  // });
})();



async function functionBitcoinMagazineArticles(){
  feed = await parser.parseURL('https://bitcoinmagazine.com/.rss/full/');

  let MostRecentItems = feed.items.slice(0,5)

  // console.log("\n\n\MostRecentItems", MostRecentItems);
  let articlesFromBitcoinMagazine = articalizeForBidBlock(MostRecentItems)

  // console.log("\n\n\narticlesFromBitcoinMagazine", articlesFromBitcoinMagazine);
  return articlesFromBitcoinMagazine
}

module.exports = {functionBitcoinMagazineArticles}

function articalizeForBidBlock(_MostRecentItems){
  let articlesFromBitcoinMagazine = _MostRecentItems.map(_item => {
    return {
      _id: ObjectId(),
      publishedDate: _item.isoDate,
      title: _item.title,
      content: _item.content,
      category: CATEGORY.BITCOIN_MAGAZINE,
      excerpt: _item.contentSnippet,
      link: _item.link
    }
  })
  return articlesFromBitcoinMagazine
}


const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))



