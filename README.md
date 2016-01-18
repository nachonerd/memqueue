MemQueue
==========

[![Build Status](https://travis-ci.org/nachonerd/memqueue.svg?branch=master)](https://travis-ci.org/nachonerd/memqueue)
[![Code Climate](https://codeclimate.com/github/nachonerd/memqueue/badges/gpa.svg)](https://codeclimate.com/github/nachonerd/memqueue)
[![Test Coverage](https://codeclimate.com/github/nachonerd/memqueue/badges/coverage.svg)](https://codeclimate.com/github/nachonerd/memqueue/coverage)
[![Issue Count](https://codeclimate.com/github/nachonerd/memqueue/badges/issue_count.svg)](https://codeclimate.com/github/nachonerd/memqueue)
[![Dependencies Checker](https://david-dm.org/nachonerd/memqueue.svg)](https://david-dm.org/nachonerd/memqueue)

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
```

For more information see [Documentation](https://github.com/nachonerd/memqueue/blob/master/doc/documentation.md)

## License
The driver is released under the GPL-3.0 license. See the LICENSE for more information.
