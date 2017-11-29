'use strict'
import test from 'ava'
import Qiniu from '../server/controllers/qiniu'

let option = {
  localFile: 'D:\\bingblue\\group\\server\\public\\img\\logo_single.png',
  key: 'logo_single.png'
}

test.serial('qiniu.upload', async t => {
  t.log('测试上传文件')
  let result =await Qiniu.upload(option.localFile, option.key)
  console.log(result)
  t.is(result.key, option.key, '测试返回key是否正确')
})
