const User = require('../../models/User')
const Subscriber = require('../../models/Subscriber')
const ROLE = require('../../full-stack-libs/Types/Role')

const { MongoError } = require('../../custom-errors/custom-errors')



async function createSubsciptionDocument(req, res, next){

  let subscriber
  try {
    subscriber = await Subscriber.create({
      paypal_subscriptionID: req.body.paypal_subscriptionID,
      paypal_plan_id: req.body.paypal_plan_id,
      paypal_product_id: req.body.paypal_product_id,
      plan: ROLE.USER.SUBSCRIBER.BASIC,
      userID: req.body.userId
    })
  } catch (error) {
    const err = new MongoError(`Was unable to create a Subscriber document: ${error.message}`, error.code)
    return next(err)
  }


  res.locals.subscriber = subscriber

  return next()

}



async function updateUserToBasic(req, res, next){

  let userSetToBasic

  try { 
    userSetToBasic = await User.updateOne({ _id: req.body.userId }, { subscriptionID: res.locals.subscriber._id, role: ROLE.USER.SUBSCRIBER.BASIC }); 
  } catch (e) { 
    console.error(e)
  }

  return next()
}



const upgradeToBasicMiddleware = {
  createSubsciptionDocument,
  updateUserToBasic,
}


module.exports = upgradeToBasicMiddleware

