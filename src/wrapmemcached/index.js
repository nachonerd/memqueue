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
 * @package    WrapMemCached
 * @author     Ignacio R. Galieri <irgalieri@gmail.com>
 * @copyright  2016 Ignacio R. Galieri
 * @license    GPL-3.0
 * @link       https://github.com/nachonerd/memqueue
 */

 /**
  * Memcached
  * @private
  */
var Memcached = require('memcached');
var WrapMemCached = {};

/**
 * Get Intnace Of Memcached
 *
 * This function is only to help the mocking
 *
 * @param {Mixed}  locations Array, string or object with servers
 * @param {Object} options   Options
 * @api public
 */
WrapMemCached.getIntanceOf = function (locations, options) {
    return new Memcached(locations, options);
}

module.exports = WrapMemCached;
