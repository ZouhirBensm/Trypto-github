// const { UnsubscribeError } = require("../../custom-errors/custom-errors")

// // Check integrety of the posted user id
// // 1. is he equal to the one on logged in session

// module.exports = function canExecuteAction(user, ) {
//   if()
// }


// async (req, res, next)=>{
//   console.log('equal? ', req.body.userId, req.session.userId)
//   if (req.body.userId == req.session.userId) {
//     next()
//   } else {
//     let error = new UnsubscribeError(`Posted userId does not coincide with the web server session's userId`, `Sorry, cannot proceed, endpoint ${req.method} ${req.headers.referer} says that the POSTED req.body.userId != LOGGEDIN SESSION req.session.userId`)
//     return next(error)
//   }
// }