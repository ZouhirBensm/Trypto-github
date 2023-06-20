const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ArticleAbstractSchema = new Schema({
  abstract_name_type: {
    type: String,
    required: true
  },

  abstract_points: {
    type: [{
      type: String,
    }],
    required: true,
    validate: {
      validator: function (array) {
        return array && array.length > 0;
      },
      message: 'At least one article abstract point is required.'
    }
  },

  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  }
})



const ArticleAbstract = mongoose.model('ArticleAbstract', ArticleAbstractSchema)
module.exports = ArticleAbstract