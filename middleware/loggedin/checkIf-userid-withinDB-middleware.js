const User = require('../../models/User')

// TODO see where this middleware is used and displace the res.locals to theit propper next(), because this middleware is supposed to exclusivly just check if logged in or not!
// Check to see if userId within the DB, if so (only if logged in - so implicitly checks log status), then next(),
// else no user in the DB, redirect to home
module.exports = (req,res,next)=>{
    User.findById(req.session.userId, (error,user)=>{
        if(error){return next(error)}
        if(!user){
            return res.redirect('/')
        }
        res.locals.currentUserEmail = user.email;
        res.locals.userIdB = req.query.userIdB;
        res.locals.orderId = req.query.orderId;
        next()
    })
}
