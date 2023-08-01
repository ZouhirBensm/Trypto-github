const { LoggingInError } = require("../../custom-errors/custom-errors")
const httpStatus = require("http-status-codes")


function require_loggedin_for_pages(do_require_login){
  return (req, res, next) => {


    // TODO !!!! Requires testing when the  do_require_login is set to false and see if access to data or pages when not logged in
    if (do_require_login && !req.session.userId) {
      return res.status(httpStatus.StatusCodes.FORBIDDEN).redirect('/users/login')
    }

    return next()


    // TODO !!!! Original code
    
    // // console.log("are we logged in?", req.session.userId)
    // if (do_require_login){

    //   if(!req.session.userId){
    //     // return res.status(httpStatus.StatusCodes.PERMANENT_REDIRECT).redirect('/')
    //     return res.status(httpStatus.StatusCodes.FORBIDDEN).redirect('/users/login')
    //   }
    //   return next()

    // } else {
    //   if(req.session.userId){
    //     // return res.status(httpStatus.StatusCodes.PERMANENT_REDIRECT).redirect('/')
    //     return res.status(httpStatus.StatusCodes.FORBIDDEN).redirect('/users/login')
    //   }
    //   return next()
    // }

  }
}




function require_loggedin_for_data(do_require_login){
  return (req, res, next) => {

    // TODO !!!! Requires testing when the  do_require_login is set to false and see if access to data or pages when not logged in
    // 1 && 0 (loged in) => not error
    // 1 && 1 (not loged in) => error
    if (do_require_login && !req.session.userId) {
      return next(new LoggingInError(["Access denied. User must have a logged in session to HTTP get/post/patch/delete"]), httpStatus.StatusCodes.FORBIDDEN)
    }
    
    return next()

    // TODO !!!! Original code

    // if (do_require_login){
    //   if(!req.session.userId){
    //     return next(new LoggingInError(["Access denied. User must have a logged in session to HTTP get/post/patch/delete"]))
    //   }
    //   return next()
    // } else {
    //   if(req.session.userId){
    //     return next(new LoggingInError(["Access denied. User must not have a logged in session to HTTP get/post/patch/delete"]))
    //   }
    //   return next()
    // }

  }
}


module.exports = {require_loggedin_for_pages, require_loggedin_for_data}