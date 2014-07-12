/*
 * a request object has the following paramaters
 *
 * req_id: [uuid] - the uuid of the request
 * return_channel: [string] - the name of the channel we return the response object on
 * body: [object] - the contents of the object
 * method: [string] - the verb we assign to
 * path: [string] - the endpoint being hooked onto
 */

var rx = require('rx');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var _ = require('lodash');

var Request = function(params) {
  EventEmitter.call(this);
  this.attributes = {};
  _.each(['req_id', 'return_channel', 'body', 'method', 'path'], function(param, key) {
    this.attributes[key] = param;
  }, this);
};

util.inherits(Request, EventEmitter);

Request.prototype.get = function(attr) {
  return this.attributes[attr];
};
