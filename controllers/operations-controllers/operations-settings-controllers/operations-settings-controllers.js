async function cont1(req, res) {
  
  const message = "Success, "

  res.status(200).json({
    message: message,
    updated_user: res.locals.updated_user
  })

}





const operationsSettingsControllers = {
  cont1: cont1,
}


module.exports = operationsSettingsControllers