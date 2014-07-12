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
  this.status = 200;// overide if this is not what you want with setStatus();
  if (params.publish_key) { this.publish_key = params.publish_key; }

  this.attributes = params.attributes || {};
};

util.inherits(Response, EventEmitter);

Response.prototype.setStatus = function(code) {
  this.code = code;
};

//used if you want to stream out data as it comes in for several requests
Response.prototype.write = function(data) {
  if (_.isUndefined(data)) { throw new Error('data undefined: cannot send')};
  if (!this.finalized) {
    this.body = _.extend({}, this.body, data);
    var res = {};
    res.body = body;
    res.status = this.code;
    res.eof = false;
    this.emit('write', res);
    return this.publish(res);
  } else {
    throw new Error('response already finalized');
  }
};

Response.prototype.send = function(data) {
  if (_.isUndefined(data)) { throw new Error('data undefined: cannot send')};
  if (!this.finalized) {
    this.body = _.extend({}, this.body, data);
    var res = {};
    res.body = body;
    res.status = this.code;
    res.eof = true;
    this.emit('write', res);
    this.emit('send', res);
    this.emit('end');
    this.finalized = true;
    return this.publish(res);
  } else {
    throw new Error('response already finalized');
  }
};
//alias to send
Response.prototype.end = function(data) {
  return this.send(data);
};



//publish to pubnub
Response.prototype.publish = function(res) {
  var self = this;
  var pub = {};
  pub.channel = this.return_channel
  pub.message = res;
  //publish keys are optional
  if (this.publish_key) {
    pub.publish_key = this.publish_key;
  }
  pub.callback = _.bind(function() {
    this.emit('publish', message);
  }, this);
  pub.error = _.bind(function(e) {
    this.emit('error', e);
  });
  


  return this.pubnub.publish(pub);
};





