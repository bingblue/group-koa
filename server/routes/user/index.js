'use strict'
const router = require('koa-router')()

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/barr3 response'
})

module.exports = router
