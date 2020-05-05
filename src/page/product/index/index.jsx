import React from "react";

import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";
import TableList from "util/table-list/index.jsx";

import "./index.scss";

import MallUtil from "util/mall.jsx";
import Product from "service/product-service.jsx";
import { Link } from "react-router-dom";
const _mall = new MallUtil();
const _product = new Product();

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            pageSize: 2,
        }
    }
    componentDidMount() {
        this.loadProductList();
    }

    loadProductList() {
        _product.getProductList(this.state.pageNum, this.state.pageSize).then(
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
    onSetProductStatus(e, productId, currentStatus) {
        let newStatus = currentStatus == 1 ? 0 : 1,
            confirmTips = currentStatus == 1 ? "确认下架该商品？" : "确认上架该商品？";
        if(window.confirm(confirmTips)) {
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
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadProductList();
        });
    }


    render() {
        let tableHeads = [
            {name: "ID", width: "10%"},
            {name: "名称", width: "40%"},
            {name: "类别", width: "10%"},
            {name: "价格", width: "10%"},
            {name: "库存", width: "10%"},
            {name: "状态", width: "10%"},
            {name: "操作", width: "10%"}
        ];

        return (
            <div id="page-wrapper">
                <PageTitle title="商品管理" />
                <TableList tableHeads = {tableHeads}>
                    {
                        this.state.list.map(
                            (product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>
                                            <p>{product.name}</p>
                                            <p>{product.subtitle}</p>
                                        </td>
                                        <td>{product.categoryId}</td>
                                        <td>￥{product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            {<p>{product.status == 1 ? "在售" : "停售"}</p>}
                                            <button className="btn btn-xs btn-warning" onClick={(e) => 
                                            {this.onSetProductStatus(e, product.id, product.status)}}>
                                                {product.status == 1 ? "下架" : "上架"}
                                            </button>
                                        </td>
                                        <td>
                                            <Link className="opera" to={"/product/detail/" + product.id}>详情</Link>
                                            <Link className="opera" to={"/product/edit/" + product.id}>编辑</Link>
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