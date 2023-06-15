const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ImageInfoSchema = new Schema({
  name: {
    type: String,
  },
  format: {
    type: String
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  size: {
    type: Number
  }
});


const ArticleEnclosureImageSchema = new Schema({
  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
  },
  path: String,
  image: {
    type: ImageInfoSchema,
    required: true
  },
  // postedDate: {
  //   type: Date,
  //   // default: new Date(),
  //   default: Date.now,
  // }
})

ArticleEnclosureImageSchema.index({ articleID: 1 });



const ArticleEnclosureImage = mongoose.model('ArticleEnclosureImage', ArticleEnclosureImageSchema)
module.exports = ArticleEnclosureImage