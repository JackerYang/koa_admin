const userRouter = require("koa-router")()
const userController = require("../app/controller/userController")

userRouter.get("/page", userController.getUserPage)
userRouter.get("/", userController.getUser)
userRouter.post("/", userController.addUser)
userRouter.put("/", userController.editUser)
userRouter.delete("/", userController.delUsers)
userRouter.post("/login", userController.login)
userRouter.put("/update/password", userController.updateUserPwd)
userRouter.get("/info", userController.getUserInfo)

module.exports = userRouter.routes()
