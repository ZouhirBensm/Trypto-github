const BuyCryptoOrder = require('../models/BuyCryptoOrder')
const SellCryptoOrder = require('../models/SellCryptoOrder')

module.exports = async (req, res, next) => {
  let model = req.params.target
  
  let page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  
  
  console.log(model, limit)
  
  const startIndex = (page - 1)*limit
  const endIndex = page*limit

  let userid = req.session.userId
  let buyorders = BuyCryptoOrder.find({}).populate('userid')
  let sellorders = SellCryptoOrder.find({}).populate('userid')
  let result = await Promise.all([buyorders, sellorders])

  let mybuyOrders = result[0].filter(element => element.userid._id.toString() === userid)
  let mysellOrders = result[1].filter(element => element.userid._id.toString() === userid)

  let arrayOfarrayMatchesforEachBuy = []
  let arrayOfarrayMatchesforEachSell = []

  //await Promise.all([func1(), func2()]).then(val => {console.log('func1 process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', val[0], '\n', 'func2 process to receive array of matching buys for each sell:\n', 'Value from promise returned: ', val[1], '\n')})
  let orders

  switch(model) {
    case 'buy-matches':
        await func1().then(val => {console.log('func1 process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', val, '\n')})
        orders = arrayOfarrayMatchesforEachBuy
        // console.log("original\n", orders);
        // console.log(orders)
        // console.log("array\n", orders.flat());
        orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i)
        //console.log("unique\n", unique);

      break
    case 'sell-matches':
        await func2().then(val => {console.log('func2 process to receive array of matching buys for each sell:\n', 'Value from promise returned: ', val, '\n')})
        orders = arrayOfarrayMatchesforEachSell
        orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i)
        //console.log(orders)
      break
    default:
      console.log('Target data not identified')
  }
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
    console.log("sliced: ", results.results)
    res.paginatedResults = results
  } catch(e){
    res.status(500).json({message: e.message})
  }

  next()
  //console.log("_________________________________________________")

  
  
  function findSellMatches(_buy){
    let arrayofSellmatches = []
    let sell = result[1].filter(_sell => userid != _sell.userid._id.toString()) //filter to not deal with myself
    sell.forEach(sellorder => {
      //console.log(_buy.amount, sellorder.maxamount, (parseInt(_buy.amount,10) < sellorder.maxamount))// < sellorder.maxamount)
      if (_buy.crypto === sellorder.crypto && parseInt(_buy.amount,10) > sellorder.minamount && parseInt(_buy.amount,10) < sellorder.maxamount  && _buy.payment === sellorder.payment) {
        arrayofSellmatches.push(sellorder)
      }
    });
    return arrayofSellmatches
  }
  function findBuyMatches(_sell){
    let arrayofBuymatches = []
    let buy = result[0].filter(_buy => userid != _buy.userid._id.toString()) //filter to not deal with myself
    buy.forEach(buyorder => {
      //console.log(_buy.amount, sellorder.maxamount, (parseInt(_buy.amount,10) < sellorder.maxamount))// < sellorder.maxamount)
      if (_sell.crypto === buyorder.crypto && parseInt(_sell.minamount,10) < buyorder.amount && parseInt(_sell.maxamount,10) > buyorder.amount  && _sell.payment === buyorder.payment) {
        arrayofBuymatches.push(buyorder)
      }
    });
    return arrayofBuymatches
  }
  
  async function func1() {
    mybuyOrders.forEach(buy => {
      let arrayofSellmatches = findSellMatches(buy)
      arrayOfarrayMatchesforEachBuy.push(arrayofSellmatches)
    });
    return 'funct1 is done searching' //value of promise //You can return the actual array of you want
  } 
  async function func2() {
    mysellOrders.forEach(sell => {
      let arrayofBuymatches = findBuyMatches(sell)
      arrayOfarrayMatchesforEachSell.push(arrayofBuymatches)
    });
    return 'funct2 is done searching' //value of promise //You can return the actual array of you want
  }

}