const Article = require('../../../models/articles-models/Article')

const SOURCES = require('../../../full-stack-libs/Types/ArticleSources');
const CATEGORY = require('../../../full-stack-libs/Types/ArticleCategories');



  // TODO !!!!! HERE CLEAN the nested data blocks as such
  
  // Delete _id fields from all blocks
  
  // if IMG.img_src skip next
  // if IMG.image block present, keep only IMG.image.image_name and Delete the rest

  // if A block and image_mode_on -> then if img_src skip, if image then keep only the image.image_name

  // Figure out a way to run a Promise all to get [Banner_file, image file1, image file2, ...]

  // then set the state with the correct banner file and correct nested A and IMG blocks


async function middleware1(req, res, next) {

  res.locals.CATEGORY = CATEGORY;

  return next()


}


async function middleware2(req, res, next) {

  let pre_load_article_4_edit

  if (req.query.articleID_to_preload_4_edit) {

    pre_load_article_4_edit = await Article.findOne({
      _id: req.query.articleID_to_preload_4_edit,
      source: SOURCES.BIDBLOCK
    })
      .populate(`articleenclosureimage_id articleheadtag_id articlebodyheader_id articleabstract_id articlenesteddata_id`)


    console.log("\n\n", pre_load_article_4_edit.articleenclosureimage_id)

    res.locals.pre_load_article_4_edit = pre_load_article_4_edit

  }


  return next()
}


async function middleware3(req, res, next) {
  return next()
}


async function middleware4(req, res, next) {
  return next()
}



async function middleware5(req, res, next) {
  return next()
}


module.exports = {
  middleware1,
  middleware2,
  middleware3,
  middleware4,
  middleware5
}