
function emailSubmitController(req, res) {
  
  // TODO !!! Message should be based on the email block or default to: "Congrats, you will receive Bidblock's the most recent updates."
  const message = "Success."
  
  return res.status(200).json({
    message: message
  })

}



module.exports = {
  emailSubmitController: emailSubmitController
}

