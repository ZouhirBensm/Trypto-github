const User = require('../models/User')

// Check to see if userId within the DB, if so, then next(),
// else no user in the DB, redirect to home
module.exports = (req,res,next)=>{
    User.findById(req.session.userId, (error,user)=>{
        if(error){return next(error)}
        if(!user){
            return res.redirect('/')
        }
        next()
    })
}
