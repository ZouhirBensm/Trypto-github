function upgradeToBasicResponder(req, res) {

  // console.log("\n\nreq.body: ", req.body)

  res.status(200).end()

}

const upgradeToBasicController = {
  upgradeToBasicResponder
}

module.exports = upgradeToBasicController