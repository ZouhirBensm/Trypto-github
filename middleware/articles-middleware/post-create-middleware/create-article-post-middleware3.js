const ArticleHeadTag = require('../../../models/articles-models/ArticleHeadTag')
const ArticleBodyHeader = require('../../../models/articles-models/ArticleBodyHeader')
const ArticleAbstract = require("../../../models/articles-models/ArticleAbstract")
const { ArticleNestedData, H2_Block, H3_Block, SUMMERNOTE_Block, IMG_Block, IFRAME_Block, A_Block, EMAIL_Block } = require("../../../models/articles-models/ArticleNestedData")

const SECTION_TYPES = require("../../../full-stack-libs/Types/ArticleSectionTypes")




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













async function createArticleNestedDatatMiddleware1(req, res, next) {
  console.log("createArticleNestedDatatMiddleware1...");

  // res.locals.ret_article_enclosure_image_instance.image

  let ARR_mongoose_Blocks = []




  for (let i = 0; i < res.locals.nested_data.length; i++) {


    const nested_data_block = res.locals.nested_data[i];

    switch (nested_data_block.type) {
      case SECTION_TYPES.H2:
        const h2Block = new H2_Block({
          id: nested_data_block.id,
          H2_innerHTML: nested_data_block.H2_innerHTML,
        });

        // await h2Block.save(); // Save the H2_Block instance to the database
        
        // Validating the block against it's schema. Otherwise would have not and just saved.
        try { await h2Block.validate(); } catch (error) { return next(error) }

        ARR_mongoose_Blocks.push(h2Block);
        break;
      case SECTION_TYPES.H3:
        const h3Block = new H3_Block({
          id: nested_data_block.id,
          H3_innerHTML: nested_data_block.H3_innerHTML,
        });

        // await h3Block.save(); // Save the H2_Block instance to the database
        try { await h3Block.validate(); } catch (error) { return next(error) }

        ARR_mongoose_Blocks.push(h3Block);
        break;

      case SECTION_TYPES.SUMMERNOTE:
        const summernoteBlock = new SUMMERNOTE_Block({
          id: nested_data_block.id,
          SUMMERNOTE_innerHTML: nested_data_block.SUMMERNOTE_innerHTML,
        });

        // await summernoteBlock.save(); // Save the H2_Block instance to the database
        try { await summernoteBlock.validate(); } catch (error) { return next(error) }

        ARR_mongoose_Blocks.push(summernoteBlock);
        break;

      case SECTION_TYPES.IMG:

        console.log('nested_data_block:\n\n------>HERE', nested_data_block)

        let image = undefined

        if (nested_data_block.image) {

          image = {
            path: `${res.locals.directory_article_images_folder_path}/${nested_data_block.image?.multer_name}`,
            image_name: nested_data_block.image?.image_name,
            multer_name: nested_data_block.image?.multer_name,
            sharp_format: nested_data_block.image?.sharp_format,
            sharp_width: nested_data_block.image?.sharp_width,
            sharp_height: nested_data_block.image?.sharp_height,
            sharp_size: nested_data_block.image?.sharp_size,
          }

        }

        const imgBlock = new IMG_Block({
          id: nested_data_block.id,
          img_width: nested_data_block.img_width,
          img_height: nested_data_block.img_height,
          img_src: nested_data_block.img_src,
          // If missing, the field does not register
          img_alt: nested_data_block.img_alt,
          img_description: nested_data_block.img_description,
          image: image,
        });



        // await imgBlock.save(); // Save the H2_Block instance to the database
        try { await imgBlock.validate(); } catch (error) { return next(error) }

        ARR_mongoose_Blocks.push(imgBlock);
        break;
      case SECTION_TYPES.IFRAME:

        console.log("$$$$$$$$\n\nnested_data_block.iframe_source: $$$$$$\n\n", nested_data_block.iframe_source)
        const iframeBlock = new IFRAME_Block({
          id: nested_data_block.id,
          iframe_width: nested_data_block.iframe_width ? parseInt(nested_data_block.iframe_width) : undefined,
          iframe_height: nested_data_block.iframe_height ? parseInt(nested_data_block.iframe_height) : undefined,
          // iframe_type: nested_data_block.iframe_type,
          iframe_name: nested_data_block.iframe_name,
          iframe_description: nested_data_block.iframe_description,
          iframe_source: nested_data_block.iframe_source,
          // iframe_title: nested_data_block.iframe_title,
        });

        // await iframeBlock.save();

        try { await iframeBlock.validate(); } catch (error) { return next(error) }

        ARR_mongoose_Blocks.push(iframeBlock);
        break;
      case SECTION_TYPES.A:

        // TEMPORAL
        let image2 = undefined

        if (nested_data_block.image) {

          image2 = {
            path: `${res.locals.directory_article_images_folder_path}/${nested_data_block.image?.multer_name}`,
            image_name: nested_data_block.image?.image_name,
            multer_name: nested_data_block.image?.multer_name,
            sharp_format: nested_data_block.image?.sharp_format,
            sharp_width: nested_data_block.image?.sharp_width,
            sharp_height: nested_data_block.image?.sharp_height,
            sharp_size: nested_data_block.image?.sharp_size,
          }

        }

        const aBlock = new A_Block({
          id: nested_data_block.id,
          A_href: nested_data_block.A_href,
          A_title: nested_data_block.A_title,

          newtab: nested_data_block.newtab,
          nofollow: nested_data_block.nofollow,
          ugc: nested_data_block.ugc,
          noopener: nested_data_block.noopener,
          image_mode_on: nested_data_block.image_mode_on,

          A_innerText: nested_data_block.A_innerText,

          img_width: nested_data_block.img_width,
          img_height: nested_data_block.img_height,
          img_src: nested_data_block.img_src,
          img_alt: nested_data_block.img_alt,
          img_description: nested_data_block.img_description,
          image: image2,
        });

        // await aBlock.save(); // Save the IFRAME_Block instance to the database
        try { await aBlock.validate(); } catch (error) { return next(error) }


        ARR_mongoose_Blocks.push(aBlock);
        break;
      case SECTION_TYPES.EMAIL:
        const emailBlock = new EMAIL_Block({
          id: nested_data_block.id,
          EMAIL_title: nested_data_block.EMAIL_title,
          EMAIL_subtitle: nested_data_block.EMAIL_subtitle,
        });

        // await emailBlock.save(); // Save the H2_Block instance to the database
        try { await emailBlock.validate(); } catch (error) { return next(error) }


        ARR_mongoose_Blocks.push(emailBlock);
        break;


      default:
        break;
    }

    res.locals.ARR_mongoose_Blocks = ARR_mongoose_Blocks
  }

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


  createArticleNestedDatatMiddleware1: createArticleNestedDatatMiddleware1,
  createArticleNestedDatatMiddleware2: createArticleNestedDatatMiddleware2,
}



module.exports = createArticlePOSTMiddleware3