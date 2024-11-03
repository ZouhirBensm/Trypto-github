const express = require("express");
const Country = require("../models/Country");

const countriesBackend_app_router = express.Router();

countriesBackend_app_router.get("/getAll", async (req, res) => {
  try {
    const countries = await Country.find().sort({ name: 1 });
    res.json(countries);
  } catch (err) {
    console.error("ERR COUNTRIES :: ", err);
    res.status(500).json({ error: "Error fetching countries" });
  }
});

countriesBackend_app_router.get("/:code/states", async (req, res) => {
  try {
    const country = await Country.findOne({ code: req.params.code });
    if (country) {
      res.json(country.states);
    } else {
      res.status(404).json({ error: "Country not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error fetching states" });
  }
});

module.exports = countriesBackend_app_router;
