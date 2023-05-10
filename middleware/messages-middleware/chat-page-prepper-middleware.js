
const User = require('../../models/User')
const {MongoError} = require('../../custom-errors/custom-errors')

module.exports = async (req, res, next) => {

  res.locals.userIdB = req.query.userIdB;
  res.locals.orderId = req.query.orderId;

  // console.log("\n\n________________res.locals.user.email:\n\n", res.locals.user.email,
  //   "\n\nreq.query.userIdB:\n\n", req.query.userIdB,
  //   "\n\nreq.query.orderId:\n\n", req.query.orderId)


  let ret_userB

  try {
    ret_userB = await User.findById(req.query.userIdB)
      .populate({
        // Populate protagonists
        path: "userprofileimageID",
        // Fields allowed to populate with
        select: "path image.name -_id",
      })
      .select('-_id userprofileimageID username')
  } catch (error) {
    const message = "User B could not be identified within the Database."
    const e = new MongoError(message, error.code)
    return next(e)
  }

  console.log("ret_userB: ", ret_userB)

  res.locals.userUsernameB = ret_userB.username

  const default_userB_profile_image_path = "public/img/profile-images/square.png"

  let userB_profile_image_path = ret_userB.userprofileimageID ? ret_userB.userprofileimageID.path + '/' + ret_userB.userprofileimageID.image.name : default_userB_profile_image_path


  userB_profile_image_path = userB_profile_image_path.replace("public", '')

  res.locals.userB_profile_image_path = userB_profile_image_path

  console.log("\n\nuserB_profile_image_path--->", userB_profile_image_path)


  return next()
}