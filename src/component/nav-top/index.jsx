import React from "react";
import { Link } from "react-router-dom";

import MallUtil from "util/mall.jsx";
import User from "service/user-service.jsx";
const _mall = new MallUtil();
const _user = new User();

class NavTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: _mall.getStorage("userInfo").username,
        };
    }

    // 登出逻辑
    onLogout() {
        _user.logout().then(
            (res) => {
                _mall.removeStorage("userInfo");
                // 这么跳转是不完美的，但是执行history的push需要Route对象，太麻烦
                window.location.href = "/login";
            },
            (err) => {
                _mall.errorTips(err);
            }
        );
    }

    render() {
        return (
            <div>
                <div className="navbar navbar-default top-navbar">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">
                            EMM-<b>Mall</b>
                        </Link>
                    </div>

                    <ul className="nav navbar-top-links navbar-right">
                        <li className="dropdown">
                            <a className="dropdown-toggle" href="javascript:;">
                                <i className="fa fa-user fa-fw"></i>
                                {this.state.username ? (
                                    <span>
                                        欢迎，管理员 {this.state.username}
                                    </span>
                                ) : (
                                    <span>欢迎，请先登入</span>
                                )}
                                <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-user">
                                <li>
                                    {this.state.username ? (
                                        <a
                                            onClick={() => {
                                                this.onLogout();
                                            }}
                                        >
                                            <i className="fa fa-sign-out fa-fw"></i>
                                            立即登出
                                        </a>
                                    ) : (
                                        <a
                                            onClick={() => {
                                                window.location.href = "/login";
                                            }}
                                        >
                                            <i className="fa fa-sign-in fa-fw"></i>
                                            立即登入
                                        </a>
                                    )}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavTop;
