function controller1(req, res, next) {
  // res.locals.article_title = req.params.article_title ?  req.params.article_title : undefined
  res.locals.head = 2

  
    var JSX_to_load = 'OnPageFooter';

    res.render('bodies/bidblock-blog-article', { 
      JSX_to_load : JSX_to_load, 
    })

}

// TODO !!!!! Need to optimise Footer and loads, and also add email inputs and table of content blocks.


module.exports = {
  controller1,
}