const mongoose = require('mongoose')

const db = mongoose.connection

db.once("open", () => {
  console.log(`Successfully connected to MongoDB using Mongoose from SellMarketOrderLocation.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
})


//Create empty Schema object?
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

//Models are defined through the Schema interface
//Models define collections
const SellMarketOrderLocationSchema = new Schema({
    location: {
      type: LocationSchema,
      required: true
    },
    human_location: {
      type: HumanLocationSchema
    },
    expireAt: {
      type: Date,
      //default: Date.now,
      //expires: 5000
  },
})


SellMarketOrderLocationSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const SellMarketOrderLocation = mongoose.model('SellMarketOrderLocation',SellMarketOrderLocationSchema)
//Export User variable to other files
module.exports = SellMarketOrderLocation