const mongoose = require('mongoose')

const db = mongoose.connection

// models/home-currencyorders-models/BuyLocationCryptoOrder.js

db.once("open", () => {
  console.log(`Successfully connected to MongoDB using Mongoose from BuyLocationCryptoOrder.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
})


//Create empty Schema object?
const Schema = mongoose.Schema

const HumanLocationSchema = new Schema({
  province_state: String,
  country: String
});

//Models are defined through the Schema interface
//Models define collections
const BuyLocationCryptoOrderSchema = new Schema({
    // geometry: {
    //   type: LocationSchema,
    //   required: true
    // },
    location: {
      type: HumanLocationSchema
    },
    expireAt: {
      type: Date,
      //default: Date.now,
      //expires: 5000
  },
})


BuyLocationCryptoOrderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const BuyLocationCryptoOrder = mongoose.model('BuyLocationCryptoOrder', BuyLocationCryptoOrderSchema)
//Export User variable to other files
module.exports = BuyLocationCryptoOrder