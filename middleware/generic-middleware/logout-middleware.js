module.exports = (req,res,next)=>{

  if (res.locals.paths_URL_fromReferer[0] === 'users') {
    req.session.destroy()
  }

  return next()
}