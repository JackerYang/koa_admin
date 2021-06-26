const { query } = require("../../database/db")

module.exports = {
    // 获取总数
    getUserCount: async name => {
        let sql = `SELECT COUNT(*) count FROM user`
        let values = []
        if (name) {
            sql += ` WHERE name LIKE ?`
            values.push(`%${name}%`)
        }
        return await query(sql, values)
    },

    // 获取分页
    getUserPage: async ({ page, pageSize, name }) => {
        let sql = `
            SELECT
            id, name, avatar, update_time, create_time
            FROM user 
        `
        let values = []
        if (name) {
            sql += ` WHERE name LIKE ?`
            values.push(`%${name}%`)
        }
        sql += ` LIMIT ?,?`
        values.push(pageSize * (page - 1), Number(pageSize))
        return await query(sql, values)
    },

    // 获取一个用户
    getUser: async id => {
        let sql = `
            SELECT
            id, name, avatar
            FROM user WHERE id = ?
        `
        return await query(sql, [Number(id)])
    },

    // 检查用户名是否已存在
    getUserByName: async (name, id) => {
        let sql = `
            SELECT
            id
            FROM user WHERE name = ?
        `
        let values = []
        values.push(name)
        if (id) {
            sql += ` AND id <> ?`
            values.push(Number(id))
        }
        return await query(sql, values)
    },

    // 添加一个用户
    addUser: async ({ avatar, name, password }) => {
        let sql = `
            INSERT INTO
            user(avatar, name, password)
            VALUES(?, ?, ?)
        `
        return await query(sql, [avatar, name, password])
    },

    // 修改一个用户
    editUser: async ({ id, avatar, name }) => {
        let sql = `
            UPDATE user SET 
            avatar = ?, name = ?
            WHERE id = ?
        `
        return await query(sql, [avatar, name, Number(id)])
    },

    // 批量删除用户
    delUsers: async ids => {
        let sql = `
            DELETE FROM user
            WHERE id IN (?)
        `
        return await query(sql, [ids])
    },

    // 用户登录
    login: async ({ name, password }) => {
        let sql = `
            SELECT
            id, name, avatar
            FROM user WHERE name = ? AND password = ?
        `
        return await query(sql, [name, password])
    },

    // 根据id查询密码
    getPwdById: async id => {
        let sql = `
            SELECT
            password
            FROM user WHERE id = ?
        `
        return await query(sql, [id])
    },

    // 修改密码
    updateUserPwd: async ({ id, password }) => {
        let sql = `
            UPDATE user SET 
            password = ?
            WHERE id = ?
        `
        return await query(sql, [password, Number(id)])
    }
}
