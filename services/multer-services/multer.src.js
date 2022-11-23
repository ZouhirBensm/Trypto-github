const multer = require('multer')
const {ProfileImageUploadError} = require('../../custom-errors/custom-errors')
const path = require('path')
var { existsSync, mkdirSync } = require('fs');


// Have a service/function/class that instantiates a multer.StorageEngine and multer.Multer middleware and returns them to use in the proper server scripts. Arguments will be different depending on parameters.

class MulterSetup {
  #storage
  upload
  constructor(directory2save2, destination_error, multer_error){
    this.#setupMulterStorageService(directory2save2, destination_error)
    this.#setupUploadMiddlewareService(multer_error)
  }

  #setupMulterStorageService(directory2save2, destination_error){
    this.#storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // manipulate the req, check is public/img is available or file to error handle
        let p_error = null
        let directory = directory2save2
        // If directory not there throw an error
        if (!existsSync(directory)) {
          p_error = destination_error
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
  }
  


  #setupUploadMiddlewareService(multer_error){
    this.upload = multer({
      storage: this.#storage,
      fileFilter: function (req, file, callback) {
        let suportedExtentions = ['.png', '.jpeg', '.jp2', '.jpg', '.jfif', '.pjpeg', '.pjp', '.apng', '.avif', '.gif', '.webp'
        // ,'.svg'
      ]
    
        var ext = path.extname(file.originalname);
        if (suportedExtentions.includes(ext)) {
          return callback(null, true)
        }
        return callback(multer_error)
      },
      limits: {fileSize: max_marketimagefilesize},
      preservePath: true,
    })
  }

}



module.exports = MulterSetup