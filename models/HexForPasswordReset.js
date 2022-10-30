const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')


console.log(1)
console.log(2)
console.log(3)

const HexForPasswordResetSchema = new Schema({
  hexfield: {
    type: String,
    // required: true,
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


HexForPasswordResetSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

HexForPasswordResetSchema.pre('save', function (next) {
  const element = this

  crypto.randomBytes(128, (err, buffer) => {
    var hex = buffer.toString('hex');
    // element.hexfield = hex

    bcrypt.hash(hex, 5, (error, hash) => {
      element.hexfield = hash
      next()
    })

  })


})


const HexForPasswordReset = mongoose.model('HexForPasswordReset', HexForPasswordResetSchema)
module.exports = HexForPasswordReset