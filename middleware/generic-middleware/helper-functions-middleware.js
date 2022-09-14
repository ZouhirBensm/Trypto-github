const ROLE = require('../../full-stack-libs/Types/Role')

// Takes the user of curent session (entire object)
// and the ID to check against sent by the front end
function canProceed(loggedinUser, userIDFromRequest){
  console.log("we got: ", loggedinUser._id, userIDFromRequest)
  console.log("master??", loggedinUser.role)
  console.log(ROLE.MASTER)
  console.log(loggedinUser.role == ROLE.MASTER)
  if(loggedinUser.role == ROLE.MASTER || loggedinUser._id == userIDFromRequest) return true
  else return false
}

module.exports = { canProceed }