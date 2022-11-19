const {SessionRoleOrSentUIDnotAllowed} = require('../../custom-errors/custom-errors')
const {canProceed} = require('./helper-functions-middleware')

function requester_auth_middleware(which_request_UID_source){
  return (req,res,next) => {
    console.log("Authenticating...")
    let request_UID

    switch (which_request_UID_source) {
      case 1:
        request_UID =  req.body.userId
        break;
      case 2:
        request_UID =  req.params.userID
        break;
      case 3:
        request_UID =  req.query.userId
        break;
      case 4:
        request_UID =  req.params.userId
        break;
      case 5:
        if (req.params.data_of_userID) {
          request_UID =  req.params.data_of_userID
        } else {
          return next()
        }
        break;
      default:
        break;
        
    }


    if (canProceed(res.locals.user, request_UID)) {
    // if (false) {
      console.log("done auth...")
      return next()
    } else {
      let error = new SessionRoleOrSentUIDnotAllowed(`Role or request UID inadequate.`, `Role or request UID inadequate.`)
      return next(error)
    }
  }
}


module.exports = { requester_auth_middleware }