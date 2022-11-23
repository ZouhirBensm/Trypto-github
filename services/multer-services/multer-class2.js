const multer = require('multer')
const {ProfileImageUploadError} = require('../custom-errors/custom-errors')
const path = require('path')
var { existsSync, mkdirSync } = require('fs');


// KEPT AS REFERENCE
class MulterSetup {
  #storage = undefined
  upload = undefined
  constructor(){
    // this.#storage = undefined
    // this.upload = undefined
  }

  // private
  set setupMulterStorageService({directory2save2, destination_error}){
    const storage = multer.diskStorage({
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
  
    this.#storage = storage
  }
  

  //private
  set setupUploadMiddlewareService({multer_error}){
    let upload = multer({
      storage: this.storage,
      fileFilter: function (req, file, callback) {
        let suportedExtentions = ['.png', '.jpeg', '.jp2', '.jpg', '.jfif', '.pjpeg', '.pjp', '.apng', '.avif', '.gif', '.webp']
    
        var ext = path.extname(file.originalname);
        if (suportedExtentions.includes(ext)) {
          return callback(null, true)
        }
        return callback(multer_error)
      },
      // TODO set top limit
      limits: {fileSize: max_marketimagefilesize},
      preservePath: true,
    })
    this.upload = upload
  }

}


let MulterSetupInstance = new MulterSetup()



module.exports = MulterSetupInstance