const {verifyEmail, verifyPassword} = require('../../full-stack-libs/validations')
//We import the User model
const User = require('../../models/User')
const Subscriber = require('../../models/Subscriber')
const ROLE = require('../../full-stack-libs/Types/Role')
// const bcrypt = require('bcrypt')
var bcrypt = require('bcryptjs');

const httpStatus = require("http-status-codes")
const { ValidationError, LoggingInError, MongoError } = require('../../custom-errors/custom-errors')


module.exports = {
  validateController: (req,res, next) => {
    let flag, notification = [];
    console.log(req.body);
  
    ({flag, notification} = verifyEmail(req.body.email));
    console.log(flag, notification);
  
    if (flag) {
      ({flag, notification} = verifyPassword(req.body.password));
      console.log(flag, notification);
      if (flag) {
        //execute registerController with the current req
        next()
      } else {
        console.log('Password failed to validate') 
        const error = new ValidationError(notification, "Password")
        return next(error) 
      }
    } else {
      console.log('Email failed to validate')
      const error = new ValidationError(notification, "Email")
      return next(error)
    }

  },
  checkRegisterController: async(req,res,next) => {
    console.log("we got: ", req.body)

    let mightFindUser
    try {
      mightFindUser = await User.findOne(req.body)
    } catch (e) {
      error = new MongoError(e.message, e.code)
      return next(error)
    }
    
    if(mightFindUser){
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

  registerController: async (req,res, next) => {

    console.log("in registerController", req.body)

    switch (req.body.plan) {
      case ROLE.USER.NOTSUBSCRIBER:
        req.body.role = ROLE.USER.NOTSUBSCRIBER
        // Create User with a 
        await User.create(req.body,(err,user)=>{
          if(err){
            err = new MongoError(err.message, err.code)
            // Needs Testing
            return next(err)
          }
          res.status(200).json({
            server: {
              message: [`User ${req.body.email} successfully created`]
            }
          })
        })
        
        break;
      case ROLE.USER.SUBSCRIBER.BASIC:
        req.body.role = ROLE.USER.SUBSCRIBER.BASIC
        let subscriber_instance = new Subscriber({
          paypal_subscriptionID: req.body.paypal_subscriptionID,
          paypal_plan_id: req.body.paypal_plan_id,
          paypal_product_id: req.body.paypal_product_id,
          plan: req.body.plan
        })

        let user_instance = new User({
          email: req.body.email,
          password: req.body.password,
          role: req.body.role
        })

        subscriber_instance.userID = user_instance._id
        user_instance.subscriptionID = subscriber_instance._id


        try{
          await user_instance.save()
        } catch (err) {
          err = new MongoError(`You have successfully subscribed on paypal's servers, but not on BidBlock's servers' because of this error: ${err.message}`, err.code)
          return next(err)
        }
        console.log("saved user information")

        try{
          await subscriber_instance.save()  
        } catch (err) {
          err = new MongoError(`You have successfully subscribed on paypal's servers, but not on BidBlock's servers' because of this error: ${err.message}`, err.code)
          return next(err)
        }
        console.log("saved subscriber information")
      
        res.status(200).json({
          server: {
            message: [`Subscriber ${req.body.email} successfully created, with the paypal subscriber ID: ${req.body.paypal_subscriptionID}`]
          }
        })

        break;
    
      default:
        break;
    }



    
  },
  loginController: async (req,res,next)=>{

    console.log("\nnotification end:\n", res.locals.notification)
    console.log("\nreq.session.userId end:\n", req.session.userId)
    if(req.session.userId && res.locals.notification.length == 0) {
      // res.json({
      //   data: ['success']
      // })
      res.status(200).json({
        server:{
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
    if(req.method === "GET") {
      let errorCode = httpStatus.StatusCodes.NOT_FOUND
      res.status(errorCode)
      res.render('error')
    }
    next()
  }
}