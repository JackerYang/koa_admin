const { query } = require("../../database/db")

module.exports = {
    // 获取总数
    getMessageCount: async () => {
        let sql = `SELECT COUNT(*) count FROM message`
        return await query(sql)
    },

    // 获取分页
    getMessagePage: async ({ page, pageSize }) => {
        let sql = `
            SELECT
            m.id, m.user_id, m.content, m.like_count, m.reply_count, m.update_time, m.create_time, u.name
            FROM message m
            JOIN user u ON m.user_id = u.id
        `
        sql += ` LIMIT ${pageSize * (page - 1)},${pageSize}`
        return await query(sql)
    },

    // 获取一条留言
    getMessage: async id => {
        let sql = `
            SELECT
            m.id, m.content, m.like_count, m.reply_count, m.update_time, m.create_time, u.name
            FROM message m WHERE id = ${id}
            JOIN user u ON m.user_id = u.id
        `
        return await query(sql)
    },

    // 批量删除留言
    delMessage: async ids => {
        let sql = `
            DELETE FROM message
            WHERE id IN (${ids})
        `
        return await query(sql)
    }
}
