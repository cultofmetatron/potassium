/* worker system */
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var flow = require('./flow');
var _    = require('lodash');

var Request  = require('./request');
var Response = require('./response');


var Worker = function(params) {
  EventEmitter.call(this);
  this.pubnub = params.pubnub;
  this.cstack = [];
};

util.inherits(Worker, EventEmitter);

//for a single process
//options: 
Worker.prototype.listen = function(options) {
  this.pubnub.subscribe({
    channel: options.channel,
    message: _.bind(this.requestHandler, this)
  });
};

//to be used by the dispatcher
Worker.prototype.push = function() {

}

Worker.prototype.use = function(fns) {
  fns = Array.prototype.slice.call(arguments);
  if (fns.length === 1) {
    this.cstack.push(fn);
  } else {
    this.cstack.push(function(req, res, next) {
      return flow(fns, next).apply(this, arguments);
    });
  }
};

Worker.prototype.bindPubnub = function() {

};

//this is the handler for when a request is generated
Worker.prototype.requestHandler = function(message) {
  //create the programflow function
  var pc = flow(this.cstack, function(req, res) {
    
  });
  //create the request objects.
  



};



module.exports = Worker;
