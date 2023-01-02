var bcrypt = require('bcryptjs');
const { LoggingInError } = require('../../custom-errors/custom-errors')

module.exports = async (req,res,next)=>{

  // Compare the passwords
  let bcryptCompareRet

  try {
    bcryptCompareRet = await bcrypt.compare(req.body.password, res.locals.foundUserIfAny.password)
  } catch (error) {
    console.error(`---> Error in: bcrypt.compare,\n${error}`);
    let e = new LoggingInError(error.message); return next(e);
  }

  console.log({bcryptCompareRet})

  if(bcryptCompareRet) {
    req.session.userId = res.locals.foundUserIfAny._id
  } else {
    let e = new LoggingInError("Erroneous password submission for this email"); return next(e);
  }


  return next()
}