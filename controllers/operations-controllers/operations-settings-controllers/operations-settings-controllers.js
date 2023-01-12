async function setAssociatedLocalityResponderController(req, res) {
  
  const message = "Successfully updated this users associated locality."

  res.status(200).json({
    message: message,
    updated_user: res.locals.updated_user
  })

}





const operationsSettingsControllers = {
  setAssociatedLocalityResponderController: setAssociatedLocalityResponderController,
}


module.exports = operationsSettingsControllers