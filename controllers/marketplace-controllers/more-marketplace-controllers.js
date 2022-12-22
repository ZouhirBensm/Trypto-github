const state_cities_map = require('../../full-stack-libs/Data/state_cities_map')
const provinces_territories_map = require('../../full-stack-libs/Data/provinces_territories_map')
const {States, Provinces_Territories} = require('../../full-stack-libs/Data/states_provinces_territories')



const UserAssociatedLocality = require('../../models/UserAssociatedLocality')



async function retrieveCitiesPerPoliticalAreaController(req, res, next) {

  console.log(req.query.PR_TERR_ST)

  req.query.PR_TERR_ST == "Québec"? req.query.PR_TERR_ST = "Quebec": null

  if (States.includes(req.query.PR_TERR_ST)) {
    res.status(200).json({
      ARR_cities: state_cities_map[req.query.PR_TERR_ST]
    })
  } else if (Provinces_Territories.includes(req.query.PR_TERR_ST)) {
    res.status(200).json({
      ARR_cities: provinces_territories_map[req.query.PR_TERR_ST]
    })
  } else {
    let error = new Error("The requested Province, Territory, or State did not match one of our lists.")
    return next(error)
  }
  
}


async function retrieveUserAssociatedLocalityIfAnyController(req, res) {

  console.log(req.params.userID)

  let ret_userassociatedlocality

  try {
    ret_userassociatedlocality = await UserAssociatedLocality.find({userID: req.params.userID}).select("geometry -_id")
  } catch (error) {
    return res.status(500)
  }

  console.log("found: ", ret_userassociatedlocality)

  if (!ret_userassociatedlocality[0]){
    return res.status(500)
  }

  return res.status(200).json({
    lat: ret_userassociatedlocality[0]?.geometry.lat,
    lng: ret_userassociatedlocality[0]?.geometry.lng
  })
  
}






moreMarketplaceController = {
  retrieveCitiesPerPoliticalAreaController: retrieveCitiesPerPoliticalAreaController,
  retrieveUserAssociatedLocalityIfAnyController: retrieveUserAssociatedLocalityIfAnyController
}


module.exports = moreMarketplaceController