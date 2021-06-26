const koaJwt = require("koa-jwt")
const { token_salt } = require("../config")

module.exports = koaJwt({
    secret: token_salt
}).unless({
    path: [/\/login/]
})
