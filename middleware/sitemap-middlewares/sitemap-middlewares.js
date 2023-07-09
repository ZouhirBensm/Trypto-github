const fs = require('fs');
const createSiteMap = require('../../full-stack-libs/utils.sitemap')
const Article = require('../../models/articles-models/Article')






async function middleware1(req, res, next) {
  // TEMPORAL
  const now = new Date()

  const urls = [
    {
      URL: '/',
      // TODO !!!! sitemap needs reflect the last update field after crud functions implemented
      lastmod: now,
      changefreq: "hourly",
      priority: 0.5
    },
    // TODO !!!! add html sitemap page
    // {
    //   URL: '/sub/html-sitemap',
    //   lastmod: now,
    //   changefreq: "hourly",
    //   priority: 1
    // },
  ];


  let articles

  try {
    articles = await Article.find().select("url -_id")
  } catch (error) {
    return next(error)
  }

  if (!Array.isArray(articles) || !articles.length) {
    let message = 'No articles in DB'
    res.status(500).send(message)
  }

  // console.log(articles, "\n\n")

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    urls.push({ URL: article.url, lastmod: now, changefreq: "hourly", priority: 1.0 })
  }



  // console.log(urls, "\n\n")

  const xml = createSiteMap(urls)

  // console.log(xml)
  res.locals.xml = xml
  
  return next()
}









async function middleware2(req, res, next) {
  try {
    fs.writeFileSync('./public/sitemap/sitemap.xml', res.locals.xml, 'utf-8');
    console.log('File written successfully');
  } catch (error) {
    return next(error)
  }

  return next()

}



async function middleware3(req, res, next) {

  return next()
}






const sitemapMiddleware = {
  middleware1: middleware1,
  middleware2: middleware2,
  middleware3: middleware3
}



module.exports = sitemapMiddleware