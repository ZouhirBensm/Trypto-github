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


// TODO !!!
// first 2 things I noticed. 

// 1- you don't have protection against spam emails-> home page, need to protect against fake emails

// 2- the cursor doesn't turn to pointer on hover -> check if true in all buttons and inputs?

// 3- The login form is not even a form, I can't click enter to login, I have to click by mouse -> Add enter key press on forms

// 4- needs more css editing on phone, it looks bad on phone -> Fix the home page CSS to look exactly like the designs


// TODO !!! Simplify the copy right on the home banner: drop the fluff. dont welcome get straight to the point to keep things simple.
// "Bitcoin only marketplace" be better?