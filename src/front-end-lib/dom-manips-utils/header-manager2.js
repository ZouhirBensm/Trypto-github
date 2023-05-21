
// TODO !!!! HERE
class HeaderManager {

  constructor(node = undefined, number = 0) {
    // Private
    this.number = number
    this.isBottomTriggered = false

    
    this.homeHeaderPrices2 = node
    
    
    this.homeHeaderPrices2.addEventListener('scroll', (e)=> {this.scrollFunction(e)})


    // // Set defined scroll bar
    // if (this.number != 0) {
    //   console.log("Executing contructor", this.number)
    //   return
    // }

    // // Default scroll Bar
    // // this.scrollBar2.addEventListener('scroll', (e)=> {this.scrollFunction(e)})
    // this.homeHeaderPrices2.addEventListener('scroll', (e)=> {this.scrollFunction(e)})

    // return
  }


  scrollFunction(e) {
    // console.log("SCROLL")
    // ---->> LEFT EDGE CONTROL <<----

    // console.log('scrollBar2: e.target.offsetLeft --->', e.target.offsetLeft)

    const rectObj = e.target.getBoundingClientRect()
    // console.log('scrollBar2: e.target.getBoundingClientRect() --->', rectObj)

    // console.log('scrollBar2: e.target.getBoundingClientRect() ---> (left, x)', `(${rectObj.left}, ${rectObj.x})`)


    // console.log('scrollBar2: e.target.offsetParent.offsetLeft --->', e.target.offsetParent.offsetLeft)


    // LEFT EDGE - CONTAINER EDGE
    // console.log('scrollBar2: e.target.scrollLeft --->', e.target.scrollLeft)
    const remainingLeftVariableScroll = e.target.scrollLeft



    // ---->> CHILD ENTIRE WIDTH <<----
    // console.log('scrollBar2: e.target.scrollWidth --->', e.target.scrollWidth)
    const entireChildWidth = e.target.scrollWidth


    // ---->> VIEWPORT/CONTAINER FIXED WIDTH <<----
    const containerFixedWidth = e.target.clientWidth


    // ---->> REMAINING SCROLL <<----
    const remainingRightFixedScroll = entireChildWidth - containerFixedWidth

    // console.log("remainingRightFixedScroll: ", remainingRightFixedScroll)


    const remainingRightVariableScroll = remainingRightFixedScroll - remainingLeftVariableScroll

    // console.log("remainingRightVariableScroll: ", remainingRightVariableScroll)
    // console.log("remainingLeftVariableScroll: ", remainingLeftVariableScroll)


    // TODO!!!! TRANFORM TO CLASS: STATIC METHODS APPEND CHILD, and SCROLL EVENT, DATASET PROPERTY

    this.triggerDown(remainingRightVariableScroll)
    this.triggerUp(remainingLeftVariableScroll)





  }


  triggerDown(remainingRightVariableScroll) {

    if (remainingRightVariableScroll < 200 && !this.isBottomTriggered) {

      console.log('BATTERY LOW ON THE RIGHT')
      this.isBottomTriggered = true
      
      // CLONE CHILD -> ONCE EFFECT
      const bottomhomeHeaderPrices2 = this.homeHeaderPrices2.cloneNode(true)
      bottomhomeHeaderPrices2.setAttribute("data-number", "1"); 
      const bottomhomeHeaderPrices2Instance = new HeaderManager(bottomhomeHeaderPrices2, bottomhomeHeaderPrices2.dataset.number);
      // APPEND AFTER TO ACTUAL -> ONCE EFFECT
      this.homeHeaderPrices2.insertAdjacentElement("afterend", bottomhomeHeaderPrices2Instance.homeHeaderPrices2);


    }

    if (remainingRightVariableScroll <= 0) {
      // ONCE remainingRightVariableScroll HITS 0 DELETE ACTUAL with its EVENT LISTENER
    }
  }

  triggerUp(remainingLeftVariableScroll) {
    // console.log(remainingLeftVariableScroll)

    if (remainingLeftVariableScroll < 200
      && parseInt(this.homeHeaderPrices2.dataset.number) !== 0
      ) {
      console.log('BATTERY LOW ON THE LEFT')
      // CLONE CHILD
      // APPEND PREVIOUS TO ACTUAL -> ONCE EFFECT
      // SET A SCROLL EVENT SAME AS THIS ONE -> ONCE EFFECT
    }
    
    if (remainingLeftVariableScroll <= 0) {
      // ONCE remainingRightVariableScroll HITS 0 DELETE ACTUAL with its EVENT LISTENER
    }

  }




}

module.exports = HeaderManager