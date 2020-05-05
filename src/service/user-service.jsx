import MallUtil from "util/mall.jsx";
const _mall = new MallUtil();

class User {
    // 获取用户列表
    getUserList(pageNum, pageSize) {
        return _mall.request({
            type: "post",
            url: "/manage/user/list.do",
            data: {pageNum, pageSize}
        });
    }


    // 用户登入接口调用
    login(userInfo) {
        return _mall.request({
            type: "post",
            url: "/manage/user/login.do",
            data: {
                username: userInfo.username,
                password: userInfo.password,
            },
        });
    }

    // 用户登出接口调用
    logout() {
        return _mall.request({
            type: "post",
            url: "/user/logout.do",
        });
    }

    // 用户登入状态检查
    checkLogin() {
        return _mall.request({
            type: "post",
            url: "/user/check_login.do",
        });
    }


    // 检查登入接口数据合法性
    checkLoginInfo(loginInfo) {
        let username = $.trim(loginInfo.username);
        let password = $.trim(loginInfo.password);
        if (typeof username !== "string" || username.length === 0) {
            return {
                status: false,
                msg: "用户名不能为空",
            };
        } else if (typeof password !== "string" || password.length === 0) {
            return {
                status: false,
                msg: "密码不能为空",
            };
        } else {
            return {
                status: true,
                msg: "数据合法性验证通过",
            };
        }
    }
}

export default User;
