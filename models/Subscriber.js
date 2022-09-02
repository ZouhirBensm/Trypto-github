// Categorised as a global modal
const mongoose = require('mongoose')

const ENV = require('../config/base')

// Checking the connection
const db = mongoose.connection
db.once("open", () => {
  console.log(`Successfully connected to MongoDB using Mongoose from Subscriber.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
})


//Create empty Schema object?
const Schema = mongoose.Schema

//Models are defined through the Schema interface
//Models define collections
const SubscriberSchema = new Schema({
  paypal_subscriptionID: {
      // submited from the front end
      type: String,
      required: true
  },
  paypal_plan_id: {
      // submited from the front end
      type: String,
      required: true
  },
  paypal_product_id: {
      type: String,
      default: ENV.paypal_product_id,
      required: true
  },
  plan: {
    // "BASIC" or non present i.e. meaning "NOTSUBSCRIBER" on the front end
    type: String,
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  subscriptionDateTime: {
      type: Date,
      default: new Date(),
  },
  expireAt: {
      type: Date,
      //default: Date.now,
      //expires: 5000
  },
})

SubscriberSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const Subscriber = mongoose.model('Subscriber', SubscriberSchema)
//Export Subscriber variable to other files
module.exports = Subscriber