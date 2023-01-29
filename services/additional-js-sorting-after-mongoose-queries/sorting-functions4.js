

// TODO !!!! Have item database reorganize in a optimized fashion i.e. with the slice function based on the users registered locality, if not default to ottawa
// TODO !!!! slice sellOrders to the end of the SORT
// TODO !!!! Have the app adaptible to USD currency


// TODO !!!! check when no user locality, what happens, defaults to Ottawa?
// TODO !!!! determine why reruns on every page flip. Ideally it doesn't, look into cashing
function sortingSteps(sellOrders, userLocalityObject) {
  let one, two, three, four, five
  let one_p1, one_p2, two_p1, two_p2, three_p1, three_p2, four_p1, four_p2, five_p1, five_p2

  if (userLocalityObject.country) {
    console.log("...sorting for country")
    one = SORT(sellOrders, "country", userLocalityObject)
    
    // FIND INDEX
    let lastIndex = one.map((order=>order.sellmarketorderlocationID?.location.country)).lastIndexOf(userLocalityObject.country)
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    one_p1 = one.slice(0,lastIndex+1)
    one_p2 = one.slice(lastIndex+1,one.length)
  }

  
  
  if (userLocalityObject.country && userLocalityObject.province_state) {
    console.log("...sorting for province_state")
    two = SORT(one_p1 || sellOrders, "province_state", userLocalityObject)

    // FIND INDEX
    let lastIndex2 = two.map((order=>order.sellmarketorderlocationID?.location.province_state)).lastIndexOf(userLocalityObject.province_state)
  
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    two_p1 = two.slice(0,lastIndex2+1)
    two_p2 = two.slice(lastIndex2+1,two.length)
  }





  if (userLocalityObject.country && userLocalityObject.province_state && userLocalityObject.city) {
    console.log("...sorting for city")
    three = SORT(two_p1 || one_p1 || sellOrders, "city", userLocalityObject)

    // FIND INDEX
    let lastIndex3 = three.map((order=>order.sellmarketorderlocationID?.location.city)).lastIndexOf(userLocalityObject.city)
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    three_p1 = three.slice(0,lastIndex3+1)
    three_p2 = three.slice(lastIndex3+1,three.length)
  }




  if (userLocalityObject.country && userLocalityObject.province_state && userLocalityObject.city && userLocalityObject.neigh) {
    console.log("...sorting for neigh")
    four = SORT(three_p1 || two_p1 || one_p1 || sellOrders, "neigh", userLocalityObject)

    // FIND INDEX
    let lastIndex4 = four.map((order=>order.sellmarketorderlocationID?.location.neigh)).lastIndexOf(userLocalityObject.neigh)
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    four_p1 = four.slice(0,lastIndex4+1)
    four_p2 = four.slice(lastIndex4+1,four.length)
  }
  



  if (userLocalityObject.country && userLocalityObject.province_state && userLocalityObject.city && userLocalityObject.st) {
    console.log("...sorting for street")
    five = SORT(four_p1 || three_p1 || two_p1 || one_p1 || sellOrders, "st", userLocalityObject)

    // FIND INDEX
    let lastIndex5 = five.map((order=>order.sellmarketorderlocationID?.location.st)).lastIndexOf(userLocalityObject.st)
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    five_p1 = five.slice(0,lastIndex5+1)
    five_p2 = five.slice(lastIndex5+1,five.length)
  }


  if (five) {
    sellOrders = [...five, ...((four && four_p2)|| []), ...((three && three_p2)|| []), ...((two && two_p2)|| []), , ...((one && one_p2)|| [])]  
    // Should also work
    // sellOrders = [...five, ...(four_p2 || []), ...(three_p2|| []), ...(two_p2|| []), , ...(one_p2|| [])]
  } else if (four) {
    sellOrders = [...four, ...((three && three_p2)|| []), ...((two && two_p2)|| []), ...((one && one_p2)|| [])]  
    // sellOrders = [...four, ...(three_p2|| []), ...(two_p2|| []), , ...(one_p2|| [])]
  } else if (three) {
    sellOrders = [...three , ...((two && two_p2)|| []), ...((one && one_p2)|| [])]  
    // sellOrders = [...three, ...(two_p2|| []), , ...(one_p2|| [])]
  } else if (two) {
    sellOrders = [...two , ...((one && one_p2)|| [])]  
    // sellOrders = [...two,, ...(one_p2|| [])]
  } else {
    sellOrders = one
  }

  let reindexedsellOrders = sellOrders.filter(function(){return true;});
  return reindexedsellOrders
}






function SORT(sellOrders, area_level, userLocalityObject) {

  sellOrders.sort((a, b) => {
    if (
      a.sellmarketorderlocationID?.location[area_level] == userLocalityObject[area_level] &&
      b.sellmarketorderlocationID?.location[area_level] != userLocalityObject[area_level]
    ) return -1
    if (
      a.sellmarketorderlocationID?.location[area_level] != userLocalityObject[area_level] &&
      b.sellmarketorderlocationID?.location[area_level] == userLocalityObject[area_level]
    ) return 1
    return 0
  })

  return sellOrders

}





module.exports = {
  sortingSteps: sortingSteps
}