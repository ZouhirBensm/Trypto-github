const { NoRefererError } = require("../../custom-errors/custom-errors")

// Need a proper referer to proceed i.e. not from postman
module.exports = (req,res,next)=>{

  // console.log(req.headers)

  if(req.headers.referer){
  // if(false){
    return next()
  } else {
    let error = new NoRefererError("No req.headers.referer identified, a referer is needed to process the request.");
    return next(error)
  }

}