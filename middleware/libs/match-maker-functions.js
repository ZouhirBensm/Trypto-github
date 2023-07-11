function filterObject(crypto = undefined, category = undefined, source = undefined){


  console.log(crypto, category, source)

  let filter_object = {
    ...(crypto ? {crypto}: null),
    ...(category ? {category}: null),
    ...(source ? {source}: null)
  };

  console.log(filter_object)


  return filter_object
}


function formOrderFindFilter(searchEngineTerms = undefined){
  let findObject = {}

  if(searchEngineTerms){
    for (const key in searchEngineTerms) {
      if (Object.hasOwnProperty.call(searchEngineTerms, key)) {
        const value = searchEngineTerms[key];
        switch (key) {
          case "titleTerm":
            const reg = new RegExp(value)
            findObject = {
              ...findObject,
              title: reg,
            }
            break;
          case "categoryTerm":
            findObject = {
              ...findObject,
              category: value,
            }
            break;
          case "conditionTerm":
            findObject = {
              ...findObject,
              condition: parseInt(value),
            }
            break;
          case "chainTerm":
            findObject = {
              ...findObject,
              chain: value,
            }
            break;  
          case "minPriceTerm":
            findObject = {
              ...findObject,
              price: { 
                ...findObject.price,
                $gt: parseInt(value) 
              },
            }
            break;  
          case "maxPriceTerm":
            findObject = {
              ...findObject,
              price: { 
                ...findObject.price,
                $lt: parseInt(value) 
              },
            }
            break;        
          default:
            break;
        }
      }
    }
  }

  return findObject

}



function formLocalityFindFilter(searchEngineTerms = undefined){
  let findObject = {}

  if(searchEngineTerms){
    for (const key in searchEngineTerms) {
      if (Object.hasOwnProperty.call(searchEngineTerms, key)) {
        const value = searchEngineTerms[key];
        switch (key) {
          case "countryTerm":
            findObject = {
              ...findObject,
              // "location.country": { $eq: value },
              "location.country": value,
            }
            break;
          case "stateProvinceTerm":
            findObject = {
              ...findObject,
              "location.province_state": value,
            }
            break;
          case "cityTerm":
            findObject = {
              ...findObject,
              "location.city": value,
            }
            break;     
          default:
            break;
        }
      }
    }
  }

  return findObject

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
      parseInt(_sell.rate,10) < parseInt(buyorder.rate,10) * 1.10 &&
      parseInt(_sell.rate,10) > parseInt(buyorder.rate,10) * 0.9 &&
      _sell.crypto === buyorder.crypto && 
      _sell.chain === buyorder.chain && 
      parseInt(_sell.minamount,10) < buyorder.amount && 
      parseInt(_sell.maxamount,10) > buyorder.amount
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
      parseInt(_buy.rate,10) < parseInt(sellorder.rate,10) * 1.10 &&
      parseInt(_buy.rate,10) > parseInt(sellorder.rate,10) * 0.9 &&
      _buy.crypto === sellorder.crypto && 
      _buy.chain === sellorder.chain && 
      parseInt(_buy.amount,10) > parseInt(sellorder.minamount, 10) && 
      parseInt(_buy.amount,10) < parseInt(sellorder.maxamount, 10)
    ) {
      arrayofSellmatches.push(sellorder)
    }
  });
  return arrayofSellmatches
}


module.exports =  {filterObject, formOrderFindFilter, formLocalityFindFilter, buyMatchesFinder, sellMatchesFinder}