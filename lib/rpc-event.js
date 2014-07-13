/* an event for triggering remote events on the client 
* An RPC-event is an event that can be used to trigger a specific action
* on the frontend,
* type: 'rpc',
* path: [string] - the lookup path for the method
* args: [array[(*|!Function)]] - a list of arguments to be passed into the handler
* channel: [string] - the channel this message is to be returned on
* origin: [string] - the origin machine the message came from
* 
* initializing an rpcEventObject
* in addition to the above,
* pubnub: pubnub init object
*
* */
var _ = require('./lodash');

var RPCEvent = function(options) {
  this.type = 'rpc';
  this.pubNub = options.pubnub;
  this.path = options.path;
  this.args = options.args || [];
  this.channel = options.channel;
  this.origin = options.origin
  this.pushed = false;
};

RPCEvent.prototype.serialize = function() {
  return {
    type: this.type,
    path: this.path,
    args: this.args,
    channel: this.channel,
    origin: this.origin
  };
};

//pushes the event to the user, will only do it once!!
RPCEvent.prototype.push = function() {
  if (_.isUndefined(this.pubnub)) {
    throw new Error('no pubnub object defined')
  } if (this.pushed) {
    throw new Error('event already pushed');
  } else {
    this.grantChannel();
    var message = this.serialize();
    return this.pubnub.publish({
      channel: this.channel,
      message: message,
      callback: _.bind(function() {
        this.emit('push', message);
        this.pushed = true;
      }, this),
      error: _.bind(function(e) {
        this.emit('error', e);
      }, this)
    });
  }
};

//grants access to this channel
RPCEvent.prototype.grantChannel = function() {
  //TODO: create this later
};


module.exports = RPCEvent;
