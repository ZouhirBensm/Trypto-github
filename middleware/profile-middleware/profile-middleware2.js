const sharp = require('sharp');
const path = require('path')
const fs = require('fs/promises')
var { existsSync, mkdirSync, readdir } = require('fs');

const { determine_Sharp_toFormatOptions } = require('../../full-stack-libs/utils')

const { ProfileImageUploadError } = require('../../custom-errors/custom-errors')
const UserProfileImage = require('../../models/UserProfileImage')
const User = require('../../models/User')



// TODO !!!! Integrate errors to UI. HERE !
async function middleware1(req, res, next) {
  console.log("middleware1...")

  let directory = `public/img/profile-images`
  res.locals.directory = directory
  
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  return next()

}




async function middleware2(req, res, next) {
  console.log("middleware2... process image")

  const source_directory = `public/img/temporal-new`
  const processing_file = req.file;
  const ext = path.extname(processing_file.originalname);
  
  let sharp_returned

  let toFormat = determine_Sharp_toFormatOptions(processing_file.mimetype, ext, new ProfileImageUploadError("Server Error | Please, try again later", "No toFormat object retrieved."))

  let isError = false
  isError = (toFormat instanceof Error);
  isEmpty_toFormat = (toFormat && Object.keys(toFormat).length === 0
    && Object.getPrototypeOf(toFormat) === Object.prototype)

  // Sharp profile pic and displace in proper folder
  try {
    // background: { r: 255, g: 255, b: 255, alpha: 0.5 }, withoutEnlargement: true
    sharp_returned = sharp(processing_file.path)
    .resize({ width: 104, fit: 'inside' })
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to sharp resize method.\nSource error: ${e.name}\n${e.message}\n${e.stack}`)
    return next(error)
  }

  if (!isError && !isEmpty_toFormat) {
    try {
      sharp_returned = sharp_returned.toFormat(toFormat.format, toFormat.options)
    } catch (e) {
      let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to sharp toFormat method.\nSource error: ${e.name}\n${e.message}\n${e.stack}`)
      return next(error)
    }
  }

  try {
    sharp_returned = await sharp_returned.toFile(`${res.locals.directory}/${req.params.selectedUserID}${ext}`)
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to sharp toFile method.\nSource error: ${e.name}\n${e.message}\n${e.stack}`)
    return next(error)
  }


  // Delete profile pic from temporal-new
  try {
    await fs.unlink(path.join(source_directory, processing_file.filename));
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to delete the uploaded file from ${source_directory}.\nSource error: ${e.name}\n${e.message}\n${e.stack}`)
    return next(error)
  }


  // Sharped profile pic entry information
  const image = {
    name: `${req.params.selectedUserID}${ext}`,
    format: sharp_returned.format,
    width: sharp_returned.width,
    height: sharp_returned.height,
    size: sharp_returned.size,
  }

  res.locals.image = image
  
  return next()

}



async function middleware3(req, res, next) {
  console.log("middleware3...")


  let is_there_profile_img_already
  let profile_image_to_replace = []

  // Determine if user has a linked profile picture
  try {
    is_there_profile_img_already = await User.exists({
      _id: req.params.selectedUserID,
      userprofileimageID: { $ne: null }
    })
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `User.exists failed, mongoDB related.\nSource error: ${e.name}\n${e.message}\n${e.stack}`)
    return next(error)
  }

  // There is a linked profile picture linked, then 
  // 1. Retrieve the saved profile pic file name and id
  // 2. Delete saved profile pic from fs
  // 3. Delete UserProfileImage entry from DB
  if (is_there_profile_img_already) {

    // 1.
    try {
      profile_image_to_replace = await UserProfileImage.find({ userID: req.params.selectedUserID }).select("_id image")
    } catch (e) {
      let error = new ProfileImageUploadError("Server Error | Please, try again later", `UserProfileImage.find failed, mongoDB related.\nSource error: ${e.name}\n${e.message}\n${e.stack}`)
      return next(error)
    }

    console.log(profile_image_to_replace)
    console.log(profile_image_to_replace[0].image.name)

    // 2.
    try {
      await fs.unlink(path.join(res.locals.directory, profile_image_to_replace[0].image.name));
    } catch (e) {
      let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to delete the saved profile pic file from ${res.locals.directory}, that has been replaced.\nSource error: ${e.name}\n${e.message}\n${e.stack}`)
      return next(error)
    }

    // 3.
    let ret_deletion_old_userprofileimage
    try {
      ret_deletion_old_userprofileimage = await UserProfileImage.deleteOne({_id: profile_image_to_replace[0]?._id})
      console.log(ret_deletion_old_userprofileimage)
    } catch (e) {
      let error = new ProfileImageUploadError("Server Error | Please, try again later", `UserProfileImage.deleteOne failed, mongoDB related.\nSource error: ${e.name}\n${e.message}\n${e.stack}`)
      return next(error)
    }
  }

  return next()

}




async function middleware4(req, res, next) {
  console.log("middleware4...")

  // New user profile image instance
  let ret_userprofileimage_instance

  ret_userprofileimage_instance = new UserProfileImage({
    userID: req.params.selectedUserID,
    path: res.locals.directory,
    image: res.locals.image,
  })

  res.locals.ret_userprofileimage_instance = ret_userprofileimage_instance

  return next()
}





async function middleware5(req, res, next) {
  console.log("middleware5...")

  let updated_user_ret
  // Updating User's userprofileimageID to new one created
  try {
    updated_user_ret = await User.updateOne({ _id: req.params.selectedUserID }, { userprofileimageID: res.locals.ret_userprofileimage_instance._id }, { upsert: false, new: true });
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `User.updateOne failed, mongoDB related.\nSource error: ${e.name}\n${e.message}\n${e.stack}`)
    return next(error)
  }


  return next()

}





async function middleware6(req, res, next) {
  console.log("middleware6...")

  // Saving the user profile image instance
  let ret_userprofileimage_save
  try {
    ret_userprofileimage_save = await res.locals.ret_userprofileimage_instance.save()
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to save ret_userprofileimage_instance. ${e.message}`)
    return next(error)
  }

  return next()
}






// TODO !!!! rename HERE !
// TODO !!!!
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