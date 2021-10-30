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
  
  
  //let data = await Promise.all([result[0], result[1]])
  //console.log(result[0][0].userid.toString())
  //console.log("user added with result: ", result[0]) //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  
  //console.log("my Shit: ", mybuyOrders, mysellOrders) 

    
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
  
  
  
  // let buyorders = await BuyCryptoOrder.find({}).then(value => {return value})
  // let sellorders = await SellCryptoOrder.find({}).then(value => {return value})
  //console.log('All buy: \n', result[0])
  
  //console.log('All my buy: \n', mybuyOrders)
  //console.log('Array of Array of each buy order sell matches: \n', arrayOfarrayMatchesforEachBuy)
  //console.log('All my sell:\n', mysellOrders)
  //console.log('Array of Array of each sell order buy matches: \n', arrayOfarrayMatchesforEachSell)
  
  //console.log('Boom')
  //console.log('All sell: \n', result[1])
  //console.log('UserID current session: \n', userid)
  //console.log('Sell orders that match: \n', userid)
  //res.render('matches')
  
  // try {
  //   return res.json({
  //     bm: arrayOfarrayMatchesforEachBuy,
  //     sm: arrayOfarrayMatchesforEachSell
  //   })
  // } catch(e) {
  //   console.log(`Call to res.json() in /api/matches on server.js not working: Error: ${e}`)
  // }

  //next()

  //console.log(typeof req.params.target)
  // let orders
  // let orders2

  // switch(model) {
  //   case 'buyordersdata':
  //     if (crypto == '') {
  //       orders = await BuyCryptoOrder.find({}).populate('userid')
  //     } else {
  //       orders = await BuyCryptoOrder.find({crypto: crypto}).populate('userid')
  //     }
  //     break
  //   case 'sellordersdata':
  //     if (crypto == '') {
  //       orders = await SellCryptoOrder.find({}).populate('userid')
  //     } else {
  //       orders = await SellCryptoOrder.find({crypto: crypto}).populate('userid')
  //     }
  //     //console.log('2')
  //     break
  //   case 'buy':
  //     orders = await BuyCryptoOrder.find({userid: user}).populate('userid')
  //     //orders = orders2.filter(order => order.userid._id == user)
  //     //console.log('2')
  //     break
  //   case 'sell':
  //     orders = await SellCryptoOrder.find({userid: user}).populate('userid')
  //     //orders = orders2.filter(order => order.userid._id == user)
  //     //console.log('2')
  //     break
  //   default:
  //     console.log('Target data not identified')
  //   }

  //   //console.log(orders)
  //   let results = {}
  //   if(endIndex < orders.length){
  //     results.next = {
  //       page: page + 1,
  //       limit: limit
  //     }
  //   }
  //   if(startIndex > 0){
  //     results.previous = {
  //       page: page - 1,
  //       limit: limit
  //     }
  //   }
    
  //   try {
  //     //Way to do it if it's a fix length database
  //     //results1.results = await BuyCryptoOrder.find({}).populate('userid').limit(limit).skip(startIndex).exec()
  //     results.results = orders.slice(startIndex, endIndex)
  //     res.paginatedResults = results
  //   } catch(e){
  //     res.status(500).json({message: e.message})
  //   }
    
  //   let descriptive = {
  //     crypto: crypto,
  //     user: user,
  //     page: page,
  //     limit: limit,
  //     startIndex: startIndex,
  //     endIndex: endIndex,
  //   }
  //   console.log("\nDescription: \n", descriptive, "\n\nResults returned:\n", "results")
  //   next()

}







// (async function(){

//   //console.log("_________________________________________________")
//   let buyorders = BuyCryptoOrder.find({}).populate('userid')  //@@@@@@@@@@@@@@@@@@@@@@@@@@@
//   let sellorders = SellCryptoOrder.find({}).populate('userid')
//   let userid = req.session.userId
  
//   function findSellMatches(_buy){
//     let arrayofSellmatches = []
//     let sell = result[1].filter(_sell => userid != _sell.userid._id.toString()) //filter to not deal with myself
//     sell.forEach(sellorder => {
//       //console.log(_buy.amount, sellorder.maxamount, (parseInt(_buy.amount,10) < sellorder.maxamount))// < sellorder.maxamount)
//       if (_buy.crypto === sellorder.crypto && parseInt(_buy.amount,10) > sellorder.minamount && parseInt(_buy.amount,10) < sellorder.maxamount  && _buy.payment === sellorder.payment) {
//         arrayofSellmatches.push(sellorder)
//       }
//     });
//     return arrayofSellmatches
//   }
//   function findBuyMatches(_sell){
//     let arrayofBuymatches = []
//     let buy = result[0].filter(_buy => userid != _buy.userid._id.toString()) //filter to not deal with myself
//     buy.forEach(buyorder => {
//       //console.log(_buy.amount, sellorder.maxamount, (parseInt(_buy.amount,10) < sellorder.maxamount))// < sellorder.maxamount)
//       if (_sell.crypto === buyorder.crypto && parseInt(_sell.minamount,10) < buyorder.amount && parseInt(_sell.maxamount,10) > buyorder.amount  && _sell.payment === buyorder.payment) {
//         arrayofBuymatches.push(buyorder)
//       }
//     });
//     return arrayofBuymatches
//   }
  
//   let result = await Promise.all([buyorders, sellorders])
//   //let data = await Promise.all([result[0], result[1]])
//   //console.log(result[0][0].userid.toString())
//   console.log("user added with result: ", result[0]) //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//   let mybuyOrders = result[0].filter(element => element.userid._id.toString() === userid)
//   let mysellOrders = result[1].filter(element => element.userid._id.toString() === userid)
  
//   console.log("my Shit: ", mybuyOrders, mysellOrders) 
//   let arrayOfarrayMatchesforEachBuy = []
//   let arrayOfarrayMatchesforEachSell = []
  
//   async function func1() {
//     mybuyOrders.forEach(buy => {
//       let arrayofSellmatches = findSellMatches(buy)
//       arrayOfarrayMatchesforEachBuy.push(arrayofSellmatches)
//     });
//     return 'funct1 is done searching' //value of promise //You can return the actual array of you want
//   } 
//   async function func2() {
//     mysellOrders.forEach(sell => {
//       let arrayofBuymatches = findBuyMatches(sell)
//       arrayOfarrayMatchesforEachSell.push(arrayofBuymatches)
//     });
//     return 'funct2 is done searching' //value of promise //You can return the actual array of you want
//   }
//   await Promise.all([func1(), func2()]).then(val => {console.log('func1 process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', val[0], '\n', 'func2 process to receive array of matching buys for each sell:\n', 'Value from promise returned: ', val[1], '\n')})
  
  
//   // let buyorders = await BuyCryptoOrder.find({}).then(value => {return value})
//   // let sellorders = await SellCryptoOrder.find({}).then(value => {return value})
//   //console.log('All buy: \n', result[0])
  
//   console.log('All my buy: \n', mybuyOrders)
//   console.log('Array of Array of each buy order sell matches: \n', arrayOfarrayMatchesforEachBuy)
//   console.log('All my sell:\n', mysellOrders)
//   console.log('Array of Array of each sell order buy matches: \n', arrayOfarrayMatchesforEachSell)

//   //console.log('Boom')
//   //console.log('All sell: \n', result[1])
//   //console.log('UserID current session: \n', userid)
//   //console.log('Sell orders that match: \n', userid)
//   //res.render('matches')
  
//   try {
//     return res.json({
//       bm: arrayOfarrayMatchesforEachBuy,
//       sm: arrayOfarrayMatchesforEachSell
//     })
//   } catch(e) {
//     console.log(`Call to res.json() in /api/matches on server.js not working: Error: ${e}`)
//   }
// })()