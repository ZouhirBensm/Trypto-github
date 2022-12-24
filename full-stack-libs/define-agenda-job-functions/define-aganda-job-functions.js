const fs = require('fs')
const User = require('../../models/User')
const HexForUnactiveUser = require('../../models/HexForUnactiveUser');
const UserAssociatedLocality = require('../../models/UserAssociatedLocality');
const ROLE = require('../../full-stack-libs/Types/Role');


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




function deleteUserIfStillDidNotActivate(jobname, userID_to_delete) {
  agenda.define(jobname, async (job, done) => {
    let ret_deleted_unactive_user
    try {
      ret_deleted_unactive_user = await User.findOneAndDelete({_id: userID_to_delete, active: false}); 
      // console.log('\n\nDeleted user--->: ', ret_deleted_unactive_user)
    } catch (e) {
      console.error(`Was unable to delete User: ${userID_to_delete} that did not activate account before time limit!`)
    }

    if(ret_deleted_unactive_user) {

      let ret_deleted_unactive_user_associatedlocality
      try {
        ret_deleted_unactive_user_associatedlocality = await UserAssociatedLocality.findOneAndDelete({_id: ret_deleted_unactive_user.userassociatedlocalityID}); 
        // console.log('\n\nDeleted associated locality--->: ', ret_deleted_unactive_user_associatedlocality)
      } catch (e) {
        console.error(`Was unable to delete User's: ${userID_to_delete}, associated locality that did not activate account before time limit!`)
      }


      let ret_deleted_hexforunactiveusers
      try {
        ret_deleted_hexforunactiveusers = await HexForUnactiveUser.findOneAndDelete({userID: ret_deleted_unactive_user._id}); 
        // console.log('\n\nDeleted hex--->: ', ret_deleted_hexforunactiveusers)
      } catch (e) {
        console.error(`Was unable to delete HexForUnactiveUser: ${et_deleted_unactive_user._id} that did not activate account before time limit!`)
      }
    }

    done()
    const numRemoved = await agenda.cancel({ name: jobname });
  });


}






agendaDefineJobFunctions = {
  defineDeleteteMarketOrderImagesFolder: defineDeleteteMarketOrderImagesFolder,
  unsubFromBidBlockOnCalendar: unsubFromBidBlockOnCalendar,
  deleteUserIfStillDidNotActivate: deleteUserIfStillDidNotActivate
}


module.exports = agendaDefineJobFunctions