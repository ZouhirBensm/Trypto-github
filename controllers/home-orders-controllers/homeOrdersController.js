const BuyCryptoOrder = require('../../models/home-orders-models/BuyCryptoOrder')
const SellCryptoOrder = require('../../models/home-orders-models/SellCryptoOrder')
const ENV = require('../../config/base')

module.exports = {
  paginateController: async (req, res, next) => {

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
    // console.log("\nFind filter: \n", find, user, typeof user)
  
  
    let buyorders = BuyCryptoOrder.find(find).populate('userid')
    let sellorders = SellCryptoOrder.find(find).populate('userid')
    let result = await Promise.all([buyorders, sellorders])
  
    let mybuyOrders = result[0].filter(element => element.userid._id.toString() === userid)
    let mysellOrders = result[1].filter(element => element.userid._id.toString() === userid)
  
    let arrayOfarrayMatchesforEachBuy = []
    let arrayOfarrayMatchesforEachSell = []
    //await Promise.all([func1(), func2()]).then(val => {console.log('func1 process to receive array of matching sells for each buy:\n', 'Value from promise returned: ', val[0], '\n', 'func2 process to receive array of matching buys for each sell:\n', 'Value from promise returned: ', val[1], '\n')})
    
    let orders
  
    console.log(req.headers.referer)
    switch(model) {
      case 'buyordersdata':
          if(req.headers.referer == ENV.domain + '/databases/matches'){
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
        if(req.headers.referer == ENV.domain + '/databases/matches'){
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
    // console.log("\nDescription: \n", descriptive)
    // console.log("Retrieved Orders", orders)
  
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
  
    res.json({
      data: res.paginatedResults,
    })
  
  
    // Functions
    async function func1() {
      mybuyOrders.forEach(buy => {
        let arrayofSellmatches = findSellMatches(buy)
        arrayOfarrayMatchesforEachBuy.push(arrayofSellmatches)
      });
      return 'funct1 is done searching' //value of promise //You can return the actual array if you want
    } 
    async function func2() {
      mysellOrders.forEach(sell => {
        let arrayofBuymatches = findBuyMatches(sell)
        arrayOfarrayMatchesforEachSell.push(arrayofBuymatches)
      });
      return 'funct2 is done searching' //value of promise //You can return the actual array if you want
    }
    
    function findSellMatches(_buy){
      let arrayofSellmatches = []
      let sell = result[1].filter(_sell => userid != _sell.userid._id.toString()) //filter to not deal with current logged in user
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
      let buy = result[0].filter(_buy => userid != _buy.userid._id.toString()) //filter to not deal with current logged in user
      buy.forEach(buyorder => {
        if (_sell.crypto === buyorder.crypto && parseInt(_sell.minamount,10) < buyorder.amount && parseInt(_sell.maxamount,10) > buyorder.amount  && _sell.payment === buyorder.payment) {
          arrayofBuymatches.push(buyorder)
        }
      });
      return arrayofBuymatches
    }
  
  },
  updateOrderController: (req,res)=>{

    console.log(req.body)
    
    console.log('Current User: ' + req.session.userId + ' and Order asked to update: ' + req.body.OrderID + ' order to update type: ' + req.body.OrderType)
    
    if(req.body.OrderType === 'buyordersdata'){
      BuyCryptoOrder.findByIdAndUpdate(req.body.OrderID, {
        crypto: req.body.NewCrypto,
        amount: req.body.NewAmount,
        price: req.body.NewPrice,
        expirydate: req.body.NewExpiryDate,
        expirytime: req.body.NewExpiryTime,
        payment: req.body.NewPayment,
        }, (error, blogspot) => { 
        console.log("Update Callback: ", error, blogspot) 
      })
    } else if (req.body.OrderType === 'sellordersdata'){
      SellCryptoOrder.findByIdAndUpdate(req.body.OrderID, {
        crypto: req.body.NewCrypto,
        minamount: req.body.NewMinAmount,
        maxamount: req.body.NewMaxAmount,
        price: req.body.NewPrice,
        expirydate: req.body.NewExpiryDate,
        expirytime: req.body.NewExpiryTime,
        payment: req.body.NewPayment,
        }, (error, blogspot) => { 
        console.log("Update Callback: ", error, blogspot) 
      })
    }
  
    res.redirect('/databases/AllMyOrders') 
  
  },
  deleteOrderController: (req,res)=>{
    // console.log("req body on /deleteThisOrder: ", req.body) 
    var id = req.body.OrderID
  
    if (req.body.OrderType === 'buyordersdata') {
      //console.log('Order type is a buy type')
      BuyCryptoOrder.findByIdAndDelete(req.body.OrderID, (error, buyorder) =>{ 
        console.log("Error: ", error)
      })
      res.json({
        memorized_order_type: req.body.OrderType
      })
    } else if (req.body.OrderType === 'sellordersdata') {
      //console.log('Order type is a sell type')
      SellCryptoOrder.findByIdAndDelete(id, (error, sellorder) =>{ 
        console.log("Error: ", error)
      })
      res.json({
        memorized_order_type: req.body.OrderType
      })
    }
  },
  registerOrder:  (req,res)=>{
    console.log(req.params.target)
    // console.log(req.session)
    req.body.expireAt = new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))
    //console.log(new Date(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5)))
    // console.log(req.body.expirydate.slice(0,4), req.body.expirydate.slice(5,7)-1, req.body.expirydate.slice(8,10), req.body.expirytime.slice(0,2), req.body.expirytime.slice(3,5))
    
    //console.log('typeof: ', typeof req.body.expireAt + '\n','req.body.expireAt: '+ req.body.expireAt+ '\n','Current Date: '+ new Date()+ '\n')
    //console.log(new Date('July 22, 2013 14:00:00'))
  
    let TypeCryptoOrder = undefined
    switch (req.params.target) {
      case "buyorders":
        TypeCryptoOrder = BuyCryptoOrder
        break;
      case "sellorders":
        TypeCryptoOrder = SellCryptoOrder
        break;
      default:
        console.log(`Database to call upon is ${TypeCryptoOrder}`)
        break;
    }
  
    console.log("WAZAAAA", req.session.posts_amounts_timeframe)
    if(req.body.expireAt > new Date() && req.session.posts_amounts_timeframe < 20){
      // 19 orders per timeframe allowed
      TypeCryptoOrder.create({
        crypto: req.body.crypto,
        [req.body.amount ? "amount": null]: req.body.amount,
        [req.body.minamount ? "maxamount": null]: req.body.maxamount,
        [req.body.minamount ? "minamount": null]: req.body.minamount,
        price: req.body.price,
        expirydate: req.body.expirydate,
        expirytime: req.body.expirytime,
        payment: req.body.payment,
        userid: req.session.userId,
        expireAt: req.body.expireAt
      }, (error, typecryptoorder) => {
          res.json({
            iterator: req.session.posts_amounts_timeframe,
            message: `${/[^o]*/.exec(req.params.target)[0].charAt(0).toUpperCase() + /[^o]*/.exec(req.params.target)[0].slice(1)} post successfully saved in database`,
          })
      })
    } else {
      res.json({
        iterator: req.session.posts_amounts_timeframe,
        message: "You have reached your posting limit",
      })
    }
  }
}