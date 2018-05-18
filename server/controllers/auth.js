'use strict'
const passport = require('koa-passport')
const Config = require('../config/config')
const User = require('./user')
const Util = require('./util')
const JWT = require('jsonwebtoken')

function createToken(id) {
  const token = JWT.sign({ id }, Config.jwt.secret, {
    expiresIn: Config.jwt.expiresIn,
    issuer: Config.jwt.issuer,
    audience: Config.jwt.audience
  })
  return token
}

// 序列化ctx.login()触发
passport.serializeUser(function (user, done) {
  done(null, user._id)
})

// 反序列化
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.getById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

// 普通登录
const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy({
  usernameField: 'userName',
  passwordField: 'userPwd'
}, function (userName, userPwd, done) {
  User.getByUserName(userName)
  .then(user => {
    if (user.body && Util.MD5(userPwd) === user.body.userPwd) {
      user.body.token = createToken(user.body.id)
      done(null, user.body)
    } else {
      done(null, false)
    }
  })
  .catch(err => done(err))
}))

// JWT登录
// const { JwtStrategy,ExtractJwt } = require('passport-jwt')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
let jwtOpt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: Config.jwt.secret,
  issuer: Config.jwt.issuer,
  audience: Config.jwt.audience
}
passport.use(new JwtStrategy(jwtOpt, function (jwt_payload, done) {
  User.getById(jwt_payload.id)
  .then(user => {
    if(user) return done(null, user)
  })
  .catch(err => done(err))
}))

// github登录
const GitHubStrategy = require('passport-github2').Strategy
passport.use(new GitHubStrategy({
  clientID: Config.github.clientID,
  clientSecret: Config.github.clientSecret,
  callbackURL: Config.github.callbackURL
}, async function (accessToken, refreshToken, profile, done) {
  let user = {
    userName: profile.username,
    userPwd: 'default',
    nickName: profile.displayName,
    userSex: '男',
    userEmail: profile._json.email,
    userBio: profile._json.bio,
    userAvatar: profile._json.avatar_url,
    githubId: profile.id
  }
  const result = await User.findOrCreate(user, 'github')
  return done(null, result)
}))

module.exports = passport
