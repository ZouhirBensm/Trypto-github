const BuyCryptoOrder = require('../models/BuyCryptoOrder')
const SellCryptoOrder = require('../models/SellCryptoOrder')

module.exports = async (req, res, next) => {
  let model = req.params.target
  console.log(model)
  let page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const crypto = req.query.crypto

  
  const startIndex = (page - 1)*limit
  const endIndex = page*limit
  


  //console.log(typeof req.params.target)
  let orders
  switch(model) {
    case 'buyordersdata':
      if (crypto == '') {
        orders = await BuyCryptoOrder.find({}).populate('userid')
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
    default:
      console.log('Target data not identified')
    }

    //console.log(orders)
    let results = {}
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
      res.paginatedResults = results
    } catch(e){
      res.status(500).json({message: e.message})
    }
    
    let descriptive = {
      crypto: crypto,
      page: page,
      limit: limit,
      startIndex: startIndex,
      endIndex: endIndex,
    }
    console.log("\nDescription: \n", descriptive, "\n\nResults returned:\n", results)
    next()
    // results1.results = buycryptoorders.slice(startIndex,endIndex)
    // res.paginatedResults = results1
    // next()
}