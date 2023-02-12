const ROLE = require('../../full-stack-libs/Types/Role')

// TODO !!!! Have item database reorganize in a optimized fashion i.e. with the slice function based on the users registered locality, if not default to ottawa
// TODO !!!! slice sellOrders to the end of the SORT
// TODO !!!! Have the app adaptible to USD currency


// TODO !!!! check when no user locality, what happens, defaults to Ottawa?
// TODO !!!! determine why reruns on every page flip. Ideally it doesn't, look into cashing

// TODO !!!! place basic subscribers first by locality, 
// TODO !!!! For option 2 the BASIC placements need to be on sorting area step interval
function sortingSteps(sellOrders, userLocalityObject) {
  let one, two, three, four, five
  let one_p1, one_p2, two_p1, two_p2, three_p1, three_p2, four_p1, four_p2, five_p1, five_p2
  let one_p1_BASIC, two_p1_BASIC, three_p1_BASIC, four_p1_BASIC, five_p1_BASIC
  let five_BASIC, four_BASIC, three_BASIC, two_BASIC, one_BASIC

  if (userLocalityObject.country) {
    console.log("...sorting for country")
    one = SORT(sellOrders, "country", userLocalityObject)
    
    // FIND INDEX
    let lastIndex = one.map((order=>order.sellmarketorderlocationID?.location.country)).lastIndexOf(userLocalityObject.country)
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    one_p1 = one.slice(0,lastIndex+1)
    // TODO !!!! Once sliced put BASIC on top of stack neglecting arrangement by recent/old, but the ones after BASIC are recent.
    one_p1_BASIC = SORT_BASIC(one_p1)
    one_p2 = one.slice(lastIndex+1,one.length)
    one_BASIC = [...one_p1_BASIC, one_p2]
  }

  
  
  if (userLocalityObject.country && userLocalityObject.province_state) {
    console.log("...sorting for province_state")
    two = SORT(one_p1_BASIC || sellOrders, "province_state", userLocalityObject)

    // FIND INDEX
    let lastIndex2 = two.map((order=>order.sellmarketorderlocationID?.location.province_state)).lastIndexOf(userLocalityObject.province_state)
  
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    two_p1 = two.slice(0,lastIndex2+1)

    two_p1_BASIC = SORT_BASIC(two_p1)
    two_p2 = two.slice(lastIndex2+1,two.length)
    two_BASIC = [...two_p1_BASIC, two_p2]
  }





  if (userLocalityObject.country && userLocalityObject.province_state && userLocalityObject.city) {
    console.log("...sorting for city")
    three = SORT(two_p1_BASIC || one_p1_BASIC || sellOrders, "city", userLocalityObject)

    // FIND INDEX
    let lastIndex3 = three.map((order=>order.sellmarketorderlocationID?.location.city)).lastIndexOf(userLocalityObject.city)
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    three_p1 = three.slice(0,lastIndex3+1)
    three_p1_BASIC = SORT_BASIC(three_p1)
    three_p2 = three.slice(lastIndex3+1,three.length)
    three_BASIC = [...three_p1_BASIC, three_p2]
  }




  if (userLocalityObject.country && userLocalityObject.province_state && userLocalityObject.city && userLocalityObject.neigh) {
    console.log("...sorting for neigh")
    four = SORT(three_p1_BASIC || two_p1_BASIC || one_p1_BASIC || sellOrders, "neigh", userLocalityObject)

    // FIND INDEX
    let lastIndex4 = four.map((order=>order.sellmarketorderlocationID?.location.neigh)).lastIndexOf(userLocalityObject.neigh)
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    four_p1 = four.slice(0,lastIndex4+1)
    four_p1_BASIC = SORT_BASIC(four_p1)
    four_p2 = four.slice(lastIndex4+1,four.length)
    four_BASIC = [...four_p1_BASIC, four_p2]
  }
  



  if (userLocalityObject.country && userLocalityObject.province_state && userLocalityObject.city && userLocalityObject.st) {
    console.log("...sorting for street")
    five = SORT(four_p1_BASIC || three_p1_BASIC || two_p1_BASIC || one_p1_BASIC || sellOrders, "st", userLocalityObject)

    // FIND INDEX
    let lastIndex5 = five.map((order=>order.sellmarketorderlocationID?.location.st)).lastIndexOf(userLocalityObject.st)
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    five_p1 = five.slice(0,lastIndex5+1)
    five_p1_BASIC = SORT_BASIC(five_p1)
    five_p2 = five.slice(lastIndex5+1,five.length)
    five_BASIC = [...five_p1_BASIC, five_p2]
  }


  if (five) {
    sellOrders = [...five_BASIC, ...((four && four_p2)|| []), ...((three && three_p2)|| []), ...((two && two_p2)|| []), , ...((one && one_p2)|| [])]  
    // Should also work
    // sellOrders = [...five, ...(four_p2 || []), ...(three_p2|| []), ...(two_p2|| []), , ...(one_p2|| [])]
  } else if (four) {
    sellOrders = [...four_BASIC, ...((three && three_p2)|| []), ...((two && two_p2)|| []), ...((one && one_p2)|| [])]  
    // sellOrders = [...four, ...(three_p2|| []), ...(two_p2|| []), , ...(one_p2|| [])]
  } else if (three) {
    sellOrders = [...three_BASIC , ...((two && two_p2)|| []), ...((one && one_p2)|| [])]  
    // sellOrders = [...three, ...(two_p2|| []), , ...(one_p2|| [])]
  } else if (two) {
    sellOrders = [...two_BASIC , ...((one && one_p2)|| [])]  
    // sellOrders = [...two,, ...(one_p2|| [])]
  } else {
    sellOrders = one_BASIC
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



function SORT_BASIC(p1) {
// Puts the BASIC ones on the top of the stack
  p1.sort((a, b) => {
    // if order a author status is BASIC and order b author status is UNSUBSCRIBER/MASTER return 1
    if (a.userid.role == ROLE.USER.SUBSCRIBER.BASIC && b.userid.role != ROLE.USER.SUBSCRIBER.BASIC) return -1
    // if order a author status is UNSUBSCRIBER and order b author status is BASIC return -1
    if (a.userid.role != ROLE.USER.SUBSCRIBER.BASIC && b.userid.role == ROLE.USER.SUBSCRIBER.BASIC) return 1
    // if order a author status is same as order b author status return 0
    return 0
  })

  return p1

}





module.exports = {
  sortingSteps: sortingSteps
}