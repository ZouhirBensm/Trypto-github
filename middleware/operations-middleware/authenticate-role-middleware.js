function authenticate_role_for_pages(reference_role){
  return (req, res, next) => {
    console.log("what is the role of the current user? ", res.locals.user.role)
    // GUARD FOR USERS WITH THE ROLE OF MASTER
    if(res.locals.user.role !== reference_role){
      return res.redirect('/')
    }
    next()
  }
}

function authenticate_role_for_data(reference_role){
  return (req, res, next) => {
    console.log("what is the role of the current user? ", res.locals.user.role)
    // GUARD FOR USERS WITH THE ROLE OF MASTER
    if(res.locals.user.role !== reference_role){
      return res.status(401).send("not allowed")
    }
    next()
  }
}

module.exports = {
  authenticate_role_for_pages,
  authenticate_role_for_data
}