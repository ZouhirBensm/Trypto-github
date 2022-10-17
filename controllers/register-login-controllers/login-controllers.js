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

  loginController: async (req, res, next) => {

    console.log("\nreq.session.userId end:\n", req.session.userId)

    res.status(200).json({
      server: {
        message: ["User successfully logged in"]
      }
    })


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