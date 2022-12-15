// Only runs on the backend
var fs = require('fs');
var path = require('path');

var BUFFER = bufferFile('./state_cities_map_JSON.txt');

function bufferFile(relPath) {
    return fs.readFileSync(path.join(__dirname, relPath), { encoding: 'utf8' });
}

const state_cities_map_JSON = BUFFER

const state_cities_map = JSON.parse(state_cities_map_JSON)

module.exports = state_cities_map