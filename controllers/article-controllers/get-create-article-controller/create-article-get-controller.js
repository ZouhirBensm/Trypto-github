



async function controller1(req, res) {


  var JSX_to_load
  JSX_to_load = 'CreateArticle';


  // console.log("Response locals: ___________________/n", res.locals, navBars, loggedIn, "\n\n____________________")
  res.render('bodies/generic-boilerplate-ejs-to-render-react-components-operations', {
    JSX_to_load: JSX_to_load,
    ...(res.locals.pre_load_article_4_edit && { pre_load_article_4_edit: res.locals.pre_load_article_4_edit }),
    ...(res.locals.allImagesURLs && { allImagesURLs: res.locals.allImagesURLs }),
  })


}


module.exports = {
  controller1,
}