const sharp = require('sharp');
const path = require('path')
const fs = require('fs/promises')
var { existsSync, mkdirSync, readdir } = require('fs');

const { determine_Sharp_toFormatOptions } = require('../../full-stack-libs/utils')

const { ProfileImageUploadError } = require('../../custom-errors/custom-errors')
const UserProfileImage = require('../../models/UserProfileImage')
const User = require('../../models/User')


// TODO !!!! Error handling HERE !

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


  let toFormat = determine_Sharp_toFormatOptions(processing_file.mimetype, ext, new ProfileImageUploadError("Server Error | Please, try again later", "No toFormat object retrieved."))

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


  // _________________________________DEL OLD
  // If profile pic already
  let is_there_profile_img_already
  let profile_image_to_replace = []

  try {
    is_there_profile_img_already = await User.exists({
      _id: req.params.selectedUserID,
      userprofileimageID: { $ne: null }
    })
  } catch (error) {
    // TODO error handling
  }

  // delete old one from file system process
  if (is_there_profile_img_already) {

    // retrieve name of old picture name
    
    try {
      profile_image_to_replace = await UserProfileImage.find({ userID: req.params.selectedUserID }).select("_id image")
    } catch (error) {
      // TODO error handling
    }

    console.log(profile_image_to_replace[0].image.name)

    // delete old profile pic
    try {
      await fs.unlink(path.join(directory, profile_image_to_replace[0].image.name));
    } catch (e) {
      // TODO error handling
    }


  }
  // done deleting old profile pic
  // _________________________________DEL OLD
  
  res.locals.old_image_info = {
    is_there_profile_img_already: is_there_profile_img_already,
    old_profile_image_id: profile_image_to_replace[0]?._id
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
  console.log("middleware2... process image")

  

  return next()

}

async function middleware3(req, res, next) {
  console.log("middleware3... process image")

  

  return next()

}







async function middleware4(req, res, next) {
  console.log("middleware4...")



  let ret_userprofileimage_instance
  ret_userprofileimage_instance = new UserProfileImage({
    // sellmarketorderID: res.locals.ret_sellmarketorder_instance._id,
    path: res.locals.directory,
    image: res.locals.image,
  })


  res.locals.ret_userprofileimage_instance = ret_userprofileimage_instance

  return next()

}




async function middleware5(req, res, next) {
  console.log("middleware5...")

  let updated_user_ret
  try {
    updated_user_ret = await User.updateOne({ _id: req.params.selectedUserID }, { userprofileimageID: res.locals.ret_userprofileimage_instance._id }, { upsert: false, new: true });
  } catch (error) {
    // TODO error handling HERE !
    console.error(error)
  }

  res.locals.ret_userprofileimage_instance.userID = req.params.selectedUserID
  return next()

}




async function middleware6(req, res, next) {
  console.log("middleware6...")

  let ret_userprofileimage_save

  try {
    ret_userprofileimage_save = await res.locals.ret_userprofileimage_instance.save()
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to save ret_userprofileimage_instance. ${e.message}`)
    return next(error)
  }


  // deletes old profile picture entyy if any
  if(res.locals.old_image_info.is_there_profile_img_already) {
    let ret_deletion_old_userprofileimage
    try {
      ret_deletion_old_userprofileimage = await UserProfileImage.deleteOne({_id: res.locals.old_image_info.old_profile_image_id})
      console.log(ret_deletion_old_userprofileimage)
    } catch (error) {
      // TODO error handling
    }

  }

  return next()

}





// TODO !!!! rename HERE !
// also some js concepts to learn
profileMiddleware = {
  middleware1: middleware1,
  middleware2: middleware2,
  middleware3: middleware3,
  middleware4: middleware4,
  middleware5: middleware5,
  middleware6: middleware6,
}


module.exports = profileMiddleware