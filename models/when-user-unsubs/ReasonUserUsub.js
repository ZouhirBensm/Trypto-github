const mongoose = require('mongoose')
// const ENV = require('../../config/base')
const Schema = mongoose.Schema


const ReasonUserUsubSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reason_for_unsub: {
    type: String,
    required: true
  },
  plan_unsub_from: {
    type: String,
    required: true
  }
})


const ReasonUserUsub = mongoose.model('ReasonUserUsub', ReasonUserUsubSchema)

module.exports = ReasonUserUsub