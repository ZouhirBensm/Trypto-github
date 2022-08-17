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
  }
}