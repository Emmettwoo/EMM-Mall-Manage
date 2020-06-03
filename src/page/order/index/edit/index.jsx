// 业务组件，非通用组件
import React from "react";

import "./index.scss";
import PageTitle from "component/page-title/index.jsx";
import TableList from 'util/table-list/index.jsx';

import MallUtil from "util/mall.jsx";
import Order from "service/order-service.jsx";
const _mall = new MallUtil();
const _order = new Order();

class OrderEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNo: this.props.match.params.orderNo,
            orderInfo: {}
        };
    }

    componentDidMount() {
        this.loadOrder();
    }

    // 加载订单详情
    loadOrder() {
        _order.getOrderDetail(this.state.orderNo).then(
            (res) => {
                    this.setState({
                        orderInfo: res.data
                    });
            }, (err) => {
                _mall.errorTips(err);
            }
        );
    }

    // 字段内容的变化
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }

    // 订单发货
    deliveryOrder(e) {
        if(confirm("确定为订单发货？")) {
            _order.deliveryOrder(this.state.orderNo).then(
                (res) => {
                    _mall.successTips(res.msg);
                    this.loadOrder();
                }, (err) => {
                    _mall.errorTips(err);
                }
            );
        }
    }
    // 订单完结
    endedOrder(e) {
        if(confirm("确定要完成订单？")) {
            _order.endedOrder(this.state.orderNo).then(
                (res) => {
                    _mall.successTips(res.msg);
                    this.loadOrder();
                }, (err) => {
                    _mall.errorTips(err);
                }
            );
        }
    }
    // 订单完结
    closeOrder(e) {
        if(confirm("确定要关闭订单？")) {
            _order.closeOrder(this.state.orderNo).then(
                (res) => {
                    _mall.successTips(res.msg);
                    this.loadOrder();
                }, (err) => {
                    _mall.errorTips(err);
                }
            );
        }
    }
    // 取消订单
    cancelOrder(e) {
        if(confirm("确定要取消订单？")) {
            _order.cancelOrder(this.state.orderNo).then(
                (res) => {
                    _mall.successTips(res.msg);
                    this.loadOrder();
                }, (err) => {
                    _mall.errorTips(err);
                }
            );
        }
    }

    render() {
        let orderInfo = this.state.orderInfo;
        let receiverInfo = orderInfo.shippingVO || {};
        let productList = orderInfo.orderItemVOList || [];

        let tableHeads = [
            {name: '商品图片', width: '10%'},
            {name: '商品信息', width: '45%'},
            {name: '商品单价', width: '15%'},
            {name: '商品数量', width: '15%'},
            {name: '商品总价', width: '15%'}
        ];

        return (
            <div id="page-wrapper">
                <PageTitle title={"订单详情"} />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            订单信息
                        </label>
                        <div className="col-md-3">
                            <p className="form-control-static">
                                {orderInfo.orderNo}&nbsp;-&nbsp;
                                {orderInfo.statusDesc || null}
                            </p>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            联系方式
                        </label>
                        <div className="col-md-3">
                            <p className="form-control-static">
                                {receiverInfo.receiverName}&nbsp;
                                {receiverInfo.receiverPhone}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            收货地址
                        </label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {receiverInfo.receiverProvince}&nbsp;
                                {receiverInfo.receiverCity}&nbsp;
                                {receiverInfo.receiverDistrict}&nbsp;
                                {receiverInfo.receiverAddress}&nbsp;
                                {receiverInfo.receiverZip}
                            </p>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            支付状态
                        </label>
                        <div className="col-md-3">
                            <p className="form-control-static">
                                {orderInfo.paymentTypeDesc || null}&nbsp;
                                ￥{orderInfo.payment || null}
                            </p>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            创建时间
                        </label>
                        <div className="col-md-3">
                            <p className="form-control-static">
                                {orderInfo.createTime || "查无记录"}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            支付时间
                        </label>
                        <div className="col-md-3">
                            <p className="form-control-static">
                                {orderInfo.paymentTime || "查无记录"}
                                {
                                    orderInfo.status === 10 ? 
                                    <button className="btn btn-sm btn-primary form-control-button" onClick={(e) => {this.cancelOrder()}}>
                                        取消订单
                                    </button> : null
                                }
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            发货时间
                        </label>
                        <div className="col-md-3">
                            <p className="form-control-static">
                                {orderInfo.sendTime || "查无记录"}
                                {
                                    orderInfo.status === 20 ? 
                                    <button className="btn btn-sm btn-primary form-control-button" onClick={(e) => {this.deliveryOrder()}}>
                                        立即发货
                                    </button> : null
                                }
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            完成时间
                        </label>
                        <div className="col-md-3">
                            <p className="form-control-static">
                                {orderInfo.endTime || "查无记录"}
                                {
                                    orderInfo.status === 40 ? 
                                    <button className="btn btn-sm btn-primary form-control-button" onClick={(e) => {this.endedOrder()}}>
                                        完成订单
                                    </button> : null
                                }
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            关闭时间
                        </label>
                        <div className="col-md-3">
                            <p className="form-control-static">
                                {orderInfo.closeTime || "查无记录"}
                                {
                                    orderInfo.status !== 60 && orderInfo.status !== 0 ? 
                                    <button className="btn btn-sm btn-primary form-control-button" onClick={(e) => {this.closeOrder()}}>
                                        关闭订单
                                    </button> : null
                                }
                            </p>
                        </div>
                    </div>

                    
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品列表
                        </label>
                        <div className="col-md-10">
                        <TableList tableHeads={tableHeads}>
                            {
                                productList.map((product, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <a href={"/product/edit/" + product.productId} target="_blank">
                                                    <img className="product-img"  alt={product.productName}
                                                        src={orderInfo.imageHost + product.productImage}/>
                                                </a>
                                            </td>
                                            <td>
                                                <a href={"/product/edit/" + product.productId} target="_blank">{product.productName}</a>
                                            </td>
                                            <td>￥{product.currentUnitPrice}</td>
                                            <td>{product.quantity}</td>
                                            <td>￥{product.totalPrice}</td>
                                        </tr>
                                    );
                                })
                            }
                        </TableList>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderEdit;
