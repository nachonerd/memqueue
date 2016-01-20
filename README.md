MemQueue
==========

[![Build Status](https://travis-ci.org/nachonerd/memqueue.svg?branch=master)](https://travis-ci.org/nachonerd/memqueue)
[![Code Climate](https://codeclimate.com/github/nachonerd/memqueue/badges/gpa.svg)](https://codeclimate.com/github/nachonerd/memqueue)
[![Test Coverage](https://codeclimate.com/github/nachonerd/memqueue/badges/coverage.svg)](https://codeclimate.com/github/nachonerd/memqueue/coverage)
[![Issue Count](https://codeclimate.com/github/nachonerd/memqueue/badges/issue_count.svg)](https://codeclimate.com/github/nachonerd/memqueue)
[![Dependencies Checker](https://david-dm.org/nachonerd/memqueue.svg)](https://david-dm.org/nachonerd/memqueue)
[![Join the chat at https://gitter.im/nachonerd/memqueue](https://badges.gitter.im/nachonerd/memqueue.svg)](https://gitter.im/nachonerd/memqueue?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![NPM](https://nodei.co/npm/memqueue.png?downloads=true&downloadRank=true)](https://nodei.co/npm/memqueue/)

## Description
This NodeJs library is an implementation of queue with memcached.

## Installation
    npm install memqueue

## Usage

```js
var MemQueue = require('memqueue');

console.info("Creating Queue...");
try {
    // create a new queue
    var queue = new MemQueue("myqueue", 'localhost:11213');
} catch (e) {
    console.error("Creation Fail: "+e.message);
}

var element = "element"+Math.floor((Math.random()*10000));

console.info("Pushing first element: "+element);
// push an element into the queue.
queue.push(element, 10, function (err) {
    if (err) {
        console.error("Push Fail: "+err);
    }
    console.info("Retrieveing last element");
    // retrieve the previously pushed object .
    queue.pop(function (err, data) {
        if (err) {
            console.error("Pop Fail: "+err);
        }
        console.info("The last element was: "+data);
        // end memcached connection.
        queue.end();
    });
});
```

<a name="method"></a>
## Methods
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

For more information see [Documentation](https://github.com/nachonerd/memqueue/blob/master/doc/documentation.md)

## License
The driver is released under the GPL-3.0 license. See the LICENSE for more information.
