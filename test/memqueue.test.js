var assert = require('assert')
    , Memcached = require('memcached')
    , sinon = require('sinon')
    , MemQueue = require('../');

describe('MemQueue', function() {
    describe('#new', function () {
        it("should throws exception when you forgets set key", function () {
            var message = "";
            try {
                new MemQueue();
            } catch (e) {
                message = e;
            }
            assert.equal(new Error("Must set queue key").message, message.message);
        });
        it("should throws exception when couldn't create memcached object", function () {
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
