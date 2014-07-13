//flow controller

var partial = function(fn, ctx, args) {
  return function() {
    return fn.apply(ctx, args);
  }
};

var flow = function(fns, _next) {
  return function(_args) {
    _args = Array.prototype.slice.call(arguments);
    _next = partial(_next, this, _args);
    var cstack = [];
    var next;
    var i;
    var _l = fns.length //performance optomization
    for (i = 0; i < _l - 1; i++) {
      cstack.push(partial(fns[i], this, _args.push(fns[i+1])));
    }
    cstack.push(partial(fns[_l-1], this, _args.push(_next)));
    return cstack[0]();
  };
};

module.exports = flow;
