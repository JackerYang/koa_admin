const userService = require("../service/userService")
const { paramsHasEmpty } = require("../../libs/utils")

module.exports = {
    getUserPage: async ctx => {
        let req = ctx.request.query
        if (paramsHasEmpty(ctx, req, ["page", "pageSize"])) return
        let res = await userService.getUserPage(req)
        ctx.send(res)
    },

    getUser: async ctx => {
        let req = ctx.request.query
        if (paramsHasEmpty(ctx, req, ["id"])) return
        let user = await userService.getUser(req.id)
        if (user) {
            ctx.send(user)
        } else {
            ctx.err(400, "用户不存在")
        }
    },

    addUser: async ctx => {
        let req = ctx.request.body
        if (paramsHasEmpty(ctx, req, ["name", "password"])) return
        let isSuccess = await userService.addUser(req)
        if (isSuccess) {
            ctx.send(null)
        } else {
            ctx.err(400, "用户名已存在")
        }
    },

    editUser: async ctx => {
        let req = ctx.request.body
        if (paramsHasEmpty(ctx, req, ["id", "name"])) return
        let isSuccess = await userService.editUser(req)
        if (isSuccess) {
            ctx.send(null)
        } else {
            ctx.err(400, "用户名已存在")
        }
    },

    delUsers: async ctx => {
        let req = ctx.request.query
        if (paramsHasEmpty(ctx, req, ["ids"])) return
        await userService.delUsers(req.ids.split(","))
        ctx.send(null)
    },

    login: async ctx => {
        let req = ctx.request.body
        if (paramsHasEmpty(ctx, req, ["name", "password"])) return
        let token = await userService.login(req)
        if (token) {
            ctx.send({ token })
        } else {
            ctx.err(400, "用户名或密码不正确")
        }
    },

    updateUserPwd: async ctx => {
        let req = ctx.request.body
        if (paramsHasEmpty(ctx, req, ["oldPassword", "newPassword"])) return
        let isSuccess = await userService.updateUserPwd(req, ctx.state.user)
        if (isSuccess) {
            ctx.send(null)
        } else {
            ctx.err(400, "旧密码错误")
        }
    },

    getUserInfo: async ctx => {
        let res = await userService.getUser(ctx.state.user.id)
        ctx.send(res)
    }
}
