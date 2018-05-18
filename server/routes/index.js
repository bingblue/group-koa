'use strict'
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  console.log(ctx.state.user)
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/login', async (ctx, next) => {
  console.log('index => /login')
  await ctx.render('login', {
    title: '登录账户'
  })
})

router.get('/temp', async (ctx, next) => {
  await ctx.render('temp', {
    title: 'test Koa 2!'
  })
})

module.exports = router
