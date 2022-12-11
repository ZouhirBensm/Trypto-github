module.exports = (req,res,next)=>{
  
  // TODO !! #137 Determine source of request and if user account request execute this
  req.session.destroy()

  // TODO !! #137 else if it's the operations page keep logged in

  next()
}