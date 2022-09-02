module.exports = {
  loggedin_for_pages: (req, res, next) => {
    console.log("are we logged in?", req.session.userId)
    // GUARD FOR ONLY LOGGEDIN USERS
    if(!req.session.userId){
      return res.redirect('/')
    }
    next()
  },
  loggedin_for_data: (req, res, next) => {
    console.log("are we logged in?", req.session.userId)
    // GUARD FOR ONLY LOGGEDIN USERS
    if(!req.session.userId){
      return res.status(403).send("You are required to sign in to access this page!")
    }
    next()
  },
}