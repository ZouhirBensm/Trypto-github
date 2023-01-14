const User = require('../../../models/User')


async function getTheUpdatedUserToUseInQueryStringOnFrontEnd(req,res,next){

  let query = User.findById(req.params.userID)
  query = query.populate({
    path: "userassociatedlocalityID",
    select: "location geometry -_id"
  })
  .select('-password')

  const updated_user = await query.exec()

  res.locals.updated_user = updated_user

  return next()
  
}


const operationsSettingsMiddleware = {
  getTheUpdatedUserToUseInQueryStringOnFrontEnd: getTheUpdatedUserToUseInQueryStringOnFrontEnd,
}

module.exports = operationsSettingsMiddleware