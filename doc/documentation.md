<a name="MemQueue"></a>
## MemQueue
**Kind**: global class  
**Emits**: <code>[empty](#MemQueue+event_empty)</code>  
**Api**: public  

* [MemQueue](#MemQueue)
    * [new MemQueue(key, locations, options)](#new_MemQueue_new)
    * [.heartbeat](#MemQueue+heartbeat)
    * [.push(value, lifetime, callback)](#MemQueue+push) ⇒ <code>void</code>
    * [.pop(callback)](#MemQueue+pop) ⇒ <code>void</code>
    * [.end()](#MemQueue+end) ⇒ <code>void</code>
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

<a name="MemQueue+heartbeat"></a>
### memQueue.heartbeat
**Kind**: instance property of <code>[MemQueue](#MemQueue)</code>  
**Prototype**: <code>Number</code> heartbeat check interval measured in milliseconds, default 1 ms.  
**Api**: public  
<a name="MemQueue+push"></a>
### memQueue.push(value, lifetime, callback) ⇒ <code>void</code>
Push

Stores a new value in Memqueue.

**Kind**: instance method of <code>[MemQueue](#MemQueue)</code>  
**Emits**: <code>[push](#MemQueue+event_push)</code>  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Mixed</code> | Either a buffer, JSON, number or string that                            you want to store. |
| lifetime | <code>Number</code> | how long the data needs to be stored measured                            in seconds |
| callback | <code>function</code> | the callback |

<a name="MemQueue+pop"></a>
### memQueue.pop(callback) ⇒ <code>void</code>
Pop

Retrieve Last value from memqueue.

**Kind**: instance method of <code>[MemQueue](#MemQueue)</code>  
**Emits**: <code>[pop](#MemQueue+event_pop)</code>, <code>[empty](#MemQueue+event_empty)</code>  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | the callback |

<a name="MemQueue+end"></a>
### memQueue.end() ⇒ <code>void</code>
End

Finish memcached connection.

**Kind**: instance method of <code>[MemQueue](#MemQueue)</code>  
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
