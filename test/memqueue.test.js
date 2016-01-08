var assert = require('assert')
    , Memcached = require('memcached')
    , sinon = require('sinon')
    , MemQueue = require('../');

describe('MemQueue', function() {
    describe('#constructor', function () {
        it("should throws exception when you forgets set key.", function () {
            var message = "";
            try {
                new MemQueue();
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("Must set queue key").message, message.message);
        });
        it("should throws exception when key parameters is false.", function () {
            var message = "";
            try {
                new MemQueue(false);
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("The key parameter must be number or string").message, message.message);
        });
        it("should throws exception when key parameters is true.", function () {
            var message = "";
            try {
                new MemQueue(true);
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("The key parameter must be number or string").message, message.message);
        });
        it("should throws exception when key parameters is [].", function () {
            var message = "";
            try {
                new MemQueue([]);
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("The key parameter must be number or string").message, message.message);
        });
        it("should throws exception when key parameters is [1,'aa'].", function () {
            var message = "";
            try {
                new MemQueue([1,'aa']);
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("The key parameter must be number or string").message, message.message);
        });
        it("should throws exception when key parameters is {}.", function () {
            var message = "";
            try {
                new MemQueue({});
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("The key parameter must be number or string").message, message.message);
        });
        it("should throws exception when key parameters is {'field':true}.", function () {
            var message = "";
            try {
                new MemQueue({'field':true});
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("The key parameter must be number or string").message, message.message);
        });
        it("should throws exception when couldn't create memcached object.", function () {
            var message = "";
            var mem = new Memcached();
            sinon.stub(mem, "set").onCall(0).throws(
                new Error("Coundn't create memcached object")
            );
            try {
                mem.set();
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("Coundn't create memcached object").message, message.message);
        });
    });
});
