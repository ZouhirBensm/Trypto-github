// const os = require('os');
// const path = require('path');


// const userInfo = os.userInfo();
// const envPath = process.env.PATH;
// const homeDir = userInfo.homedir;
// const currentDir = process.cwd();




function getLogPiece1(filename, req, logId, GoodLookingDateTime) {
  return `
------------------------------------------------------------
This log is issued from express ${filename}
Endpoint: ${req.method} ${req.baseUrl}${req.route.path}

Log ID: ${logId}
Date and Time: ${GoodLookingDateTime}
`;

}


function getEndpointResponsePiece1(req) {
  return `From: ${req.method} ${req.baseUrl}${req.route.path}
` ;

}


// This log is issued from express ${currentDir}
// Running express endpoint as user: ${userInfo.username}
// PATH is: ${envPath}
// Home directory is: ${homeDir}
// Current working directory is: ${currentDir}



module.exports = {
  getLogPiece1,
  getEndpointResponsePiece1
}