import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";
import TableList from "util/table-list/index.jsx";
import ListSearch from "../util/list-search.jsx";

import MallUtil from "util/mall.jsx";
import Product from "service/product-service.jsx";
const _mall = new MallUtil();
const _product = new Product();


class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            pageSize: 10,
            listType: 'list'
        }
    }
    componentDidMount() {
        this.loadProductList();
    }

    loadProductList() {
        // 准备接口需要的数据
        let listParam = {
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize
        };
        if (this.state.listType === "search") {
            // 对搜索类型进行判断，搜索类型错误时显示全部商品
            if (this.state.searchType === "productId") {
                listParam.productId = this.state.searchKeyword;
            } else if (this.state.searchType === "productName") {
                listParam.productName = this.state.searchKeyword;
            }
        }
        // 进行列表展示商品的搜索
        _product.getProductList(listParam).then(
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
    // 搜索商品
    onSearch(searchType, searchKeyword) {
        let listType = searchKeyword === "" ? "list" : "search";
        this.setState({
            listType: listType,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadProductList();
        });
    }
    // 改变商品的上下架状态
    onSetProductStatus(e, productId, currentStatus) {
        let newStatus = currentStatus == 1 ? 0 : 1,
            confirmTips = currentStatus == 1 ? "确认下架该商品？" : "确认上架该商品？";
        if (window.confirm(confirmTips)) {
            _product.setProductStatus(productId, newStatus).then(
                (res) => {
                    this.loadProductList();
                },
                (err) => {
                    _mall.errorTips(err);
                }
            )
        }
    }
    // 页数更改时重新载入数据
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadProductList();
        });
    }


    render() {
        let tableHeads = [
            { name: "ID", width: "10%" },
            { name: "名称", width: "40%" },
            { name: "类别", width: "10%" },
            { name: "价格", width: "10%" },
            { name: "库存", width: "10%" },
            { name: "状态", width: "10%" },
            { name: "操作", width: "10%" }
        ];

        return (
            <div id="page-wrapper">
                <PageTitle title="商品管理">
                    <div className="page-header-right">
                        <Link className="btn btn-primary" to="/product/edit">
                            <i className="fa fa-plus"></i>
                            <span>&nbsp;添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType, searchKeyword) => { this.onSearch(searchType, searchKeyword) }} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map(
                            (product, index) => {
                                return (
                                    <tr key={index}>
                                        <td><p>{product.id}</p></td>
                                        <td><p>{product.name}</p></td>
                                        <td><p>{product.categoryId}</p></td>
                                        <td><p>￥{product.price}</p></td>
                                        <td><p>{product.stock}</p></td>
                                        <td>
                                            {<p>{product.status == 1 ? "在售" : "停售"}</p>}
                                        </td>
                                        <td>

                                            <button className="btn btn-xs btn-warning" onClick={(e) => { this.onSetProductStatus(e, product.id, product.status) }}>
                                                {product.status == 1 ? "下架" : "上架"}
                                            </button>
                                            <Link className="btn btn-xs btn-primary" to={"/product/edit/" + product.id}>编辑</Link>
                                        </td>
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

export default ProductList;