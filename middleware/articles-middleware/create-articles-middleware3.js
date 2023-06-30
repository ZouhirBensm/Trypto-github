const sharp = require('sharp');
const fs = require('fs/promises')
const path = require('path')

const { CreateArticleError } = require('../../custom-errors/custom-errors')



async function processArticleEnclosureImageMiddleware(req, res, next) {
  console.log("processArticleEnclosureImageMiddleware...")

  const source_directory = `public/img/temporal-new`
  const processing_file_enclosure_image = req.files[0];
  const ext = path.extname(processing_file_enclosure_image.originalname);


  let sharp_returned

  const new_article_enclosure_image_name = `${res.locals.ret_article_instance._id}${ext}`

  res.locals.new_article_enclosure_image_name = new_article_enclosure_image_name




  res.locals.ret_article_enclosure_image_instance.path = `${res.locals.directory_enclosure_path}/${new_article_enclosure_image_name}`

  console.log('res.locals.ret_article_enclosure_image_instance.path: ', res.locals.ret_article_enclosure_image_instance.path)
  


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



const createArticlesMiddleware3 = {
  processArticleEnclosureImageMiddleware: processArticleEnclosureImageMiddleware,
}



module.exports = createArticlesMiddleware3