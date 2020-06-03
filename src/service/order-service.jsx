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
}

export default Order;
