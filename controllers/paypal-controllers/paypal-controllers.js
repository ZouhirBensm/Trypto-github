const httpStatus = require("http-status-codes")
const billing_utils = require('../../full-stack-libs/utils.billing')
const Subscriber = require('../../models/Subscriber');
const User = require('../../models/User');


const ROLE = require('../../full-stack-libs/Types/Role')


const agendaDefineJobFunctions = require('../../full-stack-libs/define-agenda-job-functions/define-aganda-job-functions')


async function paypalUnsubscribeController(req, res, next) {
  let paypal_cancel_sub_response_status = res.locals.paypalCancelSubResponseStatus
  let subscriptionInfo = res.locals.subscriptionInfo

  // In the 200 range
  if (paypal_cancel_sub_response_status > 199 && paypal_cancel_sub_response_status < 300) {

    let [, current_billing_cycle_top_datetime] = billing_utils.BillingDateTimeCalculator(subscriptionInfo.subscriptionDateTime)

    unsubscriptionTakesEffectOnBidBlock = current_billing_cycle_top_datetime;

    // set the expiryAt field of the Subscriber entry at the unsubscriptionTakesEffectOnBidBlock date
    let SubscriptionSetExpityReturn
    try {
      SubscriptionSetExpityReturn = await Subscriber.findOneAndUpdate({ _id: subscriptionInfo._id }, { expireAt: unsubscriptionTakesEffectOnBidBlock })
    } catch (error) {
      return next(error)
    }

    // When unsubscribing from Paypal
    // TODO NEEDS TEST
    agendaDefineJobFunctions.unsubFromBidBlockOnCalendar(req.body.userId)
    // agenda.define(`Nullify particular User: ${req.body.userId} subscriptionID field and set role to UNSUBSCRIBER`, async (job, done) => {
    //   let userUnsubscribed
    //   try { 
    //     userUnsubscribed = await User.updateOne({ _id: req.body.userId }, { subscriptionID: null, role: ROLE.USER.NOTSUBSCRIBER }); 
    //   } catch (e) { 
    //     return next(e) 
    //   }
    //   done()
    //   const numRemoved = await agenda.cancel({ name: `Nullify particular User: ${req.body.userId} subscriptionID field and set role to UNSUBSCRIBER` });
    // });

    await agenda.schedule(unsubscriptionTakesEffectOnBidBlock, `Nullify particular User: ${req.body.userId} subscriptionID field and set role to UNSUBSCRIBER`);

    res.status(httpStatus.StatusCodes.OK).json({
      server: {
        client_message: `You have successfully unsubscribed, your paid for subscription benefits will stay valid until: ${unsubscriptionTakesEffectOnBidBlock}, at which point you will be set on the NOTSUBSCRIBER plan, and recurring charges will seize as of today.`,
        admin_message: 'POST to /paypal/unsubscribe response when done, you should have the user unsubscribed now!'
      }
    });

  } else {

    res.status(httpStatus.StatusCodes.ACCEPTED).json({
      server: {
        client_message: `Unsubscription failed for some backend reason, please contact webmaster to manually unsubscribe for you! contact <a href="https://webdevelopercanada.website/Zouhir">Webmaster's website<a/>`,
        admin_message: 'POST to /paypal/unsubscribe response when done, subsciption is  still on BidBlock and Paypal files, please contact an admin to unsubscribe properly!'
      }
    });

  }
}




paypalControllers = {
  paypalUnsubscribeController: paypalUnsubscribeController,
}


module.exports = paypalControllers