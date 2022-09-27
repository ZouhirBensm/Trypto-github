// TODO merge match-maker-functions2 and match-maker-functions to one file. Difference relies un URLs i.e. the URL can be passed from where the functions are invoked


function filterObject(crypto = null, category = "RECENT"){
  // let filter_object = {}
  // filter_object = path_param_userID? (filter_object.userid = path_param_userID): null  
  let filter_object = crypto? {crypto: crypto}: {}; // Adding properties with destructuring

  // crypto? (filter_object = {...filter_object, crypto: crypto}): filter_object // Adding properties with destructuring
  // crypto? (filter_object.crypto = crypto): null;

  // console.log((category == "RECENT") ? null: (filter_object.category = category));
  (category == "RECENT") ? null: (filter_object.category = category)

  console.log("filter_object:", filter_object)

  return filter_object
}




let buyMatchesFinder = function(_mysellOrders, buyOrders, id) {

  // console.log("_mysellOrders", _mysellOrders, "buyOrders", buyOrders, "id", id)
  
  let _arrayOfarrayMatchesforEachSell = []
  return new Promise(function(resolve, reject) {
    try{
      _mysellOrders.forEach(sell => {
        // In the future we can define custom errors to be thrown in certain scenarios
        // console.log({id}, typeof id)
        let arrayofBuymatches = findBuyMatches(sell, buyOrders, id)
        _arrayOfarrayMatchesforEachSell.push(arrayofBuymatches)
      });
    } catch(err){
      reject(err)
    } 

    // console.log({_arrayOfarrayMatchesforEachSell})
    resolve(_arrayOfarrayMatchesforEachSell) //value of promise //You can return the actual array if you want
  });
};



function findBuyMatches(_sell, buyOrders, id){
  let arrayofBuymatches = []
  // console.log({id}, typeof id)

  let buy = buyOrders.filter(_buy => id != _buy.userid._id.toString()) //filter to not deal with current logged in user
  
  buy.forEach(buyorder => {
    if (
      regexTitleMatch(_sell.title, buyorder.title) &&
      parseInt(_sell.price,10) < parseInt(buyorder.maxprice,10) * 1.10 &&
      parseInt(_sell.price,10) > parseInt(buyorder.minprice,10) * 0.9 &&
      parseInt(_sell.conversion,10) < parseInt(buyorder.conversion,10) * 1.10 &&
      parseInt(_sell.conversion,10) > parseInt(buyorder.conversion,10) * 0.9 &&
      _sell.chain === buyorder.chain
    ) {
      arrayofBuymatches.push(buyorder)
    }
  });
  // console.log({arrayofBuymatches})
  return arrayofBuymatches
}



















let sellMatchesFinder = function(_mybuyOrders, sellOrders, id) {
  let _arrayOfarrayMatchesforEachBuy = []

  // console.log("_mybuyOrders", _mybuyOrders, "sellOrders", sellOrders, "id", id)

  return new Promise(function(resolve, reject) {
    try{
      _mybuyOrders.forEach(buy => {
        // In the future we can define custom errors to be thrown in certain scenarios
        let arrayofSellmatches = findSellMatches(buy, sellOrders, id)
        _arrayOfarrayMatchesforEachBuy.push(arrayofSellmatches)
      });
    } catch(err){
      reject(err)
    } 
    resolve(_arrayOfarrayMatchesforEachBuy) //value of promise //You can return the actual array if you want
  });
};




function findSellMatches(_buy, sellOrders, id){
  let arrayofSellmatches = []
  let sell = sellOrders.filter(_sell => id != _sell.userid._id.toString()) //filter to not deal with current logged in user

  sell.forEach(sellorder => {
    // console.log("\n\n\n\n lala: ", parseInt(_buy.price,10) < parseInt(sellorder.price,10) * 1.10, parseInt(_buy.price,10) > parseInt(sellorder.price,10) * 0.9)
    if (
      regexTitleMatch(_buy.title, sellorder.title) &&
      parseInt(_buy.maxprice,10) * 1.10 > parseInt(sellorder.price,10)  &&
      parseInt(_buy.minprice,10) * 0.9 < parseInt(sellorder.price,10)  &&
      parseInt(_buy.conversion,10) * 1.10 > parseInt(sellorder.conversion,10)  &&
      parseInt(_buy.conversion,10) * 0.9 < parseInt(sellorder.conversion,10)  &&
      _buy.chain === sellorder.chain
    ) {
      arrayofSellmatches.push(sellorder)
    }
  });

  return arrayofSellmatches
}









function regexTitleMatch(_title1, _title2){
  let arrayToTest1 = _title1.split(" ")
  console.log("arrayToTest", arrayToTest1, typeof arrayToTest1)


  for (let i = 0; i < arrayToTest1.length; i++) {
    const ele1 = arrayToTest1[i];

    const reg01 = new RegExp(`${ele1}`, 'i');
    // const reg01 = /bla/i; 
    if (reg01.test(_title2) ) {
      console.log("match: ", ele1)
      return true
    } else {
      console.log("no match: ", ele1)
    } 
  }

  console.log("this")
  return false

}



module.exports =  {filterObject, buyMatchesFinder, sellMatchesFinder}