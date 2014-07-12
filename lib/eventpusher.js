/* EventPusher listens for events and pushes them down to the user */

var EventPusher = function(options) {
  this.pubnub = options.pubnub;

};
