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
 * @category   LoadTest
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/nachonerd/memqueue
 */

var Benchmark = require('benchmark')
    , MemQueue = require('../');

var testMemcachedHost = process.env.MEMCACHED__HOST || 'localhost';
var testMemcachedPort = process.env.MEMCACHED__PORT || '11213';
var suite = new Benchmark.Suite;
var queue = new MemQueue("myqueue", testMemcachedHost+":"+testMemcachedPort);

// add tests
suite.add('1push&1pop#test', function() {
    element = Math.floor((Math.random()*1000000));
    queue.push(
        element,
        10,
        function(err){
            if (!err) {
                queue.pop(
                    function(err, data){
                    }
                );
            }
        }
    );
})
// add listeners
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    queue.end();
})
// run async
.run({ 'async': false });
