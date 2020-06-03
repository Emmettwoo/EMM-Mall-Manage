// 业务组件，非通用组件
import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";
import PageTitle from "component/page-title/index.jsx";
import CategorySelector from "../../util/category-selector/index.jsx";
import RichEditor from "../../util/rich-editor/index.jsx";
import FileUploader from "util/file-uploader/index.jsx";

import MallUtil from "util/mall.jsx";
import Product from "service/product-service.jsx";
const _mall = new MallUtil();
const _product = new Product();

class ProductEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.pid,
            categoryId: 0,
            parentCategoryId: 0,
            name: "",
            subtitle: "",
            mainImage: "",
            subImages: [],
            detail: "",
            price: "",
            stock: "",
            status: 1
        };
    }

    componentDidMount() {
        this.loadProduct();
    }
    // 加载商品详情（若存在）
    loadProduct() {
        if(this.state.id) {
            _product.getProduct(this.state.id).then(
                (res) => {
                    let images = res.data.subImages.split(',');
                    res.data.subImages = images.map((imgUri) => {
                        return {
                            uri: imgUri,
                            url: res.data.imageHost + imgUri
                        }
                    });
                    res.data.defaultDetail = res.data.detail;
                    this.setState(res.data);
                }, (err) => {
                    _mall.errorTips(err);
                }
            )
        }
    }


    // 分类被选定后的回调函数
    onCategoryChange(parentCategoryId, categoryId) {
        this.setState({
            parentCategoryId: parentCategoryId,
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
            subtitle: this.state.subtitle,
            mainImage: this.getMainImageString(),
            subImages: this.getSubImagesString(),
            detail: this.state.detail,
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            status: this.state.status,
        },
        productCheckResult = _product.checkProduct(product);
        if(this.state.id) {
            product.id = this.state.id;
        }
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

    // 删除当前编辑商品
    onDelete(e) {
        let productId = this.state.id,
            productName = this.state.name;
        if(!(productId!=null) && confirm("放弃新增商品草稿并返回？")) {
            this.props.history.push("/product/index");
            return;
        } else if (productId!=null && confirm("确认删除商品 [" + productName + "] (id: " + productId + ") 吗？")) {
            _product.deleteProduct(productId).then(
                (res) => {
                    _mall.successTips("删除成功，返回列表页。");
                    this.props.history.push("/product/index");
                }, (err) => {
                    _mall.errorTips(err);
                }
            );
        }
    }
    onBack(e) {
        if(confirm("放弃所有修改并返回？")) {
            this.props.history.push("/product/index");
            return;
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id!=null ? "编辑商品" : "添加商品"}>
                    <div className="page-header-right">
                        <button className="btn btn-danger" onClick={(e) => {this.onBack()}}>
                            <i className="fa fa-arrow-left"></i>
                            <span>&nbsp;返回</span>
                        </button>
                    </div>
                </PageTitle>
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
                                value={this.state.name}
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
                                value={this.state.subtitle}
                                name="subtitle"
                                onChange={(e) => this.onValueChange(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">
                            商品类别
                        </label>
                        <CategorySelector
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={(parentCategoryId, categoryId) =>
                                this.onCategoryChange(parentCategoryId, categoryId)
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
                                    value={this.state.price}
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
                                    value={this.state.stock}
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
                                      <div className="image-content" key={index}>
                                          <img
                                              src={image.url}
                                              alt={image.uri}
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
                            <RichEditor 
                                detail={this.state.detail}
                                defaultDetail={this.state.defaultDetail}
                                onValueChange={(value) => this.onDetailValueChange(value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary" onClick={(e) => {this.onSubmit()}}>
                                {this.state.id!=null ? "保存信息" : "添加商品"}
                            </button>
                            <button className="btn btn-danger" onClick={(e) => {this.onDelete()}}>
                                {this.state.id!=null ? "删除商品" : "放弃添加"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductEdit;
