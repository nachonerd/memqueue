## Classes

<dl>
<dt><a href="#MemQueue">MemQueue</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#WrapMemCached">WrapMemCached</a></dt>
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

## Functions

<dl>
<dt><a href="#push">push(value, lifetime, callback)</a> ⇒ <code>void</code></dt>
<dd><p>Push</p>
<p>Stores a new value in Memqueue.</p>
</dd>
<dt><a href="#pop">pop(callback)</a> ⇒ <code>void</code></dt>
<dd><p>Pop</p>
<p>Retrieve Last value from memqueue.</p>
</dd>
<dt><a href="#end">end()</a> ⇒ <code>void</code></dt>
<dd><p>End</p>
<p>Finish memcached connection.</p>
</dd>
</dl>

<a name="MemQueue"></a>
## MemQueue
**Kind**: global class  
**Api**: public  
<a name="new_MemQueue_new"></a>
### new MemQueue(key, locations, options)
Constructor


| Param | Type | Description |
| --- | --- | --- |
| key | <code>Mixed</code> | Key String or Number |
| locations | <code>Mixed</code> | Array, string or object with servers |
| options | <code>Object</code> | Options |

<a name="push"></a>
## push(value, lifetime, callback) ⇒ <code>void</code>
Push

Stores a new value in Memqueue.

**Kind**: global function  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Mixed</code> | Either a buffer, JSON, number or string that                            you want to store. |
| lifetime | <code>Number</code> | how long the data needs to be stored measured                            in seconds |
| callback | <code>function</code> | the callback |

<a name="pop"></a>
## pop(callback) ⇒ <code>void</code>
Pop

Retrieve Last value from memqueue.

**Kind**: global function  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | the callback |

<a name="end"></a>
## end() ⇒ <code>void</code>
End

Finish memcached connection.

**Kind**: global function  
**Api**: public  
<a name="WrapMemCached"></a>
## WrapMemCached
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
<a name="WrapMemCached.getIntanceOf"></a>
### WrapMemCached.getIntanceOf(locations, options)
Get Intnace Of Memcached

This function is only to help the mocking

**Kind**: static method of <code>[WrapMemCached](#WrapMemCached)</code>  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| locations | <code>Mixed</code> | Array, string or object with servers |
| options | <code>Object</code> | Options |

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
