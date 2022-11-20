const fs = require('fs')

const ENV = require('../../config/base')
const { MongoClient } = require('mongodb');
const uri = ENV.database_link;
const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder');

const SellMarketOrderLocation = require('../../models/market-orders-models/SellMarketOrderLocation');

const SellMarketOrderImage = require('../../models/market-orders-models/SellMarketOrderImage');

module.exports = async (req, res, next) => {

  let array_of_sellmarketorderlocationsandimages_ids_where_user_is_engaged

  try {
    array_of_sellmarketorderlocationsandimages_ids_where_user_is_engaged = await SellMarketOrder.find({ userid: req.params.userId }).select("sellmarketorderlocationID sellmarketorderImageID _id")
  } catch (e) {
    res.locals.notifications.push(e);
  }

  console.log("array_of_sellmarketorderlocationsandimages_ids_where_user_is_engaged", array_of_sellmarketorderlocationsandimages_ids_where_user_is_engaged)

  let agenda_jobs_collection

  try {
    console.log("\n\n_______", 0)
    await mongodbClient.connect();
    agenda_jobs_collection = mongodbClient.db(ENV.database_name).collection("AgendaJobs")
  } catch (e) {
    // TODO put better descriptive error
    let error = new Error(`Was not able to connect to mongidbClient.connect() or access AgendaJobs collection`)
    return next(error)
  }


  // TODO #95 Instead of deleting the locations one-by-one. Feed the SellMarketOrderLocation.deleteMany the array of IDs references and delete all at once i.e. the method itself loops
  for (const obj_ids of array_of_sellmarketorderlocationsandimages_ids_where_user_is_engaged) {

    const directory = `public/img/marketorder-images/${obj_ids._id}`
    console.log(obj_ids, directory)


    let locationDeletedRet
    try {
      locationDeletedRet = await SellMarketOrderLocation.deleteOne({ _id: obj_ids.sellmarketorderlocationID })
    } catch (e) {
      res.locals.notifications.push(e)
      break
    }

    let ImagesDeletedRet
    try {
      ImagesDeletedRet = await SellMarketOrderImage.deleteOne({ _id: obj_ids.sellmarketorderImageID })
    } catch (e) {
      res.locals.notifications.push(e)
      break
    }

    try {
      fs.rmSync(directory, { recursive: true, force: true });
    } catch (e) {
      let error = new Error(`Was unable to delete the images associated with market order ID: ${req.body.market_orderID}`)
      return next(error)
    }


    // Delete JOBS
    const jobname = `Delete market order images directory: ${directory}`
    try {
      let agenda_jobs_entry_deletion_ret = await agenda_jobs_collection.findOneAndDelete({ name: jobname })
      console.log("------>>>", 1)
    } catch (e) {
      console.log(222)
      // TODO put better descriptive error
      let error = new Error(`Was unable to delete AgendaJob that deletes images in directory: ${directory}`)
      return next(error)
    }


  }


  console.log(2)
  await mongodbClient.close();




  let marketOrderDeletionRet


  try {
    marketOrderDeletionRet = await SellMarketOrder.deleteMany({ userid: req.params.userId })
  } catch (e) {
    res.locals.notifications.push(e);
  }


  return next()
}