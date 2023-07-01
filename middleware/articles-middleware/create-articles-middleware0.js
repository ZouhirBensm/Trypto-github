const Article = require("../../models/articles-models/Article")
const ArticleEnclosureImage = require("../../models/articles-models/ArticleEnclosureImage")




function setArticleURLMiddleware(req, res, next) {

  // TODO !!! put in libs and call upon globally
  const path_from_h1 = req.body.h1.toLowerCase()
    .replace(/[^\w\s]|_/g, '') // Remove punctuation
    .replace(/\s+/g, '-'); // add dashes

  // console.log(path_from_h1);

  req.body.url = `/articles/individual_article/${path_from_h1}`

  return next()
}





async function createArticleInstanceMiddleware(req, res, next) {
  console.log("createArticleInstanceMiddleware...")

  let ret_article_instance

  ret_article_instance = new Article({
    h1: req.body.h1,
    html_title: req.body.html_title,
    category: req.body.category,
    url: req.body.url,
    author_id: req.session.userId
  })

  // RENDER Article GLOBAL
  res.locals.ret_article_instance = ret_article_instance

  return next()

}


async function createArticleEnclosureImageInstanceMiddleware(req, res, next) {


  console.log("createArticleInstanceMiddleware...")

  let ret_article_enclosure_image_instance

  ret_article_enclosure_image_instance = new ArticleEnclosureImage({
    // image: res.locals.image,
    banner_image_originalname: req.body.banner_image_name,
    banner_img_alt: req.body.banner_img_alt,
    article_id: res.locals.ret_article_instance._id,  // ATTACH TO ArticleEnclosureImage -> Article
  })

  res.locals.ret_article_instance.articleenclosureimage_id = ret_article_enclosure_image_instance._id // ATTACH TO Article -> ArticleEnclosureImage


  // RENDER ArticleEnclosureImage GLOBAL
  res.locals.ret_article_enclosure_image_instance = ret_article_enclosure_image_instance

  return next()

}





const createArticlesMiddleware0 = {
  setArticleURLMiddleware: setArticleURLMiddleware,
  createArticleInstanceMiddleware: createArticleInstanceMiddleware,
  createArticleEnclosureImageInstanceMiddleware: createArticleEnclosureImageInstanceMiddleware
}



module.exports = createArticlesMiddleware0