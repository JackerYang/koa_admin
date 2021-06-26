const categoryRouter = require("koa-router")()
const categoryController = require("../app/controller/categoryController")

categoryRouter.get("/list", categoryController.getCategoryList)
categoryRouter.get("/page", categoryController.getCategoryPage)
categoryRouter.get("/", categoryController.getCategory)
categoryRouter.post("/", categoryController.addCategory)
categoryRouter.put("/", categoryController.editCategory)
categoryRouter.delete("/", categoryController.delCategory)

module.exports = categoryRouter.routes()
