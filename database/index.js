const db = require("./db")

module.exports = app => {
    app.context.db = db
}
