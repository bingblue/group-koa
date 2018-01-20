'use strict'
const mongoose = require('../config/db')

const emailSchema = new mongoose.Schema({
  from: { // 发件人
    type: 'String',
    match: [/[_a-zA-Z\d\-./]+@[_a-zA-Z\d-]+(\.[_a-zA-Z\d-]+)+/, '邮箱格式不正确']
  },
  to: { // 收件人列表
    type: [String]
  },
  subject: {
    type: String
  },
  html: { //内容
    type: String
  },
  attachments: { //附件
    type: []
  },
  ip: { //IP地址
    type: String
  },
  event: { //发送节点
    type: String
  },
  isSuccess: { //是否发送成功
    type: Boolean
  },
  sendDate: {// 发送时间
    type: Date,
    default: Date.now
  }
}, {
  collection: 'emails'
})

module.exports = mongoose.model('emails', emailSchema)
