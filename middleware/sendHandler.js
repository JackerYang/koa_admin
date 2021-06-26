const success = ctx => {
    return (data, msg = "操作成功") => {
        ctx.set("Content-Type", "application/json")
        ctx.body = {
            code: 200,
            data,
            msg
        }
    }
}

const failure = ctx => {
    return (code, msg = "操作失败") => {
        ctx.set("Content-Type", "application/json")
        ctx.body = {
            code,
            data: null,
            msg
        }
    }
}

module.exports = async (ctx, next) => {
    ctx.send = success(ctx)
    ctx.err = failure(ctx)
    await next()
}
