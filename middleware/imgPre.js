module.exports = async (ctx, next) => {
    let { method, url } = ctx.request
    let reqUrl = url.split("?")[0].replace("/api", "")
    const pre = `${ctx.origin}/images`

    // 拿到数据后将图片的前缀去掉
    const delPre = [
        {
            path: "/article",
            method: "POST",
            key: "banner_img"
        },
        {
            path: "/article",
            method: "PUT",
            key: "banner_img"
        },
        {
            path: "/friend",
            method: "POST",
            key: "avatar"
        },
        {
            path: "/friend",
            method: "PUT",
            key: "avatar"
        },
        {
            path: "/user",
            method: "POST",
            key: "avatar"
        },
        {
            path: "/user",
            method: "PUT",
            key: "avatar"
        }
    ]
    let reqBody = ctx.request.body
    let delPreItem = delPre.find(i => i.method === method && i.path === reqUrl)
    if (delPreItem) {
        reqBody[delPreItem.key] = reqBody[delPreItem.key].replace(pre, "")
    }

    await next()

    // 返回数据前将图片的前缀加上
    const addPre = [
        {
            path: "/article",
            method: "GET",
            model: "object",
            key: "banner_img"
        },
        {
            path: "/images/article/banner/upload",
            method: "POST",
            model: "array",
            key: "url"
        },
        {
            path: "/friend/list",
            method: "GET",
            model: "array",
            key: "avatar"
        },
        {
            path: "/friend/page",
            method: "GET",
            model: "object-array",
            key: "avatar"
        },
        {
            path: "/friend",
            method: "GET",
            model: "object",
            key: "avatar"
        },
        {
            path: "/images/friend/avatar/upload",
            method: "POST",
            model: "array",
            key: "url"
        },
        {
            path: "/user/page",
            method: "GET",
            model: "object-array",
            key: "avatar"
        },
        {
            path: "/user",
            method: "GET",
            model: "object",
            key: "avatar"
        },
        {
            path: "/images/user/avatar/upload",
            method: "POST",
            model: "array",
            key: "url"
        },
        {
            path: "/user/info",
            method: "GET",
            model: "object",
            key: "avatar"
        }
    ]
    let addPreItem = addPre.find(i => i.method === method && i.path === reqUrl)
    if (addPreItem && ctx?.body?.code === 200) {
        let data = ctx.body.data
        if (addPreItem.model === "object") {
            if (data[addPreItem.key]) {
                data[addPreItem.key] = pre + data[addPreItem.key]
            }
        } else if (addPreItem.model === "array") {
            data.forEach(item => {
                if (item[addPreItem.key]) {
                    item[addPreItem.key] = pre + item[addPreItem.key]
                }
            })
        } else if (addPreItem.model === "object-array") {
            data.record.forEach(item => {
                if (item[addPreItem.key]) {
                    item[addPreItem.key] = pre + item[addPreItem.key]
                }
            })
        }
    }
}