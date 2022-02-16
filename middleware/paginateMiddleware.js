const BuyCryptoOrder = require('../models/BuyCryptoOrder')
const SellCryptoOrder = require('../models/SellCryptoOrder')

module.exports = async (req, res, next) => {
  let model = req.params.target
  let user = req.params.userID
  
  let page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const crypto = req.query.crypto
  
  //console.log(model, user, crypto)
  
  const startIndex = (page - 1)*limit
  const endIndex = page*limit
  


  //console.log(typeof req.params.target)
  let orders
  let orders2

  switch(model) {
    case 'buyordersdata':
      if (crypto == '') {
        orders = await BuyCryptoOrder.find({}).populate('userid')
        // console.log(orders)
      } else {
        orders = await BuyCryptoOrder.find({crypto: crypto}).populate('userid')
      }
      break
    case 'sellordersdata':
      if (crypto == '') {
        orders = await SellCryptoOrder.find({}).populate('userid')
      } else {
        orders = await SellCryptoOrder.find({crypto: crypto}).populate('userid')
      }
      //console.log('2')
      break
    case 'buy':
      orders = await BuyCryptoOrder.find({userid: user}).populate('userid')
      //orders = orders2.filter(order => order.userid._id == user)
      //console.log('2')
      break
    case 'sell':
      orders = await SellCryptoOrder.find({userid: user}).populate('userid')
      //orders = orders2.filter(order => order.userid._id == user)
      //console.log('2')
      break
    default:
      console.log('Target data not identified')
  }
    const number_of_pages = Math.ceil(orders.length/limit)
    console.log(number_of_pages)
    let results = {}
    results.number_of_pages = {
      number: number_of_pages
    }
    if(endIndex < orders.length){
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    if(startIndex > 0){
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    
    try {
      //Way to do it if it's a fix length database
      //results1.results = await BuyCryptoOrder.find({}).populate('userid').limit(limit).skip(startIndex).exec()
      results.results = orders.slice(startIndex, endIndex)
      //console.log("sliced: ", results.results)
      res.paginatedResults = results
    } catch(e){
      res.status(500).json({message: e.message})
    }
    
    let descriptive = {
      crypto: crypto,
      user: user,
      page: page,
      limit: limit,
      startIndex: startIndex,
      endIndex: endIndex,
    }
    console.log("\nDescription: \n", descriptive, "\n\nResults returned:\n", results)
    next()

}
