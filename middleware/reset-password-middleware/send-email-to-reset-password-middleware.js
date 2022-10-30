const ENV = require('../../config/base')
var nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs')


module.exports = async (req,res, next) =>{
  console.log("\n\n\n__________________sendEmailToResetPasswordMiddleware")

  if(res.locals.done) return next()


  // Not done so email needs to be sent here
  // send email
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ENV.bidblock_email,
      pass: ENV.bidblock_email_app_pass_code
    }
  });


  // console.log("\n\n---cred:", ENV.bidblock_email, ENV.bidblock_email_app_pass_code)
  // console.log("\n\n---Transporter:\n\n", transporter)

  let now = new Date()

  mailOptions = {
    from: ENV.bidblock_email,
    to: req.body.email,
    subject: `${ENV.domain_without_protocol}, Reset your password!`,
    text: `Date: ${now},\n\nHello, ${res.locals.ret_user.email}!\n\nIn order to reset your password for ${ENV.domain_without_protocol} account, please proceed by clicking on this link:\n\n${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/users/requestresetpasswordpage/${res.locals.hex}\n\nThank you!`
  };




  try {
    // console.log("\n---before info\n\n", mailOptions)
    info = await transporter.sendMail(mailOptions);
    // console.log("\n----after info:\n\n", info)
  } catch (e) {
    // some error handling
  }

  // console.log("\n\n\nInfo:\n\n\n", info);

  if (!info) {
    // console.log("\n\n----THERE IS NO INFO")
    // some error handling
  }



  return next()

}
