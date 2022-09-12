const User = require('../../models/User')


module.exports = async (req,res,next)=>{
  let user = res.locals.user
  console.log("\n_______________\n")
  console.log("in usersRetrievalMiddleware: ")

  // console.log(res.locals.page, res.locals.limit, res.locals.startIndex, res.locals.endIndex)

  // console.log({user: res.locals.user})


  // Get rid of logged in user, and no password field
  let users = await User.find({_id: {$ne: user._id}}).select('-password')

  // console.log({articles})

  res.locals.data_to_be_paginated_and_served = users

  console.log("in usersRetrievalMiddleware: ", res.locals.data_to_be_paginated_and_served)

  console.log("\n______________________________")
  next()
}