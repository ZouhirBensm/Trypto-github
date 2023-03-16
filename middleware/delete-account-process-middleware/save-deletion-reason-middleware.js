const httpStatus = require("http-status-codes")

const ReasonUserDelete = require('../../models/when-user-deletes-models/ReasonUserDelete')



module.exports = async (req, res, next)=>{

  console.log("saveDeletionReasonMiddleware")

  let reasonuserdelete_ret

  try {
    reasonuserdelete_ret = await ReasonUserDelete.create({
      username: res.locals.userDeletionRet.username,
      email: res.locals.userDeletionRet.email,
      reason_for_deletion: req.body.reason
    })
  } catch (error) {
    // TODO add some error handling!!!!
  }

  return next()
}

