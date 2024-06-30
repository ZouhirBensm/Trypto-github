



const ENV = require('../../config/base')
const SOURCES = require('../../full-stack-libs/Types/ArticleSources')


const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Models define collections
//Models are defined through the Schema interface
const ArticleSchema = new Schema({
  h1: {
    type: String,
    required: true,
    unique: true
  },
  changefreq: {
    type: String,
    required: true
  },
  html_title: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  articlebodyheader_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleBodyHeader',
    required: true
  },
  // excerpt: String,
  articleheadtag_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleHeadTag',
    required: true
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: undefined,
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
  articlenesteddata_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ArticleNestedData',
    required: true
  },
  
  // category: String,
  category: {
    type: String,
    default: undefined,
  },
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
  lang: {
    type: String,
    default: 'en',
  },
})


const Article = mongoose.model('Article', ArticleSchema)
module.exports = Article