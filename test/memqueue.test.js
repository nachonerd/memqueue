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
    context('when push', function () {
        context(' (1, 10, callback)', function () {
            it("should get key semaphore (<keyname>sem) if return 1 call callback with error.", function () {
                var message = "";
                var objMen = new Memcached();
                var callback = function (error) {
                    throw new Error(error);
                }
                sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                    sinon.mock(objMen)
                        .expects("get")
                        .once()
                        .withArgs("nachosem")
                        .callsArgWith(1, false, 1);
                    return objMen;
                });
                var queue = new MemQueue("nacho", 'localhost:11211');
                try {
                    queue.push(1 , 10, callback);
                    objMen.get.verify();
                } catch (e) {
                    message = e;
                }
                objMen.get.restore();
                WrapMemCached.getIntanceOf.restore();
                assert.equal(new Error("queue in use, try later").message, message.message);
            });
            it("should get key semaphore (<keyname>sem) if return error and false calls callback with same error.", function () {
                var message = "";
                var objMen = new Memcached();
                var callback = function (error) {
                    throw new Error(error);
                }
                sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                    sinon.mock(objMen)
                        .expects("get")
                        .once()
                        .withArgs("nachosem")
                        .callsArgWith(1, "memcached some error", false);
                    return objMen;
                });
                var queue = new MemQueue("nacho", 'localhost:11211');
                try {
                    queue.push(1 , 10, callback);
                    objMen.get.verify();
                } catch (e) {
                    message = e;
                }
                objMen.get.restore();
                WrapMemCached.getIntanceOf.restore();
                assert.equal(new Error("memcached some error").message, message.message);
            });
            it("should get key semaphore (<keyname>sem) if return error and undefined calls callback with same error.", function () {
                var message = "";
                var objMen = new Memcached();
                var callback = function (error) {
                    throw new Error(error);
                }
                sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                    sinon.mock(objMen)
                        .expects("get")
                        .once()
                        .withArgs("nachosem")
                        .callsArgWith(1, "memcached some error", undefined);
                    return objMen;
                });
                var queue = new MemQueue("nacho", 'localhost:11211');
                try {
                    queue.push(1 , 10, callback);
                    objMen.get.verify();
                } catch (e) {
                    message = e;
                }
                objMen.get.restore();
                WrapMemCached.getIntanceOf.restore();
                assert.equal(new Error("memcached some error").message, message.message);
            });
        });
        context(' (1, 10, callback) and semaphore return ok', function () {
            it("should set semaphore with 1 and 86400 seconds if faild calls callback same error.", function () {
                var message = "";
                var objMen = new Memcached();
                var callback = function (error) {
                    throw new Error(error);
                }
                sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                    sinon.mock(objMen)
                        .expects("get")
                        .once()
                        .withArgs("nachosem")
                        .callsArgWith(1, false, 0);
                    sinon.mock(objMen)
                        .expects("set")
                        .once()
                        .withArgs("nachosem", 1, 86400)
                        .callsArgWith(3, "some memcached error");
                    return objMen;
                });
                var queue = new MemQueue("nacho", 'localhost:11211');
                try {
                    queue.push(1 , 10, callback);
                    objMen.get.verify();
                    objMen.set.verify();
                } catch (e) {
                    message = e;
                }
                objMen.get.restore();
                objMen.set.restore();
                WrapMemCached.getIntanceOf.restore();
                assert.equal(new Error("some memcached error").message, message.message);
            });
        });
        context(' (1, 10, callback) and semaphore return ok set ok', function () {
            it("should get key '<keyname>+key' if faild calls callback with same error.", function () {
                var message = "";
                var objMen = new Memcached();
                var callback = function (error) {
                    throw new Error(error);
                }
                sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                    stub = sinon.stub(objMen, "get");

                    stub.withArgs("nachosem")
                        .callsArgWith(1, false, 0);
                    stub.withArgs("nachokey")
                        .callsArgWith(1, "memcached some error", false);

                    sinon.mock(objMen)
                        .expects("set")
                        .withArgs("nachosem", 1, 86400)
                        .once()
                        .callsArgWith(3, false);


                    return objMen;
                });
                var queue = new MemQueue("nacho", 'localhost:11211');
                try {
                    queue.push(1 , 10, callback);
                    objMen.set.verify();
                } catch (e) {
                    message = e;
                }
                objMen.get.restore();
                objMen.set.restore();
                WrapMemCached.getIntanceOf.restore();
                assert.equal(new Error("memcached some error").message, message.message);
            });
            it("should get key '<keyname>+key' if returns 1 set 2 if faild calls callback with same error.", function () {
                var message = "";
                var objMen = new Memcached();
                var callback = function (error) {
                    throw new Error(error);
                }
                sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                    stubGet = sinon.stub(objMen, "get");
                    stubSet = sinon.stub(objMen, "set");

                    stubGet.withArgs("nachosem")
                        .callsArgWith(1, false, 0);
                    stubGet.withArgs("nachokey")
                        .callsArgWith(1, false, 1);

                    stubSet.withArgs("nachosem", 1, 86400)
                        .callsArgWith(3, false);
                    stubSet.withArgs("nachokey", 2, 86400)
                        .callsArgWith(3, "some memcached error");

                    return objMen;
                });
                var queue = new MemQueue("nacho", 'localhost:11211');
                try {
                    queue.push(1 , 10, callback);
                } catch (e) {
                    message = e;
                }
                objMen.get.restore();
                objMen.set.restore();
                WrapMemCached.getIntanceOf.restore();
                assert.equal(new Error("some memcached error").message, message.message);
            });
            it("should get key '<keyname>+key' if returns 0 set 1 if faild calls callback with same error.", function () {
                var message = "";
                var objMen = new Memcached();
                var callback = function (error) {
                    throw new Error(error);
                }
                sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                    stubGet = sinon.stub(objMen, "get");
                    stubSet = sinon.stub(objMen, "set");

                    stubGet.withArgs("nachosem")
                        .callsArgWith(1, false, 0);
                    stubGet.withArgs("nachokey")
                        .callsArgWith(1, false, 0);

                    stubSet.withArgs("nachosem", 1, 86400)
                        .callsArgWith(3, false);
                    stubSet.withArgs("nachokey", 1, 86400)
                        .callsArgWith(3, "some memcached error");

                    return objMen;
                });
                var queue = new MemQueue("nacho", 'localhost:11211');
                try {
                    queue.push(1 , 10, callback);
                } catch (e) {
                    message = e;
                }
                objMen.get.restore();
                objMen.set.restore();
                WrapMemCached.getIntanceOf.restore();
                assert.equal(new Error("some memcached error").message, message.message);
            });
            it("should get key '<keyname>+key' if returns 10000 set 10001 if faild calls callback with same error.", function () {
                var message = "";
                var objMen = new Memcached();
                var callback = function (error) {
                    throw new Error(error);
                }
                sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                    stubGet = sinon.stub(objMen, "get");
                    stubSet = sinon.stub(objMen, "set");

                    stubGet.withArgs("nachosem")
                        .callsArgWith(1, false, 0);
                    stubGet.withArgs("nachokey")
                        .callsArgWith(1, false, 0);

                    stubSet.withArgs("nachosem", 1, 86400)
                        .callsArgWith(3, false);
                    stubSet.withArgs("nachokey", 1, 86400)
                        .callsArgWith(3, "some memcached error");

                    return objMen;
                });
                var queue = new MemQueue("nacho", 'localhost:11211');
                try {
                    queue.push(1 , 10, callback);
                } catch (e) {
                    message = e;
                }
                objMen.get.restore();
                objMen.set.restore();
                WrapMemCached.getIntanceOf.restore();
                assert.equal(new Error("some memcached error").message, message.message);
            });
        });
        context(' (1111, 2, callback)', function () {
            it("should successful.", function () {
                var message = "";
                var objMen = new Memcached();
                var callback = function (error) {
                    throw new Error("successful");
                }
                sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                    stubGet = sinon.stub(objMen, "get");
                    stubSet = sinon.stub(objMen, "set");

                    stubGet.withArgs("nachosem")
                        .callsArgWith(1, false, 0);
                    stubGet.withArgs("nachokey")
                        .callsArgWith(1, false, 1);

                    stubSet.withArgs("nachosem", 1, 86400)
                        .callsArgWith(3, false);
                    stubSet.withArgs("nachokey", 2, 86400)
                        .callsArgWith(3, false);
                    stubSet.withArgs("nacho2", 1111, 2)
                        .callsArgWith(3, false);
                    stubSet.withArgs("nachosem", 0, 86400)
                        .callsArgWith(3, false);

                    return objMen;
                });
                var queue = new MemQueue("nacho", 'localhost:11211');
                try {
                    queue.push(1111, 2, callback);
                } catch (e) {
                    message = e;
                }
                objMen.get.restore();
                objMen.set.restore();
                WrapMemCached.getIntanceOf.restore();
                assert.equal(new Error("successful").message, message.message);
            });
        });
        context(' (1, 10, callback)', function () {
            it("should successful.", function () {
                var message = "";
                var objMen = new Memcached();
                var callback = function (error) {
                    throw new Error("successful");
                }
                sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                    stubGet = sinon.stub(objMen, "get");
                    stubSet = sinon.stub(objMen, "set");

                    stubGet.withArgs("nachosem")
                        .callsArgWith(1, false, 0);
                    stubGet.withArgs("nachokey")
                        .callsArgWith(1, false, 1);

                    stubSet.withArgs("nachosem", 1, 86400)
                        .callsArgWith(3, false);
                    stubSet.withArgs("nachokey", 2, 86400)
                        .callsArgWith(3, false);
                    stubSet.withArgs("nacho2", 1, 10)
                        .callsArgWith(3, false);
                    stubSet.withArgs("nachosem", 0, 86400)
                        .callsArgWith(3, false);

                    return objMen;
                });
                var queue = new MemQueue("nacho", 'localhost:11211');
                try {
                    queue.push(1, 10, callback);
                } catch (e) {
                    message = e;
                }
                objMen.get.restore();
                objMen.set.restore();
                WrapMemCached.getIntanceOf.restore();
                assert.equal(new Error("successful").message, message.message);
            });
        });
    });
    context('when push finish', function () {
        it("should set semaphore in 0 if faild return same error.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");

                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);
                stubGet.withArgs("nachokey")
                    .callsArgWith(1, false, 1);

                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);
                stubSet.withArgs("nachokey", 2, 86400)
                    .callsArgWith(3, false);
                stubSet.withArgs("nacho2", 1111, 2, callback)
                    .callsArgWith(3, false);
                stubSet.withArgs("nacho2", 1111, 2)
                    .callsArgWith(3, false);
                stubSet.withArgs("nachosem", 0, 86400)
                    .callsArgWith(3, "Error memcached");

                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.push(1111, 2, callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("Error memcached").message, message.message);
        });
    });
    context('when pop', function () {
        it("should check semaphore if faild return same error on callback.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, "MEMCACHE SOME ERROR", undefined);
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("MEMCACHE SOME ERROR").message, message.message);
        });
        it("should check semaphore if 1 callback error queue in use.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 1);
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("queue in use, try later").message, message.message);
        });
        it("should check semaphore if 0 set semophore 1 if faild return same error.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, "SET MEMCACHE FAILD");
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("SET MEMCACHE FAILD").message, message.message);
        });
    });
    context('when pop locked semophore ok', function () {
        it("should get nachokey if faild calls callback with same error.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nachokey")
                    .callsArgWith(1, "GET KEY ERROR", undefined);
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("GET KEY ERROR").message, message.message);
        });
        it("should get key 1111 set nachokey 1110 if faild calls callback with same error.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nachokey")
                    .callsArgWith(1, false, 1111);
                stubSet.withArgs("nachokey", 1110, 86400)
                    .callsArgWith(3, "SET ERROR KEY");
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("SET ERROR KEY").message, message.message);
        });
        it("should get key 11 set nachokey 10 if faild calls callback with same error.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nachokey")
                    .callsArgWith(1, false, 11);
                stubSet.withArgs("nachokey", 10, 86400)
                    .callsArgWith(3, "SET ERROR KEY");
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("SET ERROR KEY").message, message.message);
        });
        it("should get key 0 unlock semaphore if failds calls callback with same error.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nachokey")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 0, 86400)
                    .callsArgWith(3, "SET ERROR KEY");
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("SET ERROR KEY").message, message.message);
        });
        it("should get key 0 unlock semaphore and calls callback with error 'queue is empty'.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nachokey")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 0, 86400)
                    .callsArgWith(3, false);
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("queue is empty").message, message.message);
        });
    });
    context('when pop locked semophore ok and set key 3 ok', function () {
        it("should get nacho4 faild calls callback woth same error.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nachokey")
                    .callsArgWith(1, false, 4);
                stubSet.withArgs("nachokey", 3, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nacho4")
                    .callsArgWith(1, "ERROR GET NACHO4", undefined);
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("ERROR GET NACHO4").message, message.message);
        });
        it("should get nacho4 ok unlock semaphore faild calls callback with same error.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nachokey")
                    .callsArgWith(1, false, 4);
                stubSet.withArgs("nachokey", 3, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nacho4")
                    .callsArgWith(1, false, 12);
                stubSet.withArgs("nachosem", 0, 86400)
                    .callsArgWith(3, "ERROR SET SEM");
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("ERROR SET SEM").message, message.message);
        });
    });
    context('when pop success', function () {
        it("should calls callaback with error false and data 12.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error("success " + data);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nachokey")
                    .callsArgWith(1, false, 4);
                stubSet.withArgs("nachokey", 3, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nacho4")
                    .callsArgWith(1, false, 12);
                stubSet.withArgs("nachosem", 0, 86400)
                    .callsArgWith(3, false);
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("success 12").message, message.message);
        });
        it("should calls callaback with error false and data 24.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error("success " + data);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nachokey")
                    .callsArgWith(1, false, 4);
                stubSet.withArgs("nachokey", 3, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nacho4")
                    .callsArgWith(1, false, 24);
                stubSet.withArgs("nachosem", 0, 86400)
                    .callsArgWith(3, false);
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("success 24").message, message.message);
        });
        it("should calls callaback with error false and data 'nacho rules'.", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error, data) {
                throw new Error("success " + data);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");
                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);
                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nachokey")
                    .callsArgWith(1, false, 4);
                stubSet.withArgs("nachokey", 3, 86400)
                    .callsArgWith(3, false);
                stubGet.withArgs("nacho4")
                    .callsArgWith(1, false, 'nacho rules');
                stubSet.withArgs("nachosem", 0, 86400)
                    .callsArgWith(3, false);
                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.pop(callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("success nacho rules").message, message.message);
        });
    });
    context('when push an element in empty queue', function () {
        it("should set nachokey in 1", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");

                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);

                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);

                stubGet.withArgs("nachokey")
                    .callsArgWith(1, false, undefined);

                stubSet.withArgs("nachokey", 1, 86400)
                    .callsArgWith(3, "Error memcached");

                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.push(1111, 2, callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("Error memcached").message, message.message);
        });
        it("should set nacho1 with this element", function () {
            var message = "";
            var objMen = new Memcached();
            var callback = function (error) {
                throw new Error(error);
            }
            sinon.stub(WrapMemCached, 'getIntanceOf', function () {
                stubGet = sinon.stub(objMen, "get");
                stubSet = sinon.stub(objMen, "set");

                stubGet.withArgs("nachosem")
                    .callsArgWith(1, false, 0);

                stubSet.withArgs("nachosem", 1, 86400)
                    .callsArgWith(3, false);

                stubGet.withArgs("nachokey")
                    .callsArgWith(1, false, undefined);

                stubSet.withArgs("nachokey", 1, 86400)
                    .callsArgWith(3, false);

                stubSet.withArgs("nacho1", 1111, 2)
                    .callsArgWith(3, "Error memcached");

                return objMen;
            });
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.push(1111, 2, callback);
            } catch (e) {
                message = e;
            }
            objMen.get.restore();
            objMen.set.restore();
            WrapMemCached.getIntanceOf.restore();
            assert.equal(new Error("Error memcached").message, message.message);
        });
    });
    context('when want end connection', function () {
        it("should calls memcached end method.", function () {
            var message = "success";
            var queue = new MemQueue("nacho", 'localhost:11211');
            try {
                queue.end();
            } catch (e) {
                message = e.message;
            }
            assert.equal("success", message);
        });
    });
});
