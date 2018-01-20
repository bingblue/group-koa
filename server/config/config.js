'use strict'
const config = {
  app: {
    name: '滨清科技',
    keywords: 'bingblue、滨清、滨清科技、群官网、Nodejs',
    description:
      '滨清科技 - 最炫、最潮流的科技网站，我们追寻最前沿的技术、展现最炫酷的效果，让你感受科技无可抵挡的魅力！',
    root: '/new'
  },
  keys: ['mu-koa2'],
  mongodb: {
    cookieSecret: 'mygroup',
    db: 'group',
    host: '127.0.0.1',
    port: 27017,
    url: 'mongodb://127.0.0.1:27017/group'
  },
  sqe: [], // {_id: 'userId'}, {_id: 'groupId'}
  jwt: {
    secret: 'me' // 默认
  },
  github: {
    clientID: 'e75de7b1131e2b859ed8',
    clientSecret: 'b704e685c5faa6aa1cb3c72b7f4cbabf5929a16b',
    callbackURL: 'https://bingblue.com/auth/github/callback'
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
    ttl: 3600
  },
  qiniu: {
    accessKey: 'wFpe6IbqupK7dFZ0cP--Nu1KfuwMoYbCcyk1bB91',
    secretKey: 'LhX0qDfrtCicm4Cy3uTL4vrrjMpS9o8_01qJfk-S',
    bucket: 'bingblue'
  },
  email: {
    from: '滨清科技 <system@bingblue.com>',
    qqex: {
      service: 'QQex',
      auth: {
        user: 'system@bingblue.com',
        pass: 'gL6rg2fJecTHHZm3' // smtp密码
      }
    }
  }
}

module.exports = config
