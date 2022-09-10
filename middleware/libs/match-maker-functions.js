// TODO put the filterObject functions in the full-stack-lib utils
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
  // console.log("ingredients:", _mysellOrders, buyOrders, id)
  let _arrayOfarrayMatchesforEachSell = []
  return new Promise(function(resolve, reject) {
    try{
      _mysellOrders.forEach(sell => {
        // In the future we can define custom errors to be thrown in certain scenarios
        console.log({id}, typeof id)
        let arrayofBuymatches = findBuyMatches(sell, buyOrders, id)
        _arrayOfarrayMatchesforEachSell.push(arrayofBuymatches)
      });
    } catch(err){
      reject(err)
    } 
    console.log({_arrayOfarrayMatchesforEachSell})
    resolve(_arrayOfarrayMatchesforEachSell) //value of promise //You can return the actual array if you want
  });
};

function findBuyMatches(_sell, buyOrders, id){
  let arrayofBuymatches = []
  console.log({id}, typeof id)
  let buy = buyOrders.filter(_buy => id != _buy.userid._id.toString()) //filter to not deal with current logged in user
  buy.forEach(buyorder => {
    if (
      parseInt(_sell.price,10) < parseInt(buyorder.price,10) * 1.10 &&
      parseInt(_sell.price,10) > parseInt(buyorder.price,10) * 0.9 &&
      _sell.crypto === buyorder.crypto && 
      parseInt(_sell.minamount,10) < buyorder.amount && 
      parseInt(_sell.maxamount,10) > buyorder.amount  && 
      _sell.payment === buyorder.payment
    ) {
      arrayofBuymatches.push(buyorder)
    }
  });
  console.log({arrayofBuymatches})
  return arrayofBuymatches
}




let sellMatchesFinder = function(_mybuyOrders, sellOrders, id) {
  let _arrayOfarrayMatchesforEachBuy = []
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
      parseInt(_buy.price,10) < parseInt(sellorder.price,10) * 1.10 &&
      parseInt(_buy.price,10) > parseInt(sellorder.price,10) * 0.9 &&
      _buy.crypto === sellorder.crypto && 
      parseInt(_buy.amount,10) > parseInt(sellorder.minamount, 10) && 
      parseInt(_buy.amount,10) < parseInt(sellorder.maxamount, 10)  && 
      _buy.payment === sellorder.payment
    ) {
      arrayofSellmatches.push(sellorder)
    }
  });
  return arrayofSellmatches
}


module.exports =  {filterObject, buyMatchesFinder, sellMatchesFinder}