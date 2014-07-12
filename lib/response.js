/*
 * reponse object(s) are sent back to the client on their unique channel
 * type: 'response',
 * body: [Object] the body with all the paramaters
 * return_channel: [string] - the channel we are returning on
 * req_id: [uuid] - id of the request
 * eof: [boolean] - defaults to true
 *
 * inits:
 *  pubnub: the pubnub object
 *  return_channel,
 *  attributes: [object] things we want to add to the object by default
 */



var rx = require('rx');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var _ = require('lodash');

var Response = function(params) {
  EventEmitter.call(this);
  this.type = 'response';
  this.pubnub = params.pubnub;
  this.req_id = params.req_id;
  this.return_channel = params.return_channel;
  this.body = params.body || {};
  if (params.publish_key) { this.publish_key = params.publish_key; }

  this.attributes = params.attributes || {};

};

util.inherits(Response, EventEmitter);

Response.prototype.send = function(code, data) {
  if (_.isUndefined(data)) { throw new Error('data undefined: cannot send')};
  if (!this.finalized) {
    this.body = _.extend({}, this.body, data);
    var res = {};
    res.body = body;
    res.status = code;
    res.eof = true;
    this.publish(res);
    this.emit('sending', res);
  } else {
    throw new Error('response already finalized');
  }
  return this;
};

//publish to pubnub
Response.prototype.publish = function(res) {
  var self = this;
  var pub = {};
  pub.channel = this.return_channel
  pub.message = res;
  


  this.pubnub.publish(pub);
};





