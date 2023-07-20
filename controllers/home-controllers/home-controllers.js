const httpStatus = require("http-status-codes")

// Custom Error
const { DeleteAccountProcessError } = require("../../custom-errors/custom-errors")




function renderMgtUserSPAController(req, res) {
  
  res.locals.userId = req.session.userId
  
  console.log("\n\n\n---->Data 3:\nuserId:\n\n\n", res.locals.userId)

  
  var JSX_to_load = 'MgtUser';
  
  res.locals.isPaypalScriptNeeded = true

  return res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
}






function deleteAccountController(req, res, next) {
  
  console.log("DELETE /users/profile/delete/:userId: -> res.locals.notifications.length: ", res.locals.notifications.length)

  
  if (res.locals.notifications.length !== 0) {
    let notifications_messages = res.locals.notifications.map(notification => notification.message);
    let e = new DeleteAccountProcessError(notifications_messages)
    return next(e)
  } 

  console.log("DELETE /users/profile/delete/:userId: ->res.locals.paths_URL_fromReferer[0]: ", res.locals.notifications.length)

  const msg = "User account and linked data completly deleted."
  
  return res.status(200).json({
    srv_: msg,
    referer: res.locals.paths_URL_fromReferer[0]
  })
}




homeController = {
  renderMgtUserSPAController: renderMgtUserSPAController,
  deleteAccountController: deleteAccountController,
}

module.exports = homeController