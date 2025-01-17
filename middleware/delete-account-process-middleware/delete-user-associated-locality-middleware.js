const UserAssociatedLocality = require('../../models/UserAssociatedLocality')



module.exports = async (req,res,next)=>{

  if (!res.locals.userDeletionRet.userassociatedlocalityID) return next()

  let userAssociatedLocalityDeletionRet

  try{
    userAssociatedLocalityDeletionRet = await UserAssociatedLocality.findByIdAndDelete(res.locals.userDeletionRet.userassociatedlocalityID)
  } catch(e) {
    res.locals.notifications.push(e);
  }

  return next()
}