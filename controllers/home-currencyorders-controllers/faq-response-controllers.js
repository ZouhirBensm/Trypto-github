


function responseFAQsController(req, res) {

  return res.status(200).json({
    srv_: res.locals.ret_faqs
  })

}







module.exports = {
  responseFAQsController: responseFAQsController,
}

