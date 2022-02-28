const PostsAmountsTimeframe = require('../models/PostAmountsTimeframe')

module.exports = async (req, res, next) => {

  // Load from saved amount of posts per time frame in Session Object
  // req.session.posts_amounts_timeframe

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
  if(req.session.posts_amounts_timeframe === 1){
    PostsAmountsTimeframe.create({
      userid: req.session.userId,
      posts_amounts_timeframe: req.session.posts_amounts_timeframe,
      expireAt: date_reset_posts_count
    }, (error, postsamountstimeframe) => {
      console.log(error)
    })
  console.log("create")
  } else {
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
    // Save session data in database PostsAmountsTimeframe
    PostsAmountsTimeframe.findOneAndUpdate( {
      userid: req.session.userId,
    }, {
      posts_amounts_timeframe: req.session.posts_amounts_timeframe,
    }, options, (error, postsamountstimeframe) => {
        if (error) {
          console.log(error)
        }      
    })
  }
  
  next()

}
