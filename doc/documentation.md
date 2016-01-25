## Classes

<dl>
<dt><a href="#MemQueue">MemQueue</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#util">util</a></dt>
<dd><p>NachoNerd MemQueue
Copyright (C) 2016  Ignacio R. Galieri</p>
<p>This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
any later version.</p>
<p>This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.</p>
<p>You should have received a copy of the GNU General Public License
along with this program.  If not, see <a href="http://www.gnu.org/licenses/">http://www.gnu.org/licenses/</a>.</p>
</dd>
<dt><a href="#Memcached">Memcached</a></dt>
<dd><p>NachoNerd MemQueue
Copyright (C) 2016  Ignacio R. Galieri</p>
<p>This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
any later version.</p>
<p>This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.</p>
<p>You should have received a copy of the GNU General Public License
along with this program.  If not, see <a href="http://www.gnu.org/licenses/">http://www.gnu.org/licenses/</a>.</p>
</dd>
</dl>

<a name="MemQueue"></a>
## MemQueue
**Kind**: global class  
**Emits**: <code>[empty](#MemQueue+event_empty)</code>  
**Api**: public  

* [MemQueue](#MemQueue)
    * [new MemQueue(key, locations, options)](#new_MemQueue_new)
    * [.push](#MemQueue+push) ⇒ <code>void</code>
    * [.pop](#MemQueue+pop) ⇒ <code>void</code>
    * [.end](#MemQueue+end) ⇒ <code>void</code>
    * ["push"](#MemQueue+event_push)
    * ["pop"](#MemQueue+event_pop)
    * ["empty"](#MemQueue+event_empty)

<a name="new_MemQueue_new"></a>
### new MemQueue(key, locations, options)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| key | <code>Mixed</code> | Key String or Number |
| locations | <code>Mixed</code> | Array, string or object with servers |
| options | <code>Object</code> | Options |

<a name="MemQueue+push"></a>
### memQueue.push ⇒ <code>void</code>
Push

Stores a new value in Memqueue.

**Kind**: instance property of <code>[MemQueue](#MemQueue)</code>  
**Emits**: <code>[push](#MemQueue+event_push)</code>  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Mixed</code> | Either a buffer, JSON, number or string that                            you want to store. |
| lifetime | <code>Number</code> | how long the data needs to be stored measured                            in seconds |
| callback | <code>function</code> | the callback |

<a name="MemQueue+pop"></a>
### memQueue.pop ⇒ <code>void</code>
Pop

Retrieve Last value from memqueue.

**Kind**: instance property of <code>[MemQueue](#MemQueue)</code>  
**Emits**: <code>MemQueue#pop, MemQueue#event:empty</code>  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | the callback |

<a name="MemQueue+end"></a>
### memQueue.end ⇒ <code>void</code>
End

Finish memcached connection.

**Kind**: instance property of <code>[MemQueue](#MemQueue)</code>  
**Api**: public  
<a name="MemQueue+event_push"></a>
### "push"
Push event.

This event is called when a new element is add
to the queue.

**Kind**: event emitted by <code>[MemQueue](#MemQueue)</code>  
<a name="MemQueue+event_pop"></a>
### "pop"
Pop event.

This event is called when an element is remove from
the queue.

**Kind**: event emitted by <code>[MemQueue](#MemQueue)</code>  
<a name="MemQueue+event_empty"></a>
### "empty"
Empty event.

This event is called when queue change state
to empty.

**Kind**: event emitted by <code>[MemQueue](#MemQueue)</code>  
<a name="util"></a>
## util
NachoNerd MemQueue
Copyright (C) 2016  Ignacio R. Galieri

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

**Kind**: global variable  
**Category**: Src  
**Package**: MemQueue  
**Link**: https://github.com/nachonerd/memqueue  
**Author:** Ignacio R. Galieri <irgalieri@gmail.com>  
**License**: GPL-3.0  
**Copyright**: 2016 Ignacio R. Galieri  
<a name="Memcached"></a>
## Memcached
NachoNerd MemQueue
Copyright (C) 2016  Ignacio R. Galieri

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

**Kind**: global variable  
**Category**: Src  
**Package**: WrapMemCached  
**Link**: https://github.com/nachonerd/memqueue  
**Author:** Ignacio R. Galieri <irgalieri@gmail.com>  
**License**: GPL-3.0  
**Copyright**: 2016 Ignacio R. Galieri  
