async function getOperationsPagesController(req, res) {
  res.locals.popup = req.query.popup
  var JSX_to_load
  JSX_to_load = 'Operations';

  return res.render('bodies/generic-boilerplate-ejs-to-render-react-components-operations', {
    JSX_to_load: JSX_to_load,
  })

}



operationsControllers = {
  getOperationsPagesController: getOperationsPagesController
}


module.exports = operationsControllers