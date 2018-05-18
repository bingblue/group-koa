'use strict'
const router = require('koa-router')()
const passport = require('koa-passport')
const Util = require('../controllers/util')

router.post('/login', (ctx, next) => {
  ctx.body = ctx.request.body ? ctx.request.body : ctx.request.fields
  return passport.authenticate('local', { session: false }, (err, user, info, status) => {
    if (!user) return ctx.body = Util.getMsg(null, 500, '用户名或密码错误！')
    let sendUser = {
      nickName: user.nickName,
      token: user.token
    }
    ctx.body = Util.getMsg(sendUser)
  })(ctx, next)
})

router.post('/local', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

router.get('/logout', function (ctx) {
  ctx.logout()
  ctx.redirect('/')
})

router.get('/github', passport.authenticate('github'))
router.get('/github/callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

module.exports = router
