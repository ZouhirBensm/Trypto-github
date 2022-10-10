const ENV = require('../../config/base')

const mongoose = require('mongoose')

const db = mongoose.connection

db.once("open", () => {
  console.log(`Successfully connected to MongoDB using Mongoose from BuyCryptoOrder.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
})

//Create empty Schema object?
const Schema = mongoose.Schema

//Models are defined through the Schema interface
//Models define collections
const BuyCryptoOrderSchema = new Schema({
    crypto: String,
    chain: String,
    amount: String,
    rate: String,
    expirydate: String,
    expirytime: String,
    payment: String,
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

BuyCryptoOrderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const BuyCryptoOrder = mongoose.model('BuyCryptoOrder', BuyCryptoOrderSchema)
//Export User variable to other files
module.exports = BuyCryptoOrder