import React from "react";
import PageTitle from "component/page-title/index.jsx";
import { Link } from "react-router-dom";

import "./index.scss";

import MallUtil from "util/mall.jsx";
import Statistic from "service/statistic-service.jsx";
const _mall = new MallUtil();
const _statistic = new Statistic();


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userCount: 'null',
            productCount: 'null',
            orderCount: 'null'
        }
    }
    componentDidMount() {
        this.loadCount();
    }

    loadCount() {
        _statistic.getHomeCount().then(
            (res) => {
                this.setState(res.data);
            },
            (err) => {
                console.log("warnning: " + err);
            }
        );
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="后台主页" />
                <div className="col-md-4">
                    <Link to="/user" className="color-box blue">
                        <p className="count">{this.state.userCount}</p>
                        <p className="desc">
                            <i className="fa fa-user-o"></i>
                            <span>用户总数</span>
                        </p>
                    </Link>
                </div>
                <div className="col-md-4">
                    <Link to="/product" className="color-box red">
                        <p className="count">{this.state.productCount}</p>
                        <p className="desc">
                            <i className="fa fa-list"></i>
                            <span>商品总数</span>
                        </p>
                    </Link>
                </div>
                <div className="col-md-4">
                    <Link to="/order" className="color-box green">
                        <p className="count">{this.state.orderCount}</p>
                        <p className="desc">
                            <i className="fa fa-check-square-o"></i>
                            <span>订单总数</span>
                        </p>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;
