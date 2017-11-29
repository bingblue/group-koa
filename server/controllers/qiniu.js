'use strict'
const qiniu = require('qiniu')
const Config = require('../config/config')

class Qiniu {
  constructor () {
    this.v = '0.01'
    this.config = new qiniu.conf.Config()
    // 空间对应的机房
    this.config.zone = qiniu.zone.Zone_z0
  }
  async upload (localFile, key, ctx = {}) {
    let res
    try {
      let formUploader = new qiniu.form_up.FormUploader(this.config)
      let putExtra = new qiniu.form_up.PutExtra()
      let mac = new qiniu.auth.digest.Mac(Config.qiniu.accessKey, Config.qiniu.secretKey)
      let options = { 
        scope: Config.qiniu.bucket,
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
      }
      let putPolicy = new qiniu.rs.PutPolicy(options)
      let uploadToken = putPolicy.uploadToken(mac)
      // 文件上传
      ctx.body = await new Promise(function (resolve, reject) {  
        formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr, respBody, respInfo) {
          if (respErr) {
            reject(respErr)
          }
          if (respInfo.statusCode == 200) {
            resolve(respBody)
          } else {
            let err = {
              errmsg: respBody,
              code: respInfo.statusCode
            }
            reject(err)
          }
        })
      })
    } catch (err) {
      ctx.body = Util.getMsg(err.errmsg, err.code, '上传文件失败')
    }
    return ctx.body
  }
}

module.exports = new Qiniu()
