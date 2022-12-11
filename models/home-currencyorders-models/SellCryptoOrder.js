const mongoose = require('mongoose')

// const db = mongoose.connection

// db.once("open", () => {
//   console.log(`Successfully connected to MongoDB using Mongoose from SellCryptoOrder.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
// })


//Create empty Schema object?
const Schema = mongoose.Schema

//Models are defined through the Schema interface
//Models define collections
const SellCryptoOrderSchema = new Schema({
    crypto: String,
    chain: String,
    minamount: String,
    maxamount: String,
    rate: String,
    expirydate: String,
    expirytime: String,
    currencyorderlocationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SellLocationCryptoOrder',
        required: true
    },
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
        // default: new Date(),
        default: Date.now,
    }
})


SellCryptoOrderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
SellCryptoOrderSchema.index({ postedDate: -1 });
SellCryptoOrderSchema.index({ userid: 1 })
// SellCryptoOrderSchema.index({ currencyorderlocationID: 1 })

//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const SellCryptoOrder = mongoose.model('SellCryptoOrder',SellCryptoOrderSchema)
//Export User variable to other files
module.exports = SellCryptoOrder