const Message = require('../../models/messaging-models/Message')
const Protagonist = require('../../models/messaging-models/Protagonist')
var ObjectId = require('mongodb').ObjectId; 


module.exports = async (req,res,next)=>{
  
  
  console.log("\n_______________\n")
  console.log("in usersRetrievalMiddleware: ")
  
  console.log(req.params.userID, res.locals.page, res.locals.limit, req.query.userIdB)


  // console.log(res.locals.page, res.locals.limit, res.locals.startIndex, res.locals.endIndex)

  // console.log({user: res.locals.user})

  // MAKE TH QUERY

  let query = Protagonist.find({$and: [
    {protagonists: {$elemMatch: {"$in": [req.params.userID]}}},
    {protagonists: {$elemMatch: {"$in": [req.query.userIdB]}}}
  ]})
  .populate({
    // Populate protagonists
    path: "messages", 
    // Fields allowed to populate with
    select: "_id msg_stream",
    populate: {
      path: 'msg_stream.sender msg_stream.receiver',
      model: 'User',
      select: "_id email"
    }
  })



  


  let protagonists_communications = await query.exec()

  console.log(protagonists_communications)
  console.log("Messages ID of the conversation:", protagonists_communications[0].messages._id)
  console.log(protagonists_communications[0].messages.msg_stream)
  let msg_stream = protagonists_communications[0].messages.msg_stream

  // protagonists_communications.forEach(element => {
  //   console.log(element)
  // });

  // console.log({protagonists_communications})

  res.locals.data_to_be_paginated_and_served = msg_stream

  // console.log("in usersRetrievalMiddleware: ", res.locals.data_to_be_paginated_and_served)

  console.log("\n______________________________")
  next()
}