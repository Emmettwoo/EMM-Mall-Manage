import React from "react";

import "./index.css";

import PageTitle from "component/page-title/index.jsx";

import MallUtil from "util/mall.jsx";
import User from "service/user-service.jsx";
const _mall = new MallUtil();
const _user = new User();


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirect: _mall.getUrlParam("redirect") || "/",
        };
    }
    componentDidMount() {
        this.checkLogin();
    }

    // 检查登入状态
    checkLogin() {
        _user.checkLogin().then(
            (res) => {
                alert("当前已登入，重新登入将覆盖状态");
            },
            (err) => {
                // do nothing.
            }
        );
    }

    // 当输入框内容发生改变
    onInputChange(e) {
        let inputType = e.target.name,
            inputValue = e.target.value;
        this.setState({
            [inputType]: inputValue,
        });
    }

    // 当点击提交按钮时
    onSubmit(e) {
        let loginInfo = {
                username: this.state.username,
                password: this.state.password,
            },
            checkResult = _user.checkLoginInfo(loginInfo);
        if (checkResult.status) {
            _user.login(loginInfo).then(
                (res) => {
                    this.props.history.push(this.state.redirect);
                },
                (err) => {
                    _mall.errorTips(err);
                }
            );
        } else {
            _mall.errorTips(checkResult.msg);
        }
    }
    // 当表单被回车提交
    onInputKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmit(e);
        }
    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">
                        <PageTitle title="后台登入" />
                    </div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    placeholder="用户名"
                                    onKeyUp={(e) => this.onInputKeyUp(e)}
                                    onChange={(e) => this.onInputChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="密码"
                                    onKeyUp={(e) => this.onInputKeyUp(e)}
                                    onChange={(e) => this.onInputChange(e)}
                                />
                            </div>
                            <button
                                className="btn btn-lg btn-block btn-primary btn-login"
                                onClick={(e) => this.onSubmit(e)}
                            >
                                登入
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
