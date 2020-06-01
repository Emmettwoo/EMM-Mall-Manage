import React from "react";

import PageTitle from "component/page-title/index.jsx";

import MallUtil from "util/mall.jsx";
import Category from "service/category-service.jsx";
const _mall = new MallUtil();
const _category = new Category();


class CategoryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            parentId: 0,
            categoryName: ""
        };
    }
    componentDidMount() {
        this.loadCategoryList();
    }

    // 显示可选的父品类列表
    loadCategoryList() {
        _category.getCategoryList(0).then(
            (res) => {
                this.setState({
                    list: res.data
                });
            },
            (err) => {
                _mall.errorTips(err);
            }
        );
    }

    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    onSubmit(e) {
        let categoryName = this.state.categoryName.trim();
        if(categoryName) {
            _category.addCategory(categoryName, this.state.parentId).then(
                (res) => {
                    _mall.successTips(res.msg);
                    this.props.history.push("/product-category");
                }, (err) => {
                    _mall.errorTips(err);
                }
            );
        } else {
            _mall.errorTips("请输入新增品类名称");
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="新增品类" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">
                                    父级品类
                                </label>
                                <div className="col-md-5">
                                    <select
                                        name="parentId"
                                        className="form-control"
                                        onChange={(e) => {this.onValueChange(e)}}
                                    >
                                        <option value="0">根级品类</option>
                                        {
                                            this.state.list.map((category, index) => {
                                                return <option 
                                                    value={category.id}
                                                    key={index}>
                                                    {category.name}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">
                                    品类名称
                                </label>
                                <div className="col-md-5">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="请输入商品名称"
                                        name="categoryName"
                                        value={this.state.categoryName}
                                        onChange={(e) => this.onValueChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-primary" onClick={(e) => {this.onSubmit(e)}}>
                                        新增品类
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryAdd;