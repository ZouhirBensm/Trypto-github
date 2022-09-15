module.exports = (req,res, next) => {

  let excerpt
  let split_content = req.body.content.split(" ")
  // console.log(split_content)
  let split_excerpt = split_content.slice(0, 10)
  // console.log(split_excerpt)
  excerpt = split_excerpt.join(" ")
  // console.log(excerpt)

  req.body.excerpt = excerpt

  next()
}