const { EditArticleError } = require('../../../custom-errors/custom-errors')



async function saveArticleMiddleware(req, res, next) {
  console.log("saveArticleMiddleware...")
  
  let ret_article_save

  try {
    // Save the updated article
    ret_article_save = await res.locals.article.save();

  } catch (e) {
    let error = new EditArticleError(`Error saving updated article, Internal server error: ${e.message}`)
    return next(error)
  }

  
  return next()

}







async function saveArticleHeadTagMiddleware(req, res, next) {
  console.log("saveArticleHeadTagMiddleware...")


  let ret_article_head_tag_save
  try {
    // Save the updated article
    ret_article_head_tag_save = await res.locals.article_head_tag.save();

  } catch (e) {
    let error = new EditArticleError(`Error saving updated article_head_tag, Internal server error: ${e.message}`)
    return next(error)
  }

  
  return next()

}





async function saveArticleBodyHeaderMiddleware(req, res, next) {
  console.log("saveArticleBodyHeaderMiddleware...")

  let ret_article_body_header_save
  try {
    
    ret_article_body_header_save = await res.locals.article_body_header.save();

  } catch (e) {
    let error = new EditArticleError(`Error saving updated article_body_header, Internal server error: ${e.message}`)
    return next(error)
  }

  
  return next()

}


async function saveArticleEnclosureImageMiddleware(req, res, next) {
  console.log("saveArticleEnclosureImageMiddleware...")

  let ret_article_enclosure_save

  try {
    ret_article_enclosure_save = await res.locals.article_enclosure.save();

  } catch (e) {
    let error = new EditArticleError(`Error saving updated article_enclosure, Internal server error: ${e.message}`)
    return next(error)
  }

  
  return next()

}


async function saveArticleAbstractMiddleware(req, res, next) {
  console.log("saveArticleAbstractMiddleware...")

  let ret_article_abstract_save
  try {
    ret_article_abstract_save = await res.locals.article_abstract.save();

  } catch (e) {
    let error = new EditArticleError(`Error saving updated article_abstract, Internal server error: ${e.message}`)
    return next(error)
  }

  
  return next()

}


async function saveArticleNestedDataMiddleware(req, res, next) {
  console.log("saveArticleNestedDataMiddleware...")

  let ret_article_nested_data_save
  try {
    ret_article_nested_data_save = await res.locals.article_nested_data.save();

  } catch (e) {
    let error = new EditArticleError(`Error saving updated article_abstract, Internal server error: ${e.message}`)
    return next(error)
  }

  
  return next()

}






const editArticlePUTMiddleware4 = {
  saveArticleMiddleware: saveArticleMiddleware,
  saveArticleHeadTagMiddleware: saveArticleHeadTagMiddleware,
  saveArticleBodyHeaderMiddleware: saveArticleBodyHeaderMiddleware,
  saveArticleEnclosureImageMiddleware: saveArticleEnclosureImageMiddleware,
  saveArticleAbstractMiddleware: saveArticleAbstractMiddleware,
  saveArticleNestedDataMiddleware: saveArticleNestedDataMiddleware,
}



module.exports = editArticlePUTMiddleware4