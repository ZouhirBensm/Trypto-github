const {verifyEmail} = require('../../full-stack-libs/validations')
const MarketingEmail = require('../../models/home-currencyorders-models/MarketingEmail')

const { MongoError } = require('../../custom-errors/custom-errors')


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



async function databaseCollectionSave(req, res, next) {

  let marketing_email

  try {
    marketing_email = await MarketingEmail.create({
      email: req.body.email
    })
  } catch (error) {
    const err = new MongoError(`Was unable to create a MarketingEmail document: ${error.message}`, error.code)
    return next(err)
  }

  console.log(marketing_email)

  return next()

}



module.exports = {
  emailValidationMidleware: emailValidationMidleware,
  databaseCollectionSave: databaseCollectionSave
}

