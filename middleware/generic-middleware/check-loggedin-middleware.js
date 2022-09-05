const { LoggingInError } = require("../../custom-errors/custom-errors")

// module.exports = {
//   not_loggedin_for_pages: (req, res, next) => {
//     console.log("are we logged in?", req.session.userId)
//     // GUARD FOR ONLY NOT LOGGEDIN USERS
//     if(req.session.userId){
//       return res.redirect('/')
//     }
//     next()
//   },
//   loggedin_for_pages: (req, res, next) => {
//     console.log("are we logged in?", req.session.userId)
//     // GUARD FOR ONLY LOGGEDIN USERS
//     if(!req.session.userId){
//       return res.redirect('/')
//     }
//     next()
//   },
//   loggedin_for_data: (req, res, next) => {
//     console.log("are we logged in?", req.session.userId)
//     // GUARD FOR ONLY LOGGEDIN USERS
//     if(!req.session.userId){
//       return next(new LoggingInError(["Access denied. User must have a logged in session to access/post data"]))
//     }
//     next()
//   },
//   not_loggedin_for_data: (req, res, next) => {
//     console.log("are we logged in?", req.session.userId)
//     // GUARD FOR ONLY NOT LOGGEDIN USERS
//     if(req.session.userId){
//       return next(new LoggingInError(["Access denied. User must not have a logged in session to access/post data"]))
//     }
//     next()
//   },
// }


function require_loggedin_for_pages(require_login){
  return (req, res, next) => {
    // console.log("are we logged in?", req.session.userId)
    if (require_login){
      if(!req.session.userId){
        return res.redirect('/')
      }
      next()
    } else {
      if(req.session.userId){
        return res.redirect('/')
      }
      next()
    }
  }
}

function require_loggedin_for_data(require_login){
  return (req, res, next) => {
    // console.log("are we logged in?", req.session.userId)
    if (require_login){
      if(!req.session.userId){
        return next(new LoggingInError(["Access denied. User must have a logged in session to HTTP get/post/patch/delete"]))
      }
      next()
    } else {
      if(req.session.userId){
        return next(new LoggingInError(["Access denied. User must not have a logged in session to HTTP get/post/patch/delete"]))
      }
      next()
    }
  }
}


module.exports = {require_loggedin_for_pages, require_loggedin_for_data}