const { query } = require("../../database/db")

module.exports = {
    // 获取总数
    getArticleCount: async title => {
        let sql = `SELECT COUNT(*) count FROM article`
        let values = []
        if (title) {
            sql += ` WHERE title LIKE ?`
            values.push(`%${title}%`)
        }
        return await query(sql, values)
    },

    // 获取分页
    getArticlePage: async ({ page, pageSize, title }) => {
        let sql = `
            SELECT
            a.id, a.title, a.comment_count, a.view_count, a.like_count, a.word_count, a.update_time, a.create_time, u.name author
            FROM article a
            JOIN user u ON a.user_id = u.id
        `
        let values = []
        if (title) {
            sql += ` WHERE a.title LIKE ?`
            values.push(`%${title}%`)
        }
        sql += ` LIMIT ${pageSize * (page - 1)},${pageSize}`
        values.push(pageSize * (page - 1), Number(pageSize))
        return await query(sql, values)
    },

    // 获取一篇文章
    getArticle: async id => {
        let sql = `
            SELECT
            id, banner_img, title, \`desc\`, content
            FROM article
            WHERE id = ?
        `
        return await query(sql, [id])
    },

    // 添加一篇文章
    addArticle: async ({ banner_img, title, desc, content }, user_id) => {
        let sql = `
            INSERT INTO
            article(banner_img, title, \`desc\`, content, user_id)
            VALUES(?, ?, ?, ?, ?)
        `
        let data = await query(sql, [banner_img, title, desc, content, user_id])
        return data.insertId
    },

    // 修改一篇文章
    editArticle: async ({ id, banner_img, title, desc, content }) => {
        let sql = `
            UPDATE article SET
            banner_img = ?, title = ?, \`desc\` = ?, content = ?
            WHERE id = ?
        `
        return await query(sql, [banner_img, title, desc, content, id])
    },

    // 批量删除文章
    delArticles: async ids => {
        let sql = `
            DELETE FROM article
            WHERE id IN (?)
        `
        return await query(sql, [ids])
    },

    // 根据文章id批量删除文章和分类对应关系
    delArticleCategory: async ids => {
        let sql = `
            DELETE FROM article_category
            WHERE article_id IN (?)
        `
        return await query(sql, [ids])
    },

    // 根据文章id添加分类数据
    addCategoryByArticleId: async (article_id, { categories }) => {
        let sql = `
            INSERT INTO
            article_category(article_id, category_id)
            VALUES
        `
        let values = []
        categories.forEach(category_id => {
            sql += `(?, ?),`
            values.push(article_id, category_id)
        })
        sql = sql.substr(0, sql.length - 1)
        return await query(sql, values)
    },

    // 根据文章id获取分类数据
    getCategoryByArticleId: async article_id => {
        let sql = `
            SELECT 
            category_id
            FROM article_category
            WHERE article_id = ?
        `
        return await query(sql, [article_id])
    }
}
