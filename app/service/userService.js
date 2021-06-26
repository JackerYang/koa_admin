const userMapper = require("../mapper/userMapper")
const { mdPwd } = require("../../libs/md5")
const { generateToken } = require("../../libs/token")

const nameHasExist = async (name, id) => {
    let data = await userMapper.getUserByName(name, id)
    return data.length !== 0
}

module.exports = {
    getUserPage: async params => {
        let record = await userMapper.getUserPage(params)
        let total = await userMapper.getUserCount(params.name)
        return {
            record,
            total: total[0]["count"]
        }
    },

    getUser: async id => {
        let [user] = await userMapper.getUser(id)
        return user
    },

    addUser: async model => {
        let isExist = await nameHasExist(model.name)
        if (isExist) {
            return false
        } else {
            model.password = mdPwd(model.password)
            await userMapper.addUser(model)
            return true
        }
    },

    editUser: async model => {
        let isExist = await nameHasExist(model.name, model.id)
        if (isExist) {
            return false
        } else {
            await userMapper.editUser(model)
            return true
        }
    },

    delUsers: async ids => {
        await userMapper.delUsers(ids)
    },

    login: async model => {
        model.password = mdPwd(model.password)
        let [user] = await userMapper.login(model)
        if (user) {
            let payload = {
                id: user.id,
                name: user.name
            }
            return generateToken(payload)
        } else {
            return null
        }
    },

    updateUserPwd: async (model, user) => {
        let [dbUser] = await userMapper.getPwdById(user.id)
        if (dbUser.password === mdPwd(model.oldPassword)) {
            await userMapper.updateUserPwd({ id: user.id, password: mdPwd(model.newPassword) })
            return true
        } else {
            return false
        }
    }
}
