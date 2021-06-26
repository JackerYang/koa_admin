const categoryDao = require("../mapper/categoryDao")

module.exports = {
    getCategoryList: async () => await categoryDao.getCategoryList(),

    getCategoryPage: async params => {
        let record = await categoryDao.getCategoryPage(params)
        let total = await categoryDao.getCategoryCount(params)
        return { record, total: total[0]["count"] }
    },

    getCategory: async id => {
        let record = await categoryDao.getCategory(id)
        return record[0]
    },

    addCategory: async model => {
        let isNameExist = await this.nameHasExist(model.name)
        if (isNameExist) {
            return "nameHasExist"
        } else {
            await categoryDao.addCategory(model)
        }
    },

    editCategory: async model => {
        let isNameExist = await this.nameHasExist(model.name)
        if (isNameExist) {
            return "nameHasExist"
        } else {
            await categoryDao.editCategory(model)
        }
    },

    delCategory: async ids => {
        await categoryDao.delCategory(ids)
        await categoryDao.delArticleCategory(ids)
    },

    nameHasExist: async name => {
        let data = await categoryDao.getCategoryByName(name)
        return data.length !== 0
    }
}
