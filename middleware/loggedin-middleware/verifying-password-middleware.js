const User = require("../../models/User")
var bcrypt = require('bcryptjs');


module.exports = async (req,res,next)=>{
  // let notification = []
  res.locals.notification = []
  //Extract the email and password from the login form with req.body
  
  const {email, password} = req.body

  console.log("\n\n\nreq.body:\n", req.body)
  
  email? null: res.locals.notification.push("Please enter an e-mail")
  

  let foundUserIfAny = await User.findOne({email: email})


  console.log({foundUserIfAny})

  if(foundUserIfAny){
    let bcryptCompareRet

    try {
      bcryptCompareRet = await bcrypt.compare(password, foundUserIfAny.password)
    } catch (error) {
      res.locals.notification.push(error.message)
    }

    console.log({bcryptCompareRet})

    if(bcryptCompareRet) {
      req.session.userId = foundUserIfAny._id
    } else {
      password? res.locals.notification.push("Erroneous password submission for this email"): res.locals.notification.push("Please enter a password");
    }
  } else {
    res.locals.notification.push("This email was not found in our repertoire")
  }

  return next()
}