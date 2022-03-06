const BuyCryptoOrder = require('../models/BuyCryptoOrder')
const SellCryptoOrder = require('../models/SellCryptoOrder')
const ENV = require('../config/base')

module.exports = async (req, res, next) => {
  let model = req.params.target
  let user = req.params.userID
  let page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const crypto = req.query.crypto
  
  const startIndex = (page - 1)*limit
  const endIndex = page*limit
  // console.log("domain: ", ENV.domain)
  // console.log("Analize request", req.headers.referer)
  let userid = req.session.userId

  let find = {}
  if(user){
    find.userid = user
  }
  if(crypto){
    find.crypto = crypto
  }
  console.log("\nFind filter: \n", find, user, typeof user)


  let buyorders = BuyCryptoOrder.find(find).populate('userid')
  let sellorders = SellCryptoOrder.find(find).populate('userid')
  let result = await Promise.all([buyorders, sellorders])

  let mybuyOrders = result[0].filter(element => element.userid._id.toString() === userid)
  let mysellOrders = result[1].filter(element => element.userid._id.toString() === userid)

  let arrayOfarrayMatchesforEachBuy = []
  let arrayOfarrayMatchesforEachSell = []
  //await Promise.all([func1(), func2()]).then(val => {console.log('func1 process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', val[0], '\n', 'func2 process to receive array of matching buys for each sell:\n', 'Value from promise returned: ', val[1], '\n')})
  
  let orders

  switch(model) {
    case 'buyordersdata':
        if(req.headers.referer == ENV.domain + '/matches'){
          await func2().then(val => {console.log('func2 process to receive array of matching buys for each sell:\n', 'Value from promise returned: ', val, '\n')})
          orders = arrayOfarrayMatchesforEachSell
          orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i)
          //console.log(orders)
        } else {
          console.log("Normal Mode!") 
          orders = result[0]
        }
      break
    case 'sellordersdata':
      if(req.headers.referer == ENV.domain + '/matches'){
        await func1().then(val => {console.log('func1 process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', val, '\n')})
        orders = arrayOfarrayMatchesforEachBuy
        // console.log("original\n", orders);
        // console.log("array\n", orders.flat());
        orders = orders.flat().filter((v, i, a) => a.indexOf(v) === i)
      } else {
        console.log("Normal Mode!") 
        orders = result[1]
      }
      break
    default:
      console.log('Target data not identified')
  }


  let descriptive = {
    model: model,
    page: page,
    crypto: crypto,
    limit: limit,
    userid: user,
  }
  console.log("\nDescription: \n", descriptive)
  console.log("Retrieved Orders", orders)


  const number_of_pages = Math.ceil(orders.length/limit)

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
  
  results.results = orders.slice(startIndex, endIndex)
  res.paginatedResults = results

  
  // try {
  //   //Way to do it if it's a fix length database
  //   //results1.results = await BuyCryptoOrder.find({}).populate('userid').limit(limit).skip(startIndex).exec()
  //   results.results = orders.slice(startIndex, endIndex)
  //   //console.log("sliced: ", results.results)

  //   res.paginatedResults = results
  // } catch(e){
  //   res.status(500).json({message: e.message})
  // }

  
  // console.log("Results returned:\n", results)

  next()


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
  
  function findSellMatches(_buy){
    let arrayofSellmatches = []
    let sell = result[1].filter(_sell => userid != _sell.userid._id.toString()) //filter to not deal with myself
    sell.forEach(sellorder => {
      //console.log(_buy.amount, sellorder.maxamount, (parseInt(_buy.amount,10) < sellorder.maxamount))// < sellorder.maxamount)
      if (_buy.crypto === sellorder.crypto && 
      parseInt(_buy.amount,10) > sellorder.minamount && 
      parseInt(_buy.amount,10) < sellorder.maxamount  && 
      _buy.payment === sellorder.payment) {
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

}