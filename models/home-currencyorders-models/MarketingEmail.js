const ENV = require('../../config/base')

const mongoose = require('mongoose')

// const db = mongoose.connection

// db.once("open", () => {
//   console.log(`Successfully connected to MongoDB using Mongoose from BuyCryptoOrder.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
// })

//Create empty Schema object?
const Schema = mongoose.Schema

//Models are defined through the Schema interface
//Models define collections
const MarketingEmailSchema = new Schema({
    email: String
})


// BuyCryptoOrderSchema.index({ currencyorderlocationID: 1 })

//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const MarketingEmail = mongoose.model('MarketingEmail', MarketingEmailSchema)
//Export User variable to other files
module.exports = MarketingEmail