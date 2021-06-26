const fs = require("fs")
const path = require("path")

// 递归创建目录
const mkDirSyncLoop = dir => {
    if (fs.existsSync(dir)) {
        return true
    } else {
        if (mkDirSyncLoop(path.dirname(dir))) {
            fs.mkdirSync(dir)
            return true
        }
    }
}

module.exports = {
    // 判断参数是否为空
    paramsHasEmpty: (ctx, data, keys) => {
        let hasEmpty = false
        let len = keys.length
        for (let i = 0; i < len; i ++) {
            if (!data[keys[i]] && data[keys[i]] !== 0) {
                ctx.err(400, `缺少参数：${keys[i]}`)
                hasEmpty = true
                break
            }
        }
        return hasEmpty
    },

    // 处理上传
    uploadImgHandler: (file, dir) => {
        const reader = fs.createReadStream(file.path)
        const fileName = file.path.split("upload_")[1]
        const filePath = path.join(__dirname, `../../static/images/${dir}`)
        mkDirSyncLoop(filePath)
        const upStream = fs.createWriteStream(`${filePath}/${fileName}`)
        reader.pipe(upStream)
        return { name: fileName, path: `/${dir}/${fileName}` }
    }
}
