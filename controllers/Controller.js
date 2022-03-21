//We import the User model
const User = require('../models/User')
// const bcrypt = require('bcrypt')
var bcrypt = require('bcryptjs');

module.exports = {
  loginController: (req,res)=>{
  
  
    //Extract the email and password from the login form with req.body
    const {email, password} = req.body
  
    //Try to find one user with the inputed email
    User.findOne({email: email}, (error,user)=>{
      if(user){
          //Compare inputed password with database user.password
          bcrypt.compare(password, user.password, (error,same)=>{
              if(same){
                  //store
                  //Sets up the Session object with cookie created and userId
                  req.session.userId = user._id
                  res.redirect('/')
                  
              //If password is wrong
              } else {
                  res.redirect('/login')
              }
          })
      // If user email does not exist in database
      } else {
          res.redirect('/login')
      }
    })
  },
}