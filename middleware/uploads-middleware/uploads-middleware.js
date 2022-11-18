const sharp = require('sharp');
var { existsSync, mkdirSync } = require('fs');
const fs = require('fs/promises')
const path = require('path')


const SellMarketOrderLocation = require('../../models/market-orders-models/SellMarketOrderLocation')

const SellMarketOrder = require('../../models/market-orders-models/SellMarketOrder')

const SellMarketOderImage = require('../../models/market-orders-models/SellMarketOderImage')

const { MongoError } = require('../../custom-errors/custom-errors')




// TODO add error handling and proper sucess/error UI adaptability
async function instantiateMarketOrderLocationMiddleware(req, res, next) {
  console.log("registerMarketOrder")

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


  // try {
  // } catch (e) {
  //   e = new MongoError(`Unable to create the SellMarketOrderLocation entry ${e.message}`)
  //   return next(e)
  // }

  res.locals.ret_sellmarketorderlocation_instance = ret_sellmarketorderlocation_instance

  return next()


}



async function instantiateMarketOrderMiddleware(req, res, next) {
  let ret_sellmarketorder_instance

  ret_sellmarketorder_instance = new SellMarketOrder({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
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

  // try {
  // } catch (e) {
  //   e = new MongoError(`Unable to create the SellMarketOrder entry ${e.message}`)
  //   return next(e)
  // }

  res.locals.ret_sellmarketorder_instance = ret_sellmarketorder_instance



  return next()


}



async function processImageFilesMiddleware(req, res, next) {

  let directory = `public/img/marketorder-images/${res.locals.ret_sellmarketorder_instance._id}`
  let images = []

  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }



  for (let i = 0; i < req.files.length; i++) {
    let returned
    const processing_file = req.files[i];

    let toFormat = {}


    // heic, heif, avif, jpeg, jpg, jpe, tile, dz, png, raw, tiff, tif, webp, gif, jp2, jpx, j2k, j2c

    switch (processing_file.mimetype) {
      case "image/png":
        toFormat.format = "png"
        toFormat.options = { compressionLevel: 3 }
        break;
      case "image/jpeg":
        var ext = path.extname(processing_file.originalname);

        switch (ext) {
          case ".jpeg":
          case ".jpg":
            toFormat.format = "jpeg"
            toFormat.options = { quality: 90 }
            break;
          case ".jp2":
            toFormat.format = "jp2"
            toFormat.options = { quality: 90, lossless: true }
            break;
          case ".j2k":
            toFormat.format = "j2k"
            toFormat.options = {}
            break;
          case ".j2c":
            toFormat.format = "j2c"
            toFormat.options = {}
            break;
          default:
            toFormat.format = "jpeg"
            toFormat.options = {}
            break;
        }
        break;
      case "image/apng":
        toFormat.format = "apng"
        toFormat.options = { compressionLevel: 3 }
        break;
      case "image/gif":
        toFormat.format = "gif"
        toFormat.options = { compressionLevel: 3 }
        break;
      case "image/webp":
        toFormat.format = "webp"
        toFormat.options = { quality: 90, lossless: true, smartSubsample: true, minSize: true }
        break;
      case "image/avif":
        toFormat.format = "avif"
        toFormat.options = { quality: 80, lossless: true }
        break;
      default:
        toFormat = {}
        break;
    }


    try {

      // background: { r: 255, g: 255, b: 255, alpha: 0.5 }, withoutEnlargement: true
      returned = sharp(processing_file.path)
      .resize({ width: 576, fit: 'inside' })

      if (!(toFormat && Object.keys(toFormat).length === 0
        && Object.getPrototypeOf(toFormat) === Object.prototype)) {
        returned = returned.toFormat(toFormat.format, toFormat.options)
      }
      returned = await returned.toFile(`${directory}/${processing_file.filename}`)

      // .toFormat(toFormat.format, toFormat.options)
      // .toFile(`${directory}/${processing_file.filename}`)
    } catch (error) {
      console.error(`An error has occured during the processing ${error}`)
    }

    let source_directory = `public/img/temporal-new`


    try {
      await fs.unlink(path.join(source_directory, processing_file.filename));
    } catch (error) {
      console.error(`An error has occured during the processing ${error}`)
    }


    images.push({
      name: processing_file.filename,
      format: returned.format,
      width: returned.width,
      height: returned.height,
      size: returned.size,
    })

  }

  res.locals.images = images
  res.locals.directory = directory


  console.log(res.locals.images)

  return next()
}



async function instantiateMarketOrderImagesMiddleware(req, res, next) {

  let ret_sellmarketoderimage_instance

  ret_sellmarketoderimage_instance = new SellMarketOderImage({
    sellmarketorderID: res.locals.ret_sellmarketorder_instance._id,
    path: res.locals.directory,
    images: res.locals.images,
    expireAt: req.body.expireAt
  })
  
  res.locals.ret_sellmarketorder_instance.sellmarketorderImageID = ret_sellmarketoderimage_instance._id

  res.locals.ret_sellmarketoderimage_instance = ret_sellmarketoderimage_instance


  return next()
}


async function saveAllMarketOrderMiddleware(req, res, next) {

  let ret_sellmarketorderlocation_save, ret_sellmarketorder_save, ret_sellmarketoderimage_save

  try {
    ret_sellmarketorderlocation_save = await res.locals.ret_sellmarketorderlocation_instance.save()
  } catch (error) {
    console.error(error)
  }

  try {
    ret_sellmarketorder_save = await res.locals.ret_sellmarketorder_instance.save()
  } catch (error) {
    console.error(error)
  }

  try {
    ret_sellmarketoderimage_save = await res.locals.ret_sellmarketoderimage_instance.save()
  } catch (error) {
    console.error(error)
  }

  console.log(ret_sellmarketorderlocation_save, ret_sellmarketorder_save, ret_sellmarketoderimage_save)


  return next()
}


uploadsMiddleware = {
  instantiateMarketOrderLocationMiddleware: instantiateMarketOrderLocationMiddleware,
  instantiateMarketOrderMiddleware: instantiateMarketOrderMiddleware,
  processImageFilesMiddleware: processImageFilesMiddleware,
  instantiateMarketOrderImagesMiddleware: instantiateMarketOrderImagesMiddleware,
  saveAllMarketOrderMiddleware: saveAllMarketOrderMiddleware
}


module.exports = uploadsMiddleware