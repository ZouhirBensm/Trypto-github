const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ArticleBodyHeaderSchema = new Schema({
  keywords: {
    type: [{
      type: String,
    }],
    required: true,
    validate: {
      validator: function (array) {
        return array && array.length > 0;
      },
      message: 'At least one keyword is required.'
    }
  },

  category: {
    type: String,
    required: true
  },

  banner_img_alt: {
    type: String,
    required: true
  },

  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  }
})



const ArticleBodyHeader = mongoose.model('ArticleBodyHeader', ArticleBodyHeaderSchema)
module.exports = ArticleBodyHeader