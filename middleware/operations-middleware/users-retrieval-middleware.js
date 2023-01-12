const User = require('../../models/User')


module.exports = async (req,res,next)=>{
  let user = res.locals.user
  // console.log("\n_______________\n")
  // console.log("in usersRetrievalMiddleware: \n\n ")
  
  // console.log(res.locals.paths_URL_fromReferer[1])
  
  
  let path, select

  switch (res.locals.paths_URL_fromReferer[1]) {
    case 'set-settings':
      path = "userassociatedlocalityID"
      select = "location geometry -_id"
      break;
    case 'manage-subs':
      path = "userprofileimageID"
      select = "image.name -_id"
      break;
    default:
      // path = "userprofileimageID"
      // select = "image.name -_id"
      break;
  }


  let query = User.find({_id: {$ne: user._id}})

  if (path && select){
    query = query.populate({
      path: path,
      select: select,
    })
    .select('-password')
  }

  let users = await query.exec()



  // let users = await User.find({_id: {$ne: user._id}})
  // .populate({
  //   path: path,
  //   select: select,
  // })
  // .select('-password')


  // users.forEach(user => {
  //   console.log(user)
  // });

  res.locals.data_to_be_paginated_and_served = users

  console.log("\n______________________________")
  return next()
}