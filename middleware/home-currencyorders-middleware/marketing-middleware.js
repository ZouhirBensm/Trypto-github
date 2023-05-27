const {verifyEmail} = require('../../full-stack-libs/validations')


function emailValidationMidleware(req, res, next) {
  console.log(req.body)


  if (!req.body.email) {
    const error_message = 'No email payload not retrieved or empty.'
    return res.status(500).json({
      message: error_message
    })
  }

  ({ flag, notification } = verifyEmail(req.body.email));

  if (!flag) {
    return res.status(500).json({
      message: notification
    })
  }

  return next()

}



module.exports = {
  emailValidationMidleware: emailValidationMidleware
}

