const mongoose = require('mongoose')

const Schema = mongoose.Schema



const LocationSchema = new Schema({
  lat: Number,
  lng: Number
});

const HumanLocationSchema = new Schema({
  address: String,
  st_number: String,
  st: String,
  neigh: String,
  province_state: String,
  city: String,
  country: String
});


const UserAssociatedLocalitySchema = new Schema({
  geometry: {
    type: LocationSchema,
    required: true
  },
  location: {
    type: HumanLocationSchema
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postedDate: {
    type: Date,
    // default: new Date(),
    default: Date.now,
  }
})


UserAssociatedLocalitySchema.index({ userID: 1 });

const UserAssociatedLocality = mongoose.model('UserAssociatedLocality', UserAssociatedLocalitySchema)

module.exports = UserAssociatedLocality