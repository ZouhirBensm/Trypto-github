async function controller1(req, res, next) {

  let message = `Success updating your profile picture`
  return res.status(200).json({
    message: message
  });

}


profileController = {
  controller1: controller1
}


module.exports = profileController