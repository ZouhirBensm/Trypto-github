// deploy 123456789
const fs = require('fs');
const createSiteMap = require('../../full-stack-libs/utils.sitemap')
const Article = require('../../models/articles-models/Article')






async function middleware1(req, res, next) {
  // TEMPORAL
  const now = new Date()

  const urls = [
    {
      URL: '/',
      lastmod: now, // TODO !!! Need to figure out when to update this and onto what date time
      changefreq: "weekly",
      priority: 1
    },
    {
      URL: '/sitemap/html-sitemap',
      lastmod: now, // TODO !!! Need to figure out when to update this and onto what date time
      changefreq: "weekly",
      priority: 1
    },
    {
      URL: '/articles',
      lastmod: now, // TODO !!! Need to figure out when to update this and onto what date time
      changefreq: "monthly",
      priority: 0.5
    },
    {
      URL: '/subscription',
      lastmod: now, // TODO !!! Need to figure out when to update this and onto what date time
      changefreq: "monthly",
      priority: 1
    },
    {
      URL: '/users/login',
      lastmod: now, // TODO !!! Need to figure out when to update this and onto what date time
      changefreq: "monthly",
      priority: 0.5
    },
    {
      URL: '/users/forgotpasswordpage',
      lastmod: now, // TODO !!! Need to figure out when to update this and onto what date time
      changefreq: "monthly",
      priority: 0.5
    },
  ];


  let articles

  try {
    articles = await Article.find().select("url publishedDate updateDate -_id")
  } catch (error) {
    return next(error)
  }

  console.log("new!---->articles!\b", articles)
  // return res.status(200).end()

  if (!Array.isArray(articles) || !articles.length) {
    res.locals.urls = urls
    return next()
  }

  // console.log(articles, "\n\n")

  for (let i = 0; i < articles.length; i++) {

    const article = articles[i];
    urls.push({ 
      URL: article.url, 
      lastmod: article.updateDate || article.publishedDate, 
      changefreq: article.changefreq, 
      priority: 1.0 
    })

  }

  res.locals.urls = urls
  return next()

}






async function middleware2(req, res, next) {
  
  // console.log(urls, "\n\n")

  const xml = createSiteMap(res.locals.urls)

  // console.log(xml)
  res.locals.xml = xml
  
  return next()
}







async function middleware3(req, res, next) {
  try {
    fs.writeFileSync('./public/sitemap/sitemap.xml', res.locals.xml, 'utf-8');
    console.log('File written successfully');
  } catch (error) {
    return next(error)
  }

  return next()

}



// async function middleware3(req, res, next) {

//   return next()
// }






const sitemapMiddleware = {
  middleware1: middleware1,
  middleware2: middleware2,
  middleware3: middleware3
}



module.exports = sitemapMiddleware