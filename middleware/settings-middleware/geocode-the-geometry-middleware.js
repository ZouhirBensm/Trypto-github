const axios = require('axios');
const ENV = require('../../config/base')


const { utils } = require('../../full-stack-libs/utils.address')


const { GoogleAPIError } = require('../../custom-errors/custom-errors')


// TODO !!!! put this in own middleware if possible
// TODO !!!! have a lib for this type of functionality used on back and front end
let geocodeTheGeometryMiddleware = async function (req, res, next) {
  if (!(req.body.lat && req.body.lng)) {
    return next()
  }

  console.log(`\n\nPOST /settings/set-users-associated-locality/${req.params.userID}`)
  console.log(`\n\nPOST`, req.body)

  
  const API_KEY = ENV.console_cloud_google_api_key;
  const latitude = parseFloat(req.body.lat);
  const longitude = parseFloat(req.body.lng);

  let response
  try {
    // TODO !!!! see if this is not an environment variable?
    response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`)
  } catch (error) {
    err = new GoogleAPIError(`Call to maps.googleapis.com error.`, error.code)
    return next(err)
  }


  let address = response.data.results[0].formatted_address
  const addressArray = response.data.results[0].address_components;

  let st_number = utils.getStreetNumber(addressArray),
    st = utils.getStreet(addressArray),
    neigh = utils.getNeighborhood(addressArray),
    province_state = utils.getProvinceState(addressArray),
    city = utils.getCity(addressArray),
    country = utils.getCountry(addressArray)


  address = (address) ? address : undefined,
    st_number = (st_number) ? st_number : undefined
  st = (st) ? st : undefined
  neigh = (neigh) ? neigh : undefined
  province_state = (province_state) ? province_state : undefined
  city = (city) ? city : undefined
  country = (country) ? country : undefined


  res.locals.new_usersAssociatedLocalityData = {
    geometry: {
      lat: req.body.lat,
      lng: req.body.lng
    },
    location: {
      address: address,
      st_number: st_number,
      st: st,
      neigh: neigh,
      province_state: province_state,
      city: city,
      country: country
    }
  }

  return next()
}


module.exports = geocodeTheGeometryMiddleware