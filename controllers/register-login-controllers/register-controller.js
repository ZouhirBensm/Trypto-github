const ROLE = require('../../full-stack-libs/Types/Role')

function responseOnRegistrationController(req, res) {

  // console.log("\n\n", res.locals.ret_subinfo_save.paypal_subscriptionID,  " vs ", req.body.paypal_subscriptionID)


  let success_msg = (
    res.locals.ret_user_save.plan == ROLE.USER.SUBSCRIBER.BASIC ? `Subscriber ${res.locals.ret_user_save.username} successfully created, with the paypal subscriber ID: ${res.locals.ret_subinfo_save.paypal_subscriptionID}` :
    res.locals.ret_user_save.plan == ROLE.USER.NOTSUBSCRIBER ? `User ${res.locals.ret_user_save.username} successfully created` :
    null
  )

  // console.log(success_msg)


  if(res.locals.user_instance.active) {
    req.session.userId = res.locals.user_instance._id;
  }

  return res.status(200).json({
    server: {
      message: [success_msg],
    }
  })
}



registerController = {
  responseOnRegistrationController: responseOnRegistrationController,
}


module.exports = registerController