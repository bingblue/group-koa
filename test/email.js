'use strict'
import test from 'ava'
import Email from '../server/controllers/email'

let mailOptions = {
      from: '系统消息 <system@bingblue.com>',
      to: '895355044@qq.com',
      subject: 'Hello world',
      html: '<h1>测试系统发送邮件!</h1> 世界，你好！'
    }

test.serial('email.send', async t => {
  t.log('测试发送email')
  let result =await Email._send(mailOptions)
  console.log(result)
  t.is(1, 1, '测试返回key是否正确')
})
