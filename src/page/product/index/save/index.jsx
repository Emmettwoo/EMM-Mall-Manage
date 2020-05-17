// 业务组件，非通用组件
import React from "react";

import "./index.scss";
import PageTitle from "component/page-title/index.jsx";
import CategorySelector from "../../util/category-selector/index.jsx";
import FileUploader from "util/file-uploader/index.jsx";

import MallUtil from "util/mall.jsx";
import Product from "service/product-service.jsx";
const _mall = new MallUtil();
const _product = new Product();

class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: 0
        }
    }

    onCategoryChange(categoryId) {
        console.log("分类选中成功: " + categoryId);
    }


    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label
                            className="col-md-2 control-label"
                        >
                            商品名称
                        </label>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="请输入商品名称"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="col-md-2 control-label"
                        >
                            商品描述
                        </label>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="请输入商品描述"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="col-md-2 control-label"
                        >
                            商品类别
                        </label>
                        <CategorySelector onCategoryChange={(categoryId) => this.onCategoryChange(categoryId)}/>
                    </div>
                    <div className="form-group">
                        <label
                            className="col-md-2 control-label"
                        >
                            商品价格
                        </label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="请输入商品价格" aria-describedby="basic-addon2" />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="col-md-2 control-label"
                        >
                            商品库存
                        </label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="请输入商品库存" aria-describedby="basic-addon2" />
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="col-md-2 control-label"
                        >
                            商品图片
                        </label>
                        <div className="col-md-10">
                            <FileUploader />
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="col-md-2 control-label"
                        >
                            商品详情
                        </label>
                        <div className="col-md-10">
                            editor;
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary">
                                保存修改
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductSave;
