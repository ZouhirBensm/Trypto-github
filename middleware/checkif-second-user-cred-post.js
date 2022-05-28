const { LoggingInError } = require("../custom-errors/custom-errors")
const ENV = require('../config/base')

module.exports = (req,res,next)=>{
  if(req.session.userId){
    let notification = []
    if (req.headers.referer == ENV.domain + '/users/register') notification.push("You can't register a new user while being logged in.")
    if (req.headers.referer == ENV.domain + '/users/login') notification.push("You are already logged in.")
    next(new LoggingInError(notification))
  }
  next()
}