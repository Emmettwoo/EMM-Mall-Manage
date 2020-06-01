import React from "react";
import { Link } from "react-router-dom";

import PageTitle from "component/page-title/index.jsx";
import TableList from "util/table-list/index.jsx";

import "./index.scss";

import MallUtil from "util/mall.jsx";
import Category from "service/category-service.jsx";
import creatHistory from 'history/createHashHistory';
const _mall = new MallUtil();
const _category = new Category();
const history = creatHistory();


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

    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newParentCategoryId = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath) {
            this.setState({
                parentCategoryId: newParentCategoryId
            }, () => {
                this.loadCategoryList();
            });
        }
    }

    loadCategoryList() {
        _category.getCategoryList(this.state.parentCategoryId).then(
            (res) => {
                this.setState({
                    list: res.data
                });
            },
            (err) => {
                this.setState({
                    list: []
                });
                _mall.errorTips(err);
            }
        );
    }

    resetParentCategoryId() {
        this.setState({
            parentCategoryId: 0
        }, () => {
            this.props.history.push("/product-category");
        });
    }

    onUpdateName(categoryId, categoryName) {
        let newCategoryName = window.prompt("请输入新的品类名称: ", categoryName);
        if(newCategoryName) {
            _category.updateCategoryName(categoryId, newCategoryName).then(
                (res) => {
                    _mall.successTips(res.msg);
                    this.loadCategoryList();
                }, (err) => {
                    _mall.errorTips(err);
                }
            )
        }
    }

    // 改变品类的可用状态
    onSetCategoryStatus(e, categoryId, currentStatus) {
        let newStatus = currentStatus == 1 ? 0 : 1,
            confirmTips = currentStatus == 1 ? "确认停用该品类？" : "确认恢复该品类？";
        if (window.confirm(confirmTips)) {
            _category.setCategoryStatus(categoryId, newStatus).then(
                (res) => {
                    _mall.successTips(res.msg);
                    this.loadCategoryList();
                },
                (err) => {
                    _mall.errorTips(err);
                }
            )
        }
    }

    deleteCategory(categoryId) {
        if(confirm("确认删除该品类？") && categoryId!==0) {
            _category.deleteCategory(categoryId).then(
                (res) => {
                    _mall.successTips(res.msg);
                    this.loadCategoryList();
                }, (err) => {
                    _mall.errorTips(err);
                }
            );
        }
    }


    render() {
        // todo: 删除用户按钮和功能的实现
        return (
            <div id="page-wrapper">
                <PageTitle title="品类管理">
                    <div className="page-header-right">
                        
                        {
                            this.state.parentCategoryId !== 0 ?
                            <button className="btn btn-primary" onClick={(e) => {this.resetParentCategoryId();}}>
                                <i className="fa fa-arrow-left"></i>
                                <span>&nbsp;返回根类</span>
                            </button> :
                            <Link className="btn btn-primary" to="/product-category/add">
                                <i className="fa fa-plus"></i>
                                <span>&nbsp;添加品类</span>
                            </Link>
                        }
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>
                            <span className="parentIdInfo" >当前父品类ID: {this.state.parentCategoryId}</span>
                        </p>
                    </div>
                </div>
                <TableList tableHeads={["品类ID", "品类名称", "操作"]}>
                    {
                        this.state.list.map(
                            (category, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <a className="btn btn-xs btn-primary" onClick={(e) => this.onUpdateName(category.id, category.name)}>修改名称</a>
                                            {category.status ? 
                                                <button className="btn btn-xs btn-warning" onClick={(e) => { this.onSetCategoryStatus(e, category.id, category.status);}}>
                                                    暂停使用
                                                </button> :
                                                <button className="btn btn-xs btn-info" onClick={(e) => { this.onSetCategoryStatus(e, category.id, category.status);}}>
                                                    恢复使用
                                                </button>
                                            }
                                            <a className="btn btn-xs btn-danger" onClick={(e) => this.deleteCategory(category.id)}>删除品类</a>
                                            {
                                                this.state.parentCategoryId === 0
                                                ? <Link className="btn btn-xs btn-success" to={"/product-category/" + category.id}>查看子品类</Link>
                                                : null
                                            }
                                        </td>
                                    </tr>
                                );
                            }
                        )
                    }
                </TableList>
            </div>
        );
    }
}

export default CategoryList;