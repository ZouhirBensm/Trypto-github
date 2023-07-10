const User = require('../../models/User')

async function set_user_if_any(req, res, next) {

  let userfindOne
  try {
    userfindOne = await User.findById(req.session.userId)
    .populate({
      // Populate protagonists
      path: "userprofileimageID",
      // Fields allowed to populate with
      select: "path image.name -_id",
    })
    .select("-password")
    res.locals.user = userfindOne
  } catch (e) {
    const error = new Error("No user session was found")
    return next(error)
  }

  const profile_img_path = userfindOne?.userprofileimageID?.path.replace("public", '')


  res.locals.loggedInUserImgProfilePath = (userfindOne?.userprofileimageID) ? profile_img_path + '/' + userfindOne?.userprofileimageID?.image.name : '/img/profile-images/square.png'

  res.locals.loggedInUserName = userfindOne?.username

  res.locals.loggedInUserId = userfindOne?._id


  // console.log('test0', res.locals.user, res.locals.loggedInUserImgProfilePath, res.locals.loggedInUserName, res.locals.loggedInUserId, "\n______________________________________________________\n")


  return next()
}



module.exports = {
  set_user_if_any
}