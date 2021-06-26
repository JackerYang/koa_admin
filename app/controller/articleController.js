const articleService = require("../service/articleService")
const { paramsHasEmpty } = require("../../libs/utils")

module.exports = {
    getArticlePage: async ctx => {
        let req = ctx.request.query
        if (paramsHasEmpty(ctx, req, ["page", "pageSize"])) return
        let res = await articleService.getArticlePage(req)
        ctx.send(res)
    },

    getArticle: async ctx => {
        let req = ctx.request.query
        if (paramsHasEmpty(ctx, req, ["id"])) return
        let res = await articleService.getArticle(req.id)
        ctx.send(res)
    },

    addArticle: async ctx => {
        let req = ctx.request.body
        if (paramsHasEmpty(ctx, req, ["title", "desc", "content", "categories"])) return
        await articleService.addArticle(req, ctx.state.user)
        ctx.send(null)
    },

    editArticle: async ctx => {
        let req = ctx.request.body
        if (paramsHasEmpty(ctx, req, ["id", "title", "desc", "content", "categories"])) return
        await articleService.editArticle(req)
        ctx.send(null)
    },

    delArticle: async ctx => {
        let req = ctx.request.query
        if (paramsHasEmpty(ctx, req, ["ids"])) return
        await articleService.delArticle(req.ids.split(","))
        ctx.send(null)
    }
}
