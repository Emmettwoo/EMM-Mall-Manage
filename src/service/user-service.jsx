import MallUtil from 'util/mall.jsx';
const _mall = new MallUtil();

class User {
    login(userInfo) {
        _mall.request({
            type: "post",
            url: "/manage/user/login.do",
            data: {
                username: userInfo.username,
                password: userInfo.password
            }
        })
    }
}

export default User;