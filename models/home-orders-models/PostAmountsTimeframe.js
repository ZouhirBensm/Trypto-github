const mongoose = require('mongoose')
//Create empty Schema object?
const Schema = mongoose.Schema


//Models are defined through the Schema interface
//Models define collections
const PostsAmountsTimeframeSchema = new Schema({
  posts_amounts_timeframe: Number,
  expireAt: {
      type: Date,
  },
  userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
})

PostsAmountsTimeframeSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const PostsAmountsTimeframe = mongoose.model('PostsAmountsTimeframe', PostsAmountsTimeframeSchema)
//Export User variable to other files
module.exports = PostsAmountsTimeframe