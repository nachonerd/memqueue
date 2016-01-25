/**
 * NachoNerd MemQueue
 * Copyright (C) 2016  Ignacio R. Galieri
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @category   Src
 * @package    MemQueue
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/nachonerd/memqueue
 */

var util = require('util');
var WrapMemCached = require('../src/wrapmemcached');
var EventEmitter = require('events').EventEmitter;


/**
 * Constructor
 *
 * @constructor
 * @param {Mixed}  key       Key String or Number
 * @param {Mixed}  locations Array, string or object with servers
 * @param {Object} options   Options
 * @fires MemQueue#empty
 * @api public
 */
function MemQueue(key, locations, options){
    var self = this;
    if (key === undefined) {
        throw new Error("Must set queue key");
    }
    if (!(typeof key === 'string' || typeof key === 'number')) {
        throw new Error("The key parameter must be number or string");
    }
    self.key = key;
    self.broker = WrapMemCached.getIntanceOf(locations, options);
    self.heartbeat = 1;
    self.counter = 0;

    setInterval(function() {
        self.broker.get(
            self.key+"key",
            function (err, data) {
                if (!err) {
                    if (data === undefined) {
                        data = 0;
                    }
                    if (self.counter < data) {
                        /**
                         * Push event.
                         *
                         * This event is called when a new element is add
                         * to the queue.
                         *
                         * @event MemQueue#push
                         */
                        self.emit('push');
                    }
                    if (self.counter > data) {
                        /**
                         * Pop event.
                         *
                         * This event is called when an element is remove from
                         * the queue.
                         *
                         * @event MemQueue#pop
                         */
                        self.emit('pop');
                    }
                    if (data === 0) {
                        /**
                         * Empty event.
                         *
                         * This event is called when queue change state
                         * to empty.
                         *
                         * @event MemQueue#empty
                         */
                        self.emit('empty');
                    }
                    self.counter = data;
                }
            }
        );
    }, self.heartbeat);

    EventEmitter.call(this);
}

util.inherits(MemQueue, EventEmitter);

function push(value, lifetime, callback) {
    var self = this;
    self.broker.get(
        self.key+"sem",
        function (err, data) {
            if (err) {
                return callback(err);
            }
            if (data === 1) {
                return callback("queue in use, try later");
            }
            self.broker.set(
                self.key+"sem",
                1,
                86400,
                function (err) {
                    if (err) {
                        return callback(err);
                    }
                    self.broker.get(
                        self.key+"key",
                        function (err, data) {
                            if (err) {
                                return callback(err);
                            }
                            if (data === undefined) {
                                data = 0;
                            }
                            data = data + 1;
                            self.broker.set(
                                self.key+"key",
                                data,
                                86400,
                                function (err) {
                                    if (err) {
                                        return callback(err);
                                    }
                                    self.broker.set(
                                        self.key+data,
                                        value,
                                        lifetime,
                                        function (err) {
                                            if (err) {
                                                return callback(err);
                                            }
                                            self.broker.set(
                                                self.key+"sem",
                                                0,
                                                86400,
                                                function (err) {
                                                    if (err) {
                                                        return callback(err);
                                                    }
                                                    return callback(false);
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}

function pop(callback) {
    var self = this;
    self.broker.get(
        self.key+"sem",
        function (err, data) {
            if (err) {
                return callback(err, undefined);
            }
            if (data === 1) {
                return callback("queue in use, try later", undefined);
            }
            self.broker.set(
                self.key+"sem",
                1,
                86400,
                function (err) {
                    if (err) {
                        return callback(err, undefined);
                    }
                    self.broker.get(
                        self.key+"key",
                        function (err, data) {
                            if (err) {
                                return callback(err, undefined);
                            }
                            if (data === 0) {
                                self.broker.set(
                                    self.key+"sem",
                                    0,
                                    86400,
                                    function (err) {
                                        if (err) {
                                            return callback(err, undefined);
                                        }
                                        return callback('queue is empty', undefined);
                                    }
                                );
                            }
                            data = data - 1;
                            self.broker.set(
                                self.key+"key",
                                data,
                                86400,
                                function (err) {
                                    if (err) {
                                        return callback(err, undefined);
                                    }
                                    self.broker.get(
                                        self.key+(data+1),
                                        function (err, value) {
                                            if (err) {
                                                return callback(err, undefined);
                                            }
                                            self.broker.set(
                                                self.key+"sem",
                                                0,
                                                86400,
                                                function (err) {
                                                    if (err) {
                                                        return callback(err, undefined);
                                                    }
                                                    return callback(false, value);
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}

function end() {
    this.broker.end();
}

/**
 * Push
 *
 * Stores a new value in Memqueue.
 *
 * @param {Mixed}    value    Either a buffer, JSON, number or string that
 *                            you want to store.
 * @param {Number}   lifetime how long the data needs to be stored measured
 *                            in seconds
 * @param {Function} callback the callback
 *
 * @return {void}
 * @fires MemQueue#push
 * @api public
 */
MemQueue.prototype.push = push;
/**
 * Pop
 *
 * Retrieve Last value from memqueue.
 *
 * @param {Function} callback the callback
 *
 * @return {void}
 * @fires MemQueue#pop, MemQueue#empty
 * @api public
 */
MemQueue.prototype.pop = pop;
/**
 * End
 *
 * Finish memcached connection.
 *
 * @return {void}
 * @api public
 */
MemQueue.prototype.end = end;

module.exports = MemQueue;
