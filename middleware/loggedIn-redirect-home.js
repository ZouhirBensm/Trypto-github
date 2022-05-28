// If currently in a session, then redirect to home,
// else next()
module.exports = (req,res,next)=>{
    if(req.session.userId){
        return res.redirect('/')
    }
    next()
}