const Message = require('../../models/messaging-models/Message');

module.exports = async (req,res,next)=>{

  console.log("\n\n___________make sure we retrieve the array of protagonists in the delete messages middleware: ", res.locals.array_of_protagonist_ids_where_user_is_engaged)

  // TODO #95 Instead of deleting the message streams one-by-one through each element of the protagonists ID array (i.e. array of reference ID's from the messages collection, that reference all the protagonist entries the logged in user was a protagonist). Feed the Message.deleteMany the array of protagonists ID references and delete all at once i.e. the method itself loops
  for (const obj_id of res.locals.array_of_protagonist_ids_where_user_is_engaged) {
    console.log(obj_id)

    let messageDeletionRet
    try {
      messageDeletionRet = await Message.deleteOne({protagonists: obj_id._id})
    } catch (e) {
      res.locals.notifications.push(e);
      break
    }

  }

  next()
}