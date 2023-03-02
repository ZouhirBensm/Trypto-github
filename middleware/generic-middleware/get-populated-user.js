const User = require('../../models/User')
const {SessionRoleOrSentUIDnotAllowed} = require('../../custom-errors/custom-errors')


function getPopulatedUser(userID_from, populate) {
  return async (req, res, next) => {
    let selectedUser = null
    let from
  
    switch (userID_from) {
      case "PATHPARAM":
        from = req.params.userID
        break;
      case "SESSION":
        from = req.session.userId
        break;
    
      default:
        break;
    }


    let query = User.findOne({
      _id: from,
      // subscriptionID: { $ne: null }
    })
    .select('registrationDateTime username email subscriptionID')
  
    let select
    // TODO ! have scenario where populate not necessary, e.g. populate is undefined by default and therefor no populate takes place.
    switch (populate) {
      case "subscriptionID":
        select = "plan subscriptionDateTime paypal_subscriptionID paypal_plan_id expireAt -_id"
        break;
      case "userassociatedlocalityID":
        select = "location geometry -_id"
      break;
      default:
        break;
    }

    query = query.populate({
      // Populate protagonists
      path: populate,
      // Fields allowed to populate with
      select: select,
    })

  
    selectedUser = await query.exec()

    console.log("\n\n\n---->Data 1:\nselectedUser:\n\n\n", { selectedUser })
    
    res.locals.selectedUser = selectedUser
  
    if (res.locals.selectedUser) {
    // if (false) {
      return next()
    } else {
      let error = new SessionRoleOrSentUIDnotAllowed(`res.locals.selectedUser information could not be retrieved on the backend`, `In the middleware/generic-middleware/get-populated-user.js the res.locals.selectedUser resolved to ${res.locals.selectedUser}. A res.locals.selectedUser is required to proceed in the ${req.method} ${req.url}`)

      return next(error)
    }
  }
}


module.exports = {getPopulatedUser}