const articleDao = require("../mapper/articleDao")

module.exports = {
    getArticlePage: async params => {
        let record = await articleDao.getArticlePage(params)
        let total = await articleDao.getArticleCount(params.title)
        return { record, total: total[0]["count"] }
    },

    getArticle: async id => {
        let record = await articleDao.getArticle(id)
        let categories = await articleDao.getCategoryByArticleId(id)
        return { ...record[0], categories: categories.map(c => c.category_id) }
    },

    addArticle: async (model, user) => {
        let article_id = await articleDao.addArticle(model, user.id)
        await articleDao.addCategoryByArticleId(article_id, model)
    },

    editArticle: async model => {
        await articleDao.editArticle(model)
        await articleDao.delArticleCategory([model.id])
        await articleDao.addCategoryByArticleId(model.id, model)
    },

    delArticle: async ids => {
        await articleDao.delArticle(ids)
        await articleDao.delArticleCategory(ids)
    }
}
