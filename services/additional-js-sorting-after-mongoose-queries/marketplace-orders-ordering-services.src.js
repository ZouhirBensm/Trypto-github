const sorting_algos = require('./sorting-functions5')


class RearrangeClass{
  #sellOrders
  constructor(sellOrders){
    this.#sellOrders = sellOrders
  }

  set LocalityArranger(locationObject){
    this.#sellOrders = sorting_algos.sortingSteps(this.#sellOrders, locationObject)
  }

  get getArrangedSellOrders(){
    return this.#sellOrders
  }



}




module.exports = RearrangeClass