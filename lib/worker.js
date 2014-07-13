/* worker system */
var EventEmitter = require('events').EventEmitter;
var util = require('util');


var Worker = function(params) {
  EventEmitter.call(this);
  this.pubnub = params.pubnub;
  this.cstack = [];

};

util.inherits(Worker, EventEmitter);

//for a single process
Worker.prototype.listen = function() {
  
};

//to be used by the dispatcher
Worker.prototype.push = function() {

}

Worker.prototype.use = function(fn) {
  this.cstack.push(fn);
};

Worker.prototype.bindPubnub = function() {
  
};

//this is the handler for when a request is generated
Worker.prototype.requestHandler = function(params) {
  

};



module.exports = Worker;
