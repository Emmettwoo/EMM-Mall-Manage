import MallUtil from "util/mall.jsx";
const _mall = new MallUtil();

class Product {
    // 获取所有或指定商品列表
    getProductList(listParam) {
        return _mall.request({
            type: "post",
            url: "/manage/product/search.do",
            data: listParam
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

    // 检查保存商品表单数据
    checkProduct(product) {
        if (typeof product.name !== "string" || product.name.length === 0) {
            return {
                status: false,
                msg: "商品名称不能为空",
            };
        } else if (typeof product.subTitle !== "string" || product.subTitle.length === 0) {
            return {
                status: false,
                msg: "商品描述不能为空",
            };
        } else if (typeof product.categoryId !== "number" || !(product.categoryId > 0)) {
            return {
                status: false,
                msg: "商品品类选择错误",
            };
        } else if (typeof product.price !== "number" || !(product.price >= 0)) {
            return {
                status: false,
                msg: "商品价格数据错误",
            };
        } else if (typeof product.stock !== "number" || !(product.stock >= 0)) {
            return {
                status: false,
                msg: "商品库存数据错误",
            };
        } else if (typeof product.detail !== "string" || product.detail.length === 0) {
            return {
                status: false,
                msg: "商品详情不能为空",
            };
        } else {
            return {
                status: true,
                msg: "数据合法性验证通过",
            };
        }
    }

    // 保存商品信息
    saveProduct(product) {
        return _mall.request({
            type: "post",
            url: "/manage/product/save.do",
            data: product
        });
    }
}

export default Product;
