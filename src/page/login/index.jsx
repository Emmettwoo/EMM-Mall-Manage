import React from "react";

import "./index.css";

import PageTitle from 'component/page-title/index.jsx';
import User from 'service/user-service.jsx';
const _user = new User();


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    // 当输入框内容发生改变
    onInputChange(e) {
        let inputType = e.target.name,
            inputValue = e.target.value;
        this.setState({
            [inputType]: inputValue
        });
        // console.log(inputType + ": " + inputValue);
    }
    // 当点击提交按钮时
    onSubmit(e) {
        _user.login({
            username: this.state.username,
            password: this.state.password
        }).then((msg, data) => {
            ;
        }, (err) => {
            ;
        });
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
                                    onChange={e => this.onInputChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="密码"
                                    onChange={e => this.onInputChange(e)}
                                />
                            </div>
                            <button
                                className="btn btn-lg btn-block btn-primary btn-login"
                                onClick={e => this.onSubmit(e)}
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
