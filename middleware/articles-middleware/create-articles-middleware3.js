const sharp = require('sharp');
const fs = require('fs/promises')
const path = require('path')

const { CreateArticleError } = require('../../custom-errors/custom-errors')



async function processArticleEnclosureImageMiddleware(req, res, next) {
  console.log("processArticleEnclosureImageMiddleware...")

  const source_directory = `public/img/temporal-new`
  // const processing_file_enclosure_image = req.files[0];
  const processing_file_enclosure_image = req.files.shift();

  const ext = path.extname(processing_file_enclosure_image.originalname);


  const new_article_enclosure_image_name = `${res.locals.ret_article_instance._id}${ext}`
  res.locals.new_article_enclosure_image_name = new_article_enclosure_image_name


  // ArticleEnclosureImage path setting
  res.locals.ret_article_enclosure_image_instance.path = `${res.locals.directory_enclosure_path}/${new_article_enclosure_image_name}`


  // console.log('res.locals.ret_article_enclosure_image_instance.path: ', res.locals.ret_article_enclosure_image_instance.path)

  let sharp_returned

  try {
    sharp_returned = sharp(processing_file_enclosure_image.path)
  } catch (e) {
    let error = new CreateArticleError(`Was unable to sharp ${processing_file_enclosure_image.path}.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }


  try {
    sharp_returned = await sharp_returned.toFile(`public/${res.locals.ret_article_enclosure_image_instance.path}`)
  } catch (e) {
    let error = new CreateArticleError(`Was unable to sharp toFile method.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }


  // Delete received article enclosure image from temporal-new
  try {
    await fs.unlink(path.join(source_directory, processing_file_enclosure_image.filename));
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

  res.locals.ret_article_enclosure_image_instance.image = image

  return next()
}







async function processArticleBlockImagesMiddleware(req, res, next) {
  console.log("processArticleBlockImagesMiddleware...")

  const source_directory = `public/img/temporal-new`

  // console.log(req.files)

  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];

    // console.log(file)

    // res.locals.`/${file.filename}`

    // Retrieve image and use: file.path example: 'public/img/temporal-new/6955-oreo.png'
    let sharp_returned

    try {
      sharp_returned = sharp(file.path)
    } catch (e) {
      let error = new CreateArticleError(`Was unable to call sharp(${file.path}.\n\nSource error: ${e.name}\n${e.message}`)
      return next(error)
    }



    // Displace to proper article image folder location
    // `public/${res.locals.directory_article_images_folder_path}`
    // public/img/bidblock-article-images/per-article-folders-for-images/ARTICLE_ID/6955-oreo.png

    try {
      sharp_returned = await sharp_returned.toFile(`public/${res.locals.directory_article_images_folder_path}/${file.filename}`)

      // console.log("\n\nsharp_returned\n\n", sharp_returned)


    } catch (e) {
      let error = new CreateArticleError(`Was unable to sharp toFile method.\nSource error: ${e.name}\n${e.message}`)
      return next(error)
    }

    // Delete received article block image from temporal-new
    // source_directory: `public/img/temporal-new`
    // file.filename: '6955-oreo.png'
    try {
      await fs.unlink(path.join(source_directory, file.filename));
    } catch (e) {
      let error = new CreateArticleError(`Was unable to delete the uploaded file from ${source_directory}.\nSource error: ${e.name}\n${e.message}`)
      return next(error)
    }


    // Sharped article enclosure image entry information, NOT NEEDED FOR NOW
    // const image = {
    //   name: file.filename,
    //   format: sharp_returned.format,
    //   width: sharp_returned.width,
    //   height: sharp_returned.height,
    //   size: sharp_returned.size,
    // }


    // TODO !!!!!
    // res.locals.ret_article_nested_data_instance.SOMEFIELD = image






  }





  

  return next()
}






async function middleware3(req, res, next) {
  console.log("middleware3...")



  return next()
}






const createArticlesMiddleware3 = {
  processArticleEnclosureImageMiddleware: processArticleEnclosureImageMiddleware,
  processArticleBlockImagesMiddleware: processArticleBlockImagesMiddleware,
  middleware3: middleware3,
}



module.exports = createArticlesMiddleware3