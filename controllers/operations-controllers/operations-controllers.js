async function getOperationsPagesController(req, res) {
  res.locals.popup = req.query.popup
  var JSX_to_load
  JSX_to_load = 'Operations';


  // console.log("\n\n\noperationsControllers.getOperationsPagesController() ->res.locals: ", res.locals)

  console.log("\n\nGET /set-settings/set-users-associated-locality:\noperationsControllers.getOperationsPagesController() ->res.locals.selectedUser:\n\n***", res.locals.selectedUser, "\n\n-")

  
  res.locals.isPaypalScriptNeeded = true

  return res.render('bodies/generic-boilerplate-ejs-to-render-react-components-operations', {
    JSX_to_load: JSX_to_load,
  })

}



function responseCreateArticleController(req, res) {
  console.log("responseCreateArticleController...")
  
  const success_message = `Your new article got posted and saved! Congrats!`
  
  res.status(200).json({
    server: {
      message: success_message
    }
  })
}





operationsControllers = {
  getOperationsPagesController: getOperationsPagesController,
  responseCreateArticleController: responseCreateArticleController
}


module.exports = operationsControllers