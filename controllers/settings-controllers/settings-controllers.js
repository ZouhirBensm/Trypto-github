
async function setUsersAssociatedLocalityResponderController(req,res,next) {
  const message = `Successful associated locality update!`
  res.status(200).json({
    message: message
  })
}

const settingsController = {
  setUsersAssociatedLocalityResponderController: setUsersAssociatedLocalityResponderController
}

module.exports = settingsController