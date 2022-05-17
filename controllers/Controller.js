//We import the User model
const User = require('../models/User')
// const bcrypt = require('bcrypt')
var bcrypt = require('bcryptjs');
const { MongoCreateCustomError } = require('../custom-errors/home-orders-custom-errors')

module.exports = {
  registerController: async (req,res, next)=>{
    await User.create(req.body,(error,user)=>{
      // TODO: Add backend validation with proper custom errors
      if(error){return next(new MongoCreateCustomError())} // Redirects error type MongoCreateCustomError to next error middleware. Similar to try{throw new MongoCreateCustomError()}catch(err){next(err)}
      res.status(200).json({
        server: {
          message: 'User successfully created'
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
      res.json({
        data: ['success']
      })
    } else {
      res.json({
        data: notification
      })
    }

  },



  invalidPathHandler: (req, res) => {
    res.render('error')
  }
}