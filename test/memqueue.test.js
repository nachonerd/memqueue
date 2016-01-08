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
 * @category   Test
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/nachonerd/memqueue
 */

var assert = require('assert')
    , sinon = require('sinon')
    , WrapMemCached = require('../src/wrapmemcached')
    , MemQueue = require('../')
    , Memcached = require('memcached');;

describe('MemQueue', function() {
    context('when create object', function () {
        it("should throws exception if you forgets set key.", function () {
            var message = "";
            try {
                new MemQueue();
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("Must set queue key").message, message.message);
        });
        it("should throws exception if key parameter is false.", function () {
            var message = "";
            try {
                new MemQueue(false);
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("The key parameter must be number or string").message, message.message);
        });
        it("should throws exception if key parameter is true.", function () {
            var message = "";
            try {
                new MemQueue(true);
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("The key parameter must be number or string").message, message.message);
        });
        it("should throws exception if key parameter is [].", function () {
            var message = "";
            try {
                new MemQueue([]);
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("The key parameter must be number or string").message, message.message);
        });
        it("should throws exception if key parameter is [1,'aa'].", function () {
            var message = "";
            try {
                new MemQueue([1,'aa']);
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("The key parameter must be number or string").message, message.message);
        });
        it("should throws exception if key parameter is {}.", function () {
            var message = "";
            try {
                new MemQueue({});
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("The key parameter must be number or string").message, message.message);
        });
        it("should throws exception if key parameter is {'field':true}.", function () {
            var message = "";
            try {
                new MemQueue({'field':true});
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("The key parameter must be number or string").message, message.message);
        });
        it("should save key 'nacho' in the propertie key", function () {
            var message = "";
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                return "";
            });
            try {
                var object = new MemQueue("nacho");
                message = object.key;
            } catch (e) {
                message = e;
            }
            WrapMemCached.getIntanceOf.restore();
            assert.equal("nacho", message);
        });
        it("should save key '1' in the propertie key", function () {
            var message = "";
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                return "";
            });
            try {
                var object = new MemQueue("1");
                message = object.key;
            } catch (e) {
                message = e;
            }
            WrapMemCached.getIntanceOf.restore();
            assert.equal("1", message);
        });
        it("should save key 11 in the propertie key", function () {
            var message = "";
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                return "";
            });
            try {
                var object = new MemQueue(11);
                message = object.key;
            } catch (e) {
                message = e;
            }
            WrapMemCached.getIntanceOf.restore();
            assert.equal(11, message);
        });
        it("should save key 111111111111111 in the propertie key", function () {
            var message = "";
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                return "";
            });
            try {
                var object = new MemQueue(111111111111111);
                message = object.key;
            } catch (e) {
                message = e;
            }
            WrapMemCached.getIntanceOf.restore();
            assert.equal(111111111111111, message);
        });
        it("should throws exception if couldn't create memcached object.", function () {
            var message = "";
            sinon.stub(WrapMemCached, 'getIntanceOf').onCall(0).throws(
                new Error("Coundn't create memcached object")
            );
            try {
                new MemQueue("nacho");
            } catch (e) {
                message = e;
            }
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("Coundn't create memcached object").message, message.message);
        });
        it("should save a instance of memcached in broker propertie.", function () {
            var message = "";
            var memcached = new Memcached('localhost:11211');

            try {
                var queue = new MemQueue("nacho", 'localhost:11211');
                message = queue.broker;
            } catch (e) {
                message = e;
            }
            assert.equal(true, (message instanceof Memcached));
        });
    });
});
