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

var testMemcachedHost = process.env.MEMCACHED__HOST || 'localhost';
var testMemcachedPort = process.env.MEMCACHED__PORT || '11213';

describe('Integrator Test 1', function() {
    context('when we make 1 push and 1 pop', function () {
        var element = Math.floor((Math.random()*1000000));
        var data = -1;
        var queue = new MemQueue(
            "myqueue"+element,
            testMemcachedHost+':'+testMemcachedPort
        );

        beforeEach(function(done){
            queue.push(
                element,
                2,
                function (err) {
                    if (!err) {
                        setTimeout(function(){
                            queue.pop(
                                function (err, dataOb) {
                                    if (!err) {
                                        data = dataOb;
                                        done();
                                    }
                                }
                            )
                        }), 1100;
                    }
                }
            );
        });

        it("should obtained the same element pushed.", function () {
            assert.equal(element, data);
            queue.end();
        });
    });
    context('when we make 2 push and 2 pop', function () {
        var element = Math.floor((Math.random()*1000000));
        var data = -1;
        var data2 = -1;
        var queue = new MemQueue(
            "myqueue"+element,
            testMemcachedHost+':'+testMemcachedPort
        );

        beforeEach(function(done){
            queue.push(
                element+111,
                2,
                function (err) {
                    queue.push(
                        element,
                        2,
                        function (err) {
                            if (!err) {
                                queue.pop(
                                    function (err, dataOb) {
                                        if (!err) {
                                            data = dataOb;
                                            queue.pop(
                                                function (err, dataOb) {
                                                    if (!err) {
                                                        data2 = dataOb;
                                                        done();
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            );
        });

        it("should obtained the last element pushed first.", function () {
            assert.equal(element, data);
            queue.end();
        });
        it("should obtained the first element pushed last.", function () {
            assert.equal(element+111, data2);
            queue.end();
        });
    });
});
