module.exports = (req,res,next)=>{

  res.locals.notifications = []

  console.log("\n\n\n\n____Process to delete user and all of his orders___")

  console.log(req.params.userId, " vs ", req.session.userId)
  console.log("Session:", req.session)

  console.log("\n\nwhat does this resolve to?", !req.session.userId, req.params.userId != req.session.userId)
  
  // && !req.session.userId
  if((req.params.userId != req.session.userId) || (!req.session.userId)) {
  // if(true) {
    console.log("do we make it here!")
    let error = new Error("The path userID does not coincide with the logged in session userId, or no session user logged in")
    return next(error)
  }
  next()
}