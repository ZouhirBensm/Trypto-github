const Protagonist = require('../../models/messaging-models/Protagonist');



module.exports = async (req,res,next)=>{

  // Gets all id's where protagonist is engaged in conversations [{_id:}, {_id:}, ...]
  let array_of_protagonist_ids_where_user_is_engaged
  try {
    array_of_protagonist_ids_where_user_is_engaged = await Protagonist.find({
      protagonists: {
        $elemMatch: {"$in": [req.params.userId]}
      }
    }, { _id: 1})
  } catch(e){
    res.locals.notifications.push(e);
  }

  res.locals.array_of_protagonist_ids_where_user_is_engaged = array_of_protagonist_ids_where_user_is_engaged

  console.log("icit array_of_protagonist_entries_need_tobe_deleted!", array_of_protagonist_ids_where_user_is_engaged)

  await Protagonist.deleteMany({
    protagonists: {
      $elemMatch: {"$in": [req.params.userId]}
    }
  }, (error, response)=>{
    if(error){res.locals.notifications.push(error);}
    console.log("protagonist deletion response", response)
  })


  next()
}