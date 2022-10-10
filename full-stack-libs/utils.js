const ENV = require('../config/base')


module.exports = {
  equalityCheck_LogInID_to_msgUserID: (message_author_id, userId) => {
    // userId is the current logged in user on the page
    return message_author_id === userId ? " current-user": ""
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

    console.log(`from: cURL -u "Authorization: ${ENV.paypal_client_id}:${ENV.paypal_secret}"` , " to ", `headers: { Authorization: "${Authorization_header_value_4_fetch}"} for fetch`)

    return Authorization_header_value_4_fetch
  },
  URLpathDecomposer(_path){
    // Returns the path chopped up in array fashion
    const regExChopper = /[^\/]+/g; 
    const matchesReg = _path.match(regExChopper)
    return matchesReg
  },
}