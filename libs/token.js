const jwt = require("jsonwebtoken")
const { token_salt } = require("../config")

module.exports = {
    // 生成 token
    generateToken: (payload, option = {}) => {
        return jwt.sign(payload, token_salt, {
            expiresIn: "4h",
            ...option
        })
    }
}
