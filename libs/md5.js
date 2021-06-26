const md = require("md5")
const { pwd_salt } = require("../config")

module.exports = {
    // md5加密
    mdPwd: str => md(str + pwd_salt)
}
