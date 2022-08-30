
module.exports = {
  BillingDateTimeCalculator(_subscriptionDateTime) {
    let subscriptionDateTime = new Date(_subscriptionDateTime)
    // let subscriptionDateTime = new Date('2019-01-10T09:30:00')
    let today = new Date()

    let difference = today.getTime() - subscriptionDateTime.getTime();
    console.log({difference});
    let BillingCyclesTop = Math.ceil(difference / (30 * 1000 * 3600 * 24));
    let BillingCyclesBottom = Math.floor(difference / (30 * 1000 * 3600 * 24));
    console.log({BillingCyclesTop},  {BillingCyclesBottom});

    // console.log("\n\nlast Billing", 
    // // new Date(subscriptionDateTime.setDate(subscriptionDateTime.getDate() + 30*BillingCyclesBottom)), 
    // this.keepOriginalSetDate_addBillingCycles(subscriptionDateTime, BillingCyclesBottom))

    let current_billing_cycle_botom_datetime = this.keepOriginalSetDate_addBillingCycles(subscriptionDateTime, BillingCyclesBottom)

    let current_billing_cycle_top_datetime = this.keepOriginalSetDate_addBillingCycles(subscriptionDateTime, BillingCyclesTop)
    // console.log("\n\nnext Billing", 
    // // new Date(subscriptionDateTime.setDate(subscriptionDateTime.getDate() + 30*BillingCyclesTop)), 
    // this.keepOriginalSetDate_addBillingCycles(subscriptionDateTime, BillingCyclesTop))

    console.log(current_billing_cycle_botom_datetime, current_billing_cycle_top_datetime)
    
    // unsubscriptionTakesEffectOnBidBlock = new Date(subscriptionDateTime.setDate(today.getDate() + 30))
    return [current_billing_cycle_botom_datetime, current_billing_cycle_top_datetime]
  },
  keepOriginalSetDate_addBillingCycles(immutableDateTime, billingCycles){
    console.log({immutableDateTime})
    // Make a copy from immutable
    let mutableDateTimeCopy  = new Date(immutableDateTime.getTime())
    console.log({mutableDateTimeCopy})
    // Mutate the copy
    let billingdatetime = new Date(mutableDateTimeCopy.setDate(mutableDateTimeCopy.getDate() + 30*billingCycles))

    return billingdatetime
  }
}