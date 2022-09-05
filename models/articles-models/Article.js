const ENV = require('../../config/base')

const mongoose = require('mongoose')

const db = mongoose.connection

db.once("open", () => {
  console.log(`Successfully connected to MongoDB using Mongoose from Article.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
})

//Create empty Schema instance
const Schema = mongoose.Schema

//Models define collections
//Models are defined through the Schema interface
const ArticleSchema = new Schema({
  title: String,
  content: String,
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publishedDate: {
    type: Date,
    default: new Date(),
    //expires: 5000
  },
  editedDate: {
    type: Date,
    default: null,
  }
})


//Apply the Schema to the Model
const Article = mongoose.model('Article', ArticleSchema)
//Export Article variable to other files
module.exports = Article