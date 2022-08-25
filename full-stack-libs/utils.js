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
  // TODO try without async
  returnFetchAuthorizationString: async () => {
    let stringToConvert = `${ENV.paypal_client_id}:${ENV.paypal_secret}`
    let BASE64_paypal = Buffer.from(stringToConvert).toString('base64')
    let Authorization_string_for_fetch = `Basic ${BASE64_paypal}`
    console.log(`from: ${ENV.paypal_client_id}:${ENV.paypal_secret} to: ${Authorization_string_for_fetch}`)

    return Authorization_string_for_fetch
  }
}