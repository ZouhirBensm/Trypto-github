const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ImageInfoSchema = new Schema({
  name: {
    type: String,
  },
  format: {
    type: String
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  size: {
    type: Number
  }
});


const SellMarketOrderImageSchema = new Schema({
  sellmarketorderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SellMarketOrder',
    required: true
  },
  path: String,
  images: [{
    type: ImageInfoSchema,
    required: true
  }],
  expireAt: {
    type: Date,
  },
  postedDate: {
    type: Date,
    // default: new Date(),
    default: Date.now,
  }
})


SellMarketOrderImageSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
SellMarketOrderImageSchema.index({ sellmarketorderID: 1 })

const SellMarketOrderImage = mongoose.model('SellMarketOrderImage', SellMarketOrderImageSchema)
module.exports = SellMarketOrderImage