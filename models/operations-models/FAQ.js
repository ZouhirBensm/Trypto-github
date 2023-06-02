const mongoose = require('mongoose')


const Schema = mongoose.Schema

const FAQSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    inputs: [{ type: String }],
    postedDateTime: {
        type: Date,
        default: new Date(),
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
})


const FAQ = mongoose.model('FAQ', FAQSchema)
module.exports = FAQ