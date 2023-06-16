const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ArticleHeadTagSchema = new Schema({
  meta_description: {
    type: String,
    required: true
  },
  canonical: {
    type: String,
    // TODO !!! Set a default in pre maybe
  },
  noindex: {
    type: Boolean,
    required: true
  },
  nofollow: {
    type: Boolean,
    required: true
  },
  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  }
})




const ArticleHeadTag = mongoose.model('ArticleHeadTag', ArticleHeadTagSchema)
module.exports = ArticleHeadTag