// TODO !!!! delete this file

function sortingSteps(sellOrders, locationObject) {
  let one, two, three, four, five

  if (locationObject.country) {
    console.log("...sorting for country")
    one = SORT(sellOrders, "country", locationObject)
  }

  // FIND INDEX
  let lastIndex = one.map((order=>order.sellmarketorderlocationID?.location.country)).lastIndexOf(locationObject.country)


  // CUT IN 2 ORDERED, and UNORDERED
  one_p1 = one.slice(0,lastIndex+1)
  one_p2 = one.slice(lastIndex+1,one.length)
  
  
  if (locationObject.country && locationObject.province_state) {
    console.log("...sorting for province_state")
    two = SORT(one_p1, "province_state", locationObject)
  }

  // FIND INDEX
  let lastIndex2 = two.map((order=>order.sellmarketorderlocationID?.location.province_state)).lastIndexOf(locationObject.province_state)



  // CUT IN 2 ORDERED, and UNORDERED
  two_p1 = two.slice(0,lastIndex2+1)
  two_p2 = two.slice(lastIndex2+1,two.length)




  if (locationObject.country && locationObject.province_state && locationObject.city) {
    console.log("...sorting for city")
    three = SORT(two_p1, "city", locationObject)
  }


  // FIND INDEX
  let lastIndex3 = three.map((order=>order.sellmarketorderlocationID?.location.city)).lastIndexOf(locationObject.city)


  // CUT IN 2 ORDERED, and UNORDERED
  three_p1 = three.slice(0,lastIndex3+1)
  three_p2 = three.slice(lastIndex3+1,three.length)


  if (locationObject.country && locationObject.province_state && locationObject.city && locationObject.neigh) {
    console.log("...sorting for neigh")
    four = SORT(three_p1, "neigh", locationObject)

  }
  
  // FIND INDEX
  let lastIndex4 = four.map((order=>order.sellmarketorderlocationID?.location.neigh)).lastIndexOf(locationObject.neigh)


  // CUT IN 2 ORDERED, and UNORDERED
  four_p1 = four.slice(0,lastIndex4+1)
  four_p2 = four.slice(lastIndex4+1,four.length)



  if (locationObject.country && locationObject.province_state && locationObject.city && locationObject.st) {
    console.log("...sorting for street")
    five = SORT(four_p1, "st", locationObject)
  }

  // FIND INDEX
  let lastIndex5 = five.map((order=>order.sellmarketorderlocationID?.location.st)).lastIndexOf(locationObject.st)


  // CUT IN 2 ORDERED, and UNORDERED
  five_p1 = five.slice(0,lastIndex5+1)
  five_p2 = five.slice(lastIndex5+1,five.length)



  sellOrders = [...five, ...four_p2, ...three_p2, ...two_p2, ...one_p2]


  return sellOrders
}






function SORT(sellOrders, area_level, locationObject) {

  sellOrders.sort((a, b) => {
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