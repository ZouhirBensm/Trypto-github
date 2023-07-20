const FAQ = require('../../models/operations-models/FAQ')
const { MongoError } = require('../../custom-errors/custom-errors')


// async function retrieveFAQsMiddleware(req, res, next) {

//   let ret_faqs

//   try {
//     ret_faqs = await FAQ
//     .find()
//     .sort({ postedDateTime: -1 })
//     .limit(5);

//   } catch (e) {
//     const error_message = 'FAQs failed to be retrieved. Mongo error.'
//     let error = new MongoError(error_message, e.code)
//     return next(error)
//   }

//   res.locals.ret_faqs = ret_faqs
//   return next()

// }


async function retrieveFAQsMiddleware(req, res, next) {
  let ret_faqs;

  try {
    const query = FAQ.find().sort({ postedDateTime: -1 });



    if (req.query.limit) {
      const limit = parseInt(req.query.limit)
      query.limit(limit);
    }

    ret_faqs = await query.exec();
  } catch (e) {
    const error_message = 'FAQs failed to be retrieved. Mongo error.';
    let error = new MongoError(error_message, e.code);
    return next(error);
  }


  // console.log(ret_faqs)
  res.locals.ret_faqs = ret_faqs;
  return next();
}








module.exports = {
  retrieveFAQsMiddleware: retrieveFAQsMiddleware,
}

