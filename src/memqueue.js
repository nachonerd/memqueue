var Memcached = require('memcached');

function MemQueue(key, locations, options){
    if (key === undefined) {
        throw new Error("Must set queue key");
    }
    if (!(typeof key === 'string' || typeof key === 'number')) {
        throw new Error("The key parameter must be number or string");
    }
}

module.exports = MemQueue;
