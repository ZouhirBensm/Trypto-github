const { verifyUsername, verifyEmail, verifyPassword } = require('../../full-stack-libs/validations')
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



function validateController(req, res, next) {

  let flag, notification = [];

  ({ flag, notification } = verifyUsername(req.body.username))

  if (!flag) {
  // if (true) {
    const error = new ValidationError(notification, "Username")
    return next(error)
  }

  ({ flag, notification } = verifyEmail(req.body.email));
  // console.log(flag, notification);

  if (!flag) {
    const error = new ValidationError(notification, "Email")
    return next(error)
  }

  if(!(req.body.facebookId || req.body.googleId || req.body.appleId)) {
    ({ flag, notification } = verifyPassword(req.body.password));
    
    if (!flag) {
      const error = new ValidationError(notification, "Password")
      return next(error)
    }
  }
  
  return next()
}



async function checkRegisterController(req, res, next) {
  console.log("we got: ", req.body)

  let mightFindUser
  try {
    // mightFindUser = await User.find({
    //   $or: [
    //     { username: req.body.username },
    //     { email: req.body.email },
    //   ]
    // })

    // TODO ! better understand this query
    mightFindUser = await User.aggregate([
      {
        $facet: {
          queryForUsername: [{ $match: { username: req.body.username } }, { $project: { _id: 0 } }],
          queryForEmail: [{ $match: { email: req.body.email } }, { $project: { _id: 0 } }],
        }
      }
    ])
  } catch (e) {
    error = new MongoError(e.message, e.code)
    return next(error)
  }

  console.log("------->", mightFindUser[0], mightFindUser[0].queryForUsername.length, mightFindUser[0].queryForEmail.length)

  if (mightFindUser[0].queryForUsername.length != 0) {
    return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: ['We did find a duplicate username in the database, please register under another username']
      }
    })
  }

  if (mightFindUser[0].queryForEmail.length != 0) {
    return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: ['We did find a duplicate email in the database, please register under another email']
      }
    })
  }

  // return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
  //   error: {
  //     message: ['We did find a duplicate username in the database, please register under another username']
  //   }
  // })

  return res.status(httpStatus.StatusCodes.OK).json({
    server: {
      message: ['We did not find a duplicate username, nor email']
    }
  })

}

async function loginController(req, res, next) {

  console.log("\nreq.session.userId end:\n", req.session.userId)

  res.status(200).json({
    server: {
      message: ["User successfully logged in"]
    }
  })


}

function invalidPathHandler(req, res, next) {
  // console.log(req.method)
  if (req.method === "GET") {
    let errorCode = httpStatus.StatusCodes.NOT_FOUND
    res.status(errorCode)
    res.render('bodies/error')
  }
  next()
}

module.exports = {
  validateController,
  checkRegisterController,
  loginController,
  invalidPathHandler
}