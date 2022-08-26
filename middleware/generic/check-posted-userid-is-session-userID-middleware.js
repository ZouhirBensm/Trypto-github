

// Check integrety of the posted user id
// 1. is he equal to the one on logged in session

module.exports = async (req, res, next)=>{
  console.log('equal? ', req.body.userId, req.session.userId)
  if (req.body.userId == req.session.userId) {
    next()
  } else {
    return next(new Error("sorry, cannot proceed, POSTED req.body.userId != LOGGEDIN SESSION req.session.userId"))
  }
}