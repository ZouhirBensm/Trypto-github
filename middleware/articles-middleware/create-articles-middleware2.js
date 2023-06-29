const Article = require("../../models/articles-models/Article")
const ArticleHeadTag = require('../../models/articles-models/ArticleHeadTag')
const ArticleBodyHeader = require('../../models/articles-models/ArticleBodyHeader')
const ArticleEnclosureImage = require("../../models/articles-models/ArticleEnclosureImage")
const ArticleAbstract = require("../../models/articles-models/ArticleAbstract")
const { ArticleNestedData, H2_Block, H3_Block, SUMMERNOTE_Block, IMG_Block } = require("../../models/articles-models/ArticleNestedData")

const SECTION_TYPES = require("../../full-stack-libs/Types/ArticleSectionTypes")

// const { CreateArticleError } = require('../../custom-errors/custom-errors')



function setArticleURLMiddleware(req, res, next) {

  // TODO !!! put in libs and call upon globally
  const path_from_h1 = req.body.h1.toLowerCase()
    .replace(/[^\w\s]|_/g, '') // Remove punctuation
    .replace(/\s+/g, '-'); // add dashes

  console.log(path_from_h1);

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








async function createArticleHeadTagInstanceMiddleware(req, res, next) {
  console.log("createArticleHeadTagInstanceMiddleware...")

  let ret_article_head_tag_instance

  ret_article_head_tag_instance = new ArticleHeadTag({
    meta_title: req.body.meta_title,
    meta_description: req.body.meta_description,
    // [req.body.canonical? 'canonical' : null]: req.body.canonical,
    canonical: req.body.canonical ? req.body.canonical : req.body.url,
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







async function createArticleNestedDatatMiddleware(req, res, next) {
  console.log("createArticleNestedDatatMiddleware...");

  // res.locals.ret_article_enclosure_image_instance.image

  const nested_data = JSON.parse(req.body.nested_data_copy)

  let ARR_mongoose_Blocks = []

  for (let i = 0; i < nested_data.length; i++) {
    const nested_data_block = nested_data[i];

    switch (nested_data_block.type) {
      case SECTION_TYPES.H2:
        const h2Block = new H2_Block({
          order: nested_data_block.id,
          H2_innerHTML: nested_data_block.H2_innerHTML,
        });

        // await h2Block.save(); // Save the H2_Block instance to the database
        ARR_mongoose_Blocks.push(h2Block);
        break;
      case SECTION_TYPES.H3:
        const h3Block = new H3_Block({
          order: nested_data_block.id,
          H3_innerHTML: nested_data_block.H3_innerHTML,
        });

        // await h3Block.save(); // Save the H2_Block instance to the database
        ARR_mongoose_Blocks.push(h3Block);
        break;

      case SECTION_TYPES.SUMMERNOTE:
        const summernoteBlock = new SUMMERNOTE_Block({
          order: nested_data_block.id,
          SUMMERNOTE_innerHTML: nested_data_block.SUMMERNOTE_innerHTML,
        });

        // await summernoteBlock.save(); // Save the H2_Block instance to the database
        ARR_mongoose_Blocks.push(summernoteBlock);
        break;

      case SECTION_TYPES.IMG:

        const imgBlock = new IMG_Block({
          order: nested_data_block.id,
          img_width: nested_data_block.img_width,
          img_height: nested_data_block.img_height,
          img_src: nested_data_block.img_src,
          // If missing, the field does not register
          img_alt: nested_data_block.img_alt, 
          img_description: nested_data_block.img_description,
          image: { image_name: nested_data_block.image?.image_name }
          // If missing, the field image does not register
        });

        // await imgBlock.save(); // Save the H2_Block instance to the database
        ARR_mongoose_Blocks.push(imgBlock);
        break;


      default:
        break;
    }
  }



  console.log('\n\n________________\nARR_mongoose_Blocks-->\n', ARR_mongoose_Blocks);

  let ret_article_nested_data_instance;

  ret_article_nested_data_instance = new ArticleNestedData({
    blocks: ARR_mongoose_Blocks,
    article_id: res.locals.ret_article_instance._id
  });

  await ret_article_nested_data_instance.save(); // Save the ArticleNestedData instance

  res.locals.ret_article_instance.articlenesteddata_id = ret_article_nested_data_instance._id;

  res.locals.ret_article_nested_data_instance = ret_article_nested_data_instance;

  return next();
}










const createArticlesMiddleware2 = {
  setArticleURLMiddleware: setArticleURLMiddleware,

  createArticleInstanceMiddleware: createArticleInstanceMiddleware,
  createArticleHeadTagInstanceMiddleware: createArticleHeadTagInstanceMiddleware,
  createArticleBodyHeaderInstanceMiddleware: createArticleBodyHeaderInstanceMiddleware,
  createArticleEnclosureImageInstanceMiddleware: createArticleEnclosureImageInstanceMiddleware,
  createArticleAbstractMiddleware: createArticleAbstractMiddleware,
  createArticleNestedDatatMiddleware: createArticleNestedDatatMiddleware,
}



module.exports = createArticlesMiddleware2