// Only runs on the backend
var fs = require('fs');
var path = require('path');

var BUFFER = bufferFile('./provinces_territories_map_JSON.txt');

function bufferFile(relPath) {
    return fs.readFileSync(path.join(__dirname, relPath), { encoding: 'utf8' });
}

const provinces_territories_map_JSON = BUFFER

const provinces_territories_map = JSON.parse(provinces_territories_map_JSON)


console.log(provinces_territories_map)

module.exports = provinces_territories_map