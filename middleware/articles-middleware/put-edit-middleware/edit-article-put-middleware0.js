const Article = require("../../../models/articles-models/Article")
const ArticleEnclosureImage = require("../../../models/articles-models/ArticleEnclosureImage")




async function editArticleMiddleware(req, res, next) {
  console.log("editArticleInstanceMiddleware...")


  try {
    // Step 3: Find the article in the database

    const article = await Article.findById(req.query.articleID_to_preload_4_edit);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    
    // TODO !!!!! need to set up article sitemap update options from front end to sitemap
    // TODO !!!!! also don't forget to set the update date time on the site map
    
    article.h1 = req.body.h1
    article.html_title = req.body.html_title
    article.category = req.body.category
    article.url = req.body.url
    // Stays witten by the initial writter
    // article.author_id = req.body.author_id
    
    res.locals.article = article

  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Internal server error' });
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
      return res.status(404).json({ error: 'ArticleEnclosureImage not found' });
    }

    
    article_enclosure.banner_image_originalname = req.body.banner_image_name
    article_enclosure.banner_img_alt = req.body.banner_img_alt
    
    res.locals.article_enclosure = article_enclosure

  } catch (error) {
    console.error('Error updating article_enclosure:', error);
    res.status(500).json({ error: 'Internal server error' });
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