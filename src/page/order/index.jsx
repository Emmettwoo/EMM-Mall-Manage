import React from "react";
import { Link } from "react-router-dom";

import PageTitle from "component/page-title/index.jsx";
import Pagination from "util/pagination/index.jsx";
import TableList from "util/table-list/index.jsx";
import ListSearch from "./util/list-search.jsx";

import MallUtil from "util/mall.jsx";
import Order from "service/order-service.jsx";
const _mall = new MallUtil();
const _order = new Order();


class OrderList extends React.Component {
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
        this.loadOrderList();
    }

    loadOrderList() {
        // 准备接口需要的数据
        let listParam = {
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize
        };
        if (this.state.listType === "search") {
            listParam.orderNo = this.state.orderNo;
        }
        // 进行列表展示商品的搜索
        _order.getOrderList(listParam).then(
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
    onSearch(orderNo) {
        let listType = orderNo === "" ? "list" : "search";
        this.setState({
            listType: listType,
            orderNo: orderNo
        }, () => {
            this.loadOrderList();
        });
    }
    // 页数更改时重新载入数据
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadOrderList();
        });
    }


    render() {
        let tableHeads = [
            { name: "订单号", width: "15%" },
            { name: "收件人", width: "15%" },
            { name: "订单状态", width: "10%" },
            { name: "订单总价", width: "10%" },
            { name: "创建时间", width: "20%" },
            { name: "发货时间", width: "20%" },
            { name: "操作", width: "10%" },
        ];

        return (
            <div id="page-wrapper">
                <PageTitle title="订单管理" />
                <ListSearch onSearch={(orderNo) => { this.onSearch(orderNo) }} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map(
                            (order, index) => {
                                return (
                                    <tr key={index}>
                                        <td><p>{order.orderNo}</p></td>
                                        <td><p>{order.receiverName}</p></td>
                                        <td><p>{order.statusDesc}</p></td>
                                        <td><p>￥{order.payment}</p></td>
                                        <td><p>{order.createTime}</p></td>
                                        <td><p>{order.sendTime ? order.sendTime : "未发货"}</p></td>
                                        <td>
                                            <Link className="btn btn-xs btn-primary" to={"/order/detail/" + order.orderNo}>详情</Link>
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

export default OrderList;