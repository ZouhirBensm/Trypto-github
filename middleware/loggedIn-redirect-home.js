// If currently in a session, then redirect to home,
// else next()
module.exports = (req,res,next)=>{
    if(req.session.userId){
        req.params.what_page != 'profile'? res.redirect('/'): next() 
    } else {
        req.params.what_page === 'profile'? res.redirect('/'): next()
    }
}