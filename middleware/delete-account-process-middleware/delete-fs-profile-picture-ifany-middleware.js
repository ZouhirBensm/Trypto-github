const fs = require('fs/promises')
const path = require('path')
const User = require('../../models/User')

module.exports = async (req,res,next)=>{

  if(!res.locals.profilepicname || !res.locals.ret_delete_userprofileimage) {
    return next()
  }

  const profilePicsDirectory = `public/img/profile-images`
  try {
    await fs.unlink(path.join(profilePicsDirectory, res.locals.profilepicname));
  } catch (e) {
    res.locals.notifications.push(e);
  }

  // Update the user entry
  let updated_user_ret
  try {
    updated_user_ret = await User.updateOne({ _id: req.params.userId }, { userprofileimageID: null }, { upsert: false, new: true });
  } catch (e) {
    res.locals.notifications.push(e);
  }

  return next()
}