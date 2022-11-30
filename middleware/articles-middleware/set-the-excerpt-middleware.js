module.exports = (req,res, next) => {
  console.log(req.body)
  console.log(req.file)
  // let excerpt
  // let split_content = req.body.content.split(" ")
  // let split_excerpt = split_content.slice(0, 10)
  // excerpt = split_excerpt.join(" ")

  // req.body.excerpt = excerpt

  return next()
}