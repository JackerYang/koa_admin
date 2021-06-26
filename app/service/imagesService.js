const imagesDao = require("../mapper/imagesDao")
const { uploadImgHandler } = require("../../libs/utils")

module.exports = {
    uploadImg: async (img, localIP, type) => {
        let { name, path } = uploadImgHandler(img, type)
        await imagesDao.uploadImg({ name, url: path })
        return [{ name, url: path }]
    }
}
