class MallUtil {
    // 处理接口调用请求
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || "get",
                url: param.url || "",
                dataType: param.dataType || "json",
                data: param.data || null,
                success: (res) => {
                    // 请求成功
                    if (0 === res.status) {
                        // resolve() 只能接受并处理一个参数，多余的参数会被忽略掉。 spec上就是这样规定。
                        // 故resolve(msg, data)是不生效的，data并不会传过去，直接传res吧。
                        typeof resolve === "function" && resolve(res);
                    }
                    // 需要登入
                    else if (10 === res.status) {
                        alert(res.msg);
                        this.doLogin();
                    }
                    // 错误请求
                    // else if(1 === res.status) {
                    //     typeof reject === 'function' && reject(res.msg || res.data);
                    // }
                    else {
                        typeof reject === "function" &&
                            reject(res.msg || res.data);
                    }
                },
                error: (err) => {
                    typeof reject === "function" && reject(err.statusText);
                },
            });
        });
    }

    // 登入跳转函数
    doLogin() {
        window.location.href =
            "./login?redirect=" + encodeURIComponent(window.location.pathname);
    }
    // 获取URL参数
    getUrlParam(name) {
        // 使用正则表达式适配参数
        let queryString = window.location.search.split("?")[1] || "",
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }

    // 成功提示
    successTips(msg) {
        alert(msg || "请求成功");
    }
    // 错误提示
    errorTips(msg) {
        alert(msg || "请求失败");
    }

    // 浏览器本地存储的写入
    setStorage(name, data) {
        let dataType = typeof data;
        // 对象类型时进行JSON序列化
        if (typeof data === "object") {
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型直接存入
        else if (["number", "string", "boolean"].indexOf(dataType) >= 0) {
            window.localStorage.setItem(name, data);
        } else {
            console.log(name + "为" + dataType + "类型，不能用于本地存储");
        }
    }
    // 浏览器本地存储的读取
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data);
        } else {
            return "";
        }
    }
    // 浏览器本地存储的移除
    removeStorage(name) {
        window.localStorage.removeItem(name);
    }
}

export default MallUtil;
