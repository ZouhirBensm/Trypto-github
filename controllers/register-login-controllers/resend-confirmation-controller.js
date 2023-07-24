const User = require('../../models/User')
const HexForUnactiveUser = require('../../models/HexForUnactiveUser');
var nodemailer = require('nodemailer');
const ENV = require('../../config/base')


async function resendConfirmationController(req, res, next) {

  console.log(req.params)


  let ret_user
  try {
    ret_user = await User.findOne({ email: req.params.userEmail })
  } catch (e) {
    return next(e)
  }

  if (!ret_user) {
    // if(true) {
    let e = new Error("No found user under that email")
    return next(e)
  }

  if (ret_user.active) {
    let e = new Error("Account already active")
    return next(e)
  }


  let ret_user_hex
  try {
    ret_user_hex = await HexForUnactiveUser.findOne({ userID: ret_user._id })
  } catch (e) {
    return next(e)
  }

  console.log(ret_user)



  let now = new Date()


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: ENV.bidblock_email,
      pass: ENV.bidblock_email_app_pass_code
    }
  });


  // console.log("transporter::::\n\n", transporter)
  // console.log(2)

  let info
  var mailOptions = {
    from: ENV.bidblock_email,
    to: ret_user.email,
    subject: `${ENV.domain_without_protocol}, Confirm your Account Now!`,
    text: `Date: ${now},\n\nWelcome ${ret_user.username}!\n\nPlease confirm your ${ENV.domain_without_protocol} account now, by clicking on this link:\n\n${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/confirm-user-email/${ret_user._id}/${ret_user_hex.hexfield}\n\nThank you!`
  };

  try {
    info = await transporter.sendMail(mailOptions);
  } catch (e) {
    return next(e)
  }

  console.log("returned info::::::\n\n\n", info);
  console.log(3)

  // ___________________________________________

  if (!info) {
    let e = new Error("Message not sent")
    return next(e)
  }

  res.status(200).json({
    message: `Resent the confirmation message @ ${now}`
  })

}




module.exports = { resendConfirmationController }