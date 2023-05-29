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
    // console.log("\n\nUSER:", userfindOne)
    res.locals.user = userfindOne
  } catch (e) {
    const error = new Error("No user session was found")
    return next(error)
  }

  // console.log("res.locals.paths_URL:", res.locals.paths_URL)

  // console.log("userfindOne:", userfindOne)
  const profile_img_path = userfindOne?.userprofileimageID?.path.replace("public", '')

  // console.log('???????::: ', (userfindOne?.userprofileimageID))

  res.locals.loggedInUserImgProfilePath = (userfindOne?.userprofileimageID) ? profile_img_path + '/' + userfindOne?.userprofileimageID?.image.name : '/img/profile-images/square.png'

  res.locals.loggedInUserName = userfindOne?.username

  // console.log('res.locals.loggedInUserImgProfilePath: ', res.locals.loggedInUserImgProfilePath)


  return next()
}



module.exports = {
  set_user_if_any
}