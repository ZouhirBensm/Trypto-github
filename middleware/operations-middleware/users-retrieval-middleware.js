const User = require('../../models/User')


module.exports = async (req,res,next)=>{
  let user = res.locals.user
  console.log("\n_______________\n")
  console.log("in usersRetrievalMiddleware: ")

  // console.log(res.locals.page, res.locals.limit, res.locals.startIndex, res.locals.endIndex)

  // console.log({user: res.locals.user})


  // For on select
  // Get rid of logged in user, and no password field
  let users = await User.find({_id: {$ne: user._id}})
  .populate({
    // Populate protagonists
    path: "userprofileimageID",
    // Fields allowed to populate with
    select: "image.name -_id",
  })
  .select('-password')


  users.forEach(user => {
    console.log(user)
    console.log(user.userprofileimageID?.image.name)
  });

  res.locals.data_to_be_paginated_and_served = users

  console.log("\n______________________________")
  next()
}