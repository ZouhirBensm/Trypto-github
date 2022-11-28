
const UserProfileImage = require('../../models/UserProfileImage')

const {MongoError} = require('../../custom-errors/custom-errors')
var ObjectId = require('mongodb').ObjectId;

function getProfilePicNameIfAnyMiddleware(_from) {
  return async (req, res, next) => {

    let from

    switch (_from) {
      case "PATHPARAM":
        from = req.params.userID
        break;
      case "SESSION":
        from = req.session.userId
        break;

      default:
        break;
    }


    let ret_userprofileimage

    try {
      ret_userprofileimage = await UserProfileImage.find({ userID: ObjectId(from) }).select('image.name')
    } catch (e) {
      let error = new MongoError(`MongoError UserProfileImage.find(): ${e.name} ${e.message}`, 500)
      return next(error)
    }

    if (ret_userprofileimage[0]) {
      res.locals.profileimagename = ret_userprofileimage[0].image.name
    } else {
      res.locals.profileimagename = 'square.jpg'
    }



    return next()

  }
  
}

  module.exports = { getProfilePicNameIfAnyMiddleware }