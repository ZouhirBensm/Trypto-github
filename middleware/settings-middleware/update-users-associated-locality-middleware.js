const UserAssociatedLocality = require('../../models/UserAssociatedLocality')
const { MongoError } = require('../../custom-errors/custom-errors')


let updateUsersAssociatedLocalityMiddleware = async function (req, res, next) {

  let ret_updatedUserLocality
  try {
    ret_updatedUserLocality = await UserAssociatedLocality.updateOne({ userID: req.params.userID }, res.locals.new_usersAssociatedLocalityData, { upsert: false, new: true });
  } catch (e) {
    const message = `Server error | Please try again later.`
    let error = new MongoError(message)
    return next(error)
  }

  return next()
}


module.exports = updateUsersAssociatedLocalityMiddleware