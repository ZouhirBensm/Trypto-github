const httpStatus = require("http-status-codes")

function renderMgtUserSPAController(req, res) {
  res.locals.userId = req.session.userId
  var JSX_to_load = 'MgtUser';
  
  return res.render('bodies/generic-boilerplate-ejs-to-render-react-components-client', {
    JSX_to_load: JSX_to_load,
  })
}

homeCurrencyOrdersController = {
  renderMgtUserSPAController: renderMgtUserSPAController
}

module.exports = homeCurrencyOrdersController