const ROLE = require('../../full-stack-libs/Types/Role')


// Locality arranged -> Basic on top -> after Basic, and Locality, most resent to oldest in silos

function sortingSteps(sellOrders, userLocalityObject) {
  let one, two, three, four, five
  let one_p1, one_p2, two_p1, two_p2, three_p1, three_p2, four_p1, four_p2, five_p1, five_p2
  let one_p2_BASIC, two_p2_BASIC, three_p2_BASIC, four_p2_BASIC, five_p2_BASIC
  let one_BASIC, two_BASIC, three_BASIC, four_BASIC, five_BASIC

  if (userLocalityObject.country) {
    // console.log("...sorting for country")
    one = SORT(sellOrders, "country", userLocalityObject)
    
    // FIND INDEX
    let lastIndex = one.map((order=>order.sellmarketorderlocationID?.location.country)).lastIndexOf(userLocalityObject.country)
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    one_p1 = one.slice(0,lastIndex+1)
    one_p2 = one.slice(lastIndex+1,one.length)
    one_p2_BASIC = SORT_BASIC(one_p2)
    
  }

  
  
  if (userLocalityObject.country && userLocalityObject.province_state) {
    // console.log("...sorting for province_state")
    two = SORT(one_p1 || sellOrders, "province_state", userLocalityObject)

    // FIND INDEX
    let lastIndex2 = two.map((order=>order.sellmarketorderlocationID?.location.province_state)).lastIndexOf(userLocalityObject.province_state)
  
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    two_p1 = two.slice(0,lastIndex2+1)
    two_p2 = two.slice(lastIndex2+1,two.length)
    two_p2_BASIC = SORT_BASIC(two_p2)
  }





  if (userLocalityObject.country && userLocalityObject.province_state && userLocalityObject.city) {
    // console.log("...sorting for city")
    three = SORT(two_p1 || one_p1 || sellOrders, "city", userLocalityObject)

    // FIND INDEX
    let lastIndex3 = three.map((order=>order.sellmarketorderlocationID?.location.city)).lastIndexOf(userLocalityObject.city)
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    three_p1 = three.slice(0,lastIndex3+1)
    three_p2 = three.slice(lastIndex3+1,three.length)
    three_p2_BASIC = SORT_BASIC(three_p2)
  }




  if (userLocalityObject.country && userLocalityObject.province_state && userLocalityObject.city && userLocalityObject.neigh) {
    // console.log("...sorting for neigh")
    four = SORT(three_p1 || two_p1 || one_p1 || sellOrders, "neigh", userLocalityObject)

    // FIND INDEX
    let lastIndex4 = four.map((order=>order.sellmarketorderlocationID?.location.neigh)).lastIndexOf(userLocalityObject.neigh)
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    four_p1 = four.slice(0,lastIndex4+1)
    four_p2 = four.slice(lastIndex4+1,four.length)
    four_p2_BASIC = SORT_BASIC(four_p2)
  }
  



  if (userLocalityObject.country && userLocalityObject.province_state && userLocalityObject.city && userLocalityObject.st) {
    // console.log("...sorting for street")
    five = SORT(four_p1 || three_p1 || two_p1 || one_p1 || sellOrders, "st", userLocalityObject)

    // FIND INDEX
    let lastIndex5 = five.map((order=>order.sellmarketorderlocationID?.location.st)).lastIndexOf(userLocalityObject.st)
  
  
    // CUT IN 2 ORDERED, and UNORDERED
    five_p1 = five.slice(0,lastIndex5+1)
    five_p2 = five.slice(lastIndex5+1,five.length)
    five_p2_BASIC = SORT_BASIC(five_p2)
  }


  if (five) {
    five_BASIC = SORT_BASIC(five)
    sellOrders = [...five, ...((four && four_p2_BASIC)|| []), ...((three && three_p2_BASIC)|| []), ...((two && two_p2_BASIC)|| []), , ...((one && one_p2_BASIC)|| [])]  
    // Should also work
    // sellOrders = [...five, ...(four_p2_BASIC || []), ...(three_p2_BASIC|| []), ...(two_p2_BASIC|| []), , ...(one_p2_BASIC|| [])]
  } else if (four) {
    four_BASIC = SORT_BASIC(four)
    sellOrders = [...four_BASIC, ...((three && three_p2_BASIC)|| []), ...((two && two_p2_BASIC)|| []), ...((one && one_p2_BASIC)|| [])]  
    // sellOrders = [...four, ...(three_p2_BASIC|| []), ...(two_p2_BASIC|| []), , ...(one_p2_BASIC|| [])]
  } else if (three) {
    three_BASIC = SORT_BASIC(three)
    sellOrders = [...three_BASIC , ...((two && two_p2_BASIC)|| []), ...((one && one_p2_BASIC)|| [])]  
    // sellOrders = [...three, ...(two_p2_BASIC|| []), , ...(one_p2_BASIC|| [])]
  } else if (two) {
    two_BASIC = SORT_BASIC(two)
    sellOrders = [...two_BASIC , ...((one && one_p2_BASIC)|| [])]  
    // sellOrders = [...two,, ...(one_p2_BASIC|| [])]
  } else {
    one_BASIC = SORT_BASIC(one)
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
  sortingSteps: sortingSteps,
  SORT_BASIC: SORT_BASIC
}