const { CreateArticleError } = require('../../../custom-errors/custom-errors')




// Article
async function saveArticleMiddleware(req, res, next) {
  console.log("saveArticleMiddleware...")

  let ret_article_save
  try {
    ret_article_save = await res.locals.article.save()
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
    ret_article_enclosure_image_save = await res.locals.article_enclosure.save()
  } catch (e) {
    let error = new CreateArticleError(`Was unable to save article_enclosure. ${e.name}, ${e.message}`)
    return next(error)
  }

  return next()
}

// ArticleAbstract
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





// ArticleNestedData
async function saveArticleNestedDataMiddleware(req, res, next) {
  console.log("saveArticleNestedDataMiddleware...")

  let ret_article_nested_data_save
  try {
    ret_article_nested_data_save = await res.locals.ret_article_nested_data_instance.save()
  } catch (e) {
    let error = new CreateArticleError(`Was unable to save ret_article_nested_data_instance. ${e.name}, ${e.message}`)
    return next(error)
  }

  return next()
}





const createArticlePOSTMiddleware4 = {
  saveArticleMiddleware: saveArticleMiddleware,
  saveArticleHeadTagMiddleware: saveArticleHeadTagMiddleware,
  saveArticleBodyHeaderMiddleware: saveArticleBodyHeaderMiddleware,
  saveArticleEnclosureImageMiddleware: saveArticleEnclosureImageMiddleware,
  saveArticleAbstractMiddleware: saveArticleAbstractMiddleware,
  saveArticleNestedDataMiddleware: saveArticleNestedDataMiddleware
}



module.exports = createArticlePOSTMiddleware4