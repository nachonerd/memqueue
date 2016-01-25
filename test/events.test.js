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
    , Memcached = require('memcached')
    , EventEmitter = require('events').EventEmitter;

var testMemcachedHost = process.env.MEMCACHED__HOST || 'localhost';
var testMemcachedPort = process.env.MEMCACHED__PORT || '11213';

describe('MemQueue#Events', function() {
    context('when create object', function () {
        it("should an instance of EventEmitter.", function () {
            var message = true;
            try {
                element = Math.floor((Math.random()*1000000));
                queue = new MemQueue(
                    "myqueue"+element,
                    testMemcachedHost+':'+testMemcachedPort
                );
            } catch (e) {
                message = e.message;
            }
            assert.equal(queue instanceof EventEmitter, message);
        });
    });
});

describe('MemQueue#Events#onPush', function() {
    var pushcalled = false;
    context('when push an element into the queue', function () {
        beforeEach(function(done){
            element = Math.floor((Math.random()*1000000));
            queue = new MemQueue(
                "myqueue"+element,
                testMemcachedHost+':'+testMemcachedPort
            );
            queue.on('push', function() {
                pushcalled = true;
                done();
            });
            queue.push(element, 100, function (err) {

            });
        });
        it("should call push event.", function () {
            assert.equal(pushcalled, true);
        });
    });
});

describe('MemQueue#Events#onPop', function() {
    var popcalled = false;
    context('when pop an element from the queue', function () {
        beforeEach(function(done){
            element = Math.floor((Math.random()*1000000));
            var queue = new MemQueue(
                "myqueue"+element,
                testMemcachedHost+':'+testMemcachedPort
            );
            queue.on('pop', function() {
                popcalled = true;
                done();
            });
            queue.push(element, 100, function (err) {
                queue.pop(function (err, data) {
                });
            });
        });
        it("should call pop event.", function () {
            assert.equal(popcalled, true);
        });
    });
});

describe('MemQueue#Events#onEmpty', function() {
    var empty1called = false;
    var callercounter = 0;
    context('when create a queue', function () {
        beforeEach(function(done){
            element = Math.floor((Math.random()*1000000));
            var queue = new MemQueue(
                "myqueue"+element,
                testMemcachedHost+':'+testMemcachedPort
            );
            queue.on('empty', function() {
                callercounter++;
                empty1called = true;
                if (callercounter === 1) {
                    done();
                }
            });
        });
        it("should call empty event.", function () {
            assert.equal(empty1called, true);
        });
    });
});

describe('MemQueue#Events#onEmpty', function() {
    var empty1called = false;
    var canCallDone = false;
    context('when make one push and one pop', function () {
        beforeEach(function(done){
            element = Math.floor((Math.random()*1000000));
            var queue = new MemQueue(
                "myqueue"+element,
                testMemcachedHost+':'+testMemcachedPort
            );
            queue.on('empty', function() {
                empty1called = true;
                if (canCallDone) {
                    canCallDone = false;
                    done();
                }
            });
            queue.push(element, 100, function (err) {
                queue.pop(function (err, data) {
                    canCallDone = true;
                });
            });
        });
        it("should call empty event.", function () {
            assert.equal(empty1called, true);
        });
    });
});
