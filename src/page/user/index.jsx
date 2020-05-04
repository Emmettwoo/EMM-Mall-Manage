import React from "react";
import { Link } from "react-router-dom";

import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";

import MallUtil from "util/mall.jsx";
import User from "service/user-service.jsx";
const _mall = new MallUtil();
const _user = new User();


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            pageSize: 10,
            firstLoading: true
        }
    }
    componentDidMount() {
        this.loadUserList();
    }

    loadUserList() {
        _user.getUserList(this.state.pageNum, this.state.pageSize).then(
            (res) => {
                this.setState(res.data, () => {
                    this.setState({
                        firstLoading: false
                    });
                });
            },
            (err) => {
                this.setState({
                    list: [],
                    firstLoading: false
                });
                _mall.errorTips(err);
            }
        );
    }
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        });
    }


    render() {
        let listBody = (
            this.state.list.map(
                (user, index) => {
                    return (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.createTime}</td>
                            <td>{user.updateTime}</td>
                        </tr>
                    );
                }
            )
        );
        let listError = (
            <tr>
                <td colSpan="7" className="text-center">
                    {this.state.firstLoading ? "用户列表载入中" : "用户列表为空"}
                </td>
            </tr>
        );
        let tableBody = this.state.list.length > 0 ? listBody : listError;

        return (
            <div id="page-wrapper">
                <PageTitle title="用户管理" />
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>用户名</th>
                                    <th>账户类型</th>
                                    <th>电子邮箱</th>
                                    <th>手机号</th>
                                    <th>注册时间</th>
                                    <th>更新时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableBody}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination
                    current={this.state.pageNum}
                    total={this.state.total}
                    pageSize={this.state.pageSize}
                    onChange={
                        (pageNum) => this.onPageNumChange(pageNum)
                    }
                />
            </div>
        );
    }
}

export default UserList;