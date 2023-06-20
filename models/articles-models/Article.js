



const ENV = require('../../config/base')
const SOURCES = require('../../full-stack-libs/Types/ArticleSources')


const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Models define collections
//Models are defined through the Schema interface
const ArticleSchema = new Schema({
  h1: {
    type: String,
    required: true
  },
  html_title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  articlebodyheader_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleBodyHeader',
    required: true
  },
  content: String,
  excerpt: String,
  articleheadtag_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleHeadTag',
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
  articleabstract_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleAbstract',
    required: true
  },
  
  // category: String,
  // link: String,
  // enclosure: String,
  source: {
    type: String,
    default: SOURCES.BIDBLOCK,
  },
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