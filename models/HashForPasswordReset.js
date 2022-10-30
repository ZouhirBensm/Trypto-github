const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')


console.log(1)
console.log(2)
console.log(3)

// TODO refactor hex->hash
const HashForPasswordResetSchema = new Schema({
  hash: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entrycreatedDateTime: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
    //default: Date.now,
    //expires: 5000
  },
  used: {
    type: Boolean,
    default: false,
    required: true
  }
})


HashForPasswordResetSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// HashForPasswordResetSchema.pre('save', function (next) {
//   const element = this
//   console.log("@@@",element)

//   bcrypt.hash(element.hex, 5, (error, hash) => {
//     element.hash = hash
//     next()
//   })

// })


const HashForPasswordReset = mongoose.model('HashForPasswordReset', HashForPasswordResetSchema)
module.exports = HashForPasswordReset