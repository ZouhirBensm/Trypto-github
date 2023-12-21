// When required for the first time runs the entire script, then subsequent times only retrieces the Model
const ENV = require('../../config/base')
const { MongoClient } = require('mongodb');
const uri = ENV.database_link;
const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const fs = require('fs')

const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder')
const SellMarketOrderLocation = require('../../models/market-orders-models/SellMarketOrderLocation')
const SellMarketOrderImage = require('../../models/market-orders-models/SellMarketOrderImage')


const { MongoError } = require('../../custom-errors/custom-errors')
const { ValidationError } = require('../../custom-errors/custom-errors')

const httpStatus = require("http-status-codes")


var ObjectId = require('mongodb').ObjectId;

const agendaDefineJobFunctions = require('../../full-stack-libs/define-agenda-job-functions/define-aganda-job-functions')



async function seeDataRes(req, res, next) {
  console.log('____________________________\n\n', req.body)
  // res.status(200).end()
  return next()
}

async function updateOrder1Controller(req, res, next) {

  // console.log("EditBaseOrderInformation_data----->>>>", req.body.EditBaseOrderInformation_data)

  req.body.EditBaseOrderInformation_data.expireAt = new Date(req.body.EditBaseOrderInformation_data.expirydate.slice(0, 4), req.body.EditBaseOrderInformation_data.expirydate.slice(5, 7) - 1, req.body.EditBaseOrderInformation_data.expirydate.slice(8, 10), req.body.EditBaseOrderInformation_data.expirytime.slice(0, 2), req.body.EditBaseOrderInformation_data.expirytime.slice(3, 5))

  let updatedMarketOrder_ifAny

  let newsubcategory = !!req.body.EditBaseOrderInformation_data2.newsubcategory? req.body.EditBaseOrderInformation_data2.newsubcategory: undefined

  let newcondition = !!req.body.EditBaseOrderInformation_data2.newcondition? parseInt(req.body.EditBaseOrderInformation_data2.newcondition): undefined


  console.log({
    newsubcategory,
    newcondition
  })


  let update = { $set: {
    title: req.body.EditBaseOrderInformation_data.newtitle,
    description: req.body.EditBaseOrderInformation_data.newdescription,
    category: req.body.EditBaseOrderInformation_data.newcategory,
    expirydate: req.body.EditBaseOrderInformation_data.expirydate,
    expirytime: req.body.EditBaseOrderInformation_data.expirytime,
    expireAt: req.body.EditBaseOrderInformation_data.expireAt,
  }};
  
  if (newsubcategory !== undefined) {
    update.$set.subcategory = newsubcategory;
  } else {
    update.$unset = { subcategory: '' };
  }
  
  if (newcondition !== undefined) {
    update.$set.condition = newcondition;
  } else {
    update.$unset = { ...update.$unset, condition: '' };
  }

  console.log(update)
  
  try {
    updatedMarketOrder_ifAny = await SellMarketOrder.findByIdAndUpdate(
      req.body.EditBaseOrderInformation_data.orderID, 
      update, 
      { upsert: false, new: true }
    );
  } catch (e) {
    let error = new MongoError(e.message)
    return next(error)
  }
  


  console.log("\n\n\n%%%%%\nupdatedMarketOrder_ifAny\n", updatedMarketOrder_ifAny)

  // console.log("\n\nDo I have the ingredients: ", updatedMarketOrder_ifAny.sellmarketorderlocationID, updatedMarketOrder_ifAny.expireAt, "\n\n")

  let updatedMarketOrderLocation_ifAny
  try {
    // TODO optimization, check whether the expiry changed, then go a findByIdAndUpdate else don't. This feature might be built in the findByIdAndUpdate itself
    updatedMarketOrderLocation_ifAny = await SellMarketOrderLocation.findByIdAndUpdate(updatedMarketOrder_ifAny.sellmarketorderlocationID, { $set: { 
      expireAt: updatedMarketOrder_ifAny.expireAt // or req.body.EditBaseOrderInformation_data.expireAt
    } }, { upsert: false, new: true });
  } catch (e) {
    let error = new MongoError(e.message)
    return next(error)
  }


  let updatedMarketOrderImage_ifAny
  try {
    // TODO optimization, check whether the expiry changed, then go a findByIdAndUpdate else don't. This feature might be built in the findByIdAndUpdate itself
    updatedMarketOrderImage_ifAny = await SellMarketOrderImage.findByIdAndUpdate(updatedMarketOrder_ifAny.sellmarketorderImageID, { $set: { 
      expireAt: updatedMarketOrder_ifAny.expireAt // or req.body.EditBaseOrderInformation_data.expireAt
    } }, { upsert: false, new: true });
  } catch (e) {
    let error = new MongoError(e.message)
    return next(error)
  }

  const directory = `public/img/marketorder-images/${updatedMarketOrder_ifAny._id}`
  const jobname = `Delete market order images directory: ${directory}`


  const numRemoved = await agenda.cancel({ name: jobname });

  agendaDefineJobFunctions.defineDeleteteMarketOrderImagesFolder(jobname, directory)

  await agenda.schedule(updatedMarketOrder_ifAny.expireAt, jobname);


  if (updatedMarketOrder_ifAny && updatedMarketOrderLocation_ifAny) {
    res.status(200).json({
      srv_: "Successfully updated"
    })
  }
}



async function updateOrder23Controller(req, res, next) {

  // console.log("EditBaseOrderInformation_data----->>>>", req.body.EditBaseOrderInformation_data)


  let newUpdatedDateObject, orderID;
  ({orderID, ...newUpdatedDateObject} = req.body.EditBaseOrderInformation_data)

  // console.log("newUpdatedDateObject---->>>", newUpdatedDateObject, "orderID:---->", orderID)



  let updatedMarketOrder_ifAny

  try {
    updatedMarketOrder_ifAny = await SellMarketOrder.findByIdAndUpdate(req.body.EditBaseOrderInformation_data.orderID, { $set: newUpdatedDateObject }, { upsert: false, new: true });
  } catch (e) {
    let error = new MongoError(e.message)
    return next(error)
  }

  if (updatedMarketOrder_ifAny) {
    res.status(200).json({
      srv_: "Successfully updated"
    })
  }
}











// TODO !!!! Make sure on manual deletion of a market order purge the agenda jobs tasked with deleting the folders and files of the images 
// i.e. other solution if does not work  make a query from the deletion to a /purge/:agendaID endpoint that needs to be created?
// TODO !!!! Make sure on auto deletion of the market order also deletes the agenda jobs tasked with deleting the folders


// TODO !!!! Have the purge endpoint as a operations button on the master dashboard


async function deleteMarketOrderImages(req, res, next) {
  
  const directory = `public/img/marketorder-images/${req.body.market_orderID}`
  const jobname = `Delete market order images directory: ${directory}`

  try {
    fs.rmSync(directory, { recursive: true, force: true });
  } catch (e) {
    let error = new Error(`Was unable to delete the images associated with market order ID: ${req.body.market_orderID}`)
    return next(error)
  }

    
  const numRemoved = await agenda.cancel({ name: jobname });

  return next()
  
}


async function deleteOrderController(req, res, next) {

  let market_Order_deletetionReturn
  try {
    market_Order_deletetionReturn = await SellMarketOrder.findByIdAndDelete(req.body.market_orderID)
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: market_Order_deletetionReturn`)
    return next(error)
  }

  let location_market_Order_deletetionReturn
  try {
    location_market_Order_deletetionReturn = await SellMarketOrderLocation.findOneAndDelete({sellmarketorderID: req.body.market_orderID})
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: location_market_Order_deletetionReturn`)
    return next(error)
  }


  
  let sellmarketorderimage_deletetionReturn
  try {
    sellmarketorderimage_deletetionReturn = await SellMarketOrderImage.findOneAndDelete({sellmarketorderID: req.body.market_orderID})
  } catch (e) {
    let error = new MongoError(`Failed to delete: Error: ${e.message} Level: sellmarketorderimage_deletetionReturn`)
    return next(error)
  }


  res.status(200).json({
    srv_: "Successfully deleted"
  })
}





async function getOrderController(req, res, next) {
  let order

  try {
    order = await SellMarketOrder.findById({ _id: ObjectId(req.params.orderID) })
      .populate({
        // Populate protagonists
        path: "userid",
        // Fields allowed to populate with
        select: "_id username email",
      })
      .populate({
        // Populate protagonists
        path: "sellmarketorderlocationID",
        // Fields allowed to populate with
        select: "location.st location.neigh location.province_state location.city location.country -_id",
      })
      .populate({
        // Populate protagonists
        path: "sellmarketorderImageID",
        // Fields allowed to populate with
        select: "images.name",
      })

  } catch (e) {
    let error = new MongoError(`No order found by that ID: ${e.message}`)
    return next(error)
  }

  // console.log("---------->>>>", order)

  // console.log("Found!!!!")


  res.status(200).json(order)
}




function registerMarketOrderController(req, res) {

  let success_message = `Congrats. Your item titled: ${res.locals.ret_sellmarketorder_save.title}, has been posted.`
  
  res.status(200).json({
    server: {
      message: success_message
    }
  })
  
}





marketplaceController = {
  seeDataRes: seeDataRes,
  updateOrder23Controller: updateOrder23Controller,
  updateOrder1Controller: updateOrder1Controller,
  deleteOrderController: deleteOrderController,
  getOrderController: getOrderController,
  registerMarketOrderController: registerMarketOrderController,
  deleteMarketOrderImages: deleteMarketOrderImages
}


module.exports = marketplaceController