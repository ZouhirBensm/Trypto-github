async function controller1(req, res, next) {

  return res.json({
    success: true
  });
  
}


profileController = {
  controller1: controller1
}


module.exports = profileController