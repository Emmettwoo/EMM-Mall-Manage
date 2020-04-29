class MallUtil {
    // 处理接口调用请求
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || "get",
                url: param.url || "",
                dataType: param.dataType || "json",
                data: param.data || null,
                success(res) {
                    // 请求成功
                    if (0 === res.status) {
                        typeof resolve === "function" &&
                        resolve(res.msg, res.data);
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
                error(err) {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    };

    // 登入跳转函数
    doLogin() {
        window.location.href = './login?redirect=' + encodeURIComponent(window.location.pathname);
    };
    // 获取URL参数
    getUrlParam(name) {
        // 使用正则表达式适配参数
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    };

    // 成功提示
    successTips(msg) {
        alert(msg || "请求成功");
    };
    // 错误提示
    errorTips(msg) {
        alert(msg || "请求失败");
    };
}

export default MallUtil;
