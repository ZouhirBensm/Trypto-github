const sharp = require('sharp');
const path = require('path')
const fs = require('fs/promises')
var { existsSync, mkdirSync, readdir } = require('fs');

const { determine_Sharp_toFormatOptions } = require('../../full-stack-libs/utils')

const { ProfileImageUploadError } = require('../../custom-errors/custom-errors')
const UserProfileImage = require('../../models/UserProfileImage')
const User = require('../../models/User')



async function makeSureDestinationFolderPresentMiddleware(req, res, next) {
  console.log("makeSureDestinationFolderPresentMiddleware...")

  let directory = `public/img/profile-images`
  res.locals.directory = directory

  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  return next()

}




async function sharpAndDisplaceNewProfilePicMiddleware(req, res, next) {
  console.log("sharpAndDisplaceNewProfilePicMiddleware... process image")

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
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to sharp resize method.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }

  if (!isError && !isEmpty_toFormat) {
    try {
      sharp_returned = sharp_returned.toFormat(toFormat.format, toFormat.options)
    } catch (e) {
      let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to sharp toFormat method.\nSource error: ${e.name}\n${e.message}`)
      return next(error)
    }
  }

  const newprofilepicname = `${req.params.selectedUserID}${ext}`
  res.locals.newprofilepicname = newprofilepicname

  try {
    sharp_returned = await sharp_returned.toFile(`${res.locals.directory}/${newprofilepicname}`)
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to sharp toFile method.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }


  // Delete profile pic from temporal-new
  try {
    await fs.unlink(path.join(source_directory, processing_file.filename));
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to delete the uploaded file from ${source_directory}.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }


  // Sharped profile pic entry information
  const image = {
    name: newprofilepicname,
    format: sharp_returned.format,
    width: sharp_returned.width,
    height: sharp_returned.height,
    size: sharp_returned.size,
  }

  res.locals.image = image

  return next()

}



async function isThereProfilePicAlreadyMiddleware(req, res, next) {
  console.log("isThereProfilePicAlreadyMiddleware...")


  let is_there_profile_img_already
  

  // Determine if user has a linked profile picture
  try {
    is_there_profile_img_already = await User.exists({
      _id: req.params.selectedUserID,
      userprofileimageID: { $ne: null }
    })
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `User.exists failed, mongoDB related.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }

  res.locals.is_there_profile_img_already = is_there_profile_img_already


  return next()





}



async function retrievePrevImageInfo_DeletePrevPic_DeletePicEntry_Middleware(req, res, next) {
  console.log("retrievePrevImageInfo_DeletePrevPic_DeletePicEntry_Middleware...")

  if (!res.locals.is_there_profile_img_already) {
    return next()
  }

  

  // There is a linked profile picture linked, then 
  // 1. Retrieve the saved profile pic file name and id
  // 2. Delete UserProfileImage entry from DB
  // 3. Delete saved profile pic from fs

  // 1.

  let profile_image_to_replace = []
  try {
    profile_image_to_replace = await UserProfileImage.find({ userID: req.params.selectedUserID }).select("_id image")
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `UserProfileImage.find failed, mongoDB related.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }

  console.log(profile_image_to_replace)
  console.log(profile_image_to_replace[0]?.image.name)



  // 2.
  let ret_deletion_old_userprofileimage
  try {
    ret_deletion_old_userprofileimage = await UserProfileImage.deleteOne({ _id: profile_image_to_replace[0]?._id })
    console.log(ret_deletion_old_userprofileimage)
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `UserProfileImage.deleteOne failed, mongoDB related.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }

  // If the names are the same no need to delete the original one as the system automatically replaces
  if (profile_image_to_replace[0]?.image.name == res.locals.newprofilepicname) {
    return next()
  }
  
  // 3.
  try {
    await fs.unlink(path.join(res.locals.directory, profile_image_to_replace[0]?.image.name));
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to delete the saved profile pic file from ${res.locals.directory}, that has been replaced.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }

  return next()
}


async function instantiateNewImageMiddleware(req, res, next) {
  console.log("instantiateNewImageMiddleware...")

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





async function editUsersLinkedImageIDMiddleare(req, res, next) {
  console.log("editUsersLinkedImageIDMiddleare...")

  let updated_user_ret
  // Updating User's userprofileimageID to new one created
  try {
    updated_user_ret = await User.updateOne({ _id: req.params.selectedUserID }, { userprofileimageID: res.locals.ret_userprofileimage_instance._id }, { upsert: false, new: true });
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `User.updateOne failed, mongoDB related.\nSource error: ${e.name}\n${e.message}`)
    return next(error)
  }


  return next()

}





async function saveNewImageEntryMiddleware(req, res, next) {
  console.log("saveNewImageEntryMiddleware...")

  // Saving the user profile image instance
  let ret_userprofileimage_save
  try {
    ret_userprofileimage_save = await res.locals.ret_userprofileimage_instance.save()
  } catch (e) {
    let error = new ProfileImageUploadError("Server Error | Please, try again later", `Was unable to save ret_userprofileimage_instance. ${e.message}`)
    return next(error)
  }

  
  res.locals.newprofileimagename = ret_userprofileimage_save.image.name

  return next()
}







// TODO Some js concepts to learn
profileMiddleware = {
  makeSureDestinationFolderPresentMiddleware: makeSureDestinationFolderPresentMiddleware,
  sharpAndDisplaceNewProfilePicMiddleware: sharpAndDisplaceNewProfilePicMiddleware,
  isThereProfilePicAlreadyMiddleware: isThereProfilePicAlreadyMiddleware,
  retrievePrevImageInfo_DeletePrevPic_DeletePicEntry_Middleware: retrievePrevImageInfo_DeletePrevPic_DeletePicEntry_Middleware,
  instantiateNewImageMiddleware: instantiateNewImageMiddleware,
  editUsersLinkedImageIDMiddleare: editUsersLinkedImageIDMiddleare,
  saveNewImageEntryMiddleware: saveNewImageEntryMiddleware,
}



module.exports = profileMiddleware