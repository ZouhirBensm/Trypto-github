const Article = require('../../models/articles-models/Article')
const { ArticleNestedData } = require('../../models/articles-models/ArticleNestedData')
const ArticleHeadTag = require('../../models/articles-models/ArticleHeadTag')
const ArticleEnclosureImage = require('../../models/articles-models/ArticleEnclosureImage')
const ArticleBodyHeader = require('../../models/articles-models/ArticleBodyHeader')
const ArticleAbstract = require('../../models/articles-models/ArticleAbstract')

const fs = require('fs')


const { MongoError } = require('../../custom-errors/custom-errors')



async function middleware0(req, res, next) {

  setTimeout(()=>{
    return next()
  }, 5000)

}


async function middleware1(req, res, next) {
  console.log("middleware1...")
  console.log('\nreq.params.userId:\n\n', req.params.userId)
  console.log('\nreq.body.article_id:\n\n', req.body.article_id)


  res.locals.article_id = req.body.article_id

  return next()
}





async function middleware2(req, res, next) {
  console.log("middleware2...")


  let article_deletetion_return

  try {
    article_deletetion_return = await Article.findByIdAndDelete(req.body.article_id)
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: article_deletetion_return`)
    return next(error)

  }

  res.locals.article_deletetion_return = article_deletetion_return

  return next()

}


async function middleware3(req, res, next) {
  console.log("middleware3...")

  let articleenclosureimage_deletetion_return

  try {
    articleenclosureimage_deletetion_return = await ArticleEnclosureImage.findByIdAndDelete(res.locals.article_deletetion_return.articleenclosureimage_id)
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: articleenclosureimage_deletetion_return`)
    return next(error)

  }

  // PATH contains the file to delete
  res.locals.enclosure_image_path = `public/${articleenclosureimage_deletetion_return.path}`

  // PATH of all the images in the article's content
  res.locals.article_content_images = `public/img/bidblock-article-images/per-article-folders-for-images/${res.locals.article_deletetion_return._id}`

  return next()

}


async function middleware4(req, res, next) {
  console.log("middleware4...")

  try {
    fs.rmSync(res.locals.enclosure_image_path);
  } catch (e) {
    let error = new Error(`Was unable to delete the file @: ${res.locals.enclosure_image_path}`)
    return next(error)
  }


  try {
    fs.rmSync(res.locals.article_content_images, { recursive: true, force: true });
  } catch (e) {
    let error = new Error(`Was unable to delete the directory: ${res.locals.article_content_images}`)
    return next(error)
  }

  return next()
}







async function middleware5(req, res, next) {
  console.log("middleware5...")


  let articlenesteddata_deletetion_return

  try {
    articlenesteddata_deletetion_return = await ArticleNestedData.findByIdAndDelete(res.locals.article_deletetion_return.articlenesteddata_id)
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: articlenesteddata_deletetion_return`)
    return next(error)

  }



  let articleheadtag_deletetion_return
  
  try {
    articleheadtag_deletetion_return = await ArticleHeadTag.findByIdAndDelete(res.locals.article_deletetion_return.articleheadtag_id)
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: articleheadtag_deletetion_return`)
    return next(error)
  
  }
  
  
  let articlebodyheader_deletetion_return
  
  try {
    articlebodyheader_deletetion_return = await ArticleBodyHeader.findByIdAndDelete(res.locals.article_deletetion_return.articlebodyheader_id)
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: articlebodyheader_deletetion_return`)
    return next(error)
  
  }
  
  
  
  
  let articleabstract_deletetion_return
  
  try {
    articleabstract_deletetion_return = await ArticleAbstract.findByIdAndDelete(res.locals.article_deletetion_return.articleabstract_id)
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: articleabstract_deletetion_return`)
    return next(error)
  
  }

  return next()
}













const deleteArticleMiddleware = {
  middleware0: middleware0,
  middleware1: middleware1,
  middleware2: middleware2,
  middleware3: middleware3,
  middleware4: middleware4,
  middleware5: middleware5,
}






module.exports = deleteArticleMiddleware