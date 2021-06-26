module.exports = {
    // 服务端口
    server_port: 8000,

    // 数据库
    db: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "@Root_12138",
        database: "blog",
        timezone: "08:00"
    },

    // 用户密码后缀
    pwd_salt: "GnHj4d8a_gsh?sD:L$OvPqU@fs",

    // token加密
    token_salt: "ysw_token_secret"
}
