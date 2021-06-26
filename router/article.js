const articleRouter = require("koa-router")()
const articleController = require("../app/controller/articleController")

articleRouter.get("/page", articleController.getArticlePage)
articleRouter.get("/", articleController.getArticle)
articleRouter.post("/", articleController.addArticle)
articleRouter.put("/", articleController.editArticle)
articleRouter.delete("/", articleController.delArticle)

module.exports = articleRouter.routes()
