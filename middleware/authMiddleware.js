const User = require('../models/User')

module.exports = (req,res,next)=>{
    User.findById(req.session.userId, (error,user)=>{
        if(error){return next(error)}
        if(!user){
            return res.redirect('/')
        }
        next()
    })
}
