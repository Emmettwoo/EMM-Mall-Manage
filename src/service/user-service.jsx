import MallUtil from 'util/mall.jsx';
const _mall = new MallUtil();

class User {
    login(userInfo) {
        return _mall.request({
            type: "post",
            url: "/manage/user/login.do",
            data: {
                username: userInfo.username,
                password: userInfo.password
            }
        });
    };

    // 检查登入接口数据合法性
    checkLoginInfo(loginInfo) {
        let username = $.trim(loginInfo.username);
        let password = $.trim(loginInfo.password);
        if(typeof username !== "string" || username.length === 0) {
            return {
                status: false,
                msg: "用户名不能为空"
            };
        } else if(typeof password !== "string" || password.length === 0) {
            return {
                status: false,
                msg: "密码不能为空"
            };
        } else {
            return {
                status: true,
                msg: "数据合法性验证通过"
            };
        };
    };
};

export default User;