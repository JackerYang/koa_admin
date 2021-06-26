const { logger } = require("./logger")

module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        logger.error(err)
        if (err?.message === "Authentication Error") {
            ctx.err(401, "token 无效")
        } else {
            ctx.err(400, err.message || "未知错误，请联系管理员")
        }
    }
}
