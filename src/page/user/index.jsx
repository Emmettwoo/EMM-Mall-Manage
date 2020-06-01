import React from "react";

import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";
import TableList from "util/table-list/index.jsx";

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
            pageSize: 10
        }
    }
    componentDidMount() {
        this.loadUserList();
    }

    loadUserList() {
        _user.getUserList(this.state.pageNum, this.state.pageSize).then(
            (res) => {
                this.setState(res.data);
            },
            (err) => {
                this.setState({
                    list: []
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
        // todo: 删除用户按钮和功能的实现
        return (
            <div id="page-wrapper">
                <PageTitle title="用户管理" />
                <TableList tableHeads={["ID", "用户名", "账户类型", "电子邮箱", "手机号", "注册时间", "更新时间"]}>
                    {
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
                    }
                </TableList>
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