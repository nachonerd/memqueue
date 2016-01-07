var Memcached = require('memcached');

function MemQueue(key, locations, options){
    if (key === undefined) {
        throw new Error("Must set queue key");
    }
}

module.exports = MemQueue;
