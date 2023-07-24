var nodemailer = require('nodemailer');

const ENV = require('../../config/base')



async function middleware0(req, res, next) {
  console.log(req.body)

  setTimeout(()=>{
    return next()
  }, 5000)
}


async function middleware1(req, res, next) {
  console.log("middleware1...")
  let now = new Date()


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ENV.bidblock_email,
      pass: ENV.bidblock_email_app_pass_code
    }
  });

  let info
  var mailOptions = {
    from: ENV.bidblock_email,
    to: ENV.bidblock_email,
    subject: `${ENV.domain_without_protocol}, /contact page message`,
    text: `Date: ${now},\n\n
    From: ${req.body.email},\n\n
    Message: ${req.body.message}`
  };

  try {
    info = await transporter.sendMail(mailOptions);
  } catch (e) {
    return next(e)
  }


  if (!info) {
    const message = "Message not sent"
    let e = new Error(message)
    return next(e)
  }


  return next()
}





async function middleware2(req, res, next) {
  console.log("middleware2...")

  res.status(500).json({
    message: "Error Test!"
  })

  // return next()

}


async function middleware3(req, res, next) {
  console.log("middleware3...")

  return next()

}





async function middleware4(req, res, next) {
  console.log("middleware4...");


  return next();
}






async function middleware5(req, res, next) {
  console.log("middleware5...")


  return next()
}













const deleteArticleMiddleware = {
  middleware0: middleware0,
  middleware1: middleware1,
  middleware2: middleware2,
  middleware3: middleware3,
  middleware4: middleware4,
  middleware5: middleware5,
}






module.exports = deleteArticleMiddleware