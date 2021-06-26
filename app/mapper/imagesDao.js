const { query } = require("../../database/db")

module.exports = {
    // 上传头像
    uploadImg: async ({ name, url }) => {
        let sql = `
            INSERT INTO
            image(name, url)
            VALUES("${name}", "${url}")
        `
        return await query(sql)
    }
}
