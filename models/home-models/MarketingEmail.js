const ENV = require('../../config/base')

const mongoose = require('mongoose')


const Schema = mongoose.Schema


const MarketingEmailSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
})



const MarketingEmail = mongoose.model('MarketingEmail', MarketingEmailSchema)

module.exports = MarketingEmail