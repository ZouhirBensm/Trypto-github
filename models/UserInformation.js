const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserInformationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure the user field is indexed for faster lookups
UserInformationSchema.index({ user: 1 });

const UserInformation = mongoose.model(
  "UserInformation",
  UserInformationSchema
);
module.exports = UserInformation;
