const ENV = require('../../config/base')

const mongoose = require('mongoose')


const Schema = mongoose.Schema


const MarketingEmailSchema = new Schema({
    email: String
})



const MarketingEmail = mongoose.model('MarketingEmail', MarketingEmailSchema)

module.exports = MarketingEmail