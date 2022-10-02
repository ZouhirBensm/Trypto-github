let utils = {}

utils.getStreetNumber = function (_addressArray) {
  for (let i = 0; i < _addressArray.length; i++) {
    const ele = _addressArray[i];
    if(ele.types.includes('street_number')){
      console.log(ele.long_name)
      return ele.long_name || ele.short_name
    } else {
      return undefined
    }
  }
}
utils.getStreet = function (_addressArray) {
  let foundOrNot = undefined
  for (let i = 0; i < _addressArray.length; i++) {
    const ele = _addressArray[i];
    if(ele.types.includes('route')){
      foundOrNot = ele.long_name || ele.short_name
      break
    }
  }
  return foundOrNot
}




utils.getNeighborhood = function (_addressArray) {
  let foundOrNot = undefined
  for (let i = 0; i < _addressArray.length; i++) {
    const ele = _addressArray[i];
    if(checker(ele.types, ['neighborhood', "political"])){
      foundOrNot = ele.long_name || ele.short_name
      break
    }
  }
  return foundOrNot
}




utils.getProvinceState = function (_addressArray) {
  let foundOrNot = undefined
  for (let i = 0; i < _addressArray.length; i++) {
    const ele = _addressArray[i];
    if(checker(ele.types, ['administrative_area_level_1', "political"])){
      foundOrNot = ele.long_name || ele.short_name
      break
    }
  }
  return foundOrNot
}




utils.getCity = function (_addressArray) {
  let foundOrNot = undefined
  for (let i = 0; i < _addressArray.length; i++) {
    const ele = _addressArray[i];
    if(checker(ele.types, ['locality', "political"])){
      foundOrNot = ele.long_name || ele.short_name
      break
    }
  }
  return foundOrNot
}



utils.getCountry = function (_addressArray) {
  let foundOrNot = undefined
  for (let i = 0; i < _addressArray.length; i++) {
    const ele = _addressArray[i];
    if(checker(ele.types, ['country', "political"])){
      foundOrNot = ele.long_name || ele.short_name
      break
    }
  }
  return foundOrNot
}


let checker = (arr, target) => target.every(v => arr.includes(v))


module.exports = { utils }