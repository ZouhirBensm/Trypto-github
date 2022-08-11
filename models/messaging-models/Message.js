// Categorised as a global modal
const mongoose = require('mongoose')

// Checking the connection
const db = mongoose.connection
db.once("open", () => {
  console.log(`Successfully connected to MongoDB using Mongoose from Messages2.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
})


//Create empty Schema object?
const Schema = mongoose.Schema

//Models are defined through the Schema interface
//Models define collections
const MessageSchema = new Schema({
    protagonists: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Protagonist',
    //   required: true
    },
    msg_stream: [{
        text: {
            type: String,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        },
        postedDate: {
            type: Date
        }
    }],
})


//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const Message = mongoose.model('Message', MessageSchema)
//Export User variable to other files
module.exports = Message