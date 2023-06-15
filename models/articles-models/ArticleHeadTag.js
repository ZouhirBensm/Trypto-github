const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ArticleHeadTagSchema = new Schema({
  html_title: {
    type: String,
    required: true
  },
  meta_description: {
    type: String,
    required: true
  },
  canonical: {
    type: String,
    // TODO !!! Set a default in pre maybe
  },
  url: {
    type: String,
    required: true
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