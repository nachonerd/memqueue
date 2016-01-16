/**
 * NachoNerd MemQueue
 * Copyright (C) 2016 Ignacio R. Galieri
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
 * @category   Example
 * @package    Index
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/nachonerd/memqueue
 */

var MemQueue = require('../');

console.info("Creating Queue...");
try {
    var queue = new MemQueue("myqueue", 'localhost:11213');
} catch (e) {
    console.error("Creation Fail: "+e.message);
}

var element = "element"+Math.floor((Math.random()*10000));

console.info("Pushing first element: "+element);
queue.push(element, 10, function (err) {
    if (err) {
        console.error("Push Fail: "+err);
    }
    console.info("Retrieveing last element");
    queue.pop(function (err, data) {
        if (err) {
            console.error("Pop Fail: "+err);
        }
        console.info("The last element was: "+data);
        queue.end();
    });
});
