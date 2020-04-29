import React from "react";
import { Link } from "react-router-dom";

class NavTop extends React.Component {
    constructor(props) {
        super(props);
    }

    // 登出逻辑
    onLogout() {
        ;
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
                                <span>欢迎，管理员 admin</span>
                                <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-user">
                                <li>
                                    <a onClick={() => {this.onLogout()}}>
                                        <i className="fa fa-sign-out fa-fw"></i>
                                        登出
                                    </a>
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
