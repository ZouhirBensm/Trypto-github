const User = require('../../models/User')

// Check to see if userId within the DB, if so (only if logged in - so implicitly checks log status), then next(),
// else no user in the DB, redirect to home
module.exports = async (req,res,next)=>{
    await User.findById(req.session.userId, (error,user)=>{
        if(error){return next(error)}
        if(!user){
            return res.redirect('/')
        }
        res.locals.user = user
    })
    return next()
}
