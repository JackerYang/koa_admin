const koaBody = require("koa-body")

module.exports = koaBody({
    multipart: true,
    formidable: {
        keepExtensions: true,
        multipart: false
    }
})