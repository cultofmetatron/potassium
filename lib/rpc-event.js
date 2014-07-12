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
  this.channel = options;
  this.origin = options.origin
};

//pushes the event to the user
RPCEvent.prototype.push = function() {
  if (_.isUndefined(this.pubnub)) {
    throw new Error('no pubnub object defined')
  }
}


module.exports = RPCEvent;
