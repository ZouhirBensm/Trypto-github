const { LoggingInError } = require("../custom-errors/custom-errors")
const ENV = require('../config/base')

// If your already logged middleware makes imposible to post for new loggin or register
module.exports = (req,res,next)=>{

  if(req.session.userId){
    let notification = []
    const parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(req.headers.referer);
    console.log(req.headers, "\n", req.headers.referer, "\n", parsedURL)
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
        break;
    }
    next(new LoggingInError(notification))
  } else {
    next()
  }
}