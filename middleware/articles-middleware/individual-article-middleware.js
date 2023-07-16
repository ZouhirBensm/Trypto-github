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


  // console.log('\n\nreq.url:\n\n', `/articles${req.url}`)

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

  // console.log("\n\n________________________article,\n\n", article, "\n\n\n")

  // console.log("\n\n________________________article.articleenclosureimage_id,\n\n", article.articleenclosureimage_id)
  // console.log("\n\n________________________article.articleheadtag_id,\n\n", article.articleheadtag_id)
  // console.log("\n\n________________________article.articlebodyheader_id,\n\n", article.articlebodyheader_id)
  // console.log("\n\n________________________article.articleabstract_id,\n\n", article.articleabstract_id)
  // console.log("\n\n________________________article.articlenesteddata_id,\n\n", article.articlenesteddata_id)

  // console.log("\n\nrticleheadtag_id,\n\n", article.articleheadtag_id)
  // console.log("\n\nrticlebodyheader_id,\n\n", article.articlebodyheader_id)
  // console.log("\n\nrticleenclosureimage_id,\n\n", article.articleenclosureimage_id)

  res.locals.article = article
  res.locals.SECTION_TYPES = SECTION_TYPES

  // res.status(200).end()
  return next()

}




async function middleware2(req, res, next) {
  // res.locals.article_title = req.params.article_title ?  req.params.article_title : undefined
  res.locals.head = 2

  let EMAIL_blocks = res.locals.article.articlenesteddata_id.blocks.filter(block => { return block.type == SECTION_TYPES.EMAIL });


  if (!EMAIL_blocks) return next()

  res.locals.EMAIL_blocks = EMAIL_blocks


  for (let index = 0; index < EMAIL_blocks.length; index++) {
    let bblock = EMAIL_blocks[index];

    

    // console.log(JSON.stringify(bblock))
    // console.log(Object.getOwnPropertyNames(bblock))
    // console.log(Reflect.ownKeys(bblock))
    
    // Copy has to do with accessing EMAIL_title, EMAIL_subtitle, and non-enumerable or non-serializable properties
    const copiedBlock = JSON.parse(JSON.stringify(bblock));

    // const copiedBlock = Object.assign({}, bblock);
    // const copiedBlock = { ...bblock };

    // console.log('__________\n\n', bblock.EMAIL_title, copiedBlock.EMAIL_title, '__________\n\n')

    const titleKey = `EMAIL_title${index}`;
    const subtitleKey = `EMAIL_subtitle${index}`;

    res.locals[titleKey] = copiedBlock.EMAIL_title;
    res.locals[subtitleKey] = copiedBlock.EMAIL_subtitle;
  }


  return next()
}


function middleware3(req, res, next) {

  let H2H3_blocks = res.locals.article.articlenesteddata_id.blocks.filter(block => { return block.type === SECTION_TYPES.H2 ||  block.type === SECTION_TYPES.H3 });

  if (!Array.isArray(H2H3_blocks) || !H2H3_blocks.length) {
    // array does not exist, is not an array, or is empty
    // ⇒ do not attempt to process array
    H2H3_blocks = undefined
  }


  if (!H2H3_blocks) return next()

  res.locals.H2H3_blocks = H2H3_blocks

  console.log('\n\n******\n\nres.locals.H2H3_blocks\n\n', res.locals.H2H3_blocks)

  return next()
}


module.exports = {
  middleware1,
  middleware2,
  middleware3
}