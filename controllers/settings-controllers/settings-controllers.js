
async function setUsersAssociatedLocalityResponderController(req,res,next) {
  res.status(200).json({
    message: "successful user's associated locality update!"
  })
}

const settingsController = {
  setUsersAssociatedLocalityResponderController: setUsersAssociatedLocalityResponderController
}

module.exports = settingsController