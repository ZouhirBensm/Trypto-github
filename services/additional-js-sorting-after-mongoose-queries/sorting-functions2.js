

function sortingSteps(sellOrders, locationObject){
  // sellOrders.forEach(order => {
  //   console.log(order.sellmarketorderlocationID?.location)
  // });
  // console.log(locationObject)


  // if st, neigh, province_state, city, country



  if (locationObject.country) {
    console.log("...sorting for country")
    sellOrders = SORT(sellOrders, "country", locationObject)
  }

  // TODO slice sellOrders to the end of the SORT

  if (locationObject.country && locationObject.province_state) {
    console.log("...sorting for province_state")
    // TODO sort only sliced piece and push/reassign to sellOrders
    sellOrders = SORT(sellOrders, "province_state", locationObject)
  }

  if (locationObject.country && locationObject.province_state && locationObject.city) {
    console.log("...sorting for city")
    sellOrders = SORT(sellOrders, "city", locationObject)
  }

  if (locationObject.country && locationObject.province_state && locationObject.city && locationObject.neigh) {
    console.log("...sorting for neigh")
    sellOrders = SORT(sellOrders, "neigh", locationObject)
  }

  if (locationObject.country && locationObject.province_state && locationObject.city && locationObject.st) {
    console.log("...sorting for street")
    sellOrders = SORT(sellOrders, "st", locationObject)
  }

  return sellOrders
}



function SORT(sellOrders, area_level, locationObject){

  sellOrders.sort((a ,b)=>{
    if (
      a.sellmarketorderlocationID?.location[area_level] == locationObject[area_level] &&
      b.sellmarketorderlocationID?.location[area_level] != locationObject[area_level]
    ) return -1
    if (
      a.sellmarketorderlocationID?.location[area_level] != locationObject[area_level] &&
      b.sellmarketorderlocationID?.location[area_level] == locationObject[area_level]
    ) return 1
    return 0
  })
  
  return sellOrders

}





module.exports = {
  sortingSteps: sortingSteps
}