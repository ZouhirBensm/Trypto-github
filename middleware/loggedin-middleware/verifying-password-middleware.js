const User = require("../../models/User")
var bcrypt = require('bcryptjs');

module.exports = async (req,res,next)=>{
  // let notification = []
  res.locals.notification = []
  //Extract the email and password from the login form with req.body
  
  const {email, password} = req.body
  console.log("\n\n\nBackend Reception:\n", req.body)
  
  email? null: res.locals.notification.push("Please enter an e-mail")
  
  //Try to find one user with the inputed email
  await User.findOne({email: email}, (error,user)=>{
    // console.log(email,user)
    // FOR FORCE ERRORS TESTS
    // error = new Error("test error1")
    if (error) {res.locals.notification.push(error.message); return}
    if(user){
      //Compare inputed password with database user.password
      bcrypt.compare(password, user.password, (error,same)=>{
        if (error) {res.locals.notification.push(error.message); return}
        console.log("same???", same)
        if(same){
            //store
            //Sets up the Session object with cookie created and userId
            req.session.userId = user._id
            console.log("\nin compare:\n", req.session.userId)
        //If password is wrong
        } else {
          password? res.locals.notification.push("Erroneous password submission for this email"): res.locals.notification.push("Please enter a password");
          return;
        }
      })
      // If user email does not exist in database
    } else {
      email? res.locals.notification.push("This email was not found in our repertoire"): null;
      return;
    }
  })

  return next()
}



  