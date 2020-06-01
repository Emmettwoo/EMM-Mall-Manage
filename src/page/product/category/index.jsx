import React from "react";

import PageTitle from "component/page-title/index.jsx";
import TableList from "util/table-list/index.jsx";

import MallUtil from "util/mall.jsx";
import User from "service/user-service.jsx";
const _mall = new MallUtil();
const _user = new User();


class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0
        }
    }
    componentDidMount() {
        this.loadCategoryList();
    }

    loadCategoryList() {
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


    render() {
        // todo: 删除用户按钮和功能的实现
        return (
            <div id="page-wrapper">
                <PageTitle title="品类管理" />
                <TableList tableHeads={["品类ID", "品类名称", "操作", "添加时间", "更新时间"]}>
                    {
                        this.state.list.map(
                            (category, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{category.id}</td>
                                        <td>{category.username}</td>
                                        <td>{category.role}</td>
                                        <td>{category.email}</td>
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

export default CategoryList;