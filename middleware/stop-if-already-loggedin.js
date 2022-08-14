const { LoggingInError } = require("../custom-errors/custom-errors")
const ENV = require('../config/base')
const full_stack_utils = require('../full-stack-libs/utils')


// If your already logged middleware makes imposible to post for new loggin or register
module.exports = (req,res,next)=>{

  if(req.session.userId){
    let notification = []


    const parsedURL = full_stack_utils.parseURL(req.headers.referer)
    
    // /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(req.headers.referer);

    console.log("reretest: ", req.headers, "\n", req.headers.referer, "\n", parsedURL)

    if(parsedURL){
      const [, protocol, fullhost, fullpath] = parsedURL
      // console.log(fullpath)
      
      switch (fullpath) {
        case "users/register":
          notification.push("You can't register a new user while being logged in.")
          break;
        case "users/login":
          notification.push("You are already logged in.")
          break;
        default:
          notification.push(`You did not yet registere this new path ${fullpath} for errors in the middleware.`)
          break;
      }
    } else {
      notification.push(`Something went wrong using this middleware.\nreq.headers.referer: ${req.headers.referer} did not get parsed properly. parsedURL: ${parsedURL}`)
    }
    next(new LoggingInError(notification))
  } else {
    next()
  }
}