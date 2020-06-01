import React from "react";

import "./index.scss"

import MallUtil from "util/mall.jsx";
import Category from "service/category-service.jsx";
const _mall = new MallUtil();
const _category = new Category();


class CategorySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: -1,
            secondCategoryList: [],
            secondCategoryId: -1
        }
    }

    componentDidMount() {
        this.loadCategoryList(0);
    }
    componentWillReceiveProps(nextProps) {
        let isCategoryIdChange = nextProps.categoryId !== this.props.categoryId,
            isParentCategoryIdChange = nextProps.parentCategoryId !== this.props.parentCategoryId;
        // 数据没有发生变化，直接返回不处理
        if(!isCategoryIdChange && !isParentCategoryIdChange) {
            return;
        }
        // fixme:
        // 假如只存在一级品类
        if(nextProps.parentCategoryId === 0) {
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: -1
            });
        }
        // 假如是属于二级品类
        else {
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, () => {
                this.loadCategoryList(this.state.firstCategoryId);
            });
        }
    }

    // 一级品类被选定后
    onFirstCategoryChange(e) {
        let firstCategoryId = e.target.value;
        if(firstCategoryId > 0) {
            this.setState({
                firstCategoryId: firstCategoryId,
                secondCategoryId: -1
            });
            this.loadCategoryList(firstCategoryId);
        }
    }
    // 二级品类被选定后
    onSecondCategoryChange(e) {
        let secondCategoryId = e.target.value;
        if(secondCategoryId > 0) {
            this.setState({
                secondCategoryId: secondCategoryId
            }, () => {
                this.onPropsCategoryChange();
            });
        }
    }

    // 加载分类列表
    loadCategoryList(parentId) {
        _category.getCategoryList(parentId).then(
            (res) => {
                let targetListName = parentId===0 ? "firstCategoryList" : "secondCategoryList";
                this.setState({
                    [targetListName]: res.data
                });
            },
            (err) => {
                _mall.errorTips(err);
            }
        );
    }
    // 完成选择后返回结果给父级组件
    onPropsCategoryChange() {
        // 判断是否有回调函数
        let hasOnCategoryChange = typeof this.props.onCategoryChange === "function";
        // 二级品类被选中
        if (this.state.secondCategoryId > 0) {
            hasOnCategoryChange && this.props.onCategoryChange(this.state.firstCategoryId, this.state.secondCategoryId);
        } else {
            _mall.errorTips("二级品类不能为空");
        }
    }


    render() {
        return (
            <div className="col-md-10">
                <select className="form-control category-selector"
                    onChange={(e) => this.onFirstCategoryChange(e)}
                    value={this.state.firstCategoryId}>
                    <option value="-1">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((category, index) => 
                            <option value={category.id} key={index}>{category.name}</option>
                        )
                    }
                </select>
                {this.state.secondCategoryList.length ? (
                    <select className="form-control category-selector"
                        onChange={(e) => this.onSecondCategoryChange(e)}
                        value={this.state.secondCategoryId}>
                        <option value="-1">请选择二级分类</option>
                        {
                            this.state.secondCategoryList.map((category, index) => 
                                <option value={category.id} key={index}>{category.name}</option>
                            )
                        }
                    </select>
                ) : null}
            </div>
        );
    }
}

export default CategorySelector;