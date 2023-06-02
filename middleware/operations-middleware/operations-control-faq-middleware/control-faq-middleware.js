const {MongoError, GenericJSONError} = require('../../../custom-errors/custom-errors')
const FAQ = require('../../../models/operations-models/FAQ')
const httpStatus = require("http-status-codes")


async function saveNewfaqMiddleware(req, res, next){

  console.log(req.body)

  
  let FAQ_ret

  try {
    FAQ_ret = await FAQ.create({
      title: req.body.title,
      inputs: req.body.inputs,
    })
  } catch (e) {
    const message_error = 'Was unable to save the FAQ on the backend.'
    const error = new MongoError(message_error, e.code)
    return next(error)
  }

  // console.log("FAQ_ret:\n", FAQ_ret)

  if (!FAQ_ret) {
  // if (true) {
    const message_error = "FAQ_ret variable was not assigned/"
    const error = new GenericJSONError(message_error)
    return next(error)
  }

  return next()

}



module.exports = {
  saveNewfaqMiddleware
}