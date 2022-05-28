const { LoggingInError } = require("../custom-errors/custom-errors")
const ENV = require('../config/base')

module.exports = (req,res,next)=>{
  if(req.session.userId){
    
    let notification = []
    const parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(req.headers.referer);
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
  }
  next()
}