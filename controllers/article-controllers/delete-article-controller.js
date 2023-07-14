

function controller1(req, res, next) {
  console.log("controller1...")


  

  // FOR TESTING ERROR RETURNS
  // res.status(500).end()
  res.status(200).end()

}





const deleteArticleController = {
  controller1: controller1,
}



module.exports = deleteArticleController