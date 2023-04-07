const mongoose = require('mongoose')
// const ENV = require('../../config/base')
const Schema = mongoose.Schema


const ReasonUserDeleteSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  reason_for_deletion: {
    type: String,
    required: true
  }
})


const ReasonUserDelete = mongoose.model('ReasonUserDelete', ReasonUserDeleteSchema)

module.exports = ReasonUserDelete