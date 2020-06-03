import MallUtil from "util/mall.jsx";
const _mall = new MallUtil();

class Order {
    // 获取订单列表
    getOrderList(listParam) {
        return _mall.request({
            type: "post",
            url: "/manage/order/list.do",
            data: listParam
        });
    }
    
    // 获取订单详情
    getOrderDetail(orderNo) {
        return _mall.request({
            type: "post",
            url: "/manage/order/detail.do",
            data: {
                orderNo: orderNo
            }
        });
    }


    // 订单发货
    deliveryOrder(orderNo) {
        return _mall.request({
            type: "post",
            url: "/manage/order/delivery.do",
            data: {
                orderNo: orderNo
            }
        });
    }
    // 订单完结
    endedOrder(orderNo) {
        return _mall.request({
            type: "post",
            url: "/manage/order/ended.do",
            data: {
                orderNo: orderNo
            }
        });
    }
    // 订单关闭
    closeOrder(orderNo) {
        return _mall.request({
            type: "post",
            url: "/manage/order/close.do",
            data: {
                orderNo: orderNo
            }
        });
    }
    // 取消订单
    cancelOrder(orderNo) {
        return _mall.request({
            type: "post",
            url: "/manage/order/cancel.do",
            data: {
                orderNo: orderNo
            }
        });
    }
}

export default Order;
