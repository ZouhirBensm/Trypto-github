function controller1(req, res, next) {
  // res.locals.article_title = req.params.article_title ?  req.params.article_title : undefined
  res.locals.head = 2


  res.render('bodies/bidblock-blog-article')
}



module.exports = {
  controller1,
}