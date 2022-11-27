const {RoleNotPermitedError} = require('../../custom-errors/custom-errors')
const httpStatus = require("http-status-codes")


function authenticate_role_for_pages(reference_roles){
  return (req, res, next) => {
    if(reference_roles.includes(res.locals.user?.role)){
      return next()
    } else {
      return res.status(httpStatus.StatusCodes.PERMANENT_REDIRECT).redirect('/')
    }
  }
}

function authenticate_role_for_data(reference_roles){
  return (req, res, next) => {
    if(reference_roles.includes(res.locals.user?.role)){
      return next()
    } else {
      return next(new RoleNotPermitedError(res.locals.user?.role, reference_roles))
    }
  }
}

module.exports = {
  authenticate_role_for_pages,
  authenticate_role_for_data
}