const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ImageInfoSchema = new Schema({
  name: {
    type: String,
  },
  format: {
    type: String
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  size: {
    type: Number
  }
});


const UserProfileImageSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  path: String,
  image: {
    type: ImageInfoSchema,
    required: true
  },
  postedDate: {
    type: Date,
    // default: new Date(),
    default: Date.now,
  }
})



const UserProfileImage = mongoose.model('UserProfileImage', UserProfileImageSchema)
module.exports = UserProfileImage