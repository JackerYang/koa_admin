const imagesRouter = require("koa-router")()
const imagesController = require("../app/controller/imagesController")

imagesRouter.post("/article/banner/upload", imagesController.uploadArticleBanner)
imagesRouter.post("/friend/avatar/upload", imagesController.uploadFriendAvatar)
imagesRouter.post("/user/avatar/upload", imagesController.uploadUserAvatar)

module.exports = imagesRouter.routes()
