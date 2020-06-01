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

    onProductAdd() {
        ;
    }


    render() {
        // todo: 删除用户按钮和功能的实现
        return (
            <div id="page-wrapper">
                <PageTitle title="品类管理" />
                <div className="row">
                    <div className="col-md-12">
                        <p>
                            <span className="parentIdInfo" >当前父品类ID: {this.state.parentCategoryId}</span>
                            {
                                this.state.parentCategoryId !== 0 ?
                                <button className="btn btn-xs btn-primary" onClick={(e) => {this.resetParentCategoryId();}}>
                                    返回
                                </button> :
                                <Link className="btn btn-xs btn-warning" to={"/product-category/add"}>新增</Link>
                            }
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
                                        <a className="opera" onClick={(e) => this.onUpdateName(category.id, category.name)}>修改名称</a>
                                        <a className="opera" onClick={(e) => this.deleteCategory(category.id)}>删除品类</a>
                                            {
                                                this.state.parentCategoryId === 0
                                                ? <Link to={"/product-category/" + category.id}>查看子品类</Link>
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