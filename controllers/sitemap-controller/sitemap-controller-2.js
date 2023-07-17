const ENV = require('../../config/base')


async function controller1(req, res, next) {
  res.locals.head = 3

  res.locals.html_title = `${ENV.domain_without_protocol}'s HTML Sitemap links for Blog`
  res.locals.category = 'HTML Sitemap'
  res.locals.meta_title = `${ENV.domain_without_protocol}'s HTML Sitemap links for Blog`
  res.locals.meta_description = `${ENV.domain_without_protocol}'s Page that disposes of all the Blog article links`
  res.locals.canonical = "/sitemap/html-sitemap"
  

  res.render('bodies/bidblock-articles-html-sitemap')
}







const sitemapController2 = {
  controller1: controller1,
}



module.exports = sitemapController2