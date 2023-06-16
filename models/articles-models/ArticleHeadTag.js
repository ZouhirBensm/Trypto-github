const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ArticleHeadTagSchema = new Schema({
  meta_description: {
    type: String,
    required: true
  },
  canonical: {
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


// ArticleHeadTagSchema.pre('save', function(next){
//   const articleheadgag = this

//   console.log('\n_____pre-save: articleheadgag\n\n', articleheadgag)
//   // If no canonical set, set default based on url
//   // if (!articleheadgag.canonical) {

//   // }

//   next()
// })




const ArticleHeadTag = mongoose.model('ArticleHeadTag', ArticleHeadTagSchema)
module.exports = ArticleHeadTag