function filterObject(path_param_userID = null, crypto = null){
  // let filter_object = {}
  // filter_object = path_param_userID? (filter_object.userid = path_param_userID): null  
  let filter_object = path_param_userID? {userid: path_param_userID}: {} // Adding properties with destructuring

  // crypto? (filter_object = {...filter_object, crypto: crypto}): filter_object // Adding properties with destructuring
  crypto? (filter_object.crypto = crypto): null

  return filter_object
}



let buyMatchesFinder = function(_mysellOrders, buyOrders, id) {
  let _arrayOfarrayMatchesforEachSell = []
  return new Promise(function(resolve, reject) {
    try{
      _mysellOrders.forEach(sell => {
        // In the future we can define custom errors to be thrown in certain scenarios
        let arrayofBuymatches = findBuyMatches(sell, buyOrders, id)
        _arrayOfarrayMatchesforEachSell.push(arrayofBuymatches)
      });
    } catch(err){
      reject(err)
    } 
    resolve(_arrayOfarrayMatchesforEachSell) //value of promise //You can return the actual array if you want
  });
};

function findBuyMatches(_sell, buyOrders, id){
  let arrayofBuymatches = []
  let buy = buyOrders.filter(_buy => id != _buy.userid._id.toString()) //filter to not deal with current logged in user
  buy.forEach(buyorder => {
    if (_sell.crypto === buyorder.crypto && parseInt(_sell.minamount,10) < buyorder.amount && parseInt(_sell.maxamount,10) > buyorder.amount  && _sell.payment === buyorder.payment) {
      arrayofBuymatches.push(buyorder)
    }
  });
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
    //console.log(_buy.amount, sellorder.maxamount, (parseInt(_buy.amount,10) < sellorder.maxamount))// < sellorder.maxamount)
    if (_buy.crypto === sellorder.crypto && 
    parseInt(_buy.amount,10) > sellorder.minamount && 
    parseInt(_buy.amount,10) < sellorder.maxamount  && 
    _buy.payment === sellorder.payment) {
      arrayofSellmatches.push(sellorder)
    }
  });
  return arrayofSellmatches
}


module.exports =  {filterObject, buyMatchesFinder, sellMatchesFinder}