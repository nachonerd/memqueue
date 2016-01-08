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

var WrapMemCached = require('../src/wrapmemcached');

/**
 * Constructor
 *
 * @constructor
 * @param {Mixed}  key       Key String or Number
 * @param {Mixed}  locations Array, string or object with servers
 * @param {Object} options   Options
 * @api public
 */
function MemQueue(key, locations, options){
    if (key === undefined) {
        throw new Error("Must set queue key");
    }
    if (!(typeof key === 'string' || typeof key === 'number')) {
        throw new Error("The key parameter must be number or string");
    }
    this.key = key;
    this.broker = WrapMemCached.getIntanceOf(locations, options);
}

module.exports = MemQueue;
