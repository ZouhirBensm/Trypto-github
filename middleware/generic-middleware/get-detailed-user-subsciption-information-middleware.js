const User = require('../../models/User')
const {SessionRoleOrSentUIDnotAllowed} = require('../../custom-errors/custom-errors')


function getDetailedUserSubscriptionInfo(_from) {
  return async (req, res, next) => {
    let selectedUser = null
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
    let query = User.findOne({
      _id: from,
      // subscriptionID: { $ne: null }
    })
    .select('registrationDateTime username email subscriptionID -_id')
  
    query = query.populate({
      // Populate protagonists
      path: "subscriptionID",
      // Fields allowed to populate with
      select: "-_id plan subscriptionDateTime paypal_subscriptionID paypal_plan_id expireAt",
    })
  
    selectedUser = await query.exec()
    console.log({ selectedUser })
    
    res.locals.selectedUser = selectedUser
  
    if (res.locals.selectedUser) {
    // if (false) {
      return next()
    } else {
      let error = new SessionRoleOrSentUIDnotAllowed(`res.locals.selectedUser information could not be retrieved on the backend`, `In the middleware/generic-middleware/get-detailed-user-subsciption-information-middleware.js the res.locals.selectedUser resolved to ${res.locals.selectedUser}. A res.locals.selectedUser is required to proceed in the ${req.method} ${req.url}`)

      return next(error)
    }
  }
}


module.exports = {getDetailedUserSubscriptionInfo}