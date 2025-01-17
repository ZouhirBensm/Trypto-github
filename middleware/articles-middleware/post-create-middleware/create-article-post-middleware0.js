const Article = require("../../../models/articles-models/Article")
const ArticleEnclosureImage = require("../../../models/articles-models/ArticleEnclosureImage")







async function createArticleInstanceMiddleware(req, res, next) {
  console.log("createArticleInstanceMiddleware...")

  let article

  article = new Article({
    h1: req.body.h1,
    html_title: req.body.html_title,
    changefreq: req.body.changefreq,
    category: req.body.category,
    url: req.body.url,
    author_id: req.session.userId
  })

  // RENDER Article GLOBAL
  res.locals.article = article

  return next()

}


async function createArticleEnclosureImageInstanceMiddleware(req, res, next) {


  console.log("createArticleInstanceMiddleware...")

  let article_enclosure

  article_enclosure = new ArticleEnclosureImage({
    // image: res.locals.image,
    banner_image_originalname: req.body.banner_image_name,
    banner_img_alt: req.body.banner_img_alt,
    article_id: res.locals.article._id,  // ATTACH TO ArticleEnclosureImage -> Article
  })

  res.locals.article.articleenclosureimage_id = article_enclosure._id // ATTACH TO Article -> ArticleEnclosureImage


  // RENDER ArticleEnclosureImage GLOBAL
  res.locals.article_enclosure = article_enclosure

  return next()

}





const createArticlePOSTMiddleware0 = {
  createArticleInstanceMiddleware: createArticleInstanceMiddleware,
  createArticleEnclosureImageInstanceMiddleware: createArticleEnclosureImageInstanceMiddleware
}



module.exports = createArticlePOSTMiddleware0