const mongoose = require('mongoose')
const Schema = mongoose.Schema



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