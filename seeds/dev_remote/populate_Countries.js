const { ENVIRONMENT, SIGNAL } = require("../../full-stack-libs/Data/env");

require("dotenv").config();

const axios = require("axios");
const mongoose = require("mongoose");
const Country = require("../../models/Country"); // Assuming the model is in models folder
const ENV = require("../../config/base");

mongoose.set("strictQuery", true);

mongoose.connect(ENV.database_link).catch((e) => {
  throw e;
});

// Function to generate the 'code' field
function generateCode(iso3, iso2, name) {
  if (iso3) return iso3;
  if (iso2) return iso2;
  return name.substring(0, 3).toUpperCase(); // Use the first 3 characters of the name
}

async function saveCountries() {
  try {
    // Fetch data from the API
    const response = await axios.get("https://countriesnow.space/api/v0.1/countries/states");
    const countries = response.data.data;

    // Loop through each country and transform the data
    for (const country of countries) {
      if (country.iso3 === "ISR") {
        continue;
      }

      if (country.iso3 === "PSE") {
        country.name = "Palestine";
      }

      const countryCode = generateCode(
        country.iso3,
        country.iso2,
        country.name
      );

      const transformedStates = country.states.map((state) => {
        const stateCode = generateCode(null, state.state_code, state.name);
        return {
          name: state.name,
          code: stateCode,
        };
      });

      // Create the new country object
      const newCountry = new Country({
        name: country.name,
        code: countryCode, 
        states: transformedStates,
      });

      await newCountry.save();
    }

    console.log(
      "Countries and states saved with codes successfully"
    );
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

saveCountries();
