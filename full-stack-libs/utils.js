const ENV = require('../config/base')


module.exports = {
  equalityCheck_LogInID_to_msgUserID: (message_author_id, userId) => {
    // userId is the current logged in user on the page
    return message_author_id === userId ? " current-user" : ""
  },
  parseURL: (url) => {
    const parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);

    if (!parsedURL) {
      return false
    }
    // console.log(parsedURL)

    return parsedURL
  },
  parseFullPath4firstpath: (fullpath) => {
    const parsedFULLPATH = /([^\/]+)\/?/.exec(fullpath);

    if (!parsedFULLPATH) {
      return false
    }
    // console.log(parsedURL)

    return parsedFULLPATH[1]
  },
  parseFullPath4lastpath: (fullpath) => {
    // const parsedFULLPATH = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
    const parsedFULLPATH = /\/?([^\/]+)$/.exec(fullpath);

    if (!parsedFULLPATH) {
      return false
    }
    // console.log(parsedURL)

    return parsedFULLPATH[1]
  },
  return_Authorization_header_value_4_fetch: () => {
    // Used in cURL
    // -u "Authorization: <client_id>:<secret>"
    let cURL_uflag_authorization_value = `${ENV.paypal_client_id}:${ENV.paypal_secret}`


    // For fetch require to be as follows
    // headers: { Authorization: "Basic (TransformedToBase64(<client_id>:<secret>))", "Content-Type": "application/json"}
    // <client_id>:<secret>
    let client_idCOLONsecret2Base64 = Buffer.from(cURL_uflag_authorization_value).toString('base64')
    // let client_idCOLONsecret2Base64_2 = btoa(cURL_uflag_authorization_value)

    // Header "Authorization" value
    let Authorization_header_value_4_fetch = `Basic ${client_idCOLONsecret2Base64}`

    console.log(`from: cURL -u "Authorization: ${ENV.paypal_client_id}:${ENV.paypal_secret}"`, " to ", `headers: { Authorization: "${Authorization_header_value_4_fetch}"} for fetch`)

    return Authorization_header_value_4_fetch
  },
  URLpathDecomposer(_path) {
    // Returns the path chopped up in array fashion
    const regExChopper = /[^\/]+/g;
    const matchesReg = _path.match(regExChopper)
    return matchesReg
  },
  redBkLog(e) {
    console.error('\n\n\n\x1b[37;41;1m', e, '\x1b[0m\n\n')
    return
  },
  determine_Sharp_toFormatOptions(mimetype, ext, error) {
    // heic, heif, avif, jpeg, jpg, jpe, tile, dz, png, raw, tiff, tif, webp, gif, jp2, jpx, j2k, j2c
    // let error = error
    let toFormat = {}

    switch (mimetype) {
      case "image/png":
        toFormat.format = "png"
        toFormat.options = { compressionLevel: 3 }
        break;
      case "image/jpeg":
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
        return error
    }

    return toFormat
  },

  generate_fake_subscription_ID() {
    let fake_paypal_subscriptionID = ``
    for (let i = 0; i < 12; i++) {
      let alphanumeric
      if (i == 3 || i == 6 || i == 7) {
        alphanumeric = Math.floor(Math.random() * 10)
        fake_paypal_subscriptionID += alphanumeric
        continue
      }
      if (i == 1) {
        alphanumeric = '-'
        fake_paypal_subscriptionID += alphanumeric
        continue
      }
      alphanumeric = String.fromCharCode(65 + Math.floor(Math.random() * 26))
      fake_paypal_subscriptionID += alphanumeric
    }
    return fake_paypal_subscriptionID
  }
  
}