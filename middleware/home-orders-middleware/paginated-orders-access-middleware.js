module.exports = (req,res,next)=>{
  if(req.session.userId){
    next()
  } else {
    // If not logged in always be return empty data
    let results = {
      number_of_pages: {
          number: 0,
      },
      results: [],
    }

    res.json({
      data: results,
    })

  }
}