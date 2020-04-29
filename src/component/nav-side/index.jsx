import React from "react";
import { Link, NavLink } from "react-router-dom";

class NavSide extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/">
                                <i className="fa fa-dashboard"></i>
                                <span>后台主页</span>
                            </NavLink>
                        </li>

                        <li className="active">
                            <Link to="/product">
                                <i className="fa fa-sitemap"></i>
                                <span>商品相关</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink
                                        activeClassName="active-menu"
                                        to="/product"
                                    >
                                        商品管理
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        activeClassName="active-menu"
                                        to="/product-category"
                                    >
                                        品类管理
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="active">
                            <Link to="/order">
                                <i className="fa fa-sitemap"></i>
                                <span>订单相关</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink
                                        activeClassName="active-menu"
                                        to="/order"
                                    >
                                        订单管理
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="active">
                            <Link to="/user">
                                <i className="fa fa-sitemap"></i>
                                <span>用户相关</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink
                                        activeClassName="active-menu"
                                        to="/user"
                                    >
                                        用户管理
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default NavSide;
