"use strict";

var async = require('async');

module.exports = function(middlewares) {
  // Normalize
  if (!Array.isArray(middlewares)) {
    middlewares = Array.prototype.slice.call(arguments);
  }

  // Validate
  middlewares.filter(function(mw) {
    if (typeof mw !== 'function') {
      throw new Error('Middleware "' + mw + '" must be a function!');
    }
  });

  // Middleware
  return function(req, res, next) {
    async.eachSeries(middlewares, function(fn, done) {
      fn(req, res, done);
    }, next);
  };
};
