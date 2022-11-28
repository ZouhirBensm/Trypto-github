const UserProfileImage = require('../../models/UserProfileImage')

module.exports = async (req,res,next)=>{
  
  let ret_delete_userprofileimage
  
  try{
    ret_delete_userprofileimage = await UserProfileImage.findOneAndDelete({userID: req.params.userId})
  } catch(e) {
    res.locals.notifications.push(e);
  }

  console.log(ret_delete_userprofileimage)
  res.locals.ret_delete_userprofileimage = ret_delete_userprofileimage

  if(!ret_delete_userprofileimage){
    return next()
  }


  res.locals.profilepicname = ret_delete_userprofileimage.image?.name

  return next()
}