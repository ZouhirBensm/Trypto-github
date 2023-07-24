



async function controller1(req, res, next) {
  console.log("controller1...")
  
  const message = "Successfully sent message"
  
  return res.status(200).json({
    message: message
  })
}








const deleteArticleMiddleware = {
  controller1: controller1,
}






module.exports = deleteArticleMiddleware