const categoryService = require("../service/categoryService")
const { paramsHasEmpty } = require("../../libs/utils")

module.exports = {
    getCategoryList: async ctx => {
        let res = await categoryService.getCategoryList()
        ctx.send(res)
    },

    getCategoryPage: async ctx => {
        let req = ctx.request.query
        if (paramsHasEmpty(ctx, req, ["page", "pageSize"])) return
        let res = await categoryService.getCategoryPage(req)
        ctx.send(res)
    },

    getCategory: async ctx => {
        let req = ctx.request.query
        if (paramsHasEmpty(ctx, req, ["id"])) return
        let res = await categoryService.getCategory(req.id)
        ctx.send(res)
    },

    addCategory: async ctx => {
        let req = ctx.request.body
        if (paramsHasEmpty(ctx, req, ["name"])) return
        let res = await categoryService.addCategory(req)
        if (res === "nameHasExist") {
            ctx.err(400, "分类名称已存在")
        } else {
            ctx.send(null)
        }
    },

    editCategory: async ctx => {
        let req = ctx.request.body
        if (paramsHasEmpty(ctx, req, ["id", "name"])) return
        let res = await categoryService.editCategory(req)
        if (res === "nameHasExist") {
            ctx.err(400, "分类名称已存在")
        } else {
            ctx.send(null)
        }
    },

    delCategory: async ctx => {
        let req = ctx.request.query
        if (paramsHasEmpty(ctx, req, ["ids"])) return
        await categoryService.delCategory(req.ids.split(","))
        ctx.send(null)
    }
}
