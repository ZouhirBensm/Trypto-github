const HexForUnactiveUser = require('../../models/HexForUnactiveUser');


module.exports = async (req,res,next)=>{

  let hexDeletionRet
  try {
    hexDeletionRet = await HexForUnactiveUser.deleteOne({userID: req.params.userId})
  } catch (e) {
    res.locals.notifications.push(e);
  }
  
  next()

}