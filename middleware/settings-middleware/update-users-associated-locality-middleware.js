const UserAssociatedLocality = require('../../models/UserAssociatedLocality')
const { MongoError, GoogleAPIError } = require('../../custom-errors/custom-errors')


let updateUsersAssociatedLocalityMiddleware = async function (req, res, next) {
  let ret_updatedUserLocality
  try {
    ret_updatedUserLocality = await UserAssociatedLocality.updateOne({ userID: req.params.userID }, res.locals.upd_UserAssociatedLocality, { upsert: false, new: true });
  } catch (e) {
    let error = new MongoError()
    return next(error)
  }

  return next()
}


module.exports = updateUsersAssociatedLocalityMiddleware