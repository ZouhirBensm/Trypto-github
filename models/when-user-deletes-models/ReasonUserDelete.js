const mongoose = require('mongoose')
// const ENV = require('../../config/base')
const Schema = mongoose.Schema


const ReasonUserDeleteSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  reason_for_deletion: {
    type: String,
    required: true
  }
})


const ReasonUserDelete = mongoose.model('ReasonUserDelete', ReasonUserDeleteSchema)

module.exports = ReasonUserDelete