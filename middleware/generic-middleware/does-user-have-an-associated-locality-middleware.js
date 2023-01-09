const User = require('../../models/User')
const { MongoError } = require('../../custom-errors/custom-errors')


let doesUserHaveAnAssociatedLocalityMiddleware = async function (req, res, next) {
  let ret_user
  try {
    ret_user = await User.findOne({ _id: req.params.userID });
  } catch (e) {
    const message = `Server error | Please try again later.`
    let error = new MongoError(message)
    return next(error)
  }

  res.locals.does_have_userassociatedlocalityID = ret_user.userassociatedlocalityID
  console.log('\n\ndoesUserHaveAnAssociatedLocalityMiddleware(): -> res.locals.does_have_userassociatedlocalityID:\n', res.locals.does_have_userassociatedlocalityID)
  return next()
}


module.exports = doesUserHaveAnAssociatedLocalityMiddleware