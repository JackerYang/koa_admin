const mysql = require("mysql")
const co = require("co-mysql")
const { db } = require("../config")

let connect = mysql.createPool(db)

module.exports = co(connect)
