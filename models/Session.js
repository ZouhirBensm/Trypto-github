// Categorised as a global modal
const mongoose = require('mongoose')

// Checking the connection
const db = mongoose.connection
db.once("open", () => {
  console.log(`Successfully connected to MongoDB using Mongoose from User.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
})

//Create empty Schema object?
const Schema = mongoose.Schema

//Models are defined through the Schema interface
//Models define collections
const SessionSchema = new Schema({}, { _id: false })

//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const Session = mongoose.model('Session', SessionSchema, 'sessions');
//Export User variable to other files
module.exports = Session