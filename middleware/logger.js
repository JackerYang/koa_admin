const path = require("path")
const log4js = require("koa-log4")

log4js.configure({
    appenders: {
        //访问日志
        access: {
            type: "dateFile",
            pattern: "-yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            encoding: "utf-8",
            filename: path.join("logs/", "access")
        },
        //系统日志
        application: {
            type: "dateFile",
            pattern: "-yyyy-MM-dd.log",
            alwaysIncludePattern: true,
            encoding: "utf-8",
            filename: path.join("logs/", "application")
        },
        out: {
            type: "console"
        }
    },
    categories: {
        default: { appenders: ["out"], level: "info" },
        access: { appenders: ["access"], level: "info" },
        application: { appenders: ["application"], level: "WARN" }
    }
})

module.exports = {
    accessLogger: log4js.koaLogger(log4js.getLogger("access")),
    logger: log4js.getLogger("application")
}
