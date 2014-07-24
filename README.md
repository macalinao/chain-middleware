# chain-middleware

Chains multiple Express middlewares together.

[![build status](https://secure.travis-ci.org/simplyianm/chain-middleware.png)](http://travis-ci.org/simplyianm/chain-middleware)

## Installation

This module is installed via npm:

``` bash
$ npm install chain-middleware
```

## Example Usage

``` js
var chain = require('chain-middleware');
chain(function(req, res, next) {
  // Middleware 1
  next();
}, function(req, res, next) {
  // Middleware 2
  next();
});
```
