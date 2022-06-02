const {verifyEmail, verifyPassword} = require('../../full-stack-libs/validations')
//We import the User model
const User = require('../../models/User')
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
        next(error) 
      }
    } else {
      console.log('Email failed to validate')
      const error = new ValidationError(notification, "Email")
      next(error)
    }

  },

  registerController: async (req,res, next) => {
    await User.create(req.body,(error,user)=>{
      if(error){
        // error = new MongoError()
        console.log("\n\n___lgging the error NAME:___ ", error.type, error.message)
        // Needs Testing
        return next(error)
      }
      res.status(200).json({
        server: {
          message: ['User successfully created']
        }
      })
    })
  },
  loginController: async (req,res,next)=>{
  
    let notification = []
    //Extract the email and password from the login form with req.body

    const {email, password} = req.body
    console.log("Backend Reception:! ", req.body)
    
    email? null: notification.push("Please enter an e-mail")
    
    //Try to find one user with the inputed email
    await User.findOne({email: email}, (error,user)=>{
      // console.log(email,user)
      if (error) {return next(error)}
      if(user){
        //Compare inputed password with database user.password
        bcrypt.compare(password, user.password, (error,same)=>{
          if (error) {return next(error)}
          if(same){
              //store
              //Sets up the Session object with cookie created and userId
              req.session.userId = user._id 
          //If password is wrong
          } else {
            password? notification.push("Erroneous password submission for this email"): notification.push("Please enter a password")
          }
        })
        // If user email does not exist in database
      } else {
        email? notification.push("This email was not found in our repertoire"): null
      }
    })
    console.log("2", notification)



    console.log("what do we have??", req.session.userId)
    if(req.session.userId) {
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
      let err = new LoggingInError(notification)
      // err.message = notification
      console.log(err)
      next(err)

      // Example of Appending the notification array to the res object, in order to pass to next error middlware errorLogger
      // const error = new LoggingInError()
      // res.locals.notification = notification
      // console.log(res.locals.notification)
      // next(error)

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