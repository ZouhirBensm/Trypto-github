const { verifyEmail, verifyPassword } = require('../../full-stack-libs/validations')
//We import the User model
const User = require('../../models/User')
const HexForUnactiveUser = require('../../models/HexForUnactiveUser')
const Subscriber = require('../../models/Subscriber')
const ROLE = require('../../full-stack-libs/Types/Role')
// const bcrypt = require('bcrypt')




const ENV = require('../../config/base')

var nodemailer = require('nodemailer');


const httpStatus = require("http-status-codes")
const { ValidationError, LoggingInError, MongoError } = require('../../custom-errors/custom-errors')


// TODO have these functions in their thing and not in a object that is exported
module.exports = {
  validateController: (req, res, next) => {
    let flag, notification = [];
    // console.log(req.body);

    ({ flag, notification } = verifyEmail(req.body.email));
    // console.log(flag, notification);

    if (flag) {
      ({ flag, notification } = verifyPassword(req.body.password));
      // console.log(flag, notification);
      if (flag) {
        //execute registerController with the current req
        next()
      } else {
        // console.log('Password failed to validate') 
        const error = new ValidationError(notification, "Password")
        return next(error)
      }
    } else {
      // console.log('Email failed to validate')
      const error = new ValidationError(notification, "Email")
      return next(error)
    }

  },
  checkRegisterController: async (req, res, next) => {
    console.log("we got: ", req.body)

    let mightFindUser
    try {
      mightFindUser = await User.findOne(req.body)
    } catch (e) {
      error = new MongoError(e.message, e.code)
      return next(error)
    }

    if (mightFindUser) {
      console.log("one", mightFindUser)
      res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: {
          message: ['We did find a duplicate email in the database, please register under another email.']
        }
      })
    } else {
      console.log("one", mightFindUser)
      res.status(httpStatus.StatusCodes.OK).json({
        server: {
          message: ['We did not find a duplicate email']
        }
      })
    }
  },

  registerController: async (req, res, next) => {

    console.log("\nin registerController:\n__________________________\n\n", req.body)

    let user_instance
    switch (req.body.plan) {
      case ROLE.USER.NOTSUBSCRIBER:

        req.body.role = ROLE.USER.NOTSUBSCRIBER



        let hex_for_unactive_user_instance = new HexForUnactiveUser()

        user_instance = new User(req.body)

        user_instance.hexforunactiveuserID = hex_for_unactive_user_instance._id
        hex_for_unactive_user_instance.userID = user_instance._id


        let ret_hex_for_unactive_user_save, ret_user_save
        try {
          ret_hex_for_unactive_user_save = await hex_for_unactive_user_instance.save()
          console.log("ok")
        } catch (err) {
          err = new MongoError(`some bla bla: ${err.message}`, err.code)
          return next(err)
        }

        try {
          ret_user_save = await user_instance.save()
        } catch (err) {
          err = new MongoError(`some bla bla: ${err.message}`, err.code)
          return next(err)
        }

        console.log(1)
        console.log("\n\nret_user_save.email", ret_user_save.email)
        console.log("\n\nret_hex_for_unactive_user_save.hexfield", ret_hex_for_unactive_user_save.hexfield)
        // console.log("\n\nURL_fromReferer", res.locals.URL_fromReferer)
        // console.log("\n\nURL_fromAPIcall", res.locals.URL_fromAPIcall)
        console.log("\n\nparsed_URL_fromReferer[1]", res.locals.parsed_URL_fromReferer[1])


        // TODO ! refactor code to middleware system (1)
        // Following the reasoning in: https://stackoverflow.com/questions/39092822/how-to-confirm-email-address-using-express-node


        // bidblockcanada@gmail.com is gonna be used for production
        // businessZBRS@gmail.com is used for development and staging
        
        // Google manage account > Security > Signing in to google
        // Setup 2 F auth and pass code
        // https://myaccount.google.com/u/6/apppasswords?rapt=AEjHL4PCBycA8osD1m9mqOgtUgpo8AU48Y4RZ4hsYS9SBSpj_xc5vYMWQf3-88xs7ZEgXUZbM8DPBtVbFMmSfQqzn3-2x7xHLA
        
        // Resources:
        // https://www.w3schools.com/nodejs/nodejs_email.asp
        // https://nodemailer.com/usage/using-gmail/
        // https://support.google.com/accounts/answer/185833?hl=en
        // https://support.google.com/accounts/answer/6010255?authuser=6&hl=en-GB&authuser=6&visit_id=638011270511610665-1333907235&p=less-secure-apps&rd=1
        // https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer

        // TODO make it unable to login without activating account
        // When click confirming redirect to login page if no bidblock window open, or replace most recent bidblock page with login page
        // TODO When done registered go to the confirm email page.

        if (!(ret_hex_for_unactive_user_save && ret_user_save)) {
          // TODO integrate error with UI
          let e = new Error("The user or hex save f'ed up!")
          return next(e)
        }


        console.log(`Welcome ${ret_user_save.email}!\n\nPlease confirm your ${ENV.domain_without_protocol} account now, by clicking on this link:\n\n${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/confirm-user-email/${ret_user_save._id}/${ret_hex_for_unactive_user_save.hexfield}\n\nThank you!`)
        // TODO send the email


        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: ENV.bidblock_email,
            pass: ENV.bidblock_email_app_pass_code
          }
        });


        console.log("transporter::::\n\n", transporter)
        console.log(2)

        let info
        var mailOptions = {
          from: ENV.bidblock_email,
          to: req.body.email,
          subject: 'Confirm your BidBlock Account Now!',
          // TODO send email with a link to the server with the hex mounted on to activate the user
          text: `Welcome ${ret_user_save.email}!\n\nPlease confirm your ${ENV.domain_without_protocol} account now, by clicking on this link:\n\n${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/confirm-user-email/${ret_user_save._id}/${ret_hex_for_unactive_user_save.hexfield}\n\nThank you!`
        };
        
        try {
          info = await transporter.sendMail(mailOptions);
        } catch (error) {
          return next(error)
        }

        console.log("returned info::::::\n\n\n", info);
        console.log(3)


        res.status(200).json({
          server: {
            message: [`User ${req.body.email} successfully created`]
          }
        })
        console.log(4)

        break;
      // TODO implementation needs to be presend, temporarily commented out!

      // case ROLE.USER.SUBSCRIBER.BASIC:
      //   req.body.role = ROLE.USER.SUBSCRIBER.BASIC
      //   let subscriber_instance = new Subscriber({
      //     paypal_subscriptionID: req.body.paypal_subscriptionID,
      //     paypal_plan_id: req.body.paypal_plan_id,
      //     paypal_product_id: req.body.paypal_product_id,
      //     plan: req.body.plan
      //   })

      //   user_instance = new User({
      //     email: req.body.email,
      //     password: req.body.password,
      //     role: req.body.role
      //   })

      //   subscriber_instance.userID = user_instance._id
      //   user_instance.subscriptionID = subscriber_instance._id


      //   try {
      //     await user_instance.save()
      //   } catch (err) {
      //     err = new MongoError(`You have successfully subscribed on paypal's servers, but not on BidBlock's servers' because of this error: ${err.message}`, err.code)
      //     return next(err)
      //   }
      //   console.log("saved user information")

      //   try {
      //     await subscriber_instance.save()
      //   } catch (err) {
      //     err = new MongoError(`You have successfully subscribed on paypal's servers, but not on BidBlock's servers' because of this error: ${err.message}`, err.code)
      //     return next(err)
      //   }
      //   console.log("saved subscriber information")

      //   res.status(200).json({
      //     server: {
      //       message: [`Subscriber ${req.body.email} successfully created, with the paypal subscriber ID: ${req.body.paypal_subscriptionID}`]
      //     }
      //   })

      //   break;

      default:
        break;
    }


    // Used to circumvent, needs deletion
    // res.status(200).json({
    //   server: {
    //     message: [`Za3ma User ${req.body.email} successfully created`]
    //   }
    // })




  },
  loginController: async (req, res, next) => {

    console.log("\nnotification end:\n", res.locals.notification)
    console.log("\nreq.session.userId end:\n", req.session.userId)
    if (req.session.userId && res.locals.notification.length == 0) {
      // res.json({
      //   data: ['success']
      // })
      res.status(200).json({
        server: {
          message: ["User successfully logged in"]
        }
      })
    } else {
      // simple way
      let err = new LoggingInError(res.locals.notification)
      // err.message = res.locals.notification
      console.log(err)
      return next(err)
    }

  },

  invalidPathHandler: (req, res, next) => {
    // console.log(req.method)
    if (req.method === "GET") {
      let errorCode = httpStatus.StatusCodes.NOT_FOUND
      res.status(errorCode)
      res.render('bodies/error')
    }
    next()
  }
}