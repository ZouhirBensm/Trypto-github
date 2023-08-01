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
          case "subcategoryTerm":
            findObject = {
              ...findObject,
              subcategory: value,
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




module.exports =  {filterObject, formOrderFindFilter, formLocalityFindFilter}