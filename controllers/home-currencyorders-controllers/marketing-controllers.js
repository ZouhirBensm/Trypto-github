
function emailSubmitController(req, res) {

  const message = "Congrats, you will receive Bidblock's the most recent updates."
  
  return res.status(200).json({
    message: message
  })

}



module.exports = {
  emailSubmitController: emailSubmitController
}

