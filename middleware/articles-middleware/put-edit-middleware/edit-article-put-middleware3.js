const ArticleHeadTag = require('../../../models/articles-models/ArticleHeadTag')
const ArticleBodyHeader = require('../../../models/articles-models/ArticleBodyHeader')
const ArticleAbstract = require("../../../models/articles-models/ArticleAbstract")
const { ArticleNestedData } = require("../../../models/articles-models/ArticleNestedData")




async function editArticleHeadTagMiddleware(req, res, next) {
  console.log("editArticleHeadTagMiddleware...")



  try {
    const article_head_tag = await ArticleHeadTag.findById(res.locals.article.articleheadtag_id);

    if (!article_head_tag) {
      return res.status(404).json({ error: 'ArticleHeadTag not found' });
    }


    article_head_tag.meta_title = req.body.meta_title
    article_head_tag.meta_description = req.body.meta_description
    req.body.canonical ? article_head_tag.canonical = req.body.canonical : null
    article_head_tag.noindex = !!req.body.noindex
    article_head_tag.nofollow = !!req.body.nofollow
    

    res.locals.article_head_tag = article_head_tag

  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  return next()

}




async function editArticleBodyHeaderMiddleware(req, res, next) {
  console.log("editArticleBodyHeaderMiddleware...")

  try {
    const article_body_header = await ArticleBodyHeader.findById(res.locals.article.articlebodyheader_id);

    if (!article_body_header) {
      return res.status(404).json({ error: 'ArticleBodyHeader not found' });
    }


    article_body_header.keywords = JSON.parse(req.body.keywords)
    article_body_header.category = req.body.category
    

    res.locals.article_body_header = article_body_header

  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  return next()


}










async function editArticleAbstractMiddleware(req, res, next) {


  console.log("editArticleAbstractMiddleware...")



  try {
    const article_abstract = await ArticleAbstract.findById(res.locals.article.articleabstract_id);

    if (!article_abstract) {
      return res.status(404).json({ error: 'ArticleAbstract not found' });
    }

    article_abstract.abstract_name_type = req.body.abstract_name_type
    article_abstract.abstract_points = JSON.parse(req.body.abstract_points)
    

    res.locals.article_abstract = article_abstract
    
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  return next()

}

















async function editArticleNestedDatatMiddleware2(req, res, next) {
  console.log("editArticleNestedDatatMiddleware2...");


  try {
    const article_nested_data = await ArticleNestedData.findById(res.locals.article.articlenesteddata_id);

    if (!article_nested_data) {
      return res.status(404).json({ error: 'ArticleNestedData not found' });
    }

    article_nested_data.content_structure = JSON.parse(req.body.content_structure)
    article_nested_data.blocks = res.locals.ARR_mongoose_Blocks,
    
    res.locals.article_nested_data = article_nested_data
    
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  return next()

}
















const editArticlePUTMiddleware3 = {
  editArticleHeadTagMiddleware: editArticleHeadTagMiddleware,
  editArticleBodyHeaderMiddleware: editArticleBodyHeaderMiddleware,
  editArticleAbstractMiddleware: editArticleAbstractMiddleware,

  editArticleNestedDatatMiddleware2: editArticleNestedDatatMiddleware2,
}



module.exports = editArticlePUTMiddleware3