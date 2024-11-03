const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
});

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  states: [stateSchema],
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
