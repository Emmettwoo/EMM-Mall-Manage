// 业务组件，非通用组件
import React from "react";

import "./index.scss";
import PageTitle from "component/page-title/index.jsx";
import CategorySelector from "../../util/category-selector/index.jsx";
import RichEditor from "../../util/rich-editor/index.jsx";
import FileUploader from "util/file-uploader/index.jsx";

import MallUtil from "util/mall.jsx";
import Product from "service/product-service.jsx";
const _mall = new MallUtil();
const _product = new Product();

class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: 0,
            name: "",
            subTitle: "",
            mainImage: "",
            subImages: [],
            detail: "",
            price: "",
            stock: "",
            status: 1
        };
    }


    // 分类被选定后的回调函数
    onCategoryChange(categoryId) {
        this.setState({
            categoryId: categoryId,
        });
    }
    // 商品图片上传成功的回调函数
    onUploadSuccess(res) {
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages: subImages,
        });
    }
    // 商品图片上传失败的回调函数
    onUploadError(err) {
        _mall.errorTips("上传失败： " + err.message);
    }
    // 删除已上传图片
    onImageDelete(e) {
        // todo: 未对服务器图片进行删除，考虑到富文本编辑器同样对图片进行操作，需后期统一处理方法。
        let index = e.target.getAttribute('index');
        if(window.confirm("确定要删除第" + eval(index+"+"+1) + "张图片吗？")){
            let subImages = this.state.subImages;
            subImages.splice(index, 1);
            this.setState({
                subImages: subImages
            });
        }
    }

    // 简单字段内容的变化
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }
    
    // 富文本编辑器的变化
    onDetailValueChange(value) {
        this.setState({
            detail: value
        });
    }

    // 处理商品图片的数据
    getMainImageString() {
        return this.state.subImages.map((image) => image.uri)[0];
    }
    getSubImagesString() {
        return this.state.subImages.map((image) => image.uri).join(',');
    }

    // 产品信息表单提交
    onSubmit(e) {
        let product = {
            categoryId: parseInt(this.state.categoryId),
            name: this.state.name,
            subTitle: this.state.subTitle,
            mainImage: this.getMainImageString(),
            subImages: this.getSubImagesString(),
            detail: this.state.detail,
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            status: this.state.status,
        },
        productCheckResult = _product.checkProduct(product);
        if(productCheckResult.status) {
            _product.saveProduct(product).then(
                (res) => {
                    _mall.successTips(res.msg);
                    this.props.history.push("/product/index");
                }, (err) => {
                    _mall.errorTips(err);
                }
            );
        } else {
            _mall.errorTips(productCheckResult.msg);
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品名称
                        </label>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="请输入商品名称"
                                name="name"
                                onChange={(e) => this.onValueChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品描述
                        </label>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="请输入商品描述"
                                name="subTitle"
                                onChange={(e) => this.onValueChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品类别
                        </label>
                        <CategorySelector
                            onCategoryChange={(categoryId) =>
                                this.onCategoryChange(categoryId)
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品价格
                        </label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="请输入商品价格"
                                    aria-describedby="basic-addon2"
                                    name="price"
                                    onChange={(e) => this.onValueChange(e)}
                                />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品库存
                        </label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="请输入商品库存"
                                    aria-describedby="basic-addon2"
                                    name="stock"
                                    onChange={(e) => this.onValueChange(e)}
                                />
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品图片
                        </label>
                        <div className="col-md-10">
                            {this.state.subImages.length
                                ? this.state.subImages.map((image, index) => (
                                      <div className="image-content">
                                          <img
                                              src={image.url}
                                              alt={image.uri}
                                              key={index}
                                          />
                                          <i
                                              className="fa fa-close"
                                              index={index}
                                              onClick={(e) =>
                                                  this.onImageDelete(e)
                                              }
                                          ></i>
                                      </div>
                                  ))
                                : null}
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-content">
                            <FileUploader
                                onSuccess={(res) => this.onUploadSuccess(res)}
                                onError={(err) => this.onUploadError(err)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品详情
                        </label>
                        <div className="col-md-10">
                            <RichEditor onValueChange={(value) => this.onDetailValueChange(value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary" onClick={(e) => {this.onSubmit()}}>
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
