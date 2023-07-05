// const sharp = require('sharp');
// const fs = require('fs/promises')
// const { existsSync, mkdirSync } = require('fs')
// const path = require('path')

const Article = require("../../models/articles-models/Article")
// const ArticleHeadTag = require('../../models/articles-models/ArticleHeadTag')
// const ArticleBodyHeader = require('../../models/articles-models/ArticleBodyHeader')
// const ArticleEnclosureImage = require("../../models/articles-models/ArticleEnclosureImage")

const SECTION_TYPES = require('../../full-stack-libs/Types/ArticleSectionTypes')



async function middleware1(req, res, next) {


  console.log('\n\nreq.url:\n\n', `/articles${req.url}`)

  let article

  try {
    article = await Article.findOne({
      url: `/articles${req.url}`
    })
    .populate(`articleenclosureimage_id articleheadtag_id articlebodyheader_id articleabstract_id articlenesteddata_id`)
    .populate({
      path: "author_id",
      select: "username -_id",
    })
  } catch (error) {
    // TODO !!!! add error handling
  }

  console.log("\n\n________________________article,\n\n", article, "\n\n\n")

  console.log("\n\n________________________article.articleenclosureimage_id,\n\n", article.articleenclosureimage_id)
  console.log("\n\n________________________article.articleheadtag_id,\n\n", article.articleheadtag_id)
  console.log("\n\n________________________article.articlebodyheader_id,\n\n", article.articlebodyheader_id)
  console.log("\n\n________________________article.articleabstract_id,\n\n", article.articleabstract_id)
  console.log("\n\n________________________article.articlenesteddata_id,\n\n", article.articlenesteddata_id)
  // console.log("\n\nrticleheadtag_id,\n\n", article.articleheadtag_id)
  // console.log("\n\nrticlebodyheader_id,\n\n", article.articlebodyheader_id)
  // console.log("\n\nrticleenclosureimage_id,\n\n", article.articleenclosureimage_id)

  res.locals.article = article
  res.locals.SECTION_TYPES = SECTION_TYPES

  // res.status(200).end()
  return next()

}
function middleware2(req, res, next) {
  return next()
}
function middleware3(req, res, next) {
  return next()
}


module.exports = {
  middleware1,
  middleware2,
  middleware3
}