const Message = require('../../models/messaging-models/Message')

module.exports = async (req,res,next)=>{
  console.log("in intermediateMiddlewareMess: ",res.locals.page, res.locals.limit, res.locals.startIndex, res.locals.endIndex)



  let user_relevant_msg_query = Message.find()
  .populate({
    // Populate protagonists
    path: "protagonists", 
    // Condition to population on the protagonists document fields
    match: {protagonists: {$elemMatch: {$in: [res.locals.path_param_userID]}}},
    // Fields allowed to populate with
    select: "-_id protagonists",
    populate: {
      path: 'protagonists',
      model: 'User',
      select: "_id email"
    } 
  })
  .populate({
    // Populate msg_stream
    path: "msg_stream.sender", 
    // Fields allowed to populate with
    select: "-_id email"
  })


  let protagonists_communications = await user_relevant_msg_query.exec()

  //FILTER
  protagonists_communications = protagonists_communications.filter(element => element.protagonists != null)
  console.log("\n\nLogged in user's convos\n\n", protagonists_communications)

  // console.log(`entries with my protagonist ${req.session.userId}:`,protagonists_communications)

  protagonists_communications.forEach(element => {
    console.log("\n\nActual msg_streams:\n\n",element.msg_stream)
    console.log("\n\nActual protagonists emails:\n\n",element.protagonists.protagonists)
  });

  res.locals.data_to_be_paginated_and_served = protagonists_communications

  console.log("in intermediateMiddlewareMess: ", res.locals.data_to_be_paginated_and_served)

  next()
}