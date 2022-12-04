const fs = require('fs')
const User = require('../../models/User')
const ROLE = require('../../full-stack-libs/Types/Role')


function defineDeleteteMarketOrderImagesFolder(jobname, directory) {
  agenda.define(jobname, async (job, done) => {
    try {
      fs.rmSync(directory, { recursive: true, force: true });
    } catch (e) {
      console.error(`Was unable to delete the images in directory: ${directory}, @ expiry date and time.`)
    }
    done()
    const numRemoved = await agenda.cancel({ name: jobname });
  });

}


function unsubFromBidBlockOnCalendar(userId) {
  agenda.define(`Nullify particular User: ${userId} subscriptionID field and set role to UNSUBSCRIBER`, async (job, done) => {
    let userUnsubscribed
    try { 
      userUnsubscribed = await User.updateOne({ _id: userId }, { subscriptionID: null, role: ROLE.USER.NOTSUBSCRIBER }); 
    } catch (e) { 
      console.error(e)
    }
    done()
    const numRemoved = await agenda.cancel({ name: `Nullify particular User: ${userId} subscriptionID field and set role to UNSUBSCRIBER` });
  });
}







agendaDefineJobFunctions = {
  defineDeleteteMarketOrderImagesFolder: defineDeleteteMarketOrderImagesFolder,
  unsubFromBidBlockOnCalendar: unsubFromBidBlockOnCalendar,
}


module.exports = agendaDefineJobFunctions