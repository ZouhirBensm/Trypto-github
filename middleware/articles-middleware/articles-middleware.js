const sharp = require('sharp');
const fs = require('fs/promises')
const { existsSync, mkdirSync } = require('fs')
const path = require('path')

const Article = require("../../models/articles-models/Article")
const ArticleHeadTag = require('../../models/articles-models/ArticleHeadTag')
const ArticleBodyHeader = require('../../models/articles-models/ArticleBodyHeader')
const ArticleEnclosureImage = require("../../models/articles-models/ArticleEnclosureImage")
const ArticleAbstract = require("../../models/articles-models/ArticleAbstract")

const { CreateArticleError } = require('../../custom-errors/custom-errors')


function seeData(req, res, next) {
  console.log("seeData...")

  console.log(req.body)
  console.log('\n\n', JSON.parse(req.body.nested_data_copy))

  console.log('\n\n', req.files)

  // return res.status(200).end()
  return next()
}



function setTheExcerptMiddleware(req, res, next) {
  console.log("setTheExcerptMiddleware...")

  let excerpt
  let split_content = req.body.content.split(" ")
  let split_excerpt = split_content.slice(0, 12)
  excerpt = split_excerpt.join(" ")

  req.body.excerpt = excerpt

  return next()
}


function makeSureDestinationFolderPresentMiddleware(req, res, next) {
  console.log("makeSureDestinationFolderPresentMiddleware...")

  let directory = `public/img/bidblock-article-enclosure-images`
  res.locals.directory = directory



  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  return next()

}


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
    url: req.body.url,
    author_id: req.session.userId,
    content: req.body.content,
    excerpt: req.body.excerpt
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
    noindex: req.body.noindex,
    nofollow: req.body.nofollow,
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
    banner_img_alt: req.body.banner_img_alt,
    article_id: res.locals.ret_article_instance._id // ATTACH TO ArticleBodyHeader -> Article
  })

  res.locals.ret_article_instance.articlebodyheader_id = ret_article_body_header_instance._id // ATTACH TO Article -> ArticleBodyHeader


  // RENDER ArticleHeadTag GLOBAL
  res.locals.ret_article_body_header_instance = ret_article_body_header_instance

  return next()
}
















async function processArticleImageMiddleware(req, res, next) {
  console.log("processArticleImageMiddleware...")

  const source_directory = `public/img/temporal-new`
  const processing_file = req.file;
  const ext = path.extname(processing_file.originalname);


  let sharp_returned

  const new_article_enclosure_image_name = `${res.locals.ret_article_instance._id}${ext}`

  res.locals.new_article_enclosure_image_name = new_article_enclosure_image_name


  // Set the Article.enclosure link
  res.locals.ret_article_instance.enclosure = `/img/bidblock-article-enclosure-images/${new_article_enclosure_image_name}`

  try {
    sharp_returned = sharp(processing_file.path)
  } catch (e) {
    let error = new CreateArticleError(`Was unable to sharp ${processing_file.path}.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }


  try {
    sharp_returned = await sharp_returned.toFile(`${res.locals.directory}/${new_article_enclosure_image_name}`)
  } catch (e) {
    let error = new CreateArticleError(`Was unable to sharp toFile method.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }


  // Delete received article enclosure image from temporal-new
  try {
    await fs.unlink(path.join(source_directory, processing_file.filename));
  } catch (e) {
    let error = new CreateArticleError(`Was unable to delete the uploaded file from ${source_directory}.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }

  // Sharped article enclosure image entry information
  const image = {
    name: new_article_enclosure_image_name,
    format: sharp_returned.format,
    width: sharp_returned.width,
    height: sharp_returned.height,
    size: sharp_returned.size,
  }

  res.locals.image = image

  return next()
}








async function createArticleEnclosureImageInstanceMiddleware(req, res, next) {


  console.log("createArticleInstanceMiddleware...")

  let ret_article_enclosure_image_instance

  ret_article_enclosure_image_instance = new ArticleEnclosureImage({
    path: res.locals.directory,
    image: res.locals.image,
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










// Article
async function saveArticleMiddleware(req, res, next) {
  console.log("saveArticleMiddleware...")

  let ret_article_save
  try {
    ret_article_save = await res.locals.ret_article_instance.save()
  } catch (e) {
    let error = new CreateArticleError(`Was unable to save ret_article_instance. ${e.message}`)
    return next(error)
  }

  return next()
}




// ArticleHeadTag
async function saveArticleHeadTagMiddleware(req, res, next) {
  console.log("saveArticleHeadTagMiddleware...")

  let ret_article_head_tag_save
  try {
    ret_article_head_tag_save = await res.locals.ret_article_head_tag_instance.save()
  } catch (e) {
    let error = new CreateArticleError(`Was unable to save ret_article_head_tag_instance. ${e.message}`)
    return next(error)
  }

  return next()
}


// ArticleBodyHeader
async function saveArticleBodyHeaderMiddleware(req, res, next) {
  console.log("saveArticleBodyHeaderMiddleware...")

  let ret_article_body_header_save
  try {
    ret_article_body_header_save = await res.locals.ret_article_body_header_instance.save()
  } catch (e) {
    let error = new CreateArticleError(`Was unable to save ret_article_body_header_instance. ${e.message}`)
    return next(error)
  }

  return next()
}



// ArticleEnclosureImage
async function saveArticleEnclosureImageMiddleware(req, res, next) {
  console.log("saveArticleEnclosureImageMiddleware...")

  let ret_article_enclosure_image_save
  try {
    ret_article_enclosure_image_save = await res.locals.ret_article_enclosure_image_instance.save()
  } catch (e) {
    let error = new CreateArticleError(`Was unable to save ret_article_enclosure_image_instance. ${e.name}, ${e.message}`)
    return next(error)
  }

  return next()
}

// ArticleEnclosureImage
async function saveArticleAbstractMiddleware(req, res, next) {
  console.log("saveArticleAbstractMiddleware...")

  let ret_article_abstract_save
  try {
    ret_article_abstract_save = await res.locals.ret_article_abstract_instance.save()
  } catch (e) {
    let error = new CreateArticleError(`Was unable to save ret_article_abstract_instance. ${e.name}, ${e.message}`)
    return next(error)
  }

  return next()
}






const articlesMiddleware = {
  seeData: seeData,
  setTheExcerptMiddleware: setTheExcerptMiddleware,
  makeSureDestinationFolderPresentMiddleware: makeSureDestinationFolderPresentMiddleware,
  setArticleURLMiddleware: setArticleURLMiddleware,
  createArticleInstanceMiddleware: createArticleInstanceMiddleware,
  createArticleHeadTagInstanceMiddleware: createArticleHeadTagInstanceMiddleware,
  createArticleBodyHeaderInstanceMiddleware: createArticleBodyHeaderInstanceMiddleware,
  processArticleImageMiddleware: processArticleImageMiddleware,
  createArticleEnclosureImageInstanceMiddleware: createArticleEnclosureImageInstanceMiddleware,
  createArticleAbstractMiddleware: createArticleAbstractMiddleware,
  saveArticleMiddleware: saveArticleMiddleware,
  saveArticleHeadTagMiddleware: saveArticleHeadTagMiddleware,

  saveArticleBodyHeaderMiddleware: saveArticleBodyHeaderMiddleware,
  saveArticleEnclosureImageMiddleware: saveArticleEnclosureImageMiddleware,
  saveArticleAbstractMiddleware: saveArticleAbstractMiddleware,
}



module.exports = articlesMiddleware