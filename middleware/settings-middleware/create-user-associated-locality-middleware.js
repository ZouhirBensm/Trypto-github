const UserAssociatedLocality = require('../../models/UserAssociatedLocality')
const User = require('../../models/User')

const { MongoError } = require('../../custom-errors/custom-errors')
const { ObjectId } = require('mongodb')


let createUserAssociatedLocalityMiddleware = async function (req, res, next) {

  // If user does have an associated locality, then skip, because associated locality has already been updated, no need to create one
  if (res.locals.does_have_userassociatedlocalityID) return next() 


  // Create the locality instance pointing to the proper user
  res.locals.new_usersAssociatedLocalityData.userID = new ObjectId(req.params.userID)

  const userAssociatedLocality_instance = new UserAssociatedLocality(res.locals.new_usersAssociatedLocalityData)

  

  let ret_save_userAssociatedLocality
  try {
    ret_save_userAssociatedLocality = await userAssociatedLocality_instance.save()
  } catch (e) {
    const message = `Server error | Please try again later.`
    let error = new MongoError(message)
    return next(error)
  }


  let ret_updatedUsersAssociatedLocality
  try {
    // This would have worked too {userassociatedlocalityID: userAssociatedLocality_instance._id}
    ret_updatedUsersAssociatedLocality = await User.updateOne({ _id: req.params.userID }, {userassociatedlocalityID: ret_save_userAssociatedLocality._id}, { upsert: false, new: true });
  } catch (e) {
    const message = `Server error | Please try again later.`
    let error = new MongoError(message)
    return next(error)
  }

  return next()
}


module.exports = createUserAssociatedLocalityMiddleware