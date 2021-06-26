const Koa = require("koa")
const middleware = require("./middleware")
const database = require("./database")
const router = require("./router")
const { server_port } = require("./config")

const app = new Koa()

// 中间件
middleware(app)

// 数据库
database(app)

// 路由
router(app)

app.listen(server_port, () => {
    console.log(`server run at localhost:${server_port}`)
})
