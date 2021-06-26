const errorHandler = require("./errorHandler")
const { accessLogger } = require("./logger")
const cors = require("./cors")
const sendHandle = require("./sendHandler")
const koaBody = require("./koaBody")
const koaStatic = require("./koaStatic")
const imgPre = require("./imgPre")
const koaJwt = require("./koaJwt")

module.exports = app => {
    app.use(errorHandler)
    app.use(accessLogger)
    app.use(cors)
    app.use(sendHandle)
    app.use(koaBody)
    app.use(koaStatic)
    app.use(imgPre)
    app.use(koaJwt)
}
