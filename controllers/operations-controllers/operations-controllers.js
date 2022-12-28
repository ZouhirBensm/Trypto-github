async function getOperationsPagesController(req, res) {
  res.locals.popup = req.query.popup
  var JSX_to_load
  JSX_to_load = 'Operations';


  console.log("\n\n\nres.locals: ---->>>>>", res.locals)

  
  return res.render('bodies/generic-boilerplate-ejs-to-render-react-components-operations', {
    JSX_to_load: JSX_to_load,
  })

}

function responseCreateArticleController(req, res) {
  console.log("responseCreateArticleController...")
  
  const success_message = `Your new article got posted and saved! Congrats real top G!`


  


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