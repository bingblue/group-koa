'use strict'
const router = require('koa-router')()
const passport = require('koa-passport')

router.post('/userInfo', passport.authenticate('jwt', { session: false }), function (ctx, next) {
  ctx.body = ctx.req.user
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/barr3 response'
})

module.exports = router
