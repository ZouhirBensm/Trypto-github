const Article = require('../../models/articles-models/Article')
const ENV = require('../../config/base')






async function middleware1(req, res, next) {
  
  const urls = [
    {
      URL: '/',
      Display: `Home Page ${ENV.domain_without_protocol}`
    },
    {
      URL: '/sitemap/html-sitemap',
      Display: `HTML Sitemap ${ENV.domain_without_protocol}`
    },
  ];


  let articles

  try {
    articles = await Article.find().select("url h1 -_id")
  } catch (error) {
    return next(error)
  }


  if (!Array.isArray(articles) || !articles.length) {
    res.locals.urls = urls
    return next()
  }

  console.log(articles, "\n\n")



  for (let i = 0; i < articles.length; i++) {

    const article = articles[i];

    urls.push({ 
      URL: article.url,
      Display: article.h1
    })

  }

  res.locals.urls = urls

  console.log(res.locals.urls)
  
  return next()
}









// async function middleware2(req, res, next) {

//   return next()

// }



// async function middleware3(req, res, next) {

//   return next()
// }






const sitemapMiddleware2 = {
  middleware1: middleware1,
  // middleware2: middleware2,
  // middleware3: middleware3
}



module.exports = sitemapMiddleware2