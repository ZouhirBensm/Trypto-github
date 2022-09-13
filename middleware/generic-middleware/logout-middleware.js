module.exports = (req,res,next)=>{
  
  // TODO
  // Determine source of request and if user account request execute this
  req.session.destroy()

  //else if it's the operations page keep logged in

  next()
}