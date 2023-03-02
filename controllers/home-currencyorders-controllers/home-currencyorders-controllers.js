const httpStatus = require("http-status-codes")

function renderMgtUserSPAController(req, res) {
  
  res.locals.userId = req.session.userId
  
  console.log("\n\n\n---->Data 3:\nuserId:\n\n\n", res.locals.userId)

  
  var JSX_to_load = 'MgtUser';
  
  return res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
}

homeCurrencyOrdersController = {
  renderMgtUserSPAController: renderMgtUserSPAController
}

module.exports = homeCurrencyOrdersController