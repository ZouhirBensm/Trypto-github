// Categorised as a global modal
const mongoose = require('mongoose')
const crypto = require('crypto')

// Checking the connection
// const db = mongoose.connection
// db.once("open", () => {
//   console.log(`Successfully connected to MongoDB using Mongoose from HexForUnactiveUser.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
// })


//Create empty Schema object
const Schema = mongoose.Schema
//Import the package bcrypt
// const bcrypt = require('bcrypt')

//Models are defined through the Schema interface
//Models define collections
const HexForUnactiveUserSchema = new Schema({
  hexfield: {
    type: String,
    // required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entrycreatedDateTime: {
    type: Date,
    default: Date.now,
  },
})

HexForUnactiveUserSchema.index({ userID: 1 })



//Before save any records into users collection, execute the 
//function passed into the second argument
//Allows to change user data before saving it into the database
HexForUnactiveUserSchema.pre('save', function (next) {
  //Get the entry being saved
  const element = this

  crypto.randomBytes(128, (err, buffer) => {
    var hex = buffer.toString('hex');
    // console.log("Test--->!!!!", hex)

    element.hexfield = hex
    next()
  })


  // console.log("hex", entry.hexfield)
})

//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const HexForUnactiveUser = mongoose.model('HexForUnactiveUser', HexForUnactiveUserSchema)
//Export User variable to other files
module.exports = HexForUnactiveUser