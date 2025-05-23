const Article = require('../../../models/articles-models/Article')

const SOURCES = require('../../../full-stack-libs/Types/ArticleSources');
const CATEGORY = require('../../../full-stack-libs/Types/ArticleCategories');
const SECTION_TYPES = require('../../../full-stack-libs/Types/ArticleSectionTypes');






async function middleware1(req, res, next) {

  res.locals.CATEGORY = CATEGORY;



  return next()


}


async function middleware2(req, res, next) {

  let pre_load_article_4_edit

  pre_load_article_4_edit = await Article.findOne({
    _id: req.query.articleID_to_preload_4_edit,
    source: SOURCES.BIDBLOCK
  })
    .populate(`articleenclosureimage_id articleheadtag_id articlebodyheader_id articleabstract_id articlenesteddata_id`)


  res.locals.copy_pre_load_article_4_edit = JSON.parse(JSON.stringify(pre_load_article_4_edit));



  if (!req.query.articleID_to_preload_4_edit) {
    return next()
  }

  console.log("\n\n__________________BEFORE\n\n")
  console.log("\n\n", res.locals.copy_pre_load_article_4_edit?.articlenesteddata_id.blocks)
  // console.log("\n\n", pre_load_article_4_edit.articleenclosureimage_id)

  
  // PLACE THE BANNER IMAGE
  let allImagesURLs = [{
      name: res.locals.copy_pre_load_article_4_edit.articleenclosureimage_id.banner_image_originalname,
      path: res.locals.copy_pre_load_article_4_edit.articleenclosureimage_id?.path
    }]



  // STEP 1: POPULATE IMAGE URLS
  for (let i = 0; i < pre_load_article_4_edit.articlenesteddata_id.blocks.length; i++) {
    console.log(res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].type, !(res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].type === SECTION_TYPES.IMG || res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].type === SECTION_TYPES.A))

    // IF BLOCK not IMG  nor A SKIP
    if (!(res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].type === SECTION_TYPES.IMG || res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].type === SECTION_TYPES.A)) {
      continue
    }



    

    // IF BLOCK IMG, or A, and does not have a image field SKIP
    if (!res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].image) {
      continue
    }

    console.log('hit!')
    // IF BLOCK IMG, or A, and has a image field then ...
    allImagesURLs.push({
      name: res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].image.image_name,
      path: res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].image.path
    })

  }


  console.log("\n\n_____________________________allImagesURLs", allImagesURLs)

  res.locals.allImagesURLs = allImagesURLs




  // STEP 2: DELETE BLOCK IDs
  // Loop through each object in the array
  for (let i = 0; i < pre_load_article_4_edit.articlenesteddata_id.blocks.length; i++) {
    // Remove the _id field from the current object
    delete res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i]._id;
  }










  

  const fields_to_delete = ["path", "multer_name", "sharp_format", "sharp_width", "sharp_height", "sharp_size", "_id", "image_file"]






  // STEP 3: IMG BLOCKS FILTER
  for (let i = 0; i < pre_load_article_4_edit.articlenesteddata_id.blocks.length; i++) {

    // IF BLOCK NOT IMG SKIP
    if (res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].type !== SECTION_TYPES.IMG) {
      continue
    }

    // IF BLOCK IMG && img_src SKIP
    if (res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].img_src && !res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].image) {
      continue
    }



    fields_to_delete.forEach(field => {
      delete res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].image[field];
    });
  }





  // STEP 4: A BLOCK FILTERS
  for (let i = 0; i < pre_load_article_4_edit.articlenesteddata_id.blocks.length; i++) {

    // IF BLOCK NOT A SKIP
    if (res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].type !== SECTION_TYPES.A) {
      continue
    }

    // IF BLOCK A && image_mode_on is false SKIP
    if (!res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].image_mode_on) {
      continue
    }

    // IF BLOCK A && image_mode_on is true and img_src and !image -> SKIP
    if (res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].img_src && !res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].image) {
      continue
    }

    // IF BLOCK A && image_mode_on is true and image present -> delete fields
    fields_to_delete.forEach(field => {
      delete res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks[i].image[field];
    });
  }



  // A with IMG upload

  // {
  //   "id": 5,
  //   "type": "A",
  //   "A_href": "https://en.wikipedia.org/wiki/Cars_(film)",
  //   "A_title": "a title",
  //   "newtab": true,
  //   "ugc": true,
  //   "nofollow": true,
  //   "noopener": true,
  //   "image_mode_on": true,
  //   "image": {
  //     "image_file": {},
  //     "image_name": "btc.png"
  //   },
  //   "img_width": "200",
  //   "img_height": "200",
  //   "img_alt": "bitcoin image1",
  //   "img_description": "some btc image"
  // }

  // A with IMG source

  // {
  //   "id": 6,
  //   "type": "A",
  //   "A_href": "https://www.bbc.com/news/world-europe-66104632",
  //   "A_title": "BBC franch",
  //   "newtab": true,
  //   "image_mode_on": true,
  //   "img_width": "350",
  //   "img_height": "100",
  //   "img_src": "https://ichef.bbci.co.uk/news/976/cpsprodpb/14044/production/_130288918_amin.png.webp",
  //   "img_alt": "some ugly fuck",
  //   "img_description": "some ugly fuck"
  // }

  
  // {
  //   "image_file": {
  //     arrayBuffer: ƒ arrayBuffer() {}
  //     lastModified: 1672796131903
  //     lastModifiedDate: Tue Jan 03 2023 20:35:31 GMT-0500 (GMT-05:00)
  //     slice: ƒ slice() {}
  //     stream: ƒ stream() {}
  //     text: ƒ text() {}
  //     webkitRelativePath: ""
  //     },

  //     "image_name": "btc.png"
  // }

  console.log("\n\n__________________EDITED\n\n")
  console.log("\n\n", res.locals.copy_pre_load_article_4_edit.articlenesteddata_id.blocks)





  return next()
}




// then set the state with the correct banner file and correct nested A or IMG blocks i.e. place in proper locations



async function middleware3(req, res, next) {

  res.locals.pre_load_article_4_edit = res.locals.copy_pre_load_article_4_edit
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