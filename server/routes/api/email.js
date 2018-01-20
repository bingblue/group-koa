'use strict'
const router = require('koa-router')()
const Email = require('../../controllers/email')
const Config = require('../../config/config')
const Util = require('../../controllers/util')

router.get('/', async (ctx, next) => {
  console.log(ctx.state.user)
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})


router.post('/send', async (ctx, next) => {
  // console.log(this.request.body) // if buffer or text
  // console.log(this.request.files) // if multipart or urlencoded
  // console.log(this.request.fields) // if json
  ctx.body = ctx.request.body ? ctx.request.body : ctx.request.fields
  let mailOptions = {
      from: ctx.body.from ? ctx.body.from : Config.email.from,
      to: ctx.body.to,
      subject: ctx.body.subject,
      html: ctx.body.html,
      attachments: ctx.body.attachments,
      ip: ctx.request.ip,
      event: ctx.body.event
    }
  try {
    await Email._send(mailOptions)
    Email._save(mailOptions)
    ctx.body = Util.getMsg({}, 200, '发送成功！')
  } catch (err) {
    ctx.body = Util.getMsg(err, 500, '发送失败')
  }
})

module.exports = router
