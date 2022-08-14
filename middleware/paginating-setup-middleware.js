module.exports = (req,res,next)=>{
  res.locals.page = parseInt(req.query.page)
  res.locals.limit = parseInt(req.query.limit)
  res.locals.startIndex = (res.locals.page - 1)*res.locals.limit
  res.locals.endIndex = res.locals.page*res.locals.limit

  console.log("in middleware1: ",res.locals.page, res.locals.limit, res.locals.startIndex, res.locals.endIndex)

  // res.json({
  //   test: "hello from middleware1"
  // })
  next()
}