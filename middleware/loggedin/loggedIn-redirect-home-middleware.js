// If currently in a session, then redirect to home,
// else next()
module.exports = (req,res,next)=>{
    if(req.session.userId){
        // can access profile
        req.params.what_page === 'profile'?  next() : res.redirect('/')
    } else {
        // can access login and register
        req.params.what_page === 'profile'? res.redirect('/'): next()
    }
}