const ENV = require('../../config/base')

const mongoose = require('mongoose')

const db = mongoose.connection

db.once("open", () => {
  console.log(`Successfully connected to MongoDB using Mongoose from BuyMarketOrder.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
})

//Create empty Schema object?
const Schema = mongoose.Schema

//Models are defined through the Schema interface
//Models define collections
const BuyMarketOrderSchema = new Schema({
    title: String,
    category: String,
    minprice: String,
    maxprice: String,
    crypto: String,
    conversion: String,
    payment: String,
    chain: String,
    expireAt: {
        type: Date,
        //default: Date.now,
        //expires: 5000
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postedDate: {
        type: Date,
        default: new Date(),
    }
})

BuyMarketOrderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const BuyMarketOrder = mongoose.model('BuyMarketOrder', BuyMarketOrderSchema)
//Export User variable to other files
module.exports = BuyMarketOrder