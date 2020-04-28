class MallUtil {
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
                        _this.doLogin();
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
                },
            });
        });
    };

    // 登入跳转函数
    doLogin() {
        window.location.href = './login?redirect=' + encodeURIComponent(window.location.pathname);
    };
}

export default MallUtil;
