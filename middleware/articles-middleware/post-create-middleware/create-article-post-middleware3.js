const ArticleHeadTag = require('../../../models/articles-models/ArticleHeadTag')
const ArticleBodyHeader = require('../../../models/articles-models/ArticleBodyHeader')
const ArticleAbstract = require("../../../models/articles-models/ArticleAbstract")
const { ArticleNestedData } = require("../../../models/articles-models/ArticleNestedData")




async function createArticleHeadTagInstanceMiddleware(req, res, next) {
  console.log("createArticleHeadTagInstanceMiddleware...")

  let ret_article_head_tag_instance

  ret_article_head_tag_instance = new ArticleHeadTag({
    meta_title: req.body.meta_title,
    meta_description: req.body.meta_description,
    // [req.body.canonical? 'canonical' : null]: req.body.canonical,
    canonical: req.body.canonical ? req.body.canonical : req.body.url,
    // TODO !!!!! Debug what is going on here?? .. might need to set like canonical
    [req.body.noindex ? 'noindex' : null]: req.body.noindex, // not required and defaults to false
    [req.body.nofollow ? 'nofollow' : null]: req.body.nofollow, // not required and defaults to false
    article_id: res.locals.ret_article_instance._id // ATTACH TO ArticleHeadTag -> Article
  })


  res.locals.ret_article_instance.articleheadtag_id = ret_article_head_tag_instance._id // ATTACH TO Article -> ArticleHeadTag


  // RENDER ArticleHeadTag GLOBAL
  res.locals.ret_article_head_tag_instance = ret_article_head_tag_instance

  return next()
}




async function createArticleBodyHeaderInstanceMiddleware(req, res, next) {
  console.log("createArticleBodyHeaderInstanceMiddleware...")

  let ret_article_body_header_instance

  ret_article_body_header_instance = new ArticleBodyHeader({
    keywords: JSON.parse(req.body.keywords),
    category: req.body.category,
    article_id: res.locals.ret_article_instance._id // ATTACH TO ArticleBodyHeader -> Article
  })

  res.locals.ret_article_instance.articlebodyheader_id = ret_article_body_header_instance._id // ATTACH TO Article -> ArticleBodyHeader


  // RENDER ArticleHeadTag GLOBAL
  res.locals.ret_article_body_header_instance = ret_article_body_header_instance

  return next()
}










async function createArticleAbstractMiddleware(req, res, next) {


  console.log("createArticleAbstractMiddleware...")

  let ret_article_abstract_instance

  ret_article_abstract_instance = new ArticleAbstract({
    abstract_name_type: req.body.abstract_name_type,
    abstract_points: JSON.parse(req.body.abstract_points),
    article_id: res.locals.ret_article_instance._id,  // ATTACH TO ArticleAbstract -> Article
  })


  res.locals.ret_article_instance.articleabstract_id = ret_article_abstract_instance._id // ATTACH TO Article -> ArticleAbstract


  // RENDER ArticleAbstract GLOBAL
  res.locals.ret_article_abstract_instance = ret_article_abstract_instance

  return next()

}









async function createArticleNestedDatatMiddleware2(req, res, next) {
  console.log("createArticleNestedDatatMiddleware2...");

  // console.log('\n\n________________\nARR_mongoose_Blocks-->\n', res.locals.ARR_mongoose_Blocks);

  let ret_article_nested_data_instance;

  ret_article_nested_data_instance = new ArticleNestedData({
    content_structure: JSON.parse(req.body.content_structure),
    blocks: res.locals.ARR_mongoose_Blocks,
    article_id: res.locals.ret_article_instance._id
  });




  res.locals.ret_article_instance.articlenesteddata_id = ret_article_nested_data_instance._id;

  res.locals.ret_article_nested_data_instance = ret_article_nested_data_instance;

  return next();
}
















const createArticlePOSTMiddleware3 = {
  createArticleHeadTagInstanceMiddleware: createArticleHeadTagInstanceMiddleware,
  createArticleBodyHeaderInstanceMiddleware: createArticleBodyHeaderInstanceMiddleware,
  createArticleAbstractMiddleware: createArticleAbstractMiddleware,

  createArticleNestedDatatMiddleware2: createArticleNestedDatatMiddleware2,
}



module.exports = createArticlePOSTMiddleware3