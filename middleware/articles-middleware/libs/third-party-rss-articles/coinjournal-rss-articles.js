let Parser = require('rss-parser');
let parser = new Parser();
const CATEGORY = require('../../../../full-stack-libs/Types/ArticleCategories');





async function functionCoinJournalArticles(){
  feed = await parser.parseURL('https://coinjournal.net/news/tag/bitcoin/feed/');

  let MostRecentItems = feed.items.slice(0,5)

  // console.log("\n\n\MostRecentItems", MostRecentItems);
  let articlesFromCoinJournal = articalizeForBidBlock(MostRecentItems)

  // console.log("\n\n\articlesFromCoinJournal", articlesFromCoinJournal);
  return articlesFromCoinJournal
}

module.exports = {functionCoinJournalArticles}


function articalizeForBidBlock(_MostRecentItems){
  let articlesFromCoinJournal = _MostRecentItems.map(_item => {
    return {
      _id: ObjectId(),
      publishedDate: _item.isoDate,
      title: _item.title,
      content: _item.content,
      category: CATEGORY.COINJOURNAL,
      excerpt: _item.contentSnippet,
      link: _item.link
    }
  })
  return articlesFromCoinJournal
}


const ObjectId = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))



