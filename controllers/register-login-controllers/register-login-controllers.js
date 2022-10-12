const { verifyEmail, verifyPassword } = require('../../full-stack-libs/validations')
//We import the User model
const User = require('../../models/User')
const HashForUnactiveUser = require('../../models/HashForUnactiveUser')
const Subscriber = require('../../models/Subscriber')
const ROLE = require('../../full-stack-libs/Types/Role')
// const bcrypt = require('bcrypt')

var nodemailer = require('nodemailer');


const httpStatus = require("http-status-codes")
const { ValidationError, LoggingInError, MongoError } = require('../../custom-errors/custom-errors')


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



        let hash_for_unactive_user_instance = new HashForUnactiveUser()

        user_instance = new User(req.body)

        user_instance.hashforunactiveuserID = hash_for_unactive_user_instance._id
        hash_for_unactive_user_instance.userID = user_instance._id


        try {
          await hash_for_unactive_user_instance.save()
          console.log("ok")
        } catch (err) {
          err = new MongoError(`some bla bla: ${err.message}`, err.code)
          return next(err)
        }

        try {
          await user_instance.save()
        } catch (err) {
          err = new MongoError(`some bla bla: ${err.message}`, err.code)
          return next(err)
        }

        console.log(1)


        // Google manage account > Security > Signing in to google
        // TODO ! refactor code to middleware system (1)
        // Following the reasoning in: https://stackoverflow.com/questions/39092822/how-to-confirm-email-address-using-express-node
        // TODO swap email for a real bidblock email, so generate a bidblock email
        // Disable 2 factor authentication on the businessZBRS@gmail.com account
        // TODO rid of the app password namespace nodemailer bidblock on link:
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

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            // TODO put this in a environment variable
            user: 'businessZBRS@gmail.com',
            // TODO put this in a environment variable
            pass: 'shcazquolqxlfyge'
          }
        });


        console.log("transporter::::\n\n", transporter)
        console.log(2)

        let info
        var mailOptions = {
          from: 'businessZBRS@gmail.com',
          to: req.body.email,
          subject: 'Sending Email using Node.js First Fn Test!!!',
          // TODO send email with a link to the server with the hash mounted on to activate the user
          text: 'That was easy! Zozo'
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