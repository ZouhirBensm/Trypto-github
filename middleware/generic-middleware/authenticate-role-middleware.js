const {RoleNotPermitedError} = require('../../custom-errors/custom-errors')
const httpStatus = require("http-status-codes")


function authenticate_role_for_pages(reference_roles){
  return (req, res, next) => {
    // console.log("\n\n\nwhat is the role of the current user? ", res.locals.user)
    // console.log("what is the role of the current user? ", res.locals.user.role)
    // GUARD FOR USERS WITH THE ROLE OF MASTER
    console.log(reference_roles)
    console.log(res.locals.user?.role)
    console.log(reference_roles.includes(res.locals.user?.role))
    if(reference_roles.includes(res.locals.user?.role)){
      next()
    } else {
      return res.status(httpStatus.StatusCodes.PERMANENT_REDIRECT).redirect('/')
    }
  }
}

function authenticate_role_for_data(reference_roles){
  return (req, res, next) => {
    // console.log("what is the role of the current user? ", res.locals.user.role)
    // GUARD FOR USERS WITH THE ROLE OF MASTER
    if(reference_roles.includes(res.locals.user?.role)){
      next()
    } else {
      return next(new RoleNotPermitedError(res.locals.user?.role, reference_roles))
    }
  }
}

module.exports = {
  authenticate_role_for_pages,
  authenticate_role_for_data
}