'use strict';

const expressMiddleware = require('webpack-dev-middleware')

function middleware(doIt, req, res) {
  const originalEnd = res.end

  return function(done) {
    res.end = function() {
      originalEnd.apply(this, arguments);
      done(null, 0)
    }
    doIt(req, res, function() {
      done(null, 1)
    })
  }
}

module.exports = function(compiler, option, callbacks) {
  const doIt = expressMiddleware(compiler, option);

  for (const key in callbacks) {
    const exist = doIt[key] && typeof doIt[key] === 'function'
    exist && doIt[key].call(doIt, callbacks[key])
  }

  return function* (next) {
    const ctx = this
    const req = this.req
    const runNext = yield middleware(doIt, req, {
      end: function(content) {
        ctx.body = content
      },
      setHeader: function() {
        ctx.set.apply(ctx, arguments)
      },
    });
    if (runNext) {
      yield* next
    }
  }
}
