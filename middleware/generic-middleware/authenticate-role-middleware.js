const {RoleNotPermitedError} = require('../../custom-errors/custom-errors')


function authenticate_role_for_pages(reference_roles){
  return (req, res, next) => {
    // console.log("\n\n\nwhat is the role of the current user? ", res.locals.user)
    // console.log("what is the role of the current user? ", res.locals.user.role)
    // GUARD FOR USERS WITH THE ROLE OF MASTER
    if(reference_roles.includes(res.locals.user.role)){
      next()
    } else {
      return res.redirect('/')
    }
  }
}

function authenticate_role_for_data(reference_roles){
  return (req, res, next) => {
    // console.log("what is the role of the current user? ", res.locals.user.role)
    // GUARD FOR USERS WITH THE ROLE OF MASTER
    if(reference_roles.includes(res.locals.user.role)){
      next()
    } else {
      return next(new RoleNotPermitedError(res.locals.user.role, reference_roles))
    }
  }
}

module.exports = {
  authenticate_role_for_pages,
  authenticate_role_for_data
}