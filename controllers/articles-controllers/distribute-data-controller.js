module.exports = (req, res, next)=>{

  res.status(200).json({
    srv_: res.locals.data_to_be_served
  })
  
}
