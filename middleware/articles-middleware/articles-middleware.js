const sharp = require('sharp');
const fs = require('fs/promises')
const { existsSync, mkdirSync } = require('fs')
const path = require('path')

const Article = require("../../models/articles-models/Article")
const ArticleEnclosureImage = require("../../models/articles-models/ArticleEnclosureImage")

const { CreateArticleError } = require('../../custom-errors/custom-errors')



function setTheExcerptMiddleware(req, res, next) {

  let excerpt
  let split_content = req.body.content.split(" ")
  let split_excerpt = split_content.slice(0, 10)
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

async function createArticleInstanceMiddleware(req, res, next) {
  let ret_article_instance

  ret_article_instance = new Article({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    excerpt: req.body.excerpt
  })

  res.locals.ret_article_instance = ret_article_instance

  res.locals.ret_article_instance.link = `/articles/individual_article/${ret_article_instance._id}`

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
  res.locals.ret_article_instance.enclosure = `../img/bidblock-article-enclosure-images/${new_article_enclosure_image_name}`

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
  console.log("createArticleImageInstanceMiddleware...")

  // New user profile image instance
  let ret_article_enclosure_image_instance

  ret_article_enclosure_image_instance = new ArticleEnclosureImage({
    articleID: res.locals.ret_article_instance._id,
    path: res.locals.directory,
    image: res.locals.image,
  })



  res.locals.ret_article_enclosure_image_instance = ret_article_enclosure_image_instance

  // Set the Article.articleenclosureimageID
  res.locals.ret_article_instance.articleenclosureimageID = ret_article_enclosure_image_instance._id


  return next()

}



async function saveTheArticleEntryMiddleware(req, res, next) {
  console.log("saveTheArticlesImageMiddleware...")

  let ret_article_save
  try {
    ret_article_save = await res.locals.ret_article_instance.save()
  } catch (e) {
    let error = new CreateArticleError(`Was unable to save ret_article_instance. ${e.message}`)
    return next(error)
  }

  return next()
}



async function saveTheArticleEnclosureImageEntryMiddleware(req, res, next) {
  console.log("saveTheArticleImageEntryMiddleware...")

  let ret_article_enclosure_image_save
  try {
    ret_article_enclosure_image_save = await res.locals.ret_article_enclosure_image_instance.save()
  } catch (e) {
    let error = new CreateArticleError(`Was unable to save ret_article_enclosure_image_instance. ${e.name}, ${e.message}`)
    return next(error)
  }

  return next()

}



const articlesMiddleware = {
  setTheExcerptMiddleware: setTheExcerptMiddleware,
  makeSureDestinationFolderPresentMiddleware: makeSureDestinationFolderPresentMiddleware,
  createArticleInstanceMiddleware: createArticleInstanceMiddleware,
  processArticleImageMiddleware: processArticleImageMiddleware,
  createArticleEnclosureImageInstanceMiddleware: createArticleEnclosureImageInstanceMiddleware,
  saveTheArticleEntryMiddleware: saveTheArticleEntryMiddleware,
  saveTheArticleEnclosureImageEntryMiddleware: saveTheArticleEnclosureImageEntryMiddleware,
}



module.exports = articlesMiddleware