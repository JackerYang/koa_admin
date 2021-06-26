const imagesService = require("../service/imagesService")
const { paramsHasEmpty } = require("../../libs/utils")

const upload = async (ctx, uploadPath) => {
    const req = ctx.request.files
    if (paramsHasEmpty(ctx, req, ["file"])) return
    let res = await imagesService.uploadImg(req.file, ctx.origin, uploadPath)
    ctx.send(res)
}

module.exports = {
    uploadArticleBanner: async ctx => {
        await upload(ctx, "article/banner")
    },

    uploadFriendAvatar: async ctx => {
        await upload(ctx, "friend/avatar")
    },

    uploadUserAvatar: async ctx => {
        await upload(ctx, "user/avatar")
    }
}
