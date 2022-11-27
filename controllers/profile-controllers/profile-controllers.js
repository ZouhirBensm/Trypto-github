async function sucessUploadProfilePicController(req, res, next) {

  console.log("sucessUploadProfilePicController...")
  
  let message = `Success updating your profile picture`
  return res.status(200).json({
    message: message,
    newprofileimagename: res.locals.newprofileimagename
  });

}


profileController = {
  sucessUploadProfilePicController: sucessUploadProfilePicController
}


module.exports = profileController