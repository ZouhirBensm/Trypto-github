const Article = require("../../../models/articles-models/Article")
const ArticleEnclosureImage = require("../../../models/articles-models/ArticleEnclosureImage")




async function editArticleInstanceMiddleware(req, res, next) {
  console.log("editArticleInstanceMiddleware...")


  try {
    // Step 3: Find the article in the database
    const article = await Article.findById(req.query.articleID_to_preload_4_edit);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.locals.article = article

    // TODO !!!!! need to set up article sitemap update options from front end to sitemap
    // TODO !!!!! also don't forget to set the update date time on the site map

    article.h1 = req.body.h1
    article.html_title = req.body.html_title
    article.category = req.body.category
    article.url = req.body.url
    // Stays witten by the initial writter
    // article.author_id = req.body.author_id

    // Save the updated article
    await article.save();
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
  return next()

}






async function editArticleEnclosureImageMiddleware(req, res, next) {


  console.log("editArticleEnclosureImageMiddleware...")


  try {
    const article_enclosure = await ArticleEnclosureImage.findById(res.locals.article.articleenclosureimage_id);

    if (!article_enclosure) {
      return res.status(404).json({ error: 'ArticleEnclosureImage not found' });
    }

    res.locals.article_enclosure = article_enclosure

    article_enclosure.banner_image_originalname = req.body.banner_image_originalname
    article_enclosure.banner_img_alt = req.body.banner_img_alt
    

    await article_enclosure.save();
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
  return next()
}





const editArticlePUTMiddleware0 = {
  editArticleInstanceMiddleware: editArticleInstanceMiddleware,
  editArticleEnclosureImageMiddleware: editArticleEnclosureImageMiddleware
}



module.exports = editArticlePUTMiddleware0