const { LoggingInError } = require("../../custom-errors/custom-errors")
const httpStatus = require("http-status-codes")


function require_loggedin_for_pages(do_require_login){
  return (req, res, next) => {
    // console.log("are we logged in?", req.session.userId)
    if (do_require_login){
      // console.log("ok")
      if(!req.session.userId){
        // console.log("ici")
        return res.status(httpStatus.StatusCodes.PERMANENT_REDIRECT).redirect('/')
      }
      return next()
    } else {
      if(req.session.userId){
        return res.status(httpStatus.StatusCodes.PERMANENT_REDIRECT).redirect('/')
      }
      return next()
    }
  }
}




function require_loggedin_for_data(do_require_login){
  return (req, res, next) => {
    // console.log("are we logged in?", req.session.userId)
    if (do_require_login){
      if(!req.session.userId){
        return next(new LoggingInError(["Access denied. User must have a logged in session to HTTP get/post/patch/delete"]))
      }
      return next()
    } else {
      if(req.session.userId){
        return next(new LoggingInError(["Access denied. User must not have a logged in session to HTTP get/post/patch/delete"]))
      }
      return next()
    }
  }
}


module.exports = {require_loggedin_for_pages, require_loggedin_for_data}