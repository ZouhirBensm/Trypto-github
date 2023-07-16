const sharp = require('sharp');
var { existsSync, mkdirSync } = require('fs');
const fs = require('fs/promises')
const path = require('path')
Cache = require("cache");



c = new Cache(30 * 60 * 1000);    // Create a cache with 30 minutes TTL


const RearrangeClass = require('../../services/additional-js-sorting-after-mongoose-queries/marketplace-orders-ordering-services.src')

const { formOrderFindFilter, formLocalityFindFilter } = require('../../middleware/libs/match-maker-functions')

const { determine_Sharp_toFormatOptions, isObjEmpty, isObjPresent } = require('../../full-stack-libs/utils')

const sorting_algos = require('../../services/additional-js-sorting-after-mongoose-queries/sorting-functions5')


const { MarketOrderSubmissionError } = require('../../custom-errors/custom-errors')

const SellMarketOrderLocation = require('../../models/market-orders-models/SellMarketOrderLocation')

const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder')

const SellMarketOrderImage = require('../../models/market-orders-models/SellMarketOrderImage')

const User = require('../../models/User');





// const { MongoError } = require('../../custom-errors/custom-errors')
// var ObjectId = require('mongodb').ObjectId; 

// const {filterObject} = require('../../middleware/libs/match-maker-functions')

const ENV = require('../../config/base')


const agendaDefineJobFunctions = require('../../full-stack-libs/define-agenda-job-functions/define-aganda-job-functions');






async function instantiateMarketOrderLocationMiddleware(req, res, next) {
  console.log("registering market order...")

  // if (req.body.st === "undefined") req.body.st = undefined
  // if (req.body.neigh === "undefined") req.body.neigh = undefined
  // if (req.body.province_state === "undefined") req.body.province_state = undefined
  // if (req.body.city === "undefined") req.body.city = undefined
  // if (req.body.country === "undefined") req.body.country = undefined


  console.log(req.body, '\n\n', req.files)

  req.body.expireAt = new Date(req.body.expirydate.slice(0, 4), req.body.expirydate.slice(5, 7) - 1, req.body.expirydate.slice(8, 10), req.body.expirytime.slice(0, 2), req.body.expirytime.slice(3, 5))


  let ret_sellmarketorderlocation_instance


  ret_sellmarketorderlocation_instance = new SellMarketOrderLocation({
    geometry: {
      lat: req.body.lat,
      lng: req.body.lng,
    },
    location: {
      address: req.body.address,
      st_number: req.body.st_number,
      st: req.body.st,
      neigh: req.body.neigh,
      province_state: req.body.province_state,
      city: req.body.city,
      country: req.body.country
    },
    expireAt: req.body.expireAt,
  })


  res.locals.ret_sellmarketorderlocation_instance = ret_sellmarketorderlocation_instance

  return next()

  // return res.status(200).json({
  //   message: "ok"
  // })

}



async function instantiateMarketOrderMiddleware(req, res, next) {
  let ret_sellmarketorder_instance

  ret_sellmarketorder_instance = new SellMarketOrder({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    condition: req.body.condition,
    price: req.body.price,
    crypto: req.body.crypto,
    conversion: req.body.onBTCvaluation,
    payment: req.body.payment,
    chain: req.body.chain,
    expireAt: req.body.expireAt,
    expirydate: req.body.expirydate,
    expirytime: req.body.expirytime,
    userid: req.session.userId,
    sellmarketorderlocationID: res.locals.ret_sellmarketorderlocation_instance._id
  })

  // Refer one another
  res.locals.ret_sellmarketorderlocation_instance.sellmarketorderID = ret_sellmarketorder_instance._id
  res.locals.ret_sellmarketorder_instance = ret_sellmarketorder_instance

  return next()
}



async function processImageFilesMiddleware(req, res, next) {

  let directory = `public/img/marketorder-images/${res.locals.ret_sellmarketorder_instance._id}`
  let source_directory = `public/img/temporal-new`

  let images = []

  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }

  for (let i = 0; i < req.files.length; i++) {


    let sharp_returned
    const processing_file = req.files[i];
    var ext = path.extname(processing_file.originalname);

    let toFormat = determine_Sharp_toFormatOptions(processing_file.mimetype, ext, new MarketOrderSubmissionError("Server Error | Please, try again later", "No toFormat object retrieved."))

    let isError = false
    isError = (toFormat instanceof Error);
    isEmpty_toFormat = (toFormat && Object.keys(toFormat).length === 0
      && Object.getPrototypeOf(toFormat) === Object.prototype)


    try {
      // background: { r: 255, g: 255, b: 255, alpha: 0.5 }, withoutEnlargement: true
      sharp_returned = sharp(processing_file.path)
        .resize({ width: 576, fit: 'inside' })
    } catch (e) {
      return next(e)
    }

    if (!isError && !isEmpty_toFormat) {
      try {
        sharp_returned = sharp_returned.toFormat(toFormat.format, toFormat.options)
      } catch (e) {
        return next(e)
      }
    }

    try {
      sharp_returned = await sharp_returned.toFile(`${directory}/${processing_file.filename}`)
    } catch (e) {
      return next(e)
    }




    try {
      await fs.unlink(path.join(source_directory, processing_file.filename));
    } catch (e) {
      let error = new MarketOrderSubmissionError("Server Error | Please, try again later", `Was unable to delete the uploaded file from ${source_directory}. ${e.message}`)
      return next(error)
    }


    images.push({
      name: processing_file.filename,
      format: sharp_returned.format,
      width: sharp_returned.width,
      height: sharp_returned.height,
      size: sharp_returned.size,
    })

  }

  res.locals.images = images
  res.locals.directory = directory

  return next()
}



async function instantiateMarketOrderImagesMiddleware(req, res, next) {

  let ret_sellmarketorderimage_instance

  ret_sellmarketorderimage_instance = new SellMarketOrderImage({
    sellmarketorderID: res.locals.ret_sellmarketorder_instance._id,
    path: res.locals.directory,
    images: res.locals.images,
    expireAt: req.body.expireAt
  })

  res.locals.ret_sellmarketorder_instance.sellmarketorderImageID = ret_sellmarketorderimage_instance._id
  res.locals.ret_sellmarketorderimage_instance = ret_sellmarketorderimage_instance

  return next()
}


async function saveAllMarketOrderMiddleware(req, res, next) {

  let ret_sellmarketorderlocation_save, ret_sellmarketorder_save, ret_sellmarketorderimage_save

  try {
    ret_sellmarketorderlocation_save = await res.locals.ret_sellmarketorderlocation_instance.save()
  } catch (e) {
    let error = new MarketOrderSubmissionError("Server Error | Please, try again later", `Was unable to save ret_sellmarketorderlocation_instance. ${e.message}`)
    return next(error)
  }

  try {
    ret_sellmarketorder_save = await res.locals.ret_sellmarketorder_instance.save()
  } catch (e) {
    let error = new MarketOrderSubmissionError("Server Error | Please, try again later", `Was unable to save ret_sellmarketorder_instance. ${e.message}`)
    return next(error)
  }

  try {
    ret_sellmarketorderimage_save = await res.locals.ret_sellmarketorderimage_instance.save()
  } catch (e) {
    let error = new MarketOrderSubmissionError("Server Error | Please, try again later", `Was unable to save ret_sellmarketorderimage_instance. ${e.message}`)
    return next(error)
  }

  res.locals.ret_sellmarketorder_save = ret_sellmarketorder_save

  return next()

}



async function setupAgendaJobToDeleteOrderImagesOnExpiryMiddleware(req, res, next) {
  const directory = `public/img/marketorder-images/${res.locals.ret_sellmarketorder_save._id}`
  const jobname = `Delete market order images directory: ${directory}`

  agendaDefineJobFunctions.defineDeleteteMarketOrderImagesFolder(jobname, directory)

  await agenda.schedule(req.body.expireAt, jobname);


  return next()
}





// __________________________________________________










async function filterSetupsMiddleware(req, res, next) {
  console.log("\n\nmarketplaceMiddleware: preset1(): \n\n\n\n")

  // 1 => false => regenerate cache and orders
  // 2, 3, 4 => true
  //   yes => true => use cache
  //   no => false => regenerate cache and orders

  if (res.locals.page > 1) {
    const key = "sellOrders"
    if (c.get(key)) {
      // retrieved sellOrders from cache
      res.locals.sellOrders = c.get(key)
      return next()
    }

  }


  // Query string parameters
  let searchEngineTerms = req.query.search
  searchEngineTerms = searchEngineTerms ? JSON.parse(searchEngineTerms) : undefined

  console.log("preset1()->searchEngineTerms: ", searchEngineTerms)

  // baseFilter, and localityFilter are either populated objects or empty {} objects, depending on whether something was sent from the front end
  let baseFilter = formOrderFindFilter(searchEngineTerms)

  console.log("\n\n\preset1()->baseFilter: ", baseFilter)
  res.locals.baseFilter = baseFilter

  let localityFilter = formLocalityFindFilter(searchEngineTerms)

  console.log("\n\n\preset1()->localityFilter: ", localityFilter)
  res.locals.localityFilter = localityFilter


  return next()
}










// Better name: determineRearrangeDataBasedOffUserRegisteredLocality
async function determineRearrangeDataOrNotMiddleware(req, res, next) {


  if (res.locals.sellOrders) {
    return next()
  }


  // Default
  let option = 1


  // Default is option 1, now, if there is no locality filter, and logged in user disposes of a locality, then go for option 2
  if (isObjEmpty(res.locals.localityFilter)) {

    let ret_user
    try {
      ret_user = await User.findById(req.session.userId)
        .populate({
          // Populate protagonists
          path: "userassociatedlocalityID",
          // Fields allowed to populate with
          select: "location -_id",
        })
    } catch (error) {
      console.error(error)
    }

    // console.log(ret_user)

    // option 2: No Locality filter, and user disposes of a locality
    if (!!ret_user?.userassociatedlocalityID?.location) {
      option = 2
      res.locals.ret_user = ret_user
    }
  }


  res.locals.option = option

  return next()
}



async function queryAndOrganizeDataMiddleware(req, res, next) {


  if (res.locals.sellOrders) {
    return next()
  }


  // user Location not there
  let sellOrders

  // By default option 1 retrieves and queries with the localityFilter if present
  // console.log(res.locals.ret_user?.userassociatedlocalityID.location)
  try {
    // Descending: from newest to oldest
    sellOrders = await SellMarketOrder
      .find(res.locals.baseFilter).sort({ postedDate: -1 })
      .populate({
        path: 'userid',
        select: "-password",
      })
      .populate({
        path: "sellmarketorderImageID",
        // Fields allowed to populate with
        select: "images.name -_id",
      })
      .populate({
        path: "sellmarketorderlocationID",
        match: res.locals.localityFilter,
        // Fields allowed to populate with
        select: "location.country location.province_state location.city  location.neigh location.st -_id",
      })


    // TODO !!! use this query when referer is home page
    // QUERY WHEN DATA NEEDED FOR HOME PAGE
    // sellOrders = await SellMarketOrder.find().sort({ postedDate: -1 })
    //   .select("title description price conversion chain postedDate sellmarketorderImageID")
    //   .populate({
    //     path: "sellmarketorderImageID",
    //     select: "images.name -_id",
    //   })

  } catch (e) {
    return next(e)
  }

  // Making the localityFilter act as the baseFilter in scenario where the localityFilter is present
  // If locality filter in place
  // Rid of the sell orders without populated locality 
  // Because when their is no match the sellmarketorderlocationID is set to null
  if (!isObjEmpty(res.locals.localityFilter)) {
    sellOrders = sellOrders.filter(sellOrder => !!sellOrder.sellmarketorderlocationID)
  }

  // If your are going to implement the priviledge BASIC user have, then keep this line of code. It works in conjuction with services/additional-js-sorting-after-mongoose-queries/sorting-functions5.js
  // Now if you do not require priviledge for BASIC users, then use sorting-functions4.js
  if (res.locals.option == 1) {
    sellOrders = sorting_algos.SORT_BASIC(sellOrders)
  }

  // At this point the orders are arranged from recent to oldest, by possibly a search baseFilter, by no localityFilter, and the user has a registered locality
  if (res.locals.option == 2) {
    let reaarranger_instance = new RearrangeClass(sellOrders)
    // Arrange all orders based off loged in user location 
    reaarranger_instance.LocalityArranger = res.locals.ret_user?.userassociatedlocalityID.location
    // Retrieve the rearranged set
    sellOrders = reaarranger_instance.getArrangedSellOrders
  }





  res.locals.sellOrders = sellOrders

  const key = "sellOrders"

  // if we do not have a cache, put new value
  c.del(key)
  c.put(key, res.locals.sellOrders);

  return next()
}










async function ordersRetrievalMiddleware(req, res, next) {
  console.log("\n\nmarketplaceMiddleware: ordersRetrievalMiddleware(): \n\n\n\n")

  let orders

  let mysellOrders = res.locals.sellOrders.filter((order_entry) => {
    console.log(order_entry.userid._id.toString() == res.locals.path_param_userID)
    return order_entry.userid._id.toString() == res.locals.path_param_userID
  })

  // console.log('\n\n--->\nres.locals.URL_fromReferer: ', res.locals.URL_fromReferer)
  // console.log(`\n\n${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/`)

  if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/marketplace/allmyorders`
    ||
    res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/operations/help-for-market-orders/${res.locals.path_param_userID}`

  ) {

    console.log("MY MODE -> from path param")
    orders = mysellOrders

  } else if (res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/marketplace/sellordersdata`
    ||
    res.locals.URL_fromReferer == `${res.locals.parsed_URL_fromReferer[1]}://${ENV.domain_without_protocol}/`
  ) {

    console.log("NORMAL MODE")
    orders = res.locals.sellOrders

  } else {
    const e = new Error("The path URL not identified to enable to return proper orders")
    return next(e)
  }


  // console.log("\n\n\n\nORDERS!!\n\n", orders)

  res.locals.data_to_be_paginated_and_served = orders
  return next()

}








marketplaceMiddleware = {
  ordersRetrievalMiddleware: ordersRetrievalMiddleware,
  instantiateMarketOrderLocationMiddleware: instantiateMarketOrderLocationMiddleware,
  instantiateMarketOrderMiddleware: instantiateMarketOrderMiddleware,
  processImageFilesMiddleware: processImageFilesMiddleware,
  instantiateMarketOrderImagesMiddleware: instantiateMarketOrderImagesMiddleware,
  saveAllMarketOrderMiddleware: saveAllMarketOrderMiddleware,
  setupAgendaJobToDeleteOrderImagesOnExpiryMiddleware: setupAgendaJobToDeleteOrderImagesOnExpiryMiddleware,
  filterSetupsMiddleware: filterSetupsMiddleware,
  determineRearrangeDataOrNotMiddleware: determineRearrangeDataOrNotMiddleware,
  queryAndOrganizeDataMiddleware: queryAndOrganizeDataMiddleware,
}


module.exports = marketplaceMiddleware