const Article = require("../../../models/articles-models/Article")
const ArticleEnclosureImage = require("../../../models/articles-models/ArticleEnclosureImage")

const { EditArticleError } = require('../../../custom-errors/custom-errors')


async function editArticleMiddleware(req, res, next) {
  console.log("editArticleInstanceMiddleware...")


  try {
    // Step 3: Find the article in the database

    const article = await Article.findById(req.query.articleID_to_preload_4_edit);
    
    if (!article) {
      let error = new EditArticleError(`Article not found`, 404)
      return next(error)
    }

    
    // TODO !!!!! need to set up article sitemap update options from front end to sitemap
    // TODO !!!!! also don't forget to set the update date time on the site map
    
    let now = new Date()

    article.h1 = req.body.h1
    article.html_title = req.body.html_title
    article.category = req.body.category
    article.url = req.body.url
    article.updateDate = now
    // Stays witten by the initial writter
    // article.author_id = req.body.author_id
    
    res.locals.article = article

  } catch (e) {
    let error = new EditArticleError(`Error updating article, Internal server error: ${e.message}`)
    return next(error)
  }

  // PATH of all the images in the article's content
  res.locals.article_content_images = `public/img/bidblock-article-images/per-article-folders-for-images/${res.locals.article._id}`
  
  return next()

}






async function editArticleEnclosureImageMiddleware(req, res, next) {


  console.log("editArticleEnclosureImageMiddleware...")


  try {
    const article_enclosure = await ArticleEnclosureImage.findById(res.locals.article.articleenclosureimage_id);

    if (!article_enclosure) {
      let error = new EditArticleError(`ArticleEnclosureImage not found`, 404)
      return next(error)
    }

    
    article_enclosure.banner_image_originalname = req.body.banner_image_name
    article_enclosure.banner_img_alt = req.body.banner_img_alt
    
    res.locals.article_enclosure = article_enclosure

  } catch (e) {
    let error = new EditArticleError(`Error updating article, Internal server error: ${e.message}`)
    return next(error)
  }

    // PATH contains the file to delete
    res.locals.enclosure_image_path = `public/${res.locals.article_enclosure.path}`


  
  return next()
}





const editArticlePUTMiddleware0 = {
  editArticleMiddleware: editArticleMiddleware,
  editArticleEnclosureImageMiddleware: editArticleEnclosureImageMiddleware
}



module.exports = editArticlePUTMiddleware0