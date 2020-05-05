import MallUtil from "util/mall.jsx";
const _mall = new MallUtil();

class Product {
    // 获取商品列表
    getProductList(pageNum, pageSize) {
        return _mall.request({
            type: "post",
            url: "/manage/product/search.do",
            data: {pageNum, pageSize}
        });
    }

    // 设置商品上下架状态
    setProductStatus(productId, status) {
        return _mall.request({
            type: "post",
            url: "/manage/product/set_status.do",
            data: {productId, status}
        });
    }
}

export default Product;
