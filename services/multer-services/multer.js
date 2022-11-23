const multer = require('multer')
const {ProfileImageUploadError} = require('../custom-errors/custom-errors')
const path = require('path')
var { existsSync, mkdirSync } = require('fs');

// options:
// directory2save2: where to save the uploaded file
// destination_error: error to throw when directory2save2 not available


// options = {
//   directory2save2: `./public/img/temporal-new`,
//   destination_error: new ProfileImageUploadError("Server Error | Please, try again later", "Directory: temporal-new directory is not present."),
// }


// KEPT AS REFERENCE
function setupMulterStorageService(options){
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // manipulate the req, check is public/img is available or file to error handle
      let p_error = null
      let directory = options.directory2save2
      // If directory not there throw an error
      if (!existsSync(directory)) {
        p_error = options.destination_error
      }
      cb(p_error, directory)
    },
    filename: function (req, file, cb) {
      let p_error = null
      // TODO prefix should have a constant number of digits
      let prefix = Math.round(Math.random() * 10000)
      cb(p_error, `${prefix}-${file.originalname}`)
    }
  })

  return storage
}

// options:
// storage: multer.StorageEngine
// multer_error: Error to throw if file(s) not supported type


// options = {
//   storage: storage,
//   multer_error: new ProfileImageUploadError("Server Error | Please, try again later", 'Only images with proper extensions are allowed'),
// }

function setupUploadMiddlewareService(options){
  let upload = multer({
    storage: options.storage,
    fileFilter: function (req, file, callback) {
      suportedExtentions = ['.png', '.jpeg', '.jp2', '.jpg', '.jfif', '.pjpeg', '.pjp', '.apng', '.avif', '.gif', '.webp']
  
      var ext = path.extname(file.originalname);
      if (suportedExtentions.includes(ext)) {
        return callback(null, true)
      }
      return callback(options.multer_error)
    },
    // TODO set top limit
    limits: {fileSize: max_marketimagefilesize},
    preservePath: true,
  })

  return upload
}




module.exports = {setupMulterStorageService, setupUploadMiddlewareService}