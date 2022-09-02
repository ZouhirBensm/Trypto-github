const { LoggingInError } = require("../../custom-errors/custom-errors")
const ENV = require('../../config/base')
const full_stack_utils = require('../../full-stack-libs/utils')


// in case 
// - a post to certain endpoints
// - while loggedin
// Note: requires a referer i.e. browser
module.exports = (req,res,next)=>{

  // Catch logged in users
  if(req.session.userId){

    let notification = []
    const parsedURL = full_stack_utils.parseURL(req.headers.referer)
    console.log("reretest: ", req.headers, "\n", req.headers.referer, "\n", parsedURL)


    // Is request "parsable"
    if(parsedURL){
      const [, protocol, fullhost, fullpath] = parsedURL
      
      // Path control
      switch (fullpath) {
        // Cannot post to these paths
        case "users/register":
          notification.push("You can't register a new user while being logged in.")
          break;
        case "users/login":
          notification.push("You are already logged in.")
          break;
        default:
          notification.push(`You did not yet define this new path ${fullpath} for errors in the stop-if-already-loggedin.js middleware.`)
          break;
      }
    } else {
      notification.push(`Something went wrong using this stop-if-already-loggedin.js middleware.\nreq.headers.referer: ${req.headers.referer} did not get parsed properly. parsedURL: ${parsedURL}`)
    }
    return next(new LoggingInError(notification))
  } else {
    next()
  }
}