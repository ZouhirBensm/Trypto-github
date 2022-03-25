const PostsAmountsTimeframe = require('../../models/home-orders-models/PostAmountsTimeframe')

module.exports = async (req, res, next) => {

  // Load from saved amount of posts per time frame in Session Object
  // req.session.posts_amounts_timeframe

  // Starting with Express 5, route handlers and middleware that return a Promise will call next(value) automatically when they reject or throw an error. For example If find throws an error or rejects, next will be called with either the thrown error or the rejected value. If no rejected value is provided, next will be called with a default Error object provided by the Express router.
  let data = await PostsAmountsTimeframe.find({userid: req.session.userId})
  
  console.log("DATA: ", data)

  if (data[0]) {
    // console.log(typeof data[0].posts_amounts_timeframe)
    req.session.posts_amounts_timeframe = data[0].posts_amounts_timeframe
  } else {
    req.session.posts_amounts_timeframe = 0
  }
  // console.log("check: ", req.body.iterator, req.session.posts_amounts_timeframe)

  if(req.body.iterator == 0 && req.session.posts_amounts_timeframe == 0){
    req.session.posts_amounts_timeframe = req.body.iterator
  }

  req.session.posts_amounts_timeframe++

  var date_now = new Date()
  // Add 12 Hours
  // date_now.setMinutes(date_now.getMinutes()+2);
  date_now.setHours(date_now.getHours()+12);
  // variable used to define when to reset the post allowed counter
  var date_reset_posts_count = new Date(date_now)
  

  console.log("(3) on server: ", req.session.posts_amounts_timeframe)
  // Save session data in database PostsAmountsTimeframe
  if(req.session.posts_amounts_timeframe === 1){
    console.log("create")
    PostsAmountsTimeframe.create({
      userid: req.session.userId,
      posts_amounts_timeframe: req.session.posts_amounts_timeframe,
      expireAt: date_reset_posts_count
    }, (error, postsamountstimeframe) => {
      if(error) {console.log(error)}
    })
  } else {
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
    PostsAmountsTimeframe.findOneAndUpdate( {
      userid: req.session.userId,
    }, {
      posts_amounts_timeframe: req.session.posts_amounts_timeframe,
    }, options, (error, postsamountstimeframe) => {
      if (error) {console.log(error)}      
    })
  }
  
  next()

}
