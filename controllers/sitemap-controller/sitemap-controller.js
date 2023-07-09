


async function controller1(req, res, next) {
  res.status(200).end()
  // return next()
}







const sitemapController = {
  controller1: controller1,
}



module.exports = sitemapController