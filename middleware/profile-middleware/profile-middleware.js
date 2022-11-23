const sharp = require('sharp');
const path = require('path')
const fs = require('fs/promises')
var { existsSync, mkdirSync } = require('fs');

const { determine_Sharp_toFormatOptions } = require('../../full-stack-libs/utils')

const { ProfileImageUploadError } = require('../../custom-errors/custom-errors')


const UserProfileImage = require('../../models/UserProfileImage')
const User = require('../../models/User')

async function middleware1(req, res, next) {
  console.log("middleware1... process image")

  let directory = `public/img/profile-images`
  let source_directory = `public/img/temporal-new`

  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  let sharp_returned
  const processing_file = req.file;
  var ext = path.extname(processing_file.originalname);


  let toFormat = determine_Sharp_toFormatOptions(processing_file.mimetype, processing_file.originalname, ext, new ProfileImageUploadError("Server Error | Please, try again later", "No toFormat object retrieved."))

  let isError = false
  isError = (toFormat instanceof Error);
  isEmpty_toFormat = (toFormat && Object.keys(toFormat).length === 0
    && Object.getPrototypeOf(toFormat) === Object.prototype)

  try {
    // background: { r: 255, g: 255, b: 255, alpha: 0.5 }, withoutEnlargement: true
    sharp_returned = sharp(processing_file.path)
      .resize({ width: 104, fit: 'inside' })
  } catch (e) {
    return next(e)
  }

  if (!isError && !isEmpty_toFormat) {
    try {
      sharp_returned = sharp_returned.toFormat(toFormat.format, toFormat.options)
    } catch (e) {
      return next(e)
    }
  }



  try {
    sharp_returned = await sharp_returned.toFile(`${directory}/${req.params.selectedUserID}${ext}`)
  } catch (e) {
    return next(e)
  }



  try {
    await fs.unlink(path.join(source_directory, processing_file.filename));
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to delete the uploaded file from ${source_directory}. ${e.message}`)
    return next(error)
  }

  let image = {
    name: `${req.params.selectedUserID}${ext}`,
    format: sharp_returned.format,
    width: sharp_returned.width,
    height: sharp_returned.height,
    size: sharp_returned.size,
  }

  res.locals.image = image
  res.locals.directory = directory

  return next()

}

async function middleware2(req, res, next) {
  console.log("middleware2...")

  let ret_userprofileimage_instance

  ret_userprofileimage_instance = new UserProfileImage({
    // sellmarketorderID: res.locals.ret_sellmarketorder_instance._id,
    path: res.locals.directory,
    image: res.locals.image,
  })
  

  res.locals.ret_userprofileimage_instance = ret_userprofileimage_instance

  return next()

}

async function middleware3(req, res, next) {
  console.log("middleware3...")

  let updated_user_ret
  try {
    updated_user_ret = await User.updateOne({ _id: req.params.selectedUserID }, { userprofileimageID: res.locals.ret_userprofileimage_instance._id }, { upsert: false, new: true });
  } catch (error) {
    // TODO error handling
    console.error(error)
  }

  res.locals.ret_userprofileimage_instance.userID = req.params.selectedUserID
  return next()

}

async function middleware4(req, res, next) {
  console.log("middleware4...")

  let ret_sellmarketorderlocation_save

  try {
    ret_sellmarketorderlocation_save = await res.locals.ret_userprofileimage_instance.save()
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to save ret_userprofileimage_instance. ${e.message}`)
    return next(error)
  }

  return next()

}


profileMiddleware = {
  middleware1: middleware1,
  middleware2: middleware2,
  middleware3: middleware3,
  middleware4: middleware4
}


module.exports = profileMiddleware