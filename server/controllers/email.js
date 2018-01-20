'use strict'
const nodemailer = require('nodemailer')
const EmailModel = require('../models/email')
const Config = require('../config/config')
const Util = require('./util')
class Email {
  constructor () {
    this.v = '0.01'
    this.smtpTransport = nodemailer.createTransport(Config.email.qqex)
  }
  async _save (mailOptions) {
    return await EmailModel.create(mailOptions)
  }
  async _send (mailOptions) {
    let smtpTransport = this.smtpTransport
    return await new Promise(function (resolve, reject) { 
      smtpTransport.sendMail(mailOptions, (err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
        // smtpTransport.close() // 如果没用，关闭连接池
      })
    })
  }
}

module.exports = new Email()
