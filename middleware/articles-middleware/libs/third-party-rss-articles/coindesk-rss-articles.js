let Parser = require('rss-parser');
let parser = new Parser();
const CATEGORY = require('../../../../full-stack-libs/Types/ArticleCategories');





async function functionCoinDeskArticles(){
  feed = await parser.parseURL('https://www.coindesk.com/arc/outboundfeeds/rss/');

  let MostRecentItems = feed.items.slice(0,5)

  // console.log("\n\n\MostRecentItems", MostRecentItems);
  let articlesFromCoinDesk = articalizeForBidBlock(MostRecentItems)

  // console.log("\n\n\articlesFromCoinDesk", articlesFromCoinDesk);
  return articlesFromCoinDesk
}

module.exports = {functionCoinDeskArticles}


function articalizeForBidBlock(_MostRecentItems){
  let articlesFromCoinDesk = _MostRecentItems.map(_item => {
    return {
      _id: ObjectId(),
      publishedDate: _item.isoDate,
      title: _item.title,
      content: _item.content,
      category: CATEGORY.COINDESK,
      excerpt: _item.contentSnippet,
      link: _item.link,
      enclosure: '../img/default-rss-enclosure-images/coindesk.png'
    }
  })
  return articlesFromCoinDesk
}


const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))



