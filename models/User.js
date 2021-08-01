const mongoose = require('mongoose')
//Create empty Schema object?
const Schema = mongoose.Schema
//Import the package bcrypt
const bcrypt = require('bcrypt')

//Models are defined through the Schema interface
//Models define collections
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//Before save any records into User collection, execute the 
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
const User = mongoose.model('User',UserSchema)
//Export User variable to other files
module.exports = User