"use strict";

var expect = require('chai').expect;
var chain = require('..');

describe('chain-middleware', function() {
  it('should error if given invalid middleware', function() {
    expect(function() {
      chain('test');
    }).to.throw(/must be a function/);
    expect(function() {
      chain(42);
    }).to.throw(/must be a function/);
    expect(function() {
      chain('test', 42);
    }).to.throw(/must be a function/);
    expect(function() {
      chain(['test', 42]);
    }).to.throw(/must be a function/);
  });

  it('should error if given partially invalid middleware', function() {
    var mw = function(req, res, next) {};
    expect(function() {
      chain([mw, 42]);
    }).to.throw(/must be a function/);
    expect(function() {
      chain(mw, 'test');
    }).to.throw(/must be a function/);
  });

  it('should properly run a terminating middleware chain', function() {
    chain(function(req, res, next) {
      req.asdf = true;
      res.jkl = false;
      next();
    }, function(req, res, next) {
      expect(req.asdf).to.be.true;
      expect(res.jkl).to.be.false;
    }, function(req, res, next) {
      throw new Error('Should not be called');
    })({}, {}, function() {
      throw new Error('Should not be called');
    });
  });

  it('should properly run a completing middleware chain', function(done) {
    chain(function(req, res, next) {
      req.asdf = true;
      res.jkl = false;
      next();
    }, function(req, res, next) {
      expect(req.asdf).to.be.true;
      expect(res.jkl).to.be.false;
      next();
    }, function(req, res, next) {
      next();
    })({}, {}, done);
  });
});
