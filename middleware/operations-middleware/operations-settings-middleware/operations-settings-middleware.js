const axios = require('axios')
const ENV = require('../../../config/base')

const { utils } = require('../../../full-stack-libs/utils.address')
const { GoogleAPIError, MongoError } = require('../../../custom-errors/custom-errors')


const UserAssociatedLocality = require('../../../models/UserAssociatedLocality')
const User = require('../../../models/User')

const { ObjectId } = require('mongodb')


// TODO !!!! all these middleware repeate themselves, have them wrote once and used twice, 1 for operations, and 1 for clients
async function mid0(req, res, next){
  if (!(req.body.lat && req.body.lng)) {
    // TODO !!!! do some error handling
    return next()
  }

  
  const API_KEY = ENV.console_cloud_google_api_key;
  const latitude = parseFloat(req.body.lat);
  const longitude = parseFloat(req.body.lng);

  let response
  try {
    // console.log(`${ENV.google_maps_api_url}?latlng=${latitude},${longitude}&key=${API_KEY}`)
    response = await axios.get(`${ENV.google_maps_api_url}?latlng=${latitude},${longitude}&key=${API_KEY}`)
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



async function mid1(req,res,next){
    console.log(`PUT /operations/set-settings/set-users-associated-locality/${req.params.userID}: req.body`, req.body)


    let ret_updatedUserLocality
    try {
      ret_updatedUserLocality = await UserAssociatedLocality.updateOne({ userID: req.params.userID }, res.locals.new_usersAssociatedLocalityData, { upsert: false, new: true });
    } catch (e) {
      const message = `Server error | Please try again later.`
      let error = new MongoError(message)
      return next(error)
    }
  
    return next()
}

async function mid2(req,res,next){
    console.log(`POST /operations/set-settings/set-users-associated-locality/${req.params.userID}: req.body`, req.body)

  // Create the locality instance pointing to the proper user
  res.locals.new_usersAssociatedLocalityData.userID = new ObjectId(req.params.userID)

  const userAssociatedLocality_instance = new UserAssociatedLocality(res.locals.new_usersAssociatedLocalityData)

  

  let ret_save_userAssociatedLocality
  try {
    ret_save_userAssociatedLocality = await userAssociatedLocality_instance.save()
  } catch (e) {
    const message = `Server error | Please try again later.`
    let error = new MongoError(message)
    return next(error)
  }

  let ret_updatedUsersAssociatedLocality
  try {
    // This would have worked too {userassociatedlocalityID: userAssociatedLocality_instance._id}
    ret_updatedUsersAssociatedLocality = await User.updateOne({ _id: req.params.userID }, {userassociatedlocalityID: ret_save_userAssociatedLocality._id}, { upsert: false, new: true });
  } catch (e) {
    const message = `Server error | Please try again later.`
    let error = new MongoError(message)
    return next(error)
  }

  return next()
}


async function mid3(req,res,next){

  let query = User.findById(req.params.userID)
  query = query.populate({
    path: "userassociatedlocalityID",
    select: "location geometry -_id"
  })
  .select('-password')

  const updated_user = await query.exec()

  res.locals.updated_user = updated_user

  return next()
  
}


const operationsSettingsMiddleware = {
  mid0: mid0,
  mid1: mid1,
  mid2: mid2,
  mid3: mid3,
}

module.exports = operationsSettingsMiddleware