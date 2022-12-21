// Categorised as a global modal
const mongoose = require('mongoose')

const ROLE = require('../full-stack-libs/Types/Role')

// Checking the connection
// const db = mongoose.connection
// db.once("open", () => {
//   console.log(`Successfully connected to MongoDB using Mongoose from User.js the readyState is ${db.readyState}, and the connection string is ${db._connectionString}`)
// })


//Create empty Schema object?
const Schema = mongoose.Schema
//Import the package bcrypt
// const bcrypt = require('bcrypt')
var bcrypt = require('bcryptjs');

//Models are defined through the Schema interface
//Models define collections
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    subscriptionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscriber',
        default: null
    },
    userprofileimageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfileImage',
        default: null
    },
    registrationDateTime: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false,
        required: true
    },
    hexforunactiveuserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HexForUnactiveUser'
    },
    userassociatedlocalityID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAssociatedLocality'
    }
})

//Before save any records into users collection, execute the 
//function passed into the second argument
//Allows to change user data before saving it into the database
UserSchema.pre('save',function(next){
    //Get the user being saved
    const user = this
    //10: number of rounds of hashing ti take place
    //()=>{}: function called when hashing completes
    bcrypt.hash(user.password, 10, (error,hash)=>{
        //Replace password with encrypted version
        user.password = hash
        //next(): so that mongoose can continue creating the user data
        next()
    })
})

//Access the database my_database via mongoose.model.
//The first argument: The name of the collection the model is for.
//Apply the model to the collection?
const User = mongoose.model('User', UserSchema)
//Export User variable to other files
module.exports = User