const mongoose = require('mongoose')

// const db = mongoose.connection

// db.once("open", () => {
//   console.log(`Successfully connected to MongoDB using Mongoose from SellMarketOrder.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
// })


//Create empty Schema object?
const Schema = mongoose.Schema

//Models are defined through the Schema interface
//Models define collections
const SellMarketOrderSchema = new Schema({
    title: String,
    description: String,
    category: String,
    price: String,
    crypto: String,
    conversion: String,
    payment: String,
    chain: String,
    expirydate: String,
    expirytime: String,
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
    sellmarketorderlocationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SellMarketOrderLocation',
        required: true
    },
    postedDate: {
        type: Date,
        default: new Date(),
    }
})


SellMarketOrderSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const SellMarketOrder = mongoose.model('SellMarketOrder',SellMarketOrderSchema)
//Export User variable to other files
module.exports = SellMarketOrder