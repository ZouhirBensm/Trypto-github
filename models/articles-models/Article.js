const ENV = require('../../config/base')
const SOURCES = require('../../full-stack-libs/Types/ArticleSources')


const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Models define collections
//Models are defined through the Schema interface
const ArticleSchema = new Schema({
  content: String,
  excerpt: String,
  articleheadtag_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleHeadTag',
    required: true
  },
  articlebodyheader_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleBodyHeader',
    required: true
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  articleenclosureimage_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleEnclosureImage',
    required: true
  },
  // category: String,
  // link: String,
  // enclosure: String,
  // source: {
  //   type: String,
  //   default: SOURCES.BIDBLOCK,
  // },
  // Author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  // editedDate: {
  //   type: Date,
  //   default: null,
  // },
  // images_folder_path: String,
  // videos_folder_path: String
})




const Article = mongoose.model('Article', ArticleSchema)
module.exports = Article