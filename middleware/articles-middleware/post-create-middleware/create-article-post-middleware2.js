const sharp = require('sharp');
const fs = require('fs/promises')
const path = require('path')

const { CreateArticleError } = require('../../../custom-errors/custom-errors');
const SECTION_TYPES = require('../../../full-stack-libs/Types/ArticleSectionTypes');



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


    // PROCESS TO ADD MULTER_NAME
    // Retrieve the block that has the same file origin name as the file
    let concerned_block = res.locals.nested_data.find((block) => block.image?.image_name === file.originalname)
    
    console.log('concerned_block: ====>\n\n', concerned_block)

    let sharp_returned

    // Image is sized to the specified width sent from the front end. Then the height is determined to respect the aspect ratio! Used dimensions on ejs should be the ones set by sharp (set A). Code must change if you want to set height manually i.e. change ejs code to use (set B). Both sets are saved in collection data.

    // SET A
    // sharp_width: nested_data_block.image?.sharp_width,
    // sharp_height: nested_data_block.image?.sharp_height,
    // SET B
    // img_width: nested_data_block.img_width,
    // img_height: nested_data_block.img_height

    try {
      sharp_returned = sharp(file.path)
      .resize({ width: parseInt(concerned_block?.img_width), fit: 'inside' })
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









    // console.log("\n\nfile:\n", file)
    // console.log("\n\nconcerned_block:\n", concerned_block)


    // Concerned block is then added the multer_image field to add the name under which the image will be named under the filesystem
    concerned_block.image.multer_name = file.filename
    concerned_block.image.sharp_format = sharp_returned?.format
    concerned_block.image.sharp_width = sharp_returned?.width
    concerned_block.image.sharp_height = sharp_returned?.height
    concerned_block.image.sharp_size = sharp_returned?.size



    // UPDATE the Entire nested_data array 
    // Find proper index
    const index = res.locals.nested_data.findIndex(block => block.id === concerned_block.id);

    // After found the index, update the nested_data
    if (index !== -1) {
      res.locals.nested_data[index] = concerned_block;
    }


    console.log('\n\nUPDATED->\n\nres.locals.nested_data:\n\n', res.locals.nested_data)
    // END PROCESS TO ADD MULTER_NAME



  }







  return next()
}






async function middleware3(req, res, next) {
  console.log("middleware3...")

  return next()
}






const createArticlePOSTMiddleware2 = {
  processArticleEnclosureImageMiddleware: processArticleEnclosureImageMiddleware,
  processArticleBlockImagesMiddleware: processArticleBlockImagesMiddleware,
  middleware3: middleware3,
}



module.exports = createArticlePOSTMiddleware2