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

var element = Math.floor((Math.random()*1000000));
var queue = new MemQueue(
    "myqueue"+element,
    testMemcachedHost+':'+testMemcachedPort
);
queue.push(
    element,
    2,
    function (err) {
        if (!err) {
            setTimeout(function(){
                queue.pop(
                    function (err, data) {
                        describe('Integrator Test 1', function() {
                            context('when we make 1 push and 1 pop', function () {
                                it("should obtained the same element pushed.", function () {
                                    assert.equal(element, data);
                                    queue.end();
                                });
                            });
                        });
                    }
                )
            }), 1100;
        }
    }
);
