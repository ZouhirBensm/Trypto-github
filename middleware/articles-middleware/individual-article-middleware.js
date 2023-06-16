// const sharp = require('sharp');
// const fs = require('fs/promises')
// const { existsSync, mkdirSync } = require('fs')
// const path = require('path')

const Article = require("../../models/articles-models/Article")
const ArticleHeadTag = require('../../models/articles-models/ArticleHeadTag')
const ArticleBodyHeader = require('../../models/articles-models/ArticleBodyHeader')
const ArticleEnclosureImage = require("../../models/articles-models/ArticleEnclosureImage")



async function middleware1(req, res, next) {

  console.log('\n\nreq.url:\n\n', `/articles${req.url}`)

  let article

  try {
    article = await Article.findOne({
      url: `/articles${req.url}`
    })
    .populate("articleheadtag_id articlebodyheader_id articleenclosureimage_id");
  } catch (error) {

  }

  console.log("\n\narticle,\n\n", article)
  // console.log("\n\nrticleheadtag_id,\n\n", article.articleheadtag_id)
  // console.log("\n\nrticlebodyheader_id,\n\n", article.articlebodyheader_id)
  // console.log("\n\nrticleenclosureimage_id,\n\n", article.articleenclosureimage_id)

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