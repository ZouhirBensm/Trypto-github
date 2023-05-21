




// TODO !!!! HERE
class ScrollChildManager {

  constructor(node = undefined, number = 0) {
    // Private
    this.number = number
    this.isBottomTriggered = false

    
    this.scrollBar2 = node
    // Set defined scroll bar
    if (this.number != 0) {
      console.log("Executing contructor", this.number)
      return
    }

    // Default scroll Bar
    console.log('ok')
    // this.scrollBar2.addEventListener('scroll', (e)=> {this.scrollFunction(e)})

    return
  }


  scrollFunction(e) {
    console.log("SCROLL")
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
    // console.log(remainingRightVariableScroll)

    if (remainingRightVariableScroll < 200 && !this.isBottomTriggered) {
      console.log('BATTERY LOW ON THE RIGHT')
      this.isBottomTriggered = true
      // CLONE CHILD -> ONCE EFFECT
      const bottomScrollBar2 = this.scrollBar2.cloneNode(true)
      bottomScrollBar2.setAttribute("data-number", "1"); 
      const bottomScrollBar2Instance = new ScrollChildManager(bottomScrollBar2, bottomScrollBar2.dataset.number);
      // APPEND AFTER TO ACTUAL -> ONCE EFFECT
      const homeHeaderPrices2 = document.getElementById("home-header-prices2")
      homeHeaderPrices2.appendChild(bottomScrollBar2Instance.scrollBar2)
      // SET A SCROLL EVENT SAME AS THIS ONE -> ONCE EFFECT
      bottomScrollBar2Instance.scrollBar2.addEventListener('scroll', (e)=> {bottomScrollBar2Instance.scrollFunction(e)})

    }

    if (remainingRightVariableScroll == 0) {
      // ONCE remainingRightVariableScroll HITS 0 DELETE ACTUAL with its EVENT LISTENER
    }
  }

  triggerUp(remainingLeftVariableScroll) {
    // console.log(remainingLeftVariableScroll)

    if (remainingLeftVariableScroll < 200 
      && parseInt(this.scrollBar2.dataset.number) !== 0
      ) {
      console.log('BATTERY LOW ON THE LEFT')
      // CLONE CHILD
      // APPEND PREVIOUS TO ACTUAL -> ONCE EFFECT
      // SET A SCROLL EVENT SAME AS THIS ONE -> ONCE EFFECT

      // ONCE remainingLeftVariableScroll HITS 0 DELETE ACTUAL with its EVENT LISTENER
    }
  }

}

module.exports = ScrollChildManager