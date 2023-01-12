const User = require('../../../models/User')


async function basedOnRequestAdapterToSettings(req,res,next){
  // Adaption is required, because on /operations we determine whether post or put from on the front end i.e. presence or not of userassociatedlocalityID.
  // Whereas in the /settings we require to determine if update or create based on the backend query to User and see if userassociatedlocalityID
  // This middleware just adds the presence of res.locals.does_have_userassociatedlocalityID to be able and re-use the middlewares from /settings-middleware folder
  // TODO !!!! ideally have the settings system also determine and PUT or POST from the front end!
  res.locals.does_have_userassociatedlocalityID = undefined
  console.log("\n\nMETHOD: ", req.method)
  if (req.method == "POST") res.locals.does_have_userassociatedlocalityID = false
  if (req.method == "PUT") res.locals.does_have_userassociatedlocalityID = true
  return next()
}


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
  basedOnRequestAdapterToSettings: basedOnRequestAdapterToSettings,
  getTheUpdatedUserToUseInQueryStringOnFrontEnd: getTheUpdatedUserToUseInQueryStringOnFrontEnd,
}

module.exports = operationsSettingsMiddleware